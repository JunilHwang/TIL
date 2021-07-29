const sidebar = require('./sidebar');

module.exports = {
  title: '개발자 황준일',
  description: 'Today I leanred',
  themeConfig: {
    logo: 'https://avatars1.githubusercontent.com/u/18749057?s=460&v=4',
    nav: [
      {text: 'Home', link: '/'},
      {text: 'Repository', link: 'https://github.com/junilhwang/TIL/'},
    ],
    sidebar,
    lastUpdated: 'Last Updated',
    smoothScroll: true
  },
  base: '/TIL/',
  head: [
    ['meta', {name: "google-site-verification", content: "sHfBWIoCUOYFXJ3b0ulN8jp9jpD8SEW5Wpxvlk-UABA"}],
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/assets/favicons/apple-touch-icon.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/favicons/favicon-32x32.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/assets/favicons/favicon-16x16.png"}],
    ['link', { rel: "manifest", href: "/assets/favicons/site.webmanifest"}],
    ['link', { rel: "mask-icon", href: "/assets/favicons/safari-pinned-tab.svg", color: "#3a0839"}],
    ['link', { rel: "shortcut icon", href: "/assets/favicons/favicon.ico"}],
    ['meta', { name: "msapplication-TileColor", content: "#3a0839"}],
    ['meta', { name: "msapplication-config", content: "/assets/favicons/browserconfig.xml"}],
    ['meta', { name: "theme-color", content: "#ffffff"}],
  ],
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-plantuml'))
      md.use(require('markdown-it-underline'))
      md.use(require('markdown-it-task-lists'))
    }
  },
  plugins: [
    ['@vuepress/pwa', {serviceWorker: true, updatePopup: true}],
    ['feed', {
      canonical_base: 'https://junilhwang.github.io/TIL/',
      author: {
        name: "JunilHwang",
        email: "junil.h@kakao.com",
        link: "https://junilhwang.github.io/"
      },
      posts_directories: ["/Writing/", "/Review/", "/Javascript/", "/CodeSpitz/"],
      sort: entries => entries.sort((a, b) => new Date(b.date) - new Date(a.date))
    }],
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-113171398-2'
      }
    ],
    ['sitemap', {hostname: 'https://junilhwang.github.io/TIL'}],
    ['demo-block']
  ]
}
