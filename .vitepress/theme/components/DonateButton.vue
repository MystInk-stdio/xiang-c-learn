<script setup lang="ts">
import { ref } from 'vue'

// 移植自 Claude Design「Aurora Background」的「請我喝杯咖啡」按鈕。
// 等比縮小以塞進 nav bar，保留：蒸氣動畫、發光脈動、滑鼠跟隨金屬反光掃光、玻璃擬態。
// 連結沿用原斗內按鈕的 ECPay 收款頁。
const btn = ref<HTMLAnchorElement | null>(null)
const metal = ref<HTMLSpanElement | null>(null)

function onMove(e: PointerEvent) {
  const el = metal.value
  const b = btn.value
  if (!el || !b) return
  const r = b.getBoundingClientRect()
  const x = ((e.clientX - r.left) / r.width) * 100
  const y = ((e.clientY - r.top) / r.height) * 100
  el.style.background =
    `radial-gradient(120px circle at ${x}% ${y}%, ` +
    `rgba(228,232,238,0.95), rgba(176,182,192,0.82) 26%, ` +
    `rgba(108,115,128,0.7) 55%, rgba(58,64,76,0.6) 80%, rgba(38,43,54,0.55))`
  el.style.opacity = '1'
}

function onLeave() {
  if (metal.value) metal.value.style.opacity = '0'
}
</script>

<template>
  <a
    ref="btn"
    href="https://p.ecpay.com.tw/D249581"
    target="_blank"
    rel="noopener noreferrer"
    class="sx-coffee-btn"
    title="請我喝杯咖啡 — 支持持續創作"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <span ref="metal" class="sx-metal" aria-hidden="true"></span>

    <span class="sx-icon">
      <span class="sx-glow" aria-hidden="true"></span>
      <span class="sx-steam" aria-hidden="true">
        <span class="sx-puff"></span>
        <span class="sx-puff"></span>
        <span class="sx-puff"></span>
      </span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="sx-cup">
        <path d="M4 9.5h12v4.2a4.8 4.8 0 0 1-4.8 4.8H8.8A4.8 4.8 0 0 1 4 13.7V9.5Z" stroke="#cfeaff" stroke-width="1.5" stroke-linejoin="round" />
        <path d="M16 10.6h1.6a2.4 2.4 0 0 1 0 4.8H16" stroke="#cfeaff" stroke-width="1.5" stroke-linejoin="round" />
      </svg>
    </span>

    <span class="sx-text">
      <span class="sx-label">請我喝杯咖啡</span>
      <span class="sx-sub">SUPPORT THIS WORK</span>
    </span>
  </a>
</template>

<style scoped>
.sx-coffee-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-left: 12px;
  padding: 6px 16px 6px 9px;
  border-radius: 999px;
  border: 1px solid rgba(150, 200, 245, 0.18);
  background: rgba(10, 20, 34, 0.55);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow:
    0 10px 34px -16px rgba(20, 90, 160, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  text-decoration: none !important;
  white-space: nowrap;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.2, 0.7, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
}

.sx-coffee-btn:hover {
  transform: translateY(-2px);
  border-color: rgba(150, 210, 255, 0.5);
  box-shadow:
    0 14px 40px -12px rgba(40, 130, 210, 0.55),
    inset 0 0 0 1px rgba(150, 210, 255, 0.1);
}

/* 滑鼠跟隨的金屬反光掃光（background 由 JS 設定） */
.sx-metal {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  z-index: 0;
}

.sx-icon {
  position: relative;
  z-index: 1;
  display: inline-flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 38%, rgba(120, 195, 255, 0.22), rgba(120, 195, 255, 0.02) 70%);
}

.sx-glow {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(120, 200, 255, 0.45), transparent 65%);
  filter: blur(5px);
  opacity: 0.5;
  animation: sx-coffeeglow 4s ease-in-out infinite;
}

.sx-steam {
  position: absolute;
  top: -2px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  gap: 3px;
}

.sx-puff {
  display: block;
  width: 2px;
  height: 7px;
  border-radius: 2px;
  background: rgba(190, 225, 255, 0.7);
  animation: sx-steam 2.8s ease-in-out infinite;
}
.sx-puff:nth-child(2) { animation-delay: 0.9s; }
.sx-puff:nth-child(3) { animation-delay: 1.7s; }

.sx-cup {
  position: relative;
}

.sx-text {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.sx-label {
  font-size: 13px;
  font-weight: 500;
  color: #e9f5ff !important;
  letter-spacing: 0.02em;
  transition: color 0.3s ease;
}

.sx-sub {
  font-size: 9px;
  font-weight: 400;
  letter-spacing: 0.2em;
  color: rgba(165, 200, 232, 0.5);
  transition: color 0.3s ease;
}

/* hover 時金屬掃光浮現，文字/杯子轉深色以維持對比 */
.sx-coffee-btn:hover .sx-glow { opacity: 0.95; }
.sx-coffee-btn:hover .sx-label { color: #1a1f28 !important; }
.sx-coffee-btn:hover .sx-sub { color: rgba(40, 46, 58, 0.7); }
.sx-coffee-btn:hover .sx-cup path { stroke: #2a3038; }

@keyframes sx-steam {
  0%   { transform: translateY(0) scaleX(1);   opacity: 0; }
  18%  { opacity: 0.55; }
  70%  { opacity: 0.28; }
  100% { transform: translateY(-9px) scaleX(1.7); opacity: 0; }
}

@keyframes sx-coffeeglow {
  0%, 100% { opacity: 0.45; }
  50%      { opacity: 0.85; }
}

@media (prefers-reduced-motion: reduce) {
  .sx-glow, .sx-puff { animation: none; }
}
</style>
