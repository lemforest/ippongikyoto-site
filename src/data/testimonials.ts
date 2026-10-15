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
      ja: '台湾の50代女性は、30日間使用した後、目もとが以前より明るく見えると報告されています。',
      en: 'After 30 days of use, the eye area of a woman in her 50s in Taiwan appeared brighter.',
      fr: 'Après 30 jours d’utilisation, le contour des yeux d’une Taïwanaise d’une cinquantaine d’années paraissait plus lumineux.',
      th: 'หลังใช้ 30 วัน บริเวณรอบดวงตาของผู้หญิงชาวไต้หวันวัย 50 ปี ดูสดใสขึ้น',
      zh: '臺灣一位 50 多歲女性使用 30 天後，眼周看起來更明亮。',
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
      ja: '台湾の50代男性は、47日間使用した後、肌にハリが出たように見えると報告されています。',
      en: 'After 47 days of use, the skin of a man in his 50s in Taiwan appeared firmer.',
      fr: 'Après 47 jours d’utilisation, la peau d’un Taïwanais d’une cinquantaine d’années paraissait plus ferme.',
      th: 'หลังใช้ 47 วัน ผิวของผู้ชายชาวไต้หวันวัย 50 ปี ดูแน่นกระชับขึ้น',
      zh: '臺灣一位 50 多歲男性使用 47 天後，肌膚看起來更有彈性。',
    },
  },
  {
    id: 'tw-dentist-night-riding', country: 'tw', kind: 'summary', page: { ja: 9, en: 8 },
    topic: { ja: '夜の帰り道で感じた変化', en: 'More at ease on the ride home', fr: 'Plus serein sur le trajet du retour', th: 'รู้สึกมั่นใจขึ้นระหว่างขับรถกลับบ้าน', zh: '夜間騎車時更安心' },
    text: {
      ja: '台湾の50代男性歯科医師は、以前は夜のバイク移動で信号が二重に見え、不安を感じていたといいます。今は赤や青の光がよりはっきり見え、安心して走れると語っています。',
      en: 'A Taiwanese dentist in his 50s said traffic lights used to appear doubled when he rode home at night. He now feels the lights look clearer and riding is less worrying.',
      fr: 'Un dentiste taïwanais d’une cinquantaine d’années raconte qu’en rentrant à moto le soir, les feux lui semblaient autrefois dédoublés. Il dit les voir plus nettement aujourd’hui et rouler plus sereinement.',
      th: 'ทันตแพทย์ชาวไต้หวันวัย 50 ปีเล่าว่า เมื่อก่อนขี่รถกลับบ้านตอนกลางคืนจะเห็นไฟจราจรซ้อนกัน ปัจจุบันเขารู้สึกว่ามองเห็นไฟชัดขึ้นและขี่รถได้อย่างสบายใจขึ้น',
      zh: '臺灣一位 50 多歲牙醫分享，以前夜間騎車回家時，紅綠燈常像重疊在一起；現在他覺得燈光看起來更清楚，騎車也比較安心。',
    },
  },
  {
    id: 'tw-fine-lines', country: 'tw', kind: 'summary', page: { ja: 8, en: 7 },
    topic: { ja: '目もとの小じわ', en: 'Less noticeable fine lines', fr: 'Ridules moins visibles', th: 'ริ้วรอยเล็ก ๆ รอบดวงตาดูจางลง', zh: '眼周細紋看起來較不明顯' },
    text: {
      ja: '台湾の50代看護師は、10日間使用した後、目もとの小じわが以前より目立ちにくく見えると報告されています。',
      en: 'After 10 days of use, fine lines around the eyes of a nurse in her 50s in Taiwan appeared less noticeable.',
      fr: 'Après 10 jours d’utilisation, les ridules autour des yeux d’une infirmière taïwanaise d’une cinquantaine d’années paraissaient moins visibles.',
      th: 'หลังใช้ 10 วัน ริ้วรอยเล็ก ๆ รอบดวงตาของพยาบาลชาวไต้หวันวัย 50 ปี ดูจางลง',
      zh: '臺灣一位 50 多歲護理師使用 10 天後，眼周細紋看起來較不明顯。',
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
    id: 'jp-eye-area-lighter', country: 'jp', kind: 'excerpt', page: { ja: 1, en: 1 },
    topic: { ja: '目もとの軽さ', en: 'A lighter eye area', fr: 'Contour des yeux plus léger', th: 'รอบดวงตารู้สึกเบาสบายขึ้น', zh: '眼周感覺更輕盈' },
    text: {
      ja: '使い始める前と比べて、目もとが軽く感じられます。',
      en: 'The area around my eyes feels lighter compared to before using it.',
      fr: 'Le contour de mes yeux me paraît plus léger qu’avant de l’utiliser.',
      th: 'บริเวณรอบดวงตารู้สึกเบาสบายขึ้นเมื่อเทียบกับก่อนใช้',
      zh: '和使用前相比，眼周感覺更輕盈。',
    },
  },
  {
    id: 'jp-computer-refresh', country: 'jp', kind: 'excerpt', page: { ja: 1, en: 1 },
    topic: { ja: 'パソコン作業の合間に', en: 'A refresh during computer work', fr: 'Une pause devant l’écran', th: 'สดชื่นระหว่างทำงานหน้าจอ', zh: '電腦工作間的清爽感' },
    text: {
      ja: 'パソコンで目が疲れたときにも使っています。使ったあとは、目がスッキリします。',
      en: 'I use it when my eyes feel tired from working on the computer. After using it, my eyes feel refreshed.',
      fr: 'Je l’utilise quand mes yeux sont fatigués après avoir travaillé sur ordinateur. Après l’application, je me sens rafraîchie.',
      th: 'ฉันใช้เมื่อรู้สึกเหนื่อยตาจากการทำงานหน้าคอมพิวเตอร์ หลังใช้รู้สึกสดชื่นขึ้น',
      zh: '電腦工作後眼睛覺得疲倦時，我也會使用；用完感覺更清爽。',
    },
  },
  {
    id: 'jp-eye-contour-lines', country: 'jp', kind: 'excerpt', page: { ja: 4, en: 4 },
    topic: { ja: '目もとの印象', en: 'A softer-looking eye contour', fr: 'Un regard d’apparence plus doux', th: 'ริ้วรอยรอบดวงตาดูจางลง', zh: '眼周線條看起來更柔和' },
    text: {
      ja: 'お客様の目もとが以前よりはっきりして、小じわも目立ちにくくなったように見えました。ご本人も驚いていました。',
      en: 'The area around my client’s eyes looked more defined, and the fine lines seemed softer. Even they were surprised.',
      fr: 'Le contour des yeux de ma cliente paraissait plus net et les ridules semblaient adoucies. Elle-même en a été surprise.',
      th: 'บริเวณรอบดวงตาของลูกค้าดูชัดขึ้น และริ้วรอยเล็ก ๆ ดูจางลง แม้แต่เจ้าตัวก็ยังประหลาดใจ',
      zh: '顧客的眼周看起來更有輪廓，細紋似乎也較柔和；連本人都感到驚訝。',
    },
  },
  {
    id: 'tw-dentist-visual-spots', country: 'tw', kind: 'summary', page: { ja: 10, en: 9 },
    topic: { ja: '視界の点が気になりにくく', en: 'Less distracted by spots in her vision', fr: 'Moins gênée par des taches dans sa vision', th: 'จุดในสายตารบกวนน้อยลง', zh: '眼前的黑點不再那麼困擾' },
    text: {
      ja: '台湾の50代女性歯科医師は、長年、本を読むときや空を見るときに視界の点が気になっていたといいます。最近はその点がかなり薄く感じられると語っています。',
      en: 'A Taiwanese dentist in her 50s said spots in her vision had bothered her for years when reading or looking at the sky. She now feels they have faded considerably.',
      fr: 'Une dentiste taïwanaise d’une cinquantaine d’années dit que des taches dans sa vision la gênaient depuis des années lorsqu’elle lisait ou regardait le ciel. Elle les trouve désormais beaucoup moins présentes.',
      th: 'ทันตแพทย์หญิงชาวไต้หวันวัย 50 ปีเล่าว่า จุดในสายตารบกวนเธอมาหลายปีเวลาอ่านหนังสือหรือมองท้องฟ้า ช่วงนี้เธอรู้สึกว่าจุดเหล่านั้นจางลงมาก',
      zh: '臺灣一位 50 多歲牙醫分享，長年閱讀或看天空時，眼前的黑點總令她困擾；近來她主觀感覺那些黑點淡了許多。',
    },
  },
]

export const testimonialCopy: Record<Locale, {
  eyebrow: string; heading: string; note: string; country: Record<Country, string>;
  hint: string; pause: string; play: string; rail: [string, string];
}> = {
  zh: {
    eyebrow: '使用者心得', heading: '來自各地的聲音',
    note: '日本、馬來西亞與臺灣的使用者個人心得回饋。個人經驗不保證相同結果。',
    country: { jp: '日本', my: '馬來西亞', tw: '臺灣' },
    hint: '左右拖曳閱讀更多不同的使用心得。', pause: '暫停移動', play: '繼續移動', rail: ['使用者心得，上排', '使用者心得，下排'],
  },
  ja: {
    eyebrow: 'お客様の声', heading: '世界から届いた声',
    note: '日本・マレーシア・台湾のご利用者から寄せられた個人の感想です。同じ結果を保証するものではありません。',
    country: { jp: '日本', my: 'マレーシア', tw: '台湾' },
    hint: '左右にドラッグして、ほかの声もご覧いただけます。', pause: '動きを止める', play: '動きを再開', rail: ['お客様の声・上段', 'お客様の声・下段'],
  },
  en: {
    eyebrow: 'User’s Voices', heading: 'Voices across borders',
    note: 'Personal feedback from users in Japan, Malaysia and Taiwan. Individual experiences do not guarantee the same results.',
    country: { jp: 'Japan', my: 'Malaysia', tw: 'Taiwan' },
    hint: 'Drag sideways to explore more voices.', pause: 'Pause movement', play: 'Resume movement', rail: ['Customer voices, first row', 'Customer voices, second row'],
  },
  fr: {
    eyebrow: 'Témoignages', heading: 'Des voix de plusieurs pays',
    note: 'Retours d’expérience personnels d’utilisateurs du Japon, de Malaisie et de Taïwan. Ces expériences ne garantissent pas les mêmes résultats pour tous.',
    country: { jp: 'Japon', my: 'Malaisie', tw: 'Taïwan' },
    hint: 'Faites glisser les cartes pour découvrir d’autres témoignages.', pause: 'Mettre en pause', play: 'Reprendre le défilement', rail: ['Témoignages, première rangée', 'Témoignages, deuxième rangée'],
  },
  th: {
    eyebrow: 'เสียงจากผู้ใช้', heading: 'เสียงจากหลายประเทศ',
    note: 'ความคิดเห็นและประสบการณ์ส่วนบุคคลจากผู้ใช้ในญี่ปุ่น มาเลเซีย และไต้หวัน ผลลัพธ์ของแต่ละคนอาจแตกต่างกัน',
    country: { jp: 'ญี่ปุ่น', my: 'มาเลเซีย', tw: 'ไต้หวัน' },
    hint: 'ลากการ์ดไปด้านข้างเพื่อดูความคิดเห็นเพิ่มเติม', pause: 'หยุดการเคลื่อนไหว', play: 'เล่นต่อ', rail: ['เสียงจากผู้ใช้ แถวแรก', 'เสียงจากผู้ใช้ แถวที่สอง'],
  },
}
