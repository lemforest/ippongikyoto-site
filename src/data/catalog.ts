import pages from './pages.json'
import legacyRoutes from './legacy-routes.json'
import type { Locale, SitePage } from './types'
import { productTranslation } from './product-translations'
import { frenchWebinarBlocks, frenchWebinarText } from './webinar-fr'
import { englishReturnsBlocks, englishReturnsText } from './returns-en'
import { resolveFactTokens } from './resolve-facts'
import { privacyCopy, privacyPath } from './privacy'
import { applyEditorialOverrides } from './editorial-overrides'
import { createChinesePages } from './zh-pages'

type ProductFormat = 'single' | 'refill'

const productSlugs: Record<ProductFormat, string> = {
  single: 'protai-eye-skin-care-mist',
  refill: 'protai-eye-skin-care-mist-10ml-x-2-20ml',
}

export function productPath(locale: Locale, format: ProductFormat = 'single') {
  const prefix = locale === 'en' ? '' : `/${locale}`
  return `${prefix}/product/${productSlugs[format]}/`
}

const routeMap = legacyRoutes as Record<string, string>
export const currentPath = (path: string) => routeMap[path] || path

const sourcePages = resolveFactTokens((pages as SitePage[]).map(applyEditorialOverrides))
  .filter((page) => !new Set([
    '/front-page/', '/fr/accueil/', '/fr/home-francais/', '/ja/ホーム/', '/ja/home-日本語/', '/th/หน้าแรก/', '/th/home-ไทย/',
    '/ja/category/uncategorized/', '/product-category/uncategorized/', '/shop/', '/testimonials/',
    '/story/', '/our-story/', '/fr/notre-histoire/', '/ja/ストーリー/', '/th/เรื่องราว/',
    '/ja/カート/', '/ja/チェックアウト/', '/th/รถเข็น/', '/th/เช็คเอาท์/',
  ]).has(page.path))
  .map((page) => {
    const archivedNavigationOnly = page.lang === 'th' && page.text.startsWith('Skip to content') && page.blocks.length === 0
    return {
      ...page,
      path: currentPath(page.path),
      text: archivedNavigationOnly ? (page.kind === 'commerce' ? 'การสั่งซื้อยังดำเนินการผ่านเว็บไซต์เดิม' : '') : page.text,
      alternates: Object.fromEntries(Object.entries(page.alternates).map(([locale, path]) => [locale, currentPath(path)])),
    }
  })
const formatOf = (path: string): ProductFormat => path.includes('20ml') ? 'refill' : 'single'

const localizedPages = sourcePages.map((page) => {
  if (page.kind === 'product') {
    const format = formatOf(page.path)
    return { ...page, alternates: Object.fromEntries((['en', 'ja', 'fr', 'th', 'zh'] as Locale[]).map((locale) => [locale, productPath(locale, format)])) }
  }
  if (page.path === '/webinar/') return { ...page, alternates: { ...page.alternates, fr: '/fr/webinar/' } }
  if (page.path === '/returns-and-exchanges/') return {
    ...page, title: 'Returns and Exchanges', description: englishReturnsText,
    text: englishReturnsText, blocks: englishReturnsBlocks,
  }
  return page
})

const generatedProductPages: SitePage[] = localizedPages
  .filter((page) => page.kind === 'product')
  .flatMap((page) => (['ja', 'fr', 'th', 'zh'] as Locale[]).map((locale) => {
    const format = formatOf(page.path)
    const translation = productTranslation(locale, format)
    return {
      ...page,
      path: productPath(locale, format),
      lang: locale,
      title: translation?.title || (format === 'single'
        ? 'PROTAI — アイスキンケアミスト 10ml'
        : 'PROTAI — アイスキンケアミスト 10ml × 2（20ml）'),
      description: translation?.lead || '日本製。目元と肌をリフレッシュするミスト美容液。',
      text: translation ? [translation.lead, ...translation.sections.flatMap((section) => [section.title, ...section.lines])].join('\n') : page.text,
      blocks: translation ? translation.sections.flatMap((section) => [
        { type: 'h2', text: section.title },
        ...section.lines.map((text) => ({ type: 'p', text })),
      ]) : page.blocks,
    }
  }))

const frenchWebinar: SitePage = {
  ...localizedPages.find((page) => page.path === '/webinar/')!,
  path: '/fr/webinar/', lang: 'fr', kind: 'webinar', title: 'Webinaire sur le bien-être des yeux',
  description: frenchWebinarBlocks[1].text || '', text: frenchWebinarText,
  blocks: frenchWebinarBlocks, images: [],
}

const privacyPages: SitePage[] = (['en', 'ja', 'fr', 'th', 'zh'] as Locale[]).map((locale) => ({
  path: privacyPath(locale), lang: locale, kind: 'privacy', title: privacyCopy[locale].title,
  description: privacyCopy[locale].description, sourceUrl: '/', text: '', blocks: [], images: [],
  videos: [], links: [], alternates: Object.fromEntries((['en', 'ja', 'fr', 'th', 'zh'] as Locale[]).map((other) => [other, privacyPath(other)])),
}))

const chinesePages = resolveFactTokens(createChinesePages(localizedPages), 'zh')
const chineseByEnglish = new Map(chinesePages.map((page) => [page.alternates.en, page.path]))

export const catalogPages: SitePage[] = [...localizedPages, ...generatedProductPages, frenchWebinar, ...privacyPages, ...chinesePages].map((page) => {
  const englishPath = page.lang === 'en' ? page.path : page.alternates.en
  const chinesePath = englishPath ? chineseByEnglish.get(englishPath) : undefined
  const withChinese = chinesePath ? { ...page, alternates: { ...page.alternates, zh: chinesePath } } : page
  return withChinese.path === '/fr/webinar/' ? withChinese
    : withChinese.path === '/ja/webinar/' || withChinese.path === '/th/webinar/' || withChinese.path === '/zh/webinar/'
      ? { ...withChinese, alternates: { ...withChinese.alternates, fr: '/fr/webinar/' } }
      : withChinese
})
