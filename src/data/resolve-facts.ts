import facts from './facts.json'
import type { Locale } from './types'

export function resolveFactTokens<T>(value: T, locale?: Locale): T {
  const replacements: Record<string, string> = {
    PRICE_SINGLE: facts.products.single.priceLabel,
    PRICE_REFILL: facts.products.refill.priceLabel,
    BOTTLES_SOLD: facts.sales.bottlesSoldLabel,
    POSTAL_CODE: facts.organization.postalCode,
    EMAIL: facts.organization.email,
    ...(locale ? {
      FOOTER_ADDRESS: facts.organization.addresses[locale].footer,
      CONTACT_ADDRESS: facts.organization.addresses[locale].contact,
      BUSINESS_HOURS: facts.organization.businessHours[locale],
    } : {}),
  }
  if (typeof value === 'string') {
    let text: string = value
    for (let pass = 0; pass < 2; pass += 1) {
      text = text.replace(/\{\{([A-Z_]+)\}\}/g, (_, key: string) => {
        if (!replacements[key]) throw new Error(`Unknown fact token: ${key}`)
        return replacements[key]
      })
    }
    return text as T
  }
  if (Array.isArray(value)) return value.map((item) => resolveFactTokens(item, locale)) as T
  if (value && typeof value === 'object') return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, resolveFactTokens(item, locale)]),
  ) as T
  return value
}
