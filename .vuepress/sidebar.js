const vuepress = '/Vuepress'
const CodeSpitz = '/CodeSpitz'
const Javascript = '/Javascript';
const JavascriptDomain = `${Javascript}/Domain`;
const JavascriptDesign = `${Javascript}/Design`;
const CodeSpitzNBJS = `${CodeSpitz}/None-Blocking-Javascript`
const CodeSpitzOOJS = `${CodeSpitz}/Object-Oriented-Javascript`
const Book = `/Book`
const OOPPrinciple = `${Book}/OOP-Principle`
const Review2020 = `/Review/2020-year`
const Review2021 = `/Review/2021-year`

module.exports = [
  { title: 'Home', path: '/' },
  {
    title: '회고',
    children: [
      {
        title: '2020년',
        children: [
          {
            title: '1분기',
            children: [
              '01-January/',
              '02-February/',
              '03-March/',
              '01-First-Quarter/',
            ].map(v => `${Review2020}/${v}`)
          },
          {
            title: '2분기',
            children: [
              '04-April/',
              '05-May/',
              '06-June/',
              '02-Second-Quarter/',
            ].map(v => `${Review2020}/${v}`)
          },
          {
            title: '3분기',
            children: [
              '07-July/',
              '08-August/',
              '09-September/',
            ].map(v => `${Review2020}/${v}`)
          },
          {
            title: '4분기',
            children: [
              '10-October/',
              '11-November/',
              '12-December/',
            ].map(v => `${Review2020}/${v}`)
          },
          {
            title: '2020년 회고',
            path: `${Review2020}/end/`
          }
        ]
      },
      {
        title: '2021년',
        children: [
          {
            title: '상반기 회고',
            path: `${Review2021}/01-First-Quarter/`
          }
        ]
      }
    ]
  },
  {
    title: 'Javascript',
    children: [
      {
        title: 'Domain',
        children: ['Execution-Context/'].map(v => `${JavascriptDomain}/${v}`),
      },
      {
        title: 'Design',
        children: ['Vanilla-JS-Component/'].map(v => `${JavascriptDesign}/${v}`),
      }
    ],
  },
  {
    title: 'Vuepresse',
    children: ['Starter/', 'Theme/', 'Deploy/', 'Plantuml/', 'Utterances/'].map(v => `${vuepress}/${v}`)
  },
  {
    title: 'Book Review',
    children: [
      {
        title: '객체지향의 원리와 이해',
        children: [
          { title: '책 소개', path: `${OOPPrinciple}/00-Intro/` },
          { title: '사람을 사랑한 기술', path: `${OOPPrinciple}/01-Loved-Human/` },
          { title: '언어로서의 자바', path: `${OOPPrinciple}/02-Java-As-PL/` },
          { title: '자바와 객체지향', path: `${OOPPrinciple}/03-Java-As-OOP/` },
          { title: '확장된 객체지향', path: `${OOPPrinciple}/04-Extended-By-Java/` },
          { title: 'SOLID 원칙', path: `${OOPPrinciple}/05-SOLID/` },
          { title: '디자인 패턴', path: `${OOPPrinciple}/06-Design-Pattern/` },
          { title: 'Spring Triangle', path: `${OOPPrinciple}/07-Spring-Triangle/` },
        ]
      },
    ]
  },
  {
    title: '코드스피츠',
    children: [
      {
        title: '거침없는 자바스크립트',
        children: ['Intro/'].map(v => `${CodeSpitzNBJS}/${v}`)
      },
      {
        title: '객체지향 자바스크립트',
        children: ['01-Intro/', '02-MVVM/', '03-Strategy-Observer/', '04-ISP-Visitor/', '05-Extension/'].map(v => `${CodeSpitzOOJS}/${v}`)
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
  '/Writing/'
]