---

title: 2020년 7월 회고
description: 2020년 7월 회고 입니다.
date: 2020-08-02
sidebarDepth: 2
feed:
  enable: true

---

# 2020년 7월 회고

7월은 개발 서적, 특히 javascript의 core에 대한 서적을 많이 읽었다.

## 공적

회사에서는 CMS 개발, API 분리, 크롬 확장프로그램 검수 위주의 일을 진행했다.

### 1. 크롬 확장프로그램

[5월 회고](../05-May/)와 [6월 회고](../06-June/)에 이어 확장프로그램과 관련된 일에 고통받고 있는 중이다.

6월에 1차 개발이 완료 되었고, 7월 말에 프로젝트 완료보고를 진행했다.
사실 7월에 뭔가 기능을 확장하거나 하진 않았고, 버그 수정만 했는데 문제는.. 검수가 너무 오래걸린다.

#### (1) 지긋지긋한 검수 과정

단지 UI를 수정했을 뿐인데 계속 사용자 데이터 보호와 관련된 내용으로 반려되고 있다.
모든 호스트 권한을 https로 변경하면 잘 작동하지만, 검색줌 같은 경우에는 아직 http를 사용하고 있어서 문제가 되고 있다.

검색줌만 https로 전환 되면 완벽한데.. 생각보다 일정이 지연되고 있는 상황.

여기서 무엇을 어떻게 얼마나 더 해야 좋을지 고민 중이다.

#### (2) 프로젝트 완료보고

입사 후 처음으로 프로젝트 완료보고 발표를 했다.
사장님이 참여하시는 줄 알고 꽤나 공들여 준비했는데, 불행인지 다행인지 참관하시진 않았다. ~~다행인듯~~

::: tip 프로젝트 완료보고
줌인터넷은 진행하던 프로젝트가 어느정도 마무리되면 프로젝트 완료보고를 진행한다.\
다른 팀과 프로젝트의 의의, 목적, 성과 그리고 기술스택 등을 공유한다.\
~~그런데 우리 팀만 하는 것 같다.~~
:::

발표는

1. 개요
2. 확장프로그램 개발과정
3. 확장프로그램 배포과정
4. 프로젝트 구조
5. 검수과정
6. 앞으로의 계획

순서로 진행했다.

**줌인터넷**이라는 회사는 참 좋은 회사지만,
**줌**이라는 서비스에는 아쉬움이 많기에 개인적으로 사내에서 이런 서비스를 많이 만들어 봤으면 하는 바람이 있다.

불행인지 다행인지, 회사에서 개발직군이 할 수 있는 것은 개발 밖에 없다.
어쨌든 개발자로서 최대한 좋은 퀄리티의 서비스를 만드는 것이 회사에 헌신하는 방법인 것 같다.

### 2. CMS 작업

이번 달의 주요 업무는 핫이슈 CMS를 개발이었다. 현재 UI 개발까지 완료된 상태이다.

::: tip 줌프런트의 핫이슈 영역

[<img src="https://user-images.githubusercontent.com/18749057/89117592-f3b5ef80-d4d9-11ea-9470-ddb68c4d6076.png" alt="줌프런트의 핫이슈" width="400" />](https://zum.com)

기획자가 핫이슈 영역에 들어갈 링크와 이미지를 직접 작업해서 올린다. 현재 뉴스 CMS에 붙어 있는데, 이걸 줌프런트 CMS로 분리하는 과정이 필요한 상태.

:::

CMS페이지는 Vue-element-admin을 이용하여 작업했다. 다만 Vue-element-admin의 경우 쓸데없는 패키지가 많고,
보일러플레이트 자체가 매우 무겁기 때문에 필요한 컴포넌트만 가져다 사용 중이다.

이번 CMS 작업이 조금 까다로운 점은,
기존에는 뉴스 파트에서 작업하여 뉴스 API에 데이터를 얹어서 보내줬다면 이제는 아예 **줌프런트 파트에서 모든 것을 작업해야 한다는 점**이다.

- CMS만 만들면 되는 것이 아니라 CMS에서 정제한 데이터를 기반으로 새로운 API를 만들어야 한다.
- 미리보기 기능까지 있기 때문에 미리보기와 관련된 도메인에서 페이지를 요청할 경우, 실서비스 데이터 데신에 미리보기 데이터로 구성해서 보여줘야 한다.

따라서 핫이슈 CMS 하나 때문에 Internal API, Zum Front CMS, Zum Lego 등의 프로젝트에서 작업해야 한다.
CMS 하나 때문에 최초 배포에 필요한 프로젝트만 3개인 것이다.

원래 이번 달까지 마무리 했어야 했지만, 같이 작업하는 팀원이 다른 일을 진행하느라 약간 지연되고 있다.
8월에는 마무리할 수 있을 것 같다.    

### 3. API 분리 작업

현재
[모바일줌](https://m.zum.com),
[줌프런트](https://zum.com),
[크롬 확장프로그램](https://chrome.google.com/webstore/detail/zum-newtab/bghgeookcfdmkoocalbclnhofnenmhlf)
[줌 앱](https://play.google.com/store/apps/details?id=com.zum.android.search&hl=ko)
등을 포함하여 **최소 4개 이상의 서비스**에서 Internal API를 사용하고 있다.
_즉 Internal API가 매우 비대하다._

이 중에서 배포 비중을 가장 많이 차지하고 있는 것은 모바일줌과 관련된 _Mobile API_ 이다.
그래서 Mobile API를 분리하기로 하였다.

- Mobile API는 데이터베이스를 사용하지 않기 때문에 **데이터베이스와 관련된 모든 의존성을 제거**했다.
- 기존의 **캐싱 로직**을 리팩토링 했다.
- 버전업이 되면서 **필요 없어진 코드를 제거**했다.
- 사내의 IDC 인스턴스로 사용하던 것을 **도커 컨테이너**와 **쿠버네티스**로 전환했다.

이 중 제일 큰 시간이 소요된 것은 캐싱 로직 변경이다.
**약 100개 이상의 파일**을 수동으로 작업했다.

하지만.. 꼭 필요한 작업이였기 때문에.. ~~울며 겨자먹기로~~ 할 수 밖에 없었다.

Mobile API의 분리는 거의 끝났다. 서비스존 배포까지 완료된 상태이기 때문에 _8월 중에_ 모바일줌에 적용하지 않을까 싶다.

그 다음에 **Internal API에서 Mobile API를 제거하는 작업**도 필요하다. ~~싹 다 지워~!~~

## 사적

이번 달은 **카카오 면접** 덕분에 주로 Javascript 관련 서적을 읽고, 코딩 인터뷰를 준비했다.

### 1. 디스코드 봇

![디스코드 봇](https://user-images.githubusercontent.com/18749057/89118668-5a3f0b80-d4e2-11ea-825d-9909b0026de0.png)

6월에 [DKU-STUDY](https://github.com/DKU-STUDY/) 채팅방을 디스코드로 옮기면서 [디스코드 봇](https://github.com/JunilHwang/discord-study-bot)을 만들었다.

현재 _Pull Request, Push, Issue, Review 등이 발생하면 디스코드 봇이 디스코드 채널에 메세지를 보내도록_ 만들어놨다.

일단 목표로 하는 기능은 다음과 같다.

- **Github 관련**
  - Github 로그인 (완성)
  - Github Repository 불러오기 (완성)
  - Github Repository를 선택하면 관련된 Hooks 불러오기 (완성)
  - Hooks를 추가/수정/삭제하기
  - Hooks와 관련된 템플릿 작성하기
    - Pull Request
    - Code Review
    - Issue Comment
    - Push
- **Discord 관련**
  - Discord 로그인
  - Discord 채널 목록 불러오기
  - Discord의 채널 ID 복사하기
- **Discord와 Github 연동 관련**
  - Github Hooks에 Discord Channel ID 연결하기

Github 로그인은 일단 **Basic Auth**로 만들었는데, 이걸 **OAuth**로 수정해야 하나 고민중이다.
아무래도 _로그인과 관련된 권한은 최소화할 수록 좋은 것 같다._

사이드 프로젝트를 진행하면서 Github API에는 충분히 익숙해졌기 때문에 만드는데 큰 무리는 없다.

다만, 카카오 면접 준비 때문에 일시 중단됭 상태다. 8월 부터 다시 만들어야지.. ㅋㅋ

### 2. 카카오 면접

5월에 재미로 친구들과 같이 [카카오 경력 개발자 영입 - 프론트엔드 개발 챌린지](https://programmers.co.kr/competitions/151/2020-kakao-fe-recruitment)에 지원했다.

- 6월 첫째주에 **알고리즘 테스트**를 봤다.
  - 3문제 중에 2문제를 풀었고, 무조건 탈락이구나 생각했는데 통과해버렸다.
  - 같이 응시한 친구들 중에서 혼자 합격했다.
  - 쓸쓸했다... 쳇
- 6월 둘째주에 **프런트엔드 테스트**를 봤다. 필수 요구사항은 다 해결했고, 추가 요구사항에서 고전했다.

***

- 7월 첫째주에 프런트엔드 테스트에 대한 코드리뷰 및 결과 발표를 안내받았다.\
  상위 13% 성적으로 합격했다.\
  ![코드 리뷰](https://user-images.githubusercontent.com/18749057/89118842-033a3600-d4e4-11ea-8d3d-2040baf201d8.png)
- 이력서를 작성했고, FE플랫폼 팀의 **비즈니스 서비스 파트**와 **티스토리,브런**파트에 지원했다.
  - 비즈니스 서비스 파트에 친한 친구가 근무하고 있다.\
    그 친구를 존경하고 좋아했기 때문에 같이 일해보고 싶었고 그래서 지원했다.
- 7월 둘째주에 면접 과제를 풀이했다
  - 이 때 직접 **반응형 시스템**을 구축하여 풀이했다.
  - 프런트엔드 과제에 대한 **코드 리뷰를 반영**했다.
- 7월 셋째주에 **1차 인터뷰**를 진행했다.\
  <img alt="1차 인터뷰 안내" src="https://user-images.githubusercontent.com/18749057/89119015-c8d19880-d4e5-11ea-9ac4-4e0fb6060ed1.png" width="400" />
  - 인사이드 자바스크립트, 코어 자바스크립트, 각종 코딩 인터뷰 포스팅 및 레포, 프레임워크 관련 서적을 참고했다.

***

- 7월 넷째주에 **1차 인터뷰 합격**을 안내 받았다.\
  <img alt="1차 인터뷰 합격" src="https://user-images.githubusercontent.com/18749057/89119025-e0108600-d4e5-11ea-9fb1-91c1c88b04fb.png" width="400" />
  - 원래 한 시간 인터뷰인데, 한 시간 반 정도 진행했다.
  - 사실 애매하게 대답한 부분들이 있어서 큰 기대를 하지 않았는데, 1차까지 합격했다.

***
  
- 7월 다섯째주에 **2차 인터뷰**를 진행했다.
  - 1차 인터뷰와 마찬가지로 원래 한 시간 인터뷰인데, 한 시간 반 정도 진행했다.
  - 긍정적인 신호라고 받아들여도 되겠지..?

***

그리고 **내일(8/3 월)** 최종 합격에 대한 안내를 받을 것 같다... 긴장 되서 미칠 지경

#### (1) 반응형 시스템 구축

면접 과제를 준비하면서 과제를 어떤 식으로 풀이해야 좋을지 고민하는 하다가 Vue와 같이 MVVM 시스템을 직접 구축해서 사용하는 것을 목표로 하여 공부했다.

이 때 참고한 자료는 다음과 같다.

- **Taost Meetup**의 [0.7KB로 Vue와 같은 반응형 시스템 만들기](https://meetup.toast.com/posts/188)
- **코드스피츠 86기** [객체지향 자바스크립트, MVVM](https://www.youtube.com/watch?v=E9NZ0YEZrYU&t=3320s)
- 그리고 위의 내용을 정리한 나의 포스트
  - [객체지향의 기본 이론](http://localhost:8080/TIL/CodeSpitz/Object-Oriented-Javascript/01-Intro/)
  - [MVVM System 만들기](http://localhost:8080/TIL/CodeSpitz/Object-Oriented-Javascript/02-MVVM/)
  - [MVVM System 개선 (1)](http://localhost:8080/TIL/CodeSpitz/Object-Oriented-Javascript/03-Strategy-Observer/)
  - [MVVM System 개선 (2)](http://localhost:8080/TIL/CodeSpitz/Object-Oriented-Javascript/04-ISP-Visitor/)
  - [MVVM System 개선 (3)](http://localhost:8080/TIL/CodeSpitz/Object-Oriented-Javascript/05-Extension/)

처음에는 Proxy를 이용하여 Component Class를 만들었다.

```js{11,51-61}
export class Component {
  $target; $components; $eventEmitter; $eventListener; $stores;
  $data = {};
  $observable = new Set();
  $proxyHandler = {};

  constructor($target, $components = {}) {
    this.$target = $target;
    this.$components = $components;
    this.init();
    this.observing();
    this.render();
    this.eventListening();
  }

  init() {
    this.$data = this._init();
    this.$stores = this._initStore();
  }
  _init () { return {} }
  _initStore () { return {} }

  render () {
    const { $target, $proxyHandler, $observable, $stores } = this;
    $proxyHandler.get = function (data, property, receiver) {
      $observable.add(property);
      return Reflect.get(...arguments);
    }
    const self = this;
    Object.values($stores).forEach(store => {
      store.setHandlerGet(function (data, property, receiver) {
        store.addObservable(property, self);
        return Reflect.get(...arguments);
      })
    })
    $target.innerHTML = this._render() || '';
    this.clearGetOfProxyHandler();
    this.setEvent();
  }
  _render () { }

  clearGetOfProxyHandler () {
    const { $proxyHandler, $stores } = this;
    delete $proxyHandler.get;
    Object.values($stores).forEach(store => store.removeHandlerGet())
  }

  setEvent () { this._setEvent(); }
  _setEvent () { }

  observing () {
    const self = this;
    const { $proxyHandler, observer } = this;

    $proxyHandler.set = function (data, property, value) {
      Reflect.set(...arguments);
      return observer.call(self, property);
    }

    this.$data = new Proxy(this.$data, $proxyHandler);
  }

  observer (property) {
    if (this.$observable.has(property)) this.render();
    return true;
  }

  eventListening () {
    this.$eventListener = {};
    this.$eventEmitter = new Proxy({}, {
      set: (object, property, value) => {
        this.$eventListener[property].call(this, value);
        return true;
      },
    })
  }

  $on (eventName, callback) {
    this.$eventListener[eventName] = callback;
  }

  $emit (eventName, payload) {
    this.$eventEmitter[eventName] = payload;
  }

}
```

`$data`에 Proxy를 씌워서, $data의 property 값이 변경되면 render를 실행시키는 방식으로 만든 것이다. 

#### (2) 독서

#### (3) 코딩 인터뷰 공부

### 3. Java Clean Code 9기 Reviewer

## 기타

### 1. 수영

### 2. 오버워치

## Summary