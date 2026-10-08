import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const gallery = 'public/media/2025/07'
for (let index = 0; index <= 6; index += 1) {
  const source = `${gallery}/${index}-July.webp`
  for (const width of [480, 960]) {
    await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality: 78, effort: 6 }).toFile(`${gallery}/${index}-July-${width}.webp`)
  }
}

await mkdir('public/brand', { recursive: true })
await sharp('public/brand/ippongi-logo-20250512.png')
  .resize({ width: 96 })
  .webp({ quality: 86, effort: 6 })
  .toFile('public/brand/ippongi-logo-96.webp')

await sharp('public/media/2026/10/protai-film-teaser.jpg')
  .webp({ quality: 78, effort: 6 })
  .toFile('public/media/2026/10/protai-film-teaser.webp')
