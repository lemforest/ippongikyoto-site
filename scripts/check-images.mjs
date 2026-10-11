import { readFile, readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { load } from 'cheerio'

async function htmlFiles(dir) {
  const result = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) result.push(...await htmlFiles(path))
    else if (entry.name.endsWith('.html')) result.push(path)
  }
  return result
}

let pages = 0
let images = 0
let responsive = 0
const failures = []
for (const file of await htmlFiles('dist')) {
  const $ = load(await readFile(file, 'utf8'))
  const lang = $('html').attr('lang')
  const route = file.replace(/^dist/, '')
  pages += 1
  for (const img of $('img').toArray()) {
    images += 1
    const element = $(img)
    const src = element.attr('src') || ''
    const alt = element.attr('alt')
    const width = Number(element.attr('width'))
    const height = Number(element.attr('height'))
    if (!width || !height) failures.push(`${route}: image dimensions missing: ${src}`)
    if (alt === undefined) failures.push(`${route}: alt attribute missing: ${src}`)
    if (alt === '' && !['/brand/ippongi-logo-96.webp', '/media/2025/06/Protai-Molecule.webp'].includes(src)) failures.push(`${route}: content alt empty: ${src}`)
    if (!element.attr('loading')) failures.push(`${route}: loading mode missing: ${src}`)
    if (element.attr('srcset')) {
      responsive += 1
      if (!element.attr('sizes')) failures.push(`${route}: sizes missing: ${src}`)
      for (const candidate of element.attr('srcset').split(', ')) {
        const candidatePath = candidate.split(' ')[0]
        if (!await stat(`dist${candidatePath}`).catch(() => null)) failures.push(`${route}: responsive file missing: ${candidatePath}`)
      }
    }
    if (element.closest('.inline-source-image').length && width > 800 && !element.attr('srcset')) failures.push(`${route}: large content image lacks srcset: ${src}`)
    if (element.closest('.page-hero-media, .product-hero-media').length && (element.attr('loading') !== 'eager' || element.attr('fetchpriority') !== 'high')) failures.push(`${route}: hero image priority missing: ${src}`)
  }
  if ($('.home-hero').length) {
    const poster = $('.hero-film').attr('poster')
    if (!poster || $(`link[rel="preload"][as="image"][href="${poster}"][fetchpriority="high"]`).length !== 1) failures.push(`${route}: hero video poster preload missing`)
  }
  if (lang === 'ja' && route.includes('/faq/') && $('.faq-qr-grid img').toArray().some((img) => !/QRコード/.test($(img).attr('alt') || ''))) failures.push(`${route}: Japanese QR alt is not localized`)
}
if (failures.length) throw new Error(`Image checks failed:\n${failures.join('\n')}`)
console.log(`${pages} pages checked: ${images} sized images, ${responsive} responsive images, localized content descriptions`)
