import { copyFileSync, existsSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('../dist/', import.meta.url).pathname
for (const lang of ['ja', 'fr', 'th', 'zh']) {
  const source = join(root, lang, '404', 'index.html')
  if (!existsSync(source)) throw new Error(`Missing ${lang} 404 page`)
  copyFileSync(source, join(root, lang, '404.html'))
  rmSync(join(root, lang, '404'), { recursive: true })
}
console.log('Five language-specific 404.html pages prepared for Cloudflare Pages.')
