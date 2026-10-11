import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { load } from 'cheerio'
import pages from '../src/data/pages.json' with { type: 'json' }
import legacyRoutes from '../src/data/legacy-routes.json' with { type: 'json' }
import seo from '../src/data/seo.json' with { type: 'json' }

const brand = 'IPPONGI KYOTO'
const limits = { en: 150, fr: 150, ja: 80, th: 120 }
const failures = []
const expected = new Map()
const duplicateHomes = new Set(['/fr/accueil/', '/ja/ホーム/', '/th/หน้าแรก/'])

for (const page of pages) {
  if (duplicateHomes.has(page.path)) continue
  const path = legacyRoutes[page.path] || page.path
  if (expected.has(path)) failures.push(`Duplicate content path: ${path}`)
  expected.set(path, page.lang)
  if (page.kind === 'product') expected.set(`/ja${path}`, 'ja')
}
expected.set('/404/', 'en')

const titles = new Set()
for (const [path, lang] of expected) {
  const entry = seo[path]
  if (!entry) { failures.push(`Missing SEO metadata: ${path}`); continue }
  if (entry.lang !== lang) failures.push(`${path}: metadata language ${entry.lang} differs from page language ${lang}`)
  if (!entry.title?.trim() || entry.title !== entry.title.trim()) failures.push(`${path}: empty or untrimmed title`)
  if (!entry.description?.trim() || entry.description !== entry.description.trim()) failures.push(`${path}: empty or untrimmed description`)
  if (!entry.title || !entry.description) continue
  const fullTitle = `${entry.title} | ${brand}`
  if (titles.has(fullTitle)) failures.push(`${path}: duplicate title ${fullTitle}`)
  titles.add(fullTitle)
  const length = Array.from(entry.description).length
  if (length > limits[lang]) failures.push(`${path}: description has ${length} characters; limit is ${limits[lang]}`)
  if (lang === 'ja' ? !entry.description.endsWith('。') : !/[.!?]$/.test(entry.description)) {
    failures.push(`${path}: description must end as a complete sentence`)
  }
  if ((lang === 'en' || lang === 'fr') && /[\u3040-\u30ff\u3400-\u9fff\u0e00-\u0e7f]/u.test(`${entry.title} ${entry.description}`)) failures.push(`${path}: unexpected Japanese or Thai characters`)
  if (lang === 'ja' && !/[\u3040-\u30ff]/u.test(`${entry.title} ${entry.description}`)) failures.push(`${path}: no Japanese script`)
  if (lang === 'th' && !/[\u0e00-\u0e7f]/u.test(`${entry.title} ${entry.description}`)) failures.push(`${path}: no Thai script`)
}
for (const path of Object.keys(seo)) if (!expected.has(path)) failures.push(`SEO metadata has no page: ${path}`)

if (process.argv.includes('--built')) {
  const root = new URL('../dist/', import.meta.url).pathname
  for (const [path, lang] of expected) {
    const file = path === '/404/' ? join(root, '404.html') : join(root, path, 'index.html')
    if (!existsSync(file)) { failures.push(`Missing built HTML: ${path}`); continue }
    const $ = load(readFileSync(file, 'utf8'))
    const fullTitle = `${seo[path]?.title} | ${brand}`
    if ($('html').attr('lang') !== lang) failures.push(`${path}: built HTML language mismatch`)
    if ($('title').length !== 1 || $('title').text() !== fullTitle) failures.push(`${path}: built title mismatch`)
    if ($('meta[name="description"]').length !== 1 || $('meta[name="description"]').attr('content') !== seo[path]?.description) failures.push(`${path}: built description mismatch`)
    if ($('meta[property="og:title"]').attr('content') !== fullTitle) failures.push(`${path}: Open Graph title mismatch`)
    if ($('meta[property="og:description"]').attr('content') !== seo[path]?.description) failures.push(`${path}: Open Graph description mismatch`)
  }
}

if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
} else {
  console.log(`${expected.size} pages have unique, complete and language-matched SEO metadata${process.argv.includes('--built') ? ' in built HTML' : ''}.`)
}
