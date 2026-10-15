import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import sitemapLastmod from './src/data/sitemap-lastmod.json' with { type: 'json' }

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://ippongikyoto.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({
    filter: (url) => !/\/(?:404|404\.html)\/?$/.test(url),
    serialize: (item) => {
      const path = new URL(item.url).pathname
      const date = sitemapLastmod[path]?.date
      return { ...item, ...(date ? { lastmod: date } : {}) }
    },
    i18n: {
      defaultLocale: 'en',
      locales: { en: 'en', ja: 'ja', fr: 'fr', th: 'th', zh: 'zh-TW' },
    },
  })],
})
