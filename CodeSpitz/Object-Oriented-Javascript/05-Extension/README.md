---

title: MVVM System 개선하기 (3)
description: MVVM System을 최종적으로 어떻게 개선하였는지 설명합니다.
sidebarDepth: 2
date: 2020-02-28

---

# MVVM System 개선하기 (3)

객체지향 자바스크립트 마지막 포스팅입니다.

::: tip 해당 포스트는 아래의 내용들을 토대로 정리한 것입니다.

[코드스피츠 86기 5회차 동영상](https://www.youtube.com/watch?v=5UUISCK6CL4)

:::

## ViewModelListener 개선

[MVVM System 개선하기 (1)](../03-Strategy-Observer)에서 만든 Binder의 viewmodelUpdated는 문제가 있다.

```js{6}
const Binder = class extends ViewModelListener {략
  // .. 생략
  viewmodelUpdated (updated) {
    const items = {}
    this.#items.forEach(({ vmName, el }) => {
      items[vmName] = [type(rootViewModel[vmName], ViewModel), el]
    })
    updated.forEach(({ subKey, category, k, v }) => {
      if (!items[subKey]) return
      const [vm, el] = items[subKey], processor = this.#processors[category]
      if (!el || !processor) return
      processor.process(vm, el, k, v)
    })
  }
}
```

위의 코드에서 `rootViewModel`은 _client 코드에서 생성한 전역변수(전역객체)_ 이다.
그런데 이 전역변수를 지금 viewmodelUpdate에서 사용하고 있는 것이다.
이 부분을 개선해야 한다.

```js{3,6,9}
const ViewModelListener = class extends {
  /* 생략 */
  viewmodelUpdated (viewmodel, updated) { throw 'override!' }
}
const Binder = class extends ViewModelListener {
  viewmodelUpdated (viewmodel, updated) {
    const items = {}
    this.#items.forEach(({ vmName, el }) => {
      items[vmName] = [type(viewdmoel[vmName], ViewModel), el]
    })
    updated.forEach(({ subKey, category, k, v }) => {
      if (!items[subKey]) return
      const [vm, el] = items[subKey], processor = this.#processors[category]
      if (!el || !processor) return
      processor.process(vm, el, k, v)
    })
  }
}
```

viewmodelUpdated에서 _viewmodel을 인자로 받아오도록_ 해야 한다.
그런데 viewmodelUpdated는 Binder에만 있는게 아니라 ViewModel에도 존재한다.
_그리고 ViewModel에서 notify로 Binder에게 최신 정보를 보내게 된다._ 이 코드 또한 수정해야 한다.

@startuml
collections ViewModel
note over ViewModel : viewmodelUpdated
ViewModel -> Binder : **notify**
note over Binder : viewmodelUpdated
Binder -> View : Rendering
@enduml

```js
const ViewModel = class extends ViewModelListener {
  /* 생략 */
  notify () { this.#listeners.forEach(v => v.viewmodelUpdated(this, this.#isUpdated)) }
  // ViewModel에서 실행한 viewmodelUpdated는 viewmodel 인자를 사용하지 않는다.
  viewmodelUpdated (viewmodel, updated) { updated.forEach(v => this.#isUpdated.add(v)) }
}
```

---

그런데 [MVVM System 개선하기 (2)](../04-ISP-Visitor)에서 만든 viewmodelUpdated는 위와 같이 단순하지가 않다.
`ViewModelSubject`는 `notify`를 통해 `Binder`에게 viewmodel의 updated 내역을 알린다.

다르게 말하자면 **ViewModelSubject와 Binder가 계약(의존 관계)을 맺고 있기 때문**이다.

그래서 앞서 작성한 코드를 그대로 사용할 경우,
Binder에서 받아들이는 viewmodel이 ViewModelSubject일 수도 있고,
ViewModel일 수도 있게 된다.

따라서 Binder에서 사용하는 viewmodelUpdated가 무조건 ViewModel이 되도록 만들어야 하는데,
이를 위해 _ViewModelSubject에서 Binder에게 넘기는 Parameter(viewmodel)를 ViewModel에게 위임해야 한다._

```js
const ViewModelSubject = class extends ViewModelListener {
  // ... 생략
  notify () { this.#listeners.forEach(v => v.viewmodelUpdated(this.notifyTarget, this.#info)) }
  get notifyTarget () { throw 'must be override!' } // ViewModel에게 위임한다.
}
const ViewModel = class extends ViewModelSubject {
  // ... 생략
  get notifyTarget () { return this } // notifyTarget을 호출하면 ViewModel을 보낸다.
}
``` 

이렇게 ViewModelSubject에서 `notifyTarget`이라는 getter method를 통해 ViewModel에게 위임을 할 수 있다.

그리고 Binder의 코드도 다음과 같이 변경되어야 한다.

```js{4,7}
const Binder = class extends ViewModelListener {
  // .. 생략
  viewmodelUpdated(target, updated,
                   _ = type(target, ViewModel)){ // target은 ViewModel 이여야 한다.
    const items = {}
    this.#items.forEach(({ vmName, el }) => {
      items[vmName] = [type(target[vmName], ViewModel), el]
    })
    updated.forEach(({ subKey, category, k, v }) => {
      if (!items[subKey]) return
      const [vm, el] = items[subKey], processor = this.#processors[category]
      if (!el || !processor) return
      processor.process(vm, el, k, v)
    })
  }
}
```

주석에도 표기했지만, Binder가 받아들이는 viewmodel(target)은 ViewModelSubject가 아니라 ViewModel이여야 한다.

_추상 계층을 분리하게 될 경우, 어떠한 문제가 생겼을 때 각각의 계층에서 해결하도록 만드는 것을 지향해야 한다._

## Processor 개선

현재 Strategy Pattern을 통해서 추출한 Processor는 약간의 문제를 가지고 있다.

```js{10,23,39,42,45,48}
// Binder의 Render 부분
const Binder = class extends ViewModelListener {
  // ... 생략
  render (viewmodel, _ = type(viewmodel, ViewModel)) {
    const processores = Object.entries(this.#processors)
    this.#items.forEach(({ vmName, el }) => {
      const vm = type(viewmodel[vmName], ViewModel)
      processores.forEach(([pk, processor]) => {
        Object.entries(vm[pk]).forEach(([k, v]) => {
          processor.process(vm, el, k, v)
        })
      })
    })
  }
}

// ViewModel
const ViewModel = class extends ViewModelSubject {
  // ... 생략
  constructor(data, _ = type(data, 'object')) {
    super();
    Object.entries(data).forEach(([k, v]) => {
      if('styles,attributes,properties'.includes(k)) {
        if(!v || typeof v != 'object') throw `invalid object k: ${k}, v:${v}`
        this[k] = ViewModel.define(this, k, v)
      } else {
        Object.defineProperty(this, k, ViewModel.descriptor(this, '', k, v))
        if (v instanceof ViewModel) {
          v._setParent(this, k)
        }
      }
    })
    Object.seal(this)
  }
}

// Client 코드
binder.addProcessor(new class extends Processor {
  _process (vm, el, k, v) { el.style[k] = v }
}('styles'))
binder.addProcessor(new class extends Processor {
  _process (vm, el, k, v) { el.setAttribute(k, v) }
}('attributes'))
binder.addProcessor(new class extends Processor {
  _process (vm, el, k, v) { el[k] = v }
}('properties'))
binder.addProcessor(new class extends Processor {
  _process (vm, el, k, v) { el[`on${k}`] = e => v.call(el, e, vm) }
}('events'))
```

::: tip 처리기(Processor)는 데이터 구조(ViewModel)과 동기화 되어야 한다.

위 코드의 문제점은 바로
**Processor는 확장 가능** 하도록 만들었지만
ViewModel에서 Processor의 종류를 `style` `attributes` `properties` 등으로 **제한** 하고 있다는 것이다.

_즉, ViewModel이 Processor의 확장을 제한하고 있는 것이다._
그래서 이 부분을 잘 확장되도록 일반화 시켜야 한다.

:::

문제를 더 깊게 살펴보면, 지금 **Processor의 `Spec`이 `Code`로 정의 된 상태다.**
그래서 ViewModel이 자유롭게 작성되는 것 처럼 보이지만 사실 _엄격하게 제한된 Spec을 기반으로 작성 되고 있다._
따라서 Code를 읽지 않으면 데이터 형식을 옳바르게 작성할 수 없게 된다.

그러면 어떻게 ViewModel을 자유롭게 작성하게 할 수 있도록 만들 수 있을까?
바로 _어떤 형식이든 Getter와 Setter로 만드는 Parser와 Observer를 만드는 것이다._

```js{8-9,11-12,18-19}
const ViewModel = class extends ViewModelSubject {
  static KEY = Symbol()
  // 모든 Key를 Observer에게 보고한다.
  define(target, k, v) {
    if (v && typeof v == 'object' && !(v instanceof ViewModel)) {
      if (v instanceof Array) {
        target[k] = []
        target[k][ViewModel.KEY] = target[ViewModel.KEY] + '.' + k // 상대적인 경로 표기. key의 확장
        v.forEach((v, i) => this.define(target[k], i, v))
      } else {
        target[k] = { [ViewModel.KEY]: target[ViewModel.KEY] + '.' + k } 
        Object.entries(v).forEach(([ik, iv]) => this.define(target[k], ik, iv))
      }
      Object.defineProperty(target[k], 'subKey', {
        get: () => target.subKey
      })
    } else {
      // 재귀 함수는 재귀가 끝나는 조건을 명확하게 알면 된다.
      // 종결 조건을 반드시 만들어야 한다.
      if (v instanceof ViewModel) v._setParent(this, k)
      Object.defineProperties(target, {
        [k]: {
          enumerable: true,
          get: _ => v,
          set: newV => {
            v = newV
            this.add(new ViewModelValue(target.subKey, target[ViewModel.KEY], k, v))
          }
        }
      })
    }
  }

  constructor (data, _ = type(data, "object")) {
    super()
    this[ViewModel.KEY] = 'root'
    Object.entries(data).forEach(([k, v]) => this.define(this, k, v))
    Object.seal(this)
  }
}
```

::: tip 재귀 함수

기본적으로 재귀 함수는 느리고 위험성이 크다.
함수를 실행하면 `Call Stack` 이라는 것이 쌓이게 되는데,
브라우저에서는 Call Stack의 한계치가 있기 때문에 안전하다고 볼 수 없다.

\* 다만 사파리의 경우 꼬리 물기 최적화가 되어 있기 때문에 다른 브라우저보단 재귀 함수의 작동이 비교적 안전하다.

_그래서 알고리즘에 대한 이해도가 뛰어나다면, 재귀 함수 대신 stack 자료구조를 사용하여 반복문을 통해 구현 하는 것이 좋다._

:::

::: tip if Statement(조건 분기)

조건 분기의 경우 _Optional과 Mandatory_ 두 가지가 있다.

- **Optional** : else를 사용하지 않음
- **Mandatory** : else를 사용함

조건 문의 경우 어떻게 보면 당연한 이야기지만, _else를 사용하고 안하고에 따라서 코드의 의도가 굉장히 달라진다._

재귀 함수의 경우, 재귀가  끝나는 조건이 필요하다. 그렇기 때문에 Mandatory한 분기 문을 통해서 재귀의 종료를 명시해야 한다.  

:::

그리고 Binder에서 Processor를 가져올 때 **Category를 식별하는 로직**이 필요하다.

```js{9}
const Binder = class extends ViewModelListener {
  viewmodelUpdated (updated) {
    const items = {}
    this.#items.forEach(({ vmName, el }) => {
      items[vmName] = [type(rootViewModel[vmName], ViewModel), el]
    })
    updated.forEach(({ subKey, category, k, v }) => {
      if (!items[subKey]) return
      const [vm, el] = items[subKey], processor = this.#processors[category.split('.').pop()]
      if (!el || !processor) return
      processor.process(vm, el, k, v)
    })
  }}
```

_이제 특정 Key 를 규정하는 것은 Processor 밖에 없다._ ViewModel은 아무런 Spec도 강요하지 않게 되었다.

```js
const SetDomProcessor = (() => {
  const visitor = new DomVisitor
  const scanner = new DomScanner(visitor)
  // Process가 단순한 이유는 Binder가 무거워졌기 때문
  // 이에 대한 의사결정은 조직에 따라 달라짐
  const baseProcessors = [
    new class extends Processor {
      _process (vm, el, k, v) { el.style[k] = v } 
    }('styles'),
    new class extends Processor {
      _process (vm, el, k, v) { el.setAttribute(k, v) }
    }('attributes'),
    new class extends Processor {
      _process (vm, el, k, v) { el[k] = v }
    }('properties'),
    new class extends Processor {
      _process (vm, el, k, v) { el[`on${k}`] = e => v.call(el, e, vm) }
    }('events')
  ]
  const setProcessor = () => {
    const binder = type(scanner.scan(document.body), Binder)
    baseProcessors.forEach(v => binder.addProcessor(v))
  }
})();
const binder = SetDomProcessor();
```

## List를 표현하기

이제 List를 표현할 수 있도록 Processor와 Scanner를 개선해야 한다.

```html{4-6}
<section id="target" data-viewmodel="wrapper">
  <h2 data-viewmodel="title"></h2>
  <section data-viewmodel="contents"></section>
  <ol data-viwmodel="list">
    <li data-template="listItem" data-viewmodel="item"></li>
  </ol>
</section>
```

먼저 list를 `data-template` 이라는 attribute로 표현한다고 했을 때, 다음과 같이 Scanner를 수정하면 된다.

```js{2,10-14}
const DomScanner = class extends Scanner {
  static #templates = new Map
  static get (k) { return this.#templates.get(k) }
  constructor (visitor, _ = type(visitor, DomVisitor)) {
    super(visitor)
  }
  scan (target, _ = type(target, HTMLElement)) {
    const binder = new Binder
    const f = el => {
      const template = el.getAttribute('data-template')
      if (template) {
        el.removeAttribute('data-template')
        DomScanner.#templates.set(template, el)
        el.parentElement?.removeChild(el) // Chrome 80 부터 Optional Chaining을 사용할 수 있게 됨
      } else {
        const vm = el.getAttribute('data-viewmodel')
        if (vm) {
          el.removeAttribute('data-viewmodel')
          binder.add(new BinderItem(el, vm)) 
        }
      }
    }
    f(target)
    this.visit(f, target)
    return binder
  }
}
```

그리고 data-template을 사용하는 `Processor`를 만들어야 한다.
 
```js{8,10,28}
new class extends Processor {
  _process (vm, el, k, v) {
    const {
      name = err('no name'),
      data = err('no data'),
    } = vm.template
    const template = DomScanner.get(name) || err('no template' + name)
    if (!(data instanceof Array)) err('invalid data:' + data)
    data.forEach((vm, i) => {
      if (!(vm instanceof ViewModel)) err(`invalid Viewmodel: ${i} - ${vm}`)
    })
    
    // 여기까지가 bloack list - 검증로직
    // ------------------------------
    // 여기서 부터는 검증하지 않는다.
    // ------------------------------
    // 여기서 부터 white list - 제어로직

    Object.freeze(data)
    visitor.visit(el => {
      if (el.binder) {
        const [binder, vm] = el.binder
        binder.unwatch(vm)
        delete el.binder
      }
    }, el)
    el.innerHTML = ''
    data.forEach((vm, i) => {
      const child = template.cloneNode(true)
      const binder = setProcessor(scanner.scan(child))
      el.binders = [binder, vm]
      binder.watch(vm)
      el.appendChild(child)
    })
  }
}('template')
```

코드를 작성할 때 _BlackList 영역에서 변수에 대한 검증을 하여 검증이 완료 된 WhiteList를 만든다._  
이렇게 할 경우 _로직은 WhiteList로 작성할 수 있다._

이제 ViewModel의 Client 코드에 template 부분을 추가해줘야 한다.

```js
const rootViewModel = ViewModel.get({
  // ... 생략
  list: ViewModel.get({
    template: {
      name: 'listItem',
      data: '1,2,3,4,5,6'.split(',').map(v => ViewModel.get({
        item: ViewModel.get({
          styles: { background: `rgb(${getRandom()},${getRandom()},${getRandom()})` },
          properties: { innerHTML: `item${v}` }
        })
      }))
    }
  })
})
```

## Decorator Pattern 적용

::: tip Decorator Pattern

- Decoratoer Pattern은 _객체의 결합 을 통해 기능을 동적으로 유연하게 확장 할 수 있게 해준다._
- 추가할 수 있는 기능의 종류가 많은 경우 사용하기 좋다.
- 추가 기능을 Decorator로 정의 한 후 조합 하여 설계 하는 방식이다.
  - 객체의 의존성이 분산 된다
  - 각각의 객체가 하나의 의존성을 갖는다
  - _의존성의 분산 = 책임의 분산_
- Collection을 Linked List로 관리하는 것이라고 볼 수도 있다

:::

기존의 Processor는 Collection 형태로 관리된다.
그래서 _의존성이 Collection에 몰리게 되고 이에 따라 책임이 비대해진다._

Collection을 사용하게 되면 높은 확률로 일반화가 무너지게 된다.
특히 행위를 갖는 객체를 Collection으로 갖게 되면 문제가 발생할 확률이 높다.
행위(Method)를 갖는 다는 것은 **객체마다 가지고 있는 동작이 다르다는 것**인데 이걸 Collection으로 묶을 경우 _여러 가지 상황에 대한 대응이 힘들어질 수 밖에 없다._  

그래서 Collection으로 관리 되고 있는 객체들을 Decoration Pattern을 사용하여
_Linked List로 분산_ 시킨 다음 각각의 객체가 갖는 Method는 각자 알아서 실행하고 다음 객체를 호출하면 된다.

즉, **Loop를 Object에게 위임하는 것**이라고 생각할 수도 있다. 코드를 객체로 바꾸는 것이다.

이제 코드상으로 살펴보자. 먼저 `Processor`를 수정해야 한다.

```js{14-15,17-18,21-24}
const Processor = class {
  category;
  #next = null;
  constructor (category) {
    this.category = category
    Object.freeze(this)
  }
  process (category, vm, el, k, v,
            _0 = type(vm, ViewModel),
            _1 = type(el, HTMLElement),
            _2 = type(k, "string")) {
    this._process(vm, el, k, v)

    // next가 있을 경우, next의 process를 실행한다.
    if (this.#category === category) this._process(vm, el, k, v)

    // category
    if (this.#next !== null) this.#next.process(category, vm, el, k, v)
  }
  _process (vm, el, k, v) { throw 'override' }
  next (processor) {
    this.#next = processor
    return processor
  }
}
```

위의 코드는 다음과 같이 사용될 수 있다

```js
const processor = new class extends Processor {
_process (vm, el, k, v) { el.style[k] = v }
}('styles')
processor
  .next(new class extends Processor {
    _process (vm, el, k, v) { el.setAttribute(k, v) }
  }('attributes'))
  .next(new class extends Processor {
    _process (vm, el, k, v) { el[k] = v }
  }('properties'))
  .next(new class extends Processor {
    _process (vm, el, k, v) { el[`on${k}`] = e => v.call(el, e, vm) }
  }('events'))
```

그리고 `Binder` 또한 고쳐줘야 한다.

```js{11}
const Binder = new class extends ViewModelListener {
  // .. 생략
  // addProcessor, #processors 삭제
  #processor = null
  set processor (v) { this.#processor = v }
  render (viewmodel, _ = type(viewmodel, ViewModel)) {
    this.#items.forEach(({ vmName, el }) => {
      const vm = type(viewmodel[vmName], ViewModel)
      Object.entries(vm).forEach(([category, childVm]) => {
        Object.entries(childVm).forEach(([k, v]) => {
          this.#processor.process(category, vm, el, k, v) // 각각의 processorr가 category를 식별하여 실행함
        })
      })
    })
  }
}
```

이제 `Binder`에 `Processor`를 주입할 땐 다음과 같이 해야 한다.

```js
const visitor = new DomVisitor
const scanner = new DomScanner(visitor)
const binder = type(scanner.scan(document.body), Binder)

// 첫 번째 processor 주입
binder.processor = new class extends Processor {
_process (vm, el, k, v) { el.style[k] = v }
}('styles')

// 나머지 processor 주입
binder.processor 
.next(new class extends Processor {
  _process (vm, el, k, v) { el.setAttribute(k, v) }
}('attributes'))
.next(new class extends Processor {
  _process (vm, el, k, v) { el[k] = v }
}('properties'))
.next(new class extends Processor {
  _process (vm, el, k, v) { el[`on${k}`] = e => v.call(el, e, vm) }
}('events'))
```

## 최종 코드

Decorator 까지 반영한 코드는 다음과 같다.

<<< @/CodeSpitz/Object-Oriented-Javascript/05-Extension/example.html

[GitHub에서 보기](https://github.com/JunilHwang/TIL/blob/master/CodeSpitz/Object-Oriented-Javascript/05-Extension/example.html)

## 생각 정리

- 함부로 성급한 일반화를 하지 않기 위해선 코어(본체)를 가볍게 만들고, 뒤쪽으로 밀어내면 좋다.
- 코어는 안전해지고 가볍지만, 마지막 구현체에 따라서 프로젝트가 실패할 수 있다.
- 제어역전을 통해서 코어를 무겁게 만들면 은신의 폭이 좁아지게 된다.
  - 안정화된 서비스 → 잘 변하지 않음 → 제어 역전의 효과를 보기가 쉽다.
  - 성장하는 서비스 → 잘 변함 → 제어 역전의 효과를 보기가 힘들다.
- 현대의 존재하는 대부분의 프레임워크는 코어를 가볍게 만든다.
  - 대부분의 기능은 코어에 연결된 플러그인에게 위임한다
  - 즉, 제어역전이 플러그인들에게 분할되어 있다.
  - 코어 : Vue
  - 플러그인 : VueRouter, Vuex, VueLoader 