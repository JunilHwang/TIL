---

title: Vanilla Javascript로 웹 컴포넌트 만들기
description: Vanilla Javascript로 간단한 웹 컴포넌트를 만드는 과정에 대해 소개합니다.
sidebarDepth: 2
date: 2020-10-25

---

# Vanilla Javascript로 컴포넌트 만들기

<div style="text-align: right">
  <img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fjunilhwang.github.io%2FTIL%2FJavascript%2FDesign%2FVanilla-JS-Component%2F&count_bg=%230099FF&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=%EC%A1%B0%ED%9A%8C%EC%88%98&edge_flat=true" alt="Hits bn" />
</div>

9월에 [넥스트 스텝](https://edu.nextstep.camp/)에서 진행하는 [블랙커피 스터디](https://edu.nextstep.camp/s/tUzCRWul)에 참여했다.
이 포스트는 스터디 기간동안 계속 고민하며 만들었던 컴포넌트를 차근 차근 구현해보는 내용이다.

## 1. 컴포넌트와 상태관리

### (1) 상태관리의 탄생

필자가 웹 개발을 시작한지 얼마 되지 않았을 때(2012년도)에는 javascript를 공부할 때 제일 중요한게 [jQuery](https://jquery.com/) 였다.

::: tip jQuery
- jQuery는 빠르고 작고 기능이 풍부한 JavaScript 라이브러리이다.
- jQuery API는 크로스 브라우징을 지원한다.
- DOM, Event, Animation 및 Ajax와 같은 작업을 훨씬 간단하게 만든다.
:::

약 3년 동안 `jQuery`만 주구장창 사용하면서 느낀 제일 큰 장점은 `DOM API`라고 생각한다.
`jQuery`는 `DOM`을 쉽게 조작할 수 있도록 만들어주는 것에 더해 `크로스 브라우징`과 관련된 이슈를 해결해주었다.

그런데 점점 브라우저와 Javascript가 발전하는 과정에서 아예 **브라우저(클라이언트) 단에서 렌더링**을 하고,
**서버에서는 `REST API` 혹은 `GraphQL` 같이 브라우저 렌더링에 필요한 데이터만 제공하는 형태**로 기술이 변화했다.

이제는 직접적으로 `DOM`을 다루는 행위가 급격하게 감소했고, **`상태(State)`를 기준으로 `DOM`을 렌더링 하는 형태로 발전**한 것이다.
`DOM`이 변하는 경우가 `State`에 종속 되어버린 것이다. 반대로 말하면, `State`가 변하지 않을 경우 `DOM`이 변하면 안 되는 것이다. 

그리고 이러한 과정 속에서 `Client-Side Rendering` 이라는 개념과 `상태관리`라는 개념이 생기게 되었다.

::: tip SSR과 CSR

**SSR(Server-Side Rendering)**
- 약 5년전 까지만 해도 `JSP` `PHP` `ASP` 등이 웹 개발 3대장이라고 불렸다.
- 위의 언급한 것들이 하는 역할이 바로 서버에서 HTML을 만들어서 클라이언트에 넘겨주는 것, 즉 `Server Side Rendering` 이다.
- 따라서 클라이언트단(브라우저)에서는 굳이 데이터를 깊은 단계까지, 정교하게 관리할 필요가 없었다.

**CSR(Client-Side Rendering)**
- Javascript가 발전하면서 아예 브라우저(클라이언트) 단에서 모든 렌더링을 처리 하려는 시도가 계속되었고, 그렇게 `React` `Angular` `Vue` 같은 프레임워크(혹은 라이브러리)가 탄생하였다.
- 브라우저(클라이언트) 단에서 렌더리을 하기 위해선, 렌더링에 필요한 상태를 정교하게 관리해야 한다.
- 그래서 `Redux` 같은 상태관리 라이브러리(혹은 프레임워크)가 생겨났다.
  
:::

- [TECH CONCERT: FRONT END 2019 - 데이터 상태 관리. 그것을 알려주마](https://www.youtube.com/watch?v=o4meZ7MRd5o)를 보면 더 자세하게 알 수 있다. 

### (2) 컴포넌트

`Angular`가 `CSR`의 시작이었다면, `React`는 `컴포넌트 기반 개발`의 시작이었다.
그리고 `Angular`와 `React`의 장점을 모두 수용한 `Vue`가 나왔다.

어쨌든 중요한 점은 **현 시점의 웹 어플리케이션은 컴포넌트 단위로 설계되고 개발된다**는 것이다.
그리고 컴포넌트마다 컴포넌트를 렌더링할 때 필요한 상태를 관리하게 되었으며, `Proxy` 혹은 `Observer Pattern` 등을 이용하여 이를 구현한다.

**이론에 대해 다루자면 한도 끝도 없기 때문에 이제부터는 코드로 이야기 하겠다.**

## 2. state - setState - render

컴포넌트의 설계의 기반이 되는 코드를 만들어보자.

### (1) 기능 구현

먼저 간단한게 `setState` 라는 메소드를 통해서 `state`를 기반으로 `render`를 해주는 코드를 만들어보자.

```html
<div id="app"></div>
<script>
const $app = document.querySelector('#app');

let state = {
  items: ['item1', 'item2', 'item3', 'item4']
}

const render = () => {
  const { items } = state;
  $app.innerHTML = `
    <ul>
      ${items.map(item => `<li>${item}</li>`).join('')}
    </ul>
    <button id="append">추가</button>
  `;
  document.querySelector('#append').addEventListener('click', () => {
    setState({ items: [ ...items, `item${items.length + 1}` ] })
  })
}

const setState = (newState) => {
  state = { ...state, ...newState };
  render();
}

render();
</script>
```

<iframe class="example-frame" src="https://junilhwang.github.io/simple-component/example01/" width="100%"></iframe>

이 코드의 핵심은 다음과 같다.

- `state`가 변경되면 `render`를 실행한다.
- `state`는 `setState`로만 변경해야 한다.

이러한 규칙을 지켜가면서 코드를 작성한다면, 브라우저 출력되는 내용은 무조건 `state`에 종속되는 것이다.
즉, `DOM`을 직접적으로 다룰 필요가 없어진다.

### (2) 추상화

앞서 작성한 코드를 `class` 문법으로 추상화시켜보자.

```html
<div id="app"></div>
<script>
class Component {
  $target;
  $state;
  constructor ($target) { 
    this.$target = $target;
    this.setup();
    this.render();
  }
  setup () {};
  template () { return ''; }
  render () {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }
  setEvent () {}
  setState (newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}

class App extends Component {
  setup () {
    this.$state = { items: ['item1', 'item2'] };
  }
  template () {
    const { items } = this.$state;
    return `
        <ul>
          ${items.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <button>추가</button>
    `
  }
  
  setEvent () {
    this.$target.querySelector('button').addEventListener('click', () => {
      const { items } = this.$state;
      this.setState({ items: [ ...items, `item${items.length + 1}` ] });
    }); 
  }
}

new App(document.querySelector('#app'));
</script>
```

<iframe class="example-frame" src="https://junilhwang.github.io/simple-component/example02/" width="100%"></iframe>

컴포넌트 클래스를 작성해놨더니 조금 더 유연하게 만들 수 있게 되었다.
무엇보다 컴포넌트 코드의 사용 방법을 강제할 수 있기 때문에 코드를 유지보수하고 관리할 때 매우 이롭다. 

### (3) 모듈화

보통 한 파일안에 모든 기능을 작성하는 경우는 없을 것이므로 앞서 작성한 코드를 다음과 같이 분할해보자.

```sh
.
├── index.html
└── src
    ├── app.js              # ES Module의 entry file
    ├── components          # Component 역할을하는 것들
    │   └── Items.js
    └── core                # 구현에 필요한 코어들
        └── Component.js
```

이 때 [브라우저 모듈](https://eyabc.github.io/Doc/dev/core-javascript/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%20%EB%AA%A8%EB%93%88.html)을 사용할 것이다.

- index.html
```html
<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>Simple Component 2</title>
</head>
<body>
<div id="app"></div>
<script src="./src/app.js" type="module"></script>
</body>
</html>
```

- src/app.js
```js
import Items from "./components/Items.js";

class App {
  constructor() {
    const $app = document.querySelector('#app');
    new Items($app);
  }
}

new App();
```

- src/components/Items.js
```js
import Component from "../core/Component.js";

export default class Items extends Component {
  setup () {
    this.$state = { items: ['item1', 'item2'] };
  }
  template () {
    const { items } = this.$state;
    return `
      <ul>
        ${items.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <button>추가</button>
    `
  }

  setEvent () {
    this.$target.querySelector('button').addEventListener('click', () => {
      const { items } = this.$state;
      this.setState({ items: [ ...items, `item${items.length + 1}` ] });
    });
  }
}
```

- src/core/Component.js
```js
export default class Component {
  $target;
  $state;
  constructor ($target) {
    this.$target = $target;
    this.setup();
    this.render();
  }
  setup () {};
  template () { return ''; }
  render () {
    this.$target.innerHTML = this.template();
    this.setEvent();
  }
  setEvent () {}
  setState (newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}
```

## 3. 이벤트 처리

### (1) 불편함을 감지하기

앞서 작성한 코드를 사용하면 `render`를 실행할 때 마다 이벤트가 새로 등록된다.
뿐만 아니라 반복적인 요소에 대해 각각 이벤트를 등록해야 할 땐 여간 불편한게 아니다.

각각의 아이템에 대한 `삭제` 기능을 추가한다고 하면 다음과 같은 코드가 된다.

```js{14,28-33}
import Component from "../core/Component.js";

export default class Items extends Component {
  setup () {
    this.$state = { items: ['item1', 'item2'] };
  }
  template () {
    const { items } = this.$state;
    return `
      <ul>
        ${items.map((item, key) => `
          <li>
            ${item}
            <button class="deleteBtn" data-index="${key}">삭제</button>
          </li>
        `).join('')}
      </ul>
      <button class="addBtn">추가</button>
    `
  }

  setEvent () {
    this.$target.querySelector('.addBtn').addEventListener('click', () => {
      const { items } = this.$state;
      this.setState({ items: [ ...items, `item${items.length + 1}` ] });
    });

    this.$target.querySelectorAll('.deleteBtn').forEach(deleteBtn =>
      deleteBtn.addEventListener('click', ({ target }) => {
        const items = [ ...this.$state.items ];
        items.splice(target.dataset.index, 1);
        this.setState({ items });
      }))
  }
}


```

<iframe class="example-frame" src="https://junilhwang.github.io/simple-component/example04/" width="100%"></iframe>

### (2) 이벤트 버블링

이 때 다음과 같이 [이벤트 버블링](https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/#%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%B2%84%EB%B8%94%EB%A7%81---event-bubbling)을 사용한다면 훨씬 직관적으로 처리할 수 있다.

```js{5-6,9,13}
export default class Items extends Component {
  setup () {/* 생략 */}
  template () { /* 생략 */}
  setEvent () {
    // 모든 이벤트를 this.$target에 등록하여 사용하면 된다.
    this.$target.addEventListener('click', ({ target }) => {
      const items = [ ...this.$state.items ];

      if (target.classList.contains('addBtn')) {
        this.setState({ items: [ ...items, `item${items.length + 1}` ] });
      }

      if (target.classList.contains('deleteBtn')) {
        items.splice(target.dataset.index, 1);
        this.setState({ items });
      }

    });
  }
}
```

다만, 기존의 `setEvent`는 `render`를 할 때 마다 실행하기 때문에, `core/Component.js`에 `라이프 사이클`을 변경해야 한다.

```diff
 export default class Component {
   $target;
   $state;
   constructor ($target) {
     this.$target = $target;
     this.setup();
+    this.setEvent(); // constructor에서 한 번만 실행한다.
     this.render();
   }
   setup () {};
   template () { return ''; }
   render () {
     this.$target.innerHTML = this.template();
-    this.setEvent(); 
   }
   setEvent () {}
   setState (newState) {
     this.$state = { ...this.$state, ...newState };
     this.render();
   }
 }
```

- event를 각각의 하위 요소가 아니라 **component의 target 자체에 등록하는 것**이다.
- 따라서 component가 생성되는 시점에만 이벤트 등록을 해놓으면 **추가로 등록할 필요가 없어진다.**

<iframe class="example-frame" src="https://junilhwang.github.io/simple-component/example05/" width="100%"></iframe>

### (3) 이벤트 버블링 추상화

그리고 이벤트 버블링을 통한 등록 과정을 **메소드로 만들어서 사용**하면 코드가 더 깔끔해진다.

```js
export default class Component {
  $target;
  $state;
  constructor ($target) { /* 생략 */ }
  setup () { /* 생략 */ }
  template () { /* 생략 */ }
  render () { /* 생략 */ }
  setEvent () { /* 생략 */ }
  setState (newState) { /* 생략 */ }

  addEvent (eventType, selector, callback) {
    const children = [ ...this.$target.querySelectorAll(selector) ]; 
    // selector에 명시한 것 보다 더 하위 요소가 선택되는 경우가 있을 땐
    // closest를 이용하여 처리한다.
    const isTarget = (target) => children.includes(target)
                                 || target.closest(selector);
    this.$target.addEventListener(eventType, event => {
      if (!isTarget(event.target)) return false;
      callback(event);
    })
  }

}
```

이렇게 작성한 메소드는 다음과 같이 사용하면 된다.
```js{5,9}
export default class Items extends Component {
  setup () { /* 생략 */ }
  template () {/* 생략 */ }
  setEvent () {
    this.addEvent('click', '.addBtn', ({ target }) => {
      const { items } = this.$state;
      this.setState({ items: [ ...items, `item${items.length + 1}` ] });
    });
    this.addEvent('click', '.deleteBtn', ({ target }) => {
      const items = [ ...this.$state.items ];
      items.splice(target.dataset.index, 1);
      this.setState({ items });
    });
  }
}
``` 

## 4. 컴포넌트 분할하기

이제 컴포넌트 단위로 구분하는 코드를 작성해보자.

### (1) 기능 추가

현재 까지의 코드에서는 컴포넌트를 분리할 이유가 없는 상태이다.
그래서 `Items` 컴포넌트에 `toggle`, `filter` 등의 기능을 추가 했을 때 먼저 어떤 문제점이 있는지 알아야한다.

```js
export default class Items extends Component {
  get filteredItems () {
    const { isFilter, items } = this.$state;
    return items.filter(({ active }) => (isFilter === 1 && active) ||
                                        (isFilter === 2 && !active) ||
                                        isFilter === 0);
  }

  setup() {
    this.$state = {
      isFilter: 0,
      items: [
        {
          seq: 1,
          contents: 'item1',
          active: false,
        },
        {
          seq: 2,
          contents: 'item2',
          active: true,
        }
      ]
    };
  }

  template() {
    return `
      <header>
        <input type="text" class="appender" placeholder="아이템 내용 입력" />
      </header>
      <main>
        <ul>
          ${this.filteredItems.map(({contents, active, seq}) => `
            <li data-seq="${seq}">
              ${contents}
              <button class="toggleBtn" style="color: ${active ? '#09F' : '#F09'}">
                ${active ? '활성' : '비활성'}
              </button>
              <button class="deleteBtn">삭제</button>
            </li>
          `).join('')}
        </ul>
      </main>
      <footer>
        <button class="filterBtn" data-is-filter="0">전체 보기</button>
        <button class="filterBtn" data-is-filter="1">활성 보기</button>
        <button class="filterBtn" data-is-filter="2">비활성 보기</button>
      </footer>
    `
  }

  setEvent() {
    this.addEvent('keyup', '.appender', ({ key, target }) => {
      if (key !== 'Enter') return;
      const {items} = this.$state;
      const seq = Math.max(0, ...items.map(v => v.seq)) + 1;
      const contents = target.value;
      const active = false;
      this.setState({
        items: [
          ...items,
          {seq, contents, active}
        ]
      });
    });

    this.addEvent('click', '.deleteBtn', ({target}) => {
      const items = [ ...this.$state.items ];;
      const seq = Number(target.closest('[data-seq]').dataset.seq);
      items.splice(items.findIndex(v => v.seq === seq), 1);
      this.setState({items});
    });

    this.addEvent('click', '.toggleBtn', ({target}) => {
      const items = [ ...this.$state.items ];
      const seq = Number(target.closest('[data-seq]').dataset.seq);
      const index = items.findIndex(v => v.seq === seq);
      items[index].active = !items[index].active;
      this.setState({items});
    });

    this.addEvent('click', '.filterBtn', ({ target }) => {
      this.setState({ isFilter: Number(target.dataset.isFilter) });
    });
  }
}
```

<iframe class="example-frame" src="https://junilhwang.github.io/simple-component/example07/" width="100%" height="250"></iframe>

이렇게 Items 컴포넌트가 무언가 많은 일을 하게 되었다.
이럴 경우 코드를 관리하기 힘들고, 컴포넌트라는 이름이 무색하게 컴포넌트 단위로 활용할 수 없는 상태가 되어버린다.

기본적으로 컴포넌트 라는 것은 "재활용"이 목적이다. 그러기 위해선 하나의 컴포넌트가 최대한 작은 단위의 일을 하도록 만들어야 한다.

### (2) 폴더 구조

다음과 같이 폴더 및 파일을 구성해보자.

```sh
.
├── index.html
└── src
    ├── App.js               # main에서 App 컴포넌트를 마운트한다.
    ├── main.js              # js의 entry 포인트
    ├── components
    │   ├── ItemAppender.js
    │   ├── ItemFilter.js
    │   └── Items.js
    └── core
        └── Component.js
```

- 기존의 **entry point가 app.js에서 main.js**가 되었다
- `App Component`를 추가했다.
- `Items`에서 `ItemAppender`, `ItemFilter` 등을 분리했다.

### (3) Component Core 변경

그리고 `src/core/Component.js`에 다음과 같이 `$props`와 `mounted`를 추가해야 한다.

```js{3,7,13,17}
export default class Component {
  $target;
  $props;
  $state;
  constructor ($target, $props) {
    this.$target = $target;
    this.$props = $props; // $props 할당
    this.setup();
    this.setEvent();
    this.render();
  }
  setup () {};
  mounted () {};
  template () { return ''; }
  render () {
    this.$target.innerHTML = this.template();
    this.mounted(); // render 후에 mounted가 실행 된다.
  }
  setEvent () {}
  setState (newState) { /* 생략 */ }
  addEvent (eventType, selector, callback) { /* 생략 */ }
}
```

- `mounted`를 추가한 이유는 render 이후에 추가적인 기능을 수행하기 위해서이다.
- `$props`는 부모 컴포넌트가 자식 컴포넌트에게 상태 혹은 메소드를 넘겨주기 위해서이다.

### (4) Entry Point 변경

- `index.html` : 기존에 app.js가 아닌 main.js를 가져온다.
```diff
 <!doctype html>
 <html lang="ko">
 <head>
   <meta charset="UTF-8">
   <title>Simple Component 8</title>
 </head>
 <body>
 <h1>Example #8</h1>
 <div id="app"></div>
-<script src="src/app.js" type="module"></script>
+<script src="src/main.js" type="module"></script>
 </body>
 </html>
```

- `src/main.js`
```js
import App from './App.js';

new App(document.querySelector('#app'));
```

### (5) 컴포넌트 분할

기존의 `Items`에 존재하던 로직을 `App.js`에 넘겨주고, `Items`, `ItemAppender`, `ItemFilter` 등은 `App.js`에서 넘겨주는 로직을 사용하도록 만들어야 한다.

- `src/App.js`
```js
import Component from "./core/Component.js";
import Items from "./components/Items.js";
import ItemAppender from "./components/ItemAppender.js";
import ItemFilter from "./components/ItemFilter.js";

export default class App extends Component {

  setup () {
    this.$state = {
      isFilter: 0,
      items: [
        {
          seq: 1,
          contents: 'item1',
          active: false,
        },
        {
          seq: 2,
          contents: 'item2',
          active: true,
        }
      ]
    };
  }

  template () {
    return `
      <header data-component="item-appender"></header>
      <main data-component="items"></main>
      <footer data-component="item-filter"></footer>
    `;
  }

  // mounted에서 자식 컴포넌트를 마운트 해줘야 한다.
  mounted () {
    const { filteredItems, addItem, deleteItem, toggleItem, filterItem } = this;
    const $itemAppender = this.$target.querySelector('[data-component="item-appender"]');
    const $items = this.$target.querySelector('[data-component="items"]');
    const $itemFilter = this.$target.querySelector('[data-component="item-filter"]');

    // 하나의 객체에서 사용하는 메소드를 넘겨줄 bind를 사용하여 this를 변경하거나,
    // 다음과 같이 새로운 함수를 만들어줘야 한다.
    // ex) { addItem: contents => addItem(contents) }
    new ItemAppender($itemAppender, {
      addItem: addItem.bind(this)
    });
    new Items($items, {
      filteredItems,
      deleteItem: deleteItem.bind(this),
      toggleItem: toggleItem.bind(this),
    });
    new ItemFilter($itemFilter, {
      filterItem: filterItem.bind(this)
    });
  }

  get filteredItems () {
    const { isFilter, items } = this.$state;
    return items.filter(({ active }) => (isFilter === 1 && active) ||
      (isFilter === 2 && !active) ||
      isFilter === 0);
  }

  addItem (contents) {
    const {items} = this.$state;
    const seq = Math.max(0, ...items.map(v => v.seq)) + 1;
    const active = false;
    this.setState({
      items: [
        ...items,
        {seq, contents, active}
      ]
    });
  }

  deleteItem (seq) {
    const items = [ ...this.$state.items ];;
    items.splice(items.findIndex(v => v.seq === seq), 1);
    this.setState({items});
  }

  toggleItem (seq) {
    const items = [ ...this.$state.items ];
    const index = items.findIndex(v => v.seq === seq);
    items[index].active = !items[index].active;
    this.setState({items});
  }

  filterItem (isFilter) {
    this.setState({ isFilter });
  }

}
```

- `src/components/ItemAppender.js`
```js
import Component from "../core/Component.js";

export default class ItemAppender extends Component {

  template() {
    return `<input type="text" class="appender" placeholder="아이템 내용 입력" />`;
  }

  setEvent() {
    const { addItem } = this.$props;
    this.addEvent('keyup', '.appender', ({ key, target }) => {
      if (key !== 'Enter') return;
      addItem(target.value);
    });
  }
}

```

- `src/components/Items.js`
```js
import Component from "../core/Component.js";

export default class Items extends Component {

  template() {
    const { filteredItems } = this.$props;
    return `
      <ul>
        ${filteredItems.map(({contents, active, seq}) => `
          <li data-seq="${seq}">
            ${contents}
            <button class="toggleBtn" style="color: ${active ? '#09F' : '#F09'}">
              ${active ? '활성' : '비활성'}
            </button>
            <button class="deleteBtn">삭제</button>
          </li>
        `).join('')}
      </ul>
    `
  }

  setEvent() {
    const { deleteItem, toggleItem } = this.$props;

    this.addEvent('click', '.deleteBtn', ({target}) => {
      deleteItem(Number(target.closest('[data-seq]').dataset.seq));
    });

    this.addEvent('click', '.toggleBtn', ({target}) => {
      toggleItem(Number(target.closest('[data-seq]').dataset.seq));
    });

  }

}

```

- `src/components/ItemFilter.js`
```js
import Component from "../core/Component.js";

export default class ItemFilter extends Component {

  template() {
    return `
      <button class="filterBtn" data-is-filter="0">전체 보기</button>
      <button class="filterBtn" data-is-filter="1">활성 보기</button>
      <button class="filterBtn" data-is-filter="2">비활성 보기</button>
    `
  }

  setEvent() {
    const { filterItem } = this.$props;
    this.addEvent('click', '.filterBtn', ({ target }) => {
      filterItem(Number(target.dataset.isFilter));
    });
  }
}

```

<iframe class="example-frame" src="https://junilhwang.github.io/simple-component/example08/" width="100%" height="250"></iframe>

***

## 마치며

굉장히 핵심적인 내용만 간추려서 작성했다.
이외에도 여러가지 기법이 많이 이용되지만, 이 정도만 알고 있어도 어느 정도 역할에 맞게 컴포넌트 단위로 개발할 수 있을 것이다.

다음에는 `Observer Pattern`이나 `Proxy` 혹은 `Object.defineProperty` 등을 이용하여 외부의 상태변화에 대한 대응을 할 수 있는지 다뤄볼 예정이다. 

전체 코드는 [여기](https://github.com/JunilHwang/simple-component)에서 볼 수 있다.

## 부록: 같이 보면 좋은 내용

- [MakerJun - DOM](https://youtu.be/y4U0EtxAtHI)
- [MakerJun - Event](https://youtu.be/exziAmVQ7iA)
- [eyabc - 클래스](https://eyabc.github.io/Doc/dev/core-javascript/%ED%81%B4%EB%9E%98%EC%8A%A4.html)
- [eyabc - 화살표함수](https://eyabc.github.io/Doc/dev/core-javascript/%ED%99%94%EC%82%B4%ED%91%9C%ED%95%A8%EC%88%98.html)
- [eyabc - 브라우저 모듈](https://eyabc.github.io/Doc/dev/core-javascript/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%20%EB%AA%A8%EB%93%88.html)