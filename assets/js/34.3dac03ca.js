(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{293:function(t,a,s){"use strict";s.r(a);var r=s(28),e=Object(r.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"_2020년-3월-회고"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2020년-3월-회고"}},[t._v("#")]),t._v(" 2020년 3월 회고")]),t._v(" "),s("p",[t._v("나는 3월 한 달을 어떻게 지냈나? 에 대한 고찰이다.")]),t._v(" "),s("h2",{attrs:{id:"공적"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#공적"}},[t._v("#")]),t._v(" 공적")]),t._v(" "),s("h3",{attrs:{id:"_1-재택근무"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-재택근무"}},[t._v("#")]),t._v(" 1. 재택근무")]),t._v(" "),s("p",[t._v("3월은 한 달 내내 재택근무를 시행하였다. "),s("s",[t._v("빌어먹을 코로나")])]),t._v(" "),s("p",[t._v("밖에 나가지 않고 집에서 일하니까 출퇴근 시간이 단축되어 좋긴 했지만, 온종일 앉아만 있으니까 엉덩이가 너무 아팠다.\n그래서 산책도 하고, 등산도 했지만.. 역시 수영이 몸을 개운하게 만들어 주는데 제일 탁월할 것 같다.")]),t._v(" "),s("h3",{attrs:{id:"_2-cms-개발"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-cms-개발"}},[t._v("#")]),t._v(" 2. CMS 개발")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("vue로 만든 CMS UI를 API와 연동하는 작업을 수행했다."),s("br"),t._v("\n회사에서 사용하는 코어 모듈이 있는데, 이것 때문에 여러 가지 문제가 발생해서 애 좀 먹었다.")])]),t._v(" "),s("li",[s("p",[t._v("http 응답에 대한 고민을 많이 했다. 기존에는 REST API에서 다음과 같은 식으로 Response를 보냈다.")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 성공 시")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"success"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"data"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* data 형식 */")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 실패 시")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"success"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("그런데 "),s("a",{attrs:{href:"https://evan-moon.github.io/2020/03/15/about-http-status-code/",target:"_blank",rel:"noopener noreferrer"}},[t._v("서버의 상태를 알려주는 HTTP 상태 코드"),s("OutboundLink")],1),t._v(" 라는 포스트를 보고 현재 내가 API 설계를 잘못하고 있다는 생각이 들었다.\n그래서 이에 대해 한참 고민하고, front에서 api의 응답 처리 방식을 완전히 뜯어고쳤다.\n다만 아직 고민 중인 부분은 "),s("strong",[t._v("URI의 형태는 정확하지만, 응답으로 보내줄 값 자체가 없다면 어떡해야 할까?")])]),t._v(" "),s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[t._v("GET /post/10 "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 10번 post가 없을 경우엔?")]),t._v("\n")])])]),s("p",[t._v("이때 404, 503, 502, 204 중 어떤 것을 보내야 할지 명확하지가 않았다.\n조금 더 구글링해보다 "),s("a",{attrs:{href:"https://luckyyowu.tistory.com/377",target:"_blank",rel:"noopener noreferrer"}},[t._v("HTTP 404 Status Code 에 대한 고찰"),s("OutboundLink")],1),t._v(" 이라는 포스트를 보고, 어느 정도 생각이 정리되었다.")]),t._v(" "),s("ul",[s("li",[t._v("존재하지 않는 uri: 404 Not Found")]),t._v(" "),s("li",[t._v("특정 리소스가 있어야 하는데 없음 (로직, 내부 오류): 500 Internal Server Error")]),t._v(" "),s("li",[t._v("특정 리소스가 있을 수도 있고, 없을 수도 있음: 204 No Content")]),t._v(" "),s("li",[t._v("클라이언트가 말도 안 되는 파라미터로 리소스를 요청함: 400 Bad Request")])])])]),t._v(" "),s("h3",{attrs:{id:"기타"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#기타"}},[t._v("#")]),t._v(" 기타")]),t._v(" "),s("p",[t._v("CMS 말고도 이것저것 업무가 어느 정도 있었지만.. 보안 때문에 언급할만한 것들이 없다.")]),t._v(" "),s("h2",{attrs:{id:"사적"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#사적"}},[t._v("#")]),t._v(" 사적")]),t._v(" "),s("h3",{attrs:{id:"_1-dku-logging-service"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-dku-logging-service"}},[t._v("#")]),t._v(" 1. DKU Logging Service")]),t._v(" "),s("p",[t._v("3월은 "),s("a",{attrs:{href:"https://github.com/JunilHwang/DKU-Software-Engineering-Logging-Service",target:"_blank",rel:"noopener noreferrer"}},[t._v("사이드 프로젝트"),s("OutboundLink")],1),t._v(" 개발로 대부분의 시간을 보냈다고 해도 무방하다.")]),t._v(" "),s("h4",{attrs:{id:"server-nestjs"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#server-nestjs"}},[t._v("#")]),t._v(" Server: NestJS")]),t._v(" "),s("p",[t._v("작년에 "),s("a",{attrs:{href:"https://nestjs.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("NestJS"),s("OutboundLink")],1),t._v(" 사용을 시도하다가 너무 어려워서 포기했는데, 스프링도 제대로 사용해보고 객체지향에 대한 개념도 숙지하고, 디자인패턴도 익혔더니 이제 사용에 큰 무리가 없다.\n다만 굳이 NestJS를 써야만 하는 이유를 찾기가 힘든 상황이다.\n사용 방법이나 디자인된 형태는 Spring과 거의 유사한데 그럴 거면 그냥 Spring을 쓰는 게 낫지 않나 하는 생각이 자꾸 든다.")]),t._v(" "),s("p",[t._v("그래도 이점을 찾아보자면")]),t._v(" "),s("ul",[s("li",[t._v("Front와 Back에서 Typescript를 사용할 경우 공통으로 사용하는 Type에 대해 공유할 때 편리하다.")]),t._v(" "),s("li",[t._v("Node.js 기반이기 때문에 개발 속도가 확실히 빠르다.")])]),t._v(" "),s("p",[t._v("정도?")]),t._v(" "),s("p",[t._v("사실 이 정도면 그냥 사용해보고 싶어서 사용하는 상황이라고 봐도 무방한 것 같다.")]),t._v(" "),s("h4",{attrs:{id:"client-vuejs"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#client-vuejs"}},[t._v("#")]),t._v(" Client: VueJS")]),t._v(" "),s("p",[t._v("React와 Vue 중에 어떤 것을 사용할까 고민하다가 회사에서 Vue를 사용하고 있기 때문에 더 깊은 공부를 위하여 Vue를 택했다.\n그런데 Vue를 그렇게 깊게 사용하고 있다는 생각이 들진 않는다. 일단은 UI를 잘 만드는 정도?")]),t._v(" "),s("h4",{attrs:{id:"github-api-v3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#github-api-v3"}},[t._v("#")]),t._v(" Github API v3")]),t._v(" "),s("p",[t._v("사이드 프로젝트가 Github에 있는 데이터를 활용하다 보니 GitHub API를 깊게 숙지해야만 했다.\n덕분에 OpenAPI에 대한 이해도가 급격하게 좋아졌다. 대학교를 다닐 때 API를 연동하려고 참 애를 많이 썼는데.. 부질없는 짓이었구나 느끼고 있다.\nGithub는 참 활용 방안이 무궁무진한 서비스라고 느끼는 중이다.")]),t._v(" "),s("h3",{attrs:{id:"_2-알고리즘"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-알고리즘"}},[t._v("#")]),t._v(" 2. 알고리즘")]),t._v(" "),s("p",[t._v("나와 같이 개발자의 길을 걷고 있는 여자친구가 최근에 퇴사했다. 그리고 이직 준비를 도우면서 얼떨결에 나도 같이 알고리즘을 풀이하게 되었다.\n오랜만에 알고리즘을 풀어보니 꽤 재미있게 느껴졌다. 그래서 못해도 1주일에 1번 정도는 알고리즘 문제를 풀어야지 생각 중이다.")]),t._v(" "),s("h3",{attrs:{id:"_3-독서-실패"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-독서-실패"}},[t._v("#")]),t._v(" 3. 독서 실패")]),t._v(" "),s("p",[t._v("사이드 프로젝트에만 집중하다 보니 독서는 아예 포기했다. "),s("s",[t._v("사실 귀찮았다")])]),t._v(" "),s("h3",{attrs:{id:"_4-til-실패"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-til-실패"}},[t._v("#")]),t._v(" 4. TIL 실패")]),t._v(" "),s("p",[t._v("3월에는 아예 TIL에 손대지 않았다. 역시 나는 게을러!")]),t._v(" "),s("h3",{attrs:{id:"_5-코덕-top-10"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-코덕-top-10"}},[t._v("#")]),t._v(" 5. 코덕 Top 10")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://user-images.githubusercontent.com/18749057/80858554-d54f1680-8c94-11ea-9227-39d1c34e6196.png",alt:"코덕 Top 10"}})]),t._v(" "),s("p",[t._v("1월과 2월은 주로 TIL 위주의 커밋을 했었는데, 3월은 사이드 프로젝트의 여파로 커밋 횟수가 증가했다. 이 때문인지 코덕에서의 랭킹이 급 상승했다.")]),t._v(" "),s("p",[t._v("다음달에는 1등을 한 번 노려보는걸로!")]),t._v(" "),s("h2",{attrs:{id:"summary"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#summary"}},[t._v("#")]),t._v(" Summary")]),t._v(" "),s("ul",[s("li",[t._v("Http Status에 대해 깊은 이해를 시도 중")]),t._v(" "),s("li",[t._v("사이드 프로젝트 진행 중")]),t._v(" "),s("li",[t._v("3월 독서, TIL 등 수행하지 않음")]),t._v(" "),s("li",[t._v("재택근무")])])])}),[],!1,null,null,null);a.default=e.exports}}]);