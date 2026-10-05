import { readFile, mkdir, copyFile, writeFile, access } from 'node:fs/promises'
import { basename, dirname, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { load } from 'cheerio'
import sharp from 'sharp'

const project = fileURLToPath(new URL('../', import.meta.url))
const archive = process.env.IPPONGI_ARCHIVE || '/Users/arji/Downloads/ippongikyoto-archive-2026-10-05'
const manifest = JSON.parse(await readFile(join(archive, 'manifest.json'), 'utf8'))
const destination = join(project, 'public', 'media')
const sizePattern = /-\d+x\d+(?=\.[^.]+$)/
const mediaKey = (path) => path.replace(sizePattern, '')
const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif'])
const selected = new Map()
const mediaMap = new Map()

for (const item of manifest.media) {
  const key = mediaKey(item.path)
  const previous = selected.get(key)
  if (!previous || (!sizePattern.test(item.path) && sizePattern.test(previous.path)) ||
      (sizePattern.test(item.path) === sizePattern.test(previous.path) && item.bytes > previous.bytes)) {
    selected.set(key, item)
  }
}

const known = new Map(manifest.media.map((item) => [item.url, item]))
const videoHashes = new Map()
for (const item of selected.values()) {
  const extension = extname(item.path).toLowerCase()
  const input = join(archive, item.path)
  let outputPath
  if (imageExtensions.has(extension)) {
    outputPath = mediaKey(item.path).replace(/^media\//, '').replace(/\.[^.]+$/, '.webp')
    const target = join(destination, outputPath)
    await mkdir(dirname(target), { recursive: true })
    try { await access(target) } catch {
      await sharp(input).rotate().resize({ width: 1800, withoutEnlargement: true })
        .webp({ quality: 82, effort: 5 }).toFile(target)
    }
  } else if (extension === '.mp4' || extension === '.webm') {
    if (videoHashes.has(item.sha256)) {
      outputPath = videoHashes.get(item.sha256)
    } else {
      outputPath = item.path.replace(/^media\//, '')
      const target = join(destination, outputPath)
      await mkdir(dirname(target), { recursive: true })
      await copyFile(input, target)
      videoHashes.set(item.sha256, outputPath)
    }
  } else {
    continue
  }
  mediaMap.set(mediaKey(item.path), `/media/${outputPath}`)
}

function localMedia(url) {
  const item = known.get(url)
  return item ? mediaMap.get(mediaKey(item.path)) : undefined
}

function category(path) {
  if (path === '/' || /^\/(ja|fr|th)\/$/.test(path) || /\/(ホーム|หน้าแรก|accueil|home-|front-page)\/?$/i.test(path)) return 'home'
  if (/faq|よくある質問|คำถามที่พบบ่อย/i.test(path)) return 'faq'
  if (/webminar|ウェビナー|สัมมนาออนไลน์/i.test(path)) return 'webinar'
  if (/product\//.test(path)) return 'product'
  if (/shop|オンラインショップ|ร้านค้าออนไลน์|product-category/.test(path)) return 'shop'
  if (/contact|お問い合わせ|ติดต่อเรา|contactez-nous/.test(path)) return 'contact'
  if (/story|ストーリー|เรื่องราว|histoire/.test(path)) return 'story'
  if (/about|会社案内|ข้อมูลบริษัท|qui-sommes-nous|representative|代表挨拶|ข้อความจากผู้แทน/.test(path)) return 'about'
  if (/cart|checkout|カート|チェックアウト|รถเข็น|เช็คเอาท์/.test(path)) return 'commerce'
  return 'article'
}

function featureImage(kind, path, images) {
  const names = {
    home: '0-July.png',
    about: 'S__6561812.jpg',
    story: '1.jpg',
    webinar: '01-2.png',
    product: path.includes('20ml') ? '20ml-3.png' : '10ml-4.png',
    shop: '10ml-4.png',
  }
  const name = names[kind]
  const found = images.find((image) => basename(image.source).replace(sizePattern, '') === name)
  return found?.url || images[0]?.url
}

function blocksFrom($, containers) {
  const blocks = []
  containers.find('h1,h2,h3,h4,h5,h6,p,li,blockquote,table,img').each((_, element) => {
    const tag = element.tagName?.toLowerCase()
    if (tag === 'img') {
      const url = localMedia($(element).attr('src'))
      if (url) blocks.push({ type: 'image', url, alt: $(element).attr('alt') || '' })
      return
    }
    if (tag === 'p' && ($(element).closest('li,table').length > 0)) return
    if (tag === 'li' && $(element).parents('li').length > 0) return
    if (tag === 'p' && $(element).find('img').length && !$(element).text().trim()) return
    if (tag === 'p' && $(element).find('br').length) {
      const withBreaks = ($(element).html() || '').replace(/<br\s*\/?\s*>/gi, '\n')
      const textWithBreaks = load(`<div>${withBreaks}</div>`)('div').text()
      for (const paragraph of textWithBreaks.split(/\n\s*\n/)) {
        const text = paragraph.replace(/\s+/g, ' ').trim()
        if (text) blocks.push({ type: 'p', text })
      }
      return
    }
    const inlineText = $(element).clone()
    inlineText.find('br').replaceWith(' ')
    const text = inlineText.text().replace(/\s+/g, ' ').trim()
    if (!text || text.length < 2) return
    if (/^(Add to cart|Read more|Submit|This field is required\.)$/i.test(text)) return
    if (tag === 'table') {
      const rows = $(element).find('tr').map((_, tr) =>
        $(tr).find('th,td').map((_, cell) => $(cell).text().replace(/\s+/g, ' ').trim()).get(),
      ).get()
      if (rows.length) blocks.push({ type: 'table', rows })
      return
    }
    if (blocks.at(-1)?.text === text) return
    blocks.push({ type: tag, text })
  })
  return blocks
}

const pages = []
for (const page of manifest.pages) {
  const url = new URL(page.url)
  const path = decodeURIComponent(url.pathname)
  const raw = await readFile(join(archive, page.source_html), 'utf8')
  const $ = load(raw)
  const main = $('main').first()
  const kind = category(path)
  let containers = main.find('.entry-content').first()
  if (kind === 'product') containers = main.find('.summary, .woocommerce-Tabs-panel--description')
  if (!containers.length) containers = main
  const blocks = blocksFrom($, containers)
  const uniqueImages = new Map()
  for (const source of page.assets) {
    const local = localMedia(source)
    if (!local || !local.endsWith('.webp') || /ippongi-lgo|cropped-ippongi/.test(source)) continue
    uniqueImages.set(local, { url: local, source })
  }
  const images = [...uniqueImages.values()]
  const productGallery = kind === 'product' ? [...new Set(main.find('.woocommerce-product-gallery img').map((_, element) => localMedia($(element).attr('src'))).get().filter(Boolean))] : []
  const videos = [...new Set(page.embeds.map(localMedia).filter((value) => value?.endsWith('.mp4')))]
  const links = containers.find('a[href]').map((_, element) => {
    const href = $(element).attr('href')
    if (!href || !/^https?:\/\//.test(href) || !URL.canParse(href) || new URL(href).hostname === 'ippongikyoto.com') return null
    return { href, text: $(element).text().replace(/\s+/g, ' ').trim() }
  }).get().filter((link) => link.text && !/facebook|instagram/i.test(link.href))
  const alternates = Object.fromEntries(Object.entries(page.alternates || {}).map(([lang, href]) => {
    try { return [lang, decodeURIComponent(new URL(href).pathname)] } catch { return [lang, '/'] }
  }))
  pages.push({
    path, lang: page.language, kind, title: page.title.replace(/\s*- ippongikyoto\.com$/, ''),
    description: page.description, sourceUrl: page.url, text: await readFile(join(archive, page.main_text), 'utf8'),
    blocks, images, productGallery, featureImage: featureImage(kind, path, images), videos, links, alternates,
  })
}

pages.sort((a, b) => a.path.localeCompare(b.path))
await mkdir(join(project, 'src', 'data'), { recursive: true })
await writeFile(join(project, 'src', 'data', 'pages.json'), JSON.stringify(pages, null, 2))
await writeFile(join(project, 'src', 'data', 'media-map.json'), JSON.stringify(Object.fromEntries(mediaMap), null, 2))
console.log(`Imported ${pages.length} public pages, ${selected.size} media groups, ${videoHashes.size} distinct videos.`)
