---
title: System Prompt 設計指南
date: 2026-05-28
tags: [Claude, 入門]
description: System Prompt 是給 Claude 的「角色說明書」，設定好後每次對話都會生效。
---

# System Prompt 設計指南

**System Prompt** 是在對話開始前預設的指令，讓 Claude 在整個對話過程中維持特定行為。

## 和普通 Prompt 的差別

| | 普通 Prompt | System Prompt |
|--|--|--|
| 生效範圍 | 單次回覆 | 整個對話 |
| 設定位置 | 對話框 | 系統欄位（API 或進階設定）|
| 適合用途 | 單次任務 | 角色、語氣、格式設定 |

## System Prompt 的基本結構

```
你是一個[角色]。
你的任務是[核心職責]。
回覆時請遵守：
- [規則 1]
- [規則 2]
語氣：[風格描述]
```

## 實際範例：電商文案助理

```
你是一個台灣電商文案專家。
你的任務是根據商品資訊，產出蝦皮商品標題和賣點描述。
回覆時請遵守：
- 標題不超過 30 字
- 加入 1-2 個關鍵字（防爆、指紋辨識、氣囊防摔等）
- 語氣活潑，適合年輕消費者
輸出格式：標題（30字內）+ 三點賣點（每點 15 字內）
```

---

*上一篇：[Prompt 基礎入門](/zh/claude/beginner/prompt-basics)*  
*下一篇：[角色設定 — 讓 Claude 變成你的專屬助理](/zh/claude/beginner/role-setting)*
