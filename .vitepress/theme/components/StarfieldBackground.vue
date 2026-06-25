<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// 移植自 Claude Design「Aurora Background」的「星辰」變體：
// 粒子星場 + 滑鼠鄰近連線。色相 205 對應品牌 Electric Blue。
const HUE = 205
const INTENSITY = 1

const canvasRef = ref<HTMLCanvasElement | null>(null)
let raf = 0
let onResize: (() => void) | null = null
let onMove: ((e: PointerEvent) => void) | null = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const mouse = { x: 0.5, y: 0.42 }
  const pos = { x: 0.5, y: 0.42 }
  let t = Math.random() * 100
  let W = 0
  let H = 0
  let stars: { x: number; y: number; z: number; r: number; tw: number }[] = []

  // 尊重「減少動態效果」偏好：關掉自主動畫（星點不自行閃爍/漂移），
  // 但仍保留滑鼠互動（使用者主動觸發的動態）。
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
  const motionStep = reduced ? 0 : 0.006

  const resize = () => {
    W = window.innerWidth
    H = window.innerHeight
    canvas.width = W * dpr
    canvas.height = H * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const n = Math.round((W * H) / 8500)
    stars = Array.from({ length: n }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.3 + Math.random() * 0.7,
      r: Math.random() * 1.2 + 0.35,
      tw: Math.random() * 6.28,
    }))
  }

  const vignette = () => {
    const vg = ctx.createRadialGradient(
      W / 2, H * 0.46, Math.min(W, H) * 0.3,
      W / 2, H / 2, Math.max(W, H) * 0.78
    )
    vg.addColorStop(0, 'rgba(4,7,14,0)')
    vg.addColorStop(1, 'rgba(2,4,9,0.78)')
    ctx.fillStyle = vg
    ctx.fillRect(0, 0, W, H)
  }

  const draw = () => {
    t += motionStep
    pos.x += (mouse.x - pos.x) * 0.05
    pos.y += (mouse.y - pos.y) * 0.05
    const I = INTENSITY
    const H0 = HUE

    ctx.globalCompositeOperation = 'source-over'
    ctx.fillStyle = '#04070e'
    ctx.fillRect(0, 0, W, H)

    const mx = pos.x * W
    const my = pos.y * H
    const R = Math.min(W, H) * 0.23

    ctx.globalCompositeOperation = 'lighter'
    const g = ctx.createRadialGradient(mx, my, 0, mx, my, R * 1.7)
    g.addColorStop(0, `hsla(${H0 + 8},85%,62%,${0.15 * I})`)
    g.addColorStop(1, `hsla(${H0 + 8},85%,62%,0)`)
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)

    const near: { px: number; py: number; d: number }[] = []
    for (const s of stars) {
      const px = s.x * W + (pos.x - 0.5) * 55 * s.z
      const py = s.y * H + (pos.y - 0.5) * 55 * s.z
      const tw = 0.5 + 0.5 * Math.sin(t * 1.5 + s.tw)
      const d = Math.hypot(px - mx, py - my)
      let a = 0.16 + 0.12 * tw
      if (d < R) {
        a += (1 - d / R) * 0.7
        near.push({ px, py, d })
      }
      ctx.beginPath()
      ctx.arc(px, py, s.r, 0, 6.2832)
      ctx.fillStyle = `hsla(${H0 + 10},70%,74%,${Math.min(a, 0.92) * I})`
      ctx.fill()
    }

    ctx.lineWidth = 0.6
    const L = R * 0.62
    for (let i = 0; i < near.length; i++) {
      for (let j = i + 1; j < near.length; j++) {
        const dx = near[i].px - near[j].px
        const dy = near[i].py - near[j].py
        const dd = Math.hypot(dx, dy)
        if (dd < L) {
          const a = (1 - dd / L) * 0.32 * (1 - near[i].d / R) * I
          ctx.strokeStyle = `hsla(${H0 + 16},80%,72%,${a})`
          ctx.beginPath()
          ctx.moveTo(near[i].px, near[i].py)
          ctx.lineTo(near[j].px, near[j].py)
          ctx.stroke()
        }
      }
    }

    ctx.globalCompositeOperation = 'source-over'
    vignette()
  }

  resize()
  onResize = () => resize()
  window.addEventListener('resize', onResize)
  onMove = (e: PointerEvent) => {
    mouse.x = e.clientX / window.innerWidth
    mouse.y = e.clientY / window.innerHeight
  }
  window.addEventListener('pointermove', onMove)

  const loop = () => {
    draw()
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  if (onResize) window.removeEventListener('resize', onResize)
  if (onMove) window.removeEventListener('pointermove', onMove)
})
</script>

<template>
  <canvas ref="canvasRef" class="xc-starfield" aria-hidden="true"></canvas>
</template>

<style scoped>
.xc-starfield {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 0;
  pointer-events: none;
}
</style>
