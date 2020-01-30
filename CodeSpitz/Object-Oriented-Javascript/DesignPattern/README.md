---

title: MVVM System 개선
description: 다양한 Design Pattern을 이용하여 MVVM System을 개선하는 방법에 대해 소개합니다.
date: 2020-01-28
sidebarDepth: 2

---

# MVVM 개선하기

::: tip 해당 포스트는 아래의 내용들을 토대로 정리한 것입니다.

- [코드스피츠 86기 3회차 동영상](https://www.youtube.com/watch?v=D450fPGffTg)
- [코드스피츠 86기 3회차 교안](https://onedrive.live.com/?authkey=%21AJPuPvgOlGz%2D%5FQE&cid=AE0BF2746200B9CD&id=AE0BF2746200B9CD%2172145&parId=AE0BF2746200B9CD%2171745&o=OneUp)

:::

Strategy, Observer, Composite 등의 Design Pattern 을 이용하여 [앞서 작성한 MVVM System](../MVVM)을 개선하는 방법에 대해 기술합니다.

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
  // 추상 클래스를 가정한다.
  process (vm, el, k, v, _0 = type(vm, ViewModel), _1 = type(el, HTMLElement), _2 = type(k, "string")) {
    this._process(vm, el, k, v)
  }
  // template method: hook
  _process (vm, el, k, v) { throw 'override' }
}
```

코드를 보면 **process method의 책임을 _process method에게 위임**한다.
이 때 processor class를 상속 받아서 _process를 구현 하게 되는 데,
**구현되는 method(_process)** 를 `Hook Method`라고 한고,
**Hook method(_proces)에게 책임을 위임하게 되는 method(process)** 를 `Template Method` 라고 한다.

***

- `process`
  - Template method
  - Hook Method에게 책임을 위임한다.

- `_process`
  - Hook method
  - template method에서 호출되는 method

***

 `Processor`를 작성했으면, `Binder`를 수정해야 한다.

``` js
const Binder = class {
  #item = new Set
  #processors = {}  // category당 한 개의 processor를 사용하게 하기 위함
                    // 자료구조를 선택할 때 심각하게 생각해야 한다.
                    
  add (v, _ = type(v, BinderItem)) { this.#item.add(v) }
  
  // Strategy
  addProcessor (v, _ = type(v, Processor)) {
    this.#processors[v.category] = v
  }
  render (viewmodel, _ = type(viewmodel, ViewModel)) {
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