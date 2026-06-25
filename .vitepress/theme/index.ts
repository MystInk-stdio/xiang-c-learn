import { h } from 'vue'
import type { Theme } from 'vitepress'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ClaudeUIDemo from './components/ClaudeUIDemo.vue'
import DonateButton from './components/DonateButton.vue'
import ContactFooter from './components/ContactFooter.vue'
import ArticleToc from './components/ArticleToc.vue'
import StarfieldBackground from './components/StarfieldBackground.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    const { frontmatter } = useData()
    return h(DefaultTheme.Layout, null, {
      // 星辰動畫背景：僅在首頁(layout: home)顯示
      'layout-top': () =>
        frontmatter.value.layout === 'home' ? h(StarfieldBackground) : null,
      'nav-bar-content-after': () => h(DonateButton),
      'layout-bottom': () => h(ContactFooter),
      'doc-before': () => h(ArticleToc),
    })
  },
  enhanceApp({ app }) {
    app.component('ClaudeUIDemo', ClaudeUIDemo)
  }
} satisfies Theme
