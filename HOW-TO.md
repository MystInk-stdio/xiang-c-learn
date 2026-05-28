# 翔C 學習資源站 — 操作說明書

> 這份文件說明如何維護與擴充網站。所有操作都在 `C:\AI-WORKSPACE\xiang-c-learn\` 目錄下進行。

---

## 目錄

1. [新增文章](#1-新增文章)
2. [新增工具分類](#2-新增工具分類)
3. [更新部落格列表](#3-更新部落格列表)
4. [修改側邊欄](#4-修改側邊欄)
5. [修改品牌主題顏色](#5-修改品牌主題顏色)
6. [新增英文翻譯](#6-新增英文翻譯)
7. [部署流程](#7-部署流程)
8. [刪除功能](#8-刪除功能)

---

## 1. 新增文章

### 步驟

**Step 1：建立 Markdown 檔案**

在對應目錄下新增 `.md` 檔，例如新增 Claude 入門篇文章：

```
zh/claude/beginner/new-topic.md
```

**Step 2：填入 frontmatter**

每篇文章開頭必須有這個格式：

```markdown
---
title: 文章標題
date: 2026-05-28
tags: [Claude, 入門]
description: 一句話摘要，會出現在部落格卡片上。
---

# 文章標題

內容從這裡開始...
```

**Step 3：加入側邊欄**

開啟 `.vitepress/config.ts`，在對應的 `items` 陣列加入一筆：

```typescript
{ text: '新文章標題', link: '/zh/claude/beginner/new-topic' },
```

範例（加在入門篇的 items 裡）：

```typescript
{
  text: '入門篇',
  collapsed: false,
  items: [
    { text: '導覽', link: '/zh/claude/beginner/' },
    { text: 'Prompt 基礎', link: '/zh/claude/beginner/prompt-basics' },
    { text: 'System Prompt', link: '/zh/claude/beginner/system-prompt' },
    { text: '角色設定', link: '/zh/claude/beginner/role-setting' },
    { text: '新文章標題', link: '/zh/claude/beginner/new-topic' }, // ← 加這裡
  ],
},
```

**Step 4：更新部落格列表**

開啟 `zh/blog/index.md`，在最上方**最新文章之前**複製貼上一個卡片區塊：

```html
<div style="border:1px solid var(--vp-c-brand-1);border-radius:8px;padding:20px;">
  <div style="font-size:12px;color:var(--vp-c-text-2);margin-bottom:8px;">2026-05-28 · Claude · 入門</div>
  <a href="/zh/claude/beginner/new-topic" style="font-size:18px;font-weight:bold;text-decoration:none;">新文章標題</a>
  <p style="margin-top:8px;color:var(--vp-c-text-2);">一句話摘要。</p>
</div>
```

**Step 5：推送部署**

```powershell
git add .
git commit -m "feat: add article '新文章標題'"
git push
```

Vercel 收到 push 後自動重新部署，約 1-2 分鐘上線。

---

## 2. 新增工具分類

例如新增 Canva 工具區塊。

**Step 1：建立目錄結構**

```powershell
mkdir zh\canva\beginner
mkdir zh\canva\advanced
mkdir zh\canva\case-studies
```

**Step 2：建立工具介紹頁 `zh/canva/index.md`**

```markdown
---
title: Canva 學習資源
---

# Canva

Canva 是...（工具介紹）

## 從這裡開始

- [入門篇](/zh/canva/beginner/)
```

**Step 3：建立各節 index 佔位頁**

```markdown
---
title: 入門篇
---

# 入門篇

內容持續新增中。
```

**Step 4：在 `config.ts` 加入新工具的 nav 與 sidebar**

Nav（加在現有 nav 陣列後面）：
```typescript
{ text: 'Canva', link: '/zh/canva/' },
```

Sidebar（在現有 sidebar 物件加一個新 key）：
```typescript
'/zh/canva/': [
  {
    text: 'Canva',
    items: [
      { text: '工具介紹', link: '/zh/canva/' },
      {
        text: '入門篇',
        collapsed: false,
        items: [
          { text: '導覽', link: '/zh/canva/beginner/' },
        ],
      },
    ],
  },
],
```

**Step 5：推送部署**

```powershell
git add .
git commit -m "feat: add Canva tool section"
git push
```

---

## 3. 更新部落格列表

部落格列表是手動維護的，在 `zh/blog/index.md` 裡。

**新增文章卡片：** 複製現有卡片區塊，貼在 `<div style="display:grid...">` 標籤的最上方（最新的放最前面），修改日期、連結、標題、摘要。

**刪除文章卡片：** 直接刪除對應的 `<div>` 區塊（從 `<div style="border:...">` 到對應的 `</div>`）。

---

## 4. 修改側邊欄

側邊欄設定全部在 `.vitepress/config.ts` 的 `themeConfig.sidebar`。

**新增章節（例如在進階篇加文章）：**

```typescript
{
  text: '進階篇',
  collapsed: true,
  items: [
    { text: '進階 Prompt 技巧', link: '/zh/claude/advanced/advanced-prompt' }, // ← 加這裡
  ],
},
```

**刪除側邊欄項目：** 直接刪除對應的 `{ text: '...', link: '...' }` 那一行。

**展開/摺疊預設狀態：**
- `collapsed: false` → 預設展開
- `collapsed: true` → 預設摺疊

---

## 5. 修改品牌主題顏色

開啟 `.vitepress/theme/custom.css`。

| 變數 | 用途 | 目前色碼 |
|------|------|---------|
| `--vp-c-bg` | 頁面背景 | `#0A2540` |
| `--vp-c-brand-1` | 主色（連結、邊框） | `#2F80ED` |
| `--vp-c-text-2` | 次要文字 | `#6B7280` |
| `.vp-doc strong` color | 粗體強調色 | `#FF6A00` |

直接修改色碼值，存檔後 push 即生效。

---

## 6. 新增英文翻譯

英文版目前為佔位狀態，要新增翻譯時：

**Step 1：在 `en/` 下建立對應的 `.md` 檔**

例如翻譯 Prompt 基礎：
```
en/claude/beginner/prompt-basics.md
```

**Step 2：加入英文 sidebar**

在 `config.ts` 的 `sidebar` 加入 `/en/claude/` 的設定（複製 `/zh/claude/` 的結構，把連結換成 `/en/...`）：

```typescript
'/en/claude/': [
  {
    text: 'Claude',
    items: [
      { text: 'Tool Overview', link: '/en/claude/' },
      {
        text: 'Beginner',
        collapsed: false,
        items: [
          { text: 'Prompt Basics', link: '/en/claude/beginner/prompt-basics' },
        ],
      },
    ],
  },
],
```

**Step 3：更新 nav 為 locale-aware（可選）**

當英文內容夠多時，將 nav 設定移至各 locale 的 `themeConfig` 下，讓中英文有各自的導覽。

---

## 7. 部署流程

**正常發布（新增或修改內容）：**

```powershell
git add .
git commit -m "描述你做了什麼"
git push
```

Push 後 Vercel 自動觸發部署，1-2 分鐘上線。不需要任何手動操作。

**緊急回滾：**

1. 至 [Vercel Dashboard](https://vercel.com) → 選擇 `xiang-c-learn`
2. 點 **Deployments** → 找到上一個正常版本
3. 點 **...** → **Promote to Production**

---

## 8. 刪除功能

**刪除一篇文章：**
1. 刪除對應的 `.md` 檔
2. 從 `config.ts` sidebar 移除那一筆
3. 從 `zh/blog/index.md` 移除那張卡片
4. `git add . && git commit -m "remove: 文章名稱" && git push`

**刪除一個工具分類：**
1. 刪除整個工具目錄（例如 `zh/canva/`）
2. 從 `config.ts` 的 `nav` 移除那個工具的連結
3. 從 `config.ts` 的 `sidebar` 移除 `/zh/canva/` 整個 key
4. `git add . && git commit -m "remove: Canva section" && git push`

**關閉語言切換（暫時只用中文）：**

在 `config.ts` 移除 `locales` 整個區塊，改為：
```typescript
lang: 'zh-TW',
```

**關閉搜尋：**

在 `config.ts` 的 `themeConfig` 移除或注解 `search: { provider: 'local' }` 這行。

---

## 專案資訊

| 項目 | 內容 |
|------|------|
| 本地路徑 | `C:\AI-WORKSPACE\xiang-c-learn\` |
| GitHub | `https://github.com/MystInk-stdio/xiang-c-learn` |
| 線上網址 | `https://xiang-c-learn.vercel.app` |
| 框架版本 | VitePress 1.6.4 |
| 部署平台 | Vercel（自動部署） |
