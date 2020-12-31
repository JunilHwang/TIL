---

title: 주니어 개발자의 2020년 회고
description: 주니어 개발자의 2020년 12월 회고입니다.
sidebarDepth: 3
date: 2020-12-31 09:00:00
image: /Review/2020-year/end/thumbnail.jpg

---

# 주니어 개발자의 2020년 회고

![썸네일](./thumbnail.jpg)

> 6000개 Contributions을 목표로 했는데.. 아쉽게 다 채우진 못했다. 앞으로도 불가능 할 것 같다.

오늘은 2020년의 마지막 날이다.
그래서 2020년 회고로 올해를 마무리 하고자 한다.

들어가기 전에, 2019년을 마무리 하면서 썼던 글을 먼저 소개한다.

::: tip 일년 전, 후회와 다짐

2019년은 나에게는 권태기 같은 한 해였다.

- 고등학교 시절부터 올 해까지 몸담았던 기능대회에 대한 회의감.
- 대학교 4년동안 만족할만한 프로젝트를 못해봤다는 후회감.
- 비교적 빨리 개발을 시작했지만 그 기간이 그렇게 의미있는 시간은 아니였구나 하는 허탈감.
- 무언가 후회해볼만한 경험조차 없던 것 같은 아쉬움만 남는 대학생활.
- 이제 사회에 내던져지는 것에 대한 기대와 불안감.
  
허둥지둥 살기만 했지 똑부러지게 현명하게 똑똑하게 살진 못한 것 같다.
남들처럼 나 이렇게 열심히 살았어요 라고 회고도 써보고 싶은데 돌이켜 보니까 올해는 그렇게 열심히 살지도 않았고, 열심히 공부를 하지도 않았다.

**2020년은 스스로에게 떳떳하고 당당한 해가 되기를!**

:::

그렇게 **기필고 2020년은 후회 없는 하루 하루를 보내기로 다짐**했다.
그래서 이 포스트는 이러한 다짐을 어떤 식으로 실천했는지 소개하는 회고라고 할 수 있다.

::: tip 월간회고

- [1분기 회고](/Review/2020-year/01-First-Quarter/)
  - [1월](/Review/2020-year/01-January/)
  - [2월](/Review/2020-year/02-February/)
  - [3월](/Review/2020-year/03-March/)
- [2분기 회고](/Review/2020-year/02-Second-Quarter/)
  - [4월](/Review/2020-year/04-April/)
  - [5월](/Review/2020-year/05-May/)
  - [6월](/Review/2020-year/06-June/)
- 3분기 회고
  - [7월](/Review/2020-year/07-July/)
  - [8월](/Review/2020-year/08-August/)
  - [9월](/Review/2020-year/09-September/)
- 4분기 회고
  - [10월](/Review/2020-year/10-October/)
  - [11월](/Review/2020-year/11-November/)
  - [12월](/Review/2020-year/12-December/)

:::

## 업무

생각보다 많은 프로젝트에 참여했다. 아마 내년에는 더 많은 일을 할 것 같은 느낌이 든다.

### 1. 파일럿 프로젝트

![파일럿 프로젝트](https://junilhwang.github.io/zum_pilot/assets/img/008.22794366.gif)

나는 작년 11월에 [줌인터넷](https://zuminternet.github.io/)에 입사했고, 입사 후에 바로 **파일럿 프로젝트**를 진행했다.

::: tip 파일럿 프로젝트

줌인터넷은 신규 입사자(정확히는 신입)가 팀에 안전하게 적응할 수 있도록 6 ~ 8주 정도 `파일럿 프로젝트`를 진행한다.

:::

일단 나는 학교 수업을 전부 듣고 싶어서 주 2일(12시간 근무) 출근 했고, 공강 시간에 틈틈이 파일럿 프로젝트를 진행했다.
프로젝트의 주제는 `주제별 영상 제공 웹 서비스` 이며 다음과 같은 기술 스택을 사용했다.

![파일럿 프로젝트 기술 스택](https://zuminternet.github.io/images/portal/post/2020-01-20-ZUM-Pilot-provide-video/architecture/04.jpg)

- **front-end**
  - Vue-cli3(Webpack 4)
  - Terser Webpack plugin
  - SCSS, Lodash, Swiper
  
- **back-end**
  - Java8 이상
  - Spring Boot + Gradle
  - Spring Data JPA (선택, DB는 H2사용)
  - Ehcache
  - Pebble Template Engine (선택)

자세한 내용은 다음 링크에서 확인할 수 있다.

- [저장소(코드)](https://github.com/junilhwang/zum_pilot)
- [파일럿 프로젝트 문서](https://junilhwang.github.io/zum_pilot)
- [줌인터넷 기술블로그 - 주제별 영상 제공 웹 서비스](https://zuminternet.github.io/ZUM-Pilot-provide-video/)

확실히 파일럿 프로젝트 덕분에 팀에 잘 적응할 수 있었고 무엇보다 이렇게 긴 시간 동안 온전히 프로젝트에 집중할 수 있던 적이 여태까지 없었기 때문에 무척 재밌었다.
사실 파일럿 프로젝트를 할 때가 **회사를 다니는 동안 제일 재밌던 시기**가 아니였을까 싶다.

***

### 2. 모바일 줌

![1](./1.png)

> 모바일줌의 경우 주간 트래픽이 300만회 정도 발생한다.

입사 후 처음으로 담당하게 된 사내 프로젝트가 [모바일줌](https://m.zum.com)이다.
내가 생각했던 것 보다 프로젝트의 코드가 굉장히 많았고 딱 봐도 복잡한 설계 같았다.

그런데 천천히 프로젝트를 분석하고 이것 저것 건드려보면서 이 프로젝트가 무척 견고하고 변화에 잘 대응할 수 있도록 설계된 것이 느껴졌다.

특히 거의 모든 로직은 백엔드(Internal API)에서 관리하고, 프론트엔드는 백엔드에서 만들어준 데이터를 공용 컴포넌트로 출력 하는 형태였다.
그래서 약 1년 동안 백엔드는 수십 번 배포했으나, 프론트엔드는 10회 안팎으로 배포했다.

그래서 모바일줌의 컴포넌트를 사내 넥서스 레포에 올려놓고 사용해도 되지 않을까 논의하기도 했다.
다만 완전히 공용 컴포넌트로 사용하기엔 위험 요소가 많아서 고려 중이라고 했다.
나중에 시간적 여유가 있을 때 완전히 코어로 사용해도 좋을 것 같다.

이 외에도 내가 작업한건 아니지만, [모바일줌에 SSR을 적용](https://zuminternet.github.io/ZUM-Mobile-NodeJS/)하는 등의 공사가 있었다.

그리고 기존에 API 프로젝트에서 Mobile API를 따로 떼어나는 작업도 있었다.

![API 분리 bn](https://www.plantuml.com/plantuml/svg/ZLFBQiCm4BpxAvRSzGUXn6bSsaCXq1v2ReebYDj8Ch9C0o7_thKUrYD9gK-QdV7iIreDXcepYbCb5UEms8y2NhIIPW5q04GM9EIxEdGd7bY74hhkUwYtRvR7CnwhqXdMjFrk98EjLb-ynKoN2l1pil2pbIBuy6nKl8w7EGMU2xPcCJ-pt3MwrupsXklext0KhAbfZwbUT3B2ZH8KyRMwcSV_UdBQkqqz7xKI79gpuNBeb9oRQ7QVXTHdp4rBEoL4OkBW7zFmbVbnO8DP00XXwaUI9rlD0yhNyO3r5QHJZ-IqnViChj0DFHVRlUGXkxb2PUyVB0aPUnBgouE-h3muDJdVxUBtcxXt22ybXAVyPGoRMN79yB7z0W00)

::: tip 현재 모바일 줌의 기술 스택은 다음과 같다.

- Front Server
  - Server: typescript + Node.js + Express.js + Zum Core + SSR
    - 원래 Spring Boot를 사용했으나, SSR 때문에 node.js로 전환했다.
    - [모바일 줌 SpringBoot → NodeJS 전환기 (feat. VueJS SSR)](https://zuminternet.github.io/ZUM-Mobile-NodeJS/)
  - Front: typescript + javascript + Vue.js
    - 프론트 개발 환경의 경우 다음 링크에 대부분의 내용이 담겨있다.
      - [Webpack dev server를 이용한 개발 환경 구성 Part 01](https://zuminternet.github.io/ZUM-Webpack-dev-proxy-part1/)
      - [Webpack dev server를 이용한 개발 환경 구성 Part 02](https://zuminternet.github.io/ZUM-Webpack-dev-proxy-part2/)

- API Server
  - Java
  - Spring Boot

Front Server를 Node.js로 구성하여 대용량 트래픽을 더 적은 자원으로 관리할 수 있게 되었다.
심지어 SSR을 적용하기 전보다 응답 시간이 더 줄어들었다.

:::

모바일줌에 대해서 하고 싶은 이야기가 더 많지만,
이 이상은 대외비라서 언급하기가 꺼려진다.
확실한건 이 프로젝트 덕분의 자시감도 많이 생겼고,
설계에 대한 안목도 넓힐 수 있었다.

![Good](https://item.kakaocdn.net/do/f7833fcaf0a85fd066bd7d90ba61a6342df16ed7012359e344d47930e49e9310)

***

### 3. Open API CMS

줌인터넷에서 제공하는 [Open API](https://dev.zum.com/search/cse_intro)가 있는데,
기존에는 이를 사용하는 벤더사의 정보를 application.yml 내에서 관리하고 있었다.
벤더사가 점점 많아졌고, CMS Service로 떼어날 필요성을 느끼게 되어 진행한 프로젝트다.

이 때 [Element UI](https://element.eleme.io/#/en-US)와 [Vue-Element-Admin](https://panjiachen.github.io/vue-element-admin/#/login?redirect=%2Fdashboard)을 이용해서 만들었다.

그런데 `element-admin`에는 불필요한 컴포넌트와 기능이 많아서 정말 필요한 부분만 따로 떼어내서 사내 프로젝트에 올려놓고 사용 중이다.

이 프로젝트를 통해서 다른 팀원들과 처음으로 협업(정확히는 분업이랄까..?)을 해볼 수 있었다.
그리고 이 프로젝트에서 [AWS DynamoDB](https://aws.amazon.com/ko/dynamodb/)를 사용했는데,
다른 프로젝트에도 적용할까 하다가 흐지부지 됐다. 사용하기가 조금 애매하달까?

학습은 했는데 언제 써먹을 수 있을지..

![의문](https://item.kakaocdn.net/do/1eb7b0fd47d19247cac42daa7547feab616b58f7bf017e58d417ccb3283deeb3)

***

### 4. 크롬 확장프로그램

![크롬 확장프로그램 Zum Newtab bn](./4.png)

5월부터 8월까지 [크롬 확장프로그램 - Zum Newtab](https://chrome.google.com/webstore/detail/zum-newtab/bghgeookcfdmkoocalbclnhofnenmhlf?hl=ko&authuser=2)을 만들었다.
실제 프로젝트를 진행하기에 앞서 간단하게 [튜토리얼](https://github.com/JunilHwang/chrome-extension-tutorial)을 진행했다.

![튜토리얼](./2.png)

생각보다 어렵지 않았고, 자신감이 차오른 상태에서 개발을 진행했다.
개발은 딱 한 달 정도 소요되었는데, 검수 과정에서 다양한 반려 사유가 존재했고 _완벽하게 통과하기 까지 3개월이 걸린 것이다._

![반려](./3.png)

확실히 확장프로그램을 만들면서 기술적으로 많은 생각을 하는 계기가 되었다.
일반적인 웹 서비스가 아니기 때문에 고려해야할 것도 많았고,
완성도에 대한 중요성 또한 다시 한 번 깨우칠 수 있었다.

![전체 구조 bn](https://zuminternet.github.io/images/portal/post/2020-09-11-Zum-Chrome-Extension/12-architecture_01.png)

~~그런데 또 하고 싶다는 생각이 들진 않는다.~~

언젠간 ~~죽기 전에~~ 확장프로그램으로 재미난 일들을 해보고 싶다.

확장프로그램에 대한 자세한 내용은 [줌인터넷 기술블로그 - 크롬 확장프로그램 개발⛏ 회고](https://zuminternet.github.io/Zum-Chrome-Extension/)에서 확인할 수 있다.


***

### 5. 핫이슈 CMS

![핫이슈 영역](./6.jpg)

7월 ~ 11월 사이에는 [줌프론트](https://zum.com)의 **핫이슈 영역**을 관리하는 CMS를 만들었다.

- CMS만 만들면 되는 것이 아니라 CMS에서 정제한 데이터를 응답하는 API를 새로 만들었다.
- 미리보기 기능까지 있기 때문에 미리보기와 관련된 도메인에서 페이지를 요청할 경우,
실서비스 데이터 대신 미리보기 데이터로 구성해서 보여줄 수 있게 API와 Preview Server를 구성했다.

이 과정에서 줌프론트의 소스도 분석했고 ~~지옥문을 열었다~~, 이와 엮인 다른 서비스 담당자와 커뮤니케이션을 진행했다.

어쨋든 우여곡절 끝에 8월에 개발을 완료했고, 9월초에 첫 배포를 진행했다.
다만 9월에 배포하고 나서 지속적으로 수정사항이 생기고 있었고,
`이 상태로 배포했다고?` 싶은 버그도 많고 QA를 하지 않고 넘어간 부분도 무척 많았다.

그러던 중 이미 기획측과 **수 차례 논의하여 합의된 기능에 대해 컴플레인**이 발생했고,
이미 배포가 되어 있으며 서비스 데이터까지 삽입된 데이터베이스의 설계를 건드려야 하는 일이 발생했다.

외래키가 무척 복잡하게 만들어진 상태에서 스키마를 변경하는 것 보단 새로 만드는게 나아보였다.

![화난다 bn](https://item.kakaocdn.net/do/8f3c5af3fa1ca1557ad6cc0ef75d98c9f604e7b0e6900f9ac53a43965300eb9a)

그래서 `hotissue_v2_schedule`, `hotissue_v2_template` 처럼 **v2라는 suffix를 붙여서 테이블을 새로 만들었고,**
테이블의 변경에 따라 **서비스 로직도 대폭 수정**했다.

결과적으로 트러블이 생긴 후에 많은 문제점이 겉으로 드러났기 때문에 문제를 잘 핸들링 할 수 있었다고 생각한다.
앞선 경험을 토대로 2차 배포 전까지 QA를 꼼꼼하게 진행함은 물론 작은 기능에 대해서도 후에 문제가 발생하지 않도록 커뮤니케이션을 진행했다.
덕분에 일하는 시간 보다 커뮤니케이션 하는 시간이 많았다.

![지친다 bn](https://item.kakaocdn.net/do/1eb7b0fd47d19247cac42daa7547feab113e2bd2b7407c8202a97d2241a96625)

그렇게 성공적으로 배포를 진행했고, 뒤탈없이 마무리 되는 듯 싶었다.
사실 아직까지 큰 문제는 없는 상태인데, 코드가 너무 복잡해졌다.
더 정확히는 한 개의 컴포넌트에 너무 많은 기능이 들어가있다.

보통 API 관련 로직이나 Store를 다루는 로직은 컨테이너 컴포넌트에서 처리하고,
하위 컴포넌트가 Props나 Custom Event로 처리하도록 만드는 편이다.
이와 같은 방식으로 만들다 보니, 특정 컴포넌트 하나가 폭탄이 되었다.

![폭탄](https://junilhwang.github.io/TIL/assets/img/21.e5feae0d.png)

그래서 이걸 어떻게 해결할까 고민하다가 최근에 [Vue 3](https://v3.vuejs.org/)에 도입된 [Composition API](https://composition-api.vuejs.org/)를 사용하기로 했다.
이를 위해 [Vue3 + Composition API + TodoList](https://github.com/JunilHwang/vue-composition-todoapp)을 먼저 만들었고,
어느 정도 사용 방법을 익힌 후에 리팩토링을 진행했다.

![리팩토링](https://junilhwang.github.io/TIL/assets/img/1.0b4185b2.png)

각각의 로직을 `useMenus`, `useSchedule`, `useTemplateItem`, `usePreview` 처럼 **카테고리별로 묶어서** 유지보수 할 수 있게 작업했다.
다만 아쉬운 점은 변수와 메소드를 구분할 수 있는 방법이 이름 밖에 없다는 점과,
직접 만든 mapper 라이브러리의 경우 IDE 추적을 지원하지 않는 다는 점이다.

_Vuex에 Composition API 전용의 유틸성 라이브러리가 추가 되길 기도할 뿐이다.. 😇_

***

### 6. 크롬 브라우저 전용 서비스

> 제일 최근에 진행한 프로젝트고, 아직 정식으로 사용자에게 공개된 서비스가 아니라서 많은 정보를 언급할 수 없는 상태이다.

11월 ~ 12월에는 **크롬 브라우저(혹은 최신 브라우저)를 전용으로 서비스**하는 프로젝트를 담당하여 진행했다.
올 해의 마지막 프로젝트이며 입사 이후에 처음으로 신규 서비스를 처음부터 만드는 것이기 때문에 무척 재밌었다.

모바일줌과 똑같은 기술 스택을 사용 중이며

- Typescript
- Javascript
- Node.js
- Vue.js
- Server Side Rendering
- Java
- Spring

아마 조만간 사용자단에 정식으로 공개하고 홍보할 것 같다.
지금은 내가 생각하기에 불만족스러운 부분이 있어서 조금만 더 공개가 늦춰졌으면 하는 바람도 있다.

***

### 7. 팀원, 그리고 협업

올 해에 총 4명, 조직개편 전 팀원까지 합하면 7명의 팀원이 이직했다.

![훌쩍 bn](https://item.kakaocdn.net/do/b888ef9aeedc7e048b34a7856ea2ce94ac8e738cb631e72fdb9a96b36413984e)

특히 내가 입사했을 때 **무척 존경하고 자극이 되어주시던 분들**이 가셔서 참 아쉽기도 하고, 더 좋은 곳으로 가셨으니 기쁘기도 하다.

- [희정님](https://github.com/gmlwjd9405) => 카카오페이
- [남준님](https://github.com/namjunemy) => 우아한형제들
- [정수님](https://github.com/integerous) => 토스 페이먼츠

이제 다른 회사로 가셨지만, 이 분들과 인연을 맺었음에 감사할 따름이다.
나도 누군가에게 **긍정적인 영향**을 줄 수 있는 사람이 되기 위해서 부단히 노력해야겠다 😁

그래도 원래 **가깝게 지내던 지인이 내 추천을 통해 팀에 합류**하게 되었고,
앞으로 새로운 사람들도 계속 들어올 예정(과연..?)이기 때문에 새로운 인연을 기대하는 중이다.

그리고 현재 나의 사수이자 대부분의 업무를 같이 수행 중이며 **항상 나에게 큰 가르침을 선사해 주시는 효준 선임님이 아직 계시기 때문에** 든든하다!
이분 까지 가시면.. 😱.. 그래도 천천히 마음의 준비를 해야지 싶다. 그럴라면 지금 보다 더 깊은 수준의 지식을 쌓아야겠지만, 이게 이 업계의 숙명이 아닐까?

## 개발 역량 강화

*** 

### 1. 일일커밋 관련

***

### 2. 도메인 지식 학습

***

### 3. 사이드 프로젝트

***

### 4. 인터넷 강의

***

### 5. 스터디

***

### 6. 리뷰어 활동

***

### 7. 강사

***

### 8. 프로그래머스 챌린지

## 일상

***

### 1. 졸업

***

### 2. 학자금 대출 상환

***

### 3. 수영

***

### 4. 고양이

***

### 5. 오버워치

***

### 6. 전자기기 구매

***

### 7. 여행

## Summary