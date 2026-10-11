import type { Locale } from './types'

export const privacyCopy: Record<Locale, {
  title: string; description: string; footer: string; sections: { title: string; body: string }[]
}> = {
  en: {
    title: 'Privacy Policy', description: 'How IPPONGI Kyoto handles contact form details and privacy-friendly site statistics.', footer: 'Privacy Policy',
    sections: [
      { title: 'Contact enquiries', body: 'When you send an enquiry, we receive your name, email address and message. We use them only to respond to your enquiry and any necessary follow-up. Please do not include sensitive health or payment information.' },
      { title: 'Delivery and protection', body: 'The form uses Cloudflare to process and deliver your message. Basic spam checks help protect the service. We do not sell your enquiry details or use them for marketing without a separate choice.' },
      { title: 'Site statistics', body: 'We use cookie-free, aggregated page statistics and count clicks on links to the original shop and webinar registration. These events include the page language and link type, but not your name, email address or message.' },
      { title: 'Your choices', body: 'You can request access, correction or deletion of your enquiry details by emailing {{EMAIL}}. We keep enquiry records only for the time needed to respond and meet applicable obligations.' },
    ],
  },
  ja: {
    title: 'プライバシーポリシー', description: 'IPPONGI Kyotoのお問い合わせ情報とサイト利用統計の取扱いについてご案内します。', footer: 'プライバシーポリシー',
    sections: [
      { title: 'お問い合わせ情報', body: 'お問い合わせの際、お名前、メールアドレス、メッセージをお預かりします。回答および必要なご連絡のためにのみ利用します。健康状態や決済情報などの機微な情報は送信しないでください。' },
      { title: '送信と保護', body: 'フォームの処理とメール送信にはCloudflareを利用します。迷惑送信を防ぐための基本的な確認を行います。お問い合わせ情報を販売したり、別途同意なく広告に使用したりしません。' },
      { title: 'アクセス統計', body: 'Cookieを使用しない集計型の閲覧統計と、旧ショップ・ウェビナー申込リンクのクリック数を利用します。記録するのはページの言語とリンクの種類で、お名前、メールアドレス、メッセージは含みません。' },
      { title: 'ご本人の権利', body: 'お問い合わせ情報の開示・訂正・削除をご希望の場合は、{{EMAIL}} へご連絡ください。返信と適用される義務に必要な期間のみ保管します。' },
    ],
  },
  fr: {
    title: 'Politique de confidentialité', description: 'Découvrez comment IPPONGI Kyoto traite les demandes de contact et les statistiques du site.', footer: 'Confidentialité',
    sections: [
      { title: 'Demandes de contact', body: 'Lorsque vous nous écrivez, nous recevons votre nom, votre adresse e-mail et votre message. Nous les utilisons uniquement pour répondre et assurer le suivi nécessaire. Merci de ne pas envoyer de données de santé sensibles ni de données de paiement.' },
      { title: 'Envoi et protection', body: 'Le formulaire utilise Cloudflare pour traiter et transmettre votre message. Des contrôles simples limitent les envois indésirables. Nous ne vendons pas vos données et ne les utilisons pas à des fins commerciales sans choix distinct.' },
      { title: 'Statistiques du site', body: 'Nous utilisons des statistiques agrégées sans cookies et comptons les clics vers la boutique d’origine et l’inscription au webinaire. Ces événements indiquent la langue de la page et le type de lien, sans nom, e-mail ni message.' },
      { title: 'Vos droits', body: 'Pour demander l’accès, la rectification ou la suppression de vos données de contact, écrivez à {{EMAIL}}. Nous les conservons seulement le temps nécessaire pour répondre et respecter nos obligations applicables.' },
    ],
  },
  th: {
    title: 'นโยบายความเป็นส่วนตัว', description: 'วิธีที่ IPPONGI Kyoto จัดการข้อมูลติดต่อและสถิติการใช้งานเว็บไซต์', footer: 'นโยบายความเป็นส่วนตัว',
    sections: [
      { title: 'การติดต่อสอบถาม', body: 'เมื่อส่งข้อความถึงเรา เราจะได้รับชื่อ อีเมล และข้อความของคุณ และใช้เพื่อตอบกลับและติดตามเรื่องที่จำเป็นเท่านั้น โปรดอย่าส่งข้อมูลสุขภาพที่ละเอียดอ่อนหรือข้อมูลการชำระเงิน' },
      { title: 'การส่งและการป้องกัน', body: 'แบบฟอร์มใช้ Cloudflare ในการประมวลผลและส่งข้อความ พร้อมตรวจสอบเบื้องต้นเพื่อป้องกันสแปม เราไม่ขายข้อมูลของคุณหรือใช้เพื่อการตลาดโดยไม่ได้รับความยินยอมแยกต่างหาก' },
      { title: 'สถิติของเว็บไซต์', body: 'เราใช้สถิติแบบรวมที่ไม่ใช้คุกกี้ และนับการคลิกลิงก์ไปยังร้านค้าเดิมและการลงทะเบียนสัมมนา โดยบันทึกเฉพาะภาษาและประเภทลิงก์ ไม่รวมชื่อ อีเมล หรือข้อความ' },
      { title: 'สิทธิของคุณ', body: 'หากต้องการขอเข้าถึง แก้ไข หรือลบข้อมูลการติดต่อ โปรดอีเมล {{EMAIL}} เราเก็บข้อมูลเท่าที่จำเป็นต่อการตอบกลับและปฏิบัติตามหน้าที่ที่เกี่ยวข้อง' },
    ],
  },
}

export const formCopy: Record<Locale, {
  title: string; name: string; email: string; message: string; consent: string; send: string;
  sending: string; success: string; error: string; invalid: string; privacy: string
}> = {
  en: { title: 'Send an enquiry', name: 'Name', email: 'Email', message: 'Message', consent: 'I have read the Privacy Policy and agree to the handling of my enquiry.', send: 'Send message', sending: 'Sending…', success: 'Your message has been sent.', error: 'We could not send your message. Please try again or email us directly.', invalid: 'Please complete all fields and agree to the privacy policy.', privacy: 'Privacy Policy' },
  ja: { title: 'お問い合わせフォーム', name: 'お名前', email: 'メールアドレス', message: 'お問い合わせ内容', consent: 'プライバシーポリシーを読み、お問い合わせ情報の取扱いに同意します。', send: '送信する', sending: '送信中…', success: 'お問い合わせを送信しました。', error: '送信できませんでした。再度お試しいただくか、メールでお問い合わせください。', invalid: 'すべての項目を入力し、プライバシーポリシーに同意してください。', privacy: 'プライバシーポリシー' },
  fr: { title: 'Envoyer une demande', name: 'Nom', email: 'E-mail', message: 'Message', consent: 'J’ai lu la politique de confidentialité et j’accepte le traitement de ma demande.', send: 'Envoyer le message', sending: 'Envoi en cours…', success: 'Votre message a été envoyé.', error: 'Votre message n’a pas pu être envoyé. Réessayez ou écrivez-nous directement.', invalid: 'Complétez tous les champs et acceptez la politique de confidentialité.', privacy: 'Politique de confidentialité' },
  th: { title: 'ส่งข้อความสอบถาม', name: 'ชื่อ', email: 'อีเมล', message: 'ข้อความ', consent: 'ฉันได้อ่านนโยบายความเป็นส่วนตัวและยินยอมให้จัดการข้อมูลสำหรับการสอบถามนี้', send: 'ส่งข้อความ', sending: 'กำลังส่ง…', success: 'ส่งข้อความของคุณแล้ว', error: 'ไม่สามารถส่งข้อความได้ โปรดลองอีกครั้งหรือส่งอีเมลถึงเราโดยตรง', invalid: 'โปรดกรอกข้อมูลให้ครบและยอมรับนโยบายความเป็นส่วนตัว', privacy: 'นโยบายความเป็นส่วนตัว' },
}

export const privacyPath = (locale: Locale) => `${locale === 'en' ? '' : `/${locale}`}/privacy-policy/`
