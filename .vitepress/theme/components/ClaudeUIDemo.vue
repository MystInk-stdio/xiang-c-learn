<template>
  <!-- Cursor-following tooltip — teleported to body so it's never clipped -->
  <Teleport v-if="mounted" to="body">
    <div
      v-show="tooltip.visible"
      class="c-floating-tooltip"
      :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
    >
      <span class="cft-title">{{ tooltip.title }}</span>
      <span class="cft-desc">{{ tooltip.desc }}</span>
    </div>
  </Teleport>

  <div class="claude-demo">
    <div class="demo-hint">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.3"><circle cx="6.5" cy="6.5" r="5.5"/><line x1="6.5" y1="5" x2="6.5" y2="6.5"/><circle cx="6.5" cy="8.5" r=".6" fill="currentColor"/></svg>
      互動演示 — 將游標移至任意按鈕查看功能說明
    </div>

    <div class="claude-ui">

      <!-- ═══════════════ SIDEBAR ═══════════════ -->
      <aside class="c-sidebar">
        <div class="c-sb-top">
          <div class="c-logo">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 2L19 6.5V15.5L11 20L3 15.5V6.5L11 2Z" stroke="#cc785c" stroke-width="1.4" fill="none"/>
              <path d="M11 6L16 8.75V13.25L11 16L6 13.25V8.75L11 6Z" fill="#cc785c" opacity="0.25"/>
            </svg>
            <span class="c-logo-text">Claude</span>
          </div>
          <button class="c-icon-btn"
            v-bind="tip('搜尋對話', '在所有歷史對話中搜尋關鍵字，快速找到過去的討論')">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.4">
              <circle cx="6.5" cy="6.5" r="4.5"/><line x1="9.9" y1="9.9" x2="13" y2="13"/>
            </svg>
          </button>
        </div>

        <button class="c-new-chat"
          v-bind="tip('新增對話', '開啟全新對話，不繼承前一次的上下文與記憶')">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.8">
            <line x1="6.5" y1="1" x2="6.5" y2="12"/><line x1="1" y1="6.5" x2="12" y2="6.5"/>
          </svg>
          新增對話
        </button>

        <nav class="c-history">
          <div class="c-hist-group">
            <div class="c-hist-date">今天</div>
            <button class="c-hist-item"
              v-bind="tip('切換對話', '點擊可切換至此段過去的對話')">AI 行銷策略分析</button>
            <button class="c-hist-item"
              v-bind="tip('切換對話', '點擊可切換至此段過去的對話')">蝦皮商品標題優化</button>
            <button class="c-hist-item c-hist-active"
              v-bind="tip('目前對話', '目前正在瀏覽的對話，已醒目標示')">電商轉換率提升方法</button>
          </div>
          <div class="c-hist-group">
            <div class="c-hist-date">昨天</div>
            <button class="c-hist-item"
              v-bind="tip('切換對話', '點擊可切換至此段過去的對話')">Prompt 工程學習筆記</button>
            <button class="c-hist-item"
              v-bind="tip('切換對話', '點擊可切換至此段過去的對話')">Threads 腳本自動生成</button>
          </div>
        </nav>

        <div class="c-sb-footer">
          <button class="c-icon-btn"
            v-bind="tip('設定', '管理帳號偏好、語言、介面主題、通知等個人設定')">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path fill-rule="evenodd" d="M8 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0-1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
              <path fill-rule="evenodd" d="M7.054 1.243a1 1 0 0 1 1.892 0l.286.858a5.47 5.47 0 0 1 1.58.912l.89-.214a1 1 0 0 1 1.136.686l.297.914a1 1 0 0 1-.48 1.198l-.777.41a5.48 5.48 0 0 1 0 1.986l.777.41a1 1 0 0 1 .48 1.198l-.297.914a1 1 0 0 1-1.136.686l-.89-.214a5.47 5.47 0 0 1-1.58.912l-.286.858a1 1 0 0 1-1.892 0l-.286-.858a5.47 5.47 0 0 1-1.58-.912l-.89.214a1 1 0 0 1-1.136-.686l-.297-.914a1 1 0 0 1 .48-1.198l.777-.41a5.48 5.48 0 0 1 0-1.986l-.777-.41a1 1 0 0 1-.48-1.198l.297-.914a1 1 0 0 1 1.136-.686l.89.214a5.47 5.47 0 0 1 1.58-.912l.286-.858zM8 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
            </svg>
          </button>
          <div class="c-user-avatar"
            v-bind="tip('帳號資訊', '查看訂閱方案、API 使用量與個人帳號設定')">翔</div>
        </div>
      </aside>

      <!-- ═══════════════ MAIN ═══════════════ -->
      <div class="c-main">

        <!-- Top bar -->
        <header class="c-topbar">
          <button class="c-model-pill"
            v-bind="tip('模型選擇', '切換 Claude 4 Sonnet / Opus / Haiku 等版本，各版本在速度、能力與價格上有差異')">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1.5L13.5 4.75V11.25L8 14.5L2.5 11.25V4.75L8 1.5Z" stroke="#cc785c" stroke-width="1.2"/>
            </svg>
            <span>claude-sonnet-4-5</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4">
              <path d="M2.5 4.5l3.5 3.5 3.5-3.5"/>
            </svg>
          </button>
          <div class="c-topbar-right">
            <button class="c-btn-ghost"
              v-bind="tip('分享對話', '產生公開連結，他人無需登入即可閱讀此段對話記錄')">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3">
                <circle cx="11" cy="2.5" r="1.5"/><circle cx="3" cy="7" r="1.5"/><circle cx="11" cy="11.5" r="1.5"/>
                <line x1="4.4" y1="7.8" x2="9.7" y2="3.2"/><line x1="4.4" y1="7" x2="9.7" y2="10.8"/>
              </svg>
              分享
            </button>
            <button class="c-icon-btn"
              v-bind="tip('更多選項', '重新命名對話、刪除對話、下載為 PDF 或 Markdown 等進階操作')">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
                <circle cx="7.5" cy="3" r="1.2"/><circle cx="7.5" cy="7.5" r="1.2"/><circle cx="7.5" cy="12" r="1.2"/>
              </svg>
            </button>
          </div>
        </header>

        <!-- Tab bar -->
        <div class="c-tab-bar">
          <button class="c-tab c-tab-active"
            v-bind="tip('Chat — 一般對話', '標準問答模式，適合日常提問、文字創作、翻譯、摘要等各類任務')">Chat</button>
          <button class="c-tab"
            v-bind="tip('Core Work — 核心工作', '針對長篇複雜任務優化，具備更強的任務執行與多步驟推理能力')">Core Work</button>
          <button class="c-tab"
            v-bind="tip('Code — 程式碼', '為軟體開發優化，提供精準的程式碼生成、重構、除錯與架構建議')">Code</button>
        </div>

        <!-- Messages -->
        <div class="c-messages">

          <div class="c-turn c-turn-user">
            <div class="c-user-bubble">
              如何用 AI 提升電商賣場的轉換率？
            </div>
          </div>

          <div class="c-turn c-turn-assistant">
            <div class="c-assistant-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1.5L15.5 5.25V12.75L9 16.5L2.5 12.75V5.25L9 1.5Z" stroke="#cc785c" stroke-width="1.2"/>
                <path d="M9 5.5L13 7.75V11.25L9 13.5L5 11.25V7.75L9 5.5Z" fill="#cc785c" opacity="0.2"/>
              </svg>
            </div>
            <div class="c-assistant-body">
              <div class="c-assistant-text">
                <p>提升電商轉換率，以下幾個 AI 可以直接切入的方向效果最明顯：</p>
                <ol>
                  <li><strong>商品標題 A/B 測試</strong> — 批量生成多版本標題，找出點擊率最高的組合</li>
                  <li><strong>評論語意分析</strong> — 分析買家差評關鍵字，找出商品描述的缺口</li>
                  <li><strong>競品定價監控</strong> — 自動爬取競品價格，搭配動態定價策略</li>
                </ol>
                <p>哪個方向想先深入？</p>
              </div>
              <div class="c-msg-actions">
                <button
                  v-bind="tip('複製回應', '將 Claude 的完整回答文字複製到剪貼簿')">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.3">
                    <rect x="4.5" y="4.5" width="7" height="7" rx="1"/><path d="M1.5 8.5V2a.5.5 0 0 1 .5-.5h6.5"/>
                  </svg>
                  複製
                </button>
                <button
                  v-bind="tip('重新生成', '要求 Claude 重新回答此問題，每次結果可能不同')">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.3">
                    <path d="M11.5 2A5.5 5.5 0 1 0 12 6.5"/><path d="M11.5 2v3.5H8"/>
                  </svg>
                  重試
                </button>
                <button class="c-action-icon"
                  v-bind="tip('正面評分', '告訴 Claude 這個回答有幫助，協助持續改善回應品質')">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3">
                    <path d="M4 9V6l2-5h1l.5 2.5L9 5h3.5L12 9H4zM4 9H2V13h2V9z"/>
                  </svg>
                </button>
                <button class="c-action-icon"
                  v-bind="tip('負面評分', '告訴 Claude 這個回答不符合需求，協助了解改進方向')">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3">
                    <path d="M10 5V8L8 13H7l-.5-2.5L5 9H1.5L2 5H10zM10 5h2V1h-2v4z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Input area -->
        <div class="c-input-wrap">
          <div class="c-input-box">
            <div class="c-input-placeholder">傳訊息給 Claude</div>
            <div class="c-input-footer">
              <div class="c-input-tools">
                <button
                  v-bind="tip('上傳檔案', '上傳圖片、PDF、Word 文件或程式碼，讓 Claude 一起分析處理')">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3">
                    <path d="M9 1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6L9 1z"/>
                    <path d="M9 1v5h5"/><line x1="5.5" y1="9.5" x2="10.5" y2="9.5"/>
                  </svg>
                </button>
                <button
                  v-bind="tip('延伸思考 (Extended Thinking)', '啟用後 Claude 會先進行內部深度推理再回應，處理複雜問題更準確，但速度較慢')">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3">
                    <circle cx="8" cy="8" r="6"/>
                    <path d="M8 5v3.5l2 1.5"/>
                  </svg>
                </button>
                <button
                  v-bind="tip('語音輸入', '啟動麥克風，將語音即時辨識轉換為文字輸入到對話框')">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.3">
                    <rect x="5.5" y="1" width="5" height="8.5" rx="2.5"/>
                    <path d="M2.5 8A5.5 5.5 0 0 0 13.5 8M8 13.5V15.5M5.5 15.5h5"/>
                  </svg>
                </button>
              </div>
              <button class="c-send-btn"
                v-bind="tip('傳送訊息', '送出輸入框內容，開始與 Claude 的對話')">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <line x1="7" y1="12" x2="7" y2="2"/><path d="M3 6l4-4 4 4"/>
                </svg>
              </button>
            </div>
          </div>
          <p class="c-disclaimer">Claude 可能會犯錯，請自行確認重要資訊。</p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'

const mounted = ref(false)
onMounted(() => { mounted.value = true })

const tooltip = reactive({ visible: false, x: 0, y: 0, title: '', desc: '' })

function tip(title: string, desc: string) {
  return {
    onMouseenter(e: MouseEvent) {
      tooltip.title = title
      tooltip.desc = desc
      tooltip.visible = true
      tooltip.x = e.clientX + 14
      tooltip.y = e.clientY + 10
    },
    onMousemove(e: MouseEvent) {
      tooltip.x = e.clientX + 14
      tooltip.y = e.clientY + 10
    },
    onMouseleave() {
      tooltip.visible = false
    }
  }
}
</script>

<style>
/* Tooltip — global because it's teleported outside scoped root */
.c-floating-tooltip {
  position: fixed;
  z-index: 99999;
  pointer-events: none;
  max-width: 240px;
  padding: 8px 12px;
  background: #1a1a2e;
  border: 1px solid rgba(47, 128, 237, 0.4);
  border-top: 2px solid #2F80ED;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.cft-title {
  font-size: 12px;
  font-weight: 600;
  color: #e8edf2;
  line-height: 1.4;
  white-space: nowrap;
}
.cft-desc {
  font-size: 11px;
  color: #8e9ab0;
  line-height: 1.5;
  white-space: normal;
}
</style>

<style scoped>
/* ───── Demo wrapper ───── */
.claude-demo {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  font-size: 14px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  margin: 2rem 0;
  background: #1c1c1c;
  overflow-x: auto;
}

.demo-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 7px 16px;
  background: rgba(47, 128, 237, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 11.5px;
  color: #6b8aad;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

/* ───── Layout ───── */
.claude-ui {
  display: flex;
  height: 620px;
  min-width: 780px;
}

/* ───── Sidebar ───── */
.c-sidebar {
  width: 256px;
  flex-shrink: 0;
  background: #171717;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  flex-direction: column;
  padding: 10px 8px 12px;
}

.c-sb-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 4px 10px;
}

.c-logo {
  display: flex;
  align-items: center;
  gap: 8px;
}
.c-logo-text {
  font-size: 15px;
  font-weight: 600;
  color: #ececec;
  letter-spacing: -0.01em;
}

.c-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: #8e8ea0;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.c-icon-btn:hover {
  background: rgba(255, 255, 255, 0.07);
  color: #ececec;
}

.c-new-chat {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #ececec;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s;
  margin-bottom: 12px;
}
.c-new-chat:hover {
  background: rgba(255, 255, 255, 0.09);
}

.c-history {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.c-history::-webkit-scrollbar { width: 4px; }
.c-history::-webkit-scrollbar-track { background: transparent; }
.c-history::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }

.c-hist-group { display: flex; flex-direction: column; gap: 1px; }
.c-hist-date {
  font-size: 11px;
  font-weight: 500;
  color: #5a5a6e;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 2px 10px 6px;
}
.c-hist-item {
  width: 100%;
  text-align: left;
  padding: 7px 10px;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: #9a9ab0;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.c-hist-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #d4d4e0;
}
.c-hist-active {
  background: rgba(255, 255, 255, 0.08) !important;
  color: #ececec !important;
}

.c-sb-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 4px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  margin-top: auto;
}
.c-user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2F80ED, #1a5fbf);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: opacity 0.15s;
}
.c-user-avatar:hover { opacity: 0.85; }

/* ───── Main area ───── */
.c-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #1c1c1c;
}

/* Top bar */
.c-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}
.c-model-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #c8c8d8;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s;
}
.c-model-pill:hover { background: rgba(255, 255, 255, 0.09); }
.c-topbar-right {
  display: flex;
  align-items: center;
  gap: 4px;
}
.c-btn-ghost {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  border-radius: 6px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #8e8ea0;
  font-size: 12.5px;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
}
.c-btn-ghost:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #d0d0e0;
}

/* Tab bar */
.c-tab-bar {
  display: flex;
  padding: 0 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
  gap: 0;
}
.c-tab {
  padding: 10px 14px;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: #6b6b80;
  font-size: 13.5px;
  cursor: pointer;
  transition: color 0.12s, border-color 0.12s;
  margin-bottom: -1px;
}
.c-tab:hover { color: #b0b0c4; }
.c-tab-active {
  color: #ececec;
  border-bottom-color: #ececec;
}

/* Messages */
.c-messages {
  flex: 1;
  overflow-y: auto;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.c-messages::-webkit-scrollbar { width: 5px; }
.c-messages::-webkit-scrollbar-track { background: transparent; }
.c-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius: 2px; }

.c-turn { display: flex; }
.c-turn-user { justify-content: flex-end; }
.c-user-bubble {
  max-width: 72%;
  background: #2f2f2f;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px 14px 4px 14px;
  padding: 10px 14px;
  color: #ececec;
  font-size: 14px;
  line-height: 1.55;
}

.c-turn-assistant {
  gap: 10px;
  align-items: flex-start;
}
.c-assistant-icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  background: rgba(204, 120, 92, 0.1);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
}
.c-assistant-body { flex: 1; min-width: 0; }
.c-assistant-text {
  color: #d8d8e8;
  font-size: 14px;
  line-height: 1.65;
}
.c-assistant-text p { margin: 0 0 10px; }
.c-assistant-text p:last-child { margin-bottom: 0; }
.c-assistant-text ol { padding-left: 20px; margin: 0 0 10px; }
.c-assistant-text li { margin: 5px 0; }
.c-assistant-text strong { color: #ececec; }

.c-msg-actions {
  display: flex;
  align-items: center;
  gap: 2px;
  margin-top: 10px;
  flex-wrap: wrap;
}
.c-msg-actions button {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  border-radius: 5px;
  background: transparent;
  border: none;
  color: #6b6b80;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
}
.c-msg-actions button:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #b0b0c4;
}
.c-action-icon {
  padding: 4px 6px !important;
}

/* Input */
.c-input-wrap {
  padding: 12px 16px 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  flex-shrink: 0;
}
.c-input-box {
  background: #2f2f2f;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 14px 8px;
  transition: border-color 0.15s;
}
.c-input-box:hover {
  border-color: rgba(255, 255, 255, 0.16);
}
.c-input-placeholder {
  color: #5a5a6e;
  font-size: 14px;
  padding-bottom: 10px;
  min-height: 24px;
}
.c-input-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.c-input-tools {
  display: flex;
  align-items: center;
  gap: 2px;
}
.c-input-tools button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: #6b6b80;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
}
.c-input-tools button:hover {
  background: rgba(255, 255, 255, 0.07);
  color: #c0c0d0;
}
.c-send-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: #ececec;
  border: none;
  color: #1c1c1c;
  cursor: pointer;
  transition: background 0.12s, opacity 0.12s;
}
.c-send-btn:hover { background: #ffffff; }

.c-disclaimer {
  text-align: center;
  font-size: 11px;
  color: #4a4a5e;
  margin: 7px 0 0;
}
</style>
