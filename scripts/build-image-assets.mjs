import sharp from 'sharp'
import { readdir, mkdir, stat, writeFile } from 'node:fs/promises'
import { join, relative, sep, dirname, extname } from 'node:path'

const publicRoot = 'public'
const outputRoot = join(publicRoot, 'responsive')
const manifestPath = 'src/data/image-assets.json'
const widths = [640, 960]
const supported = new Set(['.webp', '.png', '.jpg', '.jpeg'])

async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const result = []
  for (const entry of entries) {
    if (dir === publicRoot && entry.name === 'responsive') continue
    const path = join(dir, entry.name)
    if (entry.isDirectory()) result.push(...await files(path))
    else if (supported.has(extname(entry.name).toLowerCase())) result.push(path)
  }
  return result
}

const manifest = {}
for (const path of (await files(publicRoot)).sort()) {
  const url = `/${relative(publicRoot, path).split(sep).join('/')}`
  const { width, height } = await sharp(path).metadata()
  if (!width || !height) throw new Error(`Missing image dimensions: ${path}`)
  const variants = []
  for (const targetWidth of widths.filter((target) => width > target * 1.25)) {
    const variantPath = join(outputRoot, relative(publicRoot, path).replace(/\.[^.]+$/, `-${targetWidth}.webp`))
    const sourceStat = await stat(path)
    const existing = await stat(variantPath).catch(() => null)
    if (!existing || existing.mtimeMs < sourceStat.mtimeMs) {
      await mkdir(dirname(variantPath), { recursive: true })
      await sharp(path).resize({ width: targetWidth }).webp({ quality: 78, effort: 5 }).toFile(variantPath)
    }
    variants.push({ url: `/${relative(publicRoot, variantPath).split(sep).join('/')}`, width: targetWidth })
  }
  manifest[url] = { width, height, srcset: variants.length
    ? [...variants, { url, width }].map((variant) => `${variant.url} ${variant.width}w`).join(', ')
    : null }
}
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`${Object.keys(manifest).length} image dimensions indexed`)
