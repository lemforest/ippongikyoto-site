import type { Locale } from './types'

type WebinarGuide = {
  lead: string
  guide: string
  details: { label: string; text: string }[]
}

export const webinarGuideCopy: Record<Locale, WebinarGuide> = {
  zh: {
    lead: '免費線上講座介紹 PROTAI 與日常眼周肌膚保養，時間約 90 分鐘。',
    details: [
      { label: '場次與名額', text: '請以外部報名頁面顯示的資訊為準。' },
      { label: '畫面提示', text: '「Added to cart」表示已選擇場次。' },
      { label: '報名費用', text: '本講座免費參加。' },
    ],
    guide: '報名與參加方式',
  },
  ja: {
    lead: '無料のオンラインウェビナーでは、PROTAIの製品情報と日々の目元ケアについてご紹介します。所要時間は約90分です。',
    details: [
      { label: '日時・空席', text: '外部の申込ページでご確認ください。' },
      { label: '画面の表示', text: '「Added to cart」は参加枠を選択したことを示します。' },
      { label: '参加費', text: 'このウェビナーは無料です。' },
    ],
    guide: 'お申し込み・参加の手順',
  },
  en: {
    lead: 'This free online webinar introduces PROTAI and everyday eye-area skincare. The session lasts about 90 minutes.',
    details: [
      { label: 'Times & places', text: 'Check the external registration page for current availability.' },
      { label: 'On-screen message', text: '“Added to cart” means you have selected a session.' },
      { label: 'Participation', text: 'This webinar is free to attend.' },
    ],
    guide: 'Registration and joining guide',
  },
  fr: {
    lead: 'Ce webinaire gratuit présente PROTAI et les soins quotidiens de la peau du contour des yeux. La séance dure environ 90 minutes.',
    details: [
      { label: 'Horaires et places', text: 'Consultez la plateforme d’inscription pour connaître les disponibilités.' },
      { label: 'Message affiché', text: '« Added to cart » signifie qu’une séance a été sélectionnée.' },
      { label: 'Participation', text: 'Ce webinaire est gratuit.' },
    ],
    guide: 'S’inscrire et participer',
  },
  th: {
    lead: 'สัมมนาออนไลน์ฟรีนี้แนะนำ PROTAI และการดูแลผิวรอบดวงตาในชีวิตประจำวัน ใช้เวลาประมาณ 90 นาที',
    details: [
      { label: 'วันเวลาและที่ว่าง', text: 'ตรวจสอบข้อมูลล่าสุดในหน้าลงทะเบียนภายนอก' },
      { label: 'ข้อความบนหน้าจอ', text: '“Added to cart” หมายถึงเลือกช่วงเวลาแล้ว' },
      { label: 'ค่าเข้าร่วม', text: 'สัมมนานี้เข้าร่วมฟรี' },
    ],
    guide: 'ขั้นตอนการลงทะเบียนและเข้าร่วม',
  },
}

export const webinarRegistrationChoices: Partial<Record<Locale, {
  intro: string
  scan: string
  link: string
  href: string
  qr: string
  qrAlt: string
  note?: string
}>> = {
  zh: {
    intro: '您可以透過以下任一方式前往報名頁面：',
    scan: '使用手機或平板掃描 QR code',
    link: '點選下方連結，直接前往繁體中文報名頁面：',
    href: 'https://prosunfun.protai.com.tw/f/eyecareseminar',
    qr: '/media/2026/10/webinar-zh-qr.png',
    qrAlt: '繁體中文線上講座報名頁面的 QR code',
  },
  en: {
    intro: 'You can register in either of the following ways:',
    scan: 'Scan the QR code using your smartphone or tablet',
    link: 'Click the link below to go directly to the English Registration Page:',
    href: 'https://prosunfun.protai.com.tw/f/eyecareonlineseminar',
    qr: '/media/2025/10/image-4.webp',
    qrAlt: 'QR code for the English webinar registration page',
    note: 'Once opened, you will be taken to our registration page in English.',
  },
  ja: {
    intro: '以下のいずれかの方法で登録ページへお進みください。',
    scan: 'スマホ・タブレットでQRをスキャン',
    link: '以下のリンクをクリック',
    href: 'https://prosunfun.protai.com.tw/f/ippongikyoto',
    qr: '/media/2025/06/QR_JP.webp',
    qrAlt: '日本語ウェビナー申込用QRコード',
  },
  th: {
    intro: 'คุณสามารถลงทะเบียนได้โดยวิธีใดวิธีหนึ่งดังนี้:',
    scan: 'สแกน QR code ด้วยสมาร์ทโฟนหรือแท็บเล็ตของคุณ',
    link: 'คลิกลิงก์ด้านล่างเพื่อไปยังหน้าลงทะเบียนภาษาอังกฤษโดยตรง',
    href: 'https://prosunfun.protai.com.tw/f/eyecarewebinar',
    qr: '/media/2025/09/1.webp',
    qrAlt: 'คิวอาร์โค้ดสำหรับลงทะเบียนสัมมนาออนไลน์',
  },
}
