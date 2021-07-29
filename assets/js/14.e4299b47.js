(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{523:function(t,s,a){t.exports=a.p+"assets/img/1.84ece906.jpg"},524:function(t,s,a){t.exports=a.p+"assets/img/2.48daf3da.jpg"},577:function(t,s,a){"use strict";a.r(s);var e=a(46),r=Object(e.a)({},(function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"vuepress-시작하기"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vuepress-시작하기"}},[t._v("#")]),t._v(" Vuepress 시작하기")]),t._v(" "),e("p",[t._v("현재 페이지에서 다루고 있는 내용은 vuepress로 TIL 문서를 만들면서 알게된 내용들을 정리한 것이다.")]),t._v(" "),e("h2",{attrs:{id:"static-site-generator"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#static-site-generator"}},[t._v("#")]),t._v(" Static Site Generator")]),t._v(" "),e("p",[t._v("먼저 vuepress 이전에 "),e("code",[t._v("SSG(Static Site Generator)")]),t._v(" 에 대한 이해가 필요하다. SSG는 한국말로 "),e("code",[t._v("정적 사이트 생성기")]),t._v(" 이며, 말 그대로 html, js, css 로만 만들어진 사이트를 의미한다. 감이 잘 안잡힌다면 "),e("code",[t._v("동적 사이트")]),t._v(" 라는 개념을 생각해보자.")]),t._v(" "),e("h3",{attrs:{id:"동적-사이트-dynamic-site"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#동적-사이트-dynamic-site"}},[t._v("#")]),t._v(" 동적 사이트(Dynamic Site)")]),t._v(" "),e("p",[t._v("아마 다음과 같은 기술(혹은 프로그래밍 언어, 프레임워크)은 익숙할 것이다.")]),t._v(" "),e("ul",[e("li",[e("code",[t._v("java")]),t._v(" Spring framework, jsp")]),t._v(" "),e("li",[e("code",[t._v("php")]),t._v(" Laravel, Codeigniter framework, Wordpress")]),t._v(" "),e("li",[e("code",[t._v("python")]),t._v(" Django, Flask framework")]),t._v(" "),e("li",[e("code",[t._v("node.js")]),t._v(" Express.js, Coa.js, Nest.js")]),t._v(" "),e("li",[e("code",[t._v("C#")]),t._v(" .NET framework")])]),t._v(" "),e("p",[t._v("위와 같은 기술스택으로 만들어진 사이트를 '동적 사이트' 라고 생각하면 된다.\n예를 들어 "),e("code",[t._v("게시판")]),t._v(" 이라는 시스템이 그렇다.\n게시판에는 글작성, 글수정, 글삭제, 글조회 등이 존재한다.\n그리고 "),e("code",[t._v("조회 페이지")]),t._v("의 경우 "),e("strong",[t._v("하나의 페이지를 프로그래밍 하여 만들어 놓으면 그 페이지에 게시물 정보가 매칭되어 여러 개의 페이지가 만들어지는 것이다.")])]),t._v(" "),e("h3",{attrs:{id:"정적-사이트-static-site"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#정적-사이트-static-site"}},[t._v("#")]),t._v(" 정적 사이트(Static Site)")]),t._v(" "),e("p",[t._v("정적 사이트는 오직 HTML, CSS, Javascript 만 사용하여 만들어진 것이다.\nServer Side 에서 DB를 처리하거나 Request로 Data를 받아서 처리하는 게 아니기 때문에 작성/수정/삭제 같은 기능은 존재할 수 없다.\n오직 페이지를 조회하는 것만 가능하다.")]),t._v(" "),e("p",[t._v("대표적으로 "),e("code",[t._v("Github Page")]),t._v(" 가 정적 사이트라고 생각하면 된다. Github Page는 github에 올라온 파일(HTML, CSS, Javascript)을 기반으로 작동한다.")]),t._v(" "),e("h3",{attrs:{id:"정적-사이트-생성기-ssg-static-site-generator"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#정적-사이트-생성기-ssg-static-site-generator"}},[t._v("#")]),t._v(" 정적 사이트 생성기(SSG, Static Site Generator)")]),t._v(" "),e("p",[e("code",[t._v("SSG")]),t._v("는 정적 사이트를 만들어주는 도구 혹은 프레임워크다. 다음과 같은 SSG들이 존재한다.")]),t._v(" "),e("ul",[e("li",[e("strong",[t._v("Jekyll")]),t._v(": "),e("code",[t._v("Ruby 기반")]),t._v(" 테마, 플러그인 등이 제일 풍부하며 Github Page에 내장")]),t._v(" "),e("li",[e("strong",[t._v("Hugo")]),t._v(": "),e("code",[t._v("Go 기반")]),t._v(" build 속도가 제일 빠름")]),t._v(" "),e("li",[e("strong",[t._v("Hexo")]),t._v(": "),e("code",[t._v("Node.js 기반")]),t._v(" 공식 한글 문서 지원")]),t._v(" "),e("li",[e("strong",[t._v("Gatsby")]),t._v(": "),e("code",[t._v("React 기반")]),t._v(" 정적 컨텐츠 + GraphQL")]),t._v(" "),e("li",[e("strong",[t._v("VuePress")]),t._v(": "),e("code",[t._v("Vue 기반")]),t._v(" 대표적으로 Vue 공식 문서에 사용됨. "),e("code",[t._v("필자가 사용하는 SSG")])])]),t._v(" "),e("p",[t._v("최신 동향은 "),e("a",{attrs:{href:"https://www.staticgen.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("StaticGen"),e("OutboundLink")],1),t._v(" 에서 확인할 수 있다.")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("Nuxt와 Next")]),t._v(" "),e("p",[t._v("StaticGen에서 Nuxt와 Next에 대한 정보도 확인할 수 있다. 개인적으로 Nuxt와 Next는 SSG보단 SSR을 위한 도구라고 생각하기 때문에 위의 목록에서 제외했다.")])]),t._v(" "),e("h2",{attrs:{id:"vuepress-시작하기-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vuepress-시작하기-2"}},[t._v("#")]),t._v(" VuePress 시작하기")]),t._v(" "),e("p",[t._v("VuePress는 앞서 언급한 SSG 중 하나이며, 정말로 간단하게 시작할 수 있다.\n시작하기 전에 먼저 npm(혹은 yarn)이 설치되어 있어야 한다.")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://vuepress.vuejs.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("VuePress 공식문서"),e("OutboundLink")],1),t._v("에 있는 내용을 기반으로 서술할 것이다.")]),t._v(" "),e("p",[t._v("VuePress를 시작하기 위해선 Npm이나 Yarn 같은 Pacakge Manager 가 필요하다.")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://nodejs.org/ko/",target:"_blank",rel:"noopener noreferrer"}},[t._v("npm 설치하기"),e("OutboundLink")],1),t._v(" (Node.js를 설치하면 됨)")]),t._v(" "),e("li",[e("a",{attrs:{href:"https://heropy.blog/2017/11/25/yarn/",target:"_blank",rel:"noopener noreferrer"}},[t._v("yarn 설치하기"),e("OutboundLink")],1),t._v(" (링크의 포스팅 참고)")])]),t._v(" "),e("h3",{attrs:{id:"install"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#install"}},[t._v("#")]),t._v(" install")]),t._v(" "),e("p",[t._v("필자는 yarn을 기준으로 설명할 것이다.")]),t._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# project directory 만들기")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("mkdir")]),t._v(" vuepress-stater\n"),e("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" vuepress-starter\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# package.json 생성")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" init -y\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# vuepress를 devDependency로 추가")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" -D vuepress\n")])])]),e("p",[t._v("그리고 pacakge.json 파일에 "),e("code",[t._v("scripts")]),t._v("를 추가해야 한다. 추가하기 전에 vuepress cli에 대한 이해가 필요하다.")]),t._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[t._v("vuepress cli")]),t._v(" "),e("ul",[e("li",[t._v("vuepress <command> [targetDir] [options]")]),t._v(" "),e("li",[t._v("targetDir와 options은 생략 가능하다.")]),t._v(" "),e("li",[e("a",{attrs:{href:"https://vuepress.vuejs.org/api/cli.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("vuepress cli 명령어 확인하기"),e("OutboundLink")],1)])])]),t._v(" "),e("div",{staticClass:"language-json extra-class"},[e("div",{staticClass:"highlight-lines"},[e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("br"),e("div",{staticClass:"highlighted"},[t._v(" ")]),e("div",{staticClass:"highlighted"},[t._v(" ")]),e("div",{staticClass:"highlighted"},[t._v(" ")]),e("div",{staticClass:"highlighted"},[t._v(" ")]),e("br"),e("br"),e("br"),e("br"),e("br"),e("br")]),e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// pacakge.json")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"name"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"TIL"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"version"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"1.0.0"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"main"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"index.js"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"repository"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"https://github.com/JunilHwang/TIL"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// github repository 정보. 굳이 없어도 됨.")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"author"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"junil-hwang <junil.h@kakao.com>"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// github author 정보. 굳이 없어도 됨.")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"scripts"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"docs:dev"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"vuepress dev --port 8000"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"docs:build"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"vuepress build"')]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"license"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"MIT"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"devDependencies"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"vuepress"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"^1.2.0"')]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[t._v("필자는 root directory에 문서를 생성할 것이기 땜누에 targetDir를 생략했다.")]),t._v(" "),e("p",[t._v("만약 진행중인 프로젝트가 존재하고, root에 "),e("code",[t._v("docs라는 하위 폴더")]),t._v("를 만들고 docs에 문서를 생성할 것이라면 다음과 같이 수정하면 된다.")]),t._v(" "),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// package.json")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ... 앞 내용 생략")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"scripts"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"docs:dev"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"vuepress dev docs --port 8000"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token property"}},[t._v('"docs:build"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"vuepress build docs"')]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ... 뒷 내용 생략")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[e("code",[t._v("scripts")]),t._v(" 작성이 완료 후에 이제 "),e("code",[t._v("README.md")]),t._v("를 만들어야 한다.")]),t._v(" "),e("div",{staticClass:"language-md extra-class"},[e("pre",{pre:!0,attrs:{class:"language-md"}},[e("code",[e("span",{pre:!0,attrs:{class:"token title important"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("#")]),t._v(" VuePress Starter")]),t._v("\n\nindex page 입니다.\n")])])]),e("p",[t._v("여기까지 완료 되었을 때 Project 구조는 다음과 같다.")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v(". (vuepress-starter)\n  ├─ node_modules\n  ├─ README.md\n  └─ package.json\n")])])]),e("p",[t._v("이제 작성한 "),e("code",[t._v("README.md")]),t._v(" 를 vuepress로 확인해보자.")]),t._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# pacakge.json에서 작성한 scripts 명령어를 실행하면 된다.")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" docs:dev\n")])])]),e("p",[e("img",{attrs:{src:a(523),alt:"결과 화면"}})]),t._v(" "),e("p",[t._v("이렇게 매우 간단하게 문서를 만들 수 있다.")]),t._v(" "),e("h2",{attrs:{id:"config"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#config"}},[t._v("#")]),t._v(" config")]),t._v(" "),e("p",[t._v("이제 config를 이용하여 문서를 꾸며보자. 먼저 다음과 같이 "),e("code",[t._v(".vuepress")]),t._v(" 폴더와 "),e("code",[t._v("config.js")]),t._v(" 파일을 만들어야 한다.")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("div",{staticClass:"highlight-lines"},[e("br"),e("br"),e("div",{staticClass:"highlighted"},[t._v(" ")]),e("div",{staticClass:"highlighted"},[t._v(" ")]),e("br"),e("br"),e("br")]),e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v(". (vuepress-starter)\n  ├─ node_modules\n  ├─ .vuepress\n  │  └─ config.js\n  ├─ README.md\n  └─ package.json\n")])])]),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// config.js")]),t._v("\nmodule"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  title"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'vuepress-stater'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 사이트 타이틀")]),t._v("\n  description"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'vuepress로 만든 문서입니다.'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  themeConfig"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    logo"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://avatars1.githubusercontent.com/u/18749057?s=460&v=4'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 로고 이미지")]),t._v("\n    nav"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" text"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Home'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" link"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'/'")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    sidebar"),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v("'auto'")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// h1~h6 같은 heading tag를 기준으로 sidebar를 만들어줌")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),e("p",[e("strong",[t._v("* config.js의 내용은 "),e("a",{attrs:{href:"https://vuepress.vuejs.org/config/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Config Reference"),e("OutboundLink")],1),t._v("를 참고하면 된다.")])]),t._v(" "),e("p",[e("code",[t._v("README.md")]),t._v(" 에 대한 내용도 약간 보충해보자.")]),t._v(" "),e("div",{staticClass:"language-md extra-class"},[e("pre",{pre:!0,attrs:{class:"language-md"}},[e("code",[e("span",{pre:!0,attrs:{class:"token title important"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("#")]),t._v(" 문서 제목")]),t._v("\n주제 내용\n\n"),e("span",{pre:!0,attrs:{class:"token title important"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("##")]),t._v(" 소제목 1")]),t._v("\n소제목 내용 1\n\n"),e("span",{pre:!0,attrs:{class:"token title important"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("##")]),t._v(" 소제목 2")]),t._v("\n소제목 내용 2\n\n"),e("span",{pre:!0,attrs:{class:"token title important"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("###")]),t._v(" 소제목 2-1")]),t._v("\n소제목 내용 2-1\n\n"),e("span",{pre:!0,attrs:{class:"token title important"}},[e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("###")]),t._v(" 소제목 2-2")]),t._v("\n소제목 내용 2-2\n")])])]),e("p",[t._v("다시 "),e("code",[t._v("yarn docs:dev")]),t._v(" 를 실행하여 확인해보자.")]),t._v(" "),e("p",[e("img",{attrs:{src:a(524),alt:"결과 화면 2"}})]),t._v(" "),e("p",[e("code",[t._v("logo")]),t._v("와 "),e("code",[t._v("navigation")]),t._v(", 그리고 "),e("code",[t._v("sidebar")]),t._v(" 가 생긴것을 확인할 수 있다. 마치 "),e("a",{attrs:{href:"https://kr.vuejs.org/v2/guide/",target:"_blank",rel:"noopener noreferrer"}},[t._v("vue.js 공식문서"),e("OutboundLink")],1),t._v(" 처럼 생겼다. 공식문서도 vuepress로 만들어졌기 때문이다.")]),t._v(" "),e("h2",{attrs:{id:"reference"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#reference"}},[t._v("#")]),t._v(" Reference")]),t._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://vuepress.vuejs.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("VuePress 공식문서"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://vuepress.vuejs.org/config/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Config Reference"),e("OutboundLink")],1)]),t._v(" "),e("li",[e("a",{attrs:{href:"https://62che.com/blog/vuepress/%EC%A0%95%EC%A0%81-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EC%83%9D%EC%84%B1%EA%B8%B0%EB%9E%80.html#%EC%B5%9C%EC%8B%A0-%EB%8F%99%ED%96%A5",target:"_blank",rel:"noopener noreferrer"}},[t._v("정적 사이트 생성기란"),e("OutboundLink")],1)])])])}),[],!1,null,null,null);s.default=r.exports}}]);