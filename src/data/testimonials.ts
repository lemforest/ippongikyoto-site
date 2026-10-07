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
    topic: { ja: 'やさしいミスト', en: 'A gentle mist', fr: 'Une brume douce', th: 'ละอองสเปรย์อ่อนโยน' },
    text: {
      ja: '優しい霧で沁みたり刺激を受けることもなく、快適に使えています。',
      en: 'The mist itself is very gentle. It doesn’t sting or cause any irritation, so it’s very pleasant to use.',
      fr: 'La brume est très douce. Elle ne pique pas et ne provoque aucune irritation. Son utilisation est agréable.',
      th: 'ละอองสเปรย์อ่อนโยนมาก ไม่แสบหรือระคายเคือง ใช้แล้วรู้สึกสบาย',
    },
  },
  {
    id: 'daily-use-malaysia', country: 'my', kind: 'excerpt', page: { ja: 6, en: 5 },
    topic: { ja: '毎日の習慣', en: 'An everyday habit', fr: 'Une habitude quotidienne', th: 'กิจวัตรประจำวัน' },
    text: {
      ja: '母はとても元気です！毎日この製品を使っています。',
      en: 'My mom has been great! She uses the product every day.',
      fr: 'Ma mère va très bien ! Elle utilise le produit tous les jours.',
      th: 'คุณแม่สบายดีมาก และใช้ผลิตภัณฑ์นี้ทุกวัน',
    },
  },
  {
    id: 'tw-eye-area', country: 'tw', kind: 'summary', page: { ja: 7, en: 6 },
    topic: { ja: '目もとの印象', en: 'Eye-area appearance', fr: 'Aspect du contour des yeux', th: 'บริเวณรอบดวงตา' },
    text: {
      ja: '50代女性の体験談では、目もとの明るさに変化があったと紹介されています。',
      en: 'A woman in her 50s reported a brighter-looking eye area.',
      fr: 'Une femme d’une cinquantaine d’années a indiqué que le contour de ses yeux lui semblait plus lumineux.',
      th: 'ผู้หญิงวัย 50 ปีระบุว่าบริเวณรอบดวงตาดูสดใสขึ้น',
    },
  },
  {
    id: 'easy-open', country: 'jp', kind: 'excerpt', page: { ja: 3, en: 3 },
    topic: { ja: '使いやすさ', en: 'Easy to use', fr: 'Facile à utiliser', th: 'ใช้งานสะดวก' },
    text: {
      ja: 'お洒落にクルッと回すだけなので、スタイリッシュで便利。',
      en: 'This one simply twists open in a smooth, stylish way. I appreciate its convenience and sleek design.',
      fr: 'Il suffit de tourner le flacon pour l’ouvrir. J’apprécie son côté pratique et son design élégant.',
      th: 'เพียงหมุนก็เปิดได้อย่างง่ายดาย ชอบทั้งความสะดวกและดีไซน์ที่ดูเรียบหรู',
    },
  },
  {
    id: 'computer-break', country: 'jp', kind: 'excerpt', page: { ja: 1, en: 1 },
    topic: { ja: 'パソコン仕事の合間に', en: 'A break from the screen', fr: 'Une pause devant l’écran', th: 'พักจากหน้าจอ' },
    text: {
      ja: 'パソコンで目が疲れた時に使っています。',
      en: 'I use it whenever my eyes feel tired from working on the computer.',
      fr: 'Je l’utilise lorsque mes yeux sont fatigués après avoir travaillé sur ordinateur.',
      th: 'ใช้เมื่อรู้สึกว่าดวงตาเหนื่อยจากการทำงานหน้าคอมพิวเตอร์',
    },
  },
  {
    id: 'tw-skin', country: 'tw', kind: 'summary', page: { ja: 7, en: 6 },
    topic: { ja: '肌のハリ', en: 'Skin firmness', fr: 'Fermeté de la peau', th: 'ความกระชับของผิว' },
    text: {
      ja: '50代男性の体験談では、肌のハリに変化を感じたと紹介されています。',
      en: 'A man in his 50s reported that his skin felt firmer.',
      fr: 'Un homme d’une cinquantaine d’années a indiqué que sa peau lui semblait plus ferme.',
      th: 'ผู้ชายวัย 50 ปีระบุว่ารู้สึกว่าผิวกระชับขึ้น',
    },
  },
  {
    id: 'occasional-use', country: 'jp', kind: 'excerpt', page: { ja: 2, en: 2 },
    topic: { ja: '自分のペースで', en: 'At my own pace', fr: 'À mon rythme', th: 'ใช้ตามจังหวะของตัวเอง' },
    text: {
      ja: '毎日ではありませんが、時々使っています。使うと目がスッキリして、使用感がいいです。',
      en: 'I don’t use it every day, but I use it from time to time. Whenever I do, my eyes feel refreshed.',
      fr: 'Je ne l’utilise pas tous les jours, mais de temps en temps. Après chaque utilisation, mes yeux semblent rafraîchis.',
      th: 'ไม่ได้ใช้ทุกวัน แต่ใช้เป็นครั้งคราว ทุกครั้งที่ใช้รู้สึกว่าดวงตาสดชื่น',
    },
  },
  {
    id: 'morning-routine', country: 'jp', kind: 'excerpt', page: { ja: 1, en: 1 },
    topic: { ja: '朝のルーティン', en: 'A morning routine', fr: 'Le rituel du matin', th: 'กิจวัตรยามเช้า' },
    text: {
      ja: '朝起きてすぐ、毎朝ひと吹きしています。',
      en: 'Every morning, I give my eyes a quick spray right after waking up.',
      fr: 'Chaque matin, j’en vaporise rapidement après mon réveil.',
      th: 'ทุกเช้าหลังตื่นนอน ฉันฉีดสเปรย์ให้ดวงตาอย่างรวดเร็ว',
    },
  },
]

export const testimonialCopy: Record<Locale, {
  eyebrow: string; heading: string; note: string; country: Record<Country, string>;
  hint: string; pause: string; play: string; rail: [string, string];
}> = {
  ja: {
    eyebrow: 'User’s Voices', heading: '世界から届いた声',
    note: '日本・マレーシア・台湾のお客様の声を読みやすく編集しました。個人の感想であり、効果を保証するものではありません。',
    country: { jp: '日本', my: 'マレーシア', tw: '台湾' },
    hint: '左右にドラッグして、ほかの声もご覧いただけます。', pause: '動きを止める', play: '動きを再開', rail: ['お客様の声・上段', 'お客様の声・下段'],
  },
  en: {
    eyebrow: 'User’s Voices', heading: 'Voices across borders',
    note: 'Customer experiences from Japan, Malaysia and Taiwan, edited for readability. Individual impressions do not guarantee results.',
    country: { jp: 'Japan', my: 'Malaysia', tw: 'Taiwan' },
    hint: 'Drag sideways to explore more voices.', pause: 'Pause movement', play: 'Resume movement', rail: ['Customer voices, first row', 'Customer voices, second row'],
  },
  fr: {
    eyebrow: 'Témoignages', heading: 'Des voix de plusieurs pays',
    note: 'Des témoignages du Japon, de Malaisie et de Taïwan, traduits depuis les avis anglais fournis et adaptés pour la lecture. Ces impressions personnelles ne garantissent aucun résultat.',
    country: { jp: 'Japon', my: 'Malaisie', tw: 'Taïwan' },
    hint: 'Faites glisser les cartes pour découvrir d’autres témoignages.', pause: 'Mettre en pause', play: 'Reprendre le défilement', rail: ['Témoignages, première rangée', 'Témoignages, deuxième rangée'],
  },
  th: {
    eyebrow: 'เสียงจากผู้ใช้', heading: 'เสียงจากหลายประเทศ',
    note: 'ประสบการณ์จากญี่ปุ่น มาเลเซีย และไต้หวัน แปลจากรีวิวภาษาอังกฤษที่ได้รับและเรียบเรียงให้อ่านง่าย ความรู้สึกส่วนบุคคลไม่ใช่การรับประกันผลลัพธ์',
    country: { jp: 'ญี่ปุ่น', my: 'มาเลเซีย', tw: 'ไต้หวัน' },
    hint: 'ลากการ์ดไปด้านข้างเพื่อดูความคิดเห็นเพิ่มเติม', pause: 'หยุดการเคลื่อนไหว', play: 'เล่นต่อ', rail: ['เสียงจากผู้ใช้ แถวแรก', 'เสียงจากผู้ใช้ แถวที่สอง'],
  },
}
