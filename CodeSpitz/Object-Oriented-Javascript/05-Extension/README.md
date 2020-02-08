---

title: MVVM System 개선하기 (3)
description: MVVM System을 최종적으로 어떻게 개선하였는지 설명합니다.
date: 2020-02-07
sidebarDepth: 2
feed:
  enable: true

---

# MVVM System 개선하기 (3)

객체지향 자바스크립트 마지막 포스팅입니다.

::: tip 해당 포스트는 아래의 내용들을 토대로 정리한 것입니다.

- [코드스피츠 86기 5회차 동영상](https://www.youtube.com/watch?v=5UUISCK6CL4)
- 5회차는 따로 교안이 없고, [코드](https://gist.github.com/hikaMaeng/ae5301b2808afd150c4f55a47bd9466a)로 대체

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
  notify () { this.#listeners.forEach(v => v.viewmodelUpdated(this.#isUpdated, this)) }
  // ViewModel에서 실행한 viewmodelUpdated는 viewmodel 인자를 사용하지 않는다.
  viewmodelUpdated (viewmodel, updated) { updated.forEach(v => this.#isUpdated.add(v)) }
}
```

---

그런데 [MVVM System 개선하기 (2)](../04-ISP-Visitor)에서 만든 viewmodelUpdated는 위와 같이 단순하지가 않다.
`ViewModelSubject`는 `notify`를 통해 `Binder`에게 viewmodel의 updated 내역을 알린다.
다르게 말하자면 **ViewModelSubject와 Binder가 계약(의존 관계)을 맺고 있기 때문**이다.

그래서앞서 작성한 코드를 그대로 사용할 경우,
Binder에서 받아들이는 viewmodel이 ViewModelSubject일 수도 있고,
ViewModel일 수도 있게 된다.

그래서 Binder에서 사용하는 viewmodelUpdated가 무조건 ViewModel이 되도록 만들어야 하는데,
이를 위해 _ViewModelSubject에서 Binder에게 넘기는 Parameter(viewmodel)를 ViewModel에게 위임해야 한다._

```js
const ViewModelSubject = class extends ViewModelListener {
  // ... 생략
  notify () { this.#listeners.forEach(v => v.viewmodelUpdated(this.#info, this.notifyTarget)) }
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
  viewmodelUpdated(updated, target,
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

```js{11,24,42,45,48,51}
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
          v.setParent(this, k)
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

위 코드들의 문제점은 분명히 Processor는 확장 가능 하도록 만들었는데, 
ViewModel 에서는 Processor의 종류를 style attributes properties 등으로 제한 하고 있다는 것이다.

즉, ViewModel이 Processor의 확장을 제한하고 있는 것이다.
그래서 이 부분을 잘 확장되도록 일반화 시켜야 한다.

> 처리기(Processor)는 데이터 구조(ViewModel)과 동기화 되어야 한다.

문제를 좀더 깊게 살펴보면, 지금 Spec이 Code로 정의 된 상태다.
그래서 ViewModel이 자유롭게 작성되는 것 처럼 보이지만 사실 엄격하게 제한된 Spec을 기반으로 작성 되고 있다.
따라서 Code를 읽지 않으면 데이터 형식을 옳바르게 작성할 수 없게 된다.

우리가 해야 하는 것은 자유롭게 ViewModel을 작성하게 할 수 있을까?
어떤 형식이든 Getter와 Setter로 만드는 Parser와 Observer를 만들어야 한다.

```js{8,11,18-19}
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
          enumrable: true,
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

그리고 Binder에서 Processor를 가져올 때 Category를 식별하는 로직이 필요하다.

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

이제 특정 Key 를 규정하는 것은 Processor 밖에 없다. ViewModel은 아무런 Spec도 강요하지 않게 되었다.

```js
const SetDomProcessor = (() => {
  const visitor = new DomVisitor
  const scanner = new DomScanner(visitor)
  const baseProcessors = [
    new class extends Processor {
      _process (vm, el, k, v) { el.style[k] = v } // Process가 단순한 이유는 Binder가 무거워졌기 때문에
                                                  // 의사결정은 조직에 따라 달라진다.
                                                  // Code의 Batch는 사람을 보고 결정한다.
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
  const setProcessor = (binder, _ = type(binder, Binder)) => {
    baseProcessors.forEach(v => binder.addProcessor(v)) // 데코레이터
  }
})();
```

---

데코레이터 패턴
Linked List로 처리기를 알고 있는 것 - 의존성이 하나만 생긴다. - 책임 감소
컬렉션을 사용할 경우 : 의존성이 여러개 생긴다. - 책임 막중
일반화를 깨는 대부분의 요인이 컬렉션이다.
객체 마다 사정이 있다
행위를 갖는 객체를 Collection으로 갖게 되면 문제가 발생할 확률이 높다.
그럴 때 Decoration Pattern을 사용하여 Linked List로 실행시키면 된다.
loop가 나왔을 때 객체로 바꾸는 패턴.
코드를 객체로 바꿔야 한다.

함부로 성급한 일반화를 하지 않기 위해선 본체를 가볍게 만들고, 뒤쪽으로 밀어내면 좋다.
코어는 안전해지고 가볍지만, 마지막 구현체에 따라서 프로젝트가 실패할 수 있다.

제어역전을 통해서 코어를 무겁게 만들면 은신의 폭이 좁아지게 된다.

안정화된 서비스 - 잘 변하지 않음 - 제어 역전의 효과를 보기가 쉽다.

성장하는 서비스 - 잘 변함 - 제어 역전의 효과를 보기가 힘들다.

---


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

먼저 list를 data-template 이라는 attribute로 표현한다고 했을 때, 다음과 같이 Scanner를 수정하면 된다.

```js
const DomScanner = class extends Scanner {
  static #templates = new Map
  static get (k) { return this.#tempaltes.get(k) }
  constructor (visitor, _ = type(visitor, DomVisitor)) {
    super(visitor)
  }
  scan (target, _ = type(target, HTMLElement)) {
    const binder = new Binder
    const f = el => {
      const template = el.getAttribute('data-template')
      if (template) {
        el.removeAttribute('data-template')
        DomScanner.#template.set(template, el)
        el.parentElement?.removeChild(el)
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

그리고 data-template을 사용하는 Processor를 만들어야 한다. 
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
}
```

- 코드를 작성할 때 BlackList 영역에서 WhiteList를 뽑아내어 로직을 작성해야 한다.

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