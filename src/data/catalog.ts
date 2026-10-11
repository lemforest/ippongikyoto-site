import pages from './pages.json'
import legacyRoutes from './legacy-routes.json'
import type { Locale, SitePage } from './types'
import { productTranslation } from './product-translations'
import { frenchWebinarBlocks, frenchWebinarText } from './webinar-fr'
import { englishReturnsBlocks, englishReturnsText } from './returns-en'

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

const sourcePages = (pages as SitePage[])
  .filter((page) => !['/fr/accueil/', '/ja/ホーム/', '/th/หน้าแรก/'].includes(page.path))
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
    return { ...page, alternates: Object.fromEntries((['en', 'ja', 'fr', 'th'] as Locale[]).map((locale) => [locale, productPath(locale, format)])) }
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
  .flatMap((page) => (['ja', 'fr', 'th'] as Locale[]).map((locale) => {
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

export const catalogPages: SitePage[] = [...localizedPages, ...generatedProductPages, frenchWebinar].map((page) =>
  page.path === '/fr/webinar/' ? page
    : page.path === '/ja/webinar/' || page.path === '/th/webinar/'
      ? { ...page, alternates: { ...page.alternates, fr: '/fr/webinar/' } }
      : page)
