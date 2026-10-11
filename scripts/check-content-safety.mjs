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
      const match = visible.match(prohibited)
      if (match) failures.push(`${file}: unsafe or placeholder copy: ${match[0]}`)
    }
  }
}

inspect(root)
for (const locale of ['', 'ja/', 'fr/', 'th/', 'zh/']) {
  const file = join(root, locale, 'faq/index.html')
  if (!existsSync(file)) { failures.push(`${file}: missing FAQ`); continue }
  const $ = load(readFileSync(file, 'utf8'))
  if ($('.faq-answer table').length) failures.push(`${file}: unverified eye-drop comparison table is still visible`)
  if ($('.faq-item').length !== 22) failures.push(`${file}: expected 22 reviewed answers`)
}

if (failures.length) {
  console.error(failures.join('\n'))
  process.exitCode = 1
} else {
  console.log('Rendered pages checked: no archived unsafe claims, eye-drop comparison or placeholder copy.')
}
