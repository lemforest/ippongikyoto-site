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

## 靜態預覽部署

預覽站應將 `dist/` 部署至 Cloudflare Pages 等靜態主機，不以 `astro preview` 當公開伺服器。Cloudflare Pages 的建置命令為 `npm run build`、輸出目錄為 `dist`；環境變數設 `PUBLIC_PREVIEW=1`，並視需要將 `PUBLIC_SITE_URL` 設為固定預覽網址。`public/_headers` 會在建置後複製為 `dist/_headers`：HTML 短快取，帶雜湊檔名的 `/_astro/` 資源長快取。

每次部署後，檢查四語首頁與不存在的網址。不存在的網址須回傳 HTTP 404 並顯示站台版型；HTML 應短快取，`/_astro/` 資源應回傳 `public, max-age=31536000, immutable`。首頁首位元組時間須在部署後從外部實測，目標低於 300 ms；本機預覽不能代替這項驗收。

## 網址與舊連結轉址

英文頁面位於根目錄，日文、法文、泰文分別使用 `/ja/`、`/fr/`、`/th/` 前綴。對應內容共用 ASCII slug，例如 `/founder-message/`、`/ja/founder-message/`、`/fr/founder-message/`、`/th/founder-message/`。沒有對應翻譯的頁面維持原有語系覆蓋範圍，不以英文內容假冒翻譯。

`src/data/legacy-routes.json` 是舊網址至新網址的唯一對照表；建置前的 `scripts/build-redirects.mjs` 會產生 Cloudflare Pages 使用的 `public/_redirects`。`npm run routes:check` 會檢查 52 個封存網址、需要轉址的規則、輸出頁面，以及站內連結。`astro preview` 不會執行 `_redirects`；驗收 HTTP 301 應使用 Cloudflare Pages 或 `wrangler pages dev dist`。

頁尾的「原網站」與商品／結帳入口目前仍刻意外連正在營運的原站，因靜態預覽站沒有交易後端。這些是外部營運連結，不屬於站內頁面導覽；正式切換原網域前，須另行處理交易流程與這些外連。

## 預覽與 SEO

`astro.config.mjs` 將正式站基準網址設為 `https://ippongikyoto.com`，因此每個內容頁預設輸出指向自身的絕對 canonical；實際存在的對應語系輸出互相回指的 hreflang，有英文對應頁時才輸出指向英文的 `x-default`。404 頁沒有 canonical。執行 `npm run seo:check` 可逐頁驗證。

`@astrojs/sitemap` 會在建置時產生 `/sitemap-index.xml` 與分頁 sitemap，只列目前存在的內容頁與對應語系，不列舊網址。`public/robots.txt` 允許抓取並指向正式網域的 sitemap index；品牌於 2026-10-11 確認維持允許 AI 爬蟲，不另設封鎖規則。執行 `npm run sitemap:check` 可核對 sitemap 與各頁的 canonical、hreflang 及 `robots.txt`。

臨時預覽部署應設定 `PUBLIC_SITE_URL` 為當次預覽網址，並設定 `PUBLIC_PREVIEW=1`；這會以預覽網址輸出 metadata，同時加上 `noindex`，避免被搜尋引擎收錄。未設定 `PUBLIC_SITE_URL` 時預設仍為 `noindex`。正式部署本靜態站時須明確設定 `PUBLIC_PREVIEW=0`，並確認 `PUBLIC_SITE_URL` 未設定或等於正式網域。若日後改由 WordPress 正式承載，請只保留一套 SEO 輸出設定，不要直接沿用臨時預覽網址。

首頁大圖與視覺系列使用依螢幕尺寸選取的 WebP 圖片。要重新產生圖片尺寸，執行 `node scripts/optimize-home-images.mjs`。

## 結構化資料

全站內容頁輸出 `Organization`，內頁輸出 `BreadcrumbList`；八個四語商品頁另輸出 `Product` 與 `Offer`。價格與名稱對應頁面可見內容，單瓶／兩瓶組價格分別為 JPY 15400／26400。庫存狀態於 2026-10-11 對照原商店，單瓶有貨、兩瓶組缺貨；靜態頁不會自動同步庫存，正式發布前須重新核對。建置時會執行 `scripts/check-structured-data.mjs` 驗證各頁輸出。

四語 FAQ 的第一章回答尚未改寫，因此目前**不輸出 `FAQPage` 與 `Question`**；改寫、查證完成後才能從頁面可見的問答生成標記，不可直接標記現有回答。站上沒有可驗證評分，故不輸出 `AggregateRating` 或 `Review`。

內容與媒體來自 `~/Downloads/ippongikyoto-archive-2026-10-05`。如需從封存重新匯入：

```bash
IPPONGI_ARCHIVE="$HOME/Downloads/ippongikyoto-archive-2026-10-05" npm run content:import
```

匯入後請重新執行 `npm run check` 和 `npm run build`。網站所需媒體已存入 `public/media/`，一般檢視與建置不需要重新抓取原站。

## 上線前待決

目前未建立新的付款／購物車後端，購買按鈕會開啟原站商品頁；正式切換網域前須確定新的訂單、付款、稅務及庫存流程。公開使用原站圖文影片也須先確認授權。寄信按鈕使用裝置預設郵件程式；若要站內表單，需另接可實際送信的服務。
