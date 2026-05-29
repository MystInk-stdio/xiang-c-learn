---
title: Site Publisher Agent 設計文件
date: 2026-05-30
status: approved
---

# Site Publisher Agent 設計文件

## 背景與目標

現有 VitePress 網站每次新增文章需手動操作三個地方（md 檔、config.ts sidebar、blog 列表頁），流程繁瑣。

目標：建立一個 Claude Code Subagent，讓彥翔只需在 Notion 填好文章、標記「Ready to Publish」，對 Claude 說「發布一下」，Agent 自動完成後續所有步驟並 push 上線。

---

## Notion 資料庫設計

### 資料庫名稱
`翔C 學習資源站 — 文章發布`

### Properties

| 欄位名稱 | 類型 | 說明 |
|---------|------|------|
| Title | title | 文章標題（中英皆可） |
| Status | select | `Draft` / `Ready to Publish` |
| 大分類 | select | 對應網站頂層分類（e.g. Claude、AI工具） |
| 小分類 | select | 大分類底下的子主題 |
| 封面圖 URL | url | 圖片外部連結（Imgur、GitHub raw 等），Agent 直接下載存到 `public/images/` |

### 正文
直接寫在 Notion Page body，支援標題、段落、程式碼塊、引用等 block 類型。

---

## Agent 規格

### 位置
`.claude/agents/site-publisher.md`

### 觸發方式
使用者說「發布一下」或「publish」

### 使用工具
- Notion MCP — 查詢資料庫、讀取 page 內容與封面圖
- Read / Write / Edit — 操作本地 md 檔和 config.ts
- Bash — 下載封面圖、git add / commit / push

---

## 發布流程（核心邏輯）

### Step 1：撈取待發布頁面
用 Notion MCP 查詢資料庫，篩選 `Status = Ready to Publish` 的所有 Pages。

### Step 2：逐頁處理

**2a. 讀取資料**
- Title、大分類、小分類、封面圖 URL、Page body（轉 Markdown）

**2b. 產生 Slug**
- 規則：全小寫，空格換 `-`
- 英文標題：直接 lowercase + hyphenate
- 中文標題：Agent 判斷語義，轉成對應英文 slug（全小寫）
- 範例：「Prompt 基礎入門」→ `prompt-basics`

**2c. 決定存放路徑**
```
zh/{大分類-slug}/{小分類-slug}/{slug}.md
```
- 大分類與小分類的資料夾名稱產生規則與文章 slug 相同：英文直接 lowercase + hyphenate，中文由 Agent 判斷語義轉英文 kebab-case（e.g. `AI工具` → `ai-tools`、`電商` → `ecommerce`）
- 若資料夾不存在，自動建立

**2d. 下載封面圖**
- 下載到 `public/images/{slug}-cover.{ext}`
- Notion 圖片 URL 有過期風險，必須下載至本地

**2e. 寫入 md 檔**
```markdown
---
title: 文章標題
date: YYYY-MM-DD
cover: /images/{slug}-cover.jpg
---

（正文內容）
```

**2f. 更新 config.ts sidebar**

Sidebar 使用 marker 標記插入點：
```ts
// [PUBLISHER:{大分類}]
{ text: '文章標題', link: '/zh/{大分類}/{小分類}/{slug}' },
// [/PUBLISHER:{大分類}]
```
- Agent 找到對應 marker，在結尾 marker 前插入新條目
- 若該大分類 marker 不存在，在 sidebar 陣列末尾新增完整 section

**2g. 更新 blog 列表頁**

`zh/blog/index.md` 使用 marker 標記插入區：
```markdown
<!-- [PUBLISHER:BLOG_LIST] -->
（新文章卡片插入此處，最新在最上方）
<!-- [/PUBLISHER:BLOG_LIST] -->
```
卡片格式：
```markdown
### [文章標題](/zh/{大分類}/{小分類}/{slug})
**{大分類} > {小分類}** · {YYYY-MM-DD}
```

### Step 3：Git commit & push
所有頁面處理完畢後，執行一次：
```bash
git add .
git commit -m "publish: {所有文章標題，逗號分隔}"
git push
```
Vercel 偵測到 push 後自動部署（約 1-2 分鐘）。

### Step 4：回報結果
在對話中列出本次成功發布的文章清單及各自的網址。

---

## 網站結構調整（前置工作）

實作前需對現有檔案做一次性修改：

1. **`config.ts`** — 在現有 sidebar 各 section 加上 marker 註解
2. **`zh/blog/index.md`** — 在文章列表區加上 marker 註解

這些是 one-time setup，之後 Agent 自動維護。

---

## 錯誤處理

| 情境 | 處理方式 |
|------|---------|
| Notion 頁面沒有封面圖 | 跳過封面圖欄位，不加 frontmatter cover |
| Slug 產生後與現有檔案衝突 | 加數字後綴（e.g. `prompt-basics-2`） |
| config.ts marker 找不到 | 新增對應大分類 section |
| git push 失敗 | 回報錯誤，不重試，請使用者手動處理 |

---

## 範圍外（Out of Scope）

- 發布後自動更新 Notion 狀態（未來版本再加）
- 排程自動發布（目前為手動觸發）
- 圖片壓縮最佳化
- 英文版（`/en/`）同步
