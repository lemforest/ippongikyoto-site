import { readFile } from 'node:fs/promises'

const entries = JSON.parse(await readFile(new URL('../src/content/faq.json', import.meta.url), 'utf8'))
if (entries.length !== 22) throw new Error(`Expected 22 questions shared by all locales, found ${entries.length}`)
const ids = new Set()
for (const [index, entry] of entries.entries()) {
  if (!entry.id || ids.has(entry.id)) throw new Error(`Duplicate or empty FAQ ID: ${entry.id}`)
  if (entry.order !== index + 1) throw new Error(`FAQ order is not continuous: ${entry.id}`)
  ids.add(entry.id)
}
for (const lang of ['en', 'ja', 'fr', 'th']) {
  const missing = entries.filter((entry) => !entry.translations[lang]).map((entry) => entry.id)
  if (missing.length) throw new Error(`FAQ ${lang} missing translations: ${missing.join(', ')}`)
  const incomplete = entries.filter((entry) => !entry.translations[lang].question?.trim() || !entry.translations[lang].nodes?.length).map((entry) => entry.id)
  if (incomplete.length) throw new Error(`FAQ ${lang} has incomplete answers: ${incomplete.join(', ')}`)
  console.log(`FAQ ${lang}: ${entries.length}/${entries.length} questions aligned`)
}
