---

title: 자바스크립트 실행 컨텍스트
description: 자바스크립트 실행 컨텍스트에 대해 다룹니다.
sidebarDepth: 2
date: 2020-08-01

---

# 자바스크립트 실행 컨텍스트

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
  - 선언 시점의 LexicalEnvironment의 스냅샷(변경사항 반영 X)
- `LexicalEnvironment`
  - 처음에는 VariableEnvironment와 같음
  - 변경 사항이 실시간으로 반영됨
- `ThisBinding`
  - 식별자가 바라봐야 할 대상 객체

### Variable Environment

VariableEnvironment에 담기는 내용은 LexicalEnvironment와 같지만, **최초 실행 시의 스냅샷을 유지**한다.
실행 컨텍스트를 생서할 때 VariableEnvironment에 정보를 먼저 담은 다음, 이를 복사해서 LexicalEnvironment를 만든다.

주로 활용하는 것은 LexicalEnvironment이다. 즉, VariableEnviroment는 스냅샷 유지를 목적으로 사용한다.

### Lexcial Environment

LexicalEnvironment의 내부에는 **environmentRecord**와 **outerEnvironmentReference**로 구성돼 있다.

- environmentRecord로 인하여 호이스팅이 발생한다.
- outerEnvironmentReference로 인하여 스코프와 스코프체인이 형성된다.

## 3. environmentRecord와 Hoisting(호이스팅)

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

  console.log(b); // f b () {}
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

앞의 예제의 함수를 표현식으로 변경해보자.

```js
function a () {
  console.log(b);
  var b = 'bbb';
  console.log(b);
  var b = function () {}; // b에 익명함수를 할당했다.
  console.log(b);
}
a();
```

그리고 이 코드는 다음과 같이 해석될 수 있다.

```js{8}
function a () {
  var b;
  var b;

  console.log(b); // undefined
  b = 'bbb';
  console.log(b); // bbb
  b = function () {}; // b에 익명함수를 할당했다.
  console.log(b); // f () {}
}
a();
```

## 4. outerEnvironmentReference와 Scope

::: tip scope

스코프란 식별자에 대한 유효범위이다.

- Scope A의 외부에서 선언한 변수는, A의 외부/내부 모두 접근 가능하다.
- A의 내부에서 선언한 변수는 오직 A의 내부에서만 접근할 수 있다.

:::

스코프의 개념은 대부분의 언어에 존재하지만,
ES5까지의 Javascript는 특이하게도 **오직 함수에 의해서**만 스코프가 생성된다.

::: tip scope chain
- **식별자의 유효범위**를 안에서 바깥으로 차례로 검색해나는 것
- 이를 가능하게 하는 것이 **outerEnvironmentReference**이다.
:::

outerEnvironmentReference는 _현재 호출된 함수가 선언될 당시의 LexicalEnvironment를 참조한다._\
`선언하다`라는 행위가 실제로 일어날 수 있는 시점은 _콜 스택 상에서 어떤 실행 컨텍스트가 활성화된 상태일 때뿐이다._
**모든 코드는 실행 컨텍스트가 활서화 상태일 때 실행되기 때문이다.**

```js
var a = 1; // 전역 컨텍스트
function outer () { // outer 컨텍스트
  function inner () { // inner 컨텍스트
    console.log(a);
    var a = 3;
    console.log(a);
  }
  inner(); // inner가 실행될 때 outer의 LexcicalEnvironemnt를 outerEnvironmentReference로 참조한다.
  console.log(a);
}
outer(); // outer가 실행될 때 전역 컨텍스트의 LexcicalEnvironemnt를 outerEnvironmentReference로 참조한다.
console.log(a);
```

위의 코드는 다음과 같은 scope chain을 형성한다.

```
inner LexicalEnvironment {
    식별자 a
    outerEnvironmentReference = outer LexicalEnvironment {
            식별자 a
            outerEnvironmentReference = global LexicalEnvironment {
                식별자 a
            }
        }
    }
}
```

이러한 구조적 특성 덕분에 여러 스코프에 동일한 식별자를 선언할 경우,
_무조건 scope chain 상에서 가장 먼저 발견된 식별자에만 접근 가능하게 된다._

```{3,8,14}
inner LexicalEnvironment {

    식별자 a        # inner function에서 a에 접근할 때 여기에 가장 먼저 접근

    outerEnvironmentReference = outer LexicalEnvironment {

            식별자 a        # outer function에서 a에 접근할 때 여기에 가장 먼저 접근
            식별자 b        # inner function에서 b에 접근할 때 여기에 가장 먼저 접근

            outerEnvironmentReference = global LexicalEnvironment {

                식별자 a        # 전역에서 a에 접근할 때 여기에 가장 먼저 접근
                식별자 b        # 전역에서 b에 접근할 때 여기에 가장 먼저 접근
                식별자 c        # inner function에서 c에 접근할 때 여기에 가장 먼저 접근

            }

        }

    }

}
```

## 5. this

실행 컨텍스트의 thisBinding에는 this로 지정된 객체가 저장된다.
this는 여기에 다루기에 복잡한 내용이 많기 때문에 따로 작성할 예정이다.

## Summary

- 실행 컨텍스트는 실행할 코드에 제공할 환경 정보들을 모아놓은 객체이다.
  - 전역 공간에서 자동으로 생성되는 전연 컨텍스트
  - eval함수
  - 함수 실행에 의한 컨텍스트
- 실행 컨텍스트 객체는 활성화 되는 시점에 VariableEnviroment, LexcialEnvrionment, ThisBinding의 세 가지 정보를 수집한다.
- 실행 컨텍스트를 생서할 때 VariableEnvironment와 LexicalEnvironment가 동일한 내용으로 구성된다.
- LexicalEnvironment는 함수 실행 도중에 변경되는 사항이 즉시 반영된다.
- LexicalEnvironment와 VariableEnvironment는 다음과 environmentRecord와 outerEnvironmentReference로 구성돼 있다.
  - environmentRecord는 매개변수 식별자, 변수 식별자, 선언한 함수의 식별자 등을 수집한다.
    - 이것 때문에 호이스팅이라는 개념이 사용된다.
    - 호이스팅은 코드 해석을 좀 더 수월하게 하기 위해 environmentRecord의 수집 과정을 추상화한 개념이다.
    - 변수 선언부와 함수 선언문에 호이스팅이 발생한다.
    - 함수 표현식을 사용할 경우 함수의 선언부만 호이스팅이 발생한다.
  - outerEnvironmentReference는 상위(직전) 컨텍스트의 LexcicalEnviroment 정보를 참조한다.
    - 이것 때문에 스코프가 형성되고, 스코프 체인을 통해 상위 컨텍스트에 접근할 수 있다.
    - 스코프는 변수의 유효범위를 말한다.

## Reference

[코어 자바스크립트](http://www.yes24.com/Product/Goods/78586788)
- 2장. 실행 컨텍스트