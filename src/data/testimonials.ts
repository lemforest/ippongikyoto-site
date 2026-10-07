import type { Locale } from './types'

type Testimonial = { quote: string; topic: string }

type TestimonialContent = {
  eyebrow: string
  heading: string
  note: string
  source: string
  items: Testimonial[]
}

// Short excerpts from the supplied PROTAI Japanese and English review PDFs.
// Keep medical conditions, before/after claims and identifiable chat screenshots out of this section.
export const testimonials: Record<Locale, TestimonialContent> = {
  en: {
    eyebrow: 'User’s Voices',
    heading: 'In their own words',
    note: 'Individual impressions shared by customers in Japan. Excerpts have been shortened for readability.',
    source: 'Customer review · Japan',
    items: [
      { topic: 'A gentle mist', quote: 'The mist itself is very gentle. It doesn’t sting or cause any irritation, so it’s very pleasant to use.' },
      { topic: 'Easy to use', quote: 'But this one simply twists open in a smooth, stylish way. I really appreciate not only its convenience but also its sleek design.' },
      { topic: 'A refreshing moment', quote: 'Whenever I do, my eyes feel refreshed, and I really like how it feels.' },
    ],
  },
  ja: {
    eyebrow: 'User’s Voices',
    heading: '使う人の声',
    note: '日本国内のお客様の声から、使い心地に関する部分を抜粋・編集しました。',
    source: '日本国内のお客様の声',
    items: [
      { topic: 'やさしいミスト', quote: '優しい霧で沁みたり刺激を受けることもなく、快適に使えています。' },
      { topic: '使いやすさ', quote: 'お洒落にクルッと回すだけなので、スタイリッシュで便利。' },
      { topic: '日々の心地よさ', quote: '目がスッキリ。使用感がいい。' },
    ],
  },
  fr: {
    eyebrow: 'Témoignages',
    heading: 'Leurs impressions',
    note: 'Impressions personnelles de clients au Japon, traduites à partir des avis fournis en anglais.',
    source: 'Avis client · Japon',
    items: [
      { topic: 'Une brume douce', quote: 'La brume est très douce. Elle ne pique pas et ne provoque aucune irritation. Son utilisation est très agréable.' },
      { topic: 'Facile à utiliser', quote: 'Il suffit de tourner le flacon pour l’ouvrir. J’apprécie son côté pratique et son design élégant.' },
      { topic: 'Un moment de fraîcheur', quote: 'Quand je l’utilise, mes yeux semblent rafraîchis, et j’aime beaucoup cette sensation.' },
    ],
  },
  th: {
    eyebrow: 'เสียงจากผู้ใช้',
    heading: 'เสียงจากผู้ใช้จริง',
    note: 'ความรู้สึกส่วนตัวของลูกค้าในญี่ปุ่น แปลจากรีวิวภาษาอังกฤษที่ได้รับ',
    source: 'รีวิวจากลูกค้า · ญี่ปุ่น',
    items: [
      { topic: 'ละอองสเปรย์อ่อนโยน', quote: 'ละอองสเปรย์อ่อนโยนมาก ไม่แสบหรือระคายเคือง ใช้แล้วรู้สึกสบาย' },
      { topic: 'ใช้งานสะดวก', quote: 'เพียงหมุนก็เปิดได้อย่างง่ายดาย ชอบทั้งความสะดวกและดีไซน์ที่ดูเรียบหรู' },
      { topic: 'ความรู้สึกสดชื่น', quote: 'ทุกครั้งที่ใช้ รู้สึกว่าดวงตาสดชื่นขึ้น และชอบความรู้สึกนี้มาก' },
    ],
  },
}
