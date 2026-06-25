<script setup lang="ts">
import { computed, ref } from 'vue'
import { onContentUpdated, useData } from 'vitepress'

interface TocItem {
  id: string
  text: string
  level: number // 2 = H2, 3 = H3
}

const { frontmatter } = useData()
// 用 frontmatter 的 title 當文章主標題，顯示在最上方
const title = computed(() => (frontmatter.value.title as string) || '')

const items = ref<TocItem[]>([])

function buildToc() {
  if (typeof document === 'undefined') return
  const headings = Array.from(
    document.querySelectorAll<HTMLElement>('.vp-doc h2[id], .vp-doc h3[id]')
  )
  items.value = headings.map((el) => {
    // 複製節點、移除 VitePress 自動加的錨點連結（.header-anchor），再取乾淨文字
    const clone = el.cloneNode(true) as HTMLElement
    clone.querySelector('.header-anchor')?.remove()
    return {
      id: el.id,
      text: clone.textContent?.trim() ?? '',
      level: Number(el.tagName.substring(1)),
    }
  })
}

onContentUpdated(buildToc)

function go(e: MouseEvent, id: string) {
  e.preventDefault()
  const target = document.getElementById(id)
  if (!target) return
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}
</script>

<template>
  <h1 v-if="title" class="xc-article-title">{{ title }}</h1>
  <nav v-if="items.length" class="xc-toc" aria-label="本文目錄">
    <div class="xc-toc-title">本文目錄</div>
    <ul class="xc-toc-list">
      <li
        v-for="item in items"
        :key="item.id"
        :class="['xc-toc-item', `xc-toc-l${item.level}`]"
      >
        <a :href="`#${item.id}`" @click="go($event, item.id)">{{ item.text }}</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.xc-article-title {
  margin: 8px 0 24px;
  padding: 0;
  font-size: 40px; /* 約為 H2(20px) 的 2 倍 */
  line-height: 1.25;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--vp-c-text-1);
  border: 0;
}

.xc-toc {
  margin: 24px 0 32px;
  padding: 18px 22px 20px;
  background: #0e2e4d;
  border: 1px solid rgba(47, 128, 237, 0.25);
  border-left: 2px solid #2f80ed;
  border-radius: 10px;
}

.xc-toc-title {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: #6b7280;
  text-transform: none;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(47, 128, 237, 0.2);
}

.xc-toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.xc-toc-item {
  margin: 0;
  padding: 0;
  line-height: 1.7;
}

.xc-toc-item a {
  display: inline-block;
  color: #9aa4b2;
  text-decoration: none;
  font-size: 14.5px;
  transition: color 0.2s ease;
}

.xc-toc-item a:hover {
  color: #2f80ed;
}

.xc-toc-l2 a {
  font-weight: 500;
}

.xc-toc-l2 a::before {
  content: '•';
  color: #2f80ed;
  margin-right: 8px;
}

.xc-toc-l3 {
  padding-left: 22px;
}

.xc-toc-l3 a {
  font-size: 13.5px;
  color: #7e8a99;
}

.xc-toc-l3 a::before {
  content: '◦';
  color: #6b7280;
  margin-right: 8px;
}

@media (prefers-reduced-motion: reduce) {
  .xc-toc-item a {
    transition: none;
  }
}
</style>
