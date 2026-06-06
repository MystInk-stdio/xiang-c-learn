# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```powershell
npm run dev       # local dev server (http://localhost:5173)
npm run build     # production build → .vitepress/dist/
npm run preview   # preview built site
```

No test suite. Verify changes by running `npm run build` — VitePress will error on broken links or bad frontmatter.

## Architecture

VitePress 1.6.4 static site. Root `/` redirects to `/zh/` (Vercel). Content is in `zh/` (primary, Traditional Chinese) and `en/` (placeholder). The site is always forced dark (`appearance: 'dark'` in config).

**Theme layer** (`.vitepress/theme/`):
- `custom.css` — brand color overrides for dark mode. Brand palette: bg `#0A2540`, brand `#2F80ED`, strong text `#FF6A00`.
- `index.ts` — extends DefaultTheme, registers the `<ClaudeUIDemo>` global Vue component.
- `components/ClaudeUIDemo.vue` — self-contained interactive mock of the Claude UI with hover tooltips. All styles are scoped; the float tooltip uses an unscoped class `.c-float-tip` intentionally (renders in a Teleport).

**Sidebar is manually maintained** in `.vitepress/config.ts`. It is keyed by URL prefix (e.g., `/zh/claude/`). The file contains `[PUBLISHER:section]` / `[/PUBLISHER:section]` comment markers — the `site-publisher` agent inserts new sidebar entries between these markers automatically. Do not remove or reformat these markers.

**Blog list** (`zh/blog/index.md`) is a raw HTML grid of card `<div>` elements, newest first. It uses `<!-- [PUBLISHER:BLOG_LIST] -->` / `<!-- [/PUBLISHER:BLOG_LIST] -->` markers for the same auto-insertion. Cards follow this structure:

```html
<div style="border:1px solid var(--vp-c-brand-1);border-radius:8px;padding:20px;">
  <div style="font-size:12px;color:var(--vp-c-text-2);margin-bottom:8px;">YYYY-MM-DD · Tool · Category</div>
  <a href="/zh/..." style="font-size:18px;font-weight:bold;text-decoration:none;">Article Title</a>
  <p style="margin-top:8px;color:var(--vp-c-text-2);">One-line summary.</p>
</div>
```

## Article Frontmatter

Every `.md` article must have:

```yaml
---
title: 文章標題
date: 2026-05-28
tags: [Claude, 入門]
description: 一句話摘要（顯示在部落格卡片）
---
```

## Adding Content

New articles go in `zh/<tool>/<section>/<slug>.md`. After creating the file:
1. Add a sidebar entry in `config.ts` under the matching `[PUBLISHER:...]` block.
2. Add a blog card in `zh/blog/index.md` inside the `[PUBLISHER:BLOG_LIST]` block.
3. `git add . && git commit -m "feat: ..." && git push` — Vercel auto-deploys in ~1–2 min.

Adding a new tool section requires: new directory under `zh/`, a `nav` entry, and a new sidebar key in `config.ts`.

## Deployment

Vercel auto-deploys on every push to the default branch. No manual step needed. Emergency rollback: Vercel Dashboard → Deployments → promote an older deployment.

GitHub: `MystInk-stdio/xiang-c-learn`
Live: `https://xiang-c-learn.vercel.app`

A `claude.yml` GitHub Actions workflow enables `@claude` mentions in issues and PRs to trigger Claude Code.
