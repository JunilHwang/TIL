---

title: MVVM System 개선하기 (2)
description: ISP 원칙, Visitor Pattern 등을 적용하여 MVVM System을 더욱 개선합니다.
date: 2020-02-03
sidebarDepth: 2
feed:
  enable: true

---

# MVVM System 개선하기 (2)

::: tip 해당 포스트는 아래의 내용들을 토대로 정리한 것입니다.

- [코드스피츠 86기 4회차 동영상](https://www.youtube.com/watch?v=r4vOF7WpxgM&t=868s)
- [코드스피츠 86기 4회차 교안](https://www.youtube.com/redirect?event=video_description&redir_token=XLwW9xXpx7jguNfQtusWz-xpQG18MTU4MDc3MTMzNEAxNTgwNjg0OTM0&q=https%3A%2F%2F1drv.ms%2Fb%2Fs%21As25AGJ08guuhLNW7fuz3TgPMCZSkA&v=r4vOF7WpxgM)

:::

객체지향 프로그램이란 처음에 이루고하자는 목표에서부터 덩어리진 것을 차근차근 분리하고 깎아내는 과정이다.
그래서 객체지향 개발은 애자일(Agile) 소프트웨어 개발과 궁합이 좋다.

객체지향에서 코드를 깎아내는 기준은 역할과 책임이다.
역할과 책임은 비슷하지만 동전의 양면과 같다.

::: tip 역할과 책임

- 책임을 진다는 것은, 책임에 맡는 권한도 갖고 있다.
- 책임이 없는데 권한이 없거나, 권한이 없는데 책임이 있다면 문제가 생긴다.

:::

이번에는 역할과 책임에 따라 코드를 깎아내는 과정을 살펴볼 것이다. 

## 인터페이스 분리 원칙 (ISP)

먼저 ViewModel에 인터페이스 분리 원칙(ISP, Interface Segregation Principle)을 적용해야 한다.

여태까지 만든 ViewModel은 매우 heavy 한 상태다.

```js
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

ViewModel의 원래 역할은, 물리적은 view를 대신하여 메모리상에 순수한 메모리 객체로서의 View를 만들어내는 것이다. 

```js
addListener (v, _ = type(v, ViewModelListener)) { this.#listeners.add(v) }
removeListener (v, _ = type(v, ViewModelListener)) { this.#listeners.delete(v) }
notify () { this.#listeners.forEach(v => v.viewmodelUpdated(this.#isUpdated)) }
```

위의 메소드는 ViewModel의 역할에는 적합하지 않다. 이것은 Observer의 Subject 역할이다. 그래서 역할을 분리시켜야 한다.

```js{1}
#isUpdated = new Set; #listeners = new Set
addListener (v, _ = type(v, ViewModelListener)) { this.#listeners.add(v) }
removeListener (v, _ = type(v, ViewModelListener)) { this.#listeners.delete(v) }
notify () { this.#listeners.forEach(v => v.viewmodelUpdated(this.#isUpdated)) }
```

그리고 Method가 의존하고 있는 field 또한 분리시켜야 한다.

static method 또한 마찬가지다

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
```

현재의 ViewModel은 아래와 같은 구조다

// UML 그리기

```js
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

그리고 static method 또한 추가해줘야 한다

그런데 notify를 잘 보면 notify 내부에 add가 있다.
즉, notify는 두 가지의 역할을 수행하고 있기 때문에 이것을 분리해야 한다.
오히려 외부에서 몰라도 되는 것은 notify이며, 외부에서 명시적으로 알아야 하는 것은 watch와 unwatch 이다.

notify mechanism은 숨기고 인터페이스로 사용하는 것은 watch와 unwatch 이다.

```js{15,18}
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

## 섬세한 권한 조정

java의 기본 권한은 private 이고, javascript의 기본 권한은 public이다.

그래서 javascript는 개발자가 하나하나 권한을 조정하지 않으면 기본적으로 public이 되서 엉망이 된다.
getter, setter가 public일 경우 남들이 조정하기가 너무 쉽다

```js
const ViewModel = class extends ViewModelListener {
  static get (data) { return new ViewModel(data) }
  styles = {}; attributes = {}; properties = {}; events = {};
  subKey = ''
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
      this.add(new ViewModelValue(vm.subKey, category, k, v))
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
          v.setParent(this, category)
        }
      }
    })
    Object.seal(this)
  }

  viewmodelUpdated (updated) { updated.forEach(v => this.add(v)) }
}
```

transaction이 발견 되면 무조건 function으로 표현해야 한다. transaction이 코드에 섞여있을 경우 문제가 발생할 확률이 높다(응용 하기가 쉽지 않다).


## Visitor Pattern

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


Binder : View에다가 ViewModel을 꽂아준다.

Scanner : ViewModel을 읽어들인다.

Scanner가 존재하는 이유는 checkItem의 정책 때문이다.
그런데 여기서 문제가 scan과 checkItem의 변화율과 목적이 다르다.

```js{5-11}
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

위의 코드에서 stack ~ binder 까지는 scanner의 역할이 아니기 때문에 해당 코드를 Visitor에게 위임해야 한다.

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
    const stakc = {}
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

설계라는 것은 객체의 재배치가 아니라 코드의 재배치이다.

이 코드가 이 객체의 것인지 판단할 수 있는 능력이 중요하다.

## 추상 계층 불일치

객체 간의 계약 = 의존성

어떤 객체를 알고 있다 = 어떤 객체의 스펙을 알고 있다.

니가 망한다 = 나도 망한다

의존성은 계층 관계를 보고 설정해야 한다.

```js{9-12,15}
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

앞서 작성한 Scanner 코드의 경우, 추상 계층이 불일치 한다.

Visitor는 계층이 두 개고, Scanner는 계층이 한 개이기 때문이다.

그래서 추상 계층은 서로 일치를 시켜줘야 한다.

```js{7,12,14-23}
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

::: tip 도메인 패턴

기능적인 부분(변하지 않는 부분)과 도메인 부분(변하는 부분)을 나눠야 한다.

추상 클래스(Scanner, Visitor)는 Native를 모르는 상태로 유지하고,
Native는 구현 클래스(DomScanner, DomVisitor)에게 위임한다.

from [엔터프라이즈 애플리케이션 아키텍처 패턴](https://wikibook.co.kr/peaa/)

:::

추상 레이어를 나누면 좋은점 : 코드를 고치지 않고, 코드를 추가한다.

새로운 변화가 생기거나 새로운 요구사항이 생겼을 때 수정이 아니라 추가로 해결한다.

OCP(Open Close) 원칙을 지키기 위해서는 추상화가 필수다.

수정하지 않고 확장한다.

SOLID 원칙은 사실 설계를 잘 했을 때 얻어지는 결과물이라고 할 수 있다.

```js
const scanner = new Scanner // 기존
const scanner = new DomScanner(new DomVisitor) // 개선
```

## 설계 종합

인간의 머리는 복잡성의 한계가 있다.

그래서 객체지향을 통하여 좋은 코드를 만드는 방법은 코드를 잘 쪼개서 인간이 인식할 수 있는 복잡성 만큼 수용하는 것이다.

그런데 쪼개는 것이 어렵다. 일관성 있게 쪼개는 방법이 중요하다.

역할과 책임에 맡게 코드를 쪼개는 연습을 해야 한다.

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

ViewModelValue의 경우 의존하는 객체가 많기 때문에 수정에 대한 위험성이 굉장히 크다

지금 상태에서 좋은 점은, 단 방향으로만 의존성이 있다는 것이다. 순환 의존성이 생기지 않도록 해야 한다.

의존성을 단방향으로 유지 하는 것이 목표다. 

ViewModel 에서는 DOM에 의존적이지 않다. 그래서 ViewModel은 브라우저에서 작동하든, Node에서 작동하든 상관 없다.

@startuml
card Scanner
card DomScanner
card Visitor
card DomVisitor

Scanner <-- DomScanner
Scanner -> Visitor
Visitor <-- DomVisitor
@enduml

DomScanner와 DomVisitor는 간접적으로 의존하고 있다.

DomScanner와 DomVisitor는 직접적으로 연결되어 있진 않지만, 어쨌든 DomScanner는 DomVisitor를 알고 있어야 한다.

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

Binder는 상당히 위험한 객체이다. 

모여드는 게 많을 경우 : 무거운 객체 (바뀌게 될 경우 영향의 여파가 크다)
나가는 게 많을 경우 : 위험한 객체 (아무거나 건드려도 깨질 수 있다)


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

DomScanner, DomVisitor, ConcreateProcessor 이렇게 세 개만 DOM에 대한 의존성이 있다.

나머지는 ViewModel 을 만드는 것들이다.

MVVM은 대부분이 플랫폼에 종속적이지 않다. 

그래서 DomScanner, DomVisitor, ConcreateProcessor 등만 교체하면 Android, IOS 에도 사용할 수 있다.

이것이 가상화(추상화) 되어 있는 렌더링 시스템이다.

그런데 Observer Pattern은 비용이 크다. 구현과 설계도 어렵고 성능 자체에 대한 비용도 있다.

그래서 Binder를 수동으로 call 하는 경우가 생각보다 많다.

어떤 환경에서든 특정한 Domain과 관련된 부분은 격리를 해야 된다.

