import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { load } from 'cheerio'

const pages = JSON.parse(readFileSync(new URL('../src/data/pages.json', import.meta.url)))
const routes = JSON.parse(readFileSync(new URL('../src/data/legacy-routes.json', import.meta.url)))
const redirects = readFileSync(new URL('../dist/_redirects', import.meta.url), 'utf8')
const root = new URL('../dist/', import.meta.url).pathname
const failures = []
const current = (path) => routes[path] || path
const built = (path) => existsSync(join(root, path, 'index.html')) || existsSync(join(root, path.slice(1)))

for (const page of pages) {
  const destination = current(page.path)
  if (!/^\/[\x20-\x7e]*$/.test(destination)) failures.push(`Non-ASCII route: ${destination}`)
  if (!built(destination)) failures.push(`Missing page: ${page.path} -> ${destination}`)
  if (destination !== page.path) {
    for (const encoded of new Set([encodeURI(page.path), encodeURI(page.path).replace(/%[0-9A-F]{2}/g, (part) => part.toLowerCase())])) {
      if (!redirects.split('\n').includes(`${encoded} ${destination} 301`)) failures.push(`Missing 301: ${page.path} -> ${destination}`)
    }
  }
}

function inspect(directory) {
  for (const filename of readdirSync(directory)) {
    const file = join(directory, filename)
    if (statSync(file).isDirectory()) inspect(file)
    else if (file.endsWith('.html')) {
      const $ = load(readFileSync(file, 'utf8'))
      $('a[href], link[rel="canonical"][href], link[rel="alternate"][href]').each((_, element) => {
        const href = $(element).attr('href')
        if (!href?.startsWith('/')) return
        const path = decodeURI(new URL(href, 'https://example.invalid').pathname)
        if (routes[path]) failures.push(`Old internal link: ${file} -> ${path}`)
        if (/[^\x00-\x7f]/.test(path)) failures.push(`Non-ASCII internal link: ${file} -> ${path}`)
        if (!built(path)) failures.push(`Broken internal link: ${file} -> ${path}`)
      })
    }
  }
}
inspect(root)

if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
} else {
  console.log(`${pages.length} archived URLs checked; ${Object.keys(routes).length} changed routes have 301 rules; internal links resolve.`)
}
