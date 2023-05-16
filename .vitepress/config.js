import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "WEB Components - Vue",
  description: "Vite & Vue3",
  base: '/web-components/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'MFA', link: '/packages/mfa/README' },
          { text: 'Toast', link: '/packages/toast/README' },
          { text: 'Search', link: '/packages/search-incentivemall/README' },
          { text: 'Account', link: '/packages/account-ebc/README' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
