---

title: 객체지향의 기본 이론
description: 객체지향의 원칙과 객체지향을 사용하는 궁극적인 목표에 대해 기술합니다.
sidebarDepth: 1
date: 2020-02-01

---

# 객체지향의 기본 이론

::: tip 해당 포스트는 아래의 내용들을 토대로 정리한 것입니다.

 [코드스피츠 86기 1회차 동영상](https://www.youtube.com/watch?v=E9NZ0YEZrYU&t=3914s)

:::

객체지향을 사용하는 목적과 원칙들에 대해 살펴보자.

## Value vs Identifier

- Value Context
  - 함수지향
  - 메모리와 상관없이 값 자체를 본다.
- Identifier Context
  - 객체지향
  - 값이 아닌 메모리 주소를 본다.

```js
const a = { a: 3, b: 5 }
const b = { a: 3, b: 5 }

// Identifier Context
console.log(a === b); // false.

// Value Context
console.log(JSON.stringify(a) === JSON.stringify(b)); // true
```

객체지향은 항상 Identifier를 인자로 받아야 한다. 즉, 숫자를 받으면 안 된다.

객체지향에서 값을 받는 것은 오직 `생성자` 밖에 없다.

### Value의 특징

- 끝 없는 복사본
- 상태 변화에 안전(강제적으로)
  - 상태가 변할 수 없다
  - `3 + 1 = 4` : 3과 1은 그대로 있고 4가 만들어진다.
- 연산을 기반으로 로직을 전개한다.
  - 복잡한 도메인을 포현하는 연산은 굉장히 어렵다
  - 영화표를 계산하는 방법 : 조조 + 할인카드 + 청소년 + 통신사 할인 = ?
  - 연산을 구현할 수 있다는 자신감이 있어야 한다.

### Identifier의 특징

- 하나의 원본
- 상태 변화를 내부에서 책임짐
  - 평소엔 정상인데 술을 먹더니 꽐라가 된다(?)
  - 정상이든 꽐라든 해야할 일은 할 수 있도록 만들어야 한다.
- 메세지를 기반으로 로직을 전개 → 로직을 위임할 수 있다

::: tip
객체지향은 값을 사용하면 안 된다.
:::

## Polymorphism

Polymorphism(다형성) = 대체가능성 + 내적일관성

- 확장된 객체는 원본으로 대체 가능하다
- 생성 시점의 타입이 내부에 일관성 있게 참조된다.

위에 대한 예는 다음과 같다.

``` js
const Worker = class {
  run() { console.log('working') }
  print() { this.run() }
}

// Overriding
const HardWorker = class extends Worker {
  run() { console.log('HardWorking') }
}

const worker = new HardWorker()
```

이 코드에 대한 객체지향의 개념은 다음과 같다.

::: tip 대체가능성(substitution)
확장된 class는 대상 class를 대체할 수 있다(자식은 부모를 대체할 수 있다)
```js
console.log(worker instanceof Worker) // true. 대체가능성
```
:::

::: tip 내적일관성(internal identity)
어떠한 경우에도 태어났을 때의 원본 클래스를 유지한다.
```js
worker.print() // HardWorker의 print. 내적일관성
```
:::

::: tip Polymorphism of Prototype
javascript는 `prototype`을 이용해서 대체가능성과 내적일관성을 유지한다.
``` js
console.log(worker.__proto__ === HardWorker.prototype); // true
console.log(HardWorker.prototype.__proto__ === Worker.prototype); // true
console.log(Worker.prototype.__proto__ === Object.prototype); // true

console.log(worker.__proto__ === HardWorker.prototype); // true
console.log(worker.__proto__.__proto__ === Worker.prototype); // true
console.log(worker.__proto__.__proto__.__proto__ === Object.prototype); // true
```
:::

각 언어마다 굉장히 다른 시스템을 사용하지만, 객체지향이라고 불리기 위해선 어떤 형태로든 **대체가능성**과 **내적가능성**을 유지할 수 있어야한다.

**즉, 객체지향언어는 Polymorphism을 언어차원에서 지원한다.**

## Object Essentials

::: tip Object Essentials

- 객체의 본질
- Java 혹은 Javascript는 객체지향언어의 조건을 만족하고 있다.
- 하지만, 객체지향언어를 사용한다고 해서 객체지향 프로그래밍을 하는 것은 아니다.
- 객체가 정상작동하고 객체지향답게 움직여야 하는 본질적인 조건이 필요하다.

:::

``` js
const EssentialObject = class {
  // hide state: 내부의 상태를 감춘다 = 데이터 은닉
  #name = ''
  #screen = null

  constructor(name) { this.#name = name }
  camouflage(name) { this.#screen = (Math.random() * 10).toString(16).replace('.', '') }

  // 캡슐화(encapsulation). 안에서 무슨 일이 일어나는지 노출하면 안 된다.
  get name(){ return this.#screen || this.#name }
}
```

### 데이터 은닉(hide state)

`Maintenance of state` 

- **내부의 상태를 감춘다**(=identifier context를 사용한다.)
- 자신의 상태에 대한 관리의 책임이 있어야 한다(내 지갑은 내가 관리한다)
- 객체의 속성을 밖으로 보여주는 것은 value context를 사용하는 것이다. value context은 객체지향에서 버그를 만들고 결국 value context를 사용하는 객체지향은 언젠간 무너지게 된다.
  
### 캡슐화(encapsulation)

`Encapsulation of functionality`

- **내부에서 무슨 일이 일어나는지 노출하면 안 된다**(객체의 메소드에서 일어나는 일은 외부에서 알면 안 된다)
- 즉, 외부에서 내부의 일을 모르게 한다.
- ATM은 내부적으로 굉장히 복잡하게 작동하지만, 사용자는 그러한 일들에 대해 알 필요도 없고 알아서도 안 된다.
- 예를 들어 `setAge` 라는 method는 캡슐화에 위배될 수 있다. `setChild` `setAdult` 같은 method로 캡슐화할 수 있다.
- 캡슐화를 하기 위해선 **method의 역할 그리고 책임**에 대해 한 단계 더 생각해야 한다.

### Isloation of change

소프트웨어는 무조건 변한다. 우리는 프로그램의 변화를 막을 수 없으며 개발도중에 스펙이 바뀌는 것은 PM의 잘못이 아니라 매우 당연한 일이다.

::: tip 객체지향의 목표
객체지향의 목표는 `격리의 벽`을 세워 변화의 여파가 다른 코드로 전이되지 않도록 하는 것이다. 그리고 _변화의 여파를 막고 격리의 벽을 세울 수 있는 유일한 수단이 바로 앞서 설명한 캡슐화와 데이터 은닉이다._
:::  

즉, 데이터은닉과 캡슐화가 무너지면 서서히 오염되고 결국 객체지향은 무너지게 된다.

## SOLID 원칙

- 로버트 마틴이 2000년대 초반에 명명한 **객체 지향 프로그래밍 및 설계의 다섯 가지 기본 원칙**이다.
- 프로그래머가 시간이 지나도 유지 보수와 확장이 쉬운 시스템을 만들고자 할 때 이 원칙들을 함께 적용할 수 있다.
- SOLID 원칙들은 소프트웨어 작업에서 프로그래머가 소스 코드가 읽기 쉽고 확장하기 쉽게 될 때까지 소프트웨어 소스 코드를 리팩터링하여 코드 냄새를 제거하기 위해 적용할 수 있는 지침이다.
- [애자일 소프트웨어 개발](https://ko.wikipedia.org/wiki/%EC%95%A0%EC%9E%90%EC%9D%BC_%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4_%EA%B0%9C%EB%B0%9C)과 [적응적 소프트웨어 개발](https://en.wikipedia.org/wiki/Adaptive_software_development)의 전반적 전략의 일부다.

### _S_ RP (Single Responsibility, 단일책임) 원칙

수정을 하는 _원인은 오직 하나_ 밖에 없어야 한다. 항상 일관성 있게 작동하며, 코드를 수정해야 이유는 오직 하나의 이유만 있어야 한다(하나의 경우).

SRP를 지키지 못하면 **산탄총 수술(Shotgun surgery)** 가 일어난다.

### _O_ CP (Open Closed, 개방폐쇄) 원칙

- **Open** : Extends, Implements 할 수 있게 만들어야 한다.
- **Close** : 새로운 문제를 만들거나 해결할 때 기존의 class를 건드리는 게 아니라 extends나 implements로 구현해야 한다.

즉, 문제들에 대한 공통점을 인식해서 추상화에 성공해야 가능하다.

### _L_ SP (Liskov Substitusion, 업캐스팅 안전) 원칙

추상층의 정의가 너무 구체적이면 구상승의 구현에서 모순이 발생한다. 다음 예를 통해 이해해보자.

- 추상층
  - 숨을 쉰다
  - _다리로 이동한다_
  
- 구상층(구현)
  - 사람 ok
  - 타조 ok
  - **아메바 no**
  - **독수리 no**
  - **고래 no**

위에서 `다리로 이동한다` 라는 method 때문에 구현의 문제가 발생한다. 그래서 이것을 다음과 같이 고쳐야 한다.

- __[추상층]__ 생물
  - **숨을 쉰다**

그런데 분명히 다리로 이동하는 생물도 있다. 그래서 다음과 같이 `인터페이스` 라는 것을 만들어야 한다.

- __[인터페이스]__ 다리로 이동하는 생물 **extends** _생물_
  - 다리로 이동한다.

이렇게 정의된 추상층과 인터페이스를 가지고 다음과 같은 생물은 만들어낼 수 있다.

- 사람 **extends** _생물_
- 타조 **extends** _생물_
- 아메바 **implements** _다리로 이동하는 생물_
- 독수리 **implements** _다리로 이동하는 생물_
- 고래 **implements** _다리로 이동하는 생물_

이러한 상태를 `업캐스팅이 안전`하다고 볼 수 있다.

### _I_ SP(Interface Segregation, 인터페이스 분리)

앞에서 본 것 처럼 LSP를 해결하기 위해 ISP도 같이 사용한다고 볼 수 있다.

@startuml
class 황준일 {
  int money
  ---
  등록금지불()
  월세납부()
  맥북구매()
}
package "**Module** 학생" as 학생 <<Rectangle>> {
}
package "**Module** 세입자" as 세입자 <<Rectangle>> {
}
package "**Module** 개발자" as 개발자 <<Rectangle>> {
}
황준일 --> 학생
황준일 --> 세입자
황준일 --> 개발자
@enduml

위와 같은 상태를 ISP를 반영하면 다음과 같이 바꿀 수 있다.

@startuml
class 황준일 {
  int money
  ---
  등록금지불()
  월세납부()
  맥북구매()
}
interface 학생 {
  ---
  등록금지불()
}
interface 세입자 {
  ---
  월세납부()
}
interface 개발자 {
  ---
  맥북구매()
}

package "**Module** 학생" as Module1 <<Rectangle>> {
}
package "**Module** 세입자" as Module2 <<Rectangle>> {
}
package "**Module** 개발자" as Module3 <<Rectangle>> {
}

황준일 --> 학생
황준일 --> 세입자
황준일 --> 개발자
학생 --> Module1
세입자 --> Module2
개발자 --> Module3
@enduml

이렇게 역할이 명확하다면 interface를 통해서 구분해야한다.

### _D_ IP(Dependency Inversion, 다운캐스팅금지) 원칙

_의존성 역전의 법칙_ 이라고도 한다. 의존성은 언제나 부모쪽으로만 흘러야 한다는 뜻이다. 반대로, 다운캐스팅이 있다면 객체지향은 무너진다. 이것을 지키기 위해선 앞서 설명한 원칙들이 무조건 지켜져야 하낟.

::: tip
- 고차원의 모듈은 저차원의 모듈에 의존하면 안 된다. 두 모듈 모두 추상화된 것에 의존해야 한다.
- 추상화 된 것은 구체적인 것에 의존하면 안 된다. 구체적인 것이 추상화된 것에 의존해야 한다.
:::

### 기타

- **DI**(Dependency Injection, 의존성 주입). 다른 말로 **IoC**(Inversion of control, 제어역전)
- **DRY**(Don't Repeat Yourself, 중복방지)
- **Hollyworld Principle**(의존성 부패방지)
  - 물어보지 말고 요청하거나 기다려라.
  - Action을 처리할 대상이 요청하게 해야 한다.
  - 연락처를 물어보는 것 **(X)**
    - 상대방이 연락처를 알려준 직후에 전화번호를 바꾼다면?
  - 연락을 달라고 하는 것(연락처를 주는 것) **(O)**
  - 이것이 지켜지지 않는다 = 은닉or캡슐화가 지켜지지 않은 것
- **Law of demeter** (최소지식)
  - classA.methodA의 최대 지식 한계
    - classA의 필드 객체
    - methodA가 생성한 객체
    - methodA의 인자로 넘어온 객체
  - Law of demeter가 지켜지지 않을 경우 **열차 전복(train wreck)** 상태라고 한다.
  
## Message

객체지향은 Message를 기반으로 전개한다.

### 단일책임원칙(SRP)을 준수하는 객체망의 문제를 해결

- 책임이 너무 세분화 된다 = 책임이 연결리스트처럼 이어져있다
  @startuml
  (기획자) as a
  (디자이너) as b
  (개발자) as c
  a <<- b : 의존
  b <<- c : 의존
  @enduml
   
- 언제나 상황/조직을 보고 유연하게 설계해야 한다. 절대적으로 옳은 것은 없다.

::: tip 단일책임원칙(SRP)을 준수하는 객체에게 책임 이상의 업무를 부여하면?

- 만능 객체가 되려 한다.
- 다른 객체에게 의뢰한다.

:::

다른 객체에게 의뢰하는 것 = _다른 객체에게 메세지를 보내는 것_
  - 메세지 : 의뢰할 내용
  - 오퍼레이션 : 메세지를 수신할 객체가 제공하는 서비스
    - 오퍼레이션을 내부에 어떤 메소드가 처리할지는 런타임에 따라 달라진다.
    - 오퍼레이터가 런타임에 어떤 메소드랑 매핑될지 결정하는 것을 `동적바인딩`이라고 한다.
    - 동적바인딩을 지원하는 언어에서는 _오퍼레이션과 메소드가 틀릴 가능성이 높다._
  - 메소드 : 오퍼레이션이 연결될 _실제 처리기_

추상 클래스를 상속받게 만들거나, 인터페이스를 구현하는 이유는 오퍼레이션과 메소드를 분리해서 런타임에 원하는 것을 가져오기 위해서이다. 이게 결국 OCP를 만들어낸다.

_즉, SRP를 통해 문제를 해결하게 되는 과정에 OCP가 만들어진다._

## Dependency

- 의존성은 격리(가장 중요함)의 문제이다.
- 격리성을 갖는가 = 의존성을 어떻게 관리 했는가

::: tip 의존 객체에 문제가 있으면 자신에게도 문제가 생긴다.

회사의 업무를 예로 들면 다음과 같다

- 의존성이 아예 없다(만능 객체)\
  → 한 객체(사람)이 모든 일을 다 한다\
  → 만능 객체 빼고 다 필요 없다\
  → 나머지 구성원은 퇴사
- 의존성이 매우 강하다\
  → 모든 사람이 각자의 일을 딱 맞게 수행한다\
  → 한 명에게 문제가 생기면 나머지에도 문제가 생긴다\
  → 모두 휴가를 갈 수 없다\
  → ~~결국 모두 퇴사(?)~~

:::

그래서 의존성이 아예 없어도 좋지 않고, 너무 강해도 좋지 않다. 적당한게 제일 좋다.

### Dependency의 종류

1. 객체의 생명주기 전체에 걸친 의존성
  - 상속(extends) : 상속 받는 모든 객체가 부모 객체를 쓰면 반드시 망가진다 - 위험도가 높다(의존성이 강력하다)
  - 연관(association) : 다른 객체를 알고 있다(소유하고 있다)
  - **상속을 연관(소유)로 바꿔라**
  
2. 오퍼레이션 실행 시 임시적인 의존성
  - 메소드 호출이 끝나면 의존성 종료

::: tip 의존성이 높을 경우

- 수정 여파 규모 증가
- 수정하기 어려운 구조 생성
- 순환 의존성: 모두가 다 한 가족이 된다.

:::

객체지향을 배우는 이유는 격리 구간을 세우고 의존성을 관리하기 위해서다. 즉, 변화에 대한 격리를 위해 객체지향을 하는 것이다.

### Dependency Inversion (의존성 역전)

- [DIP(다운캐스팅금지)](#d-ip-dependency-inversion-다운캐스팅금지-원칙)
- [Polymorphism(추상인터페이스 사용)](#polymorphism)

``` js{16,17,18}
const Worker = class {
  run() { console.log('working') }
  print() { this.run() }
}

// Overriding
const HardWorker = class extends Worker {
  run() { console.log('HardWorking') }
}

const worker = new HardWorker()

const Manager = class {
  #workers
  constructor(...workers) {
    // 추상화된 것을 의존하고 있다. 즉, HardWorker는 몰라도 된다.
    // 이 구문이 없어도 되지만, 코드의 뉘앙스(의도)를 표현할 수 있다
    // "worker level의 method를 쓸 것이다."
    if(workers.every(w => w instanceof Worker))
      this.#workers = workers;
    else throw 'invalid workers'
  }
  doWork() {
    this.#wokers.forEach(w => w.run())
  }
}

const manager = new Manager(new Worker(), new HardWorker())
manager.doWork();
// working
// hardworking
```

- DIP는 [OCP(개방폐쇄원칙)](#o-cp-open-closed-개방폐쇄-원칙)와 깊은 관계.
- OCP가 안 되면 DIP도 안 된다.

## IoC(Inversion of Control, 제어역전)

_IOC는 객체지향의 궁극적인 목표. 모든 원칙을 달성해야 도달할 수 있다._

::: tip 제어역전의 개념과 필요성

1. Control = flow control(흐름 제어)
2. 광의에서 흐름 제어 = 프로그램 실행 통제
3. 동기 흐름제어, 비동기 흐름제어 등

:::

::: tip Inversion
- ~~역전~~
- 위임 하겠다
- 대체 하겠다
:::

_제어 흐름이 어려운 이유_

- 흐름 제어는 상태와 결합하여 진행됨
  - 루프가 진행될수록 루프가 다루는 상태를 예측하기가 힘들다.
- 상태 통제와 흐름 제어 = 알고리즘
- 변화에 취약하고 구현하기도 어려움
  - 제어문을 만들기도 힘든데, 제어문을 유지보수 하는 것은 더 어렵다.

_대안_
- 제어를 추상화하고 한 번만 만들자(한 번의 if, 한 번의 roop)
  - 일반화라는 관점이 필요하다.
  - "달라보이지만 같다" - 연역적 추리, 귀납적 추리
  - 하나를 가르쳤더니 열 개를 안다 = 연역적 사고(원리를 안다)
  - 현상으로 부터 원리를 알고 원리를 적용한다.
- 개별 제어의 차이점만 외부에서 주입 받는다.

``` js{20,21,22}
const renderer = class {
  #view = null
  #base = null

  constructor (baseElement) {
    this.#base = baseElement
  }
  
  set view (v) {
    if(v instanceof View) this.#view = v
    else throw `invalid view: ${v}`
  }

  renderer (data) {
    const base = this.#base, view = this.#view
    if(!base || !view) throw 'no base or no view'
    let target = base.firstElementChild
    do base.removeChild(target)
    while (target = target.nextElementSibling)
    base.appendChild(view.getElement(data))
    view.initAni()
    view.startAni()
  }
}

const View = class {
  getElement (data) { throw `override!` }
  initAni () { throw 'override!' }
  startAni () { throw 'override!' }
}

const renderer = new Renderer(document.body)
renderer.view = new class extends View {
  #el
  getElement (data) {
    this.#el = document.createElement('div')
    this.#el.innerHTML = `<h2>${data.title}</h2><p>${data.description}</p>`
    this.#el.style.cssText = `width:100%;background:${data.background}`
    return this.#el
  }
  initAni () {
    const style = this.#el.style
    style.marginLeft = '100%'
    style.transition = '0.3s'
  }
  startAni () {
    requestAnimationFrame(() => this.#el.style.marginLeft = 0)
  }
}

renderer.render({
  title: 'title test',
  description: 'contents...',
  background: '#ffa'
})
```

__제어는 renderer에서만 처리한다.__

Framework = 제어 역전을 담당한다.
Library = 제어에 대한 책임이 없다.

::: tip 제어역전에 대한 디자인 패턴

전략 패턴(소유), 템플릿 메소드 패턴(상속) < 컴포지트 패턴 < 비지터 패턴

:::

궁극적으로 보다 넓은 범위의 제어 역전을 실현한다.

::: tip 추상 팩토리 메소드 패턴

왼쪽 패턴은 이미 만들어진 객체의 행위 제어역전에 참여시킬 수 있지만, 참여할 객체 자체를 생서할 수 없다.

참여할 객체를 상황에 맞게 생성하고, 행위까지 위임하기 위해 추상 팩토리 메소드를 사용한다.

:::

추상 팩토리 메소드 패턴은 비지터 패턴과 같이 사용될 수 밖에 없다.