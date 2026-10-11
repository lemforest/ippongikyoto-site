import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { load } from 'cheerio'

const root = new URL('../dist/', import.meta.url).pathname
const failures = []
const labels = {
  en: ['Skip to content', 'Open menu', 'Primary navigation', 'Mobile navigation'],
  ja: ['本文へ移動', 'メニューを開く', 'メインナビゲーション', 'モバイルナビゲーション'],
  fr: ['Aller au contenu', 'Ouvrir le menu', 'Navigation principale', 'Navigation mobile'],
  th: ['ข้ามไปยังเนื้อหา', 'เปิดเมนู', 'เมนูนำทางหลัก', 'เมนูนำทางมือถือ'],
}
const read = (path) => load(readFileSync(join(root, path, 'index.html'), 'utf8'))

for (const locale of ['en', 'ja', 'fr', 'th']) {
  const prefix = locale === 'en' ? '' : `/${locale}`
  const route = `${prefix}/`
  const $ = read(route)
  const actual = [$('.skip-link').text(), $('.menu-toggle').attr('aria-label'), $('.desktop-nav').attr('aria-label'), $('.mobile-nav').attr('aria-label')]
  if ($('html').attr('lang') !== locale) failures.push(`${route}: wrong html language`)
  if (actual.some((label, i) => label !== labels[locale][i])) failures.push(`${route}: untranslated interface label`)
  for (const nav of ['.desktop-nav', '.mobile-nav']) {
    $(nav).find('a').each((_, link) => {
      const href = $(link).attr('href')
      if (!href?.startsWith(`${prefix}/`)) failures.push(`${route}: ${nav} leaves ${locale} for ${href}`)
      if (!existsSync(join(root, href || '', 'index.html'))) failures.push(`${route}: ${nav} has missing destination ${href}`)
    })
  }
}

for (const locale of ['fr', 'th']) {
  for (const format of ['protai-eye-skin-care-mist', 'protai-eye-skin-care-mist-10ml-x-2-20ml']) {
    const path = `/${locale}/product/${format}/`
    const $ = read(path)
    if ($('html').attr('lang') !== locale) failures.push(`${path}: wrong html language`)
    if (!$('.product-detail-item').length) failures.push(`${path}: translated product details missing`)
    if ($('.product-hero-copy .product-price').text().trim() === '') failures.push(`${path}: product price missing`)
    if (locale === 'th' && !/[\u0e00-\u0e7f]/u.test($('.product-detail-groups').text())) failures.push(`${path}: Thai product copy missing`)
    if (locale === 'fr' && !/Composition|Conservation/.test($('.product-detail-groups').text())) failures.push(`${path}: French product copy missing`)
  }
}

const frenchWebinar = read('/fr/webinar/')
if (frenchWebinar('html').attr('lang') !== 'fr' || !/S’inscrire au webinaire/.test(frenchWebinar('main').text())) failures.push('/fr/webinar/: French webinar content missing')
const englishReturns = read('/returns-and-exchanges/')
if (/[\u3040-\u30ff\u3400-\u9fff]/u.test(englishReturns('main').text())) failures.push('/returns-and-exchanges/: Japanese text remains in English content')
const japaneseMixed = read('/ja/front-page/')
if (japaneseMixed('.detail-body').attr('lang') !== 'en') failures.push('/ja/front-page/: English archive body lacks lang attribute')
for (const path of ['/th/cart/', '/th/checkout/', '/th/story/']) {
  if (read(path)('main').text().includes('Skip to content')) failures.push(`${path}: archived English navigation appears as content`)
}

if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1 }
else console.log('Four localized interfaces, five new pages, English returns and mixed-language archive labels checked.')
