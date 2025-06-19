---

title: Typescript A 부터 Z 까지
description: typescript와 관련된 내용을 AI와 함께 정리한 내용입니다.
sidebarDepth: 1
date: 2024-7-23
tag: typescript, with-ai

---

# [With AI] Typescript A 부터 Z 까지

::: tip

본 게시물은 AI(Claude)와 함께 작성하였습니다.

:::

## 참고자료

[이펙티브 타입스크립트: 동작 원리의 이해와 구체적인 조언 62가지](https://blog.insightbook.co.kr/2021/06/10/《이펙티브-타입스크립트-동작-원리의-이해와-구체/)

[[8월 우아한테크세미나] 우아한 타입스크립트](https://www.youtube.com/watch?v=ViS8DLd6o-E)

[타입스크립트에서 타입 프로그래밍하기: SmartEditor에서 타입을 다루는 방법 - Naver SmartStudio Blog](https://smartstudio.tech/type-programming/)

[type-challenges/README.ko.md at main · type-challenges/type-challenges](https://github.com/type-challenges/type-challenges/blob/main/README.ko.md)

[[10분 테코톡] 시지프의 타입스크립트 도약하기](https://www.youtube.com/watch?v=kMuJz6N-Grw)

## 1. 타입스크립트 소개

### What (타입스크립트란 무엇인가?)

TypeScript는 Microsoft에서 개발한 오픈 소스 프로그래밍 언어로, JavaScript의 슈퍼셋입니다. 즉, 모든 JavaScript 코드는 유효한 TypeScript 코드입니다. TypeScript는 다음과 같은 특징을 가집니다:

- 정적 타입 지원
- 클래스 기반 객체 지향 프로그래밍
- 모듈 시스템
- ES6+ 기능 지원

```tsx
// TypeScript 예시
let greeting: string = "Hello, TypeScript!";
console.log(greeting);
```

### Why (왜 타입스크립트를 사용해야 하는가?)

1. 향상된 개발자 경험:
- 코드 자동 완성 및 IntelliSense 지원
- 리팩토링 시 더 안전하고 효율적인 작업 가능
2. 오류 조기 발견:
- 컴파일 시점에 타입 관련 오류 감지
- 런타임 오류 감소
3. 더 나은 코드 문서화:
- 타입 정의를 통한 자체 문서화
- 코드 가독성 및 유지보수성 향상
4. 대규모 애플리케이션 개발에 적합:
- 복잡한 시스템 설계에 유용한 타입 시스템
- 팀 협업 시 코드 품질 유지 용이

### Don't (언제 타입스크립트를 사용하지 말아야 하는가?)

1. 소규모 또는 간단한 프로젝트:
- 설정 및 컴파일 과정이 오버헤드가 될 수 있음
- 빠른 프로토타이핑이 필요한 경우
2. 팀이 TypeScript에 익숙하지 않은 경우:
- 학습 곡선으로 인한 초기 생산성 저하 가능성
3. 런타임 성능이 극도로 중요한 경우:
- 컴파일된 JavaScript가 약간의 오버헤드를 가질 수 있음
- 단, 대부분의 경우 성능 차이는 무시할 만한 수준
4. 특정 JavaScript 라이브러리와의 호환성 문제:
- 타입 정의 파일이 없거나 불완전한 경우 사용이 어려울 수 있음

## 2. 기본기

### 기본 타입

```tsx
// 기본 타입 예제
let id: number = 5;
let company: string = "Acme Corp";
let isPublished: boolean = true;
let x: any = "Hello";

// 배열
let ids: number[] = [1, 2, 3, 4, 5];
let arr: any[] = [1, true, "Hello"];

// 튜플
let person: [number, string, boolean] = [1, "Brad", true];

// 열거형
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

```

### 인터페이스와 타입 별칭

```tsx
// 인터페이스
interface UserInterface {
  readonly id: number;
  name: string;
  age?: number;
}

const user1: UserInterface = {
  id: 1,
  name: "John",
};

// 타입 별칭
type Point = {
  x: number;
  y: number;
};

const pt: Point = { x: 10, y: 20 };

```

### 함수와 타입

```tsx
// 함수
function addNum(x: number, y: number): number {
  return x + y;
}

// 선택적 매개변수
function log(message: string, userId?: string) {
  console.log(message, userId || "Not signed in");
}

// 함수 오버로딩
function padding(all: number);
function padding(topAndBottom: number, leftAndRight: number);
function padding(top: number, right: number, bottom: number, left: number);
function padding(a: number, b?: number, c?: number, d?: number) {
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a;
  } else if (c === undefined && d === undefined) {
    c = a;
    d = b;
  }
  return {
    top: a,
    right: b,
    bottom: c,
    left: d
  };
}

```

### 제네릭

```tsx
// 제네릭 함수
function getArray<T>(items : T[]) : T[] {
    return new Array().concat(items);
}

let numArray = getArray<number>([1, 2, 3, 4]);
let strArray = getArray<string>(["a", "b", "c", "d"]);

// 제네릭 인터페이스
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;

```

### 타입 추론과 타입 단언

```tsx
// 타입 추론
let x = 3; // TypeScript가 x를 number로 추론

// 타입 단언
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

```

## 3. 타입 유틸리티

TypeScript는 복잡한 타입을 쉽게 조작할 수 있는 여러 유틸리티 타입을 제공합니다. 이들은 실제 개발 상황에서 매우 유용하게 사용됩니다. 주요 유틸리티 타입과 그 사용 예를 살펴보겠습니다.

### `Partial<T>`

모든 속성을 선택적으로 만듭니다.

AS-IS:

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

function updateUser(user: User) {
  // 모든 필드를 업데이트해야 함
}

```

TO-BE:

```tsx
interface User {
  id: number;
  name: string;
  email: string;
}

function updateUser(user: Partial<User>) {
  // 일부 필드만 업데이트 가능
}

updateUser({ name: "John" }); // 유효

```

### `Required<T>`

모든 속성을 필수로 만듭니다.

AS-IS:

```tsx
interface Config {
  debug?: boolean;
  timeout?: number;
}

```

TO-BE:

```tsx
type RequiredConfig = Required<Config>;
// 결과: { debug: boolean; timeout: number; }

const config: RequiredConfig = {
  debug: true,
  timeout: 3000
}; // 모든 필드 필수

```

### `Pick<T, K>`

특정 속성만 선택합니다.

AS-IS:

```tsx
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

```

TO-BE:

```tsx
type ProductPreview = Pick<Product, 'name' | 'price'>;
// 결과: { name: string; price: number; }

const preview: ProductPreview = {
  name: "Laptop",
  price: 1000
};

```

### `Omit<T, K>`

특정 속성을 제외합니다.

AS-IS:

```tsx
interface User {
  id: number;
  username: string;
  password: string;
}

```

TO-BE:

```tsx
type PublicUser = Omit<User, 'password'>;
// 결과: { id: number; username: string; }

const publicInfo: PublicUser = {
  id: 1,
  username: "john_doe"
};

```

### `Record<K, T>`

키-값 쌍의 타입을 정의합니다.

AS-IS:

```tsx
const fruitInventory = {
  apple: 10,
  banana: 20,
  orange: 15
};

```

TO-BE:

```tsx
type Fruit = 'apple' | 'banana' | 'orange';
type Stock = Record<Fruit, number>;

const fruitInventory: Stock = {
  apple: 10,
  banana: 20,
  orange: 15
};

```

### `Readonly<T>`

모든 속성을 읽기 전용으로 만듭니다.

AS-IS:

```tsx
interface Config {
  apiKey: string;
  timeout: number;
}

```

TO-BE:

```tsx
type ReadonlyConfig = Readonly<Config>;

const config: ReadonlyConfig = {
  apiKey: "my-secret-key",
  timeout: 3000
};

// config.apiKey = "new-key"; // 오류: 읽기 전용 속성

```

### `ReturnType<T>`

함수의 반환 타입을 추출합니다.

AS-IS:

```tsx
function fetchUser() {
  return { id: 1, name: "John", age: 30 };
}

```

TO-BE:

```tsx
type User = ReturnType<typeof fetchUser>;
// 결과: { id: number; name: string; age: number; }

const user: User = {
  id: 2,
  name: "Jane",
  age: 28
};

```

### `Parameters<T>`

함수의 매개변수 타입을 튜플로 추출합니다.

AS-IS:

```tsx
function greet(name: string, age: number) {
  return `Hello, ${name}! You are ${age} years old.`;
}

```

TO-BE:

```tsx
type GreetParams = Parameters<typeof greet>;
// 결과: [string, number]

const params: GreetParams = ["Alice", 25];
console.log(greet(...params));

```

### 실제 사용 예제: 복합 유틸리티 타입

여러 유틸리티 타입을 조합하여 복잡한 타입을 만들 수 있습니다:

```tsx
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

// 관리자용 사용자 정보 타입 (비밀번호 제외, 모든 필드 읽기 전용)
type AdminSafeUser = Readonly<Omit<User, 'password'>>;

// 사용자 생성 시 필요한 정보 타입 (ID 제외, 관리자 여부 선택적)
type CreateUserDto = Omit<User, 'id'> & Partial<Pick<User, 'isAdmin'>>;

function createUser(userData: CreateUserDto) {
  // 사용자 생성 로직
}

createUser({
  name: "John Doe",
  email: "john@example.com",
  password: "securepassword123"
  // isAdmin은 선택적
});

```

이러한 타입 유틸리티들을 활용하면 코드의 타입 안정성을 높이고, 재사용 가능한 타입을 쉽게 정의할 수 있습니다. 실제 프로젝트에서 이들을 적절히 조합하여 사용하면 더 견고하고 유지보수가 쉬운 코드를 작성할 수 있습니다.

## 4. 타입 추론 심화

TypeScript의 타입 추론 기능을 잘 활용하면 명시적인 타입 선언을 줄이면서도 타입 안정성을 유지할 수 있습니다. 다음은 타입 추론을 적극적으로 활용하는 예제들입니다.

### 변수 초기화를 통한 타입 추론

```tsx
// 명시적 타입 선언 없이도 TypeScript가 타입을 추론합니다.
let name = "Alice";  // string으로 추론
let age = 30;  // number로 추론
let isStudent = false;  // boolean으로 추론

// 배열의 경우 요소 타입을 추론합니다.
let numbers = [1, 2, 3, 4, 5];  // number[]로 추론
let mixed = [1, "two", 3, "four"];  // (string | number)[]로 추론

```

### 함수 반환 타입 추론

```tsx
function add(a: number, b: number) {
    return a + b;  // 반환 타입이 number로 추론됨
}

function greet(name: string) {
    return `Hello, ${name}!`;  // 반환 타입이 string으로 추론됨
}

```

### 객체 리터럴과 타입 추론

```tsx
// 객체 리터럴의 속성 타입이 자동으로 추론됩니다.
const user = {
    id: 1,
    name: "John Doe",
    age: 30,
    isAdmin: false,
    roles: ["user", "editor"]
};

// user의 타입은 다음과 같이 추론됩니다:
// {
//     id: number;
//     name: string;
//     age: number;
//     isAdmin: boolean;
//     roles: string[];
// }

```

### 제네릭과 타입 추론

```tsx
function identity<T>(arg: T): T {
    return arg;
}

let output = identity("myString");  // output의 타입이 string으로 추론됨
let numOutput = identity(42);  // numOutput의 타입이 number로 추론됨

```

### 콜백 함수의 매개변수 타입 추론

```tsx
const numbers = [1, 2, 3, 4, 5];

// item의 타입이 number로 추론됨
numbers.forEach((item) => {
    console.log(item.toFixed(2));
});

// 명시적 타입 선언 없이도 value의 타입이 number로 추론됨
const doubled = numbers.map(value => value * 2);

```

### 구조 분해 할당과 타입 추론

```tsx
const point = { x: 10, y: 20 };

// destructured의 타입이 { x: number, y: number }로 추론됨
function printCoord({ x, y }: { x: number; y: number }) {
    console.log(`Coordinate: (${x}, ${y})`);
}

printCoord(point);

```

### 조건부 타입과 타입 추론

```tsx
type IsArray<T> = T extends any[] ? true : false;

// 타입 인수를 명시적으로 지정하지 않아도 TypeScript가 추론
const isNumberArray: IsArray<number[]> = true;  // true로 추론
const isStringArray: IsArray<string> = false;  // false로 추론

```

### 복합 예제: 타입 추론을 활용한 유틸리티 함수

```tsx
function createUser<T extends object>(defaults: T, override: Partial<T>) {
    return { ...defaults, ...override };
}

const defaultUser = {
    name: "Guest",
    age: 0,
    isAdmin: false
};

// user의 타입이 { name: string; age: number; isAdmin: boolean; }로 추론됨
const user = createUser(defaultUser, { name: "John", age: 30 });

console.log(user);  // { name: "John", age: 30, isAdmin: false }

```

## 5. 제네릭 심화

제네릭을 사용하면 타입을 마치 함수의 매개변수처럼 사용할 수 있어, 재사용 가능하고 유연한 코드를 작성할 수 있습니다. 다음은 제네릭을 적극적으로 활용하는 다양한 예제들입니다.

### 기본 제네릭 함수

```tsx
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("myString");  // 타입을 명시적으로 지정
let output2 = identity(42);  // 타입 추론 사용

```

### 제네릭 인터페이스

```tsx
interface GenericIdentityFn<T> {
    (arg: T): T;
}

let myIdentity: GenericIdentityFn<number> = identity;

```

### 제네릭 클래스

```tsx
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;

    constructor(zeroValue: T, addFn: (x: T, y: T) => T) {
        this.zeroValue = zeroValue;
        this.add = addFn;
    }
}

let stringNumeric = new GenericNumber<string>("", (x, y) => x + y);
console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));  // "test"

let numberNumeric = new GenericNumber<number>(0, (x, y) => x + y);
console.log(numberNumeric.add(5, 10));  // 15

```

### 제네릭 제약조건

```tsx
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // 이제 .length 속성이 있다고 확신할 수 있습니다
    return arg;
}

loggingIdentity([1, 2, 3]);  // 성공
loggingIdentity({length: 10, value: 3});  // 성공
// loggingIdentity(3);  // 오류, number에는 .length가 없습니다

```

### 제네릭과 타입 추론을 활용한 Factory 함수

```tsx
function create<T>(Factory: { new(): T }): T {
    return new Factory();
}

class BeeKeeper {
    hasMask: boolean = true;
}

class ZooKeeper {
    nametag: string = "Mikle";
}

class Animal {
    numLegs: number = 4;
}

class Bee extends Animal {
    keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
    keeper: ZooKeeper = new ZooKeeper();
}

let bee = create(Bee);
let lion = create(Lion);

```

### 제네릭 타입 매핑

```tsx
type Nullable<T> = { [P in keyof T]: T[P] | null };

interface User {
    name: string;
    age: number;
}

type NullableUser = Nullable<User>;
// 결과: { name: string | null; age: number | null; }

```

### 조건부 타입과 제네릭

```tsx
type NonNullable<T> = T extends null | undefined ? never : T;

type Result = NonNullable<string | number | null | undefined>;
// 결과: string | number

```

### 복합 예제: 제네릭을 활용한 상태 관리 시스템

```tsx
class StateManager<S> {
    private state: S;

    constructor(initialState: S) {
        this.state = initialState;
    }

    getState(): S {
        return this.state;
    }

    setState(newState: Partial<S>): void {
        this.state = { ...this.state, ...newState };
    }
}

interface UserState {
    name: string;
    age: number;
    isLoggedIn: boolean;
}

const userStateManager = new StateManager<UserState>({
    name: "Guest",
    age: 0,
    isLoggedIn: false
});

console.log(userStateManager.getState());  // { name: "Guest", age: 0, isLoggedIn: false }

userStateManager.setState({ name: "John", age: 30 });
console.log(userStateManager.getState());  // { name: "John", age: 30, isLoggedIn: false }

userStateManager.setState({ isLoggedIn: true });
console.log(userStateManager.getState());  // { name: "John", age: 30, isLoggedIn: true }

```

## 6. React와 TypeScript

React와 TypeScript를 함께 사용할 때 특히 유용한 타입 유틸리티들을 소개합니다. 이들은 컴포넌트와 props를 더 정확하고 유연하게 타입화하는 데 도움을 줍니다.

### `ComponentProps<T>`

컴포넌트의 props 타입을 추출합니다.

AS-IS:

```tsx
import { Button } from 'some-ui-library';

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  // 다른 모든 props를 수동으로 정의해야 함
};

```

TO-BE:

```tsx
import { Button } from 'some-ui-library';
import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<typeof Button>;

```

### `PropsWithChildren<P>`

props 타입에 children을 추가합니다.

AS-IS:

```tsx
type CardProps = {
  title: string;
  children?: React.ReactNode;
};

```

TO-BE:

```tsx
import { PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<{
  title: string;
}>;

```

### CSSProperties

인라인 스타일 객체의 타입을 정의합니다.

AS-IS:

```tsx
function StyledDiv({ style }: { style: any }) {
  return <div style={style} />;
}

```

TO-BE:

```tsx
import { CSSProperties } from 'react';

function StyledDiv({ style }: { style: CSSProperties }) {
  return <div style={style} />;
}

```

## 7. 종합 예제 5가지

### 재귀적 타입을 이용한 JSON 파서

이 예제는 TypeScript의 재귀적 타입을 사용하여 JSON 구조를 타입으로 표현합니다.

```tsx
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

type JSONObject = { [key: string]: JSONValue };

function parseJSON(json: string): JSONValue {
  return JSON.parse(json);
}

function stringifyJSON(value: JSONValue): string {
  return JSON.stringify(value);
}

// 사용 예
const jsonString = '{"name":"John","age":30,"isStudent":false,"hobbies":["reading","coding"]}';
const parsed = parseJSON(jsonString);
console.log(parsed);

const stringified = stringifyJSON({ x: 5, y: [1, 2, 3] });
console.log(stringified);

```

### 조건부 타입을 이용한 유틸리티 함수

이 예제는 조건부 타입을 사용하여 객체의 특정 속성만 선택하는 유틸리티 함수를 구현합니다.

```tsx
type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P]
};

function pickByType<T extends object, U>(obj: T, type: new (...args: any[]) => U): PickByType<T, U> {
  const result: Partial<PickByType<T, U>> = {};
  for (const key in obj) {
    if (obj[key] instanceof type) {
      result[key as keyof PickByType<T, U>] = obj[key] as U;
    }
  }
  return result as PickByType<T, U>;
}

// 사용 예
const mixedObject = {
  name: "John",
  age: 30,
  birthDate: new Date("1990-01-01"),
  address: { street: "Main St", city: "New York" }
};

const dateProperties = pickByType(mixedObject, Date);
console.log(dateProperties); // { birthDate: Date }

```

### 제네릭과 매핑된 타입을 이용한 깊은 읽기 전용 변환기

이 예제는 제네릭과 매핑된 타입을 사용하여 객체를 깊은 수준에서 읽기 전용으로 변환합니다.

```tsx
type DeepReadonly<T> =
  T extends (infer R)[] ? DeepReadonlyArray<R> :
    T extends Function ? T :
      T extends object ? DeepReadonlyObject<T> :
        T;

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};

function makeDeepReadonly<T>(obj: T): DeepReadonly<T> {
  return obj as DeepReadonly<T>;
}

// 사용 예
const mutableObject = {
  name: "John",
  age: 30,
  address: {
    street: "Main St",
    city: "New York"
  },
  hobbies: ["reading", "coding"]
};

const readonlyObject = makeDeepReadonly(mutableObject);
// readonlyObject.name = "Jane"; // 오류
// readonlyObject.address.city = "Boston"; // 오류
// readonlyObject.hobbies.push("gaming"); // 오류

```

### 인터섹션 타입과 유니온 타입을 이용한 복잡한 상태 관리

이 예제는 인터섹션 타입과 유니온 타입을 사용하여 복잡한 애플리케이션 상태를 모델링합니다.

```tsx
type UserRole = "admin" | "user" | "guest";

interface BaseState {
  isLoading: boolean;
  error: string | null;
}

interface GuestState extends BaseState {
  userRole: "guest";
}

interface UserState extends BaseState {
  userRole: "user";
  username: string;
}

interface AdminState extends BaseState {
  userRole: "admin";
  username: string;
  adminToken: string;
}

type AppState = GuestState | UserState | AdminState;

function updateState(currentState: AppState, update: Partial<AppState>): AppState {
  return { ...currentState, ...update } as AppState;
}

// 사용 예
let state: AppState = { isLoading: true, error: null, userRole: "guest" };
console.log(state);

state = updateState(state, { isLoading: false, userRole: "user", username: "john_doe" });
console.log(state);

state = updateState(state, { userRole: "admin", adminToken: "secret_token" });
console.log(state);

```

### 타입 추론과 제네릭을 이용한 함수 합성기

이 예제는 타입 추론과 제네릭을 사용하여 함수 합성을 타입 안전하게 구현합니다.

```tsx
type Func<T extends any[], R> = (...args: T) => R;

function compose<R>(fn1: Func<any, R>): Func<any, R>;
function compose<T1, R>(fn1: Func<[T1], R>): Func<[T1], R>;
function compose<T1, T2, R>(fn1: Func<[T2], R>, fn2: Func<[T1], T2>): Func<[T1], R>;
function compose<T1, T2, T3, R>(
  fn1: Func<[T3], R>,
  fn2: Func<[T2], T3>,
  fn3: Func<[T1], T2>
): Func<[T1], R>;
function compose(...fns: Func<any, any>[]): Func<any, any> {
  return fns.reduce((f, g) => (...args) => f(g(...args)));
}

// 사용 예
const toUpperCase = (x: string) => x.toUpperCase();
const exclaim = (x: string) => x + "!";
const shout = compose(exclaim, toUpperCase);

console.log(shout("hello")); // "HELLO!"

const add = (a: number, b: number) => a + b;
const square = (x: number) => x * x;
const addAndSquare = compose(square, add);

console.log(addAndSquare(3, 4)); // 49

```
