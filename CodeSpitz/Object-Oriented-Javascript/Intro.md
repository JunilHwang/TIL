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

