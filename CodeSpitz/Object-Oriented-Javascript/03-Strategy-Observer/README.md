---

title: MVVM System 개선하기 (1)
description: 다양한 Design Pattern을 이용하여 MVVM System을 개선하는 방법에 대해 소개합니다.
sidebarDepth: 2
date: 2020-02-15

---

# MVVM System 개선하기 (1)

::: tip 해당 포스트는 아래의 내용들을 토대로 정리한 것입니다.

[코드스피츠 86기 3회차 동영상](https://www.youtube.com/watch?v=D450fPGffTg)

:::

Strategy, Observer, Composite 등의 Design Pattern 을 이용하여 [앞서 작성한 MVVM System](CodeSpitz/Object-Oriented-Javascript/02-MVVM)을 개선하는 방법에 대해 기술합니다.

## Strategy Pattern

`Strategy(전략)`이란 쉽게 말해서 프로그램의 핵심적인 부분을 의미한다.

### Defined

- 목적을 달성하기 위해 일을 수행하는 방식, 비즈니스 규칙, 문제를 해결하는 알고리즘 등
- Stategy Pattern: **전략을 쉽게 바꿀 수 있도록** 해주는 디자인 패턴
- **같은 문제를 해결하는 여러 알고리즘**이 클래스별로 캡슐화되어 있고 이들이 필요할 때 교체할 수 있도록 함

@startuml
interface Strategy
Context *- Strategy : Context에서 Strategy를 사용한다.
Strategy <|-- "구현체1" StrategyImplementer01
Strategy <|-- "구현체2" StrategyImplementer02
@enduml

### Strategy 분석 및 추출

앞서 작성한 MVVM System의 `Binder`를 분해해보면 다음과 같다.

- 먼저 Binder에 대한 `Structure(자료구조)` 부분이다.
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

- `자료구조`를 `Control(제어)`하는 부분이다.
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

- 마지막으로 Binder의 핵심인 `Strategy(전략,알고리즘)`에 해당하는 부분이다.
  ``` js{8,11,14,17}
  const Binder = class {
    #items = new Set()
    add (v, _ = type(v, BinderItem)) { this.#items.add(v) }
    render (viewmodel, _ = type(viewmodel, ViewModel)) {
      this.#items.forEach(item => {
        const vm = type(viewmodel[item.viewmodel], ViewModel), el = item.el
        Object.entries(vm.styles).forEach(
          ([k, v]) => el.style[k] = v
        )
        Object.entries(vm.attributes).forEach(
          ([k, v]) => el.attribute[k] = v
        )
        Object.entries(vm.properties).forEach(
          ([k, v]) => el[k] = v
        )
        Object.entries(vm.events).forEach(
          ([k, v]) => el[`on${k}`] = e => v.call(el, e, viewmodel)
        )
      })
    }
  }
  ```

`Strategy`는 `Structure`를 가지고 있어야 작동하는데 이 때 `Composite Pattern`을 이용하여 해결한다.
Strategy Pattern을 사용한다는 것은 **알고리즘이 사용된 Code를 object(객체)로 바꾸는 것**이라고 할 수 있다.
그리고 이 때 **Binder는 Strategy에 대한 Dependency**가 생기게 된다.

### Dependency Injection

::: tip Dependency가 발생하는 이유와 Dependency Injection

객체지향에서는 자신이 가지고 있는 문제를 외부에 있는 객체의 도움(Strategy)을 통해 해결하기 때문에 자연스럽게 Dependency가 생기게 된다.
반대로 외부 객체의 도움이 없다면 스스로 문제를 해결해야 한다는 것인데, 그 의미는 코드의 수정이 빈번하게 일어난다는 것이다.

의존성이 생겼을 때 내부에 `Sub Type`을 만드는 경우가 있고, 외부에서 `Type을 공급(Injection)` 받는 경우가 있다.
Sub Type 사용시 계속에서 code를 수정 하게 되기 때문에 code에서 object로 변경한 의미가 없어지게 된다.
따라서 type은 외부에서 주입 받아야 한다. 이것을 `DI(Dependency Injection)` 라고 한다.
그래서 Strategy를 도출하는 순간 자동으로 `Dependency Injection`이 생기게 된다.
**반대로 Dependency는 있는데 DI가 생기지 않았다면 그것은 잘못된 것이다.**

:::

이제 Binder의 Strategy가 무엇인지 알았으니 이것을 **추출하여 위임** 해야 한다.
**이러한 행위를 `Composition`이라고 한다.**

``` js
// Binder의 Strategy가 될 Class
const Processor = class {
  category;
  constructor (category) {
    this.category = category
    Object.freeze(this)
  }
  
  // template method
  process (vm, el, k, v, _0 = type(vm, ViewModel),
                         _1 = type(el, HTMLElement),
                         _2 = type(k, "string")) {
    this._process(vm, el, k, v)
  }
  
  // hook method
  _process (vm, el, k, v) { throw 'override' }
}
```

코드를 보면 **process method의 책임을 _process method에게 위임**한다.
이 때 processor class를 상속 받아서 _process를 구현 하게 되는 데,
*구현되는 method(_process)* 를 `Hook Method`라고 한고,
*Hook method(_proces)에게 책임을 위임하게 되는 method(process)* 를 `Template Method` 라고 한다.

이것을 Template Method Pattern 이라고 한다. 자세한 내용은 [여기](https://gmlwjd9405.github.io/2018/07/13/template-method-pattern.html)를 참고하면 된다.

***

- `process`
  - Template method
  - Hook Method에게 책임을 위임한다.

- `_process`
  - Hook method
  - template method에서 호출되는 method

***

 `Processor`를 작성했으면, `Binder`를 수정해야 한다.

``` js{3,4,8,9,16-20}
const Binder = class {
  #item = new Set
  #processors = {}  // category당 한 개의 processor를 사용하게 하기 위함
                    // 자료구조를 선택할 때 심각하게 생각해야 한다.
                    
  add (v, _ = type(v, BinderItem)) { this.#item.add(v) }
  
  // Strategy를 주입 받는다.
  addProcessor (v, _ = type(v, Processor)) { this.#processors[v.category] = v }
  
  // Render에서 주입 받은 Strategy를 사용한다.
  render (viewmodel, _ = type(viewmodel, ViewModel)) {
    const processores = Object.entries(this.#processors)
    this.#item.forEach(item => {
      const vm = type(viewmodel[item.viewmodel], ViewModel), el = item.el
      processores.forEach(([pk, processor]) => {
        Object.entries(vm[pk]).forEach(([k, v]) => {
          processor.process(vm, el, k, v)
        })
      })
    })
  }
}

```

::: tip 알고리즘의 일반화(Generic Algorithm)

- structure를 남기고 Strategy을 type으로 내보낸다.
- Binder는 processor의 protocal을 알고 있다 = 의존성이 생긴 것
- 이러한 과정을 **알고리즘의 일반화(Generic Algorithm)라고 함** → 제일 어려운 부분
- 안정된 Generic Algorithm은 protocal이 적다 → 만들기가 어렵다.

:::

그리고 Strategy를 주입하는 Client Code는 다음과 같다.

``` js{2,5,8,11}
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

@startuml
card Binder
card Processor
Binder ->> Processor : Dependency Injection
@enduml

- Binder가 Processor를 주입 받는다
- 의존성은 단 방향으로만 되어있어야 한다.
- ~~Binder가 Processor를 짝사랑한다.~~

### 정리

- 구조적인 부분과 strategy 부분을 나눈다.
- strategy의 공통점을 찾는다.
- strategy와 어떻게 상태와 관계를 맺는지 찾는다.
- 앞에서 도출된 형(type,class,interface)을 가지고 알고리즘을 고치는 것

## Observer Pattern

기존에는 Observer 대신에 Call을 사용했다.

@startuml
rectangle View
rectangle Binder
rectangle Model
agent ViewModel

View -[hidden] Model
View <<-- Binder
Binder <<->> ViewModel : **call**
Model <<-- ViewModel
Model -->> ViewModel
@enduml

이제 Call을 이용하는 방식에서 Observer Pattern을 이용하는 방식으로 바꿔야 한다.

@startuml
rectangle View
rectangle Binder
rectangle Model
agent ViewModel

View -[hidden] Model
View <<-- Binder
Binder ->> ViewModel : Observe
Binder <<- ViewModel : Notify
Model <<-- ViewModel
Model -->> ViewModel
@enduml

Observer Pattern에서 중요한 점은 **감시 당하는 쪽(Subject)이 변화가 생기면 Observer(Listener)에게 변화의 내용을 알려줘야 한다(Notify).**

Javascript는 변화의 감지를 위해 사용하는 다음과 같은 API가 있다.

- `Proxy` : Babel로 Converting이 되지 않는다 = 실무에서 사용할 때 제약이 있다.
- `defineProperty` : ES5 까지 지원한다 =  실무 상에서 사용할 수 있다.

이러한 이유로 defineProperty를 이용하여 만들어볼 것이다.

### Listener

일단 변화의 감지에 대한 내용을 수신하는 객체가 필요하다.

``` js
const ViewModelListener = class {
  viewmodelUpdated(updated){throw 'override'}
}
```

Listener는 Binder와 ViewModel이 상속 받아 사용할 것이다.

``` js
const Binder = class extends ViewModelListner {
  // .. 생략
  viewmodelUpdated (updated) {}
}
const ViewModel = class extends ViewModelListner {
  // .. 생략
  viewmodelUpdated (updated) {}
}
```

ViewModel에도 Listener가 필요한 이유는, _자식의 변화를 부모가 알아야 하기 때문이다._

### ViewModel

ViewModel에서 notify는

`Object.defineProperty`는 객체에 직접 새로운 속성을 정의하거나 이미 존재하는 속성을 수정한 후 그 객체를 반환한다.

`Parameter`는 다음과 같다.

- `obj` 속성을 정의할 객체
- `prop` 새로 정의하거나 수정하려는 속성의 이름
- `descriptor` 새로 정의하거나 수정하려는 속성을 기술하는 객체
  - `enumerable` iterator에 노출 가능 여부(true|false)
  - `get` prop에 대한 getter
  - `set` prop에 대한 setter

``` js{6-10,27,29}
const ViewModel = class extends ViewModelListener {
  static get = data => new ViewModel(data)
  static descriptor = (vm, category, k, v) => ({
    enumerable: true,
    get: () => v,
    set: newV => {
      // 값을 대체 후, isUpdated에 등록하고, listener에게 변경된 내역이 전달된다.
      v = newV
      vm.#isUpdated.add(new ViewModelValue(vm.subKey, category, k, v))
    }
  })
  static defineProperties = (vm, category, obj) => (
    Object.defineProperties(
      obj,
      Object.entries(obj)
            .reduce((r, [k, v]) => (r[k] = ViewModel.descriptor(vm, category, k, v), r), {})
      )
  )
  
  styles={}; attributes={}; properties={}; events={};
  #isUpadated = new Set; #listenters = new Set;
  
  constructor(checker, data, _ = type(data, 'object')) {
    super();
    Object.entries(data).forEach(([k, obj]) => {
      if('styles,attributes,properties'.includes(k)) {
        this[k] = ViewModel.defineProperties(this, k, v)
      } else {
        Object.defineProperty(this, k, ViewModel.descriptor(this, '', k, v))
      }
    })
  }
  addListener (v, _ = type(v, ViewModelListener)) { this.#listenters.add(v) }
  removeListener (v, _ = type(v, ViewModelListener)) { this.#listenters.delete(v) }
  notify () { this.#listenters.forEach(v => v.viewmodelUpdated(this.#isUpadated)) }
  viewmodelUpdated (updated) { updated.forEach(v => this.#isUpdated.add(v)) }
}
```

이 코드의 핵심은 **descriptor에 정의한 setter를 통해서 값을 대체 한 다음 isUpdated에 변경된 내역을 추가하는 것이다.**

### Composite

Composite Pattern은 **위임을 반복**하여 취합한다 = **동적위임**

이것을 ViewModel에 적용해야 한다.

``` js{2-3,12-17,25,34-39,42-43,47-48}
const ViewModel = class extends ViewModelListener {
  static #subjects = new Set
  static #inited = false
  static get = data => new ViewModel(data)
  static descriptor = (/* 생략 */)
  static defineProperties = (/* 생략 */)
  static notify (vm) { // 변화를 감지하고 Observer(Binder)에게 알린다.
    this.#subjects.add(vm)
    if (this.#inited) return
    this.#inited = true
    const f = () => {
      this.#subjects.forEach(vm => { // 만들어진 ViewModel에 대해 반복문을 돌린다.
        if (vm.#isUpdated.size) { // 변경된 내역이 있을 경우
          vm.notify() // Listener에게 알리고
          vm.#isUpdated.clear() // 변경된 내역을 삭제한다.
        }
      })
      requestAnimationFrame(f)
    }
    requestAnimationFrame(f)
  }
  
  #isUpadated = new Set; #listenters = new Set;
  styles={}; attributes={}; properties={}; events={};
  subKey = ''; parent = null;
  
  constructor(checker, data, _ = type(data, 'object')) {
    super();
    Object.entries(data).forEach(([k, obj]) => {
      if('styles,attributes,properties'.includes(k)) {
        this[k] = ViewModel.defineProperties(this, k, v)
      } else {
        Object.defineProperty(this, k, ViewModel.descriptor(this, '', k, v))
        if (v instanceof ViewModel) {
          v.parent = this // 역 참조할 수 있어야 한다. 
          v.subKey = k
          v.addListener(this) // 자식이 변화했을 때 변화를 알아차린다.
                              // ViewModel 은 Subject이자 Listener 인 경우가 빈번하다.
        }
      }
    })
    ViewModel.notify(this) // ViewModel이 생성되는 시점에 변화의 감지를 시작한다.
    Object.seal(this) // key가 추가/수정/삭제 되지 않도록 한다.
  }
  addListener (v, _ = type(v, ViewModelListener)) { this.#listenters.add(v) }
  removeListener (v, _ = type(v, ViewModelListener)) { this.#listenters.delete(v) }
  notify () { this.#listenters.forEach(v => v.viewmodelUpdated(this.#isUpadated)) }
  viewmodelUpdated (updated) { updated.forEach(v => this.#isUpdated.add(v)) }
}

// subKey가 생겼기 때문에 ViewModelValue 또한 변경해야한다. 
const ViewModelValue = class {
  subKey; category; k; v;
  constructor (subKey, category, k, v) {
    Object.assign(this, { subKey, category, k, v })
    Object.freeze(this)
  }
}
```

이 코드의 핵심 적인 내용은 _최상위의 ViewModel에서 모든 ViewModel의 변경내역을 취합하여 Binder에게 알리는 것_ 이다.

### Observer

이제 Observer 역할을 하는 Binder의 입장을 살펴봐야 한다.
Binder는  ViewModel이 보내는 **notify를 감지**하여 *ViewModel의 값을 View에 Rendering* 한다.

``` js{7-8,13-25}
const Binder = class extends ViewModelListener {
  #items = new Set; #processors = {}
  add (v, _ = type(v, BinderItem)) { this.#items.add(v) }
  addProcessor (v, _ = type(v, Processor)) { /*생략*/ }
  render (viewmodel, _ = type(viewmodel, ViewModel)) {/*생략*/}
  watch (viewmodel, _ = type(viewmodel, ViewModel)) {
    viewmodel.addListener(this)
    this.render(viewmodel)
  }
  unwatch (viewmodel, _ = type(viewmodel, ViewModel)) {
    viewmodel.removeListener(this)
  }
  viewmodelUpdated (updated) {
    const items = {}
    this.#items.forEach(({ vmName, el }) => {
      items[vmName] = [type(rootViewModel[vmName], ViewModel), el]
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

@startuml
collections ChildViewModel order 1
participant RootViewModel order 2
participant Binder order 3
participant View order 4
RootViewModel <-- Binder : Observe(Watch)
note over ChildViewModel : updated
note over ChildViewModel : Notify
ChildViewModel --> RootViewModel : Call **viewmodelUpdated**
note over RootViewModel : Composite
note over RootViewModel : Notify
RootViewModel --> Binder : Call **viewmodelUpdated**
Binder --> View : Rendering
@enduml

- Binder가 RootViewModel을 Observe 한다.
- ChildViewModel이 Upated되면 Update된 내용을 취합하여 RootViewModel에게 보낸다.
- RootViewModel은 취합된 내용을 Binder에게 알린다.

이 설계에서 핵심이 되는 내용은, _Binder는 RootViewModel만 Observe 하고 있다는 것이다._

## Client

위에서 작성한 코드를 직접 사용해보자.

``` js
// HTML에 정의된 viewmodel을 scan한다.
const scanner = new Scanner()
const binder = scanner.scan(document.querySelector('#target'))

// Binder에 Strategy를 주입한다.
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

// ViewModel을 만든다.
const getRandom = () => parseInt(Math.random() * 150) + 100
const rootViewModel = ViewModel.get({
  isStop: false,
  changeContents () {
    // ViewModel이 변경되면, 이를 취합하여 RootViewModel에게 보낸다.
    this.wrapper.styles.background = `rgb(${getRandom()},${getRandom()},${getRandom()})`
    this.contents.properties.innerHTML = Math.random().toString(16).replace('.', '')
  },
  wrapper: ViewModel.get({
    styles: { width: '50%', background: '#ffa', cursor: 'pointer' },
    events: {
      click(e, vm) {
        vm.parent.isStop = true // rootViewModel.isStop = true 로 해도 된다. 
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

// Binder는 RootViewModel만 Observing 한다.
binder.watch(rootViewModel)

// 테스트를 위하여 viewmodel의 내용을 실시간으로 변경하도록 한다.
const f = () => {
  viewmodel.chagneContents()
  if (!viewmodel.isStop) requestAnimationFrame(f)
}
requestAnimationFrame(f)
```

### 전체 코드

<<< @/CodeSpitz/Object-Oriented-Javascript/03-Strategy-Observer/example.html

[github에서 보기](https://github.com/JunilHwang/TIL/blob/master/CodeSpitz/Object-Oriented-Javascript/03-Strategy-Observer/example.html)

## Summary

- Strategy Pattern
  - Binder의 Strategy를 찾아낸 후 추출한다.
  - Binder에 사용되는 각각의 Strategy를 만들어서 주입한다. (Dependency Injection)
  - 이 때 Strategy는 TypeCheck를 하고, 구현은 ChildStrategy에게 맡긴다 (Template Method Pattern)

- Observer Pattern
  - ViewModel의 변경 내역을 알리는 ViewModelListener Interface를 만들고, ViewModel과 Binder가 이를 상속하여 구현하도록 한다.
  - ChildViewModel에 변경이 일어나면 이를 취합하여 RootViewModel에게 알린다 (Composite Pattern)
  - RootViewModel은 취합한 내용을 Binder에게 알린다 (Notify)
  - Binder는 RootViewModel만 Observing 한다.

