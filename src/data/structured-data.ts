import type { SitePage } from './types'

// These are the prices shown on the static product pages. Stock was checked
// against the existing store on 2026-10-11; recheck it before publication.
const products = {
  single: { price: 15400, availability: 'https://schema.org/InStock' },
  refill: { price: 26400, availability: 'https://schema.org/OutOfStock' },
} as const

export function structuredData(page: SitePage, site: string) {
  if (page.kind === 'not-found') return null

  const absolute = (path: string) => new URL(path, `${site}/`).href
  const organizationId = `${site}/#organization`
  const visibleTitle = page.kind === 'product' && page.lang === 'ja'
    ? `PROTAI${page.title.replace(/^PROTAI\s*[—–-]\s*/, '')}`
    : page.title
  const graph: Record<string, unknown>[] = [{
    '@type': 'Organization',
    '@id': organizationId,
    name: 'IPPONGI KYOTO',
    url: `${site}/`,
    logo: absolute('/brand/ippongi-logo-20250512.png'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: '#402 Daini-Kyoto-Bldg., 227 Daikokucho, Shimogyo-ku',
      addressLocality: 'Kyoto',
      addressRegion: 'Kyoto',
      postalCode: '600-8223',
      addressCountry: 'JP',
    },
    email: 'support@ippongikyoto.com',
  }]

  if (page.path !== '/') {
    const home = page.lang === 'en' ? '/' : `/${page.lang}/`
    const homeName = { en: 'Home', ja: 'ホーム', fr: 'Accueil', th: 'หน้าแรก' }[page.lang]
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${absolute(page.path)}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: homeName, item: absolute(home) },
        { '@type': 'ListItem', position: 2, name: visibleTitle, item: absolute(page.path) },
      ],
    })
  }

  if (page.kind === 'product') {
    const format = page.path.includes('20ml') ? 'refill' : 'single'
    const product = products[format]
    graph.push({
      '@type': 'Product',
      '@id': `${absolute(page.path)}#product`,
      name: visibleTitle,
      image: absolute(page.productGallery?.[0] || page.featureImage || (format === 'refill'
        ? '/media/2025/10/20ml-3.webp' : '/media/2025/10/10ml-4.webp')),
      brand: { '@type': 'Brand', name: 'PROTAI' },
      offers: {
        '@type': 'Offer',
        url: page.sourceUrl,
        priceCurrency: 'JPY',
        price: product.price,
        availability: product.availability,
        seller: { '@id': organizationId },
      },
    })
  }

  // FAQPage is intentionally withheld until chapter one answers are revised.
  // The current visible answers contain claims that must not be promoted into search results.
  return { '@context': 'https://schema.org', '@graph': graph }
}
