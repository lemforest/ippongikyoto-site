import type { ContentBlock, Locale, SitePage } from './types'

type Translations = Record<Exclude<Locale, 'zh'>, string> & Partial<Record<'zh', string>>
const localized = (lang: Locale, values: Translations) => values[lang] || values.en

export const productPhotoAlt = (lang: Locale, refill = false) => localized(lang, refill ? {
  en: 'PROTAI Eye Skin Care Mist refill set, two 10 ml bottles',
  ja: 'PROTAI アイスキンケアミスト 10ml 2本セット',
  fr: 'Coffret recharge PROTAI Brume Soin Contour des Yeux, deux flacons de 10 ml',
  th: 'ชุด PROTAI สเปรย์ดูแลผิวรอบดวงตา ขวดขนาด 10 มล. สองขวด',
  zh: 'PROTAI 眼周保養噴霧補充組，兩瓶各 10ml',
} : {
  en: 'PROTAI Eye Skin Care Mist, 10 ml bottle',
  ja: 'PROTAI アイスキンケアミスト 10ml ボトル',
  fr: 'PROTAI Brume Soin Contour des Yeux, flacon de 10 ml',
  th: 'PROTAI สเปรย์ดูแลผิวรอบดวงตา ขวดขนาด 10 มล.',
  zh: 'PROTAI 眼周保養噴霧 10ml',
})

export const homePhotoAlt = (lang: Locale, index: number) => {
  const descriptions: Record<Locale, string[]> = {
    en: ['Woman holding PROTAI mist beside her face', 'Woman holding a PROTAI bottle with her eyes closed', 'Two people displaying PROTAI bottles and packaging', 'Two people displaying PROTAI products indoors', 'Two people displaying PROTAI products at a café', 'Two people displaying PROTAI products at night', 'Two people holding PROTAI bottles and packaging', 'Woman applying PROTAI mist near her face outdoors', 'Woman holding a PROTAI bottle against a light background'],
    ja: ['女性が顔のそばでPROTAIミストを持つ様子', '目を閉じてPROTAIのボトルを手に持つ女性', 'PROTAIのボトルと外箱を見せる二人', '室内でPROTAI製品を見せる二人', 'カフェでPROTAI製品を見せる二人', '夜の屋内でPROTAI製品を見せる二人', 'PROTAIのボトルと外箱を手に持つ二人', '屋外で顔の近くにPROTAIミストを吹きかける女性', '明るい背景でPROTAIのボトルを持つ女性'],
    fr: ['Une femme tient la brume PROTAI près de son visage', 'Une femme aux yeux fermés tient un flacon PROTAI', 'Deux personnes montrent des flacons et l’emballage PROTAI', 'Deux personnes montrent des produits PROTAI à l’intérieur', 'Deux personnes montrent des produits PROTAI dans un café', 'Deux personnes montrent des produits PROTAI de nuit', 'Deux personnes tiennent des flacons et l’emballage PROTAI', 'Une femme vaporise la brume PROTAI près de son visage à l’extérieur', 'Une femme tient un flacon PROTAI sur fond clair'],
    th: ['ผู้หญิงถือสเปรย์ PROTAI ข้างใบหน้า', 'ผู้หญิงหลับตาและถือขวด PROTAI', 'สองคนถือขวดและกล่องผลิตภัณฑ์ PROTAI', 'สองคนถือผลิตภัณฑ์ PROTAI ภายในอาคาร', 'สองคนถือผลิตภัณฑ์ PROTAI ในร้านกาแฟ', 'สองคนถือผลิตภัณฑ์ PROTAI ในเวลากลางคืน', 'สองคนถือขวดและกล่องผลิตภัณฑ์ PROTAI', 'ผู้หญิงฉีดสเปรย์ PROTAI ใกล้ใบหน้ากลางแจ้ง', 'ผู้หญิงถือขวด PROTAI บนพื้นหลังสีอ่อน'],
    zh: ['女子在臉旁拿著 PROTAI 噴霧', '女子閉眼手持 PROTAI 噴霧瓶', '兩人展示 PROTAI 噴霧瓶與外盒', '兩人在室內展示 PROTAI 產品', '兩人在咖啡廳展示 PROTAI 產品', '兩人在夜晚展示 PROTAI 產品', '兩人手持 PROTAI 噴霧瓶與外盒', '女子在戶外於臉旁使用 PROTAI 噴霧', '女子在明亮背景前手持 PROTAI 噴霧瓶'],
  }
  return descriptions[lang][index - 1]
}

const sharedImageAlt: Record<string, Translations> = {
  '/media/2025/05/S__6561812.webp': {
    en: 'Entrance of a building in Kyoto with a book shop sign and potted tree',
    ja: '京都の建物の入口、書店の看板と鉢植えの木',
    fr: 'Entrée d’un bâtiment à Kyoto avec une enseigne de librairie et un arbre en pot',
    th: 'ทางเข้าอาคารในเกียวโต มีป้ายร้านหนังสือและต้นไม้กระถาง',
    zh: '京都建築入口、書店招牌與盆栽',
  },
  '/media/2025/11/image.webp': {
    en: 'IPPONGI representative seated outdoors beneath a tree',
    ja: '木の下で屋外のベンチに座るIPPONGIの代表',
    fr: 'Le représentant d’IPPONGI assis dehors sous un arbre',
    th: 'ตัวแทน IPPONGI นั่งอยู่กลางแจ้งใต้ต้นไม้',
    zh: 'IPPONGI 代表坐在戶外樹下',
  },
  '/media/2025/06/Protai-Molecule.webp': {
    en: 'Three-dimensional molecular model associated with PROTAI',
    ja: 'PROTAIに関連する分子の立体模型',
    fr: 'Modèle moléculaire tridimensionnel associé à PROTAI',
    th: 'แบบจำลองโมเลกุลสามมิติที่เกี่ยวข้องกับ PROTAI',
    zh: '與 PROTAI 相關的立體分子模型',
  },
}

const archivedVisuals: Translations[] = [
  { en: 'A person silhouetted beneath a star-filled sky', ja: '星空の下に立つ人物のシルエット', fr: 'Silhouette d’une personne sous un ciel étoilé', th: 'เงาคนยืนใต้ท้องฟ้าที่เต็มไปด้วยดาว' },
  { en: 'Close-up of an eye with a bright reflection', ja: '光が映り込む目のクローズアップ', fr: 'Gros plan sur un œil reflétant une lumière', th: 'ภาพระยะใกล้ของดวงตาที่สะท้อนแสง' },
  { en: 'Close-up of a green-brown eye', ja: '緑がかった茶色の目のクローズアップ', fr: 'Gros plan sur un œil brun-vert', th: 'ภาพระยะใกล้ของดวงตาสีน้ำตาลอมเขียว' },
  { en: 'City buildings reflected in a person’s eye', ja: '目に映る街の建物', fr: 'Des bâtiments de ville reflétés dans un œil', th: 'ภาพอาคารในเมืองสะท้อนในดวงตา' },
  { en: 'A person silhouetted against a night sky full of stars', ja: '満天の星空を見上げる人物のシルエット', fr: 'Silhouette d’une personne contemplant un ciel étoilé', th: 'เงาคนมองท้องฟ้ายามค่ำคืนที่เต็มไปด้วยดาว' },
  { en: 'Two people talking across a café table', ja: 'カフェのテーブルを挟んで話す二人', fr: 'Deux personnes discutent autour d’une table de café', th: 'คนสองคนพูดคุยกันที่โต๊ะในร้านกาแฟ' },
]
for (let index = 1; index <= archivedVisuals.length; index += 1) {
  sharedImageAlt[`/media/2025/07/${index}-July.webp`] = archivedVisuals[index - 1]
}

const registrationAlt: Record<string, Translations> = {
  '/media/2025/06/QR_JP.webp': { en: 'QR code for Japanese-language webinar registration', ja: '日本語ウェビナー申込用QRコード', fr: 'Code QR pour l’inscription au webinaire en japonais', th: 'คิวอาร์โค้ดลงทะเบียนเว็บสัมมนาภาษาญี่ปุ่น', zh: '日文線上講座報名 QR 碼' },
  '/media/2025/06/QR_EN.webp': { en: 'QR code for English-language webinar registration', ja: '英語ウェビナー申込用QRコード', fr: 'Code QR pour l’inscription au webinaire en anglais', th: 'คิวอาร์โค้ดลงทะเบียนเว็บสัมมนาภาษาอังกฤษ', zh: '英語線上講座報名 QR 碼' },
}
for (const [url, language] of Object.entries({
  '/media/2025/10/image.webp': 'ja', '/media/2025/10/image-1.webp': 'en-th', '/media/2025/10/image-2.webp': 'en',
  '/media/2025/10/image-5.webp': 'ja', '/media/2025/10/image-6.webp': 'en-th', '/media/2025/10/image-7.webp': 'en',
  '/media/2025/09/image.webp': 'ja', '/media/2025/09/image-1.webp': 'en-th', '/media/2025/09/image-2.webp': 'en',
})) {
  registrationAlt[url] = language === 'ja'
    ? registrationAlt['/media/2025/06/QR_JP.webp']
    : language === 'en' ? registrationAlt['/media/2025/06/QR_EN.webp'] : {
      en: 'QR code for English-language webinar registration with Thai translation',
      ja: 'タイ語通訳付き英語ウェビナー申込用QRコード',
      fr: 'Code QR pour l’inscription au webinaire en anglais avec traduction thaïe',
      th: 'คิวอาร์โค้ดลงทะเบียนเว็บสัมมนาภาษาอังกฤษพร้อมคำแปลภาษาไทย',
      zh: '附泰語翻譯的英語線上講座報名 QR 碼',
    }
}

const registrationEntry = (lang: Locale, url: string) => registrationAlt[url] ? localized(lang, registrationAlt[url]) : ''
export const faqQrAlt = (lang: Locale, url: string) => registrationEntry(lang, url)

export function certificateAlt(lang: Locale, url: string) {
  const name = url.split('/').pop()
  if ((['image-1.webp', 'image-3.webp', 'image-4.webp', 'image-8.webp'].includes(name || '') && /\/2025\/(09|10)\//.test(url)) || (name === 'image-1.webp' && url.includes('/2025/11/'))) return localized(lang, {
    en: 'PCPC trade-name listing for Pentapeptide-80 (PROTAI)',
    ja: 'PCPCのPentapeptide-80（PROTAI）登録画面',
    fr: 'Fiche PCPC du nom commercial Pentapeptide-80 (PROTAI)',
    th: 'หน้ารายการจดทะเบียนชื่อทางการค้า Pentapeptide-80 (PROTAI) ของ PCPC',
    zh: 'PCPC 的 Pentapeptide-80（PROTAI）商品名稱登錄資料',
  })
  if (['image-2.webp', 'image-13.webp'].includes(name || '') && url.includes('/2025/11/')) return localized(lang, {
    en: 'United States invention patent certificate ASB0004US', ja: '米国発明特許証 ASB0004US', fr: 'Certificat du brevet d’invention américain ASB0004US', th: 'หนังสือรับรองสิทธิบัตรการประดิษฐ์สหรัฐอเมริกา ASB0004US', zh: '美國發明專利證書 ASB0004US',
  })
  if (name === 'image-3.webp' && url.includes('/2025/11/')) return localized(lang, {
    en: 'Taiwan invention patent certificate I674124', ja: '台湾発明特許証 I674124', fr: 'Certificat du brevet d’invention taïwanais I674124', th: 'หนังสือรับรองสิทธิบัตรการประดิษฐ์ไต้หวัน I674124', zh: '臺灣發明專利證書 I674124',
  })
  if (name === 'image-10.webp' && url.includes('/2025/11/')) return localized(lang, {
    en: 'Japanese Cosmetic Industry Association ingredient-name notice for Pentapeptide-80, notice 10073',
    ja: '日本化粧品工業会の成分表示名称通知書、ペンタペプチド-80（通知番号10073）',
    fr: 'Avis de dénomination d’ingrédient de l’association japonaise des cosmétiques pour le Pentapeptide-80, n° 10073',
    th: 'หนังสือแจ้งชื่อส่วนผสม Pentapeptide-80 จากสมาคมอุตสาหกรรมเครื่องสำอางญี่ปุ่น เลขที่ 10073',
    zh: '日本化妝品工業會的 Pentapeptide-80 成分名稱通知，編號 10073',
  })
  if (name === 'image-12.webp' && url.includes('/2025/11/')) return localized(lang, {
    en: 'European CosIng ingredient listing for Pentapeptide-80',
    ja: '欧州CosIngのPentapeptide-80成分登録画面',
    fr: 'Fiche CosIng Europe pour l’ingrédient Pentapeptide-80',
    th: 'หน้ารายการส่วนผสม Pentapeptide-80 ในฐานข้อมูล CosIng ของยุโรป',
    zh: '歐洲 CosIng 資料庫中的 Pentapeptide-80 成分資料',
  })
  if (name === 'image-14.webp' || (name === 'image-5.webp' && url.includes('/2025/09/'))) return localized(lang, {
    en: 'Thai cosmetic ingredient registration for Pentapeptide-80, number NC2133',
    ja: 'タイの化粧品成分Pentapeptide-80登録画面、登録番号NC2133',
    fr: 'Enregistrement thaïlandais de l’ingrédient cosmétique Pentapeptide-80, n° NC2133',
    th: 'หน้าทะเบียนส่วนผสมเครื่องสำอาง Pentapeptide-80 ของหน่วยงานไทย เลข NC2133',
    zh: '泰國 Pentapeptide-80 化妝品成分登錄資料，編號 NC2133',
  })
  const sgsPage = { 'image-6.webp': 1, 'image-8.webp': 2, 'image-9.webp': 3, 'image-7.webp': 4 }[name || '']
  if (sgsPage && url.includes('/2025/11/')) return localized(lang, {
    en: `SGS test report for PROTAI, page ${sgsPage} of 4`,
    ja: `PROTAIのSGS試験報告書、全4ページの${sgsPage}ページ目`,
    fr: `Rapport d’analyse SGS pour PROTAI, page ${sgsPage} sur 4`,
    th: `รายงานผลทดสอบ SGS ของ PROTAI หน้า ${sgsPage} จาก 4 หน้า`,
    zh: `PROTAI 的 SGS 檢驗報告，第 ${sgsPage} 頁，共 4 頁`,
  })
  return ''
}

export function contentImageAlt(page: SitePage, block: ContentBlock, index: number, blocks: ContentBlock[]) {
  const url = block.url || ''
  const lang = page.lang
  if (page.path === '/zh/webinar/' && block.alt) return block.alt
  if (sharedImageAlt[url]) return localized(lang, sharedImageAlt[url])
  const certificate = certificateAlt(lang, url)
  if (certificate) return certificate
  if (registrationEntry(lang, url)) return registrationEntry(lang, url)
  if (page.kind === 'webinar') {
    const text = blocks.slice(0, index).reverse().find((item) => item.type === 'p' && item.text)?.text?.replace(/\s+/g, ' ').trim()
    const step = blocks.slice(0, index + 1).filter((item) => item.type === 'image').length
    const lead = localized(lang, { en: 'Webinar registration step', ja: 'ウェビナー申込手順', fr: 'Étape d’inscription au webinaire', th: 'ขั้นตอนลงทะเบียนเว็บสัมมนา', zh: '線上講座報名步驟' })
    if (!text) throw new Error(`Missing webinar image description: ${page.path} ${url}`)
    return `${lead} ${step}: ${text.slice(0, 140)}`
  }
  if (block.alt && (lang === 'en' || !/[A-Za-z]{4}/.test(block.alt))) return block.alt
  throw new Error(`Missing localized image description: ${page.path} ${url}`)
}
