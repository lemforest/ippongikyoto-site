import { readFile } from 'node:fs/promises'

const entries = JSON.parse(await readFile(new URL('../src/content/faq.json', import.meta.url), 'utf8'))
const ids = new Set()
for (const [index, entry] of entries.entries()) {
  if (!entry.id || ids.has(entry.id)) throw new Error(`Duplicate or empty FAQ ID: ${entry.id}`)
  if (entry.order !== index + 1) throw new Error(`FAQ order is not continuous: ${entry.id}`)
  ids.add(entry.id)
}
for (const lang of ['en', 'ja', 'fr', 'th']) {
  const missing = entries.filter((entry) => !entry.translations[lang]).map((entry) => entry.id)
  const available = entries.length - missing.length
  console.log(`FAQ ${lang}: ${available}/${entries.length} shared IDs translated`)
  if (missing.length) console.warn(`FAQ ${lang} missing translations: ${missing.join(', ')}`)
}
