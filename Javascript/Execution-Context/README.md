---

sidebarDepth: 2
title: 자바스크립트 실행컨텍스트
date: 2020-07-26

---

# 실행 컨텍스트

실행 컨텍스트는 자바스크립트에서 가장 중요한 핵심 개념 중에 하나다.
이를 정확히 이해하는 것은 자바스크립트 개발자에게 매우 중요하다.

## 1. 개념

::: tip 실행 컨텍스트

- __실행할 코드에 제공할 환경 정보들을 모아놓은 객체__
- 자바스크립트의 동적 언어로서의 성격을 가장 잘 파악할 수 있는 개념

:::

자바스크립트는 실행 컨텍스트가 활성화되는 시점에 다음과 같은 현상이 발생한다.

- 호이스팅이 발생한다(선언된 변수를  위로 끌어올린다)
- 외부 환경 정보를 구성한다
- this 값을 설정한다.

이로 인해 다른 언어에서 발견할 수 없는 특이한 현상들이 발생한다.

## 2. 실행 컨텍스트 구성

실행 컨텍스트는 다음과 같은 것들을 이용하면 `call stack`에 쌓이게 된다.

- `전역공간`은 자동으로 컨텍스트로 구성된다.
- `함수`를 실행한다.
- `eval()`함수를 실행한다.
- `block`을 만든다 __(ES6+)__

일반적으로 **함수를 이용한 실행 컨텍스트**를 사용한다.

```js
var a = 1; // 전역 컨텍스트
function outer () { // outer 컨텍스트
  function inner () { // inner 컨텍스트
    console.log(a); // undefined
    var a = 3;
    console.log(a); // 3
  }
  inner();
  console.log(a); // 1
}
outer();
console.log(a); // 1
```

위와 같이 코드를 구성했을 때 실행 컨텍스트의 스택은 다음과 같은 순서로 실행된다.

- 프로그램 실행: `[전역컨텍스트]` 
- outer 실행: `[전역컨텍스트, outer]` 
- inner 실행: `[전역컨텍스트, outer, inner]`
- inner 종료: `[전역컨텍스트, outer]`
- outer 종료: `[전역컨텍스트]`

그리고 이러한 실행컨텍스트를 구성할 때 생기는 것들이 있다.

- `VariableEnvironment`
  - 현재 컨텍스트 내의 식별자(변수)들에 대한 정보
  - 외부 환경 정보
  - 선언 시점의 LexcialEnvironment의 스냅샷(변경사항 반영 X)
- `LexcialEnvironment`
  - 처음에는 VariableEnvironment와 같음
  - 변경 사항이 실시간으로 반영됨
- `ThisBinding`
  - 식별자가 바라봐야 할 대상 객체

### Variable Environment

VariableEnvironment에 담기는 내용은 LexcicalEnvironment와 같지만, **최초 실행 시의 스냅샷을 유지**한다.
실행 컨텍스트를 생서할 때 VariableEnvironment에 정보를 먼저 담은 다음, 이를 복사해서 LexcicalEnvironment를 만든다.

주로 활용하는 것은 LexcicalEnvironment이다. 즉, VariableEnviroment는 스냅샷 유지를 목적으로 사용한다.

### Lexcial Environment

LexcialEnvironment의 내부에는 **environmentRecord**와 **outerEnvironmentReference**로 구성돼 있다.

#### environmentRecord와 호이스팅

자바스크립트는 코드를 실행하기전에 식별자를 수집한다.

::: tip environmentRecord
현재 컨텍스트와 관련된 코드의 식별자 정보들이 저장된다.

- 매개변수 식별자
- 함수 자체
- 함수 내부의 식별자
:::

::: tip Host Object(호스트 객체)
- 전역 실행 컨텍스트는 변수 객체를 생성하는 대신 전역 객체를 활용한다.
- 브라우저의 Window 객체, Node의 Global 객체 등이 이에 해당한다.
- 이들은 Host Object로 분류된다.
:::

즉, 코드가 실행 되기 전에 자바스크립트의 엔진은 이미 실행 컨텍스트에 속한 변수명들을 모두 알고 있게 되는 셈이다.

_이 때 호이스팅이란 개념이 이용된다._

엔진의 실제 동작 방식 대신에 `자바스크립트 엔진은 식별자들을 최상단으로 끌어올려놓은 다음, 실제 코드를 실행한다` 라고 생각해도 코드 해석에 문제되는 것이 없기 때문이다.

중요한 점은, 자바스크립트 엔진이 실제로 변수를 끌어올리지는 않지만, _편의상 끌어올리는 것으로 간주하자는 것이다._

```js
function a (x) {
  console.log(x);
  var x ;
  console.log(x);
  var x = 2;
  console.log(x);
}
a(1);
```

위의 코드는 다음과 같이 해석될 수 있다.

```js{2}
function a () {
  var x = 1; // 매개변수 할당
  console.log(x);
  var x ;
  console.log(x);
  var x = 2;
  console.log(x);
}
a();
```

다시 위의 코드에서 호이스팅이 발생한다고 가정하면, 다음과 같이 해석될 수 있다.


```js{2-4}
function a () {
  var x;
  var x;
  var x;

  x = 1;
  console.log(x); // 1
  console.log(x); // 1
  x = 2;
  console.log(x); // 2
}
a();
```

변수의 호이스팅은 이처럼 해석될 수 있다. 함수의 호이스팅은 조금 다르다.

다음 예를 통해 살펴보자.

```js
function a () {
  console.log(b);
  var b = 'bbb';
  console.log(b);
  function b () {};
  console.log(b);
}
a();
```

변수의 경우 정의부만 호이스팅 되지만, 함수는 **함수 전체가 호이스팅 된다.**

```js{3}
function a () {
  var b;
  function b () {};

  console.log(b); // function b () {}
  b = 'bbb';
  console.log(b); // bbb
  console.log(b); // bbb
}
a();
```

그리고 자바스크립트의 함수는 일급객체(혹은 일급시민)이기 때문에 함수 표현식이 가능하다.

::: tip 일급객체(일급시민)

여기 x라는 것이 있다.

- x를 변수에 담을 수 있다.
- x를 매개변수에 넘길 수 있다.
- x를 함수에서 반환할 수 있다.

x를 만족할 때, 이를 일급객체라고 한다.

즉, 자바스크립트의 함수는 일급객체이므로

- 함수를 변수에 담을 수 있다.
- 함수를 매개변수로 넘길 수 있다.
- 함수를 함수에서 반환할 수 있다.

위의 같은 조건을 만족한다.

:::


```js{3}
function a () {
  var b;
  function b () {};

  console.log(b); // function b () {}
  b = 'bbb';
  console.log(b); // bbb
  console.log(b); // bbb
}
a();
```

## Reference

[코어 자바스크립트](http://www.yes24.com/Product/Goods/78586788)