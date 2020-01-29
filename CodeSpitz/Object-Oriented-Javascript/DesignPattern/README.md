---

title: MVVM System 개선
description: 다양한 Design Pattern을 이용하여 MVVM System을 개선하는 방법에 대해 소개합니다.
date: 2020-01-28
sidebarDepth: 2

---

# MVVM 개선하기

다양한 Design Pattern을 이용하여 MVVM System을 개선하는 방법에 대해 소개합니다.

## Strategy Pattern

`Strategy(전략)`이란 쉽게 말해서 프로그램을 만들었을 때 핵심적인 부분을 의미한다. 이전에 MVVM System을 만들 때 만든 Binder의 코드를 분해해보면 다음과 같다.

::: tip Structure

먼저 Binder에 대한 `자료구조` 부분이다.

``` js{2-6}
const Binder = class {
  #items = new Set()
  add (v, _ = type(v, BinderItem)) { this.#items.add(v) }
  render (viewmodel, _ = type(viewmodel, ViewModel)) {
    this.#items.forEach(item => {
      const vm = type(viewmodel[item.viewmodel], ViewModel), el = item.el
      Object.entries(vm.styles).forEach(([k, v]) => el.style[k] = v)
      Object.entries(vm.attributes).forEach(([k, v]) => el.attribute[k] = v)
      Object.entries(vm.properties).forEach(([k, v]) => el[k] = v)
      Object.entries(vm.events).forEach(([k, v]) => el[`on${k}`] = e => v.call(el, e, viewmodel))
    })
  }
}
```
:::

::: tip Control

`자료구조`를 제어하는 부분이다.

``` js{7-10}
const Binder = class {
  #items = new Set()
  add (v, _ = type(v, BinderItem)) { this.#items.add(v) }
  render (viewmodel, _ = type(viewmodel, ViewModel)) {
    this.#items.forEach(item => {
      const vm = type(viewmodel[item.viewmodel], ViewModel), el = item.el
      Object.entries(vm.styles).forEach(([k, v]) => el.style[k] = v)
      Object.entries(vm.attributes).forEach(([k, v]) => el.attribute[k] = v)
      Object.entries(vm.properties).forEach(([k, v]) => el[k] = v)
      Object.entries(vm.events).forEach(([k, v]) => el[`on${k}`] = e => v.call(el, e, viewmodel))
    })
  }
}
```
:::

::: tip Strategy

마지막으로 Binder의 핵심인 알고리즘 부분에 해당하는 부분이다.

- `([k, v]) => el.style[k] = v`
- `([k, v]) => el.attribute[k] = v`
- `([k, v]) => el[k] = v`
- ```([k, v]) => el[`on${k}`] = e => v.call(el, e, viewmodel)```

:::

Strategy는 Structure와 분리되어 작동할 수 없다. Strategy는 Structure를 가지고 있어야 작동한다. 객체지향에서는 이것을 composition이라는 기법을 이용하여 해결한다.

> code를 object(객체)로 바꾼다. object를 도출할 때 형태가 있어야 한다. 그래서 interface와 class로 도출해야 한다.

이럴 경우, binder는 startegy 객체에 대한 dependency가 생기게 된다.

::: tip 객체지향에서 Dependency가 발생하는 이유

나의 strategy를 외부에 있는 객체의 도움으로 해결하기 때문이다. why? 그렇게 하지 않으면 변화가 생길 때 마다 코드를 수정해야 하기 때문이다.

그래서 자연스럽게 의존성이 생기게 된다.

:::

위와 같은 내용으로 인하여 Binder는 BinderStrategy와 의존성이 생긴다.

그리고 의존성이 생겼을 때 내부에 있는 서브 타입을 만드는 경우가 있고, 외부에서 타입을 공급 받는 경우가 있다.
내부에서 sub type을 만들게 되면 계속에서 code를 수정 하게 되기 때문에 code에서 object로 변경한 의미가 없어지게 된다.
따라서 type은 외부에서 주입 받아야 한다. 이것을 `DI(Dependency Injection)` 라고 한다.

이렇게 객체지향에서 코드를 객체로 변환하는 순간 자동으로 `DI`가 생기게 된다. 그리고, Dependency가 만들어졌는데 DI가 생기지 않았다면 그것은 잘못 만든 것이다.

이제 Binder에서 위임하게 될 Processor Class를 만들어야 한다. 이러한 행위를 `Composition`이라고 한다.

``` js
const Processor = class {
  category;
  constructor (category) {
    this.category = category
    Object.freeze(this)
  }
  // 추상 클래스를 가정한다.
  process (vm, el, k, v, _0 = type(vm, ViewModel), _1 = type(el, HTMLElement), _2 = type(k, "string")) {
    this._process(vm, el, k, v)
  }
  // template method: hook
  _process (vm, el, k, v) { throw 'override' }
}
```

자식에게 위임하는 것을 `template method` 라고 하고, 자식쪽에 의존하고 있는 method를 `hook`이라고 한다.

이제 `Binder`를 수정해야 한다.

``` js
const Binder = class extends ViewModelListenter {
  #item = new Set;
  // category당 한 개의 processor를 사용하게 하기 위함
  // 자료구조를 선택할 때 심각하게 생각해야 한다.
  #processors = {};
  add(v, _ = type(v, BinderItem)){this.#item.add(v)}
  
  // 값을 사용하는 형태. 값을 방어하는 다른 체계를 만들어줘야 한다.
  addProcessor(v, _ = type(v, Processor)){this.#processors[v.category] = v}
  render(viewmodel, _ = type(viewmodel, ViewModel)) {
    const processores = Object.entries(this.#processors)
    this.#item.forEach(item => {
      const vm = type(viewmodel[item.viewmodel], ViewModel), el = item.el
      processores.forEach(([pk, processor]) => {
        Object.entries(vm[pk]).forEach(([k, v]) => {
          // Binder는 processor의 protocal을 알고 있다. 즉, 의존성이 생긴 것이다.
          // 이것을 알고리즘의 일반화라고 한다. (Generic Algorithm) => 제일 어려운 부분
          // structure를 남기고 Strategy을 type으로 내보낸다.
          // 안정화/일반화 되어 있는 코드는 protocal이 적다 = 만들기가 어렵다.
          processor.process(vm, el, k, v)
        })
      })
    })
  }
}
```

::: tip Strategy Step

1. 구조적인 부분과 strategy 부분을 나눈다.
2. strategy의 공통점을 찾는다.
3. strategy와 어떻게 상태와 관계를 맺는지 찾는다.
4. 앞에서 도출된 형을 가지고 알고리즘을 고치는 것

:::


@startuml
card Binder
card Processor
Binder ->> Processor : Dependency Injection
@enduml
Binder에 Processor를 주입 받는다. 그리고 의존성은 한 방향으로만 되어있어야 한다.

## Observer

이제 Observer를 만들어야 한다.

@startuml
rectangle View
agent Binder
rectangle ViewModel
rectangle Model

View -[hidden] Model
View <<-- Binder
Binder ->> ViewModel : Observe
Binder <<- ViewModel : notify
Model <<->> ViewModel
@enduml

Observer Pattern에서는 감시 당하는 쪽(Subject)이 변화가 생기면 Observer(Listener)에게 변화의 내용을 알려줘야 한다.

javascript 에서는 변화의 감지를 위해서 다음과 같은 API가 있다.

- `defineProperty` : 실무 상에서 사용할 수 있다.
- `Proxy` : Babel로 Converting이 되지 않는다.

``` js
const ViewModelListener = class {
  viewmodelUpdated(updated){throw 'override'}
}
const ViewModel = class {
  static get(data){return new ViewModel(data)}
  styles={}; attributes={}; properties={}; events={};
  #isUpadated = new Set; #listenters = new Set;
  addListener(v, _ = type(v, ViewModelListener)){ this.#listenters.add(v) }
  removeListener(v, _ = type(v, ViewModelListener)){ this.#listenters.delete(v) }
  notify(){this.#listenters.forEach(v => v.viewmodelUpdated(this.#isUpadated))}
  constructor(checker, data, _ = type(data, 'object')) {
    super();
    Object.entries(data).forEach(([k, obj]) => {
      if('styles,attributes,properties'.includes(k)) {
        this[k] = Object.defineProperties(obj, Object.entries(obj).reduce((r, [k, v]) => {
          r[k] = {
            enumerable: true,
            get: _ => v,
            set: newV => {
              v = newV; // 새로운 값에 대해 알린다.
              vm.#isUpdated.add(new ViewModelValue(category, k, v))
            }
          }
          return r
        }, {}))
      } else {
        Object.defineProperty(this, k, {
          enumerable: true,
          get: _ => v,
          set: newV => {
            v = newV
            this.#isUpadated.add(new ViewModelValue('', k, v))
          }
        })
      }
    })
  }
}
```

## Composite

나의 문제를 **위임을 반복**하여 취합하는 행위 = **동적위임**

``` js
const ViewModel = class extends ViewModelListener {
  // .. 생략
  subKey = ''; parent = null;
  constructor(checker, data, _ = type(data, 'object')) {
    super()
    Object.entries(data).forEach(([k, v]) => {
      if ('styles,attributes,properties'.includes(data, 'object')) {
        // .. 생략
      } else {
        Object.defineProperty(this, k, { /*생략*/ })
        if (v instanceof ViewModel) {
          // 역 참조할 수 있어야 한다. 
          v.parent = this
          v.subKey = k
          
          // 자식이 변화했을 때 변화를 알아차린다.
          // ViewModel 은 Subject이자 Listener 인 경우가 빈번하다.
          v.addListener(this)
        }
      }
    })
  }
  viewmodelUpdated (updated) {
    updated.forEach(v => this.#isUpdated.add(v))
  }
}
```

`ViewModelValue` 또한 변경해줘야 한다.

``` js
// Observer가 받는 Object = Info Object
// notify를 수신하는 Object
// Info Object를 잘 구성하기가 어렵다 
const ViewModelValue = class {
  subKey; category; k; v;
  constructor (subKey, category, k, v) {
    this.subKey = subKey
    this.category = category
    this.k = k
    this.v = v
    Object.freeze(this)
  }
}
```

`subKey` 가 생겼기 때문에, `defineProperty`도 수정해줘야 한다.

``` js
this.#isUpdated.add(new ViewModelValue(this.subKey, '', k, v))
```

마지막으로 `notify`와 `seal`을 추가해야 한다.

``` js
const ViewModel = class extends ViewModelListener {
  static #subjects = new Set
  static #inited = false
  static notify (vm) {
    this.#subjects.add(vm)
    if (this.#inited) return
    this.#inited = true
    const f = () => {
      this.#subjects.forEach(vm => {
        if (vm.#isUpdated.size) {
          vm.notify()
          vm.#isUpdated.clear()
        }
      })
      requestAnimationFrame(f)
    }
    requestAnimationFrame(f)
  }
  
  // .. 생략
  subKey = ''; parent = null;
  constructor(checker, data, _ = type(data, 'object')) {
    super()
    Object.entries(data).forEach(([k, v]) => { /* 생략 */ })
    ViewModel.notify(this)
    Object.seal(this)
  }
  
}
```

## Observer (2)

다시 Observer로 돌아와서, Binder의 입장을 살펴봐야 한다.

``` js
const Binder = class extends ViewModelListener {
  #items = new Set; #processors = {}
  add(v, _ = type(v, BinderItem)){ this.#items.add(v) }
  addProcessor(v, _ = type(v, Processor)){/*생략*/}
  render(viewmodel, _ = type(viewmodel, ViewModel)){/*생략*/}
  watch(viewmodel, _ = type(viewmodel, ViewModel)){
    viewmodel.addListener(this)
    this.render(viewmodel)
  }
  unwatch(viewmodel, _ = type(viewmodel, ViewModel)){
    viewmodel.removeListener(this)
  }
  viewmodelUpdated (updated) {
    const items = {}
    this.#items.forEach(item => {
      items[item.viewmodel] = [type(viewmodel[item.viewmodel], ViewModel), item.el]
    })
    updated.forEach(({ subKey, category, k, v }) => {
      if (!items[subKey]) return
      const [vm, el] = items[subKey], processor = this.#processors[category]
      // injection 이 안 되어 있을 경우  return
      if (!el || !processor) return
      processor.process(vm, el, k, v) 
    })
  }
}
```

## Client

위에서 작성한 코드를 직접 사용해보자.

``` js
const scanner = new Scanner()
const binder = scanner.scan(document.querySelector('#target'))
binder.addProcessor(new (class extends Processor {
  _process (vm, el, k, v) { el.style[k] = v }
})('styles'))
binder.addProcessor(new (class extends Processor {
  _process (vm, el, k, v) { el.setAttribute(k, v) }
})('attributes'))
binder.addProcessor(new (class extends Processor {
  _process (vm, el, k, v) { el[k] = v }
})('properties'))
binder.addProcessor(new (class extends Processor {
  _process (vm, el, k, v) { el[`on${k}`] = e => v.call(el, e, vm) }
})('events'))

const getRandom = () => parseInt(Math.random() * 150) + 100
const viewmodel = ViewModel.get({
  isStop: false,
  changeContents () {
    // render 사라졌다
    this.wrapper.styles.background = `rgb(${getRandom()},${getRandom()},${getRandom()})`
    this.contents.properties.innerHTML = Math.random().toString(16).replace('.', '')
  },
  wrapper: ViewModel.get({
    styles: { width: '50%', background: '#ffa', cursor: 'pointer' },
    events: {
      click(e, vm) {
        vm.parent.isStop = true // 부모(wrapper)의 값을 변경한다.
      }
    }
  }),
  title: ViewModel.get({
    properties: { innerHTML: 'Title' }
  }),
  contents: ViewModel.get({
    properties: { innerHTML: 'Contents' }
  })
})

// watch가 생겼다.
binder.watch(viewmodel)
const f = () => {
  // render가 사라졌다.
  viewmodel.chagneContents()
  if (!viewmodel.isStop) requestAnimationFrame(f)
}
requestAnimationFrame(f)
```