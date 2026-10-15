import type { ContentBlock, SitePage } from './types'

// Keep the imported four-language founder letters intact except for statements
// that would present an eye-area cosmetic as an eye treatment or an SGS report
// as an unrestricted product-safety certification. Indexes refer to pages.json.
type Edit = { startsWith: string; text: string | null }
const edits: Record<string, Record<number, Edit>> = {
  en: {
    7: { startsWith: 'I founded the PROTAI', text: 'I founded the PROTAI Beauty & Wellness brand here in Japan, but its origin lies in PROSUNFUN Biotech in Taiwan — a company that has spent more than a decade researching thousands of peptide sequences. Learning about that work made me want to bring its story to Japan.' },
    9: { startsWith: 'From that moment', text: 'From that moment, I started from zero in Taiwan — searching for distribution channels and partners who shared the same passion. With tremendous support, we achieved a total of {{BOTTLES_SOLD}} bottles sold by September 2025. I remain grateful to the people who joined us along the way.' },
    11: { startsWith: 'Rather than presenting', text: 'Rather than presenting PROTAI as just another biotechnology product, I see it as a gentle expression of care — a way to make a little room for an everyday skin-care ritual amid fatigue and busy schedules.' },
    14: { startsWith: 'These voices come', text: 'These voices come not only from older people, but also from students preparing for exams, professionals working long hours in front of screens, and many others in our digital world. To all of them, we hope to offer a thoughtful moment of eye-area skin care.' },
    17: { startsWith: 'Since encountering PROTAI', text: 'Since encountering PROTAI, this work has given me a personal sense of purpose. Each time someone understands why it matters to me, I feel a deep sense of joy and meaning.' },
    19: { startsWith: 'In Taiwan, I’ve met', text: 'In Taiwan, I’ve met many people who shared their own stories and made this journey meaningful to me. Each encounter has stayed with me.' },
    20: { startsWith: 'Now, I would like', text: 'Now, I would like to invite you into that story — through IPPONGI, a wellness brand born in Kyoto, Japan — and to dream together with us.' },
    29: { startsWith: 'Certified by SGS', text: 'SGS test report: the listed heavy metals and microorganisms were not detected in the submitted samples under the reported test conditions.' },
  },
  ja: {
    9: { startsWith: '私は日本で「PROTAI」', text: '私は日本で「PROTAI」という Beauty & Wellness ブランドを立ち上げました。しかしその原点は、台湾の PROSUNFUN バイオテック研究開発社にあります。同社では10年以上にわたり、数千種類におよぶペプチド配列の研究を続けてきました。その仕事を知り、日本でもこの歩みを伝えたいと思うようになりました。' },
    12: { startsWith: 'それから私は台湾でゼロ', text: 'それから私は台湾でゼロから販路を探し、多くの方々の協力を得て、2025年9月までに累計 {{BOTTLES_SOLD}} 本の販売実績を達成することができました。ともに歩んでくださった皆さまに、心から感謝しています。' },
    15: { startsWith: '「瞳（ひとみ）は、心の窓」', text: '「瞳（ひとみ）は、心の窓」です。ご年配の方や受験に励む学生さん、長時間デスクワークをする方など、さまざまな人が日々のケアについて声を寄せてくださいました。スマートフォンやパソコンと向き合う毎日のなかで、目元の肌をいたわる時間を届けたいと思っています。' },
    18: { startsWith: '私は、PROTAIに出会い', text: '私は PROTAI に出会い、この活動に自分自身の大きな意味を見いだしました。その背景や想いを一人ひとりに伝え、理解していただけた瞬間に、心からの喜びと生き甲斐を感じます。' },
    20: { startsWith: 'これまで、台湾でPROTAI', text: 'これまで台湾で、PROTAI を通じて出会った多くの方から、それぞれの暮らしのお話を聞きました。その一つひとつが、私の心に残っています。' },
    21: { startsWith: 'どうか皆さんも、その奇跡を', text: 'どうか皆さんも、日本・京都で生まれたウェルネスブランド「一凡木」を通して、この歩みに加わっていただけませんか。' },
    31: { startsWith: 'SGS認証の検査で', text: 'SGS の試験報告書では、提出された検体について、記載の試験条件で対象の重金属・微生物が不検出と報告されています。' },
  },
  fr: {
    7: { startsWith: 'J’ai fondé la marque', text: 'J’ai fondé la marque PROTAI Beauty & Wellness ici au Japon, mais ses origines se trouvent chez PROSUNFUN Biotech à Taïwan — une entreprise qui étudie depuis plus de dix ans des milliers de séquences peptidiques. La découverte de ce travail m’a donné envie d’en raconter l’histoire au Japon.' },
    9: { startsWith: 'À partir de ce moment-là', text: 'À partir de ce moment-là, je suis reparti de zéro à Taïwan, à la recherche de partenaires et de canaux de distribution partageant la même passion. Grâce à un soutien immense, nous avons atteint {{BOTTLES_SOLD}} flacons vendus en septembre 2025. Je reste reconnaissant envers toutes les personnes qui nous ont accompagnés.' },
    11: { startsWith: 'Plutôt que de présenter', text: 'Plutôt que de présenter PROTAI comme un simple produit de biotechnologie, je le vois comme une expression douce de l’attention portée à soi — un petit geste de soin cosmétique dans des journées souvent chargées.' },
    14: { startsWith: 'Ces témoignages viennent', text: 'Ces témoignages viennent de personnes âgées, d’étudiants préparant des examens, de professionnels passant de longues heures devant des écrans et de tant d’autres dans notre monde numérique. Nous souhaitons leur proposer un moment de soin pour la peau du contour des yeux.' },
    18: { startsWith: 'Ce projet est devenu', text: 'Ce projet est devenu non seulement mon rêve, mais aussi une part importante du sens que je donne à mon travail. Chaque fois que quelqu’un en comprend la valeur à mes yeux, j’éprouve une joie profonde et un véritable sentiment d’accomplissement.' },
    20: { startsWith: 'À Taïwan, j’ai rencontré', text: 'À Taïwan, j’ai rencontré tant de personnes qui m’ont confié leurs histoires et ont donné un sens particulier à ce parcours. Je garde chacune de ces rencontres en mémoire.' },
    21: { startsWith: 'Aujourd’hui, je souhaite', text: 'Aujourd’hui, je souhaite vous inviter à prendre part à cette histoire — à travers IPPONGI, une marque de bien-être née à Kyoto — et à rêver avec nous d’un monde plus harmonieux et lumineux.' },
    31: { startsWith: 'Certifié par SGS', text: 'Rapport d’analyse SGS : les métaux lourds et micro-organismes mentionnés n’ont pas été détectés dans les échantillons soumis, selon les conditions d’essai indiquées.' },
  },
  th: {
    8: { startsWith: 'ในระหว่างการวิจัยนั้น', text: null },
    11: { startsWith: 'จากจุดนั้น ผมเริ่มต้น', text: 'จากจุดนั้น ผมเริ่มต้นใหม่จากศูนย์ในไต้หวัน ตามหาช่องทางการจัดจำหน่ายและพันธมิตรที่มีความเชื่อและความหลงใหลเช่นเดียวกัน ด้วยแรงสนับสนุนจากทุกฝ่าย เราจำหน่ายได้รวม {{BOTTLES_SOLD}} ขวดภายในเดือนกันยายน 2025 ผมขอบคุณทุกคนที่ร่วมเดินทางมาด้วยกัน' },
    13: { startsWith: 'สำหรับผม PROTAI', text: 'สำหรับผม PROTAI ไม่ใช่เพียงผลิตภัณฑ์ที่มีพื้นฐานจากงานวิจัย แต่ยังเป็นสัญลักษณ์ของความใส่ใจ และเป็นส่วนหนึ่งของกิจวัตรดูแลผิวรอบดวงตาในวันที่ผู้คนมีชีวิตที่เร่งรีบ' },
    14: { startsWith: 'เรามักกล่าวกันว่า', text: 'เรามักกล่าวกันว่า “ดวงตาคือหน้าต่างของจิตวิญญาณ” ผู้คนมากมายได้แบ่งปันเรื่องราวและประสบการณ์ส่วนตัวเกี่ยวกับการดูแลตัวเองกับเรา' },
    16: { startsWith: 'สำหรับทุกคนเหล่านั้น', text: 'สำหรับทุกคนเหล่านั้น เราอยากมอบช่วงเวลาเล็ก ๆ ของการดูแลผิวรอบดวงตา นั่นจึงเป็นเหตุผลที่ผมเรียก PROTAI ว่า “เปปไทด์แห่งความสุข”' },
    21: { startsWith: 'ตั้งแต่วันที่ผมได้รู้จัก', text: 'ตั้งแต่วันที่ผมได้รู้จักกับ PROTAI งานนี้ก็มีความหมายต่อชีวิตผมมากขึ้น ทุกครั้งที่มีใครเข้าใจเรื่องราวและความตั้งใจของเรา ผมรู้สึกถึงความสุขและความหมายอันลึกซึ้ง' },
    24: { startsWith: 'ที่ไต้หวัน ผมได้พบ', text: 'ที่ไต้หวัน ผมได้พบกับผู้คนมากมายที่แบ่งปันเรื่องราวของตนเอง การพบเจอแต่ละครั้งยังคงอยู่ในความทรงจำของผม' },
    25: { startsWith: 'วันนี้ ผมอยากเชิญชวน', text: 'วันนี้ ผมอยากเชิญชวนทุกท่านมาร่วมเป็นส่วนหนึ่งของเรื่องราวนี้ ผ่าน IPPONGI แบรนด์ที่ถือกำเนิดขึ้นในเกียวโต ประเทศญี่ปุ่น และร่วมกันสร้างอนาคตที่เราเชื่อมั่น' },
    36: { startsWith: 'ได้รับการรับรองจาก SGS', text: 'รายงานผลทดสอบของ SGS ระบุว่าไม่พบโลหะหนักและจุลชีพตามรายการที่ตรวจในตัวอย่างที่ส่งทดสอบ ภายใต้เงื่อนไขที่ระบุในรายงาน' },
  },
}

export function restoreFounderBlocks(page: SitePage): ContentBlock[] {
  const localeEdits = edits[page.lang]
  if (!localeEdits) return page.blocks
  for (const [key, edit] of Object.entries(localeEdits)) {
    const block = page.blocks[Number(key)]
    if (!block?.text?.startsWith(edit.startsWith)) throw new Error(`Founder source changed: ${page.path} block ${key}`)
  }
  const restored = page.blocks.flatMap((block, index) => {
    const edit = localeEdits[index]
    if (edit?.text === null) return []
    if (edit) {
      const { runs: _originalRuns, ...withoutArchivedFormatting } = block
      return [{ ...withoutArchivedFormatting, text: edit.text }]
    }
    return [block]
  })
  const reportPageOrder = ['image-6.webp', 'image-8.webp', 'image-9.webp', 'image-7.webp']
  const reportStart = restored.findIndex((block) => block.url?.endsWith(reportPageOrder[0]))
  if (reportStart < 0) throw new Error(`Missing SGS report: ${page.path}`)
  const reportPages = restored.slice(reportStart)
  if (reportPages.length !== 4 || !reportPages.every((block) => reportPageOrder.some((name) => block.url?.endsWith(name)))) {
    throw new Error(`Unexpected SGS report pages: ${page.path}`)
  }
  return [...restored.slice(0, reportStart), ...reportPages.sort((a, b) =>
    reportPageOrder.findIndex((name) => a.url?.endsWith(name)) - reportPageOrder.findIndex((name) => b.url?.endsWith(name)),
  )]
}
