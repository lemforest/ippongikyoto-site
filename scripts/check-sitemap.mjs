import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { load } from 'cheerio'
import legacyRoutes from '../src/data/legacy-routes.json' with { type: 'json' }

const root = new URL('../dist/', import.meta.url).pathname
const site = 'https://ippongikyoto.com'
const indexUrl = `${site}/sitemap-index.xml`
const failures = []
const pages = new Map()

function inspect(directory) {
  for (const name of readdirSync(directory)) {
    const file = join(directory, name)
    if (statSync(file).isDirectory()) inspect(file)
    else if (name === 'index.html') {
      const $ = load(readFileSync(file, 'utf8'))
      const canonical = $('link[rel="canonical"]').attr('href')
      const alternates = new Map()
      $('link[rel="alternate"][hreflang]').each((_, element) => {
        const locale = $(element).attr('hreflang')
        if (locale !== 'x-default') alternates.set(locale, $(element).attr('href'))
      })
      pages.set(canonical, alternates)
    }
  }
}
inspect(root)

const index = load(readFileSync(join(root, 'sitemap-index.xml'), 'utf8'), { xmlMode: true })
const sitemapUrls = index('sitemap > loc').map((_, element) => index(element).text()).get()
if (!sitemapUrls.length) failures.push('Sitemap index has no sitemap files')

const listed = new Set()
for (const sitemapUrl of sitemapUrls) {
  const url = new URL(sitemapUrl)
  if (url.origin !== site) {
    failures.push(`Sitemap index points outside site: ${sitemapUrl}`)
    continue
  }
  const $ = load(readFileSync(join(root, url.pathname), 'utf8'), { xmlMode: true })
  $('url').each((_, entry) => {
    const loc = $(entry).find('loc').first().text()
    if (listed.has(loc)) failures.push(`Duplicate sitemap URL: ${loc}`)
    listed.add(loc)
    const path = new URL(loc).pathname
    if (legacyRoutes[path]) failures.push(`Old URL in sitemap: ${loc}`)
    const expected = pages.get(loc)
    if (!expected) {
      failures.push(`Sitemap URL has no canonical page: ${loc}`)
      return
    }
    const links = new Map()
    $(entry).find('xhtml\\:link').each((_, link) => {
      const locale = $(link).attr('hreflang')
      if (links.has(locale)) failures.push(`Duplicate sitemap hreflang: ${loc} ${locale}`)
      links.set(locale, $(link).attr('href'))
    })
    const expectedLinks = expected.size > 1 ? expected : new Map()
    if (links.size !== expectedLinks.size) failures.push(`Wrong hreflang count: ${loc}`)
    for (const [locale, href] of expectedLinks) {
      if (links.get(locale) !== href) failures.push(`Wrong sitemap hreflang: ${loc} ${locale}`)
    }
  })
}

for (const canonical of pages.keys()) {
  if (!listed.has(canonical)) failures.push(`Canonical page missing from sitemap: ${canonical}`)
}
const robots = readFileSync(join(root, 'robots.txt'), 'utf8')
if (!robots.includes(`Sitemap: ${indexUrl}`)) failures.push('robots.txt does not point to sitemap index')
if (!/^User-agent: \*$/m.test(robots) || !/^Allow: \/$/m.test(robots)) failures.push('robots.txt does not allow crawling')
if (/^Disallow:/m.test(robots)) failures.push('robots.txt unexpectedly blocks crawling')

if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
} else {
  console.log(`${listed.size} sitemap URLs match canonical pages and translated-page hreflang; no old URLs; robots.txt points to the index.`)
}
