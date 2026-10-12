import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { load } from 'cheerio'
import { contentFingerprint } from './sitemap-content.mjs'

const date = process.argv[2]
if (!/^\d{4}-\d{2}-\d{2}$/.test(date || '') || Number.isNaN(Date.parse(date))) {
  throw new Error('Supply the actual content-edit date: npm run sitemap:stamp -- YYYY-MM-DD')
}
const root = new URL('../dist/', import.meta.url).pathname
const manifestFile = new URL('../src/data/sitemap-lastmod.json', import.meta.url)
const previous = existsSync(manifestFile) ? JSON.parse(readFileSync(manifestFile, 'utf8')) : {}
const next = {}
let changed = 0
function inspect(directory) {
  for (const name of readdirSync(directory)) {
    const file = join(directory, name)
    if (statSync(file).isDirectory()) { inspect(file); continue }
    if (name !== 'index.html') continue
    const html = readFileSync(file, 'utf8')
    const canonical = load(html)('link[rel="canonical"]').attr('href')
    if (!canonical) continue
    const path = new URL(canonical).pathname
    const hash = contentFingerprint(html)
    const old = previous[path]
    next[path] = { date: old?.hash === hash ? old.date : date, hash }
    if (!old || old.hash !== hash) changed++
  }
}
inspect(root)
writeFileSync(manifestFile, `${JSON.stringify(Object.fromEntries(Object.entries(next).sort(([a], [b]) => a.localeCompare(b))), null, 2)}\n`)
console.log(`${Object.keys(next).length} sitemap content fingerprints recorded; ${changed} new or changed pages stamped ${date}.`)
