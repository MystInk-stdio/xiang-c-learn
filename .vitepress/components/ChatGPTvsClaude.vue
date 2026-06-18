<script setup>
import { ref, computed } from 'vue'

// ---- 提示詞模板（複製用）----
const templateText = `我是一個在經營蝦皮的賣家，目前在賣手機保護貼。
我想要寫一篇吸引人的商品描述，讓訪客願意加入購物車。
字數控制在 150 字內，語氣輕鬆，不要太正式。
請用條列式輸出三個賣點，最後加一句行動呼籲。`

const copied = ref(false)
async function copyTemplate() {
  try {
    await navigator.clipboard.writeText(templateText)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch (e) {
    // clipboard 不可用時的後備：選取文字
    console.warn('clipboard unavailable', e)
  }
}

// ---- 測驗 ----
const questions = [
  {
    q: '下面哪個 Prompt 最有可能得到精準答案？',
    options: [
      '幫我寫文案',
      '幫我寫一篇 IG 貼文，主題是手機保護貼，受眾是上班族，語氣輕鬆，100 字內',
      '幫我寫一篇很好的文案，要很吸引人',
      '文案幫我寫一下，要專業',
    ],
    correct: 1,
    feedback: {
      ok: '✅ 正確！你給了平台、主題、受眾、語氣、字數，Claude 能精準對準你的需求。',
      fail: '❌ 這個問法太模糊，Claude 只能給通用答案，不是給你的答案。',
    },
  },
  {
    q: 'Claude 和 ChatGPT 最大的設計差異是？',
    options: [
      'Claude 比較貴，所以比較聰明',
      'ChatGPT 可以畫圖，Claude 不行',
      'Claude 更依賴你給的脈絡，你給的資訊越多越精準',
      '兩個其實完全一樣，只是公司不同',
    ],
    correct: 2,
    feedback: {
      ok: '✅ 正確！Claude 的設計核心就是「脈絡對準」，你給的背景越完整，回答越符合你的需求。',
      fail: '❌ 不太對。Claude 最大的特色是脈絡理解能力——你給的資訊越多，它越能給出針對你的答案。',
    },
  },
  {
    q: '以下哪個是「給定限制條件」的好例子？',
    options: [
      '幫我寫好一點',
      '不要太長',
      '字數 150 字內，不要用專業術語，結尾要有行動呼籲',
      '隨便你，只要好看就行',
    ],
    correct: 2,
    feedback: {
      ok: '✅ 正確！具體的限制（字數、風格、結構）讓 Claude 知道你的邊界在哪裡。',
      fail: '❌ 模糊的限制等於沒有限制。Claude 需要具體數字和條件才能幫你過濾輸出。',
    },
  },
]

const current = ref(0)
const score = ref(0)
const answered = ref(false)
const selected = ref(-1)
const finished = ref(false)

const q = computed(() => questions[current.value])
const isLast = computed(() => current.value === questions.length - 1)
const feedbackOk = computed(() => answered.value && selected.value === q.value.correct)

const scoreMsg = computed(() => {
  const msgs = [
    '還有進步空間，多練習給定背景和限制條件！',
    '不錯！再多注意格式和限制條件的細節。',
    '很好！你已經掌握精準提問的核心邏輯了 🎉',
  ]
  return msgs[score.value - 1] || msgs[0]
})

function answer(i) {
  if (answered.value) return
  answered.value = true
  selected.value = i
  if (i === q.value.correct) score.value++
}

function optClass(i) {
  if (!answered.value) return ''
  if (i === q.value.correct) return 'correct'
  if (i === selected.value) return 'wrong'
  return ''
}

function nextQuestion() {
  if (isLast.value) {
    finished.value = true
    return
  }
  current.value++
  answered.value = false
  selected.value = -1
}

function restartQuiz() {
  current.value = 0
  score.value = 0
  answered.value = false
  selected.value = -1
  finished.value = false
}
</script>

<template>
  <div class="cvc-root">
    <p class="kicker">工具教學 · Claude Chat</p>
    <h1 class="cvc-h1">你在跟哪種 AI 說話？<br />認識 Claude，用對才有效</h1>
    <p class="subtitle">給已經用過 ChatGPT、想進一步了解 Claude 的你</p>
    <hr />

    <p>如果你已經用過 ChatGPT，Claude 上手會很快。但有幾個關鍵差異，值得你花 3 分鐘搞清楚——因為它直接影響你能不能問出有用的答案。</p>

    <h2>Claude 和 ChatGPT，最大的差別在哪？</h2>
    <p>不是「哪個比較聰明」，而是設計方向不同。</p>

    <div class="compare-grid">
      <div class="compare-card">
        <div class="card-label">你比較熟悉的</div>
        <div class="card-name">ChatGPT</div>
        <ul>
          <li>回答傾向簡短直接</li>
          <li>預設廣泛受眾語氣</li>
          <li>有時會補充過多無關資訊</li>
          <li>使用者需要自己過濾</li>
        </ul>
      </div>
      <div class="compare-card highlight">
        <div class="card-label blue">你正在使用的</div>
        <div class="card-name">Claude</div>
        <ul>
          <li>回答跟著你給的脈絡走</li>
          <li>能模擬特定角色與語氣</li>
          <li>更擅長長文脈絡的推理</li>
          <li>你給越多資訊，越精準</li>
        </ul>
      </div>
    </div>

    <div class="callout">
      <strong>一句話理解：</strong>ChatGPT 像是搜尋引擎的升級版，Claude 更像是能跟你深度對話的顧問——但前提是你得先告訴它你的狀況。
    </div>

    <h2>為什麼你的問題常常得不到好答案？</h2>
    <p>不是 AI 不夠聰明，是你給的資訊不夠讓它「對準你」。看看下面的對比：</p>

    <div class="examples">
      <div class="ex-row">
        <div class="ex-card ex-bad">
          <div class="ex-label">❌ 模糊問法</div>
          幫我寫一篇產品介紹
        </div>
        <div class="ex-card ex-good">
          <div class="ex-label">✅ 精準問法</div>
          幫我寫一篇蝦皮商品描述，產品是 iPhone 鋼化保護貼，受眾是 25–35 歲上班族，主打耐摔與不影響觸控靈敏度，字數控制在 150 字內
        </div>
      </div>
      <div class="ex-row">
        <div class="ex-card ex-bad">
          <div class="ex-label">❌ 模糊問法</div>
          給我一些社群貼文靈感
        </div>
        <div class="ex-card ex-good">
          <div class="ex-label">✅ 精準問法</div>
          我在經營 IG，方向是電商創業分享，受眾是 20–30 歲想副業的年輕人，幫我出 3 個 Reels 開頭 Hook，語氣輕鬆不說教
        </div>
      </div>
    </div>

    <h2>問出好答案的提示詞模板</h2>
    <p>複製這個框架，填入你的狀況，就能大幅提升回答品質：</p>

    <div class="template-box">
      <div class="template-header">PROMPT 框架</div>
      <div class="template-row"><span class="template-tag">背景</span><span class="template-desc">我是＿＿，目前在做＿＿</span></div>
      <div class="template-row"><span class="template-tag">目標</span><span class="template-desc">我想要＿＿</span></div>
      <div class="template-row"><span class="template-tag">限制</span><span class="template-desc">字數／語氣／不要做的事：＿＿</span></div>
      <div class="template-row"><span class="template-tag">格式</span><span class="template-desc">請用＿＿的格式輸出（條列／腳本／表格）</span></div>

      <div class="template-text">{{ templateText }}</div>
      <button class="copy-btn" :class="{ copied }" @click="copyTemplate">
        {{ copied ? '✅ 已複製' : '📋 複製模板' }}
      </button>
    </div>

    <h2>小測驗：你的 Prompt 有多精準？</h2>
    <p>測試一下你現在的提問習慣，看看還有哪裡可以改進。</p>

    <div class="quiz-wrap">
      <template v-if="!finished">
        <div class="quiz-q">Q{{ current + 1 }} / {{ questions.length }}｜{{ q.q }}</div>
        <div class="quiz-options">
          <button
            v-for="(opt, i) in q.options"
            :key="i"
            class="quiz-opt"
            :class="optClass(i)"
            @click="answer(i)"
          >{{ opt }}</button>
        </div>
        <div v-if="answered" class="quiz-feedback show" :class="feedbackOk ? 'ok' : 'fail'">
          {{ feedbackOk ? q.feedback.ok : q.feedback.fail }}
        </div>
        <button v-if="answered" class="quiz-next show" @click="nextQuestion">
          {{ isLast ? '查看結果' : '下一題 →' }}
        </button>
      </template>

      <div v-else class="quiz-score show">
        <div class="score-num">{{ score }} / {{ questions.length }}</div>
        <div class="score-msg">{{ scoreMsg }}</div>
        <button class="quiz-restart" @click="restartQuiz">再測一次</button>
      </div>
    </div>

    <hr />
    <p class="cvc-footer">翔C 學習資源 · <a href="https://xiang-c-learn.vercel.app/zh/">xiang-c-learn.vercel.app</a></p>
  </div>
</template>

<style scoped>
.cvc-root {
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.8;
  font-size: 16px;
  color: var(--vp-c-text-1);
}
.cvc-root .kicker {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
  margin: 0 0 0.5rem;
}
.cvc-root .cvc-h1 {
  font-size: 28px;
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 0.5rem;
  letter-spacing: normal;
  border: none;
  padding: 0;
}
.cvc-root .subtitle {
  font-size: 15px;
  color: var(--vp-c-text-2);
  margin: 0 0 2rem;
}
.cvc-root hr {
  border: none;
  border-top: 1px solid var(--vp-c-divider);
  margin: 2rem 0;
}
.cvc-root h2 {
  font-size: 19px;
  font-weight: 600;
  margin: 2rem 0 0.75rem;
  padding: 0;
  border-top: none;
  letter-spacing: normal;
}
.cvc-root p {
  margin: 0 0 1rem;
  color: var(--vp-c-text-2);
}

/* 比較卡片 */
.compare-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1.5rem 0;
}
.compare-card {
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.25rem;
}
.compare-card.highlight {
  border-color: var(--vp-c-brand-1);
}
.card-label {
  font-size: 11px;
  color: var(--vp-c-text-3);
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}
.card-label.blue {
  color: var(--vp-c-brand-1);
}
.card-name {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--vp-c-text-1);
}
.compare-card ul {
  padding-left: 1.1rem;
  margin: 0;
  list-style: disc;
}
.compare-card li {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-bottom: 0.4rem;
}

/* Callout */
.callout {
  background: var(--vp-c-brand-soft);
  border-left: 3px solid var(--vp-c-brand-1);
  border-radius: 0 8px 8px 0;
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
  font-size: 15px;
  color: var(--vp-c-text-1);
}

/* 對比範例 */
.examples {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
}
.ex-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}
.ex-card {
  border-radius: 10px;
  padding: 1rem;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}
.ex-bad {
  background: var(--vp-c-red-soft);
  border: 1px solid var(--vp-c-red-2);
}
.ex-good {
  background: var(--vp-c-green-soft);
  border: 1px solid var(--vp-c-green-2);
}
.ex-label {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 0.4rem;
}
.ex-bad .ex-label {
  color: var(--vp-c-red-1);
}
.ex-good .ex-label {
  color: var(--vp-c-green-1);
}

/* 模板 */
.template-box {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
.template-header {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-3);
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}
.template-row {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}
.template-tag {
  background: var(--vp-c-brand-1);
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  white-space: nowrap;
  margin-top: 2px;
}
.template-desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
}
.template-text {
  font-family: var(--vp-font-family-mono, monospace);
  font-size: 13px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 0.75rem;
  line-height: 1.8;
  color: var(--vp-c-text-1);
  white-space: pre-wrap;
}

/* 複製按鈕 */
.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand-1);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.2s;
}
.copy-btn:hover {
  background: var(--vp-c-brand-2);
}
.copy-btn.copied {
  background: var(--vp-c-green-1);
}

/* 測驗 */
.quiz-wrap {
  margin: 2rem 0;
}
.quiz-q {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 1rem;
  color: var(--vp-c-text-1);
}
.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.quiz-opt {
  border: 1.5px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  background: var(--vp-c-bg);
  text-align: left;
  color: var(--vp-c-text-1);
}
.quiz-opt:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
.quiz-opt.correct {
  border-color: var(--vp-c-green-1);
  background: var(--vp-c-green-soft);
  color: var(--vp-c-green-1);
}
.quiz-opt.wrong {
  border-color: var(--vp-c-red-1);
  background: var(--vp-c-red-soft);
  color: var(--vp-c-red-1);
}
.quiz-feedback {
  margin-top: 0.75rem;
  font-size: 14px;
  padding: 0.75rem 1rem;
  border-radius: 8px;
}
.quiz-feedback.ok {
  background: var(--vp-c-green-soft);
  color: var(--vp-c-green-1);
}
.quiz-feedback.fail {
  background: var(--vp-c-red-soft);
  color: var(--vp-c-red-1);
}
.quiz-next {
  margin-top: 0.75rem;
  padding: 0.5rem 1.25rem;
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  display: inline-block;
}
.quiz-score {
  text-align: center;
  padding: 2rem;
  background: var(--vp-c-brand-soft);
  border-radius: 12px;
}
.score-num {
  font-size: 48px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
}
.score-msg {
  font-size: 16px;
  color: var(--vp-c-text-2);
  margin-top: 0.5rem;
}
.quiz-restart {
  margin-top: 1rem;
  padding: 0.5rem 1.25rem;
  background: var(--vp-c-brand-1);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
}

.cvc-footer {
  font-size: 14px;
  color: var(--vp-c-text-3);
  text-align: center;
}
.cvc-footer a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

@media (max-width: 600px) {
  .compare-grid,
  .ex-row {
    grid-template-columns: 1fr;
  }
  .cvc-root .cvc-h1 {
    font-size: 22px;
  }
}
</style>
