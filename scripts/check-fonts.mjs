import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { load } from 'cheerio'
import seo from '../src/data/seo.json' with { type: 'json' }

const root = new URL('../dist/', import.meta.url).pathname
const latin = ['Cormorant Garamond:wght@400;500', 'DM Sans:wght@400;500;600']
const extra = {
  en: [], fr: [],
  ja: ['Noto Sans JP:wght@400;500', 'Noto Serif JP:wght@400;500'],
  th: ['Noto Sans Thai:wght@400;500', 'Noto Serif Thai:wght@400;500'],
}
const failures = []

for (const [route, page] of Object.entries(seo)) {
  const filename = route === '/404/' ? join(root, '404.html') : join(root, route, 'index.html')
  if (!existsSync(filename)) { failures.push(`${route}: missing HTML`); continue }
  const $ = load(readFileSync(filename, 'utf8'))
  const hrefs = $('link[rel="stylesheet"][href*="fonts.googleapis.com/css2"]')
    .map((_, element) => $(element).attr('href')).get()
  if (hrefs.length !== 1) { failures.push(`${route}: expected one Google Fonts stylesheet`); continue }
  const url = new URL(hrefs[0])
  const actual = url.searchParams.getAll('family')
  const expected = [...latin, ...extra[page.lang]]
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    failures.push(`${route}: font families/weights differ from ${page.lang} set`)
  }
  if (url.searchParams.get('display') !== 'swap') failures.push(`${route}: missing font-display swap`)
  if ($('link[rel="preconnect"][href="https://fonts.gstatic.com"][crossorigin]').length !== 1) {
    failures.push(`${route}: missing font host preconnect`)
  }
}

if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1 }
else console.log(`${Object.keys(seo).length} pages checked: locale-specific font families and weights; font-display swap.`)
