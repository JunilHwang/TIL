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

export const sidebar = [
  { text: 'Home', link: '/' },
  {
    text: '사이드 프로젝트',
    children: [
      {
        text: '단국대 시간표 만들기',
        children: [
          'dku-schedule-manager/'
        ].map(v => `/side-project/${v}`)
      }
    ]
  },
  {
    text: '회고',
    children: [
      {
        text: '2020년',
        children: [
          {
            text: '1분기',
            children: [
              '01-January/',
              '02-February/',
              '03-March/',
              '01-First-Quarter/',
            ].map(v => `${Review2020}/${v}`)
          },
          {
            text: '2분기',
            children: [
              '04-April/',
              '05-May/',
              '06-June/',
              '02-Second-Quarter/',
            ].map(v => `${Review2020}/${v}`)
          },
          {
            text: '3분기',
            children: [
              '07-July/',
              '08-August/',
              '09-September/',
            ].map(v => `${Review2020}/${v}`)
          },
          {
            text: '4분기',
            children: [
              '10-October/',
              '11-November/',
              '12-December/',
            ].map(v => `${Review2020}/${v}`)
          },
          {
            text: '2020년 회고',
            link: `${Review2020}/end/`
          }
        ]
      },
      {
        text: '2021년',
        children: [
          {
            text: '상반기 회고',
            link: `${Review2021}/01-First-Quarter/`
          },
          {
            text: '2021년 회고',
            link: `${Review2021}/end/`
          },
        ]
      }
    ]
  },
  {
    text: 'Javascript',
    children: [
      {
        text: 'Domain',
        children: ['Execution-Context/'].map(v => `${JavascriptDomain}/${v}`),
      },
      {
        text: 'Design',
        children: [
          'Vanilla-JS-Component/',
          'Vanilla-JS-Store/',
          'Vanilla-JS-Virtual-DOM/',
          'Vanilla-JS-Make-useSate-hook/',
        ].map(v => `${JavascriptDesign}/${v}`),
      }
    ],
  },
  {
    text: 'Vuepresse',
    children: ['Starter/', 'Theme/', 'Deploy/', 'Plantuml/', 'Utterances/'].map(v => `${vuepress}/${v}`)
  },
  {
    text: 'Book Review',
    children: [
      {
        text: '객체지향의 원리와 이해',
        children: [
          { text: '책 소개', link: `${OOPPrinciple}/00-Intro/` },
          { text: '사람을 사랑한 기술', link: `${OOPPrinciple}/01-Loved-Human/` },
          { text: '언어로서의 자바', link: `${OOPPrinciple}/02-Java-As-PL/` },
          { text: '자바와 객체지향', link: `${OOPPrinciple}/03-Java-As-OOP/` },
          { text: '확장된 객체지향', link: `${OOPPrinciple}/04-Extended-By-Java/` },
          { text: 'SOLID 원칙', link: `${OOPPrinciple}/05-SOLID/` },
          { text: '디자인 패턴', link: `${OOPPrinciple}/06-Design-Pattern/` },
          { text: 'Spring Triangle', link: `${OOPPrinciple}/07-Spring-Triangle/` },
        ]
      },
    ]
  },
  {
    text: '코드스피츠',
    children: [
      {
        text: '거침없는 자바스크립트',
        children: ['Intro/'].map(v => `${CodeSpitzNBJS}/${v}`)
      },
      {
        text: '객체지향 자바스크립트',
        children: ['01-Intro/', '02-MVVM/', '03-Strategy-Observer/', '04-ISP-Visitor/', '05-Extension/'].map(v => `${CodeSpitzOOJS}/${v}`)
      }
    ]
  },
  {
    text: '개발환경',
    children: [
      {
        text: 'Gradle',
        children: ['GradleWrapper/'].map(v => `/Gradle/${v}`)
      }
    ]
  },
  '/Writing/'
]