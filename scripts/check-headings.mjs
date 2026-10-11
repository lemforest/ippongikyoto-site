import fs from 'node:fs'
import path from 'node:path'
import { load } from 'cheerio'
import faq from '../src/data/faq.json' with { type: 'json' }

const files = ['dist/404.html']
function collect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name)
    if (entry.isDirectory()) collect(filename)
    else if (entry.name === 'index.html') files.push(filename)
  }
}
collect('dist')

const errors = []
let faqPages = 0
for (const filename of files) {
  const $ = load(fs.readFileSync(filename, 'utf8'))
  const headings = $('main h1, main h2, main h3, main h4, main h5, main h6').map((_, element) => ({
    level: Number(element.tagName.slice(1)),
    text: $(element).text().replace(/\s+/g, ' ').trim(),
  })).get()
  const h1Count = headings.filter((heading) => heading.level === 1).length
  if (h1Count !== 1 || headings[0]?.level !== 1) errors.push(`${filename}: expected one leading H1, found ${h1Count}`)
  const seen = new Set()
  headings.forEach((heading, index) => {
    if (!heading.text) errors.push(`${filename}: empty H${heading.level}`)
    if (seen.has(heading.text)) errors.push(`${filename}: repeated heading: ${heading.text}`)
    if (index > 0 && heading.level > headings[index - 1].level + 1) {
      errors.push(`${filename}: skipped H${headings[index - 1].level} to H${heading.level}`)
    }
    if (/^🌿/.test(heading.text)) errors.push(`${filename}: emoji in heading: ${heading.text}`)
    seen.add(heading.text)
  })

  const locale = filename.match(/^dist\/(ja|fr|th)\//)?.[1] || 'en'
  if (filename.endsWith('/faq/index.html')) {
    faqPages++
    const actual = $('.faq-item summary h2').map((_, element) => $(element).text().replace(/\s+/g, ' ').trim()).get()
    const expected = faq[locale].entries.map((entry) => entry.question.replace(/\s+/g, ' ').trim())
    if (actual.length !== expected.length || actual.some((question, index) => question !== expected[index])) {
      errors.push(`${filename}: FAQ heading list does not match all ${expected.length} questions`)
    }
  }
  if (filename.endsWith('/founder-message/index.html')) {
    if ($('.certification-description').length !== 4) errors.push(`${filename}: certification descriptions must be paragraphs`)
  }
}

if (faqPages !== 4) errors.push(`Expected 4 FAQ pages, found ${faqPages}`)
if (errors.length) {
  console.error(errors.join('\n'))
  process.exitCode = 1
} else {
  console.log(`${files.length} pages checked: one H1, no heading jumps or repeats; ${faqPages} FAQs have every question as H2.`)
}
