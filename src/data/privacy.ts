import type { Locale } from './types'

export const privacyCopy: Record<Locale, {
  title: string; description: string; footer: string; sections: { title: string; body: string; linkLabel?: string; linkUrl?: string }[]
}> = {
  zh: {
    title: '隱私權政策', description: '了解 IPPONGI Kyoto 如何處理聯絡表單資料與網站統計資訊。', footer: '隱私權政策',
    sections: [
      { title: '網站營運者', body: '本網站由{{LEGAL_NAME}}（IPPONGI Kyoto）營運，地址：{{CONTACT_ADDRESS}}。隱私相關問題請寄至 {{EMAIL}}。' },
      { title: '聯絡表單', body: '當您送出詢問時，我們會收到您的姓名、電子郵件與訊息，僅用於回覆及必要的後續聯繫。請勿在訊息中提供敏感健康資訊或付款資料。' },
      { title: '外部網站的講座報名', body: '講座報名連結會開啟由 BombMy 提供的外部網站 prosunfun.protai.com.tw。報名表單要求姓名、電話與電子郵件，用於預約、確認及寄送參加資訊。資料在外部網站提交，而非透過本站聯絡表單。平台與主辦方可能處理這些資料，外部服務也可能使用 Cookie。提交前請閱讀其隱私權政策；我們尚未確認報名資料的保存期限，或是否另行提供給 IPPONGI 使用。', linkLabel: 'BombMy 網站（頁尾有隱私權政策）', linkUrl: 'https://www.bombmy.live/' },
      { title: '資料傳送與保護', body: '表單透過 Cloudflare Pages Functions 處理，並使用 Cloudflare Turnstile 驗證，以減少自動化垃圾訊息；驗證資料由 Cloudflare 處理。您的姓名、電子郵件與訊息會交由 Resend 寄到客服信箱供回覆。Resend 會為寄送服務處理這些資料。我們不會販售您的詢問資料，未經另行同意也不會用於行銷。', linkLabel: 'Resend 隱私權政策', linkUrl: 'https://resend.com/legal/privacy-policy' },
      { title: '網站統計', body: '我們使用 Cloudflare Web Analytics 了解網站的彙總瀏覽量與載入表現。此工具不使用 Cookie；本站不另行記錄購買或講座連結的個別點擊，也不將聯絡表單的姓名、電子郵件或訊息送入網站統計。' },
      { title: '您的選擇', body: '您可寄信至 {{EMAIL}}，要求查閱、更正或刪除您的詢問資料。資料僅於回覆及履行適用義務所需期間保存。' },
    ],
  },
  en: {
    title: 'Privacy Policy', description: 'How IPPONGI Kyoto handles contact form details and privacy-friendly site statistics.', footer: 'Privacy Policy',
    sections: [
      { title: 'Who operates this website', body: 'This website is operated by {{LEGAL_NAME}} (IPPONGI Kyoto), at {{CONTACT_ADDRESS}}. For privacy questions, contact {{EMAIL}}.' },
      { title: 'Contact enquiries', body: 'When you send an enquiry, we receive your name, email address and message. We use them only to respond to your enquiry and any necessary follow-up. Please do not include sensitive health or payment information.' },
      { title: 'Webinar registration on another site', body: 'Our webinar links open a separate registration service at prosunfun.protai.com.tw, powered by BombMy. Its form asks for your name, phone number and email address to reserve a session and send confirmation, access details and reminders. Those fields are submitted on that external site, not through this website’s contact form. The platform and event organiser may process them; the external service may use cookies. BombMy publishes a privacy policy on its own website. Please read it before submitting. We have not verified the registration data’s retention period or whether it is passed to IPPONGI for other purposes.', linkLabel: 'BombMy website — Privacy Policy in the footer', linkUrl: 'https://www.bombmy.live/' },
      { title: 'Delivery and protection', body: 'The form is processed by Cloudflare Pages Functions and uses Cloudflare Turnstile to reduce automated spam; Cloudflare processes verification data. Your name, email address and message are sent through Resend to our customer support inbox for a reply. Resend processes these details to provide email delivery. We do not sell enquiry details or use them for marketing without separate consent.', linkLabel: 'Resend Privacy Policy', linkUrl: 'https://resend.com/legal/privacy-policy' },
      { title: 'Site statistics', body: 'We use Cloudflare Web Analytics for aggregate page views and site performance. It does not use cookies. This site does not separately record individual clicks on shop or webinar links, and does not send contact form names, email addresses or messages to site analytics.' },
      { title: 'Your choices', body: 'You can request access, correction or deletion of your enquiry details by emailing {{EMAIL}}. We keep enquiry records only for the time needed to respond and meet applicable obligations.' },
    ],
  },
  ja: {
    title: 'プライバシーポリシー', description: 'IPPONGI Kyotoのお問い合わせ情報とサイト利用統計の取扱いについてご案内します。', footer: 'プライバシーポリシー',
    sections: [
      { title: 'サイト運営者', body: '当サイトの運営者は{{LEGAL_NAME}}（IPPONGI Kyoto）です。所在地：{{CONTACT_ADDRESS}}。個人情報に関するお問い合わせ：{{EMAIL}}。' },
      { title: 'お問い合わせ情報', body: 'お問い合わせの際、お名前、メールアドレス、メッセージをお預かりします。回答および必要なご連絡のためにのみ利用します。健康状態や決済情報などの機微な情報は送信しないでください。' },
      { title: '外部サイトでのウェビナー申込み', body: 'ウェビナーの申込リンクは、BombMy（幫賣）が提供する別サイト prosunfun.protai.com.tw に移動します。申込フォームでは、予約、確認、参加情報とリマインドの送信のため、氏名・電話番号・メールアドレスの入力が求められます。これらは当サイトのお問い合わせフォームではなく、外部サイトで送信されます。プラットフォームと主催者が情報を取り扱う場合があり、外部サイトではCookieを使用する場合があります。BombMyの公式サイトに掲載されたプライバシーポリシーを送信前にご確認ください。保存期間や、申込情報がIPPONGIに別の目的で提供されるかどうかは確認できていません。', linkLabel: 'BombMy公式サイト（ページ下部のプライバシーポリシー）', linkUrl: 'https://www.bombmy.live/' },
      { title: '送信と保護', body: 'フォームはCloudflare Pages Functionsで処理し、自動送信を抑えるためCloudflare Turnstileで検証します。検証情報はCloudflareが処理します。お名前、メールアドレス、お問い合わせ内容はResendを通じて返信用のサポートメールボックスに送信します。Resendはメール配信のためにこれらの情報を処理します。情報を販売したり、別途の同意なく広告に利用したりしません。', linkLabel: 'Resendのプライバシーポリシー', linkUrl: 'https://resend.com/legal/privacy-policy' },
      { title: 'アクセス統計', body: 'Cloudflare Web Analyticsを利用し、ページの閲覧状況と読み込み性能を集計します。Cookieは使用しません。ショップやウェビナー申込リンクの個別クリックは別途記録せず、お問い合わせの氏名・メールアドレス・本文を統計に送信しません。' },
      { title: 'ご本人の権利', body: 'お問い合わせ情報の開示・訂正・削除をご希望の場合は、{{EMAIL}} へご連絡ください。返信と適用される義務に必要な期間のみ保管します。' },
    ],
  },
  fr: {
    title: 'Politique de confidentialité', description: 'Découvrez comment IPPONGI Kyoto traite les demandes de contact et les statistiques du site.', footer: 'Confidentialité',
    sections: [
      { title: 'Responsable de ce site', body: 'Ce site est exploité par {{LEGAL_NAME}} (IPPONGI Kyoto), à l’adresse {{CONTACT_ADDRESS}}. Pour toute question relative à la confidentialité : {{EMAIL}}.' },
      { title: 'Demandes de contact', body: 'Lorsque vous nous écrivez, nous recevons votre nom, votre adresse e-mail et votre message. Nous les utilisons uniquement pour répondre et assurer le suivi nécessaire. Merci de ne pas envoyer de données de santé sensibles ni de données de paiement.' },
      { title: 'Inscription au webinaire sur un autre site', body: 'Le lien d’inscription ouvre un service distinct sur prosunfun.protai.com.tw, exploité avec BombMy. Son formulaire demande votre nom, votre numéro de téléphone et votre adresse e-mail pour réserver une séance et envoyer la confirmation, les accès et les rappels. Ces données sont transmises sur ce site externe, et non par le formulaire de contact du présent site. La plateforme et l’organisateur peuvent les traiter ; le site externe peut utiliser des cookies. BombMy publie sa politique de confidentialité sur son propre site : consultez-la avant l’envoi. Nous n’avons pas pu confirmer la durée de conservation des inscriptions ni si les données sont transmises à IPPONGI à d’autres fins.', linkLabel: 'Site de BombMy — politique de confidentialité en bas de page', linkUrl: 'https://www.bombmy.live/' },
      { title: 'Envoi et protection', body: 'Le formulaire est traité par Cloudflare Pages Functions et utilise Cloudflare Turnstile contre les envois automatisés ; Cloudflare traite les données de vérification. Votre nom, votre adresse e-mail et votre message sont transmis par Resend à notre boîte de support pour vous répondre. Resend traite ces données pour assurer l’envoi du courriel. Nous ne vendons pas vos données et ne les utilisons pas à des fins commerciales sans consentement distinct.', linkLabel: 'Politique de confidentialité de Resend', linkUrl: 'https://resend.com/legal/privacy-policy' },
      { title: 'Statistiques du site', body: 'Nous utilisons Cloudflare Web Analytics pour connaître les vues agrégées des pages et les performances du site, sans cookies. Nous n’enregistrons pas séparément les clics individuels vers la boutique ou le webinaire et ne transmettons ni nom, ni e-mail, ni message du formulaire aux statistiques.' },
      { title: 'Vos droits', body: 'Pour demander l’accès, la rectification ou la suppression de vos données de contact, écrivez à {{EMAIL}}. Nous les conservons seulement le temps nécessaire pour répondre et respecter nos obligations applicables.' },
    ],
  },
  th: {
    title: 'นโยบายความเป็นส่วนตัว', description: 'วิธีที่ IPPONGI Kyoto จัดการข้อมูลติดต่อและสถิติการใช้งานเว็บไซต์', footer: 'นโยบายความเป็นส่วนตัว',
    sections: [
      { title: 'ผู้ดูแลเว็บไซต์', body: 'เว็บไซต์นี้ดำเนินการโดย {{LEGAL_NAME}} (IPPONGI Kyoto) ที่อยู่: {{CONTACT_ADDRESS}} หากมีคำถามเกี่ยวกับข้อมูลส่วนบุคคล โปรดติดต่อ {{EMAIL}}' },
      { title: 'การติดต่อสอบถาม', body: 'เมื่อส่งข้อความถึงเรา เราจะได้รับชื่อ อีเมล และข้อความของคุณ และใช้เพื่อตอบกลับและติดตามเรื่องที่จำเป็นเท่านั้น โปรดอย่าส่งข้อมูลสุขภาพที่ละเอียดอ่อนหรือข้อมูลการชำระเงิน' },
      { title: 'การลงทะเบียนสัมมนาบนเว็บไซต์ภายนอก', body: 'ลิงก์ลงทะเบียนสัมมนาจะพาไปยังบริการอีกแห่งที่ prosunfun.protai.com.tw ซึ่งใช้แพลตฟอร์ม BombMy แบบฟอร์มดังกล่าวขอชื่อ เบอร์โทรศัพท์ และอีเมล เพื่อจองรอบ ส่งการยืนยัน ข้อมูลเข้าร่วม และการแจ้งเตือน ข้อมูลนี้ส่งผ่านเว็บไซต์ภายนอก ไม่ใช่แบบฟอร์มติดต่อของเว็บไซต์นี้ แพลตฟอร์มและผู้จัดงานอาจประมวลผลข้อมูล และเว็บไซต์ภายนอกอาจใช้คุกกี้ BombMy เผยแพร่นโยบายความเป็นส่วนตัวบนเว็บไซต์ของตน โปรดอ่านก่อนส่งข้อมูล เรายังไม่สามารถยืนยันระยะเวลาเก็บรักษาข้อมูลการลงทะเบียน หรือว่าข้อมูลจะถูกส่งให้ IPPONGI เพื่อวัตถุประสงค์อื่นหรือไม่', linkLabel: 'เว็บไซต์ BombMy — นโยบายความเป็นส่วนตัวอยู่ท้ายหน้า', linkUrl: 'https://www.bombmy.live/' },
      { title: 'การส่งและการป้องกัน', body: 'แบบฟอร์มประมวลผลผ่าน Cloudflare Pages Functions และใช้ Cloudflare Turnstile เพื่อลดสแปมอัตโนมัติ โดย Cloudflare ประมวลผลข้อมูลการยืนยัน ชื่อ อีเมล และข้อความของคุณจะถูกส่งผ่าน Resend ไปยังอีเมลฝ่ายบริการลูกค้าเพื่อตอบกลับ Resend ประมวลผลข้อมูลดังกล่าวเพื่อให้บริการส่งอีเมล เราไม่ขายข้อมูลหรือใช้เพื่อการตลาดโดยไม่มีความยินยอมแยกต่างหาก', linkLabel: 'นโยบายความเป็นส่วนตัวของ Resend', linkUrl: 'https://resend.com/legal/privacy-policy' },
      { title: 'สถิติของเว็บไซต์', body: 'เราใช้ Cloudflare Web Analytics เพื่อดูจำนวนการเข้าชมหน้าเว็บและประสิทธิภาพเว็บไซต์แบบสรุป โดยไม่ใช้คุกกี้ เว็บไซต์นี้ไม่บันทึกการคลิกลิงก์ร้านค้าหรือสัมมนาเป็นรายครั้ง และไม่ส่งชื่อ อีเมล หรือข้อความจากแบบฟอร์มติดต่อไปยังระบบสถิติ' },
      { title: 'สิทธิของคุณ', body: 'หากต้องการขอเข้าถึง แก้ไข หรือลบข้อมูลการติดต่อ โปรดอีเมล {{EMAIL}} เราเก็บข้อมูลเท่าที่จำเป็นต่อการตอบกลับและปฏิบัติตามหน้าที่ที่เกี่ยวข้อง' },
    ],
  },
}

export const formCopy: Record<Locale, {
  title: string; name: string; email: string; message: string; consent: string; send: string;
  sending: string; success: string; error: string; invalid: string; privacy: string
}> = {
  zh: { title: '寄送詢問', name: '姓名', email: '電子郵件', message: '訊息內容', consent: '我已閱讀隱私權政策，並同意依其說明處理我的詢問資料。', send: '送出訊息', sending: '傳送中…', success: '訊息已送出。', error: '訊息未能送出，請重試或直接寄送電子郵件。', invalid: '請填寫所有欄位並同意隱私權政策。', privacy: '隱私權政策' },
  en: { title: 'Send an enquiry', name: 'Name', email: 'Email', message: 'Message', consent: 'I have read the Privacy Policy and agree to the handling of my enquiry.', send: 'Send message', sending: 'Sending…', success: 'Your message has been sent.', error: 'We could not send your message. Please try again or email us directly.', invalid: 'Please complete all fields and agree to the privacy policy.', privacy: 'Privacy Policy' },
  ja: { title: 'お問い合わせフォーム', name: 'お名前', email: 'メールアドレス', message: 'お問い合わせ内容', consent: 'プライバシーポリシーを読み、お問い合わせ情報の取扱いに同意します。', send: '送信する', sending: '送信中…', success: 'お問い合わせを送信しました。', error: '送信できませんでした。再度お試しいただくか、メールでお問い合わせください。', invalid: 'すべての項目を入力し、プライバシーポリシーに同意してください。', privacy: 'プライバシーポリシー' },
  fr: { title: 'Envoyer une demande', name: 'Nom', email: 'E-mail', message: 'Message', consent: 'J’ai lu la politique de confidentialité et j’accepte le traitement de ma demande.', send: 'Envoyer le message', sending: 'Envoi en cours…', success: 'Votre message a été envoyé.', error: 'Votre message n’a pas pu être envoyé. Réessayez ou écrivez-nous directement.', invalid: 'Complétez tous les champs et acceptez la politique de confidentialité.', privacy: 'Politique de confidentialité' },
  th: { title: 'ส่งข้อความสอบถาม', name: 'ชื่อ', email: 'อีเมล', message: 'ข้อความ', consent: 'ฉันได้อ่านนโยบายความเป็นส่วนตัวและยินยอมให้จัดการข้อมูลสำหรับการสอบถามนี้', send: 'ส่งข้อความ', sending: 'กำลังส่ง…', success: 'ส่งข้อความของคุณแล้ว', error: 'ไม่สามารถส่งข้อความได้ โปรดลองอีกครั้งหรือส่งอีเมลถึงเราโดยตรง', invalid: 'โปรดกรอกข้อมูลให้ครบและยอมรับนโยบายความเป็นส่วนตัว', privacy: 'นโยบายความเป็นส่วนตัว' },
}

export const privacyPath = (locale: Locale) => `${locale === 'en' ? '' : `/${locale}`}/privacy-policy/`

export const webinarPrivacyNotice: Record<Locale, { text: string; policy: string }> = {
  zh: { text: '報名會前往外部網站，並要求填寫姓名、電話與電子郵件。', policy: '資料如何處理' },
  en: { text: 'Registration opens a separate site that asks for your name, phone number and email.', policy: 'How your data is handled' },
  ja: { text: '申込み先は外部サイトです。氏名・電話番号・メールアドレスの入力が必要です。', policy: '個人情報の取扱い' },
  fr: { text: 'L’inscription ouvre un autre site qui demande votre nom, téléphone et e-mail.', policy: 'Traitement de vos données' },
  th: { text: 'การลงทะเบียนเปิดเว็บไซต์ภายนอกซึ่งขอชื่อ เบอร์โทรศัพท์ และอีเมล', policy: 'การจัดการข้อมูลของคุณ' },
}
