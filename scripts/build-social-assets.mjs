import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const root = new URL('../public/', import.meta.url).pathname
const brandFile = join(root, 'brand/ippongi-logo-20250512.png')
const out = join(root, 'share')
mkdirSync(out, { recursive: true })

const color = { ground: '#f7f7f2', forest: '#263d35', muted: '#52645a', line: '#d6ded6' }
const mark = await sharp(brandFile).extract({ left: 0, top: 0, width: 1493, height: 1493 }).png().toBuffer()
const smallMark = await sharp(mark).resize(86, 86).png().toBuffer()

const cards = [
  { file: 'ippongi-default.jpg', photo: 'media/2025/07/0-July.webp', last: '' },
  { file: 'protai-10ml.jpg', photo: 'media/2025/10/10ml-4.webp', last: '10ml' },
  { file: 'protai-20ml.jpg', photo: 'media/2025/10/20ml-3.webp', last: '10ml × 2' },
]

for (const card of cards) {
  const photo = await sharp(join(root, card.photo))
    .resize(600, 630, { fit: 'cover', position: card.last ? 'centre' : 'east' })
    .jpeg({ quality: 88, mozjpeg: true }).toBuffer()
  const title = `<svg width="600" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="600" height="630" fill="${color.ground}"/>
    <path d="M70 76H530" stroke="${color.line}" stroke-width="2"/>
    <text x="176" y="140" fill="${color.forest}" font-family="Cormorant Garamond, Georgia, serif" font-size="48" letter-spacing="2">IPPONGI</text>
    <text x="178" y="168" fill="${color.muted}" font-family="DM Sans, Avenir Next, sans-serif" font-size="17" letter-spacing="7">KYOTO</text>
    <text x="70" y="343" fill="${color.forest}" font-family="Cormorant Garamond, Georgia, serif" font-size="82">PROTAI</text>
    <text x="70" y="415" fill="${color.forest}" font-family="Cormorant Garamond, Georgia, serif" font-size="48">Eye Skin Care Mist</text>
    ${card.last ? `<text x="70" y="484" fill="${color.forest}" font-family="DM Sans, Avenir Next, sans-serif" font-size="44">${card.last}</text>` : ''}
    <path d="M70 551H530" stroke="${color.line}" stroke-width="2"/>
    <text x="70" y="584" fill="${color.muted}" font-family="DM Sans, Avenir Next, sans-serif" font-size="18" letter-spacing="2">IPPONGI KYOTO</text>
  </svg>`
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: color.ground } })
    .composite([
      { input: photo, left: 600, top: 0 },
      { input: Buffer.from(title), left: 0, top: 0 },
      { input: smallMark, left: 70, top: 102 },
    ])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(join(out, card.file))
}

const icon = async (size, inset = 0) => {
  const markSize = size - inset * 2
  const resized = await sharp(mark).resize(markSize, markSize).png().toBuffer()
  return sharp({ create: { width: size, height: size, channels: 4, background: '#ffffff' } })
    .composite([{ input: resized, left: inset, top: inset }]).png().toBuffer()
}

writeFileSync(join(root, 'apple-touch-icon.png'), await icon(180, 8))
const svgMark = (await icon(448)).toString('base64')
writeFileSync(join(root, 'favicon.svg'), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="#ffffff"/><image x="32" y="32" width="448" height="448" href="data:image/png;base64,${svgMark}"/></svg>\n`)

// ICO accepts PNG-compressed images; keep several sizes for tab and bookmark UIs.
const sizes = [16, 32, 48, 256]
const frames = await Promise.all(sizes.map((size) => icon(size, size === 16 ? 0 : Math.round(size * .04))))
const header = Buffer.alloc(6 + sizes.length * 16)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(sizes.length, 4)
let offset = header.length
frames.forEach((frame, index) => {
  const entry = 6 + index * 16
  header.writeUInt8(sizes[index] === 256 ? 0 : sizes[index], entry)
  header.writeUInt8(sizes[index] === 256 ? 0 : sizes[index], entry + 1)
  header.writeUInt16LE(1, entry + 4)
  header.writeUInt16LE(32, entry + 6)
  header.writeUInt32LE(frame.length, entry + 8)
  header.writeUInt32LE(offset, entry + 12)
  offset += frame.length
})
writeFileSync(join(root, 'favicon.ico'), Buffer.concat([header, ...frames]))
console.log('Generated three 1200×630 share images and three favicon formats.')
