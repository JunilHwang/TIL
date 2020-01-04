module.exports = {
  title: '개발자 황준일',
  description: 'Today I leanred',
  themeConfig: {
    logo: 'https://avatars1.githubusercontent.com/u/18749057?s=460&v=4',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Vuepress', link: '/vuepress/'}
    ],
    search: false,
    sidebar: 'auto'
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