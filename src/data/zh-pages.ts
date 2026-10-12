import type { ContentBlock, SitePage } from './types'

type PageSpec = { source: string; path: string; title: string; description: string; blocks: ContentBlock[]; text?: string; videos?: string[] }
const h2 = (text: string): ContentBlock => ({ type: 'h2', text })
const p = (text: string): ContentBlock => ({ type: 'p', text })
const img = (url: string): ContentBlock => ({ type: 'image', url })

const specs: PageSpec[] = [
  {
    source: '/', path: '/zh/', title: 'PROTAI 眼周保養噴霧',
    description: '認識 IPPONGI Kyoto 的日本製 PROTAI 眼周肌膚保養噴霧、品牌故事與產品資訊。',
    videos: ['/media/2026/10/protai-zh-home.mp4', '/media/2026/10/protai-zh-origin.mp4'],
    blocks: [h2('PROTAI 是什麼？'), img('/media/2025/06/Protai-Molecule.webp'), h2('PROTAI 的起源'), h2('認識我們的日常保養')],
  },
  {
    source: '/about/', path: '/zh/about/', title: '關於 IPPONGI Kyoto',
    description: '了解 IPPONGI Kyoto 在京都的品牌起點，以及 PROTAI 眼周保養品背後的理念。',
    blocks: [
      h2('從京都出發'), img('/media/2025/05/S__6561812.webp'),
      p('IPPONGI LLC 以京都為據點，從「眼睛是心靈之窗」的信念出發，思考如何在忙碌的日常裡照顧眼周肌膚。'),
      h2('我們的理念'), p('我們相信保養可以回到簡單的日常：了解成分、尊重身體感受，也清楚區分化妝品與醫療用品。PROTAI 是為眼周肌膚補水的日本製保養噴霧，並非眼藥水。'),
      h2('我們做什麼'), p('除了介紹 PROTAI 產品，我們也透過線上講座分享眼周保養與數位生活的相關知識，並連結臺灣的研發與日本的製造。'),
      h2('公司資訊'), p('公司名稱：IPPONGI LLC（一凡木合同会社）'), p('成立日期：2025 年 3 月 10 日'),
      p('京都辦公室：{{CONTACT_ADDRESS}}'), p('營業時間：{{BUSINESS_HOURS}}'), p('電子郵件：{{EMAIL}}'),
    ],
  },
  {
    source: '/founder-message/', path: '/zh/founder-message/', title: '創辦人的話',
    description: '閱讀 IPPONGI Kyoto 代表 WEIFAN CHIA 對品牌起點、家人與 PROTAI 的分享。',
    blocks: [
      img('/media/2025/11/image.webp'),
      p('大家好，我是 IPPONGI LLC Japan 的代表 WEIFAN CHIA，也是臺灣三凡生技研發股份有限公司的特別助理。'),
      p('我想和您分享 PROTAI 背後的信念，以及這段旅程為什麼對我如此重要。'),
      p('PROTAI 的起點在臺灣的胜肽研究。2022 年父親生病時，我回到臺灣，開始更深入認識他的公司與團隊長年投入的工作，也重新思考自己想為人們帶來什麼。'),
      p('後來，我從零開始尋找合作夥伴，並在日本建立 PROTAI Beauty & Wellness。對我而言，產品不只是技術，也承載了人與人之間的關心。'),
      p('有人在忙碌的螢幕工作之後，希望為自己留一點照顧眼周肌膚的時間；也有人單純喜歡每天使用時的清爽感。這些都是個人的感受，不代表每個人都會有相同結果。'),
      p('我希望將臺灣的研發背景與日本的製造工藝連結，從京都出發，讓大家更容易認識 PROTAI，也能以自己的步調選擇日常保養。'),
      p('謝謝您閱讀這封信。'),
    ],
  },
  {
    source: '/webinar/', path: '/zh/webinar/', title: 'PROTAI 線上講座',
    description: '了解 IPPONGI Kyoto 線上講座內容、外部報名方式與參加前須知。',
    blocks: [
      h2('一起認識眼周保養'),
      p('這場線上講座介紹 PROTAI、眼周肌膚保養，以及日常使用螢幕時值得留意的習慣。內容僅供一般資訊參考，不提供醫療診斷或治療建議。'),
      p('報名與參加都在外部網站進行。頁面語言、實際場次與名額，以主辦單位公告為準；若未提供繁體中文場次，請先確認您能使用的語言。'),
      h2('步驟 1：開啟報名頁面'),
      p('點選本頁的「前往報名」按鈕，前往外部報名頁面。'),
      h2('步驟 2：查看講座資訊'),
      p('先閱讀講座內容，再往下查看可報名的日期、時間與剩餘名額。'),
      img('/media/2026/06/1.webp'),
      h2('步驟 3：選擇場次'),
      p('選擇適合自己的時段。外部平台可能以「Select」或「Added to cart」顯示已選擇的場次；這場講座不收取報名費。'),
      img('/media/2026/06/2.webp'),
      h2('步驟 4：填寫資料'),
      p('依外部表單填寫姓名、電話號碼與電子郵件，並再次確認聯絡資訊正確，以便接收講座連結及提醒。'),
      img('/media/2026/06/5.webp'),
      h2('步驟 5：確認報名'),
      p('送出前請檢查場次與個人資料，並閱讀外部網站的相關說明。'),
      img('/media/2026/06/7.webp'),
      h2('步驟 6：收取參加連結'),
      p('報名完成後，請留意確認郵件或簡訊中的參加連結。若沒有收到，請檢查垃圾郵件與填寫的聯絡資訊。'),
      img('/media/2026/06/8.webp'),
      h2('步驟 7：準時加入講座'),
      p('講座開始前，使用通知中的專屬連結進入線上會場。若平台要求設定顯示名稱，請依畫面指示完成。'),
    ],
  },
  {
    source: '/faq/', path: '/zh/faq/', title: 'PROTAI 常見問題',
    description: '查詢 PROTAI 眼周保養噴霧的使用方式、成分與注意事項。', blocks: [],
  },
  {
    source: '/contact/', path: '/zh/contact/', title: '聯絡 IPPONGI Kyoto',
    description: '透過電子郵件或聯絡表單詢問 IPPONGI Kyoto 與 PROTAI 的相關問題。', blocks: [],
  },
  {
    source: '/online-shop/', path: '/zh/online-shop/', title: 'PROTAI 線上商店',
    description: '比較 PROTAI 眼周保養噴霧與補充組的容量、價格與使用方式，並前往商店查看供貨。', blocks: [],
  },
  {
    source: '/commercial-disclosure/', path: '/zh/commercial-disclosure/', title: '特定商業交易資訊',
    description: '查看 IPPONGI Kyoto 的營業者、付款、運費與配送等交易資訊。',
    blocks: [
      h2('營業者與聯絡方式'), p('營業者：{{LEGAL_NAME}}（IPPONGI LLC）'), p('負責人：WEIFAN CHIA'),
      p('地址：{{CONTACT_ADDRESS}}'), p('電話：+81 80-1524-3643'), p('電子郵件：{{EMAIL}}'),
      p('受理時間：{{BUSINESS_HOURS}}'),
      h2('售價與其他費用'), p('商品售價請以商店購買頁面所示為準。目前販售商品金額均達日本國內免運門檻，國內配送免運；海外配送與可能費用請於下單前向商店確認。'),
      h2('付款與配送'), p('可用信用卡或銀行轉帳付款；實際可用方式以商店結帳頁為準。訂單確認後通常於 3 至 5 個工作天內出貨，出貨後通常於 7 至 14 天內送達；實際時間請以購買網站公告為準。'),
      h2('退換貨條件'), p('未拆封商品可於送達後七日內申請退貨。商品若有瑕疵、損壞或寄錯，請透過聯絡表單或 {{EMAIL}} 與我們聯繫。退貨申請方式與相關細節請參閱退換貨資訊頁。'),
    ],
  },
  {
    source: '/returns-and-exchanges/', path: '/zh/returns-and-exchanges/', title: '退換貨資訊',
    description: '了解未拆封商品送達後七日內的退貨條件，以及瑕疵、損壞或誤寄商品的聯絡方式。',
    blocks: [
      h2('收到商品有問題時'), p('如果收到的商品有瑕疵、損壞或寄錯，請儘速透過聯絡表單或 {{EMAIL}} 與我們聯繫，並保留商品及訂單資訊，以便核對。'),
      h2('未拆封商品退貨'), p('未拆封商品可於送達後七日內申請退貨。請在期限內透過聯絡表單或 {{EMAIL}} 提供訂單資訊，並保留商品原包裝，以便我們確認後續寄回與退款方式。'),
      p('運費負擔、退款作業及特殊商品的處理方式，請在寄回商品前向我們確認。'),
    ],
  },
]

export function createChinesePages(pages: SitePage[]): SitePage[] {
  return specs.map((spec) => {
    const source = pages.find((page) => page.lang === 'en' && page.path === spec.source)
    if (!source) throw new Error(`Missing English page for ${spec.path}: ${spec.source}`)
    const text = spec.text || spec.blocks.map((block) => block.text || '').filter(Boolean).join('\n')
    return {
      ...source, path: spec.path, lang: 'zh', title: spec.title, description: spec.description,
      text: source.kind === 'webinar' ? `${text}\nhttps://prosunfun.protai.com.tw/f/eyecareseminar` : text,
      blocks: spec.blocks, videos: spec.videos || [],
      links: source.kind === 'webinar' ? [{ href: 'https://prosunfun.protai.com.tw/f/eyecareseminar', text: '前往報名' }] : source.links,
      alternates: { ...source.alternates, en: source.path, zh: spec.path },
    }
  })
}
