---

title: MVVM System 개선하기 (2)
description: ISP 원칙, Visitor Pattern 등을 적용하여 MVVM System을 더욱 개선합니다.
sidebarDepth: 2
date: 2020-02-22

---

# MVVM System 개선하기 (2)

::: tip 해당 포스트는 아래의 내용들을 토대로 정리한 것입니다.

[코드스피츠 86기 4회차 동영상](https://www.youtube.com/watch?v=r4vOF7WpxgM&t=868s)

:::

객체지향 프로그램이란 처음에 이루고하자는 목표에서부터 _덩어리진 것을 차근차근 분리하고 깎아내는 과정_ 이다.
그래서 객체지향 개발은 애자일(Agile) 소프트웨어 개발과 궁합이 좋다.

객체지향에서 코드를 깎아내는 기준은 _역할과 책임_ 이다.
역할과 책임은 비슷하지만 동전의 양면과 같다.

::: tip 역할과 책임

- 책임을 진다는 것은 책임에 적합한 권한도 갖고 있다는 것이다.
- 권한이 있다는 것은 권한에 적합한 책임도 갖고 있다는 것이다.
- 책임이 없는데 권한이 없거나 권한이 없는데 책임이 있다면 문제가 생긴다.

:::



인간의 머리는 복잡성의 한계가 있다.
그래서 객체지향을 통하여 좋은 코드를 만드는 방법은 코드를 잘 쪼개서 인간이 인식할 수 있는 복잡성 만큼 수용하는 것이다.
그런데 쪼개는 것이 어렵기 때문에 일관성 있게 쪼개는 방법이 중요하다.
그래서 _역할과 책임에 맡게 코드를 쪼개는 연습을 해야 한다._

이번에는 역할과 책임에 따라 코드를 쪼개고 깎아내는 과정을 살펴볼 것이다. 

## 인터페이스 분리 원칙 (ISP)

먼저 ViewModel에 _인터페이스 분리 원칙(ISP, Interface Segregation Principle)_ 을 적용해야 한다.

### 역할과 책임에 따른 분석

여태까지 만든 ViewModel은 매우 heavy 한 상태다.

@startuml
rectangle ViewModel {
  card "notify(static)" as n1
  card "notify(public)" as n2
  card addListener
  card removeListener
  card viewmodelUpdated
  card get
  card descriptor
  card define
}
@enduml

```js{3-19,39,61-63}
const ViewModel = class extends ViewModelListener {
  static get = data => new ViewModel(data)
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
  static descriptor = (vm, category, k, v) => ({
    enumerable: true,
    get: () => v,
    set (newV) {
      v = newV
      vm.#isUpdated.add(new ViewModelValue(vm.subKey, category, k, v))
    }
  })

  static define = (vm, category, obj) => (
    Object.defineProperties(
      obj,
      Object.entries(obj)
            .reduce((r, [k, v]) => (r[k] = ViewModel.descriptor(vm, category, k, v), r), {})
    )
  )

  subKey = ''; parent = null
  styles = {}; attributes = {}; properties = {}; events = {}
  #isUpdated = new Set; #listeners = new Set

  constructor(data, _ = type(data, 'object')) {
    super();
    Object.entries(data).forEach(([k, v]) => {
      if('styles,attributes,properties'.includes(k)) {
        if(!v || typeof v != 'object') throw `invalid object k: ${k}, v:${v}`
        this[k] = ViewModel.define(this, k, v)
      } else {
        Object.defineProperty(this, k, ViewModel.descriptor(this, '', k, v))
        if (v instanceof ViewModel) {
          v.parent = this
          v.subKey = k
          v.addListener(this)
        }
      }
    })
    ViewModel.notify(this)
    Object.seal(this)
  }

  viewmodelUpdated (updated) { updated.forEach(v => this.#isUpdated.add(v)) }
  addListener (v, _ = type(v, ViewModelListener)) { this.#listeners.add(v) }
  removeListener (v, _ = type(v, ViewModelListener)) { this.#listeners.delete(v) }
  notify () { this.#listeners.forEach(v => v.viewmodelUpdated(this.#isUpdated)) }
}
```

그런데 과연 이 코드가 정말로 ViewModel에게 전부 필요한 것일까?

ViewModel의 원래 역할은 물리적인 View(DOM, Android, IOS, ..)를 대신하여 _순수한 메모리 객체로서의 View(가상의 View)_ 를 만들어내는 것이다. 

```js
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

#isUpdated = new Set; #listeners = new Set // 메소드가 의존하고 있는 field
addListener (v, _ = type(v, ViewModelListener)) { this.#listeners.add(v) }
removeListener (v, _ = type(v, ViewModelListener)) { this.#listeners.delete(v) }
notify () { this.#listeners.forEach(v => v.viewmodelUpdated(this.#isUpdated)) }
```

위의 Method와 Field는 ViewModel의 역할에 적합하지 않다.
이것은 _Observer Pattern에서 Subject의 역할_ 에 해당하는 부분이다.
그래서 이 Method와 이것에 의존하고 있는 field를 **역할에 따라 분리**시켜야 한다.

### ISP 적용하기

기존의 ViewModel을 다음과 같은 형태로 변경할 것이다.

@startuml
rectangle ViewModel {
  rectangle ViewModelSubject {
    card "notify(public)" as n1
    card "notify(static)" as n2
    card addListener
    card removeListener
    card add #faf
    card clear #faf
    card watch #aaf
    card unwatch #aaf
  }
  rectangle ViewModelListener {
    card viewmodelUpdated
  }
  card get
  card descriptor
  card define
  
  get --[hidden] define
  define --[hidden] descriptor
  n1 -[hidden] n2
  n2 -[hidden] addListener
  addListener -[hidden] removeListener
  n1 --[hidden] add
  add -[hidden] clear
  clear -[hidden] watch
  watch -[hidden] unwatch
}
@enduml

보다시피 `add`와 `clear`가 추가되었다. add와 clear를 통해서 부모(ViewModel)에게 역할을 위임하도록 만들 것이다.

```js{9-10,13,17}
// Javascript는 다중 상속이 불가능하기 때문에
// ViewModelSubject가 ViewModelListener를 상속받아야 한다.
const ViewModelSubject = class extends ViewModelListener {

  #info = new Set
  #listeners = new Set

  // add와 clear를 통해 부모에게 역할을 위임한다.
  add (v, _ = type(v, ViewModelValue)) { this.#info.add(v) }
  clear () { this.#info.clear() }
  addListener (v, _ = type(v, ViewModelListener)) {
    this.#listeners.add(v)
    ViewModelSubject.watch(this)
  }
  removeListener (v, _ = type(v, ViewModelListener)) {
    this.#listeners.delete(v)
    if (!this.#listeners.size) ViewModelSubject.unwatch(this)
  }
  notify () { this.#listeners.forEach(v => v.viewmodelUpdated(this.#info)) }
}
```

아직 코드상에 작성하진 않았지만 *addListener*에는 `ViewModelSubject.watch`가 생겼고,
*removeListener*에는 `ViewModelSubject.unwatch`가 생겼다.

기존에는 `notify`를 통해서 데이터를 노출 시켰는데 _논리적으로 생각했을 때 외부에서 명시적으로 알아야 하는 것은 `watch`와 `unwatch`_ 이다.
그래서 watch와 unwatch를 노출시키고, notify는 감추도록 만들어야 한다.

::: tip

notify mechanism은 감추고, watch와 unwatch를 인터페이스로 공개한다.

:::

이제 `notify`를 살펴봐야 한다.

```js{2}
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
```

notify method 내부에 `this.#subject.add`가 있다.
그 의미는 notify가 두 가지의 역할을 수행하고 있다는 것이고, 이런 코드를 유지하게 될 경우 문제가 생길 수 있다.
각각의 메소드는 가능한한 한 가지의 역할만 수행하게 하여 _단일책임원칙(SCP, Single Responsibility Principle)이 지켜지도록_ 해야한다

```js{1,16,23}
  static #subjects = new Set
  static #inited = false
  static notify () {
    const f = () => {
      this.#subjects.forEach(v => {
        if (v.#info.size) {
          v.notify()
          v.clear()
        }
      })
      if (this.#inited) requestAnimationFrame(f)
    }
    requestAnimationFrame(f)
  }
  static watch (vm, _ = type(vm, ViewModelListener)) {
    this.#subjects.add(vm)
    if (!this.#inited) {
      this.#inited = true
      this.notify()
    }
  }
  static unwatch (vm, _ = type(vm, ViewModelListener)) {
    this.#subjects.delete(vm)
    if (!this.#subjects.size) this.#inited = false
  }
```

위에도 언급 했듯이 notify mechanism은 감추고 watch와 unwatch를 통해 interface로 제공해야 한다.
그리고 notify는 하나의 역할만 수행하도록 하여 책임을 분산시킨다.

## 섬세한 권한 조정

::: tip 권한 조정이 필요한 이유

java의 기본 권한은 private 이고, javascript의 기본 권한은 public이다.

그래서 javascript는 개발자가 하나하나 권한을 조정하지 않으면 기본적으로 public이 되서 엉망이 된다.
getter, setter 등이 public 으로 노출되면 코드 조작이 매우 쉬워지고 문제가 생길 수 있다.

:::

::: tip transaction

transaction이 발견 되면 무조건 function으로 표현해야 한다. transaction이 코드에 섞여있을 경우 문제가 발생할 확률이 높다(응용 하기가 쉽지 않다).

::: 

```js{1,5,7,10-15,43,50}
const ViewModel = class extends ViewModelSubject {
  static get (data) { return new ViewModel(data) }
  styles = {}; attributes = {}; properties = {}; events = {};
  #subKey = ''
  get subKey () { return this.#subKey } // read only
  #parent = null
  get parent () { return this.#parent }
  
  // code에서  꼭 필요한 것 : transaction.
  setParent (parent, subKey) {
    // 함수를 통해서 transaction을 표현한다(한 번에 일어나는 일들)
    this.#parent = type(parent, ViewModel)
    this.#subKey = subKey
    this.addListener(parent)
  }
  static descriptor = (vm, category, k, v) => ({
    enumerable: true,
    get: () => v,
    set (newV) {
      v = newV
      vm.add(new ViewModelValue(vm.subKey, category, k, v))
    }
  })

  static define = (vm, category, obj) => (
    Object.defineProperties(
      obj,
      Object.entries(obj)
            .reduce((r, [k, v]) => (r[k] = ViewModel.descriptor(vm, category, k, v), r), {})
    )
  )

  constructor(data, _ = type(data, 'object')) {
    super();
    Object.entries(data).forEach(([k, v]) => {
      if('styles,attributes,properties'.includes(k)) {
        if(!v || typeof v != 'object') throw `invalid object k: ${k}, v:${v}`
        this[k] = ViewModel.define(this, k, v)
      } else {
        Object.defineProperty(this, k, ViewModel.descriptor(this, '', k, v))
        if (v instanceof ViewModel) { 
          // transaction을 method로 분리했다.
          v.setParent(this, k)
        }
      }
    })
    Object.seal(this)
  }

  viewmodelUpdated (updated) { updated.forEach(v => this.add(v)) }
}
```

ViewModel에서 개선된 내용은 다음과 같다.

- _권한 조정_ : subKey, parent에 대한 getter와 setter를 만들었다.
- _역할/책임에 따른 인터페이스 분할(ISP)_  : ViewModel은 ViewModelSubject를 상속하도록 변경했다.
- _tranaction 도출_ : parent에 대한 transaction 단위를 분리했다.

## Visitor Pattern

`Visitor Pattern`은 객체의 구조와 기능을 분리시키는 패턴이다. 이것을 이용하여 DOM에 관련된 기능을 MVVM과 분리시키는 작업을 할 것이다.

먼저 Scanner를 살펴보자.

```js{15}
const Scanner = class {
  scan (el, _ = type(el, HTMLElement)) {
    const binder = new Binder;
    this.checkTiem(binder, el)
    const stack = [el.firstElementChild]
    let target
    while (target = stack.pop()) {
      this.checkItem(binder, target)
      if (target.firstElementChild) stack.push(target.firstElementChild)
      if (target.nextElementSibling) stack.push(target.nextElementSibling)
    }
    return binder;
  }
  checkItem (binder, el) {
    const vm = el.getAttribute('data-viewmodel')
    if (vm) binder.add(new BinderItem(el, vm))
  }
}
```

Scanner의 핵심은 _ViewModel을 읽어들여서 Binder에 전달_ 하는 것이다. 그리고 checkItem이 그러한 역할을 담당하고 있다.

여기서 문제되는 부분은 `scan method` 이다.

```js{6-10}
  scan (el, _ = type(el, HTMLElement)) {
    const binder = new Binder;
    this.checkTiem(binder, el)
    const stack = [el.firstElementChild]
    let target
    while (target = stack.pop()) {
      this.checkItem(binder, target)
      if (target.firstElementChild) stack.push(target.firstElementChild)
      if (target.nextElementSibling) stack.push(target.nextElementSibling)
    }
    return binder;
  }
```

DOM을 읽어 들이는 부분은 scanner의 역할이 아니고 Binder의 역할도 아니다.
그래서 Vistor를 만든 후 Vistor에게 DOM Parsing에 대한 부분을 위임해야 한다.
이럴 경우 Binder, Scanner, ViewModel 등은 DOM과 분리되고 결과적으로 현재 작성 중인 MVVM System은 _플랫폼(웹, 안드로이드, IOS, ...)에 대한 종속이 느슨해지게 될 것이다._

```js{11,17}
// Visitor : 제어를 Visitor에게 위임한다.
const Visitor = class {
  // target의 경우 HTML인지 Canvas인지 알 수 없다. 그래서 추상화 시켜야 한다.
  visit (action, target, _ = type(action, 'function')) {
    throw 'override'
  }
}
const DomVisitor = class extends Visitor {
  // 자식에서 구체적인 형을 알게 되는 것 : Generic
  // 언어가 어떤 기능을 지원 하느냐보단 그 개념을 어떻게 적용하느냐가 중요하다.
  visit (action, target , _0 = type(action, 'function'), _1 = type(target, HTMLElement)) {
    // 제어의 코드가 Visitor에게 몰리기 때문에 제어 역전이 발생한다.
    const stack = []
    let curr = target.firstElementChild
    do {
      // loop 안에서 상호작용을 해야 한다.
      action(curr) // template method의 hook가 비슷한 역할
      if (curr.firstElementChild) stack.push(curr.firstElementChild)
      if (curr.nextElementSibling) stack.push(curr.nextElementSibling)
    } while (curr = stack.pop())
  }
}
```

Visitor를 작성했으니, Scanner의 코드를 다시 작성해야 한다.

```js{9-12,15}
const Scanner = class {
  #visitor
  constructor (visitor, _ = type(visitor, DomVisitor)) {
    this.#visitor = visitor
  }
  scan (target, _ = type9target, HTMLElement) {
    const binder = new Binder
    // Scanner는 ViewModel을 읽어들이기만 하면 된다.
    const f = el => {
      const vm = el.getAttribute('data-viewmodel') // 코드의 변화 요인은 이 부분 밖에 없다
      if (vm) binder.add(new BinderItem(el, vm))
    }
    f(target)
    // DomScan은 Visitor에게 위임한다
    this.#visitor.visit(f, target)
    return binder
  }
}
```

::: tip 설계라는 것

설계는 객체의 재배치가 아닌 코드의 재배치이다. 객체에 작성된 코드가 정말로 이 객체의 것인지 판단할 수 있는 능력이 중요하다.

:::

## 추상 계층 일치시키기

의존성은 계층 관계를 보고 설정해야 한다. 

- 객체 간의 계약 = 의존성
- 어떤 객체를 알고 있다 = 어떤 객체의 *스펙*을 알고 있다.
- _니가(Scanner) 망한다 = 나도(Binder) 망한다_

현재 Scanner와 Binder의 경우 _추상 계층이 일치 하지 않는 상태다._

```js{4,13}
const Scanner = class {
  #visitor
  constructor (visitor, _ = type(visitor, DomVisitor)) {
    this.#visitor = visitor // 자식 계층(DomVisitor)을 사용하고 있다.
  }
  scan (target, _ = type9target, HTMLElement) {
    const binder = new Binder
    const f = el => {
      const vm = el.getAttribute('data-viewmodel') 
      if (vm) binder.add(new BinderItem(el, vm))
    }
    f(target)
    this.#visitor.visit(f, target) // 부모 계층(Visitor)을 사용하고 있다.
    return binder
  }
}
```

Visitor는 계층이 두 개(Visitor, DomVisitor)고, Scanner는 계층이 한 개이기 때문이다.

@startuml
rectangle Scanner
rectangle DomVisitor
rectangle Visitor
Scanner -> Visitor
Visitor <-- DomVisitor 
@enduml

그래서 추상 계층은 서로 일치를 시켜줘야 한다.

```js{7,10-23}
const Scanner = class {
  #visitor
  constructor (visitor, _ = type(visitor, Visitor)) {
    this.#visitor = visitor
  }
  visit (f, target) { this.#visitor.visit(f, target) }
  scan (target) { throw `override` }
}

const DomScanner = class extends Scanner {
  constructor (visitor, _ = type(visitor, DomVisitor)) {
    super(visitor) // 자식은 부모를 대체할 수 있다. LSP
  }
  scan (target, _ = type(target, HTMLElement)) {
    const binder = new Binder
    const f = el => {
      const vm = el.getAttribute('data-viewmodel')
      if (vm) binder.add(new BinderItem(el, vm))
    }
    f(target)
    this.visit(f, target)
    return binder
  }
}
```


@startuml
rectangle DomScanner
rectangle Scanner
rectangle DomVisitor
rectangle Visitor
Scanner -> Visitor
Visitor <-- DomVisitor 
Scanner <-- DomScanner
@enduml

::: tip 도메인 패턴

_변하지 않는 부분과 변하는 부분을 나눠야 한다._

추상 클래스(Scanner, Visitor)는 Native를 모르는 상태로 유지하고,
Native는 구현 클래스(DomScanner, DomVisitor)에게 위임한다.

*Reference [엔터프라이즈 애플리케이션 아키텍처 패턴](https://wikibook.co.kr/peaa/)*

:::

- 추상 레이어를 나누면 좋은점
  - 새로운 변화가 생기거나 새로운 요구사항이 생겼을 때 수정이 아니라 추가로 해결한다.
  - 코드를 고치지 않고, 코드를 추가한다.
  - 수정하지 않고 확장한다.
- 단일책임원칙(OCP, Open Close Principle)을 지키기 위해서는 추상화가 필수다.

**SOLID 원칙은 사실 설계를 잘 했을 때 얻어지는 결과물이라고 할 수 있다.**


## 전체 코드

<<< @/CodeSpitz/Object-Oriented-Javascript/04-ISP-Visitor/example.html

[github에서 보기](https://github.com/JunilHwang/TIL/blob/master/CodeSpitz/Object-Oriented-Javascript/04-ISP-Visitor/example.html) 

## 설계 종합

### ViewModel

ViewModelValue의 경우 의존하는 객체가 많기 때문에 수정에 대한 위험성이 굉장히 크다

@startuml
card ViewModel
card ViewModelSubject
card ViewModelListener
card ViewModelValue

ViewModelListener <-- ViewModelSubject
ViewModelSubject <-- ViewModel

ViewModelListener -> ViewModelValue
ViewModelSubject -> ViewModelValue   
ViewModelValue <-- ViewModel
@enduml

- 단방향 의존성 지향
  - 현재 상태의 장점은 _단 방향 의존성만 있다는 것_ 이다.
  - 객체를 설계 할 때 순환 의존성이 생기지 않도록 항상 주의 해야 한다.
- 도메인 분리
  - ViewModel은 _DOM에 의존적이지 않다._
  - 다른 의미로 _플랫폼에 종속적이지 않다._
- ViewModelValue에게 모여든다
  - 화살표가 모인다는 것은, 무거운 객체라는 의미다
  - 무거운 객체는 수정의 여파가 매우 크다.
  - 즉, 쉽게 수정 하면 안 되는 객체다.

### Scanner

Scanner에는 Visitor를 사용 하여 DOM과 관련된 기능을 분리했다.

@startuml
card Scanner
card DomScanner
card Visitor
card DomVisitor

Scanner <-- DomScanner
Scanner -> Visitor
Visitor <-- DomVisitor
@enduml

- 간접적인 의존
  - DomScanner와 DomVisitor는 _간접적으로 의존_하고 있다.
  - 어쨌든 DomScanner는 DomVisitor를 알고 있어야 한다.
- 추상 계층 일치시키기
  - Scanner와 Visitor의 추상 계층을 동일하게 만들어야 한다.
  - 추상 계층이 일치하지 않을 경우, Method의 **변화율**이 달라지게 된다.
  - Method의 변화율이 달라질 경우, 수정이 더욱 빈번하게 발생한다.
  - 추상 계층을 일치시키면 수정 대신 _기능 추가로 대체_ 할 수 있다.

### Binder

Binder는 상당히 위험한 객체이다. 

@startuml
card Binder
card Scanner
card DomScanner
card Visitor
card DomVisitor
card ViewModel
card ViewModelSubject
card ViewModelListener
card ViewModelValue
card BinderItem
card Processor
card ConcreateProcessor

ViewModelListener <-- ViewModelSubject
ViewModelSubject <-- ViewModel

ViewModelListener -> ViewModelValue
ViewModelSubject -> ViewModelValue
ViewModelValue <-- ViewModel 

Scanner <-- DomScanner
Scanner -> Visitor
Visitor <-- DomVisitor

Binder <- Scanner
BinderItem --> Binder 
ViewModelListener <-- Binder
ViewModelValue <- Binder
Binder --> ViewModel
Binder --> Processor
Processor <-- ConcreateProcessor
@enduml

- Binder는 뻗어나간다.
- 화살표가 뻗어 나가는 것은, 위험한 객체라는 의미다.
- Binder를 알고 있는 객체를 건드릴 경우 깨질 수 있다.
- 제일 민감하고 예민한 객체가 된다.

### 플랫폼 독립적 구조

여태까지 작성한 MVVM System은 플랫폼에 독립적이다.

@startuml
card Binder
card Scanner
card DomScanner #faa
card Visitor
card DomVisitor #faa
card ViewModel  #faf
card ViewModelSubject
card ViewModelListener
card ViewModelValue
card BinderItem
card Processor
card ConcreateProcessor #faa

ViewModelListener <-- ViewModelSubject
ViewModelSubject <-- ViewModel

ViewModelListener -> ViewModelValue
ViewModelSubject -> ViewModelValue
ViewModelValue <-- ViewModel 

Scanner <-- DomScanner
Scanner -> Visitor
Visitor <-- DomVisitor

Binder <- Scanner
BinderItem --> Binder 
ViewModelListener <-- Binder
ViewModelValue <- Binder
Binder --> ViewModel
Binder --> Processor
Processor <-- ConcreateProcessor
@enduml

_DomScanner, DomVisitor, ConcreateProcessor 이렇게 세 개만 DOM에 대한 의존성이 있다._
나머지는 `ViewModel`을 만드는 것들이다. **즉, MVVM의 핵심은 ViewModel을 만드는 것이다.**
그래서 DomScanner, DomVisitor, ConcreateProcessor 등만 교체하면 Android, IOS 에도 사용할 수 있다. 

**이것이 가상화(추상화) 되어 있는 렌더링 시스템이다.**

설계를 할 때 특정한 Domain과 관련된 부분은 격리를 하는 것을 항상 지향해야 한다.

## 약간의 단점

- MVVM의 핵심은 Observer Pattern이다.
- Observer Pattern은 구현과 설계도 어렵고 성능 자체에 대한 비용도 있다.

그래서 현실적인 대안으로 MVVM을 사용할 때 Observing을 하는 것 보다 Binder를 수동으로 calling 하는 경우가 생각보다 많다.
