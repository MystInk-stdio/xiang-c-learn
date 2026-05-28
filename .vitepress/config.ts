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
                { text: 'Prompt 基礎', link: '/zh/claude/beginner/prompt-basics' },
                { text: 'System Prompt', link: '/zh/claude/beginner/system-prompt' },
                { text: '角色設定', link: '/zh/claude/beginner/role-setting' },
              ],
            },
            {
              text: '進階篇',
              collapsed: true,
              items: [
                { text: '（更新中）', link: '/zh/claude/advanced/' },
              ],
            },
            {
              text: '實戰案例',
              collapsed: true,
              items: [
                { text: '（更新中）', link: '/zh/claude/case-studies/' },
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
