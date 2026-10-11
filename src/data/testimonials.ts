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
    id: 'morning-routine', country: 'jp', kind: 'excerpt', page: { ja: 1, en: 1 },
    topic: { ja: '朝のルーティン', en: 'A morning routine', fr: 'Le rituel du matin', th: 'กิจวัตรยามเช้า', zh: '早晨習慣' },
    text: {
      ja: '朝起きてすぐ、毎朝ひと吹きしています。',
      en: 'I use one spray every morning after waking up.',
      fr: 'J’en vaporise une fois chaque matin après mon réveil.',
      th: 'ฉันใช้สเปรย์หนึ่งครั้งทุกเช้าหลังตื่นนอน',
      zh: '我每天早上起床後都會噴一次。',
    },
  },
]

export const testimonialCopy: Record<Locale, {
  eyebrow: string; heading: string; note: string; country: Record<Country, string>;
  hint: string; pause: string; play: string; rail: [string, string];
}> = {
  zh: {
    eyebrow: '使用者心得', heading: '來自各地的聲音',
    note: '整理日本與馬來西亞使用者的個人經驗，內容經翻譯與編輯，不能保證使用效果。',
    country: { jp: '日本', my: '馬來西亞', tw: '臺灣' },
    hint: '左右滑動，閱讀更多心得。', pause: '暫停移動', play: '繼續移動', rail: ['使用者心得，上排', '使用者心得，下排'],
  },
  ja: {
    eyebrow: 'お客様の声', heading: '世界から届いた声',
    note: '日本・マレーシアのお客様の声を読みやすく編集しました。個人の感想であり、効果を保証するものではありません。',
    country: { jp: '日本', my: 'マレーシア', tw: '台湾' },
    hint: '左右にドラッグして、ほかの声もご覧いただけます。', pause: '動きを止める', play: '動きを再開', rail: ['お客様の声・上段', 'お客様の声・下段'],
  },
  en: {
    eyebrow: 'User’s Voices', heading: 'Voices across borders',
    note: 'Customer experiences from Japan and Malaysia, edited for readability. Individual impressions do not guarantee results.',
    country: { jp: 'Japan', my: 'Malaysia', tw: 'Taiwan' },
    hint: 'Drag sideways to explore more voices.', pause: 'Pause movement', play: 'Resume movement', rail: ['Customer voices, first row', 'Customer voices, second row'],
  },
  fr: {
    eyebrow: 'Témoignages', heading: 'Des voix de plusieurs pays',
    note: 'Des témoignages du Japon et de Malaisie, traduits depuis les avis anglais fournis et adaptés pour la lecture. Ces impressions personnelles ne garantissent aucun résultat.',
    country: { jp: 'Japon', my: 'Malaisie', tw: 'Taïwan' },
    hint: 'Faites glisser les cartes pour découvrir d’autres témoignages.', pause: 'Mettre en pause', play: 'Reprendre le défilement', rail: ['Témoignages, première rangée', 'Témoignages, deuxième rangée'],
  },
  th: {
    eyebrow: 'เสียงจากผู้ใช้', heading: 'เสียงจากหลายประเทศ',
    note: 'ประสบการณ์จากญี่ปุ่นและมาเลเซีย แปลจากรีวิวภาษาอังกฤษที่ได้รับและเรียบเรียงให้อ่านง่าย ความรู้สึกส่วนบุคคลไม่ใช่การรับประกันผลลัพธ์',
    country: { jp: 'ญี่ปุ่น', my: 'มาเลเซีย', tw: 'ไต้หวัน' },
    hint: 'ลากการ์ดไปด้านข้างเพื่อดูความคิดเห็นเพิ่มเติม', pause: 'หยุดการเคลื่อนไหว', play: 'เล่นต่อ', rail: ['เสียงจากผู้ใช้ แถวแรก', 'เสียงจากผู้ใช้ แถวที่สอง'],
  },
}
