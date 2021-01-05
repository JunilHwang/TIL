---

title: 주니어 개발자의 2020년 회고
description: 주니어 개발자의 2020년 12월 회고입니다.
sidebarDepth: 3
date: 2020-12-31 09:00:00
image: /Review/2020-year/end/thumbnail.jpg

---

# 주니어 개발자의 2020년 회고

![썸네일 bn](./thumbnail.jpg)

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
정확히는 한 개의 컴포넌트에 너무 많은 기능이 들어가있다.

보통 API 관련 로직이나 Store를 다루는 로직은 컨테이너 컴포넌트에서 처리하고,
하위 컴포넌트가 Props를 전달하거나 혹은 Custom Event로 처리하도록 만드는 편이다.
이와 같은 방식으로 만들다 보니, 특정 컴포넌트 하나가 폭탄이 되었다.

![폭탄](https://junilhwang.github.io/TIL/assets/img/21.e5feae0d.png)

> 고작 몇 백줄 정도의 코드지만, 팀 내에서 적극적으로 프론트엔드를 공부하는 사람이 나를 포함하여 두 명이다.
그래서 다른 팀원이 이 코드를 보게 될 경우 무척 혼란스러울 수 있다. 

그래서 이걸 어떻게 해결할까 고민하다가 최근에 [Vue 3](https://v3.vuejs.org/)에 도입된 [Composition API](https://composition-api.vuejs.org/)를 사용하기로 했다.
이를 위해 [Vue3 + Composition API + TodoList](https://github.com/JunilHwang/vue-composition-todoapp)을 먼저 만들었고,
어느 정도 사용 방법을 익힌 후에 리팩토링을 진행했다.

![리팩토링](https://junilhwang.github.io/TIL/assets/img/1.0b4185b2.png)

각각의 로직을 `useMenus`, `useSchedule`, `useTemplateItem`, `usePreview` 처럼 **카테고리별로 묶어서** 유지보수 할 수 있게 작업했다.
그리고 `mapState`, `mapGetters`, `mapMutations`, `mapActions`, `craeteNamespaceHelper` 같은 API를 이용하여 컴포넌트에 Vuex를 결합하여 사용했는데, Composition API에는 이런게 없다.
그래서 직접 만들어서 사용했다.

```js
import { computed } from "vue";
import { useStore } from "vuex";

export default function useStoreModuleMapper(namespace) {
  const store = useStore();

  const mapState = keys => keys.map(key => computed(() => store.state[namespace][key]));
  const mapMutations = keys => keys.map(key => (...payload) => store.commit(`${namespace}/${key}`, ...payload));
  const mapActions = keys => keys.map(key => (...payload) => store.dispatch(`${namespace}/${key}`, ...payload));
  const mapGetters = keys => keys.map(key => computed(() => store.getters[`${namespace}/${key}`]));

  return { mapState, mapMutations, mapActions, mapGetters };
}
```

위의 코드는 다음과 같이 사용할 수 있다.

```js
export default function useTodo() {
  const { mapState, mapGetters, mapActions, mapMutations } = useStoreModuleMapper("todo");
  const [listLoading, appendLoading] = mapState(["listLoading", "appendLoading"]);
  const [filteredTodoItems] = mapGetters(["filteredTodoItems"]);
  const [setTodoItems, setUser] = mapMutations([SET_TODO_ITEMS, SET_USER]);
  const [fetchItems, addItem, updateItem, toggleItem, removeItem, removeAllItem, updatePriority] = mapActions([
    FETCH_ITEMS,
    ADD_ITEM,
    UPDATE_ITEM,
    TOGGLE_ITEM,
    REMOVE_ITEM,
    REMOVE_ALL_ITEM,
    UPDATE_PRIORITY
  ]);
}
```

사용하는데 큰 무리는 없으나, _IDE 추적을 지원하지 않기 때문에_ 오히려 코드를 유지보수할 때 힘들 수 있다.
_Vuex에 Composition API 전용의 유틸성 라이브러리가 추가 되길 기도할 뿐이다.. 😇_

그리고 Composition API를 사용하면 변수와 메소드를 구분할 수 있는 방법이 변수명 밖에 없기 때문에 네이밍을 더 잘 해야 하거나 혹은 사내 전용 컨벤션을 만들어야 한다.
그래서 더 많이 고민해봐야 할 것 같다.

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

***

## 개발 역량 강화

이제부터가 본격적인 회고라고 할 수 있다. 쓰는 나도 지루한데, 읽는 사람도 지루하지 않을까 싶은 걱정이 앞서고 있다.

*** 

### 1. 일일커밋

올 해의 제일 큰 목표중 하나이자 착실하게 이뤄낸 목표가 바로 **일일커밋**이다.

![일일커밋 bn](./thumbnail.jpg)

처음에는 그냥 매일 매일 꾸준히만 하자고 생각했었는데, 하다보니 너무 많이 해버렸다..

![통계 bn](https://camo.githubusercontent.com/6cd4946662de5fc82b62058f0b9993eb1a7bde6fa9c2fb5d551f7add09acd0d9/68747470733a2f2f6769746875622d726561646d652d73746174732e76657263656c2e6170702f6170693f757365726e616d653d6a756e696c6877616e67)

- 1분기
   - `1월` **7개의 Repository**에서 **357개의 Commit**을 남겼다.
   - `2월` **4개의 Repository**에서 **152개의 Commit**을 남겼다.
   - `3월` **3개의 Repository**에서 **168개의 Commit**을 남겼다.
  
- 2분기
   - `4월` **20개의 Repository**에서 **475개의 Commit**을 남겼다.
   - `5월` **11개의 Repository**에서 **665개의 Commit**을 남겼다.
   - `6월` **12개의 Repository**에서 **436개의 Commit**을 남겼다.
  
- 3분기
  - `7월` **8개의 Repository**에서 **357개의 Commit**을 남겼다.
  - `8월` **19개의 Repository**에서 **397개의 Commit**을 남겼다.
  - `9월` **18개의 Repository**에서 **770개의 Commit**을 남겼다.
  
- 4분기
  - `10월` **13개의 Repository**에서 **503개의 Commit**을 남겼다.
  - `11월` **10개의 Repository**에서 **198개의 Commit**을 남겼다.
  - `12월` **8개의 Repository**에서 **326개의 Commit**을 남겼다.
  
그리고 이에 대한 양분으로 사용된 주된 Repository 들이다.

- [TIL](https://github.com/junilhwang/TIL)
  - 매일매일 공부한 것들을 기록하기 위해서 만든 저장소인데, 월간 회고 때만 사용 중이다. ~~이럴꺼면 왜 만들었냐~~
- [java-clean-code](https://github.com/junilhwang/java-clean-code)
  - NextStep의 Java TDD CC 8기 과정에서 산출된 코드를 모아놨다. 
- [black-coffee-study](https://github.com/junilhwang/black-coffee-study)
  - NextStep의 블랙커피 스터디 미션 수행 과정에서 산출된 코드를 모아놨다.
- [DKU-Software-Engineering-Logging-Service](https://github.com/junilhwang/DKU-Software-Engineering-Logging-Service)
  - 올해 초에 진행했던 사이드 프로젝트인데, 미완성으로 남겨둔 상태이다. 언제 다시 시작해야 할까..? 이제 내가 뭘 하려고 했는지도 가물가물 하다.
- [react-facebook-clone](https://github.com/junilhwang/DKU-Software-Engineering-Logging-Service)
  - 프로그래머스 리액트 스터디를 진행하면서 산출된 코드를 모아놨다.
- [postman-clone](https://github.com/est-react-study/postman-junil)
  - 사내 리액트 스터디에서 산출된 코드를 모아놨다.
- [Algorithm](https://github.com/DKU-STUDY/Algorithm)
  - 단국대 알고리즘 스터디인데 사실 내가 기여한 부분이 어느 정도인지 잘 모르겠다. 아마 별로 없을 것 같다.
- [discord-study-bot](https://github.com/JunilHwang/discord-study-bot)
  - github DKU-STUDY 그룹에서 이벤트가 발생하면 디스코드로 알림을 보내주는 프로젝트이다.
- [pilot](https://github.com/JunilHwang/zum_pilot)
  - 파일럿 프로젝트 코드와 문서를 모아놨다.

그리고 겸사겸사 [코딩덕후](https://co-duck.com) 서비스를 이용하면서 의욕을 불태웠다.

![7](./7.jpg)

6월, 7월 집계는 무슨 문제인지는 모르겠으나 각각 하루씩 커밋에 대한 집계가 되지 않았다 😂

어쨌든 **1위를 세 번**, 2위와 3위는 각각 한 번씩 했다.
아직 12월이 마무리되지 않아서 12월 뱃지는 없는 상태이다.

![8](./8.jpg)

아마 12월 일일커미터 뱃지와 TOP 10 뱃지를 받지 않을까 싶다.

일일커밋을 하면서 느낀 것은, 배보다 배꼽이 더 커져버린 다는 것이다.
내년에는 커밋에 집착하기 보단 실제로 지식을 쌓는 것에 집중할 예정이다.

막상 잔디밭이 전부 채워진 것을 보고 있으니 많이는 하지 않더라도 한 개 씩은 하는 게 좋지 않을까? 하는 생각도 든다.

***

### 2. 사이드 프로젝트

개인적으로 진행한 사이드 프로젝트에 대해 정리해본다.
덕분에 공부는 많이 했으나 제대로 마무리 하질 않아서 아쉬움이 많이 남는다.

#### (1) DKU-Software-Loggging-Service

[프로젝트 레포지토리 바로가기](https://github.com/junilhwang/DKU-Software-Engineering-Logging-Service)

파일럿 프로젝트가 끝난 후에 사이드 프로젝트를 진행 해보고 싶어서 뭘 만들까 고민하다가 **Github와 관련된 서비스**를 만들기로 했다. 
자신의 Github에 올린 **Markdown 파일**을 읽어올 수 있고,
**Webhooks**를 이용하여 자동으로 포스트가 업데이트되도록 만들었다.
물론 수동으로 갱신할 수도 있다.

일단 위에 언급한 기능을 만드는 것은 어렵지 않았으나 **디자인도 구리고 퀄리티가 낮았다.**
그래서 이것저것 서브 기능을 넣어야 하는데 그것마저 쉽지가 않았다.
_혼자서 사이드 프로젝트를 하는 게 이럴 때 버겁구나 느꼈다._

그래서 만족할 때 까지 리팩토링을 하거나 ~~벌써 리팩토링만 몇 번 한 것인지...~~
기술 스택을 최대한 많이 공부하는 등의 목표를 가지고 진행 했는데 사실 그 마저도 쉽지 않았다.

기술이 워낙 다양하기도 하고, 그 중에 무엇을 골라서 얼만큼 공부해야 좋을지 감이 잡히지 않았기 때문이다.

- *첫 번째 성과: Open API 습득* 
  - 사이드 프로젝트를 하면서 얻은 첫 번째 성과는 **Open API를 사용하는 방법**을 완전히 터득한 것이다.
이전에는 API를 연동할 때 문서를 봐도 모르겠고,
다른 사람들이 작성한 글들을 봐도 감이 오질 않았는데 정말 어떤 API를 사용하더라도 큰 문제가 없을 정도로 이해한 상태다. 
  - 사실 사이드 프로젝트 덕분이라기보단 입사 직후에 진행했던 파일럿 프로젝트의 영향이 더 큰 것 같다.

- *두 번째 성과, NestJS 습득*
  - 대학교 재학 중에 [NestJS](https://nestjs.com/)가 뭔가 좋아보여서 공부했었는데, 너무 어려워서 포기했다.
    ::: tip NestJS 소개
    NestJS는 **Google**에서 만든 **Server Side Framework**이다.
    - **Java의 Spring과 매우 비슷한 방식**으로 작동한다.
    - **DI(Dependency Injection)** 방식으로 구성한다.
    - **DDD** 형태의 프로젝트 구조를 권장한다.
    - **Typescript**를 사용한다.
    - **express** 기반이다.
    :::
    ::: tip NestJS의 철학
    NestJS는 Angular의 영향을 받아 다음과 같은 철학 기반을 만들어졌습니다.
    - 고도의 테스트 지원
    - 효율적인 확장
    - 느슨한 결합
    - 유지 관리가 용이한 애플리케이션
    :::
  - 그런데 이번에 무심코 다시 적용을 시도했고, 결과적으로 좋은 선택이 되었다.
  - 이건 **객체지향 공부의 영향**이 컸다.
    국내 자료를 아무리 찾아봐도 NestJS에 대한 내용은 거의 볼 수 없었다.
    대부분 해외에서 사용하고 있는데, 영어에 너무 취약하다 보니.. 이해가 너무 어려웠다. 
  - 하지만 Spring을 많이 사용해봤고 **Spring에 사용된 기본적은 디자인패턴이나 철학을 이해하고 있다면**,
NestJS를 이해하는 데 큰 무리가 없는 것 같다. 
  - 그래서 사이드 프로젝트의 제일 큰 수확은 사실 **NestJS 사용법 숙지**가 아닐까 싶다.

- *세 번째 성과: Server Side Rendering*
  - 진짜 SSR 때문에 한 동안 고생을 너무 많이 했다.
  - _Vue에서 제공하는 가이드라인이 너무 빈약하다.
  - API 문서도 잘못 되었거나 반영되지 않은 것들이 많았다.
  - 각설하고 문제점과 약간의 해결과정을 나열해보자면 다음과 같다.
    - `첫 번째 문제` SSR과 CSR을 같이 하기 위한 가이드라인이 없다.
      - [Vue의 공식문서](https://ssr.vuejs.org/), 각종 커뮤니티 사이트, 
        기술 블로그 등을 폼하여 눈씻고 찾아봐도 SSR과 CSR을 같이 사용하는 방법에 대한 가이드라인은 없었다.
        _있다면 누가 좀 알려주길.._
      - 어쨌든 SSR에 CSR을 연동하기 위해선 다음과 같은 과정이 필요하다.
      - CSR의 Template에 SSR의 Template을 합쳐야 한다.
      - CSR 코드를 번들링(빌드) 한다. _이 때 Template도 Bundling 코드에 포함된다._
      - CSR에서 Build된 Template를 SSR에서 사용한다.
      - 이와 관련 내용도 추후에 상세하게 정리해서 올릴 예정이다.
      
    - `두 번째 문제` window와 document를 사용하는 코드들*
      - SSR은 CSR의 코드를 Server에서 실행하여 HTML 코드를 만들고 바로 렌더링한다. 
      - 이 때 발생하는 문제가 _window와 document는 Server Side에서 사용할 수 없다는 것이다._
      - 그래서 직접 window와 document를 만들어주거나 Render와 관련된 코드에는 window와 document를 사용하지 않는 것이다.
      - **그런데 이게 말이 쉽지 직접 해보면 욕나온다.**
      - 어쨌든 어떤 방법이 제일 좋을까 고민하다가 찾아난 해결책이 JSDOM을 사용하는 것이다.
        ::: tip JSDOM
        - JSDOM은 말 그대로 가상의 window와 document를 만들어주는 것이다.
        - 가상의 존재여도 _존재한다는 것_ 자체만으로도 그 가치가 있다.
        :::
        ```js{26-35}
        import { Injectable } from '@nestjs/common'
        import { join } from 'path'
        import { BundleRenderer, createBundleRenderer } from 'vue-server-renderer'
        import { DOMWindow, JSDOM } from 'jsdom'
        
        const port = process.env.NODE_ENV === 'development' ? 3000 : 8080
        const baseURL = `http://localhost:${port}`
        const bundlePath = join(__dirname, '../../../resources/vue-ssr-server-bundle.json');
        const htmlStr = `<!DOCTYPE html><html><head><title></title></head><body></body></html>`
        
        @Injectable()
        export class SSRService {
        
          public getRenderer (): BundleRenderer {
            try {
              return createBundleRenderer(bundlePath, {
                runInNewContext: false,
                template: (result, context) => `${result}${context.renderState()}${context.renderScripts()}`
              } as any)
            } catch (e) {
              console.log(e)
              throw 'Renderer Error'
            }
          }
        
          public getDom (contextURL: string): [ DOMWindow, Document ] {
            try {
              const url: string = `${baseURL}${contextURL}`
              const {window} = new JSDOM(htmlStr, {url})
              return [window, window.document]
            } catch (e) {
              console.log(e)
              throw 'JSDOM Error'
            }
          }
        }
        ```
        
    - `세 번째 문제` 제대로된 Tutorial을 찾을 수 없다. 
      - SSR의 가장 큰 문제점 중 하나가 바로 제대로된 튜토리얼이 없다는 것이다. 
      - github를 찾아봐도 구글링을 해봐도 _이것만 보면 이해할 수 있다 싶은 튜토리얼은 존재하지 않았다._
      - 그래서 내가 만들었다 --> [Vue SSR Tutorial](https://github.com/JunilHwang/vue-ssr-tutorial)
      - 일단 설명은 없고 소스코드만 존재한다. ~~뭐.. 이해할 사람은 이해하겠지.~~

- *네 번째 성과: Mono Repo 적용*
  - Client와 Server에 Typescript를 적용하면서 생긴 고민이 _공통 타입을 잘 활용할 수 있는 방법이 없을까?_ 였다. 
  - 예를들어 Server에서 Github API를 이용하여 `Repository` 정보에 대한 타입을 `GithubRepository`로 정의했다.
    **그런데 이 타입은 Client에서도 필요하다.**
  - 그래서 처음엔 Client가 프로젝트의 코드상으로 Server에 접근할 수 있도록 만들어야 했다. 
    만들면서 계속 찜찜했다. _Type이 Server에 종속되어있는게 맞을까?_ 라는 생각 때문이다. 
    그래서 Mono Repository에 대해 찾아봤고, 두 가지 방법이 존재했다.
    - Yarn Workspace
      - [[Node] yarn workspaces (프로젝트 참조)](https://musma.github.io/2019/04/02/yarn-workspaces.html)
      - [🌸 모노레포. Lerna? Yarn Worksapce!](https://medium.com/@deptno/monorepo-yarn-workspace-e81e3e078100)
      
    - Lerna
      - [Mono Repo 를 위한 Lerna 간단 정리하기](https://medium.com/@pks2974/mono-repo-%EB%A5%BC-%EC%9C%84%ED%95%9C-lerna-%EA%B0%84%EB%8B%A8-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-65c22029988)
      - [Lerna 훑어보기](https://www.awesomezero.com/development/lerna/)
    
  - 권장하는 것은, 두 가지를 같이 사용하는 것이다. 그래서 나도 두 가지 모두 사용했다.
    - [yarn workspace와 Lerna.js로 모노레포 만들기 - 심심재](https://simsimjae.tistory.com/384)

이렇게 일을 벌려놨는데, 5월에 넥스트 스텝 Java TDD CC 8기 과정을 신청했고 그렇게 6월까지 해당 과정에만 집중해야 했다.

***

#### (2) 디스코드 봇

![9](./9.png)

6월에 [DKU-STUDY](https://github.com/DKU-STUDY/) 채팅방을 디스코드로 옮기면서 [디스코드 봇](https://github.com/JunilHwang/discord-study-bot)을 만들었다.

_Pull Request, Push, Issue, Review 등이 발생하면 디스코드 봇이 디스코드 채널에 메시지를 보내도록_ 만들어놨다.

처음에는 `express.js`로 만들었고, 추후에 `nest.js`로 리팩토링했다.

- 기술스택
  - node.js
  - nestjs
  - vue.js => CMS를 만들려고 추가했는데 만들다 말았다.
  - [Discord API](https://discord.com/developers/docs/intro)
  - [Discord Bot](https://discord.com/developers/docs/topics/oauth2#bots)
  - [Github Webhooks](https://docs.github.com/en/free-pro-team@latest/developers/webhooks-and-events/about-webhooks)

봇을 만든 후에 다음과 같은 추가 기능을 CMS 페이지를 통해 구축하려고 했다.

- **Github 관련**
  - Github 로그인
  - Github Repository 불러오기
  - Github Repository를 선택하면 관련된 Hooks 불러오기
  - Hooks를 추가/수정/삭제하기
  - Hooks와 관련된 템플릿 작성하기
- **Discord 관련**
  - Discord 로그인
  - Discord 채널 목록 불러오기
  - Discord의 채널 ID 복사하기
- **Discord와 Github 연동 관련**
  - Github Hooks에 Discord Channel ID 연결하기

그런데 곰곰이 생각해보니 굳이 만들 필요가 없었고, 추후에 **channel ID만 parmeter를 받아오는 형태로 수정**했다.

몇 개월 동안 유용하게 잘 사용 중이다.

***

#### (3) Devears

Discrod Bot을 만든 후에 블랙커피 스터디와 리액트 스터디, 그리고 넥스트 스텝 리뷰어 활동 때문에 따로 사이드 프로젝트를 수행할 틈이 없었다.
그렇게 연말이 되었고, 기존에 이어서 하기보단 아예 새로 사이드 프로젝트를 진행하고 싶었다.

기술 스택은 Spring과 React을 사용하기로 결정했고,
어떤 주제로 할까 고민하다가 현재 [운영중인 스터디](https://github.com/dku-study)를 관리할 수 있는 서비스를 만들어보기로 했다.

::: tip Devears
- 단국대의 상징이 곰(Bear)이다.
- Developer(개발자) + Bear(곰) = Devears
- 즉, 단국대 개발자들이라는 뜻을 가졌다고 볼 수 있다.
:::

11월에는 Back-end 위주로 작업 했는데 사실 정확히 어떤 기능을 추가할지 정해놓질 않아서 갈팡 질팡 하는 중이다.
현재 까지 구현한 기능은 Github 로그인과 토큰 발급, 그리고 로그아웃이 전부이다.
뭐.. 거의 안 한 것과 다름 없다

12월에는 대충(정말 대충..) [요구사항 문서](https://dku-study.github.io/Devears/)를 작성했고, Front-end 위주의 작업을 진행했다.

![10](./10.png)

로고는 [logogenie](https://www.logogenie.net/)에서 검색하여 나온 결과물 중에 마음에 드는 것을 참고하여 대충 급하게 만들었다.
실제로 서비스 하기 전에 외주를 맡기던가 할 생각이다.

이렇게 혼자서 무언가를 만들 때면 항상 UI 구성이 때문에 고민이다.
어떻게 만들어도 이상하게 보이는 마법이랄까..?
일단 죽이 되든, 밥이 되든 만들어 보고자 한다.

::: tip Front-end 기술 스택
현재까지 진행하면서 사용한 **프론트엔드 기술 스택**은 다음과 같다.

- typescript
- Create React App
- react
- redux
- redux-saga
- react-router-dom
- connected-react-router
- antd
- styled-jsx
- sass
- json-server
:::

::: tip  위의 기술을 사용하면 정리한 팁들이다.

- Create React App Custom
  - [CRA로 만든 리액트 프로젝트에서 eject하지 않고 optional chaining 사용하기](https://sustainable-dev.tistory.com/126)
    - customize-cra
    - react-app-rewired

- React Router Layout
  - [React Router](https://reactrouter.com/web/guides/quick-start)
  - [Reusing layouts in React Router 4](https://simonsmith.io/reusing-layouts-in-react-router-4)
  - [React Router v4 with multiple layouts](https://stackoverflow.com/a/46201798)

- Mock API
  - [json-mockServer - 벨로퍼트와 함께하는 모던 리액트](https://react.vlpt.us/redux-middleware/08-json-mockServer.html)
  - [github/json-mockServer](https://github.com/typicode/json-mockServer)

- Proxy
  - [CRA - Proxying API Requests in Development](https://create-react-app.dev/docs/proxying-api-requests-in-development)
  - [Create-react-app V2 릴리즈! 무슨 변경 사항이 있을까?](https://velog.io/@velopert/create-react-app-v2#5-proxy-%EC%84%A4%EC%A0%95%EC%9D%84-%EC%BB%A4%EC%8A%A4%ED%84%B0%EB%A7%88%EC%9D%B4%EC%A7%95-%EA%B0%80%EB%8A%A5)

:::

이번에는 사용한 기술에 대해서 제대로 정리해볼 생각이다.

***

#### (4) 단쿠키 개발팀 합류

::: tip 단쿠키

- [단쿠키](https://www.dankookie.com/)는 나의 모교인 단국대학교 커뮤니티 사이트이다.
- [에브리타임](https://everytime.kr/)이 등장하기 전까진 굉장히 활성화된 커뮤니티였는데, _에브리타임 덕분에 이용자수가 대폭 감소했다._

:::

나는 **에브리타임**이라는 대학교 커뮤니티를 자주 사용하는 편이다.
개발과 관련된 정보를 공유하기도 하고, 진로에 대해 고민하는 후배들과 이야기를 나누는 등의 소통 창구로 사용하고 있다.

그러던 중 눈에 띄는 글을 하나 발견했다.
> 글을 캡쳐해서 올릴라 했는데.. 지금 찾아보니 삭제됐다. 아쉬운대로 단쿠키에 올라온 글을 캡쳐해서 올린다.

![7](../11-November/7.jpg)

보자마자 지원하고 싶다는 생각을 했다.
그런데 나는 졸업생이다보니 이걸 지원해야하나 말아야하나 고민하다가 졸업생도 지원 가능한지 물어보는 댓글을 남겼고, 가능하다는 답변을 받았다.

![8](../11-November/8.jpg)

그래서 고민 끝에 지원했다.

![9](../11-November/9.jpg)

이렇게 코딩 테스트 및 온라인 면접 일정을 잡고 진행했다.
코딩 테스트 문제 자체는 어렵지 않았으나, 내가 너무 어렵게 생각해서 조금 헤맸다.

이 외에도 다양한 면접 질문을 받았는데 내가 생각하지도 못했던 부분들이 있어서 조금 당황했다.
_당황했던 질문들은 대체로 보안과 관련된 질문이었고, 내가 보안과 관련된 도메인에 약하다는 것을 인지했다._
덕분에 공부할 것들이 늘었다 😅

여담으로, 학부시절에 같이 단쿠키측에서 함께 하고 싶은 의향 있으면 연락 달라고 했었는데 그 당시에는 정말 미친듯이 바빠서 아예 연락을 하지 않았다.
당시에 작은 에이전시 회사에서 원격근무도 하고 있었고, 학부 연구생도 하고 있었고, 같은 학부 연구생들과 정부 과제도 하고 있었고, 고등학교 강사도 하고 있었다.
거기에 수업에 시험에 과제에 이것 저것 다 포함하면.. 거기서 무언가를 더 할 엄두가 나질 않았다.

![10](../11-November/10.jpg)

어쨌든 12월에 대면 면접을 거치면 결과를 알 수 있겠지 싶다.

그렇게 12월 초에 일정을 잡고 대면 면접을 진행했다.
면접 장소는 학교 근처였는데 오랜만에 학교 구경좀 하려고 아침 일찍 갔다.

![6](../12-December/6.jpg)
![5](../12-December/5.jpg)

교내에 있는 세미나실에서 근무시간 동안 일도 하고, 오랜만에 학교 근처 맛집에서 점심도 먹었다.
그토록 졸업하고 싶었고, 벗어나고 싶었던 곳인데 그래도 학교 다닐 때가 지금 보단 더 마음 편하고 즐거웠던 것 같다.

이러 저러한 할 일을 처리하고 나의 근무 시간이 끝난 후에 대면 면접을 진행했다. 
면접 분위기는 무척 좋았고, 단쿠키라는 서비스에 대한 여러가지 사정을 들을 수 있었다.
여태까지 학생 신분으로 보상도 없이 서비스를 유지하느라 많이 힘들었던 것 같고,
운영진이 얼마나 이 서비스에 애정을 가지고 있는지 느껴졌다.

![7](../12-December/7.jpg)

이렇게 나도 단쿠키 개발팀에 합류하게 되었다.
일정이 조금 촉박한 것 같아서 걱정이지만 **걱정보단 기대가 더 앞선다.**

그렇게 월말이 되었고 다시 단쿠키에서 메일이 왔다.
슬랙 채널을 통해 커뮤니케이션이 진행되는 것 같다.

![8](../12-December/8.jpg)

글을 작성하는 시점을 기준으로 어제(12/30) 회의를 진행했다.
아직 결정된게 많진 않지만 재밌을 것 같다.

***

### 3. 인터넷 강의

나는 인터넷 강의를 좋아하는 편이 아니다.
사실 여태까지 인터넷 강의의 필요성을 크게 느끼지 못했달까?
그런데 입사 후에는 아무리 생각해도 혼자서 공부하기엔 벅찬 부분이 많아서 꽤 많은 인터넷 강의를 들었다.

사실 다른 사람들에 비하면 많이 듣진 않았으나 그냥 내 기준으로 올 해는 많이 본 편이다.

- [코드스피츠](https://www.youtube.com/channel/UCKXBpFPbho1tp-Ntlfc25kA)
  - [85기 - 거침없는 자바스크립트](https://www.youtube.com/watch?v=0NsJsBdYVHI&t=2900s)
  - [86기 - 객체지향 자바스크립트](https://www.youtube.com/watch?v=E9NZ0YEZrYU&t=4031s)
  - [88기 - async/await](https://www.youtube.com/watch?v=H_Hb9IF7sfc)
  
- [인프런](https://www.inflearn.com/)
  - [예제로 배우는 스프링 입문 (개정판)](https://www.inflearn.com/course/spring_revised_edition/dashboard)
  - [스프링 부트 개념과 활용](https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8/dashboard)
  - [더 자바, 코드를 조작하는 다양한 방법](https://www.inflearn.com/course/the-java-code-manipulation/dashboard)
  - [함수형 프로그래밍과 javascript ES6+](https://www.inflearn.com/course/functional-es6/dashboard)

- [패스트 캠퍼스](https://auth.fastcampus.co.kr/sign-in?client_id=fc%3Aclient%3Awww&response_type=token&redirect_uri=https%3A%2F%2Fwww.fastcampus.co.kr%2Fonline_category%2F%3Fgclid%3DCjwKCAiA57D_BRAZEiwAZcfCxaJChqY6DQLK2hwE1ZOTg-kZ-OJe3mPLbEU81L5O4yLUQbpA8EceCBoCNMgQAvD_BwE&scope=www)
  - [React와 Redux로 구현하는 아키텍쳐와 리스크 관리](https://www.fastcampus.co.kr/dev_red_kmt)

제일 유용했던 강의는 [더 자바, 코드를 조작하는 다양한 방법](https://www.inflearn.com/course/the-java-code-manipulation/dashboard)와 [코드스피츠](https://www.youtube.com/channel/UCKXBpFPbho1tp-Ntlfc25kA) 시리즈다.

강의 내용을 보고 정리를 하고 싶었는데, 일단 코드스피츠의 내용의 일부만 정리했다.

_86기 객체지향 자바스크립트(Object Oriented Javascript)_

- [1회차 - 객체지향 프로그래밍의 목적과 원칙](/CodeSpitz/Object-Oriented-Javascript/01-Intro/)
- [2회차 - MVVM System 구축](/CodeSpitz/Object-Oriented-Javascript/02-MVVM/)
- [3회차 - MVVM System 개선 (1)](/CodeSpitz/Object-Oriented-Javascript/03-Strategy-Observer/)
- [4회차 - MVVM System 개선 (2)](/CodeSpitz/Object-Oriented-Javascript/04-ISP-Visitor/)
- [5회차 - MVVM System 개선 (3)](/CodeSpitz/Object-Oriented-Javascript/05-Extension/)

코드스피츠는 유튜브에서 무료로 볼 수 있으며, 내용 또한 쉽지 않다. 더불어 [Bsidesoft 블로그](https://www.bsidesoft.com/)에 올라온 글을 같이 보면 더욱 도움이 많이 된다.

***

### 4. 스터디

#### (1) DKU-STUDY

![11](./11.jpg)

4월 말에 취업 준비 중이던 [여자친구(같은과 후배)](https://github.com/eyabc)가 뜬금없이 [알고리즘 스터디](https://dku-study.github.io)를 같이 하자고 했다.
스터디 구성원은 먼저 에브리타임을 통해서 모집하고, 추가로 알고 지내던 후배들 중 같이 하고 싶은 의향이 있는 사람들을 초대했다.

![15](./15.png)

> 이렇게 무척 대충(?) 모집 공고를 올렸는데 지원해준 사람이 있어서 신기했다.

스터디를 하면서 느낀점은,

- 알고리즘을 풀이할 때 다른 사람들의 생각을 직간접적으로 알 수 있다는 것 자체가 큰 도움이 된다.
- 보편적인 솔루션을 만드는 사람도 있고, 기상천외(?)한 방법으로 문제를 해결하는 사람도 있다.
- 같이 하는 공부라서 생각보다 외롭지 않고 의지를 갖게 해준다.
- 같이할 수 있는 다양한 것들을 시도해볼 수 있다.
- 다양한 정보를 빠르게 모을 수도 있고, 전파할 수도 있다.

그렇게 3개월 정도 운영을 하다가 인원이 더 있어도 좋을 것 같아서 스터디원을 더 모집했다.

![16](./16.png)

그리고 알고리즘 이외에도 javascript 면접 스터디가 한 학기 정도 진행했다.
사실 내가 주도한 것도, 참여한건 아니지만 _구성원들간에 규칙을 세우고 꾸준히 하는 모습이 무척 인상깊었다._ 

![17](./17.jpg)
![18](./18.jpg)

- 한 주에 한 개의 주제에 대해 정리하고 공유하며 피드백을 남기도록 했다.
- 7월에 시작했고, 12월까지 계속 진행 중이다.

7월 이후에 스터디 모집을 하고 있다는 글을 올려놓진 않았지만 _이메일, 깃허브, 그리고 구성원의 소개 등으로 계속 유입 중이다._

![19](./19.png)

![12](./12.png)

그렇게 8개월 동안 약 20명 이상의 사람들이 모였다.
내년에 잘 굴려보면 최소 50명에서 최대 100명 정도의 사람이 모일 수 있지 않을까?

***

그리고 타 학교 사람들과 스터디 운영에 대해서 궁금한 점을 메일로 주고 받기도 했다. 

![13](./13.png)

![14](./14.png)

이렇게 연락을 주시는 분들 덕분에 더 열심히 잘 운영해야겠다는 생각이 든다.

올해는 이제 다 지나갔으니, 내년에는 스터디를 조금 더 체계적으로 관리할 생각이다.

지금은 알고리즘 위주의 스터디를 진행하고 있지만, 취업이나 면접 스터디 혹은 Java나 Javascript, 혹은 영어 스터디 등으로 영역을 조금씩 넓혀갈 예정이다.

***

#### (2) 블랙커피 스터디

매달 `NextStep`에서 메일로 뉴스레터를 보내주고 있다. 그런데 눈에 띄는 항목이 보였다.

![image01](https://user-images.githubusercontent.com/18749057/96161643-80594100-0f52-11eb-8254-76e542afff4c.png)

**처음으로 Javascript Study가 진행되고 있다는 내용**이다.
**무료로 신청**할 수 있었기 때문에 고민 없이 바로 신청했다.

::: tip 블랙 커피 스터디

- **훌륭한 의사소통은 블랙커피처럼 자극적이며, 후에 잠들기가 어렵다** 라는 문장에 감명 받아 `블랙 커피 스터디`라고 짓게 되었다고 한다.
- 이름의 유래에서 유추할 수 있듯 함께 좋은 커뮤니케이션으로 통찰을 이끌어내고, 그 통찰과 함께 성장하고, **소프트웨어 장인으로 거듭나기가 목표**인 스터디이다.
  
  - 소프트웨어 장인이란?
    - 동작하는 소프트웨어를 정교하고 솜씨있게 만들 수 있는 것
    - 변화에 대응하는것 뿐만이 아니라, 계속해서 가치를 더하는 것
    - 개별적으로 협력하는 것 뿐만이 아니라, 프로페셔널 커뮤니티를 조성하는 것
    - 고객과 협업하는 것 뿐만 아니라, 생산적인 동반자 관계를 추구하는 것
  
- 이 스터디는 위와 같은 목표를 달성하기 위해서 `페어 프로그래밍`과 `코드리뷰`라는 수단을 이용한다.

:::

#### 1) lv1. TodoList

9월에 블랙커피 스터디의 존재를 인지하고 `Level 01`을 신청했다.

![21](./21.png)

스터디 진행은 다음과 같이 진행 된다.

![22](./22.png)

요약하자면 다음과 같다.

::: tip 미션 요약

- 주 1회 온라인 세션을 통한 미션 소개 및 회고
- 주 2회 페어프로그래밍
- 코드리뷰

:::

미션이 어렵진 않았고, 시간적 여유도 충분히 있었기 때문에 첫 주에 1~3주 미션을 모두 수행했다.

- `1주차` Todo App 만들기
  - [Document Object Model](https://www.youtube.com/watch?v=1yADBI27NCg)
  - [Browser Object Model](https://www.youtube.com/watch?v=BYRTKmPAr8c)
  - [Event](https://www.youtube.com/watch?v=u49E4_4hyeI)
- `2주차` API 연동
- `3주차` SPA 만들기 (Router 사용하기)

이 정도의 난이도가 수준 높은 코드를 만들기 위한 적합한 미션이라고 생각한다.
현재 보다 더 어렵거나 쉬웠다면 설계에 집중하기가 힘들었을 것 같다.

그리고 페어 프로그래밍은 총 3회를 참여했으며 같이 미션을 구현하거나, 혹은 미션 진행에 필요한 라이브러리를 구현하는 방향으로 진행했다.
이러한 과정을 통해서 혼자 고민하던 것들에 대해 즉각적으로 피드백을 주고 받으며 잘못된 점이나 개선 점을 찾아낼 수 있었고,
고스란히 내 코드에 녹였다.

다만 페어와의 실력차이가 심할 경우에는 페어프로그래밍 보단 실시간 강의(?)가 될 수 있으니 어느 정도 운도 따라야한다.

이 과정에서 도출한 코드는 다음 링크에서 확인해볼 수 있다.

- [전체 내용 정리](https://github.com/junilhwang/black-coffee-study)
- Step 01
  - [소스코드](https://github.com/junilhwang/js-todo-list-step1)
  - [데모](https://junilhwang.github.io/black-coffee-study/step1)
- Step 02
  - [소스코드](https://github.com/junilhwang/js-todo-list-step2)
  - [데모](https://junilhwang.github.io/black-coffee-study/step2)
- Step 02
  - [소스코드](https://github.com/junilhwang/js-todo-list-step3)
  - [데모](https://junilhwang.github.io/black-coffee-study/step3)
  
더 상세한 내용은 [9월 회고](https://junilhwang.github.io/TIL/Review/2020-year/09-September/#_1-black-coffee-study)에서 확인할 수 있다.

***

#### 2) Lv2. 프론트엔드 테스트

![23](./23.png)

> `lv2`는 `lv1`에서 만든 코드로 테스트하기 때문에 `lv1`를 꼭 먼저 수료해야한다.  

부끄럽게도 나는 프론트엔드 테스트를 제대로 공부해본적이 없다. 아직 테스트의 중요성을 제대로 인식하지 못한 것도 있고, 귀찮음도 한 몫 하고 있다.
그래서 이번 기회에 테스트를 공부해보고 싶어서 바로 신청했다.

![11월 12](../11-November/12.jpg)

`lv2`는 다음과 같은 것들에 대해 학습한다.

- unit test
  - [학습 내용(Pull Request) 확인](https://github.com/next-step/js-test-basic-step1/pull/1)
  - [jest](https://jestjs.io/)를 이용한다.
    ::: tip jest
    jest는 페이스북에서 만든 자바스크립트 테스팅 라이브러리이며  오픈소스(MIT)이다.
    - 현재 페이스북 내의 모든 자바스크립트 테스트에 사용됨
    - 테스트 러너 / 구조화 / 단언 / 테스트 더블 등의 기능을 모두 포함
    - Node 환경에서 JSDom을 이용해 테스트 (브라우저 테스트 불가)
    - 테스트를 병렬로 수행해서 속도를 높임
    - Zero Configuration : 설정 없이 간단하게 실행할 수 있음
    :::
  - Counter Test를 구현하는 것이 미션이었다.
  - 테스트코드를 먼저 작성하고, 이에 적합한 Counter를 구현했다.
  
- ui test
  - [학습 내용(Pull Reqest) 확인](https://github.com/next-step/js-test-basic-step2/pull/3)
  - [jest-dom](https://testing-library.com/)을 이용한다.
  - [Queries](https://testing-library.com/docs/dom-testing-library/api-queries/)와 [Async Utilites](https://testing-library.com/docs/dom-testing-library/api-async/) 문서를 많이 참고했다.
  - 특히, `wait` `waitFor` `waitForDomChange` 등의 API를 사용하는 방법이 무척 헷갈렸고, `waitFor`의 경우 IDE 자동완성을 사용하면 `babel`을 불러와서 당황스러웠다.
  - 비동기 테스트(API 테스트)의 경우 [axios mock adapter](https://github.com/ctimmerm/axios-mock-adapter) 혹은 [fetch mock](https://github.com/wheresrhys/fetch-mock) 등을 이용했는데 처음에 사용 방법을 착각해서 삽질을 많이 했다.
    ```js
    // mockAxios 초기화
    const mockAxios = new MockAdapter(axios);
    
    // Mock Request와 Response 정의
    mockAxios.onGet('/users').reply(200, {
    users: [{ id: 1, name: 'John Smith' }]
    });
    
    // API 요청시 Mock Response 를 반환함
    axios.get("/users")
    .then(({ data }) => console.log(data)); // { id: 1, name: 'John Smith' }    
    ```
    그리고 다음과 같이 한 번에 표현할 수도 있다.
    ```js
    const counter = createCounter({ min: 8, max: 12, initVal: 10 });
    const response = () => ({
      value: counter.val(),
      isMax: counter.isMax(),
      isMin: counter.isMin()
    });
    
    mockAxios
      .onGet('/counter').reply(() => [200, response()])
      .onPut('/counter/inc').reply(() => (counter.inc(), [200, response()]))
      .onPut('/counter/dec').reply(() => (counter.dec(), [200, response()]))
    ```
  - 확실히 UI Test는 쉽지 않음을 느꼈다. 미션 자체가 삽질의 연속이었다.
  
- e2e test

unit test는 [jest](https://jestjs.io/)를 이용한다.



더 상세한 내용은 [12월 회고](https://junilhwang.github.io/TIL/Review/2020-year/12-December/#_4-%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A2%E1%86%A8%E1%84%8F%E1%85%A5%E1%84%91%E1%85%B5-%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5%E1%84%83%E1%85%B5-%E1%84%85%E1%85%A6%E1%84%87%E1%85%A6%E1%86%AF-2)에서 확인할 수 있다.

#### (3) 블로그 스터디

#### (4) 프로그래머스 리액트 스터디

#### (5) 사내 리액트 스터디

***

### 5. 리뷰어 활동

#### (1) 넥스트 스텝

#### (2) 부스트 캠프

***

### 6. 강사

#### (1) 서울디지텍고등학교

#### (2) 인천금융고등학교

***

### 7. 프로그래머스 챌린지

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