import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ClaudeUIDemo from './components/ClaudeUIDemo.vue'
import DonateButton from './components/DonateButton.vue'
import ContactFooter from './components/ContactFooter.vue'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-after': () => h(DonateButton),
      'layout-bottom': () => h(ContactFooter),
    })
  },
  enhanceApp({ app }) {
    app.component('ClaudeUIDemo', ClaudeUIDemo)
  }
} satisfies Theme
