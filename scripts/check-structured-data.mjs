import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { load } from 'cheerio'
import seo from '../src/data/seo.json' with { type: 'json' }

const root = new URL('../dist/', import.meta.url).pathname
const failures = []
let checked = 0
let products = 0
let faqPages = 0

function inspect(directory) {
  for (const name of readdirSync(directory)) {
    const file = join(directory, name)
    if (statSync(file).isDirectory()) { inspect(file); continue }
    if (!file.endsWith('.html')) continue

    const route = `/${relative(root, file).replace(/index\.html$/, '').replace(/\\/g, '/')}`
    const $ = load(readFileSync(file, 'utf8'))
    const scripts = $('script[type="application/ld+json"]')
    if (name === '404.html') {
      if (scripts.length) failures.push('404 page must not contain JSON-LD')
      continue
    }
    checked++
    if (scripts.length !== 1) { failures.push(`${route}: expected one JSON-LD graph`); continue }
    let data
    try { data = JSON.parse(scripts.html()) } catch { failures.push(`${route}: invalid JSON-LD`); continue }
    if (data['@context'] !== 'https://schema.org' || !Array.isArray(data['@graph'])) {
      failures.push(`${route}: invalid Schema.org graph`)
      continue
    }
    const graph = data['@graph']
    const nodes = (type) => graph.filter((node) => node['@type'] === type)
    const site = new URL($('link[rel="canonical"]').attr('href') || '').origin
    const organization = nodes('Organization')[0]
    if (nodes('Organization').length !== 1 || organization?.name !== 'IPPONGI KYOTO' ||
      organization?.url !== `${site}/` || !organization?.logo?.startsWith(`${site}/`) ||
      organization?.email !== 'support@ippongikyoto.com' ||
      organization?.address?.postalCode !== '600-8223') failures.push(`${route}: incomplete Organization`)

    const breadcrumb = nodes('BreadcrumbList')[0]
    if (route === '/') {
      if (breadcrumb) failures.push(`${route}: homepage should not have a breadcrumb`)
    } else if (nodes('BreadcrumbList').length !== 1 ||
      breadcrumb.itemListElement?.length !== 2 ||
      breadcrumb.itemListElement[1]?.item !== `${site}${route}` ||
      breadcrumb.itemListElement[1]?.position !== 2) {
      failures.push(`${route}: invalid breadcrumb`)
    }

    if (route.includes('/product/')) {
      products++
      const product = nodes('Product')[0]
      const price = Number($('.product-price').text().replace(/[^\d]/g, ''))
      const expectedAvailability = route.includes('20ml') ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock'
      if (nodes('Product').length !== 1 || product?.name !== $('.product-hero h1').text().trim() ||
        product?.offers?.price !== price || product?.offers?.priceCurrency !== 'JPY' ||
        product?.offers?.availability !== expectedAvailability ||
        product?.offers?.url !== $('.product-hero .primary-link').attr('href') ||
        product?.image !== new URL($('.product-hero-media img').attr('src'), site).href) {
        failures.push(`${route}: Product/Offer differs from visible product name, image, price or source link`)
      }
    } else if (nodes('Product').length) failures.push(`${route}: Product on a non-product page`)

    if (route.endsWith('/faq/')) faqPages++
    if (nodes('FAQPage').length || nodes('Question').length) failures.push(`${route}: FAQ schema was released before chapter-one rewrite`)
    if (nodes('Review').length || nodes('AggregateRating').length ||
      /"@type"\s*:\s*"(?:Review|AggregateRating)"/.test(scripts.html())) {
      failures.push(`${route}: unverified rating data`)
    }
  }
}

inspect(root)
const expectedRoutes = Object.keys(seo).filter((route) => route !== '/404/')
if (checked !== expectedRoutes.length ||
  products !== expectedRoutes.filter((route) => route.includes('/product/')).length ||
  faqPages !== expectedRoutes.filter((route) => route.endsWith('/faq/')).length) {
  failures.push(`unexpected page counts: ${checked} content, ${products} products, ${faqPages} FAQs`)
}
if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
} else {
  console.log(`${checked} content pages checked: Organization, breadcrumbs, ${products} Product/Offer pages; ${faqPages} FAQ schemas withheld.`)
}
