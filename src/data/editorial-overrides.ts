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

// Restore the archived About pages' full structure and image. Only product
// efficacy wording is updated; the Kyoto story, values, services, vision and
// company facts remain in their original order.
const companyEdits: Record<string, Record<number, string>> = {
  en: {
    4: 'Based in the historic city of Kyoto, IPPONGI LLC was founded with a belief that caring for ourselves begins with attention to everyday life. We created PROTAI, a Japanese-made cosmetic mist for moisturizing the skin around the eyes. It is not an eye drop or a treatment for eye conditions. Through our work, we hope to accompany each person’s colorful journey in life with care, clarity and balance.',
    7: 'This principle guides the care we put into PROTAI. For us, eye-area skincare is one small part of a considered daily routine, alongside moments of rest and attention to well-being.',
    8: 'Our approach is rooted in: ● Less is more – Simplicity leaves room for mindful care ● Nature knows best – Respect the body and its everyday rhythms ● No shortcuts – Thoughtful care takes time and consistency',
    9: 'We are not here to “sell cures.” We offer a gentle choice for people who want to make eye-area skincare part of their daily routine.',
    11: 'Eye-Area Skincare – PROTAI We develop and offer a Japanese-made cosmetic mist to moisturize the skin around the eyes as part of daily skincare. PROTAI is non-medicated; it is not an eye drop or a treatment for eye conditions.',
    12: 'Education & Awareness We host webinars and collaborate with professionals to share information about eye-area skincare, digital lifestyles and everyday self-care.',
    16: 'We hope for a world where: ● Children have time to rest and play beyond their screens ● Families can make informed choices about everyday self-care ● People rediscover the value of slowing down and keeping things simple',
  },
  ja: {
    5: '私たちは、現代のデジタル社会に寄り添い、毎日のスキンケアとして取り入れやすい製品をご紹介しています。',
    6: 'PROTAI（プロタイ）は、目元の肌にうるおいを与える日本製の化粧品ミストです。目薬や眼疾患の治療薬ではありません。',
    10: 'この信念のもと、PROTAIは生まれました。目元の肌をいたわることも、自分と向き合う日々のセルフケアのひとつだと考えています。',
    12: '私たちのものづくりを支える価値観： ● Less is more（少ないことは豊かさ） – シンプルな習慣を大切にすること ● Nature knows best（自然を尊重する） – 身体と日々のリズムに目を向けること ● No shortcuts（近道ではなく、丁寧な歩みを） – 時間をかけて、継続して取り組むこと',
    13: '私たちは「治すもの」を売るために存在しているのではありません。目元のスキンケアを見つめなおす日々に、そっと寄り添う選択肢のひとつでありたいと願っています。',
    15: '1. 目元のスキンケア製品 – PROTAI（プロタイ） 目元の肌にうるおいを与える日本製の化粧品ミストをご紹介しています。目薬や眼疾患の治療薬ではなく、毎日のスキンケアに取り入れるための製品です。',
    20: '私たちが目指す世界： ● 子どもたちが画面から離れて休む時間も大切にできること ● 家族みんなが、日々のセルフケアについて納得して選べること ● 人々が、ゆっくりとしたシンプルな暮らしのよさを見つめなおせること',
    24: '所在地：{{CONTACT_ADDRESS}}',
  },
  fr: {
    5: 'Notre mission : proposer un soin cosmétique simple pour la peau du contour des yeux, adapté au rythme de la vie numérique, sans renoncer à l’harmonie ni à la simplicité.',
    6: 'Nous avons créé PROTAI, une brume cosmétique fabriquée au Japon pour hydrater la peau du contour des yeux. Ce n’est ni un collyre ni un traitement des maladies oculaires.',
    10: 'Ce principe guide le soin apporté à PROTAI. Pour nous, prendre soin de la peau du contour des yeux fait partie d’une routine quotidienne attentive, aux côtés du repos et du bien-être.',
    11: 'Notre approche repose sur : ● Moins, c’est mieux — La simplicité laisse place à une attention quotidienne ● Respecter la nature — Écouter son corps et son rythme ● Pas de raccourcis — Une routine réfléchie demande du temps et de la régularité',
    12: 'Nous ne sommes pas là pour « vendre des remèdes ». Nous proposons un choix doux pour celles et ceux qui souhaitent intégrer le soin du contour des yeux à leur quotidien.',
    14: '1. Soin du contour des yeux – PROTAI Nous proposons une brume cosmétique fabriquée au Japon pour hydrater la peau du contour des yeux au quotidien. PROTAI n’est ni un médicament, ni un collyre, ni un traitement des maladies oculaires.',
    19: 'Nous imaginons un monde où : ● Les enfants ont aussi le temps de se reposer loin des écrans ● Les familles font des choix éclairés pour leurs soins quotidiens ● Chacun redécouvre la valeur d’une vie plus lente et plus simple',
  },
  th: {
    1: 'เกี่ยวกับ IPPONGI',
    4: 'IPPONGI LLC ตั้งอยู่ในเมืองเกียวโตที่มีประวัติศาสตร์ยาวนาน เราเชื่อว่าการดูแลตนเองเริ่มจากการใส่ใจชีวิตประจำวัน PROTAI คือสเปรย์เครื่องสำอางที่ผลิตในญี่ปุ่นเพื่อเพิ่มความชุ่มชื้นให้ผิวรอบดวงตา ไม่ใช่ยาหยอดตาหรือผลิตภัณฑ์รักษาโรคตา เราหวังว่าจะร่วมเดินทางกับทุกคนด้วยความใส่ใจ ความชัดเจน และความสมดุล',
    7: 'ความเชื่อนี้เป็นแนวทางในการพัฒนา PROTAI สำหรับเรา การดูแลผิวรอบดวงตาเป็นส่วนหนึ่งของกิจวัตรประจำวันที่ใส่ใจตนเอง ควบคู่ไปกับการพักผ่อน',
    8: 'แนวทางของเรายึดถือคุณค่าต่อไปนี้: ● Less is more (น้อยแต่มาก) – ให้ความสำคัญกับความเรียบง่ายในชีวิตประจำวัน ● Nature knows best (เคารพธรรมชาติ) – ใส่ใจร่างกายและจังหวะชีวิตของตนเอง ● No shortcuts (ไม่มีทางลัด) – การดูแลอย่างตั้งใจต้องใช้เวลาและความสม่ำเสมอ',
    9: 'เราไม่ได้ขายผลิตภัณฑ์เพื่อรักษาโรค แต่ต้องการเสนอทางเลือกที่อ่อนโยนสำหรับผู้ที่อยากดูแลผิวรอบดวงตาในชีวิตประจำวัน',
    11: '1. ผลิตภัณฑ์ดูแลผิวรอบดวงตา – PROTAI เรานำเสนอสเปรย์เครื่องสำอางที่ผลิตในญี่ปุ่นเพื่อเพิ่มความชุ่มชื้นให้ผิวรอบดวงตา เป็นผลิตภัณฑ์สำหรับกิจวัตรดูแลผิวประจำวัน ไม่ใช่ยาหยอดตาหรือผลิตภัณฑ์รักษาโรคตา',
    16: 'โลกที่เราอยากเห็น: ● เด็ก ๆ มีเวลาพักผ่อนและเล่นโดยห่างจากหน้าจอ ● ครอบครัวเลือกวิธีดูแลตนเองในชีวิตประจำวันจากข้อมูลที่ชัดเจน ● ผู้คนเห็นคุณค่าของชีวิตที่เรียบง่ายและไม่เร่งรีบ',
    18: 'ชื่อบริษัท: IPPONGI LLC',
    20: 'ที่ตั้ง: {{CONTACT_ADDRESS}}',
  },
}

function editorialBlocks(page: SitePage): ContentBlock[] {
  if (founderPaths.has(page.path)) return restoreFounderBlocks(page)
  const edits = companyEdits[page.lang]
  return page.blocks.map((block, index) => edits[index] ? { ...block, text: edits[index] } : block)
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
