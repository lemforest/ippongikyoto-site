export type Locale = 'en' | 'ja' | 'fr' | 'th'

export interface ContentBlock {
  type: string
  text?: string
  rows?: string[][]
  url?: string
  alt?: string
}

export interface SitePage {
  path: string
  lang: Locale
  kind: string
  title: string
  description: string
  sourceUrl: string
  text: string
  blocks: ContentBlock[]
  images: { url: string; source: string }[]
  productGallery?: string[]
  featureImage?: string
  videos: string[]
  links: { href: string; text: string }[]
  alternates: Partial<Record<Locale, string>>
}
