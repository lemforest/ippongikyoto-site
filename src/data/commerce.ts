import type { Locale } from './types'
import facts from './facts.json'

// Until the WooCommerce migration is complete, preview links must reach the
// currently live store. The production build keeps the dedicated shop host.
export const storeOrigin = import.meta.env.PUBLIC_PREVIEW === '1'
  ? 'https://ippongikyoto.com'
  : 'https://shop.ippongikyoto.com'

const products = {
  single: '/product/protai-eye-skin-care-mistg/',
  refill: '/product/protai-eye-skin-care-mist-10ml-x-2-20ml/',
} as const

// The Thai shop is confirmed, but product-specific Shopee URLs still need
// confirmation before a product-specific deep link can be published.
const thaiShop = 'https://shopee.co.th/shop/1547555143/'

export function purchaseUrl(locale: Locale, format: keyof typeof products) {
  return locale === 'th' ? thaiShop : `${storeOrigin}${products[format]}`
}

const yen = (amount: number, locale: Locale) => `¥${new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US').format(amount)}`
const perRefillBottle = facts.products.refill.priceJPY / facts.products.refill.bottles

export const shopCopy: Record<Locale, {
  title: string; firstColumn: string; columns: [string, string]; rows: [string, string, string][]; stock: string; unavailable: string
}> = {
  en: { title: 'Compare the two formats', firstColumn: 'Feature', columns: ['10ml mist', 'Refill set · 10ml × 2'], rows: [
    ['Capacity', '10ml', '20ml (two 10ml bottles)'], ['Price', yen(facts.products.single.priceJPY, 'en'), yen(facts.products.refill.priceJPY, 'en')],
    ['Price per bottle', yen(facts.products.single.priceJPY, 'en'), yen(perRefillBottle, 'en')], ['Original spray bottle needed', 'No', 'Yes'],
  ], unavailable: 'Out of stock at last check', stock: 'The refill set was out of stock at the last store check (12 October 2026). Check the store for current availability.' },
  ja: { title: 'ふたつのタイプを比較', firstColumn: '項目', columns: ['ミスト 10ml', '詰め替え用 10ml × 2'], rows: [
    ['内容量', '10ml', '20ml（10ml × 2本）'], ['価格', yen(facts.products.single.priceJPY, 'ja'), yen(facts.products.refill.priceJPY, 'ja')],
    ['1本あたり', yen(facts.products.single.priceJPY, 'ja'), yen(perRefillBottle, 'ja')], ['本体ボトル', '不要', '必要'],
  ], unavailable: '最終確認時は在庫切れ', stock: '詰め替え用は最終確認時（2026年10月12日）に在庫切れでした。最新の在庫状況はショップをご確認ください。' },
  fr: { title: 'Comparer les deux formats', firstColumn: 'Caractéristique', columns: ['Brume 10 ml', 'Recharges 10 ml × 2'], rows: [
    ['Contenance', '10 ml', '20 ml (deux flacons de 10 ml)'], ['Prix', yen(facts.products.single.priceJPY, 'fr'), yen(facts.products.refill.priceJPY, 'fr')],
    ['Prix par flacon', yen(facts.products.single.priceJPY, 'fr'), yen(perRefillBottle, 'fr')], ['Flacon spray d’origine requis', 'Non', 'Oui'],
  ], unavailable: 'Épuisé au dernier contrôle', stock: 'Les recharges étaient épuisées lors de notre dernier contrôle (12 octobre 2026). Consultez la boutique pour la disponibilité actuelle.' },
  th: { title: 'เปรียบเทียบสองรูปแบบ', firstColumn: 'รายการ', columns: ['สเปรย์ 10 มล.', 'รีฟิล 10 มล. × 2'], rows: [
    ['ปริมาณ', '10 มล.', '20 มล. (10 มล. × 2 ขวด)'], ['ราคาในญี่ปุ่น', yen(facts.products.single.priceJPY, 'th'), yen(facts.products.refill.priceJPY, 'th')],
    ['ราคาต่อขวดในญี่ปุ่น', yen(facts.products.single.priceJPY, 'th'), yen(perRefillBottle, 'th')], ['ต้องใช้ขวดสเปรย์เดิม', 'ไม่ต้อง', 'ต้องใช้'],
  ], unavailable: 'หมดในร้านญี่ปุ่น ณ วันที่ตรวจสอบล่าสุด', stock: 'ชุดรีฟิลหมดในร้านญี่ปุ่น ณ วันที่ตรวจสอบล่าสุด (12 ตุลาคม 2026) โปรดตรวจสอบราคาและสินค้าคงเหลือของ Shopee โดยตรง' },
  zh: { title: '比較兩種容量', firstColumn: '項目', columns: ['噴霧瓶 10ml', '補充組 10ml × 2'], rows: [
    ['容量', '10ml', '20ml（兩瓶各 10ml）'], ['日本售價', yen(facts.products.single.priceJPY, 'zh'), yen(facts.products.refill.priceJPY, 'zh')],
    ['日本每瓶單價', yen(facts.products.single.priceJPY, 'zh'), yen(perRefillBottle, 'zh')], ['是否需要原噴霧瓶', '不需要', '需要'],
  ], unavailable: '上次核對時缺貨', stock: '補充組於上次核對日本商店時（2026 年 10 月 12 日）顯示缺貨；目前供貨請以商店頁面為準。' },
}
