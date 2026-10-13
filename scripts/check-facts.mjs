import { readFile, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { load } from 'cheerio'
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
if (facts.products.shelfLifeMonths !== 36) failures.push('Product shelf life must be 36 months')
const shelfLifeCopy = {
  en: '3 years',
  fr: 'La durée de conservation indiquée est de trois ans.',
  th: 'อายุการเก็บรักษาที่ระบุคือสามปี',
  zh: '標示保存期限為三年',
}
for (const [locale, expected] of Object.entries(shelfLifeCopy)) {
  for (const slug of ['protai-eye-skin-care-mist', 'protai-eye-skin-care-mist-10ml-x-2-20ml']) {
    const path = join('dist', locale === 'en' ? '' : locale, 'product', slug, 'index.html')
    const text = load(await readFile(path, 'utf8'))('main').text()
    if (!text.includes(expected)) failures.push(`${path}: missing three-year shelf life`)
    if (/2 years|deux ans|兩年|สองปี/.test(text)) failures.push(`${path}: stale two-year shelf life`)
  }
}
if (failures.length) throw new Error(failures.join('\n'))
console.log('Shared facts have one source; product shelf life is three years in all displayed translations.')
