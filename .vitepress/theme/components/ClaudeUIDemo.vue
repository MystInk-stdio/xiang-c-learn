<template>
  <Teleport v-if="mounted" to="body">
    <div
      v-show="tooltip.visible"
      class="c-float-tip"
      :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
    >
      <span class="cft-title">{{ tooltip.title }}</span>
      <span class="cft-desc">{{ tooltip.desc }}</span>
    </div>
  </Teleport>

  <div class="claude-demo">
    <div class="demo-hint">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.3">
        <circle cx="6" cy="6" r="5"/><line x1="6" y1="4.5" x2="6" y2="6"/><circle cx="6" cy="8" r=".55" fill="currentColor"/>
      </svg>
      Interactive demo — hover over any element to see its function
    </div>

    <div class="claude-layout">

      <!-- ══════════════ SIDEBAR ══════════════ -->
      <aside class="c-sidebar">

        <!-- Header -->
        <div class="c-sb-header">
          <div class="c-logo">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <!-- asterisk / sparkle shape -->
              <line x1="10" y1="2" x2="10" y2="18" stroke="#cc785c" stroke-width="2.2" stroke-linecap="round"/>
              <line x1="2.93" y1="6" x2="17.07" y2="14" stroke="#cc785c" stroke-width="2.2" stroke-linecap="round"/>
              <line x1="2.93" y1="14" x2="17.07" y2="6" stroke="#cc785c" stroke-width="2.2" stroke-linecap="round"/>
            </svg>
            <span class="c-logo-label">Claude</span>
          </div>
          <div class="c-sb-header-icons">
            <button class="c-icon-btn" v-bind="tip('Search', '在所有歷史對話中搜尋關鍵字，快速找到過去的討論')">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                <circle cx="6.5" cy="6.5" r="4.5"/><line x1="10" y1="10" x2="13.5" y2="13.5"/>
              </svg>
            </button>
            <button class="c-icon-btn" v-bind="tip('Toggle sidebar', '收合或展開左側欄，讓主要對話區更寬敞')">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
                <rect x="1.5" y="2.5" width="12" height="10" rx="1.5"/>
                <line x1="5.5" y1="2.5" x2="5.5" y2="12.5"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Nav items -->
        <nav class="c-nav">
          <button class="c-nav-item" v-bind="tip('New chat', '開啟全新對話，不繼承前一次的上下文與記憶')">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
              <line x1="7.5" y1="2" x2="7.5" y2="13"/><line x1="2" y1="7.5" x2="13" y2="7.5"/>
            </svg>
            New chat
          </button>

          <button class="c-nav-item" v-bind="tip('Chats', '查看所有歷史對話記錄，依時間排序')">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
              <path d="M2 3.5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5l-3 2V3.5z"/>
            </svg>
            Chats
          </button>

          <button class="c-nav-item" v-bind="tip('Projects', '建立專案資料夾，將相關對話整理在一起，並附加共用的說明文件')">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
              <path d="M1.5 4.5a1 1 0 0 1 1-1h3.5l1.5 2h5a1 1 0 0 1 1 1v5.5a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1V4.5z"/>
            </svg>
            Projects
          </button>

          <button class="c-nav-item" v-bind="tip('Artifacts', '查看 Claude 生成的所有文件、程式碼、圖表等可複用成果')">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
              <polygon points="7.5,1.5 13.5,5 13.5,10 7.5,13.5 1.5,10 1.5,5"/>
            </svg>
            Artifacts
          </button>

          <button class="c-nav-item" v-bind="tip('Customize', '查看與管理 Claude 的擴充能力：① Skills — 預建工作流程，讓 Claude 執行特定任務 ② Connectors — 串接外部資料來源（如 Google Drive、GitHub）③ Plugins — 第三方整合工具，擴充 Claude 的功能範圍')">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
              <path d="M7.5 2.5l1 2.5 2.5.5-1.8 1.7.4 2.8L7.5 9l-2.1 1 .4-2.8L4 5.5l2.5-.5 1-2.5z"/>
              <circle cx="7.5" cy="7.5" r="5.5"/>
            </svg>
            Customize
          </button>
        </nav>

        <!-- Products section -->
        <div class="c-sb-section">
          <div class="c-section-label">Products</div>

          <button class="c-nav-item" v-bind="tip('Code', '專為程式開發設計的 Claude 版本，提供更強的程式碼生成與除錯能力')">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="4.5,4 1.5,7.5 4.5,11"/><polyline points="10.5,4 13.5,7.5 10.5,11"/>
            </svg>
            Code
          </button>

          <button class="c-nav-item c-nav-item-beta" v-bind="tip('Design', '專為設計任務優化的 Claude 版本（Beta），可協助 UI/UX 與視覺設計決策')">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
              <path d="M7.5 2a3 3 0 0 0-3 3c0 1.2.7 2.2 1.7 2.7L5 11.5a1.5 1.5 0 0 0 1.5 1.5h2A1.5 1.5 0 0 0 10 11.5l-1.2-3.8A3 3 0 0 0 7.5 2z"/>
            </svg>
            Design
            <svg class="c-beta-icon" width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round">
              <path d="M6.5 1.5v2M6.5 9.5v2M1.5 6.5h2M9.5 6.5h2M3.3 3.3l1.4 1.4M8.3 8.3l1.4 1.4M3.3 9.7l1.4-1.4M8.3 4.7l1.4-1.4"/>
            </svg>
          </button>
        </div>

        <!-- Starred section -->
        <div class="c-sb-section c-starred">
          <div class="c-section-label">Starred</div>
          <button class="c-hist-item" v-bind="tip('Starred chat', '已加星號的對話，方便快速找到重要的討論')">行銷文案撰寫</button>
          <button class="c-hist-item" v-bind="tip('Starred chat', '已加星號的對話，方便快速找到重要的討論')">蝦皮玻璃貼膜商品文案排版指南</button>
          <button class="c-hist-item" v-bind="tip('Starred chat', '已加星號的對話，方便快速找到重要的討論')">商品毛利策略</button>
          <button class="c-hist-item" v-bind="tip('Starred chat', '已加星號的對話，方便快速找到重要的討論')">下一步指示</button>
          <button class="c-hist-item" v-bind="tip('Starred chat', '已加星號的對話，方便快速找到重要的討論')">蝦皮數據分析-商討方針與指引</button>
        </div>

        <!-- Footer -->
        <div class="c-sb-footer">
          <div class="c-user-row">
            <div class="c-avatar" v-bind="tip('Account', '查看帳號資訊、訂閱方案與 API 使用量')">羅</div>
            <div class="c-user-info">
              <span class="c-user-name">羅彥翔</span>
              <span class="c-user-plan">Pro plan</span>
            </div>
          </div>
          <div class="c-footer-actions">
            <button class="c-icon-btn" v-bind="tip('Download', '下載或匯出對話記錄、成果檔案')">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                <line x1="7" y1="2" x2="7" y2="9.5"/>
                <polyline points="4,7 7,10.5 10,7"/>
                <line x1="2.5" y1="12" x2="11.5" y2="12"/>
              </svg>
            </button>
            <button class="c-icon-btn" v-bind="tip('Upgrade / Settings', '升級訂閱方案，或進入帳號進階設定')">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                <polyline points="3,10 7,4 11,10"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      <!-- ══════════════ MAIN ══════════════ -->
      <main class="c-main">
        <div class="c-home">

          <!-- Greeting -->
          <div class="c-greeting">
            <svg class="c-asterisk" width="38" height="38" viewBox="0 0 38 38" fill="none">
              <line x1="19" y1="3" x2="19" y2="35" stroke="#cc785c" stroke-width="3.5" stroke-linecap="round"/>
              <line x1="4.57" y1="11" x2="33.43" y2="27" stroke="#cc785c" stroke-width="3.5" stroke-linecap="round"/>
              <line x1="4.57" y1="27" x2="33.43" y2="11" stroke="#cc785c" stroke-width="3.5" stroke-linecap="round"/>
            </svg>
            <h2 class="c-greeting-text">Afternoon, 羅彥翔</h2>
          </div>

          <!-- Input box -->
          <div class="c-input-card">
            <div class="c-input-area">
              <span class="c-input-placeholder">How can I help you today?</span>
              <div class="c-input-dot"></div>
            </div>
            <div class="c-input-bar">
              <button class="c-plus-btn" v-bind="tip('Add content', '上傳圖片、PDF、文件或程式碼檔案，讓 Claude 一起分析')">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                  <line x1="7" y1="2" x2="7" y2="12"/><line x1="2" y1="7" x2="12" y2="7"/>
                </svg>
              </button>
              <div class="c-input-bar-right">
                <button class="c-model-chip" v-bind="tip('Model & thinking level', '選擇 Claude 模型版本，以及思考深度（Low / Normal / High），影響回應速度與推理能力')">
                  Sonnet 4.6&nbsp;
                  <span class="c-model-level">Low</span>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                    <path d="M2 4l3.5 3.5L9 4"/>
                  </svg>
                </button>
                <button class="c-icon-btn" v-bind="tip('Voice input', '啟動麥克風，將語音即時辨識轉換為文字輸入')">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
                    <rect x="5" y="1.5" width="5" height="7.5" rx="2.5"/>
                    <path d="M2.5 7.5A5 5 0 0 0 12.5 7.5M7.5 12.5V14M5.5 14h4"/>
                  </svg>
                </button>
                <button class="c-icon-btn" v-bind="tip('Voice output', '讓 Claude 以語音朗讀回應內容，適合免手操作的情境')">
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
                    <line x1="1.5" y1="10.5" x2="1.5" y2="4.5"/>
                    <line x1="4" y1="12" x2="4" y2="3"/>
                    <line x1="6.5" y1="13" x2="6.5" y2="2"/>
                    <line x1="9" y1="12" x2="9" y2="3"/>
                    <line x1="11.5" y1="10.5" x2="11.5" y2="4.5"/>
                    <line x1="14" y1="8.5" x2="14" y2="6.5"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Quick action chips -->
          <div class="c-chips">
            <button class="c-chip" v-bind="tip('Write', '快速開始寫作任務——文案、郵件、文章、腳本等')">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
                <path d="M9.5 2.5a1.5 1.5 0 0 1 2.121 2.121L5 11.243 2 12l.757-3L9.5 2.5z"/>
              </svg>
              Write
            </button>
            <button class="c-chip" v-bind="tip('Learn', '開始學習或教學對話——請 Claude 解釋概念、回答問題')">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
                <path d="M1.5 4.5l6-2.5 6 2.5-6 2.5-6-2.5z"/>
                <path d="M1.5 4.5v5l6 2.5 6-2.5v-5"/>
                <line x1="13.5" y1="4.5" x2="13.5" y2="8.5"/>
              </svg>
              Learn
            </button>
            <button class="c-chip" v-bind="tip('Code', '開始程式碼任務——生成、除錯、重構或解釋程式碼')">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="4,3.5 1,7 4,10.5"/><polyline points="10,3.5 13,7 10,10.5"/>
              </svg>
              Code
            </button>
            <button class="c-chip" v-bind="tip('Life stuff', '詢問日常生活問題——食譜、旅行建議、決策參考等')">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
                <path d="M3.5 3h7v6a3.5 3.5 0 0 1-7 0V3z"/>
                <line x1="3.5" y1="3" x2="1.5" y2="3"/>
                <line x1="10.5" y1="3" x2="12.5" y2="5"/>
              </svg>
              Life stuff
            </button>
            <button class="c-chip" v-bind="tip('From Gmail', '連結 Gmail 帳號，讓 Claude 協助整理、回覆或分析郵件')">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke-linecap="round">
                <rect x="1" y="3" width="12" height="9" rx="1" stroke="currentColor" stroke-width="1.4"/>
                <path d="M1 4l6 4.5L13 4" stroke="currentColor" stroke-width="1.4"/>
                <path d="M5.5 7l-4.5 4" stroke="#EA4335" stroke-width="1.2"/>
                <path d="M8.5 7l4.5 4" stroke="#EA4335" stroke-width="1.2"/>
              </svg>
              From Gmail
            </button>
          </div>

        </div>
      </main>
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
.c-float-tip {
  position: fixed;
  z-index: 99999;
  pointer-events: none;
  max-width: 260px;
  padding: 8px 12px;
  background: #181828;
  border: 1px solid rgba(47, 128, 237, 0.35);
  border-top: 2px solid #2F80ED;
  border-radius: 8px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.55);
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.cft-title {
  font-size: 12px;
  font-weight: 600;
  color: #e8edf2;
  white-space: nowrap;
  font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
}
.cft-desc {
  font-size: 11.5px;
  color: #7a8fa8;
  line-height: 1.55;
  font-family: -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
}
</style>

<style scoped>
/* ─── Demo shell ─── */
.claude-demo {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  font-size: 14px;
  border-radius: 12px;
  overflow-x: auto;
  overflow-y: hidden;
  border: 1px solid rgba(255, 255, 255, 0.07);
  margin: 2rem 0;
  background: #1a1a1a;
}
.demo-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 7px 16px;
  background: rgba(47, 128, 237, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 11.5px;
  color: #5a7a9a;
  white-space: nowrap;
  min-width: 700px;
}

/* ─── Layout ─── */
.claude-layout {
  display: flex;
  height: 600px;
  min-width: 700px;
}

/* ─── Sidebar ─── */
.c-sidebar {
  width: 260px;
  flex-shrink: 0;
  background: #1a1a1a;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
}

.c-sb-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 12px 8px;
}
.c-logo {
  display: flex;
  align-items: center;
  gap: 8px;
}
.c-logo-label {
  font-size: 16px;
  font-weight: 600;
  color: #e8e8e8;
  letter-spacing: -0.015em;
}
.c-sb-header-icons {
  display: flex;
  gap: 2px;
}

/* Icon button base */
.c-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: #5a5a6e;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
  flex-shrink: 0;
}
.c-icon-btn:hover {
  background: rgba(255, 255, 255, 0.07);
  color: #c0c0d0;
}

/* Nav */
.c-nav {
  padding: 4px 8px;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.c-nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  border-radius: 7px;
  background: transparent;
  border: none;
  color: #9a9ab0;
  font-size: 13.5px;
  cursor: pointer;
  text-align: left;
  transition: background 0.12s, color 0.12s;
  white-space: nowrap;
}
.c-nav-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: #e0e0f0;
}
.c-nav-item svg {
  flex-shrink: 0;
  opacity: 0.7;
}
.c-nav-item:hover svg {
  opacity: 1;
}
.c-nav-item-beta {
  justify-content: space-between;
}
.c-beta-icon {
  color: #5a5a6e;
  flex-shrink: 0;
}

/* Sections */
.c-sb-section {
  padding: 10px 8px 4px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
}
.c-section-label {
  font-size: 11px;
  font-weight: 500;
  color: #4a4a60;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  padding: 0 10px 6px;
}
.c-starred {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.c-hist-item {
  width: 100%;
  text-align: left;
  padding: 6px 10px;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: #7a7a90;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.c-hist-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #c0c0d0;
}

/* Footer */
.c-sb-footer {
  margin-top: auto;
  padding: 10px 10px 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.c-user-row {
  display: flex;
  align-items: center;
  gap: 9px;
  cursor: pointer;
  padding: 3px 4px;
  border-radius: 6px;
  transition: background 0.12s;
}
.c-user-row:hover {
  background: rgba(255, 255, 255, 0.04);
}
.c-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2F80ED 0%, #1a5fbf 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
}
.c-user-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.c-user-name {
  font-size: 12.5px;
  color: #c0c0d0;
  font-weight: 500;
  line-height: 1;
}
.c-user-plan {
  font-size: 11px;
  color: #5a5a70;
  line-height: 1;
}
.c-footer-actions {
  display: flex;
  gap: 2px;
}

/* ─── Main ─── */
.c-main {
  flex: 1;
  background: #212121;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.c-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 640px;
  padding: 0 24px;
}

/* Greeting */
.c-greeting {
  display: flex;
  align-items: center;
  gap: 14px;
}
.c-asterisk {
  flex-shrink: 0;
}
.c-greeting-text {
  font-size: 28px;
  font-weight: 500;
  color: #e8e8e8;
  letter-spacing: -0.02em;
  margin: 0;
  line-height: 1.2;
}

/* Input card */
.c-input-card {
  width: 100%;
  background: #2c2c2c;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 14px 14px 10px;
  transition: border-color 0.15s;
}
.c-input-card:hover {
  border-color: rgba(255, 255, 255, 0.16);
}
.c-input-area {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 12px;
  min-height: 28px;
}
.c-input-placeholder {
  font-size: 15px;
  color: #4a4a60;
}
.c-input-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #2F80ED;
  flex-shrink: 0;
  margin-top: 4px;
  box-shadow: 0 0 6px rgba(47, 128, 237, 0.6);
}
.c-input-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.c-plus-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #8a8aa0;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
  flex-shrink: 0;
}
.c-plus-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #d0d0e0;
}
.c-input-bar-right {
  display: flex;
  align-items: center;
  gap: 4px;
}
.c-model-chip {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.09);
  color: #9a9ab0;
  font-size: 12.5px;
  cursor: pointer;
  transition: background 0.12s;
}
.c-model-chip:hover {
  background: rgba(255, 255, 255, 0.09);
}
.c-model-level {
  color: #6a8aaa;
  font-size: 12px;
}

/* Quick action chips */
.c-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}
.c-chip {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.09);
  color: #9a9ab0;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.12s, color 0.12s, border-color 0.12s;
}
.c-chip:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #d0d0e0;
  border-color: rgba(255, 255, 255, 0.15);
}
</style>
