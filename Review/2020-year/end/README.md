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

이 외에도 내가 작업한건 아니지만, [모바일줌에 SSR을 적용](https://zuminternet.github.io/ZUM-Mobile-NodeJS/)하는 등의 공사가 있었고
기존에 API 프로젝트에서 Mobile API를 따로 떼어나는 작업도 있었다.

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



***

### 5. 핫이슈 CMS

***

### 6. 크롬 브라우저 전용 서비스

***

### 7. 팀원, 그리고 협업

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