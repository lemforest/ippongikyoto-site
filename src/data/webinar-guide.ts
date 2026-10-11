import type { Locale } from './types'

export const webinarGuideCopy: Record<Locale, { lead: string; detail: string; guide: string }> = {
  zh: {
    lead: '免費線上講座介紹 PROTAI 與日常眼周肌膚保養，時間約 90 分鐘。',
    detail: '目前場次與名額請以外部報名頁面為準。頁面顯示「Added to cart」代表已選擇場次；講座不收取報名費。',
    guide: '報名與參加方式',
  },
  ja: {
    lead: '無料のオンラインウェビナーでは、PROTAIの製品情報と日々の目元ケアについてご紹介します。所要時間は約90分です。',
    detail: '日時と空席は外部の申込ページでご確認ください。申込時に「Added to cart」と表示されても、このウェビナーの参加費はかかりません。',
    guide: 'お申し込み・参加の手順',
  },
  en: {
    lead: 'This free online webinar introduces PROTAI and everyday eye-area skincare. The session lasts about 90 minutes.',
    detail: 'Check the external registration page for current times and availability. “Added to cart” is the platform’s wording for selecting a session; the webinar is free.',
    guide: 'Registration and joining guide',
  },
  fr: {
    lead: 'Ce webinaire gratuit présente PROTAI et les soins quotidiens de la peau du contour des yeux. La séance dure environ 90 minutes.',
    detail: 'Consultez la plateforme d’inscription pour connaître les horaires et les places disponibles. « Added to cart » indique la sélection d’une séance ; le webinaire est gratuit.',
    guide: 'S’inscrire et participer',
  },
  th: {
    lead: 'สัมมนาออนไลน์ฟรีนี้แนะนำ PROTAI และการดูแลผิวรอบดวงตาในชีวิตประจำวัน ใช้เวลาประมาณ 90 นาที',
    detail: 'โปรดตรวจสอบวันเวลาและที่ว่างในหน้าลงทะเบียนภายนอก ข้อความ “Added to cart” หมายถึงเลือกช่วงเวลาแล้ว สัมมนานี้ไม่มีค่าเข้าร่วม',
    guide: 'ขั้นตอนการลงทะเบียนและเข้าร่วม',
  },
}
