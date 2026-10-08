# IPPONGI Kyoto 重製站

依 2026-10-05 封存的公開網站內容製作。此專案與 `cool-bowl-site` 完全分離，採京都護眼品牌的編輯式版面與克制動效；目前是本機審稿版，未接管原站網域或交易資料。

## 內容範圍

- 保留原站地圖的 52 個網址及英、日、法、泰四種語言內容。
- 圖片已轉為網頁用 WebP；影片維持原檔，不重新編碼。
- 原站註冊連結通往既有報名表；商品購買通往既有商店；聯絡使用公開信箱。本站沒有假表單或假購物車。
- 原站商品敘述包含英文與日文，產品頁分別呈現；首頁暫時不展示尚未查證的療效、專利數量與使用者數字。產品頁資訊仍須由熟悉日本藥機法的人審閱，預覽版不代表法規審核通過。

## 本機使用

```bash
npm install
npm run dev
```

在這台電腦開啟 <http://127.0.0.1:4321/>。正式輸出使用 `npm run build`，檔案位於 `dist/`；可用 `npm run preview` 檢視。`npm run check` 進行型別檢查。

## 預覽與 SEO

臨時預覽建置需設定 `PUBLIC_SITE_URL` 為當次預覽網址，並設定 `PUBLIC_PREVIEW=1`。這會輸出 canonical、四語 hreflang、社群分享圖與描述，同時加上 `noindex`，避免臨時網址被搜尋引擎收錄。未設定公開網址時，輸出也預設 `noindex`。若日後改由 WordPress 正式承載，請在 WordPress 中只保留一套 SEO 輸出設定，並以正式網域重新建立上述 metadata；不要直接沿用臨時預覽網址。

首頁大圖與視覺系列使用依螢幕尺寸選取的 WebP 圖片。要重新產生圖片尺寸，執行 `node scripts/optimize-home-images.mjs`。

內容與媒體來自 `~/Downloads/ippongikyoto-archive-2026-10-05`。如需從封存重新匯入：

```bash
IPPONGI_ARCHIVE="$HOME/Downloads/ippongikyoto-archive-2026-10-05" npm run content:import
```

匯入後請重新執行 `npm run check` 和 `npm run build`。網站所需媒體已存入 `public/media/`，一般檢視與建置不需要重新抓取原站。

## 上線前待決

目前未建立新的付款／購物車後端，購買按鈕會開啟原站商品頁；正式切換網域前須確定新的訂單、付款、稅務及庫存流程。公開使用原站圖文影片也須先確認授權。寄信按鈕使用裝置預設郵件程式；若要站內表單，需另接可實際送信的服務。
