import type { ContentBlock, SitePage } from './types'
import { restoreFounderBlocks } from './founder-restoration'

// Keep the archive untouched in pages.json. Founder letters retain their source
// narrative and documents, with a few scoped copy edits in founder-restoration.
const founderPaths = new Set([
  '/a-message-from-the-representative-2/',
  '/ja/a-message-from-the-representative/',
  '/fr/message-du-representant/',
  '/th/ข้อความจากผู้แทน/',
])
const companyPaths = new Set(['/about/', '/ja/会社案内/', '/fr/qui-sommes-nous/', '/th/ข้อมูลบริษัท/'])

const company: Record<string, { headings: string[]; paragraphs: string[] }> = {
  ja: {
    headings: ['京都の一凡木', '事業内容', '会社概要'],
    paragraphs: [
      '一凡木合同会社は京都を拠点に、目元の肌の保湿を目的とした化粧品PROTAIをご紹介しています。PROTAIは日本製のアイスキンケアミストであり、目薬や眼疾患の治療薬ではありません。',
      '製品の情報を明確に伝え、日々のスキンケアに取り入れやすい形でお届けすることを大切にしています。',
      '化粧品事業に加え、オンラインセミナーや多言語翻訳・通訳、国際取引に関する業務にも取り組んでいます。',
      '会社名：一凡木合同会社。設立：2025年3月10日。所在地：{{CONTACT_ADDRESS}}。お問い合わせ：{{EMAIL}}。',
    ],
  },
  en: {
    headings: ['IPPONGI in Kyoto', 'Our work', 'Company details'],
    paragraphs: [
      'Based in Kyoto, IPPONGI LLC presents PROTAI, a Japanese-made cosmetic mist for moisturizing the skin around the eyes. It is not an eye drop or a treatment for eye conditions.',
      'We aim to describe the product clearly so customers can decide whether it belongs in their skincare routine.',
      'Alongside cosmetics, the company works on online seminars, multilingual translation and interpretation, and international business support.',
      'Company: IPPONGI LLC. Established: 10 March 2025. Office: {{CONTACT_ADDRESS}}. Contact: {{EMAIL}}.',
    ],
  },
  fr: {
    headings: ['IPPONGI à Kyoto', 'Nos activités', 'L’entreprise'],
    paragraphs: [
      'Basée à Kyoto, IPPONGI LLC présente PROTAI, une brume cosmétique fabriquée au Japon pour hydrater la peau du contour des yeux. Ce n’est ni un collyre ni un traitement des maladies oculaires.',
      'Nous souhaitons décrire le produit avec clarté afin que chacun puisse décider de sa place dans sa routine de soin.',
      'En complément des cosmétiques, l’entreprise organise des webinaires et propose des services de traduction, d’interprétation et d’accompagnement du commerce international.',
      'Entreprise : IPPONGI LLC. Création : 10 mars 2025. Adresse : {{CONTACT_ADDRESS}}. Contact : {{EMAIL}}.',
    ],
  },
  th: {
    headings: ['IPPONGI ในเกียวโต', 'การดำเนินงาน', 'ข้อมูลนิติบุคคล'],
    paragraphs: [
      'IPPONGI LLC ตั้งอยู่ในเกียวโตและนำเสนอ PROTAI สเปรย์เครื่องสำอางที่ผลิตในญี่ปุ่นเพื่อเพิ่มความชุ่มชื้นให้ผิวรอบดวงตา ไม่ใช่ยาหยอดตาหรือผลิตภัณฑ์รักษาโรคตา',
      'เรามุ่งสื่อสารข้อมูลสินค้าอย่างชัดเจน เพื่อให้ลูกค้าตัดสินใจได้ว่าสินค้าเหมาะกับกิจวัตรดูแลผิวของตนหรือไม่',
      'นอกจากธุรกิจเครื่องสำอาง บริษัทยังจัดสัมมนาออนไลน์และให้บริการแปล ล่าม และสนับสนุนธุรกิจระหว่างประเทศ',
      'บริษัท: IPPONGI LLC ก่อตั้ง: 10 มีนาคม 2025 ที่ตั้ง: {{CONTACT_ADDRESS}} ติดต่อ: {{EMAIL}}',
    ],
  },
}

function editorialBlocks(page: SitePage): ContentBlock[] {
  if (founderPaths.has(page.path)) return restoreFounderBlocks(page)
  const copy = company[page.lang]
  return [
    { type: 'h2', text: page.title },
    ...copy.headings.flatMap((heading, index) => [
      { type: 'h2', text: heading },
      ...copy.paragraphs.slice(index === 0 ? 0 : index === 1 ? 2 : 3, index === 0 ? 2 : index === 1 ? 3 : 4).map((text) => ({ type: 'p', text })),
    ]),
  ]
}

export function applyEditorialOverrides(page: SitePage): SitePage {
  if (page.path === '/ja/特定商取引法に基づく表記/') {
    const text = page.text
      .replace('〒{{POSTAL_CODE}} 京都府京都市下京区七条通油小路東入大黒町227番地\n第2キョートビル402', '{{CONTACT_ADDRESS}}')
      .replace('消費税、送料（全国一律 ¥1,000（税込）、商品10,000円以上の購入で送料無料。）', '商品価格・消費税は購入ページでご確認ください。現在の取扱商品は日本国内への配送が無料です。海外への配送可否・送料はご注文前にお問い合わせください。')
      .replace('商品発送後の返品・返却等はお受け致しかねます。 商品が不良の場合のみ良品と交換致します。', '未開封の商品は、商品到着後7日以内に返品をお申し出いただけます。不良品・破損品・誤配送の場合はお問い合わせください。')
      .replace('商品出荷より７日以内にご連絡下さい。', '商品到着後7日以内にご連絡ください。')
    // The archived table is a flat list rather than renderable table rows.
    // This page already displays its text fallback; keep that presentation.
    return { ...page, blocks: [], text }
  }
  if (page.kind === 'webinar') {
    const blocks = page.blocks.map((block) => {
      if (!block.text) return block
      let text = block.text
      if (page.lang === 'ja') text = text.replace('±81', '+81')
      if (page.lang === 'en') {
        text = text.replace('II have confirmed that my registration is correct and I will confirm that my registration is correct and I will attend on time.', 'I have confirmed that my registration details are correct and I will attend on time.')
        if (text === 'Choose a profile icon that you prefer.' && page.blocks.indexOf(block) === 65) text = 'Select English in the language settings if needed.'
      }
      if (page.lang === 'th') text = text.replace('หรือ or', 'หรือ')
      return { ...block, text: text.replace(/[👉⚠]\uFE0F?/gu, '').trim() }
    }).filter((_, index) => !(page.lang === 'th' && index === 19))
    return { ...page, blocks, text: blocks.map((block) => block.text || '').join('\n') }
  }
  if (!founderPaths.has(page.path) && !companyPaths.has(page.path)) return page
  const blocks = editorialBlocks(page)
  return { ...page, blocks, text: blocks.map((block) => block.text || '').join('\n'), description: blocks.find((block) => block.type === 'p')?.text || page.description }
}
