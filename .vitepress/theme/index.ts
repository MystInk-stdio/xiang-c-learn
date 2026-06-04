import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import ClaudeUIDemo from './components/ClaudeUIDemo.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ClaudeUIDemo', ClaudeUIDemo)
  }
} satisfies Theme
