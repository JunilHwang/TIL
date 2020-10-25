---

title: Vanilla Javascript로 컴포넌트 만들기

---

# Vanilla Javascript로 컴포넌트 만들기

9월에 [넥스트 스텝](https://edu.nextstep.camp/)에서 진행하는 [블랙커피 스터디](https://edu.nextstep.camp/s/tUzCRWul)에 참여했다.
이 포스트는 스터디 기간동안 계속 고민하며 만들었던 컴포넌트를 차근 차근 구현해보는 내용이다.

이 포스트의 내용을 이해하기 위해선 다음과 같은 것들에 대해 미리 숙지해야 한다.

## (1) 컴포넌트와 상태관리

### 상태관리의 탄생

필자가 웹 개발을 시작한지 얼마 되지 않았을 때(2012년도)에는 javascript를 공부할 때 제일 중요한게 [jQuery](https://jquery.com/) 였다.

::: tip jQuery
- jQuery는 빠르고 작고 기능이 풍부한 JavaScript 라이브러리이다.
- jQuery API는 크로스 브라우징을 지원한다.
- DOM, Event, Animation 및 Ajax와 같은 작업을 훨씬 간단하게 만든다.
:::

약 3년 동안 `jQuery`만 주구장창 사용하면서 느낀 제일 큰 장점은 `DOM API`라고 생각한다.
`jQuery`는 `DOM`을 쉽게 조작할 수 있도록 만들어주는 것에 더해 `크로스 브라우징`과 관련된 이슈를 해결해주었다.

그런데 점점 브라우저와 Javascript가 발전하는 과정에서 아예 브라우저(클라이언트) 단에서 렌더링을 하고,
서버에서는 렌더링에 필요한 데이터만 제공하는 형태로 기술이 변화했다.

이제는 직접적으로 `DOM`을 다루는 행위가 급격하게 감소했고, `상태(State)`를 기준으로 `DOM`을 렌더링 하는 형태로 발전한 것이다.
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

### 컴포넌트

`Angular`가 `CSR`의 시작이었다면, `React`는 `컴포넌트 기반 개발`의 시작이었다.
그리고 `Angular`와 `React`의 장점을 모두 수용한 `Vue`가 나왔다.

어쨌든 중요한 점은 현 시점의 웹 어플리케이션은 컴포넌트 단위로 설계되고 개발된다는 것이다.
그리고 컴포넌트마다 컴포넌트를 렌더링할 때 필요한 상태를 관리하게 되었으며, `Proxy` 혹은 `Observer Pattern` 등을 이용하여 이를 구현한다.

**이론에 대해 다루자면 한도 끝도 없기 때문에 이제부터는 코드로 이야기 하겠다.**

## (2) state - setState - render

간단한게 `setState` 라는 메소드를 통해서 `state`를 기반으로 `render`를 해주는 코드를 만들어보자.

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

이제 이렇게 작성한 코드를 `class` 문법으로 추상화시켜보자.

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
이 상태에서 다음과 같이 모듈화를 할 수 있다.

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

## (3) 이벤트 처리

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

이 때 다음과 같이 [이벤트 버블링](https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/#%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%B2%84%EB%B8%94%EB%A7%81---event-bubbling)을 사용한다면 훨씬 직관적으로 처리할 수 있다.

```js{4,8}
export default class Items extends Component {
  setup () {/* 생략 */}
  template () { /* 생략 */}
  setEvent () {
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

다만, 기존의 `setEvent`는 `render`를 할 때 마다 실행하기 때문에, `core/Component.js`에 라이프 사이클을 변경해야 한다.

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

즉, event를 각각의 하위 요소가 아니라 component의 target 자체에 등록하는 것이다.
따라서 component가 생성되는 시점에만 이벤트 등록을 해놓으면 추가로 등록할 필요가 없어진다.

