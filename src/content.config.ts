import { defineCollection } from 'astro:content'
import { file } from 'astro/loaders'
import { z } from 'astro/zod'

const faqTranslation = z.object({
  question: z.string().min(1),
  nodes: z.array(z.unknown()),
})

const faq = defineCollection({
  loader: file('src/content/faq.json'),
  schema: z.object({
    order: z.number().int().positive(),
    sourceNumber: z.record(z.string(), z.number().int().positive()),
    translations: z.object({
      en: faqTranslation.optional(),
      ja: faqTranslation.optional(),
      fr: faqTranslation.optional(),
      th: faqTranslation.optional(),
      zh: faqTranslation.optional(),
    }),
  }),
})

export const collections = { faq }
