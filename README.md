# IPPONGI Kyoto 新站

Astro 靜態內容站，五語系：英文根目錄、日文 `/ja/`、法文 `/fr/`、泰文 `/th/`、繁中 `/zh/`。預定部署至 Cloudflare Pages；正式網域仍由舊 WooCommerce 站使用，**目前不可切換**。

## 本機檢查

```bash
npm ci
npm run ci:check
```

`ci:check` 執行型別、建置、HTML、路由、SEO、語系及 sitemap 檢查。Cloudflare Pages 專屬 `_headers`、`_redirects`、Functions 與真實 404，須在 Pages 預覽或 `wrangler pages dev dist` 驗證；`astro preview` 無法代替。PR 工作流程另檢查建置後的站內連結。內容源自 2026-10-05 的舊站封存；`src/data/pages.json` 保留過期原文供追溯，不可直接發布。

## Cloudflare Pages 預覽

- 建置命令 `npm run build`，輸出目錄 `dist`，預覽分支設定 `PUBLIC_PREVIEW=1`；`PUBLIC_SITE_URL` 設為固定的 `https://<project>.pages.dev`，使預覽 canonical 與分享圖網址一致。
- 預覽須保留 `noindex`。在 `pages.dev` 實測五語首頁、商品連結、舊路徑 301、無效路徑 404、安全標頭、長快取、影片字幕、聯絡表單與手機畫面。**本機通過不等於線上驗收完成。**
- `PUBLIC_CF_WEB_ANALYTICS_TOKEN` 啟用 Cloudflare Web Analytics；預覽版不載入統計。依品牌決策，不另建逐筆購買／講座點擊紀錄。

## 交易與寄信：上線前必做

- 舊 WooCommerce 商店須先搬到 `https://shop.ippongikyoto.com`，確認 DNS、HTTPS、商品頁、購物車、結帳、訂單、付款、庫存及退貨規則。本站不提供購物車；英、日、法、繁中購買鈕已預備指向商店子網域，**在子網域可用前不可公開部署此版本**。泰文目前連至已確認的 Shopee 店鋪首頁，仍須取得兩款商品各自的直接網址。
- `src/data/legacy-routes.json` 是舊路徑映射來源；`scripts/build-redirects.mjs` 產生 `public/_redirects`。不要把舊商品／購物車／結帳路徑轉到新站商品介紹頁。切換當天逐條以 HTTP 301 與最終 200 驗證，且無轉址鏈。
- 表單使用 Pages Function、Cloudflare Turnstile 與 Cloudflare Email Sending。Pages build 需 `PUBLIC_TURNSTILE_SITE_KEY`；runtime 需 `TURNSTILE_SECRET_KEY`、`CF_ACCOUNT_ID`、`CF_EMAIL_FROM`、`CONTACT_TO`、`CF_EMAIL_API_TOKEN`（secret）。寄件網域、寄件地址與服務額度須先確認；有費用時先報價。未設後端時表單顯示失敗，不會假成功。正式預覽需實寄並核對收件、阻擋機器人與寄送限流；目前只通過模擬服務測試。
- Cloudflare WAF 尚須設定 `/api/contact` 限流（建議每 IP 每 10 分鐘最多 5 次）。未設定前不可宣稱已完成此項防護。

## 搜尋、隱私與正式切換

- 內容頁輸出 canonical、hreflang、JSON-LD 與 sitemap。`src/data/sitemap-lastmod.json` 使用內容指紋；內容變動後先建置，再執行 `npm run sitemap:stamp -- YYYY-MM-DD`（實際編輯日），重新建置與 `npm run sitemap:check`。庫存為靜態資訊，發布前須與商店重新比對。沒有經確認的 SKU、官方社群網址或評價，不補造結構化資料。
- 五語隱私頁揭露表單、Turnstile、免 Cookie 網站統計及 BombMy 外部講座。BombMy 的報名資料保存期限、與 IPPONGI 分享範圍尚待主辦方確認；頁面明示未確認，勿寫成確定。正式表單服務配置後再次對照實際資料流。
- 正式切換前確認 `PUBLIC_SITE_URL=https://ippongikyoto.com`、`PUBLIC_PREVIEW=0`，Cloudflare 規則移除 `x-robots-tag: none`；Search Console、Bing 驗證後提交 `sitemap-index.xml`。保留現有 AI 爬蟲封鎖決策。`_headers` 含 `includeSubDomains` HSTS，**只在商店子網域 HTTPS 正常後上線**；CSP 先以 Report-Only 觀察。
- 上線當天與後續兩週檢查 404、轉址、索引、表單與購買；30 天內追蹤舊網址 404 趨近 0。正式付款、外部報名與搜尋收錄不能由本機測試宣稱通過。
