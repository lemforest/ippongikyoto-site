import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { load } from 'cheerio'

const root = new URL('../dist/', import.meta.url).pathname
const site = (process.env.PUBLIC_SITE_URL || 'https://ippongikyoto.com').replace(/\/$/, '')
const pages = new Map()
const failures = []

function inspect(directory) {
  for (const name of readdirSync(directory)) {
    const file = join(directory, name)
    if (statSync(file).isDirectory()) inspect(file)
    else if (file.endsWith('.html')) {
      const route = `/${relative(root, file).replace(/index\.html$/, '').replace(/\\/g, '/')}`
      const $ = load(readFileSync(file, 'utf8'))
      const canonicals = $('link[rel="canonical"]').map((_, element) => $(element).attr('href')).get()
      if (name === '404.html') {
        if (canonicals.length) failures.push('404 page must not have a canonical URL')
        continue
      }
      if (canonicals.length !== 1) failures.push(`${route}: expected one canonical, found ${canonicals.length}`)
      const canonical = canonicals[0]
      if (canonical !== `${site}${route}`) failures.push(`${route}: wrong canonical ${canonical}`)
      const alternates = new Map()
      $('link[rel="alternate"][hreflang]').each((_, element) => {
        const locale = $(element).attr('hreflang')
        const href = $(element).attr('href')
        if (alternates.has(locale)) failures.push(`${route}: duplicate hreflang ${locale}`)
        if (!href?.startsWith(`${site}/`)) failures.push(`${route}: non-absolute or wrong-site alternate ${href}`)
        alternates.set(locale, href)
      })
      const language = $('html').attr('lang')
      if (alternates.get(language) !== canonical) failures.push(`${route}: missing self hreflang`)
      if (alternates.has('en') && alternates.get('x-default') !== alternates.get('en')) failures.push(`${route}: x-default must point to English`)
      if (!alternates.has('en') && alternates.has('x-default')) failures.push(`${route}: x-default has no English page`)
      pages.set(canonical, { route, language, alternates })
    }
  }
}
inspect(root)

for (const { route, language, alternates } of pages.values()) {
  for (const [locale, href] of alternates) {
    if (locale === 'x-default') continue
    const peer = pages.get(href)
    if (!peer) failures.push(`${route}: alternate ${locale} points to a missing page ${href}`)
    else {
      if (peer.language !== locale) failures.push(`${route}: alternate ${locale} points to a ${peer.language} page`)
      if (peer.alternates.get(language) !== `${site}${route}`) failures.push(`${route}: ${locale} page does not point back`)
    }
  }
}

if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
} else {
  console.log(`${pages.size} content pages checked: one canonical each, absolute URLs, reciprocal hreflang, and valid x-default.`)
}
