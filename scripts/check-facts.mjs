import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import facts from '../src/data/facts.json' with { type: 'json' }

async function files(dir) {
  const result = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) result.push(...await files(path))
    else result.push(path)
  }
  return result
}

const literals = [facts.products.single.priceLabel, facts.sales.bottlesSoldLabel, facts.organization.postalCode]
const factSource = await readFile('src/data/facts.json', 'utf8')
const failures = []
for (const literal of literals) {
  if (factSource.split(literal).length !== 2) failures.push(`Fact must appear once in its source: ${literal}`)
}
for (const path of await files('src')) {
  if (path === 'src/data/facts.json' || path === 'src/data/image-assets.json' || !/\.(astro|ts|json)$/.test(path)) continue
  const source = await readFile(path, 'utf8')
  for (const literal of literals) if (source.includes(literal)) failures.push(`${path}: duplicated fact ${literal}`)
}
for (const path of await files('dist')) {
  if (!path.endsWith('.html')) continue
  const html = await readFile(path, 'utf8')
  if (/\{\{[A-Z_]+\}\}/.test(html)) failures.push(`${path}: unresolved fact token`)
}
if (failures.length) throw new Error(failures.join('\n'))
console.log('Shared price, sales and postal facts have one source; rendered pages contain no fact tokens.')
