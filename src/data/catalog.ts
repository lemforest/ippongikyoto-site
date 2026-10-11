import pages from './pages.json'
import legacyRoutes from './legacy-routes.json'
import type { Locale, SitePage } from './types'

type ProductFormat = 'single' | 'refill'

const productSlugs: Record<ProductFormat, string> = {
  single: 'protai-eye-skin-care-mist',
  refill: 'protai-eye-skin-care-mist-10ml-x-2-20ml',
}

export function productPath(locale: Locale, format: ProductFormat = 'single') {
  const prefix = locale === 'ja' ? '/ja' : ''
  return `${prefix}/product/${productSlugs[format]}/`
}

const routeMap = legacyRoutes as Record<string, string>
export const currentPath = (path: string) => routeMap[path] || path

const sourcePages = (pages as SitePage[])
  .filter((page) => !['/fr/accueil/', '/ja/ホーム/', '/th/หน้าแรก/'].includes(page.path))
  .map((page) => ({
    ...page,
    path: currentPath(page.path),
    alternates: Object.fromEntries(Object.entries(page.alternates).map(([locale, path]) => [locale, currentPath(path)])),
  }))
const formatOf = (path: string): ProductFormat => path.includes('20ml') ? 'refill' : 'single'

const englishPages = sourcePages.map((page) => page.kind === 'product'
  ? { ...page, alternates: { ...page.alternates, en: page.path, ja: productPath('ja', formatOf(page.path)) } }
  : page)

const japaneseProductPages: SitePage[] = englishPages
  .filter((page) => page.kind === 'product')
  .map((page) => {
    const format = formatOf(page.path)
    return {
      ...page,
      path: productPath('ja', format),
      lang: 'ja',
      title: format === 'single'
        ? 'PROTAI — アイスキンケアミスト 10ml'
        : 'PROTAI — アイスキンケアミスト 10ml × 2（20ml）',
      description: '日本製。目元と肌をリフレッシュするミスト美容液。',
    }
  })

export const catalogPages: SitePage[] = [...englishPages, ...japaneseProductPages]
