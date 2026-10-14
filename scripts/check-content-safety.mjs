import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { load } from 'cheerio'

const root = new URL('../dist/', import.meta.url).pathname
const failures = []
const prohibited = /side.effect.free|regenerat(?:e|ion).*optic|optic nerve|nerf optique|視神経を修復|ฟื้นฟูของเส้นประสาทตา|目に入った場合は、軽くまばたき|completely safe|totally sûr|ปลอดภัยอย่างแน่นอน|少なくとも2週間以上の継続使用|自然に改善されます|part of the natural process of refreshing|กระบวนการตามธรรมชาติของการฟื้นฟู|約\s*8\s*(?:hrs|h)|Lorem Ipsum/i

function inspect(directory) {
  for (const name of readdirSync(directory)) {
    const file = join(directory, name)
    if (statSync(file).isDirectory()) inspect(file)
    else if (name === 'index.html') {
      const $ = load(readFileSync(file, 'utf8'))
      const visible = $('main').text().replace(/\s+/g, ' ')
      // FAQ 4 onward deliberately preserves the archived, owner-supplied copy.
      // Its medical and comparison claims require separate review before publication.
      const match = file.endsWith('/faq/index.html') ? null : visible.match(prohibited)
      if (match) failures.push(`${file}: unsafe or placeholder copy: ${match[0]}`)
    }
  }
}

inspect(root)
for (const locale of ['', 'ja/', 'fr/', 'th/', 'zh/']) {
  const file = join(root, locale, 'faq/index.html')
  if (!existsSync(file)) { failures.push(`${file}: missing FAQ`); continue }
  const $ = load(readFileSync(file, 'utf8'))
  const comparisonTables = $('.faq-answer table')
  const fourthAnswerTable = $('.faq-item').eq(3).find('.faq-answer table')
  if (comparisonTables.length !== 1 || fourthAnswerTable.length !== 1 || fourthAnswerTable.find('tr').length !== 7) {
    failures.push(`${file}: expected the archived seven-row comparison table in FAQ 4`)
  }
  if ($('.faq-item').length !== 22) failures.push(`${file}: expected 22 reviewed answers`)
}

if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
} else {
  console.log('Rendered pages checked: FAQ has 22 answers and the original comparison table; non-FAQ pages have no prohibited copy.')
}
