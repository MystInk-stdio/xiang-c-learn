import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '翔C 學習資源',
  description: 'AI 工具實戰學習資源，從電商到內容創作',
  appearance: 'dark',
  locales: {
    zh: {
      label: '中文',
      lang: 'zh-TW',
      link: '/zh/',
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
    },
  },
  themeConfig: {
    nav: [
      { text: 'Claude', link: '/zh/claude/' },
      { text: '部落格', link: '/zh/blog/' },
    ],
    sidebar: {},
    search: { provider: 'local' },
    socialLinks: [],
  },
})
