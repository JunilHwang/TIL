module.exports = {
  title: '개발자 황준일',
  description: 'Today I leanred',
  themeConfig: {
    logo: 'https://avatars1.githubusercontent.com/u/18749057?s=460&v=4',
    nav: [
      { text: 'Home', link: '/' },
    ],
    search: false,
    sidebar: [
      { title: 'Home', path: '/' },
      {
        title: 'Vuepresse',
        children: [
          '/Vuepress/Stater',
          '/Vuepress/Theme',
        ]
      },
    ],
    lastUpdated: 'Last Updated',
    smoothScroll: true
  },
  base: '/TIL/',
  markdown: {
    // lineNumbers: true
  },
  plugins: [
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }]
  ]
}
