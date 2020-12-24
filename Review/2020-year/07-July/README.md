---

title: 2020년 7월 회고
description: 2020년 7월 회고 입니다.
sidebarDepth: 2
date: 2020-07-31

---

# 2020년 7월 회고

7월은 개발 서적, 특히 javascript의 core에 대한 서적을 많이 읽었다.

## 공적

회사에서는 CMS 개발, API 분리, 크롬 확장프로그램 검수 위주의 일을 진행했다.

### 1. 크롬 확장프로그램

[5월 회고](../05-May/)와 [6월 회고](../06-June/)에 이어 확장프로그램과 관련된 일에 고통받는 중이다.

6월에 1차 개발이 완료되었고, 7월 말에 프로젝트 완료 보고를 진행했다.
사실 7월에 뭔가 기능을 확장하거나 하진 않았고, 버그 수정만 했는데 문제는.. 검수가 너무 오래 걸린다.

#### (1) 지긋지긋한 검수 과정

단지 UI를 수정했을 뿐인데 계속 사용자 데이터 보호와 관련된 내용으로 반려되고 있다.
모든 호스트 권한을 https로 변경하면 잘 작동하지만, 검색줌 같은 경우에는 아직 http를 사용하고 있어서 문제가 되고 있다.

검색줌만 https로 전환 되면 완벽한데.. 생각보다 일정이 지연되고 있는 상황.

여기서 무엇을 어떻게 얼마나 더 해야 좋을지 고민 중이다.

#### (2) 프로젝트 완료 보고

입사 후 처음으로 프로젝트 완료 보고 발표를 했다.
사장님이 참여하시는 줄 알고 꽤나 공들여 준비했는데, 불행인지 다행인지 참관하시진 않았다. ~~다행인듯~~

::: tip 프로젝트 완료 보고
줌인터넷은 진행하던 프로젝트가 어느 정도 마무리되면 프로젝트 완료 보고를 진행한다.\
다른 팀과 프로젝트의 의의, 목적, 성과 그리고 기술 스택 등을 공유한다.\
~~그런데 우리 팀만 하는 것 같다.~~
:::

발표는

1. 개요
2. 확장프로그램 개발과정
3. 확장프로그램 배포과정
4. 프로젝트 구조
5. 검수 과정
6. 앞으로의 계획

순서로 진행했다.

**줌인터넷**이라는 회사는 참 좋은 회사지만,
**줌**이라는 서비스에는 아쉬움이 많기에 개인적으로 사내에서 이런 서비스를 많이 만들어 봤으면 하는 바람이 있다.

불행인지 다행인지, 회사에서 개발 직군이 할 수 있는 것은 개발밖에 없다.
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

원래 이번 달까지 마무리 해야 했지만, 같이 작업하는 팀원이 다른 일을 진행하느라 약간 지연되고 있다.
8월에는 마무리할 수 있을 것 같다.    

### 3. API 분리 작업

현재
[모바일줌](https://m.zum.com),
[줌프런트](https://zum.com),
[크롬 확장프로그램](https://chrome.google.com/webstore/detail/zum-newtab/bghgeookcfdmkoocalbclnhofnenmhlf),
[줌 앱](https://play.google.com/store/apps/details?id=com.zum.android.search&hl=ko)
등을 포함하여 **최소 4개 이상의 서비스**에서 Internal API를 사용하고 있다.
_즉 Internal API가 매우 비대하다._

이 중에서 배포 비중을 가장 많이 차지하고 있는 것은 모바일줌과 관련된 _Mobile API_ 이다.
그래서 Mobile API를 분리하기로 하였다.

- Mobile API는 데이터베이스를 사용하지 않기 때문에 **데이터베이스와 관련된 모든 의존성을 제거**했다.
- 기존의 **캐싱 로직**을 리팩토링했다.
- 버전업이 되면서 **필요 없어진 코드를 제거**했다.
- 사내의 IDC 인스턴스로 사용하던 것을 **도커 컨테이너**와 **쿠버네티스**로 전환했다.

이 중 제일 큰 시간이 소요된 것은 캐싱 로직 변경이다.
**약 100개 이상의 파일**을 수동으로 작업했다.

하지만.. 꼭 필요한 작업이였기 때문에.. ~~울며 겨자 먹기로~~ 할 수 밖에 없었다.

Mobile API의 분리는 거의 끝났다. 서비스존 배포까지 완료된 상태이기 때문에 _8월 중에_ 모바일줌에 적용하지 않을까 싶다.

그다음에 **Internal API에서 Mobile API를 제거하는 작업**도 필요하다. ~~싹 다 지워~!~~

## 사적

이번 달은 **카카오 면접** 덕분에 주로 Javascript 관련 서적을 읽고, 코딩 인터뷰를 준비했다.

### 1. 디스코드 봇

![디스코드 봇](https://user-images.githubusercontent.com/18749057/89118668-5a3f0b80-d4e2-11ea-825d-9909b0026de0.png)

6월에 [DKU-STUDY](https://github.com/DKU-STUDY/) 채팅방을 디스코드로 옮기면서 [디스코드 봇](https://github.com/JunilHwang/discord-study-bot)을 만들었다.

현재 _Pull Request, Push, Issue, Review 등이 발생하면 디스코드 봇이 디스코드 채널에 메시지를 보내도록_ 만들어놨다.

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
아무래도 _로그인과 관련된 권한은 최소화할수록 좋은 것 같다._

사이드 프로젝트를 진행하면서 Github API에는 매우 익숙해졌기 때문에 만드는 데 큰 무리는 없다.

다만, 카카오 면접 준비 때문에 일시 중단된 상태다. 8월 부터 다시 만들어야지.. ㅋㅋ

### 2. 카카오 면접 준비

5월에 재미로 친구들과 같이 [카카오 경력 개발자 영입 - 프론트엔드 개발 챌린지](https://programmers.co.kr/competitions/151/2020-kakao-fe-recruitment)에 지원했다.

- 6월 첫째 주에 **알고리즘 테스트**를 봤다.
  - 3문제 중에 2문제를 풀었고, 무조건 탈락이구나 생각했는데 통과해버렸다.
  - 같이 응시한 친구들 중에서 혼자 합격했다.
  - 쓸쓸했다... 쳇
- 6월 둘째 주에 **프런트엔드 테스트**를 봤다. 필수 요구사항은 다 해결했고, 추가 요구사항에서 고전했다.

***

- 7월 첫째 주에 프런트엔드 테스트에 대한 코드리뷰 및 결과 발표를 안내받았다.\
  상위 13% 성적으로 합격했다.\
  ![코드 리뷰](https://user-images.githubusercontent.com/18749057/89118842-033a3600-d4e4-11ea-8d3d-2040baf201d8.png)
- 이력서를 작성했고, FE플랫폼 팀의 **비즈니스 서비스 파트**와 **티스토리,브런**파트에 지원했다.
  - 비즈니스 서비스 파트에 친한 친구가 근무하고 있다.\
    그 친구를 존경하고 좋아했기 때문에 같이 일해보고 싶었고 그래서 지원했다.
- 7월 둘째 주에 면접 과제를 풀이했다
  - 이 때 직접 **반응형 시스템**을 구축하여 풀이했다.
  - 프런트엔드 과제에 대한 **코드 리뷰를 반영**했다.
- 7월 셋째 주에 **1차 인터뷰**를 진행했다.\
  <img alt="1차 인터뷰 안내" src="https://user-images.githubusercontent.com/18749057/89119015-c8d19880-d4e5-11ea-9ac4-4e0fb6060ed1.png" width="400" />
  - 인사이드 자바스크립트, 코어 자바스크립트, 각종 코딩 인터뷰 포스팅 및 레포, 프레임워크 관련 서적을 참고했다.

***

- 7월 넷째 주에 **1차 인터뷰 합격**을 안내받았다.\
  <img alt="1차 인터뷰 합격" src="https://user-images.githubusercontent.com/18749057/89119025-e0108600-d4e5-11ea-9fb1-91c1c88b04fb.png" width="400" />
  - 원래 한 시간 인터뷰인데, 한 시간 반 정도 진행했다.
  - 사실 애매하게 대답한 부분들이 있어서 큰 기대를 하지 않았는데, 1차까지 합격했다.

***
  
- 7월 다섯째 주에 **2차 인터뷰**를 진행했다.
  - 1차 인터뷰와 마찬가지로 원래 한 시간 인터뷰인데, 한 시간 반 정도 진행했다.
  - 긍정적인 신호라고 받아들여도 되겠지..?

***

그리고 **내일(8/3 월)** 최종 합격에 대한 안내를 받을 것 같다... 긴장 돼서 미칠 지경

#### (1) 반응형 시스템 구축

면접 과제를 준비하면서 과제를 어떤 식으로 풀이해야 좋을지 고민 하다가 Vue와 같이 MVVM 시스템을 직접 구축해서 사용하는 것을 목표로 하여 공부했다.

이 때 참고한 자료는 다음과 같다.

- **Taost Meetup**의 [0.7KB로 Vue와 같은 반응형 시스템 만들기](https://meetup.toast.com/posts/188)
- **코드스피츠 86기** [객체지향 자바스크립트, MVVM](https://www.youtube.com/watch?v=E9NZ0YEZrYU&t=3320s)
- 그리고 위의 내용을 정리한 나의 포스트
  - [객체지향의 기본 이론](http://localhost:8080/TIL/CodeSpitz/Object-Oriented-Javascript/01-Intro/)
  - [MVVM System 만들기](http://localhost:8080/TIL/CodeSpitz/Object-Oriented-Javascript/02-MVVM/)
  - [MVVM System 개선 (1)](http://localhost:8080/TIL/CodeSpitz/Object-Oriented-Javascript/03-Strategy-Observer/)
  - [MVVM System 개선 (2)](http://localhost:8080/TIL/CodeSpitz/Object-Oriented-Javascript/04-ISP-Visitor/)
  - [MVVM System 개선 (3)](http://localhost:8080/TIL/CodeSpitz/Object-Oriented-Javascript/05-Extension/)

처음에는 `Proxy`를 이용하여 Component Class를 만들었다.

`$data`에 Proxy를 씌워서, $data의 property 값이 변경되면 render를 실행시키는 방식으로 만든 것이다.

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

이 때 문제가 되는 점은, proxy의 경우 **IE에서 지원을 아예 안 한다.**

![Proxy 호환성](https://user-images.githubusercontent.com/18749057/89119627-bdcd3700-d4ea-11ea-8f68-a2920a3d0980.png)

그래서 `Object.defineProperty`로 변경했다.

```js{72-97}
export class Component {
  /** @type {HTMLElement|HTMLElementTagNameMap} **/
  $target;

  /** @type {Object.<string, Function>} **/
  $eventListener = {};

  /** @type {Object.<String, Store>} **/
  $stores;

  /** @type {Object.<String, any>} **/
  $data;

  /** @type {Set} **/
  $observable = new Set();

  /** @type {null|Function} **/
  $getDescriptor = null;

  /**
   * 컴포넌트 초기화
   * @param $target {HTMLElement|HTMLElementTagNameMap}
   */
  constructor($target) {
    this.$target = $target; // 컴포넌트의 태그 설정
    this.init(); // $data와 $stores 초기화
    this.observing(); // $data와 $stores의 값들의 변화 감지
    this.render(); // 렌더링
  }

  /** $data와 $stores 초기화 **/
  init() {
    this.$data = this._init();
    this.$stores = this._initStore();
  }
  _init () { return {} }
  _initStore () { return {} }

  /**
   * 렌더링
   */
  render () {
    this.setGetDescriptor(); // $data와 $stores의 state에서 렌더링에 필요한 property를 감지한다.
    this.$target.innerHTML = this._render() || ''; // 렌더링
    this.resetGetDescriptor(); // 렌더링이 종료된 후 감지를 제거한다.
    this.setEvent(); // 렌더링 후에 발생하는 이벤트 리스너 등록
  }
  _render () { }

  /** $data와 $stores의 state에서 렌더링에 필요한 property를 감지한다. **/
  setGetDescriptor () {
    this.$getDescriptor = key => this.$observable.add(key);
    Object.values(this.$stores).forEach(store => {
      store.setHandlerGet(key => store.addObservable(key, this))
    })
  }

  /** 렌더링이 종료된 후 감지를 제거한다. **/
  resetGetDescriptor () {
    this.$getDescriptor = null;
    Object.values(this.$stores).forEach(store => store.removeHandlerGet())
  }

  /** 렌더링 후에 발생하는 이벤트 리스너 등록 **/
  setEvent () { this._setEvent(); }
  _setEvent () { }

  /**
   * $data와 $stores의 state에 변화가 생기면, 렌더링 실행
   * 이 때 setGetDescriptor를 통하여 observable에 등록된 property에 대해서만 렌더링을 실행한다.
   */
  observing () {
    const self = this;
    const { $data, $getDescriptor } = this;

    /**
     * setter 실행 시 해당 property가 observable에 있으면 렌더링 실행
     * @param property {string}
     */
    const observer = property => {
      if (this.$observable.has(property)) this.render();
    }

    Object.keys($data).forEach(key => {
      let _value = $data[key];
      Object.defineProperty($data, key, {
        get () {
          if ($getDescriptor) $getDescriptor(key);
          return _value;
        },
        set(value) {
          _value = value;
          observer.call(self, key);
        }
      });
    });
  }

  /**
   * 이벤트 감지
   * @param eventName {string} 감지할 이벤트 이름
   * @param set {Function} 이벤트 발생시 실행될 callback 함수
   */
  $on (eventName, set) {
    Object.defineProperty(this.$eventListener, eventName, { set });
  }

  /**
   * 이벤트 발생
   * @param eventName {string} 발생 시킬 이벤트 명
   * @param payload {any} 콜백함수의 인자
   */
  $emit (eventName, payload) {
    this.$eventListener[eventName] = payload;
  }

}
```

그리고 컴포넌트간에 공유하는 데이터가 존재했기 때문에 `Store`를 구성했다.

```js{26-44}
export class Store {

  /** @type {Object.<string, Set<Component>>} **/
  $observable = {};

  /** @type {null|Function} **/
  $getDescriptor = null;

  /** @type {Object.<string, any>} **/
  state;

  /**
   * 스토어 생성
   * @param state {Object.<string, any>}
   * @param mutations {Object.<String, Function>}
   */
  constructor({ state, mutations }) {
    this.observing(state);
    this.registerMutations(mutations);
  }

  /**
   * state에 변경이 있을 경우, 등록된 component에 대한 rendering 실행
   * @param state {Object.<string, any>}
   */
  observing (state) {
    const self = this;
    Object.keys(state).forEach(key => {
      let _value = state[key];
      Object.defineProperty(state, key, {
        get () {
          if (self.$getDescriptor) self.$getDescriptor(key);
          return _value;
        },
        set (value) {
          _value = value;
          if (self.$observable[key] !== undefined) {
            self.$observable[key].forEach(component => component.render())
          }
        }
      })
    })
    this.state = state;
  }

  /**
   * mutations의 메소드를 Store의 메소드로 등록
   * @param mutations {Object<String, Function>}
   */
  registerMutations (mutations) {
    Object.keys(mutations).forEach(key => {
      this[key] = mutations[key].bind(this);
    })
  }

  /**
   * proerty에 대한 observer 추가
   * @param property {string}
   * @param component {Component}
   */
  addObservable (property, component) {
    const { $observable } = this;
    $observable[property] = $observable[property] || new Set();
    $observable[property].add(component);
  }

  /**
   * - Component가 렌더링 되기 전에 descriptor함수를 만들어줌
   * - descriptor에서 렌더링에 사용되는 Property 있을 경우 addObservable 실행 및 등록
   * @param getter {Function}
   */
  setHandlerGet (getter) {
    this.$getDescriptor = getter;
  }

  /**
   * Component의 렌더링이 끝나면 descriptor 제거
   */
  removeHandlerGet () {
    this.$getDescriptor = null;
  }

}
```

Store에서 사용하는 데이터에 변경이 발생할 경우, **Store가 붙어있는 컴포넌트를 렌더링 하는 방식**으로 만들었다.

Component와 Store를 이용한 호스트 코드는 다음과 같다.

```js
import {getDateFormat} from "../utils";
import {Component} from "../core";
import {alarmStore} from "../store";

export class Clock extends Component {

  /**
   * 컴포넌트 생성
   * @param $target { HTMLElementTagNameMap|HTMLElement }
   * @param components { Component }
   */
  constructor ($target) {
    super($target);
    this.clockInterval();
  }

  /**
   * 100ms 단위로 시간 변경
   * @private
   */
  clockInterval () {
    const {$data, updateNow, clockInterval} = this;
    $data.increment += 100
    updateNow.call(this);
    $data.timer = setTimeout(clockInterval.bind(this), 100);
  }

  /**
   * $data 초기화
   * @returns {{timer: number, start: number, increment: number}}
   * @private
   */
  _init () {
    return {
      timer: 0,
      increment: 0,
      start: Date.now(),
    };
  }

  /**
   * store 초기화
   * @returns {{alarmStore: Store}}
   * @private
   */
  _initStore () {
    return {alarmStore};
  }

  /**
   * $target에 렌더링
   * @returns {string}
   * @private
   */
  _render () {
    return `
      <section>
        <h2>현재시각</h2>
        <p>${getDateFormat(new Date(this.$stores.alarmStore.state.now))}</p>
      </section>
    `;
  }

  /**
   * - 현재 시간을 업데이트함.
   * - store에 반영
   */
  updateNow () {
    const {$data, $stores: {alarmStore}} = this;
    alarmStore.SET_NOW($data.start + $data.increment);
    this.checkAlarm();
  }

  /**
   * 초기 시간과 시간 증가값을 업데이트함
   * @param datetime {string} 새로운 초기 시간
   */
  updateStart (datetime) {
    const {$data} = this;
    $data.start = new Date(datetime).getTime();
    $data.increment = 0;
  }

  /**
   * 현재 시간에 대한 알람을 찾은 후 pushing
   */
  checkAlarm () {
    const {queue, now} = this.$stores.alarmStore.state;
    const nowTime = getDateFormat(new Date(now), 'h:i');
    queue.filter(({alarmTime, activation}) => activation && alarmTime === nowTime)
         .forEach(this.pushAlarm.bind(this));
  }

  /**
   * 알람에 대한 메시지(알림)를 보냄
   * @param alarm {Alarm} 알람 정보
   * @param queueIndex {number} 제거할 alarmQueue의 index number
   */
  pushAlarm (alarm, queueIndex) {
    this.$stores.alarmStore.ADD_PUSH_MESSAGE(alarm, queueIndex);
  }
}
```

어찌저찌 만들긴 했으나, 퇴근 후에 고작 2일 동안 고민하면서 만든 코드이기 때문에 문제가 좀 많은 편이다.

위의 코드를 요약하자면 다음과 같다.

- Store의 $state에 Component Render Observer 등록
- Component의 $data에 Render Observer 등록
- **Component에 등록된 $data와 Store의 State의 property에 변경이 발생하면 render 실행**

이렇게 구축한 코드를 나중에 좀 더 다듬어서 인강으로 만들던가 할 예정이다.

#### (2) 독서

7월 초에 별 생각 없이 회사 복지몰에서 쇼핑을 하다가 **Yes24 북클럽 6개월 정기권**을 발견하였고 바로 결제했다.

여태까지 본 eBook 쇼핑몰 중에서 IT관련 서적이 제일 많이 등록되어 있었다.
다른 eBook 쇼핑몰의 경우 정기권을 구매했을 때 IT서적을 볼 수 있는 경우는 거의 없었기 때문에 무척 놀랐다.

다만 최신 서적은 거의 볼 수 없었고 출판된 지 2~3년 정도 된 서적은 거의 다 볼 수 있었다.

***      

- [코어 자바스크립트](http://m.yes24.com/Goods/Detail/78586788)
  - 2019년에 출간된 서적임에도 불구하고 Yes24 북클럽에서 볼 수 있었다. 무척 운이 좋았다.
  - 전반적으로 설명이 구체적이고 이해하기 쉽게 서술되어 있었다.
  - 특히 메모리와 실행 컨텍스트에 대해 어떤 서적보다도 구체적으로 설명되어 있었다. 이 부분이 제일 도움이 많이 됐다.
  - 메소드와 함수에 대한 구분도 직관적으로 이해할 수 있게 설명되어 있다.
  - 프로토타입에 대한 부분도 이렇게 쉽게 서술될 수 있을까? 싶을 정도로 쉽게 되어 있었다.
  - 그리고 여러 가지 용어에 대한 저자의 견해가 마음에 들었다. 특히 클로저에 대해 설명하는 부분이 인상 깊었다.

***

- [인사이드 자바스크립트](http://www.yes24.com/Product/Goods/37157296)
  - 코어 자바스크립트를 먼저 읽고, 이 책을 읽어서 그런지 그렇게 만족스럽진 못했다.
  - 객체지향 파트의 경우 그저 문법 개선이라는 부분을 보고 그냥 접었다.
  - 마음에 들었던 부분은 메모이제이션에 대한 설명
  - 특히 프로토타입에 대한 설명은 코어 자바스크립트와 너무 비교되었기 때문에 매우 실망했다.

***

- [프론트엔드 개발 첫걸음](http://www.yes24.com/Product/Goods/66815171)
  - FE 프레임워크에 탄생에 대한 서술이 인상 깊었다.
  - 각각의 프레임워크(React, Angular, Vue)에 대한 비교를 한 눈에 볼 수 있었다.
  - 무엇보다 Flux 패턴이 쉽게 설명되어있었기 때문에 좋았다.

***

이 외에 재미로 읽은 책도 몇 권 있다.

- [팟캐스트 나는 프로그래머다](http://www.yes24.com/Product/Goods/57703297)
  - 2015년에 출판된 책이다.
  - [팟캐스트](http://www.podbbang.com/ch/9126)의 내용을 책으로 옮긴 것이다.
  - 재미로 읽었지만, 생각보다 유익했다.
  - Scala, Go, Node.js 등에 대한 특징과 장단점 등을 엿볼 수 있었다.
  - 스타트업, SI, 서비스회사 등의 특징도 엿볼 수 있었다.
  - 이후의 시리즈가 없는 게 아쉽다.
  - 팟캐스트에서 모든 라디오를 들어볼 수 있다.
- [부의 추월차선](http://www.yes24.com/Product/Goods/9440838)
  - 부자가 되기 위한 방법
  - 인도, 서행차선, 추월차선을 기준으로 설명되어 있다.
  - `부`에 대한 의미를 되새기기에 좋은 책이다.
  - 사업을 하지 않더라도, 이 정도의 내용은 숙지해놓으면 살아가면서 분명 도움이 될 것이다.

***

앞으로도 대중교통을 이용할 때 혹은 점심시간, 취침 전 등의 시간을 이용해서 꾸준히 책을 읽어야겠다.

#### (3) 코딩 인터뷰 공부

카카오 면접을 앞두고 꽤 많은 포스트와 인터뷰에 대한 글들을 읽었다.

::: tip 깊이 있는 면접 준비를 위한 자료
- [시옷 스터디](https://gitlab.com/siots-study/topics/-/wikis/home)
  - 개인적으로 인터넷에 나와 있는 자료 중에서는 이게 제일 잘 정리되어있는 것 같다.
  - 모든 자료에 추가적인 레퍼런스가 있기 때문에 특히 도움이 많이 된다.
- [프런트엔드 인터뷰 핸드북](https://github.com/yangshun/front-end-interview-handbook/)
  - 프런트엔드와 관련된 내용을 전반적으로 훑어볼 수 있어서 좋았다.
  - 다만 깊이는 기대하기 어렵다.
- [TechnicalNote](https://github.com/jobhope/TechnicalNote)
  - 프런트엔드 뿐만 아니라 개발에 필요한 기초적인 질문들이 포함되어 있어서 보기 좋았다.
- [초보자를 위한 코딩 인터뷰 질문 모음](https://github.com/JaeYeopHan/Interview_Question_for_Beginner)
  - 커뮤니티에서 유명한 한재엽님을 필두로 하여 정리된 자료들
  - 말 그대로 초보자들이 읽기 쉽게 정리되어 있다.
- [프런트엔드 성능 최적화](https://ui.toast.com/fe-guide/ko_PERFORMANCE/)
  - 성능 최적화를 위한 모든 내용이 들어있다.
  - 사실 성능 최적화와 관련된 내용보단 **브라우저 렌더링**과 관련된 내용이 더 잘 들어온다.   
:::

::: tip 가볍게 읽기 좋은 것들
- [프런트엔드 면접 문제 은행](https://h5bp.org/Front-end-Developer-Interview-Questions/translations/korean/)
- [신입 프런트엔드 면접 질문 모음](https://velog.io/@honeysuckle/%EC%8B%A0%EC%9E%85-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EB%A9%B4%EC%A0%91-%EC%A7%88%EB%AC%B8-%EB%AA%A8%EC%9D%8C)
- [프런트엔드 개발자 면접 질문 정리](https://sunnykim91.tistory.com/121)   
:::

::: tip 자극이 되고, 뼈가 되고, 살이 되는 글

정리하면서 알았는데, 둘 다 OKKY 미니 세미나와 관련된 글이다.

- [OKKY 미니 세미나 - 유명 IT 기업 입사 도전기](https://ict-nroo.tistory.com/72)
- [OKKY 미니 세미나 - 비전공 학원출신 SI개발자, 유명스타트업 들어간.ssul](https://jojoldu.tistory.com/247)

정말, 읽으면서 두 분의 노력이 존경스러웠으며 _나도 저렇게 할 수 있을까?_ 라는 의문과
**나도 저렇게 하고 싶다**라는 소망이 공존했다.

자극되는 긁은 언제 읽어도 좋은 것 같다.

:::

::: tip 난이도 최상의 심화 자료

사실 [비사이드소프트](https://www.bsidesoft.com/)에 존재하는 모든 포스팅이 심오하다.
그중에 제일 인상 깊었던 글은 [ES6의 class문은 특별할까?](https://www.bsidesoft.com/5370) 이다.

:::

#### (4) 결과

**결론만 말하자면 떨어졌다.**

- 월요일에 결과가 나온다고 했는데 수요일에 나왔다. 기다리느라 무척 힘들었다. 이직은 하지 않더라도 합격은 하고 싶었는데.. 아쉼이 많이 남는다.
- 면접 준비는 항상 해야할 것 같다. 시간내서 준비하려고 하니까 너무 고생했다.

### 3. Java Clean Code 9기 Reviewer

8기에는 수강생으로 참여했는데, 9기에는 리뷰어로 참여하게 되었다.
~~그런데 대체 언제 PR이 올라오는 거지?~~

내가 `잘 할 수 있을까`라는 의문과 `정말 잘하고 싶다`는 생각을 같이하게 된다.
~~일단 리뷰를 올려주세요..~~

어쨌든, 시간적 여유만 충분하다면 앞으로 꾸준히 리뷰어 활동을 하고 싶다.

### 4. Github Contribution 3,000개 달성

7월 10일, 문득 현재 몇 개의 잔디가 심어졌나 확인하고 싶어서 Github에 들어갔더니 **딱 3,000개의 잔디**가 심겨 있었다.

![3,000개의 잔디](https://scontent-ssn1-1.xx.fbcdn.net/v/t1.0-9/106926405_1011541565964885_8375374465964372512_n.jpg?_nc_cat=103&_nc_sid=730e14&_nc_ohc=Wnq-a0D4l8UAX87nRNp&_nc_ht=scontent-ssn1-1.xx&oh=74282dd9b4e6ef67a2f5cc8b054a1472&oe=5F4C44FE)

**2020년이 끝날 때 까지 5,000개**의 잔디를 심는 것이 목표이다.

이 글을 작성하는 시점(8/2)을 기준으로 3,262개의 잔디가 심어진 상태이다.

![3,262 잔디](https://user-images.githubusercontent.com/18749057/89124819-d2262980-d514-11ea-9789-e04e715489c8.png)

지난 1년이 아닌, **2020년을 기준**으로 한다면 약 2,800개의 잔디가 심어졌다.

![2,802 잔디](https://user-images.githubusercontent.com/18749057/89124841-f41fac00-d514-11ea-947b-ae3504b5cbde.png)

사실 최근 일주일 정도는 면접 준비 때문에 힘이 빠져서 커밋을 거의 못 했다.
8월에는 조금 더 열심히 커밋 해야지!

## 기타

### 1. 수영

7월에는 수영을 5번도 못한 것 같다.

핑계야 많지만, 면접 준비 때문에 수영까지 할 수 있는 체력이 남질 않았음이 제일 큰 이유다.

### 2. 오버워치

뜬금없이 ABC 대학 최강자전에 출전하게 되었다. ~~결과는 1차전부터 3:0으로 완패~~

뭐.. 최선을 다했으니 후회는 없다. ~~최선을 다해서 던진 건가..?~~

## Summary

- 회사 일 열심히 했다.
- 카카오 면접을 준비했다.
- 책을 많이 읽었다.
- 자극을 받았다.
- 수영은 못했다.