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
  zh: ['跳至主要內容', '開啟選單', '主要導覽', '行動版導覽'],
}
const read = (path) => load(readFileSync(join(root, path, 'index.html'), 'utf8'))

for (const locale of ['en', 'ja', 'fr', 'th', 'zh']) {
  const prefix = locale === 'en' ? '' : `/${locale}`
  const route = `${prefix}/`
  const $ = read(route)
  const actual = [$('.skip-link').text(), $('.menu-toggle').attr('aria-label'), $('.desktop-nav').attr('aria-label'), $('.mobile-nav').attr('aria-label')]
  if ($('html').attr('lang') !== (locale === 'zh' ? 'zh-TW' : locale)) failures.push(`${route}: wrong html language`)
  if (actual.some((label, i) => label !== labels[locale][i])) failures.push(`${route}: untranslated interface label`)
  for (const nav of ['.desktop-nav', '.mobile-nav']) {
    $(nav).find('a').each((_, link) => {
      const href = $(link).attr('href')
      if (!href?.startsWith(`${prefix}/`)) failures.push(`${route}: ${nav} leaves ${locale} for ${href}`)
      if (!existsSync(join(root, href || '', 'index.html'))) failures.push(`${route}: ${nav} has missing destination ${href}`)
    })
  }
}

for (const locale of ['fr', 'th', 'zh']) {
  for (const format of ['protai-eye-skin-care-mist', 'protai-eye-skin-care-mist-10ml-x-2-20ml']) {
    const path = `/${locale}/product/${format}/`
    const $ = read(path)
    if ($('html').attr('lang') !== (locale === 'zh' ? 'zh-TW' : locale)) failures.push(`${path}: wrong html language`)
    if (!$('.product-detail-item').length) failures.push(`${path}: translated product details missing`)
    if ($('.product-hero-copy .product-price').text().trim() === '') failures.push(`${path}: product price missing`)
    if (locale === 'th' && !/[\u0e00-\u0e7f]/u.test($('.product-detail-groups').text())) failures.push(`${path}: Thai product copy missing`)
    if (locale === 'fr' && !/Composition|Conservation/.test($('.product-detail-groups').text())) failures.push(`${path}: French product copy missing`)
    if (locale === 'zh' && !/[\u3400-\u9fff]/u.test($('.product-detail-groups').text())) failures.push(`${path}: Chinese product copy missing`)
  }
}

const frenchWebinar = read('/fr/webinar/')
if (frenchWebinar('html').attr('lang') !== 'fr' || !/S’inscrire au webinaire/.test(frenchWebinar('main').text())) failures.push('/fr/webinar/: French webinar content missing')
const englishReturns = read('/returns-and-exchanges/')
if (/[\u3040-\u30ff\u3400-\u9fff]/u.test(englishReturns('main').text())) failures.push('/returns-and-exchanges/: Japanese text remains in English content')
const chineseWebinar = read('/zh/webinar/')
const registration = chineseWebinar('a[data-track-external="webinar"]')
if (registration.attr('href') !== 'https://prosunfun.protai.com.tw/f/eyecareseminar') failures.push('/zh/webinar/: Chinese registration URL differs from requested page')
if (!/[\u3400-\u9fff]/u.test(chineseWebinar('main').text())) failures.push('/zh/webinar/: Chinese content missing')

if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1 }
else console.log('Five localized interfaces, translated product pages and the Chinese webinar destination checked.')
