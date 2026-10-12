import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { load } from 'cheerio'

const root = new URL('../dist/', import.meta.url).pathname
const failures = []
let checked = 0
for (const lang of ['en', 'ja', 'fr', 'th', 'zh']) {
  const path = lang === 'en' ? 'index.html' : `${lang}/index.html`
  const $ = load(readFileSync(join(root, path), 'utf8'))
  const videos = $('video[controls]').toArray()
  if (videos.length !== 2) failures.push(`${lang}: expected two accessible films`)
  videos.forEach((video, index) => {
    const track = $(video).find('track[kind="captions"]')
    const expected = `/captions/${lang}-${index === 0 ? 'concept' : 'origin'}.vtt`
    if (track.length !== 1 || track.attr('src') !== expected ||
      track.attr('srclang') !== (lang === 'zh' ? 'zh-TW' : lang)) failures.push(`${lang}: missing localized captions for film ${index + 1}`)
    if (!existsSync(join(root, expected))) { failures.push(`${lang}: missing ${expected}`); return }
    const content = readFileSync(join(root, expected), 'utf8')
    const cues = content.match(/^\d\d:\d\d:\d\d\.\d{3} --> \d\d:\d\d:\d\d\.\d{3}$/gm) || []
    if (!content.startsWith('WEBVTT\n\n') || cues.length < 8) failures.push(`${lang}: invalid or incomplete ${expected}`)
    checked++
  })
}
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1 }
else console.log(`${checked} caption tracks match the five language homepages and contain timed cues.`)
