const sidebar = require('./sidebar')

module.exports = {
  title: '개발자 황준일',
  description: 'Today I leanred',
  themeConfig: {
    logo: 'https://avatars1.githubusercontent.com/u/18749057?s=460&v=4',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Repository', link: 'https://github.com/junilhwang/TIL/' },
    ],
    sidebar,
    lastUpdated: 'Last Updated',
    smoothScroll: true
  },
  base: '/TIL/',
  head: [
    ['meta', { name: "google-site-verification", content: "sHfBWIoCUOYFXJ3b0ulN8jp9jpD8SEW5Wpxvlk-UABA" }]
  ],
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-plantuml'))
      md.use(require('markdown-it-underline'))
      md.use(require('markdown-it-task-lists'))
    }
  },
  plugins: [
    ['@vuepress/pwa', { serviceWorker: true, updatePopup: true }],
    ['feed', { canonical_base: 'https://junilhwang.github.io/TIL/' }],
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-113171398-2'
      }
    ]
  ]
}
