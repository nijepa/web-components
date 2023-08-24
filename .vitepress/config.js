import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "cadooz - WEB Components",
  description: "Vite & Vue3",
  base: '/Euronet-Cadooz/PrototypeWebComponentsVue/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/list' }
    ],

    sidebar: [
      {
        text: 'Components',
        items: [
          { text: 'MFA', link: '/packages/mfa/README' },
          { text: 'Search', link: '/packages/search-incentivemall/README' },
          { text: 'Account', link: '/packages/account-ebc/README' },
          { text: 'Toast', link: '/packages/toast/README' },
          { text: 'NewPassword', link: '/packages/new-password/README' }
        ]
      }
    ],
    
    lastUpdated: true,
    
    footer: {
      message: 'cadooz',
      copyright: 'Copyright © 2023'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
  }
})
