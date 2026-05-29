# Site Publisher Agent Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立一個 Claude Code Subagent，讓彥翔說「發布一下」後自動讀取 Notion 中 `Ready to Publish` 的文章，產生 VitePress md 檔、更新 sidebar 和 blog 列表，並 git push 上線。

**Architecture:** Notion MCP 讀取資料、Agent 操作本地 VitePress 檔案、Bash 執行 git。Sidebar 和 blog 列表使用 marker 註解標記插入點，Agent 靠 marker 定位後用 Edit 工具插入新條目。

**Tech Stack:** Claude Code Subagent (.md), Notion MCP, VitePress 1.6.4, Git, Vercel (auto-deploy on push)

---

## File Map

| 動作 | 路徑 | 說明 |
|------|------|------|
| CREATE | `C:\AI-WORKSPACE\.claude\agents\site-publisher.md` | Agent 主定義檔 |
| MODIFY | `xiang-c-learn/.vitepress/config.ts` | 加入 PUBLISHER marker 標記插入點 |
| MODIFY | `xiang-c-learn/zh/blog/index.md` | 加入 PUBLISHER:BLOG_LIST marker |

---

### Task 1: 在 config.ts 加入 sidebar 插入點 marker

**Files:**
- Modify: `xiang-c-learn/.vitepress/config.ts`

- [ ] **Step 1: 在 Claude 入門篇 items 加入 marker**

將 `config.ts` 的 Claude 入門篇 items 改成：

```ts
{
  text: '入門篇',
  collapsed: false,
  items: [
    { text: '導覽', link: '/zh/claude/beginner/' },
    // [PUBLISHER:claude/beginner]
    { text: 'Prompt 基礎', link: '/zh/claude/beginner/prompt-basics' },
    { text: 'System Prompt', link: '/zh/claude/beginner/system-prompt' },
    { text: '角色設定', link: '/zh/claude/beginner/role-setting' },
    // [/PUBLISHER:claude/beginner]
  ],
},
```

進階篇與實戰案例 items：

```ts
{
  text: '進階篇',
  collapsed: true,
  items: [
    // [PUBLISHER:claude/advanced]
    { text: '（更新中）', link: '/zh/claude/advanced/' },
    // [/PUBLISHER:claude/advanced]
  ],
},
{
  text: '實戰案例',
  collapsed: true,
  items: [
    // [PUBLISHER:claude/case-studies]
    { text: '（更新中）', link: '/zh/claude/case-studies/' },
    // [/PUBLISHER:claude/case-studies]
  ],
},
```

- [ ] **Step 2: 驗證 config.ts 語法正確**

```bash
cd C:\AI-WORKSPACE\xiang-c-learn && npx vitepress build --dry-run 2>&1 | head -20
```

若 vitepress 不支援 --dry-run，改用：
```bash
node -e "import('./xiang-c-learn/.vitepress/config.ts').then(()=>console.log('OK')).catch(e=>console.error(e))"
```

如果上面指令不可行，只需確認檔案沒有語法錯誤（marker 是 TS 註解，不影響執行）。

- [ ] **Step 3: Commit**

```bash
cd C:\AI-WORKSPACE\xiang-c-learn
git add .vitepress/config.ts
git commit -m "chore: add publisher markers to sidebar config"
```

---

### Task 2: 在 blog/index.md 加入列表插入點 marker

**Files:**
- Modify: `xiang-c-learn/zh/blog/index.md`

- [ ] **Step 1: 在第一張卡片上方加入 marker，底部加入關閉 marker**

將 `zh/blog/index.md` 改成：

```markdown
---
title: 最新文章
layout: page
---

# 最新文章

<div style="display:grid;gap:16px;margin-top:24px;">

<!-- [PUBLISHER:BLOG_LIST] -->
<div style="border:1px solid var(--vp-c-brand-1);border-radius:8px;padding:20px;">
  <div style="font-size:12px;color:var(--vp-c-text-2);margin-bottom:8px;">2026-05-28 · Claude · 入門</div>
  <a href="/zh/claude/beginner/role-setting" style="font-size:18px;font-weight:bold;text-decoration:none;">角色設定：讓 Claude 變成你的專屬助理</a>
  <p style="margin-top:8px;color:var(--vp-c-text-2);">透過角色設定，讓 Claude 在回覆風格、專業背景、輸出格式上完全符合你的需求。</p>
</div>

<div style="border:1px solid var(--vp-c-brand-1);border-radius:8px;padding:20px;">
  <div style="font-size:12px;color:var(--vp-c-text-2);margin-bottom:8px;">2026-05-28 · Claude · 入門</div>
  <a href="/zh/claude/beginner/system-prompt" style="font-size:18px;font-weight:bold;text-decoration:none;">System Prompt 設計指南</a>
  <p style="margin-top:8px;color:var(--vp-c-text-2);">System Prompt 是給 Claude 的「角色說明書」，設定好後每次對話都會生效。</p>
</div>

<div style="border:1px solid var(--vp-c-brand-1);border-radius:8px;padding:20px;">
  <div style="font-size:12px;color:var(--vp-c-text-2);margin-bottom:8px;">2026-05-28 · Claude · 入門</div>
  <a href="/zh/claude/beginner/prompt-basics" style="font-size:18px;font-weight:bold;text-decoration:none;">Prompt 基礎入門</a>
  <p style="margin-top:8px;color:var(--vp-c-text-2);">什麼是 Prompt？為什麼它決定了 Claude 的輸出品質？5 分鐘讀懂核心概念。</p>
</div>
<!-- [/PUBLISHER:BLOG_LIST] -->

</div>
```

（移除舊的 `---` 和手動說明文字）

- [ ] **Step 2: Commit**

```bash
cd C:\AI-WORKSPACE\xiang-c-learn
git add zh/blog/index.md
git commit -m "chore: add publisher marker to blog listing"
```

---

### Task 3: 建立 Notion 資料庫

**這是手動操作步驟（彥翔執行）：**

- [ ] **Step 1: 在 Notion 建立 Database**

  1. 在 Notion 新增一個 Full-page Database
  2. 命名：`翔C 學習資源站 — 文章發布`
  3. 加入以下 Properties：

  | 欄位名稱 | 類型 | 說明 |
  |---------|------|------|
  | Title | title（預設） | 文章標題 |
  | Status | Select | 選項：`Draft`（灰）、`Ready to Publish`（綠） |
  | 大分類 | Select | 例：`Claude`、`AI工具`、`電商` |
  | 小分類 | Select | 例：`入門篇`、`進階篇`、`實戰案例` |
  | 封面圖 | Files & media | 上傳封面圖檔 |

- [ ] **Step 2: 記下資料庫 ID**

  從 Notion 資料庫的 URL 複製 ID（32 碼 hex，格式：`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`）。Agent 會用 `notion-search` 找到它，但知道 ID 可以加速。

---

### Task 4: 建立 site-publisher Agent

**Files:**
- Create: `C:\AI-WORKSPACE\.claude\agents\site-publisher.md`

- [ ] **Step 1: 建立 agent 主檔**

寫入以下內容：

```markdown
---
name: site-publisher
description: 將 Notion 中標記 Ready to Publish 的文章發布到 xiang-c-learn VitePress 網站。觸發詞：「發布一下」或「publish」。
tools:
  - mcp__claude_ai_Notion__notion-search
  - mcp__claude_ai_Notion__notion-fetch
  - mcp__claude_ai_Notion__notion-update-page
  - Read
  - Write
  - Edit
  - Bash
---

# Site Publisher Agent

當使用者說「發布一下」或「publish」時執行以下完整流程。

## 常數

- 網站本地路徑：`C:\AI-WORKSPACE\xiang-c-learn\`
- 資料庫名稱：`翔C 學習資源站 — 文章發布`
- config.ts 路徑：`C:\AI-WORKSPACE\xiang-c-learn\.vitepress\config.ts`
- blog 列表路徑：`C:\AI-WORKSPACE\xiang-c-learn\zh\blog\index.md`
- 封面圖存放：`C:\AI-WORKSPACE\xiang-c-learn\public\images\`

## Slug 轉換規則

英文標題：lowercase + 空格換 `-` + 移除特殊符號
中文標題：判斷語義轉對應英文再 lowercase + hyphenate

常用對照：
- Claude → `claude`
- AI工具 / AI 工具 → `ai-tools`
- 電商 → `ecommerce`
- 創業 → `entrepreneurship`
- 入門篇 → `beginner`
- 進階篇 → `advanced`
- 實戰案例 → `case-studies`
- 心得報告 → `insights`

## Step 1：查詢待發布頁面

用 `notion-search` 搜尋 `翔C 學習資源站 — 文章發布`，找到資料庫後取得其 ID。

再用 `notion-fetch` 查詢該資料庫，filter 條件：
```
property: Status
select.equals: Ready to Publish
```

若無任何結果，回報「目前沒有待發布的文章」並停止。

## Step 2：逐頁處理

對每一個待發布頁面執行 2a～2h：

### 2a. 讀取 Properties

用 `notion-fetch` 取得頁面詳情，提取：
- `Title`（title property）
- `大分類`（select property）
- `小分類`（select property）
- `封面圖`（files property，取第一個 file 的 url）

### 2b. 讀取正文

用 `notion-fetch` 取得頁面的 blocks，將 Notion block 轉成 Markdown：

| Notion block type | Markdown |
|-------------------|----------|
| heading_1 | `# text` |
| heading_2 | `## text` |
| heading_3 | `### text` |
| paragraph | `text\n` |
| bulleted_list_item | `- text` |
| numbered_list_item | `1. text` |
| code | ` ```language\ncode\n``` ` |
| quote | `> text` |
| divider | `---` |
| image | `![alt](url)` |

### 2c. 產生 Slug

依照 Slug 轉換規則，對文章 Title 產生 article-slug。
同樣對大分類、小分類各產生一個 slug。

範例：
- Title「Prompt 基礎入門」→ `prompt-basics`
- 大分類「Claude」→ `claude`
- 小分類「入門篇」→ `beginner`

### 2d. 決定檔案路徑

```
目標路徑：C:\AI-WORKSPACE\xiang-c-learn\zh\{大分類-slug}\{小分類-slug}\{article-slug}.md
```

若目標路徑已存在同名檔案，加數字後綴（e.g. `prompt-basics-2.md`）。

### 2e. 下載封面圖（如有）

若頁面有封面圖：
```bash
# Windows PowerShell
Invoke-WebRequest -Uri "{封面圖 URL}" -OutFile "C:\AI-WORKSPACE\xiang-c-learn\public\images\{article-slug}-cover.{副檔名}"
```

副檔名從 URL 判斷（jpg/png/webp），預設 jpg。

若下載失敗，略過封面圖，不加 frontmatter cover 欄位。

### 2f. 寫入 md 檔

先用 Bash 建立資料夾（若不存在）：
```bash
New-Item -ItemType Directory -Force "C:\AI-WORKSPACE\xiang-c-learn\zh\{大分類-slug}\{小分類-slug}"
```

用 Write 工具建立 md 檔，格式：

```markdown
---
title: {文章標題}
date: {今日日期 YYYY-MM-DD}
cover: /images/{article-slug}-cover.jpg
---

{正文 Markdown}
```

若無封面圖，frontmatter 不含 cover 欄位。

### 2g. 更新 config.ts sidebar

讀取 `config.ts`，尋找 `// [PUBLISHER:{大分類-slug}/{小分類-slug}]` marker。

**情況 A：找到 marker**
在 `// [/PUBLISHER:{大分類-slug}/{小分類-slug}]` 前插入：
```ts
    { text: '{文章標題}', link: '/zh/{大分類-slug}/{小分類-slug}/{article-slug}' },
```

**情況 B：找不到對應小分類 marker，但找得到大分類 sidebar key**
在對應的大分類 sidebar section 末尾（最後一個 `}` 的 items array 關閉前）新增整個小分類 section：
```ts
        {
          text: '{小分類原始名稱}',
          collapsed: false,
          items: [
            // [PUBLISHER:{大分類-slug}/{小分類-slug}]
            { text: '{文章標題}', link: '/zh/{大分類-slug}/{小分類-slug}/{article-slug}' },
            // [/PUBLISHER:{大分類-slug}/{小分類-slug}]
          ],
        },
```

**情況 C：大分類也找不到**
在 sidebar 物件末尾新增完整 key，同時在 nav 陣列加入導航連結：
```ts
      '/zh/{大分類-slug}/': [
        {
          text: '{大分類原始名稱}',
          items: [
            {
              text: '{小分類原始名稱}',
              collapsed: false,
              items: [
                // [PUBLISHER:{大分類-slug}/{小分類-slug}]
                { text: '{文章標題}', link: '/zh/{大分類-slug}/{小分類-slug}/{article-slug}' },
                // [/PUBLISHER:{大分類-slug}/{小分類-slug}]
              ],
            },
          ],
        },
      ],
```

### 2h. 更新 blog/index.md

在 `<!-- [PUBLISHER:BLOG_LIST] -->` 和第一張卡片之間插入新卡片（最新的在最上方）：

```html
<div style="border:1px solid var(--vp-c-brand-1);border-radius:8px;padding:20px;">
  <div style="font-size:12px;color:var(--vp-c-text-2);margin-bottom:8px;">{YYYY-MM-DD} · {大分類原始名稱} · {小分類原始名稱}</div>
  <a href="/zh/{大分類-slug}/{小分類-slug}/{article-slug}" style="font-size:18px;font-weight:bold;text-decoration:none;">{文章標題}</a>
</div>

```

## Step 3：Git commit & push

所有頁面處理完畢後執行：

```bash
cd C:\AI-WORKSPACE\xiang-c-learn
git add .
git commit -m "publish: {所有文章標題，逗號分隔}"
git push
```

## Step 4：回報結果

在對話中列出：

```
✅ 本次發布成功 {N} 篇：

1. {文章標題}
   路徑：/zh/{大分類-slug}/{小分類-slug}/{article-slug}
   網址：https://xiang-c-learn.vercel.app/zh/{大分類-slug}/{小分類-slug}/{article-slug}

Vercel 約 1-2 分鐘後自動上線。
```

若有任何頁面處理失敗，列出失敗原因後繼續處理其他頁面，最後統一回報。
```

- [ ] **Step 2: 驗證 agent 檔案存在**

```bash
Test-Path "C:\AI-WORKSPACE\.claude\agents\site-publisher.md"
```

Expected: `True`

- [ ] **Step 3: Commit**

```bash
cd C:\AI-WORKSPACE\xiang-c-learn
git add .
git commit -m "feat: add site-publisher agent"
```

---

### Task 5: 端對端驗收測試

**這是手動驗收步驟，驗證整個流程可正常執行。**

- [ ] **Step 1: 在 Notion 建立測試文章**

在 `翔C 學習資源站 — 文章發布` 資料庫新增一頁：
- Title：`Test Article`
- Status：`Ready to Publish`
- 大分類：`Claude`
- 小分類：`入門篇`
- 封面圖：上傳任意一張圖片
- 正文：寫幾行測試文字

- [ ] **Step 2: 觸發 Agent**

在 Claude Code 說：「發布一下」

- [ ] **Step 3: 驗證檔案產生**

```bash
Test-Path "C:\AI-WORKSPACE\xiang-c-learn\zh\claude\beginner\test-article.md"
```

Expected: `True`

```bash
Get-Content "C:\AI-WORKSPACE\xiang-c-learn\zh\claude\beginner\test-article.md" | Select-Object -First 10
```

Expected: frontmatter 含 title、date、cover（如有封面圖）

- [ ] **Step 4: 驗證 config.ts 已更新**

```bash
Select-String -Pattern "test-article" "C:\AI-WORKSPACE\xiang-c-learn\.vitepress\config.ts"
```

Expected: 找到包含 `test-article` 的一行

- [ ] **Step 5: 驗證 blog/index.md 已更新**

```bash
Select-String -Pattern "test-article" "C:\AI-WORKSPACE\xiang-c-learn\zh\blog\index.md"
```

Expected: 找到包含 `test-article` 的一行

- [ ] **Step 6: 確認 Vercel 部署成功**

等待約 2 分鐘後，用瀏覽器開啟：
```
https://xiang-c-learn.vercel.app/zh/claude/beginner/test-article
```

Expected: 文章頁面正常顯示

- [ ] **Step 7: 清理測試文章（可選）**

若不想保留測試文章：
```bash
cd C:\AI-WORKSPACE\xiang-c-learn
Remove-Item zh\claude\beginner\test-article.md
# 手動從 config.ts 和 blog/index.md 移除對應條目
git add .
git commit -m "chore: remove test article"
git push
```
