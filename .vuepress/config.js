module.exports = {
  title: '개발자 황준일',
  description: 'Today I leanred',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Vuepress', link: '/vuepress/'}
    ]
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