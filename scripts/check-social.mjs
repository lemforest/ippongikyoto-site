import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { load } from 'cheerio'
import sharp from 'sharp'
import seo from '../src/data/seo.json' with { type: 'json' }

const root = new URL('../dist/', import.meta.url).pathname
const site = (process.env.PUBLIC_SITE_URL || 'https://ippongikyoto.com').replace(/\/$/, '')
const locale = { en: 'en_US', ja: 'ja_JP', fr: 'fr_FR', th: 'th_TH' }
const failures = []

for (const [route, page] of Object.entries(seo)) {
  const file = route === '/404/' ? join(root, '404.html') : join(root, route, 'index.html')
  if (!existsSync(file)) { failures.push(`${route}: missing HTML`); continue }
  const $ = load(readFileSync(file, 'utf8'))
  const og = (property) => $(`meta[property="${property}"]`).attr('content')
  const twitter = (name) => $(`meta[name="${name}"]`).attr('content')
  const imagePath = route.includes('/product/')
    ? route.includes('20ml') ? '/share/protai-20ml.jpg' : '/share/protai-10ml.jpg'
    : '/share/ippongi-default.jpg'
  if (og('og:image') !== `${site}${imagePath}` || twitter('twitter:image') !== og('og:image')) {
    failures.push(`${route}: wrong share image`)
  }
  if (og('og:image:width') !== '1200' || og('og:image:height') !== '630' ||
    og('og:locale') !== locale[page.lang] || twitter('twitter:card') !== 'summary_large_image') {
    failures.push(`${route}: incomplete image dimensions or locale`)
  }
  if (og('og:title') !== $('title').text() || og('og:description') !== $('meta[name="description"]').attr('content')) {
    failures.push(`${route}: share text differs from page metadata`)
  }
  if (route !== '/404/' && og('og:url') !== $('link[rel="canonical"]').attr('href')) {
    failures.push(`${route}: og:url differs from canonical`)
  }
  const alternates = $('link[rel="alternate"][hreflang]').map((_, element) => $(element).attr('hreflang')).get()
    .filter((code) => code !== 'x-default' && code !== page.lang).map((code) => locale[code]).sort()
  const ogAlternates = $('meta[property="og:locale:alternate"]').map((_, element) => $(element).attr('content')).get().sort()
  if (JSON.stringify(alternates) !== JSON.stringify(ogAlternates)) failures.push(`${route}: wrong alternate locales`)
  if ($('link[rel="icon"][href="/favicon.ico"]').length !== 1 ||
    $('link[rel="icon"][href="/favicon.svg"]').length !== 1 ||
    $('link[rel="apple-touch-icon"][href="/apple-touch-icon.png"]').length !== 1) {
    failures.push(`${route}: missing favicon variants`)
  }
}

for (const name of ['ippongi-default.jpg', 'protai-10ml.jpg', 'protai-20ml.jpg']) {
  const image = await sharp(join(root, 'share', name)).metadata()
  if (image.width !== 1200 || image.height !== 630 || image.format !== 'jpeg') failures.push(`${name}: wrong image format or dimensions`)
}
const touch = await sharp(join(root, 'apple-touch-icon.png')).metadata()
if (touch.width !== 180 || touch.height !== 180) failures.push('apple-touch-icon.png: wrong dimensions')
if (!existsSync(join(root, 'favicon.svg')) || readFileSync(join(root, 'favicon.ico')).readUInt16LE(2) !== 1) {
  failures.push('missing SVG or ICO favicon')
}

if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1 }
else console.log(`${Object.keys(seo).length} pages checked: share image, URL, locale, dimensions and favicon variants.`)
