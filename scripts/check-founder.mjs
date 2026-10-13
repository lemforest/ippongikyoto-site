import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { load } from 'cheerio'

const root = new URL('../dist/', import.meta.url).pathname
const reports = ['image-6.webp', 'image-8.webp', 'image-9.webp', 'image-7.webp']
const expected = {
  en: { title: 'Founder’s note', paragraphs: 20, documents: ['image-1.webp', 'image-2.webp', 'image-3.webp', ...reports] },
  ja: { title: '創業者の言葉', paragraphs: 21, documents: ['image-1.webp', 'image-10.webp', 'image-2.webp', 'image-3.webp', ...reports] },
  fr: { title: 'Le mot du fondateur', paragraphs: 21, documents: ['image-1.webp', 'image-12.webp', 'image-13.webp', 'image-3.webp', ...reports] },
  th: { title: 'ข้อความจากผู้ก่อตั้ง', paragraphs: 25, documents: ['image-1.webp', 'image-14.webp', 'image-2.webp', 'image-3.webp', ...reports] },
}
const failures = []
for (const [locale, spec] of Object.entries(expected)) {
  const file = join(root, locale === 'en' ? '' : locale, 'founder-message/index.html')
  const $ = load(readFileSync(file, 'utf8'))
  const story = $('.detail-section > .detail-body > .prose-flow')
  const documents = $('.certification-topic figure a').map((_, link) => $(link).attr('href')?.split('/').pop()).get()
  const captions = $('.certification-topic figure figcaption').length
  if ($('h1').first().text() !== spec.title) failures.push(`${locale}: founder title changed`)
  if (story.find('p').length < spec.paragraphs) failures.push(`${locale}: founder letter is shortened`)
  if (JSON.stringify(documents) !== JSON.stringify(spec.documents)) failures.push(`${locale}: source documents missing or out of order`)
  if (captions !== spec.documents.length) failures.push(`${locale}: document captions missing`)
}
if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
} else {
  console.log('Four founder letters retain their long-form story, source documents, SGS page order and captions.')
}
