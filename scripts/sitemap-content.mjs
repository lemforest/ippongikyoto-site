import { createHash } from 'node:crypto'
import { load } from 'cheerio'

// Layout, script and CSS changes must not advance a page's content date.
export function contentFingerprint(html) {
  const $ = load(html)
  const main = $('main').first()
  const text = main.text().replace(/\s+/g, ' ').trim()
  const media = main.find('img, video source').map((_, element) => [
    $(element).attr('src') || '', $(element).attr('alt') || '',
  ].join('|')).get()
  const links = main.find('a[href]').map((_, element) => [
    $(element).attr('href') || '', $(element).text().replace(/\s+/g, ' ').trim(),
  ].join('|')).get()
  return createHash('sha256').update(JSON.stringify({ text, media, links })).digest('hex')
}
