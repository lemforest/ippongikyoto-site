import type { ContentBlock, SitePage } from './types'

// The archived source copy contained medical claims that are not appropriate for
// an eye-area cosmetic. Keep the archive untouched in pages.json and publish
// these reviewable, locale-specific replacements instead.
const founderPaths = new Set([
  '/a-message-from-the-representative-2/',
  '/ja/a-message-from-the-representative/',
  '/fr/message-du-representant/',
  '/th/ข้อความจากผู้แทน/',
])
const companyPaths = new Set(['/about/', '/ja/会社案内/', '/fr/qui-sommes-nous/', '/th/ข้อมูลบริษัท/'])

const founder: Record<string, string[]> = {
  ja: [
    '皆さま、こんにちは。一凡木合同会社の代表社員、CHIA WEIFANです。',
    'PROTAIの原点は、台湾のPROSUNFUNバイオテック研究開発社が続けてきたペプチド研究にあります。2022年、父の病気をきっかけに台湾へ戻り、その研究に初めて深く触れました。',
    '私はこの素材を、日本で製造する目元の肌用化粧品として届けることにしました。PROTAIアイスキンケアミストは、目元の肌にうるおいを与えるための製品です。目薬ではなく、眼疾患の治療を目的としていません。',
    '「幸せのペプチド」は、私たちが日々の小さなケアに込めた気持ちを表す言葉です。これからも製品の情報を正確に伝え、安心して選んでいただけるブランドを京都から育てていきます。',
    '最後までお読みいただいた皆さまに、心より感謝申し上げます。',
  ],
  en: [
    'Hello, I am WEIFAN CHIA, Managing Partner of IPPONGI LLC in Japan.',
    'PROTAI began with peptide research at PROSUNFUN Biotech in Taiwan. When I returned to Taiwan in 2022 during my father’s illness, I took a closer look at that research and began exploring how to bring the ingredient to Japan.',
    'We now present PROTAI as a Japanese-made cosmetic mist for moisturizing the skin around the eyes. It is not an eye drop and is not intended to treat eye conditions.',
    '“The peptide of happiness” expresses the care we put into an everyday ritual; it is not a claim of medical effect. From Kyoto, I want to build a brand that speaks clearly about what its product is and what it is not.',
    'Thank you for taking the time to read my message.',
  ],
  fr: [
    'Bonjour, je suis WEIFAN CHIA, associé gérant de IPPONGI LLC au Japon.',
    'PROTAI trouve son origine dans les recherches sur les peptides menées par PROSUNFUN Biotech à Taïwan. De retour à Taïwan en 2022, lors de la maladie de mon père, j’ai découvert ces travaux de plus près et commencé à envisager leur développement au Japon.',
    'Nous présentons aujourd’hui PROTAI comme une brume cosmétique fabriquée au Japon pour hydrater la peau du contour des yeux. Ce n’est pas un collyre et elle n’est pas destinée à traiter les maladies oculaires.',
    '« Le peptide du bonheur » exprime l’attention que nous portons aux petits gestes du quotidien ; ce n’est pas une promesse d’effet médical. Depuis Kyoto, je souhaite développer une marque qui décrit son produit avec clarté.',
    'Merci d’avoir pris le temps de lire ce message.',
  ],
  th: [
    'สวัสดีครับ ผม WEIFAN CHIA หุ้นส่วนผู้จัดการของ IPPONGI LLC ในประเทศญี่ปุ่น',
    'จุดเริ่มต้นของ PROTAI มาจากงานวิจัยเปปไทด์ของ PROSUNFUN Biotech ในไต้หวัน เมื่อผมกลับไต้หวันในปี 2022 ระหว่างที่คุณพ่อป่วย ผมได้ศึกษางานวิจัยนี้อย่างใกล้ชิดและเริ่มคิดว่าจะนำส่วนผสมนี้มาพัฒนาในญี่ปุ่นอย่างไร',
    'ปัจจุบัน PROTAI เป็นเครื่องสำอางชนิดสเปรย์ที่ผลิตในญี่ปุ่น เพื่อเพิ่มความชุ่มชื้นให้ผิวรอบดวงตา ไม่ใช่ยาหยอดตาและไม่ได้มีไว้รักษาโรคตา',
    '“เปปไทด์แห่งความสุข” เป็นถ้อยคำที่สื่อถึงความใส่ใจในกิจวัตรเล็ก ๆ ของทุกวัน ไม่ใช่คำกล่าวอ้างผลทางการแพทย์ ผมต้องการสร้างแบรนด์จากเกียวโตที่สื่อสารข้อมูลสินค้าอย่างชัดเจน',
    'ขอบคุณที่สละเวลาอ่านข้อความนี้ครับ',
  ],
}

const company: Record<string, { headings: string[]; paragraphs: string[] }> = {
  ja: {
    headings: ['京都の一凡木', '事業内容', '会社概要'],
    paragraphs: [
      '一凡木合同会社は京都を拠点に、目元の肌の保湿を目的とした化粧品PROTAIをご紹介しています。PROTAIは日本製のアイスキンケアミストであり、目薬や眼疾患の治療薬ではありません。',
      '製品の情報を明確に伝え、日々のスキンケアに取り入れやすい形でお届けすることを大切にしています。',
      '化粧品事業に加え、オンラインセミナーや多言語翻訳・通訳、国際取引に関する業務にも取り組んでいます。',
      '会社名：一凡木合同会社。設立：2025年3月10日。所在地：〒{{POSTAL_CODE}} 京都府京都市下京区大黒町227 第2京都ビル402。お問い合わせ：{{EMAIL}}。',
    ],
  },
  en: {
    headings: ['IPPONGI in Kyoto', 'Our work', 'Company details'],
    paragraphs: [
      'Based in Kyoto, IPPONGI LLC presents PROTAI, a Japanese-made cosmetic mist for moisturizing the skin around the eyes. It is not an eye drop or a treatment for eye conditions.',
      'We aim to describe the product clearly so customers can decide whether it belongs in their skincare routine.',
      'Alongside cosmetics, the company works on online seminars, multilingual translation and interpretation, and international business support.',
      'Company: IPPONGI LLC. Established: 10 March 2025. Office: #402 Daini-Kyoto-Bldg., 227 Daikokucho, Shimogyo-ku, Kyoto {{POSTAL_CODE}}, Japan. Contact: {{EMAIL}}.',
    ],
  },
  fr: {
    headings: ['IPPONGI à Kyoto', 'Nos activités', 'L’entreprise'],
    paragraphs: [
      'Basée à Kyoto, IPPONGI LLC présente PROTAI, une brume cosmétique fabriquée au Japon pour hydrater la peau du contour des yeux. Ce n’est ni un collyre ni un traitement des maladies oculaires.',
      'Nous souhaitons décrire le produit avec clarté afin que chacun puisse décider de sa place dans sa routine de soin.',
      'En complément des cosmétiques, l’entreprise organise des webinaires et propose des services de traduction, d’interprétation et d’accompagnement du commerce international.',
      'Entreprise : IPPONGI LLC. Création : 10 mars 2025. Adresse : #402 Daini-Kyoto-Bldg., 227 Daikokucho, Shimogyo-ku, Kyoto {{POSTAL_CODE}}, Japon. Contact : {{EMAIL}}.',
    ],
  },
  th: {
    headings: ['IPPONGI ในเกียวโต', 'การดำเนินงาน', 'ข้อมูลนิติบุคคล'],
    paragraphs: [
      'IPPONGI LLC ตั้งอยู่ในเกียวโตและนำเสนอ PROTAI สเปรย์เครื่องสำอางที่ผลิตในญี่ปุ่นเพื่อเพิ่มความชุ่มชื้นให้ผิวรอบดวงตา ไม่ใช่ยาหยอดตาหรือผลิตภัณฑ์รักษาโรคตา',
      'เรามุ่งสื่อสารข้อมูลสินค้าอย่างชัดเจน เพื่อให้ลูกค้าตัดสินใจได้ว่าสินค้าเหมาะกับกิจวัตรดูแลผิวของตนหรือไม่',
      'นอกจากธุรกิจเครื่องสำอาง บริษัทยังจัดสัมมนาออนไลน์และให้บริการแปล ล่าม และสนับสนุนธุรกิจระหว่างประเทศ',
      'บริษัท: IPPONGI LLC ก่อตั้ง: 10 มีนาคม 2025 ที่ตั้ง: ห้อง 402 อาคาร Daini-Kyoto, 227 Daikokucho, Shimogyo-ku, Kyoto {{POSTAL_CODE}}, ญี่ปุ่น ติดต่อ: {{EMAIL}}',
    ],
  },
}

function editorialBlocks(page: SitePage): ContentBlock[] {
  if (founderPaths.has(page.path)) {
    const portrait = page.blocks.find((block) => block.type === 'image')
    return [
      { type: 'h2', text: page.title },
      ...(portrait ? [portrait] : []),
      ...founder[page.lang].map((text) => ({ type: 'p', text })),
    ]
  }
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
      return { ...block, text }
    }).filter((_, index) => !(page.lang === 'th' && index === 19))
    return { ...page, blocks, text: blocks.map((block) => block.text || '').join('\n') }
  }
  if (!founderPaths.has(page.path) && !companyPaths.has(page.path)) return page
  const blocks = editorialBlocks(page)
  return { ...page, blocks, text: blocks.map((block) => block.text || '').join('\n'), description: blocks.find((block) => block.type === 'p')?.text || page.description }
}
