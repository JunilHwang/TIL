---

title: None Blocking Javascript 소개
description: 거침없는(None Blocking) 자바스크립트의 특징들에 대해 소개합니다.
date: 2020-01-31 13:00:00
sidebarDepth: 2

---

# None Blocking Javascript 소개

::: tip 해당 포스트는 아래의 내용을 토대로 정리한 것입니다.

- [코드스피츠 85기 - 거침없는 자바스크립트 1회차](https://www.youtube.com/watch?v=0NsJsBdYVHI&list=PLBNdLLaRx_rImvbuZnfO-Ecv9OpuCNoCl)

:::

Javascript 라는 언어의 특징에 대해 다루는 내용입니다.

## Javascript Pipeline

Javascript로 만든 프로그램이 서비스되는 과정은 다음과 같다.

@startuml
card code
card Transpiler
card Packaging
card CI
card Deploy

code -[hidden] Transpiler
Transpiler -[hidden] Packaging
Packaging -[hidden] CI
CI -[hidden] Deploy
@enduml

단점 : 코드를 서비스 단계에서 디버깅 하기는 굉장히 힘들다.

장점 : 코드의 호환성은 Transpiler와 Packaging이 책임진다.

- Code
  - ECMAScript
  - TypeScript
  - Kotlin
  - Dart
- Transpiler
  - Step1
    - tsc
    - kotlinc
  - Step2
    - _babel_
- Packaging
  - webpack
- CI
- Deploy

수업에서는 Code(ECMAScript2020)에 집중한다.

## ECMAScript Standard

매년 상반기 새로운 버전츨 출시함(버전과 연도가 1차이. ES6 = ES2015)

현재 ES11(ES2020)이 최종 조정 중

ES6 이후 급격한 언어의 변화를 지양하고 점진적인 버전업을 진행

새롭게 반영될 내용은 Stage0~3까지 단계별 승격을 통해 정식 반영시 Stage4가 됨

현재 제안 중인 내용의 상태 확인 : [https://github.com/tc39/proposals](https://github.com/tc39/proposals)

::: tip 실제로는?

tc39 위원회에서 회의를 통해 결정되며 위원회는 다양한 업계와 관계자로 구성됨

실제 각 제안의 담당자(챔피온)가 구글 관련 개발자인 경우가 많음

_Stage4 기준 보다 구글이 원하는 순서대로 크롬에 빨리 반영되는 경우가 많음_

크롬의 업데이트 확인 : https://developers.google.com/web/updates/capabilities

:::

### ES6

- Class
- Iterator, Generator, For of
- Class Library
  - Symbol, Promise, Map, Set, WeakMap, WeakSet, Proxy, Reflect
- Object Literal
- Arrow (순수한 함수 지향. 가벼운 객체를 만들 수 있다)
- const, let
- destructuring, rest, spread
- Template String

### ES7

- 중첩된 Rest Destructure
- `const [a, ...[b, ...c]] = [1, 2, 3, 4]` => `a=1` `b=2` `c=[3,4]`

### ES8

- async/await
- shared memory ( thread 간에 메모리 공유 )
- atomics ( mutex lock )

### ES9

- Object Destructure
- asynchronous iterators

### ES10

- optional catch

### ES11(Stage11)

- *Bigint*
- *globalThis*
- *top level await*
- *class field*
- *private field*/method
- optional chaining `?.`
- nullish coalescing `??`
- WeakReference

*이미 크롬이 지원함*

## Program & Timing

- Language code
  - Lint, IDE
  - ES2020, Tyescript ...

- Machine language (Browser, JVM 등의 Runtime)
  - Compiler, Transpiler

- File
  - Deploy

- Load
  - Browser load
  - Browser parsing

- Run
  - Browser parsing
  - Runtime

- Terminate
  - Browser close

개발의 목표

- 만들어진 코드를 건드리지 않고 더 많은 기능이나 수정을 하는가.
- 코드가 변화하는 이유를 한 가지고 규정하는 것
- 변화에 대응하는 여파를 최소화 시키는 것

자바스크립트는 Compile Time과 Run Time의 구분이 존재하지 않는다.
