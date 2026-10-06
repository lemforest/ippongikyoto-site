import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { load } from 'cheerio'

// Rebuild the FAQ's editorial structure from the archived original pages.
// The generated JSON is committed, so the archive is not needed at site build time.
const archive = process.env.IPPONGI_ARCHIVE || '/Users/arji/Downloads/ippongikyoto-archive-2026-10-05'
const pages = JSON.parse(await readFile(new URL('../src/data/pages.json', import.meta.url), 'utf8'))
const sources = {
  en: 'en/faq.html',
  ja: 'ja/faq_jp.html',
  fr: 'fr/faq-fr.html',
  th: 'th/คำถามที่พบบ่อย-faq-th.html',
}

function richRuns(element) {
  const runs = []
  function append(text, bold, italic, href) {
    if (!text) return
    const previous = runs.at(-1)
    if (previous && previous.bold === bold && previous.italic === italic && previous.href === href) previous.text += text
    else runs.push({ text, bold, italic, ...(href ? { href } : {}) })
  }
  function visit(node, bold = false, italic = false, href = '') {
    if (node.type === 'text') return append(node.data || '', bold, italic, href)
    if (node.name === 'br') return append('\n', false, false, '')
    const nextBold = bold || node.name === 'strong' || node.name === 'b'
    const nextItalic = italic || node.name === 'em' || node.name === 'i'
    const nextHref = node.name === 'a' && /^(https?:\/\/|mailto:)/i.test(node.attribs?.href || '') ? node.attribs.href : href
    for (const child of node.children || []) visit(child, nextBold, nextItalic, nextHref)
  }
  for (const child of element.children || []) visit(child)
  return runs
}

function trimRuns(runs) {
  const result = runs.filter((run) => run.text)
  if (result.length) result[0] = { ...result[0], text: result[0].text.replace(/^[\s\u00a0]+/, '') }
  if (result.length) result[result.length - 1] = { ...result.at(-1), text: result.at(-1).text.replace(/[\s\u00a0]+$/, '') }
  return result.filter((run) => run.text)
}

const output = {}
for (const [lang, filename] of Object.entries(sources)) {
  const $ = load(await readFile(join(archive, 'source/pages', filename), 'utf8'))
  const page = pages.find((item) => item.kind === 'faq' && item.lang === lang)
  const localImages = page.blocks.filter((block) => block.type === 'image')
  let imageIndex = 0
  const gallery = []
  const entries = []
  let current
  $('.entry-content').find('p,li,table,img').each((_, element) => {
    const tag = element.tagName
    if ($(element).closest('table').length && tag !== 'table') return
    if ($(element).closest('li').length && tag !== 'li') return
    if (tag === 'img') {
      const image = localImages[imageIndex++]
      if (!image) throw new Error(`${lang}: source has more images than imported page`)
      const item = { type: 'image', url: image.url, alt: image.alt || '' }
      if (current) current.nodes.push(item)
      else gallery.push(item)
      return
    }
    if (tag === 'table') {
      const cells = $(element).find('tr').toArray().map((row) => $(row).children('th,td').toArray())
      const rows = cells.map((row) => row.map((cell) => {
        const clone = $(cell).clone()
        clone.find('br').replaceWith(' ')
        return clone.text().replace(/\s+/g, ' ').trim()
      }))
      const boldCells = cells.map((row) => row.map((cell) => $(cell).find('strong,b').length > 0))
      if (current && rows.length) current.nodes.push({ type: 'table', rows, boldCells })
      return
    }
    const runs = richRuns(element)
    const text = runs.map((run) => run.text).join('').trim()
    const match = text.match(/^Q\s*(\d+)\s*[.．、]/i)
    if (tag === 'p' && match) {
      const breakIndex = text.indexOf('\n')
      const question = text.slice(0, breakIndex < 0 ? undefined : breakIndex).trim().replace(/^Q\s*\d+\s*[.．、]\s*/i, '')
      current = { number: Number(match[1]), question, nodes: [] }
      entries.push(current)
      let remaining = breakIndex < 0 ? text.length : breakIndex + 1
      const answer = []
      for (const run of runs) {
        if (remaining >= run.text.length) { remaining -= run.text.length; continue }
        answer.push({ ...run, text: run.text.slice(remaining) })
        remaining = 0
      }
      const trimmed = trimRuns(answer)
      if (trimmed.length) current.nodes.push({ type: 'p', runs: trimmed })
    } else if (current && text) {
      current.nodes.push({ type: tag, runs: trimRuns(runs) })
    }
  })
  if (imageIndex !== localImages.length) throw new Error(`${lang}: image count ${imageIndex} != ${localImages.length}`)
  for (const entry of entries) {
    if (entry.number !== (lang === 'ja' ? 22 : 2)) continue
    const images = entry.nodes.map((node, index) => ({ node, index })).filter(({ node }) => node.type === 'image')
    if (images.length < 2) throw new Error(`${lang}: missing FAQ QR images`)
    const qrItems = images.map(({ node, index }) => {
      const label = entry.nodes[index - 1]
      if (label?.type !== 'p') throw new Error(`${lang}: QR code is missing its label`)
      return { label: label.runs, url: node.url, alt: node.alt }
    })
    const first = images[0].index - 1
    const removed = new Set(images.flatMap(({ index }) => [index - 1, index]))
    entry.nodes = entry.nodes.filter((_, index) => !removed.has(index))
    entry.nodes.splice(first, 0, { type: 'qrGrid', items: qrItems })
  }
  if (gallery.length !== 2 || entries.length !== 22 || entries.some((entry, index) => entry.number !== index + 1)) {
    throw new Error(`${lang}: unexpected FAQ structure: ${gallery.length} gallery images, ${entries.length} questions`)
  }
  output[lang] = { sourceUrl: page.sourceUrl, gallery, entries }
}

await writeFile(new URL('../src/data/faq.json', import.meta.url), JSON.stringify(output, null, 2) + '\n')
console.log('Generated FAQ content for ' + Object.keys(output).join(', '))
