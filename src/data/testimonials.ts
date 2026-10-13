import type { Locale } from './types'

type Country = 'jp' | 'my' | 'tw'
type LocalText = Record<Locale, string>
export type Testimonial = {
  id: string
  country: Country
  kind: 'excerpt' | 'summary'
  page: { ja: number; en: number }
  topic: LocalText
  text: LocalText
}

// Page numbers refer to the supplied PROTAI Japanese and English review PDFs.
// Taiwan's selected pages contain before/after labels rather than a clean quotation;
// keep these as editorial summaries instead of attributing invented direct quotes.
export const reviewItems: Testimonial[] = [
  {
    id: 'tw-eye-brightness', country: 'tw', kind: 'summary', page: { ja: 7, en: 6 },
    topic: { ja: '目もとが明るく見える', en: 'Brighter-looking eye area', fr: 'Contour des yeux plus lumineux', th: 'บริเวณรอบดวงตาดูสดใสขึ้น', zh: '眼周看起來更明亮' },
    text: {
      ja: '台湾の50代女性の提供資料では、目もとの印象がより明るく見えると説明されています。',
      en: 'Supplied case material for a woman in her 50s in Taiwan describes a brighter-looking eye area.',
      fr: 'Le dossier fourni concernant une femme taïwanaise d’une cinquantaine d’années décrit un contour des yeux d’apparence plus lumineuse.',
      th: 'ข้อมูลกรณีศึกษาที่ได้รับของผู้หญิงชาวไต้หวันวัย 50 ปี ระบุว่าบริเวณรอบดวงตาดูสดใสขึ้น',
      zh: '提供的臺灣案例資料描述，一位 50 多歲女性的眼周看起來更明亮。',
    },
  },
  {
    id: 'gentle-mist', country: 'jp', kind: 'excerpt', page: { ja: 3, en: 3 },
    topic: { ja: 'やさしいミスト', en: 'A gentle mist', fr: 'Une brume douce', th: 'ละอองสเปรย์อ่อนโยน', zh: '輕柔的噴霧' },
    text: {
      ja: '優しい霧で沁みたり刺激を受けることもなく、快適に使えています。',
      en: 'The mist itself is very gentle. It doesn’t sting or cause any irritation, so it’s very pleasant to use.',
      fr: 'La brume est très douce. Elle ne pique pas et ne provoque aucune irritation. Son utilisation est agréable.',
      th: 'ละอองสเปรย์อ่อนโยนมาก ไม่แสบหรือระคายเคือง ใช้แล้วรู้สึกสบาย',
      zh: '噴霧很輕柔，使用時沒有刺痛或刺激感，感覺很舒服。',
    },
  },
  {
    id: 'tw-skin-firmness', country: 'tw', kind: 'summary', page: { ja: 7, en: 6 },
    topic: { ja: '肌のハリ', en: 'Firmer-looking skin', fr: 'Peau d’apparence plus ferme', th: 'ผิวดูแน่นกระชับขึ้น', zh: '肌膚看起來更有彈性' },
    text: {
      ja: '台湾の50代男性の提供資料では、肌にハリが出たように見えると説明されています。',
      en: 'Supplied case material for a man in his 50s in Taiwan describes firmer-looking skin.',
      fr: 'Le dossier fourni concernant un homme taïwanais d’une cinquantaine d’années décrit une peau d’apparence plus ferme.',
      th: 'ข้อมูลกรณีศึกษาที่ได้รับของผู้ชายชาวไต้หวันวัย 50 ปี ระบุว่าผิวดูแน่นกระชับขึ้น',
      zh: '提供的臺灣案例資料描述，一位 50 多歲男性的肌膚看起來更有彈性。',
    },
  },
  {
    id: 'easy-open', country: 'jp', kind: 'excerpt', page: { ja: 3, en: 3 },
    topic: { ja: '使いやすさ', en: 'Easy to use', fr: 'Facile à utiliser', th: 'ใช้งานสะดวก', zh: '使用方便' },
    text: {
      ja: 'お洒落にクルッと回すだけなので、スタイリッシュで便利。',
      en: 'This one simply twists open in a smooth, stylish way. I appreciate its convenience and sleek design.',
      fr: 'Il suffit de tourner le flacon pour l’ouvrir. J’apprécie son côté pratique et son design élégant.',
      th: 'เพียงหมุนก็เปิดได้อย่างง่ายดาย ชอบทั้งความสะดวกและดีไซน์ที่ดูเรียบหรู',
      zh: '輕輕旋轉就能打開，方便又有設計感。',
    },
  },
  {
    id: 'tw-fine-lines', country: 'tw', kind: 'summary', page: { ja: 8, en: 7 },
    topic: { ja: '目もとの小じわ', en: 'Less noticeable fine lines', fr: 'Ridules moins visibles', th: 'ริ้วรอยเล็ก ๆ รอบดวงตาดูจางลง', zh: '眼周細紋看起來較不明顯' },
    text: {
      ja: '台湾の50代女性の提供資料では、目もとの小じわが以前より目立ちにくく見えると説明されています。',
      en: 'Supplied case material for a woman in her 50s in Taiwan describes fine lines around the eyes as less noticeable.',
      fr: 'Le dossier fourni concernant une femme taïwanaise d’une cinquantaine d’années décrit des ridules moins visibles autour des yeux.',
      th: 'ข้อมูลกรณีศึกษาที่ได้รับของผู้หญิงชาวไต้หวันวัย 50 ปี ระบุว่าริ้วรอยเล็ก ๆ รอบดวงตาดูจางลง',
      zh: '提供的臺灣案例資料描述，一位 50 多歲女性的眼周細紋看起來較不明顯。',
    },
  },
  {
    id: 'daily-use-malaysia', country: 'my', kind: 'excerpt', page: { ja: 6, en: 5 },
    topic: { ja: '毎日の習慣', en: 'An everyday habit', fr: 'Une habitude quotidienne', th: 'กิจวัตรประจำวัน', zh: '每天的習慣' },
    text: {
      ja: '毎日この製品を使っています。',
      en: 'She uses the product every day.',
      fr: 'Elle utilise le produit tous les jours.',
      th: 'ใช้ผลิตภัณฑ์นี้ทุกวัน',
      zh: '她每天都使用這款產品。',
    },
  },
]

export const testimonialCopy: Record<Locale, {
  eyebrow: string; heading: string; note: string; country: Record<Country, string>;
  summary: string; hint: string; pause: string; play: string; rail: [string, string];
}> = {
  zh: {
    eyebrow: '使用者心得', heading: '來自各地的聲音',
    note: '整理日本、馬來西亞與臺灣的個人心得及資料摘要；內容經翻譯與編輯，個人經驗不保證相同結果。',
    country: { jp: '日本', my: '馬來西亞', tw: '臺灣' },
    summary: '資料摘要', hint: '左右拖曳閱讀六則不同的心得與資料摘要；卡片循環顯示。', pause: '暫停移動', play: '繼續移動', rail: ['使用者心得，上排', '使用者心得，下排'],
  },
  ja: {
    eyebrow: 'お客様の声', heading: '世界から届いた声',
    note: '日本・マレーシアのお客様の声と台湾の提供資料を翻訳・編集しました。個人の感想は同じ結果を保証するものではありません。',
    country: { jp: '日本', my: 'マレーシア', tw: '台湾' },
    summary: '資料の要約', hint: '左右にドラッグして、ほかの声もご覧いただけます。', pause: '動きを止める', play: '動きを再開', rail: ['お客様の声・上段', 'お客様の声・下段'],
  },
  en: {
    eyebrow: 'User’s Voices', heading: 'Voices across borders',
    note: 'Customer comments from Japan and Malaysia and supplied case summaries from Taiwan, translated and edited for readability. Individual experiences do not guarantee the same results.',
    country: { jp: 'Japan', my: 'Malaysia', tw: 'Taiwan' },
    summary: 'Source summary', hint: 'Drag sideways to explore more voices.', pause: 'Pause movement', play: 'Resume movement', rail: ['Customer voices, first row', 'Customer voices, second row'],
  },
  fr: {
    eyebrow: 'Témoignages', heading: 'Des voix de plusieurs pays',
    note: 'Des avis du Japon et de Malaisie et des résumés de dossiers fournis à Taïwan, traduits et adaptés pour la lecture. Ces expériences personnelles ne garantissent pas les mêmes résultats.',
    country: { jp: 'Japon', my: 'Malaisie', tw: 'Taïwan' },
    summary: 'Résumé du document', hint: 'Faites glisser les cartes pour découvrir d’autres témoignages.', pause: 'Mettre en pause', play: 'Reprendre le défilement', rail: ['Témoignages, première rangée', 'Témoignages, deuxième rangée'],
  },
  th: {
    eyebrow: 'เสียงจากผู้ใช้', heading: 'เสียงจากหลายประเทศ',
    note: 'ความคิดเห็นจากญี่ปุ่นและมาเลเซีย รวมถึงสรุปข้อมูลกรณีศึกษาที่ได้รับจากไต้หวัน ผ่านการแปลและเรียบเรียง ประสบการณ์ส่วนบุคคลไม่รับประกันว่าจะได้ผลเหมือนกัน',
    country: { jp: 'ญี่ปุ่น', my: 'มาเลเซีย', tw: 'ไต้หวัน' },
    summary: 'สรุปจากเอกสาร', hint: 'ลากการ์ดไปด้านข้างเพื่อดูความคิดเห็นเพิ่มเติม', pause: 'หยุดการเคลื่อนไหว', play: 'เล่นต่อ', rail: ['เสียงจากผู้ใช้ แถวแรก', 'เสียงจากผู้ใช้ แถวที่สอง'],
  },
}
