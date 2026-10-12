import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://ippongikyoto.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({
    i18n: {
      defaultLocale: 'en',
      locales: { en: 'en', ja: 'ja', fr: 'fr', th: 'th', zh: 'zh-TW' },
    },
  })],
})
