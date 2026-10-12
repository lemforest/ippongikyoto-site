import type { SitePage } from './types'
import facts from './facts.json'
import { purchaseUrl } from './commerce'
import faqEntries from '../content/faq.json'
import { zhFaq } from './zh-faq'

type FaqRun = { text: string }
type FaqNode =
  | { type: 'p' | 'li'; runs: FaqRun[] }
  | { type: 'table'; rows: string[][] }
  | { type: 'qrGrid'; items: { label: FaqRun[] }[] }
  | { type: 'image'; url: string }
type FaqTranslation = { question: string; nodes: FaqNode[] }
const translatedFaq = faqEntries as { translations: Partial<Record<'en' | 'ja' | 'fr' | 'th', FaqTranslation>> }[]

// Recheck stock against the store before publication.
const products = {
  single: { price: facts.products.single.priceJPY, availability: facts.products.single.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' },
  refill: { price: facts.products.refill.priceJPY, availability: facts.products.refill.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' },
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
    legalName: facts.organization.legalName,
    alternateName: facts.organization.alternateName,
    url: `${site}/`,
    logo: absolute('/brand/ippongi-logo-20250512.png'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: '#402 Daini-Kyoto-Bldg., 227 Daikokucho, Aburanokoji Higashi-iru, Shichijyo-Dori, Shimogyo-ku',
      addressLocality: 'Kyoto',
      addressRegion: 'Kyoto',
      postalCode: facts.organization.postalCode,
      addressCountry: 'JP',
    },
    email: facts.organization.email,
    telephone: facts.organization.telephone,
    contactPoint: [{
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: facts.organization.email,
      telephone: facts.organization.telephone,
      availableLanguage: ['English', 'Japanese', 'French', 'Thai', 'Traditional Chinese'],
    }],
  }]

  if (page.path !== '/') {
    const home = page.lang === 'en' ? '/' : `/${page.lang}/`
    const homeName = { en: 'Home', ja: 'ホーム', fr: 'Accueil', th: 'หน้าแรก', zh: '首頁' }[page.lang]
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
      description: page.description,
      image: (page.productGallery?.length ? page.productGallery : [page.featureImage || (format === 'refill'
        ? '/media/2025/10/20ml-3.webp' : '/media/2025/10/10ml-4.webp')]).map(absolute),
      brand: { '@type': 'Brand', name: 'PROTAI' },
      offers: {
        '@type': 'Offer',
        url: purchaseUrl(page.lang, format),
        priceCurrency: 'JPY',
        price: product.price,
        availability: product.availability,
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: { '@type': 'MonetaryAmount', value: 0, currency: 'JPY' },
          shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'JP' },
        },
        hasMerchantReturnPolicy: {
          '@type': 'MerchantReturnPolicy',
          applicableCountry: 'JP',
          returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
          merchantReturnDays: facts.fulfillment.returnContactDays,
          returnMethod: 'https://schema.org/ReturnByMail',
          url: absolute(page.lang === 'ja' ? '/ja/returns-and-exchanges/' : page.lang === 'zh' ? '/zh/returns-and-exchanges/' : '/returns-and-exchanges/'),
        },
        seller: { '@id': organizationId },
      },
    })
  }

  if (page.kind === 'faq') {
    const entries = page.lang === 'zh'
      ? zhFaq.map(([question, answer]) => ({ question, answer }))
      : translatedFaq.flatMap((entry) => {
        const translation = entry.translations[page.lang as 'en' | 'ja' | 'fr' | 'th']
        if (!translation) return []
        const answer = translation.nodes.flatMap((node) => {
          if (node.type === 'p' || node.type === 'li') return [node.runs.map((run) => run.text).join('')]
          if (node.type === 'table') return [node.rows.map((row) => row.join(' ')).join(' ')]
          if (node.type === 'qrGrid') return [node.items.map((item) => item.label.map((run) => run.text).join('')).join(' ')]
          return []
        }).join(' ').trim()
        return [{ question: translation.question, answer }]
      })
    graph.push({
      '@type': 'FAQPage',
      '@id': `${absolute(page.path)}#faq`,
      mainEntity: entries.map(({ question, answer }) => ({
        '@type': 'Question', name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer },
      })),
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}
