const vuepress = '/Vuepress'
const CodeSpitz = '/CodeSpitz'
const CodeSpitzOOJS = `${CodeSpitz}/Object-Oriented-Javascript`

module.exports = [
  { title: 'Home', path: '/' },
  {
    title: 'Vuepresse',
    children: ['Stater', 'Theme', 'Deploy', 'Plantuml', 'Utterances'].map(v => `${vuepress}/${v}`)
  },
  {
    title: '코드스피츠',
    children: [
      {
        title: '객체지향 자바스크립트',
        children: ['Intro/', 'MVVM/'].map(v => `${CodeSpitzOOJS}/${v}`)
      }
    ]
  },
  {
    title: '개발환경',
    children: [
      {
        title: 'Gradle',
        children: ['GradleWrapper/'].map(v => `/Gradle/${v}`)
      }
    ]
  },
  {
    title: 'SpringFramework',
  }
]