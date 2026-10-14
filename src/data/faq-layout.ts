type RichRun = { text: string; bold: boolean; italic: boolean; href?: string }

// Presentation-only paragraph breaks. The source runs and their wording stay untouched.
export function faqParagraphs<T extends RichRun>(runs: T[], lang: string): T[][] {
  const text = runs.map((run) => run.text).join('')
  if (!text) return []

  const limit = lang === 'zh' ? 100 : lang === 'ja' ? 125 : lang === 'th' ? 250 : 290
  const ranges: { start: number; end: number }[] = []
  const lines = [...text.matchAll(/[^\n]+/g)]
  for (const line of lines) {
    const start = line.index!
    const value = line[0]
    const sentences = [...new Intl.Segmenter(lang === 'zh' ? 'zh-TW' : lang, { granularity: 'sentence' }).segment(value)]
    let paragraphStart = 0
    for (let index = 1; index < sentences.length; index++) {
      const offset = sentences[index].index
      const nextEnd = sentences[index + 1]?.index ?? value.length
      if (nextEnd - paragraphStart <= limit || offset - paragraphStart < 35) continue
      ranges.push({ start: start + paragraphStart, end: start + offset })
      paragraphStart = offset
    }
    if (paragraphStart < value.length) ranges.push({ start: start + paragraphStart, end: start + value.length })
  }

  return ranges.map(({ start, end }) => {
    let cursor = 0
    return runs.flatMap((run) => {
      const overlapStart = Math.max(start, cursor)
      const overlapEnd = Math.min(end, cursor + run.text.length)
      const part = overlapEnd > overlapStart
        ? [{ ...run, text: run.text.slice(overlapStart - cursor, overlapEnd - cursor) }]
        : []
      cursor += run.text.length
      return part
    })
  })
}
