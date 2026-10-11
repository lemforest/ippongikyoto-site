import { readFileSync, writeFileSync } from 'node:fs'

const pages = JSON.parse(readFileSync(new URL('../src/data/pages.json', import.meta.url)))
const routes = JSON.parse(readFileSync(new URL('../src/data/legacy-routes.json', import.meta.url)))
const sourcePaths = new Set(pages.map((page) => page.path))
sourcePaths.add('/ja/product/protai-eye-skin-care-mistg/')
const targetPaths = new Set([...sourcePaths].map((path) => routes[path] || path))

for (const [from, to] of Object.entries(routes)) {
  if (!sourcePaths.has(from)) throw new Error(`Unknown legacy route: ${from}`)
  if (!targetPaths.has(to)) throw new Error(`Unknown redirect destination: ${to}`)
  if (from === to || routes[to]) throw new Error(`Invalid redirect chain: ${from} -> ${to}`)
  if (!/^\/[\x20-\x7e]*$/.test(to)) throw new Error(`Non-ASCII destination: ${to}`)
}

const lines = [
  '# Generated from src/data/legacy-routes.json by scripts/build-redirects.mjs.',
  '# Cloudflare Pages reads this file as HTTP 301 redirects.',
  ...Object.entries(routes).sort(([a], [b]) => a.localeCompare(b, 'en'))
    // Clients may send either escape case; Pages matches the literal encoded path.
    .flatMap(([from, to]) => {
      const encoded = encodeURI(from)
      const lower = encoded.replace(/%[0-9A-F]{2}/g, (part) => part.toLowerCase())
      return [...new Set([encoded, lower])].map((source) => `${source} ${to} 301`)
    }),
  '',
]
writeFileSync(new URL('../public/_redirects', import.meta.url), lines.join('\n'))
