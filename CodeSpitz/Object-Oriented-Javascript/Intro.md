# 객체지향의 기본 이론

[코드스피츠 86기 1회차](https://www.youtube.com/watch?v=E9NZ0YEZrYU&t=3914s)를 보고 정리한 내용입니다.

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
  - 평소엔 정상이네 술먹었더니 꽐라가된다(?)
  - 정상이든 꽐라든 할일은 하도록 만들어야 한다.
- 메세지를 기반으로 로직을 전개 --> 로직을 위임할 수 있다

::: tip
객체지향은 값을 사용하면 안 된다.
:::

### Polymorphism

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

const worker = new HardWorker())
console.log(worker instanceof Worker) // true. 대체가능성
worker.print() // HardWorker의 print. 내적일관성
```
@startuml
[Hardwork]
[Worker]
Hardwork <|-right- Worker 
@enduml

::: tip 대체가능성(substitution)
자식은 부모를 대체할 수 있다.\
= 확장된 class는 대상 class를 대체할 수 있다
:::

::: tip 내적일관성(internal identity)
어떠한 경우에도 태어날 경우의 원본 클래스를 유지하는 속성
:::
