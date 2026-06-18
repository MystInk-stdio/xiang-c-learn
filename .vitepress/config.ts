import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '翔C 學習資源',
  description: 'AI 工具實戰學習資源，從電商到內容創作',
  appearance: 'dark',
  cleanUrls: true,
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
    sidebar: {
      '/zh/claude/': [
        {
          text: 'Claude',
          items: [
            { text: '工具介紹', link: '/zh/claude/' },
            {
              text: '入門篇',
              collapsed: false,
              items: [
                { text: '導覽', link: '/zh/claude/beginner/' },
                // [PUBLISHER:claude/beginner]
                { text: 'ChatGPT vs Claude：用對 AI 才有效', link: '/zh/claude/beginner/chatgpt-vs-claude' },
                { text: 'Claude 提示詞框架：6 個維度讓 AI 真正幫你解決問題', link: '/zh/claude/beginner/claude-prompt-framework-6-dimensions' },
                { text: 'Prompt 基礎', link: '/zh/claude/beginner/prompt-basics' },
                { text: 'System Prompt', link: '/zh/claude/beginner/system-prompt' },
                { text: '角色設定', link: '/zh/claude/beginner/role-setting' },
                { text: 'Claude 介紹', link: '/zh/claude/beginner/claude-introduction' },
                // [/PUBLISHER:claude/beginner]
              ],
            },
            {
              text: '進階篇',
              collapsed: true,
              items: [
                // [PUBLISHER:claude/advanced]
                { text: '（更新中）', link: '/zh/claude/advanced/' },
                // [/PUBLISHER:claude/advanced]
              ],
            },
            {
              text: '實戰案例',
              collapsed: true,
              items: [
                // [PUBLISHER:claude/case-studies]
                { text: '（更新中）', link: '/zh/claude/case-studies/' },
                // [/PUBLISHER:claude/case-studies]
              ],
            },
            {
              text: '介紹',
              collapsed: false,
              items: [
                // [PUBLISHER:claude/introduction]
                { text: '最強 AI——Claude 背景歷史', link: '/zh/claude/introduction/claude-history' },
                { text: 'Claude 介面功能解析', link: '/zh/claude/introduction/claude-ui-guide' },
                // [/PUBLISHER:claude/introduction]
              ],
            },
          ],
        },
      ],
    },
    search: { provider: 'local' },
    socialLinks: [],
  },
})
