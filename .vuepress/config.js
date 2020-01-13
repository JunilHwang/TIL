module.exports = {
  title: '개발자 황준일',
  description: 'Today I leanred',
  themeConfig: {
    logo: 'https://avatars1.githubusercontent.com/u/18749057?s=460&v=4',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Repository', link: 'https://github.com/junilhwang/TIL/' },
    ],
    sidebar: [
      { title: 'Home', path: '/' },
      {
        title: 'Vuepresse',
        children: [
          '/Vuepress/Stater',
          '/Vuepress/Theme',
          '/Vuepress/Deploy',
          '/Vuepress/Plantuml',
          '/Vuepress/Utterances',
        ]
      },
      {
        title: '코드스피츠',
        children: [
          {
            title: '객체지향 자바스크립트',
            children: [
              '/CodeSpitz/Object-Oriented-Javascript/Intro'
            ]
          }
        ]
      }
    ],
    lastUpdated: 'Last Updated',
    smoothScroll: true
  },
  base: '/TIL/',
  markdown: {
    extendMarkdown: md => {
      md.use(require('markdown-it-plantuml'))
      md.use(require('markdown-it-underline'))
    }
  },
  plugins: [
    ['@vuepress/pwa', { serviceWorker: true, updatePopup: true }],
    ['feed', { canonical_base: 'https://junilhwang.github.io/TIL/' }]
  ]
}
