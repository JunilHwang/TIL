---

title: Javascript 한글 초성검색
description: 복잡한 계산식 없이, 간단하게 초성 검색을 구현할 수 있다.
sidebarDepth: 2
date: 2020-08-30
tag: javascript

---

# Javascript 한글 초성검색

> 본 게시물은 초성 검색 구현에 대한 여러 게시물을 보다가 이해하기가 힘든 경우가 많아서 어떻게 할까 고민하다가 작성하는 글입니다. 

먼저 초성검색을 하기 위해선 [String.prototype.charCodeAt](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)에 대해 알아야 한다.
`String.prototype.charCodeAt` 메서드는 주어진 인덱스에 대한 UTF-16 코드를 나타내는 0부터 65535 사이의 정수를 반환한다.

다음과 같이 사용해볼 수 있다.

```javascript
console.log('가'.charCodeAt(0)); // 44032
console.log('깋'.charCodeAt(0)); // 44619
```

위의 코드를 보고 알 수 있는 부분은 다음과 같다.

`ㄱ`으로 검색하면 `가 ~ 깋`에 해당하는지 검사하는 함수가 필요하다.

```javascript
const range = ['가'.charCodeAt(0), '깋'.charCodeAt(0)];

function search(word) {
  const [start, end] = range;
  return start <= word.charCodeAt(0) && word.charCodeAt(0) <= end;
}

console.log(search('가')); // true
console.log(search('깋')); // true
console.log(search('나')); // false
```

이게 초성검색의 전부라고 할 수 있다.
한 번 모든 초성의 대한 범위를 정의해보자.
```javascript
const ranges = {
  "ㄱ": ['가'.charCodeAt(0), '깋'.charCodeAt(0)],
  "ㄲ": ['까'.charCodeAt(0), '낗'.charCodeAt(0)],
  "ㄴ": ['나'.charCodeAt(0), '닣'.charCodeAt(0)],
  "ㄷ": ['다'.charCodeAt(0), '딯'.charCodeAt(0)],
  "ㄸ": ['따'.charCodeAt(0), '띻'.charCodeAt(0)],
  "ㄹ": ['라'.charCodeAt(0), '맇'.charCodeAt(0)],
  "ㅁ": ['마'.charCodeAt(0), '밓'.charCodeAt(0)],
  "ㅂ": ['바'.charCodeAt(0), '빟'.charCodeAt(0)],
  "ㅃ": ['빠'.charCodeAt(0), '삫'.charCodeAt(0)],
  "ㅅ": ['사'.charCodeAt(0), '싷'.charCodeAt(0)],
  "ㅆ": ['싸'.charCodeAt(0), '앃'.charCodeAt(0)],
  "ㅇ": ['아'.charCodeAt(0), '잏'.charCodeAt(0)],
  "ㅈ": ['자'.charCodeAt(0), '짛'.charCodeAt(0)],
  "ㅉ": ['짜'.charCodeAt(0), '찧'.charCodeAt(0)],
  "ㅊ": ['차'.charCodeAt(0), '칳'.charCodeAt(0)],
  "ㅋ": ['카'.charCodeAt(0), '킿'.charCodeAt(0)],
  "ㅌ": ['타'.charCodeAt(0), '팋'.charCodeAt(0)],
  "ㅍ": ['파'.charCodeAt(0), '핗'.charCodeAt(0)],
  "ㅎ": ['하'.charCodeAt(0), '힣'.charCodeAt(0)],
}
```

여기서 조금 더 발전시켜보자. 일단 ㄱ ~ ㅎ 까지에 대한 초성의 범위를 최대한 편하게 한 번에 표현해야 한다.
이를 위해서 규칙을 한 가지 찾아내야한다.

```javascript
console.log('깋'.charCodeAt(0) - '가'.charCodeAt(0)); // 587
console.log('힣'.charCodeAt(0) - '하'.charCodeAt(0)); // 587
console.log(('깋'.charCodeAt(0) - '가'.charCodeAt(0)) === ('힣'.charCodeAt(0) - '하'.charCodeAt(0))); // true
```

그래서 다음과 같이 표현할 수 있을 것 같다.
```javascript
const rangeSize = '깋'.charCodeAt(0) - '가'.charCodeAt(0);
const ranges = {
  "ㄱ": ['가'.charCodeAt(0), '가'.charCodeAt(0) + rangeSize],
  "ㄲ": ['까'.charCodeAt(0), '까'.charCodeAt(0) + rangeSize],
  "ㄴ": ['나'.charCodeAt(0), '나'.charCodeAt(0) + rangeSize],
  "ㄷ": ['다'.charCodeAt(0), '다'.charCodeAt(0) + rangeSize],
  "ㄸ": ['따'.charCodeAt(0), '따'.charCodeAt(0) + rangeSize],
  "ㄹ": ['라'.charCodeAt(0), '라'.charCodeAt(0) + rangeSize],
  "ㅁ": ['마'.charCodeAt(0), '마'.charCodeAt(0) + rangeSize],
  "ㅂ": ['바'.charCodeAt(0), '바'.charCodeAt(0) + rangeSize],
  "ㅃ": ['빠'.charCodeAt(0), '빠'.charCodeAt(0) + rangeSize],
  "ㅅ": ['사'.charCodeAt(0), '사'.charCodeAt(0) + rangeSize],
  "ㅆ": ['싸'.charCodeAt(0), '싸'.charCodeAt(0) + rangeSize],
  "ㅇ": ['아'.charCodeAt(0), '아'.charCodeAt(0) + rangeSize],
  "ㅈ": ['자'.charCodeAt(0), '자'.charCodeAt(0) + rangeSize],
  "ㅉ": ['짜'.charCodeAt(0), '짜'.charCodeAt(0) + rangeSize],
  "ㅊ": ['차'.charCodeAt(0), '차'.charCodeAt(0) + rangeSize],
  "ㅋ": ['카'.charCodeAt(0), '카'.charCodeAt(0) + rangeSize],
  "ㅌ": ['타'.charCodeAt(0), '타'.charCodeAt(0) + rangeSize],
  "ㅍ": ['파'.charCodeAt(0), '파'.charCodeAt(0) + rangeSize],
  "ㅎ": ['하'.charCodeAt(0), '하'.charCodeAt(0) + rangeSize],
}
```

다시 이걸 이렇게 표현할 수 있다.

```javascript
const rangeSize = '깋'.charCodeAt(0) - '가'.charCodeAt(0);
const rangeStarts = {
  "ㄱ": '가',
  "ㄲ": '까',
  "ㄴ": '나',
  "ㄷ": '다',
  "ㄸ": '따',
  "ㄹ": '라',
  "ㅁ": '마',
  "ㅂ": '바',
  "ㅃ": '빠',
  "ㅅ": '사',
  "ㅆ": '싸',
  "ㅇ": '아',
  "ㅈ": '자',
  "ㅉ": '짜',
  "ㅊ": '차',
  "ㅋ": '카',
  "ㅌ": '타',
  "ㅍ": '파',
  "ㅎ": '하',
}

const contains = (char, query) => {
  if (!rangeStarts[query]) {
    return char === query;
  }
  const start = rangeStarts[query].charCodeAt(0);
  const end = start + rangeSize;
  return start <= char.charCodeAt(0) && char.charCodeAt(0) <= end;
};

console.log(contains('가', 'ㄱ')); // true
console.log(contains('깋', 'ㄱ')); // true
console.log(contains('가', 'ㄴ')); // false
console.log(contains('나', 'ㄴ')); // true
console.log(contains('닣', 'ㄴ')); // true
console.log(contains('다', 'ㄴ')); // false
console.log(contains('가', '가')); // true
console.log(contains('가', '나')); // false
console.log(contains('가', 'a')); // false
console.log(contains('나', '나')); // true
```

이렇게 한 글자 검색의 토대는 만들어졌다.
이를 이용해서 문자열에 대해 초성이 포함된 문자열로 검색할 수 있게 만들어보자.

```javascript
const rangeSize = '깋'.charCodeAt(0) - '가'.charCodeAt(0);
const rangeStarts = { /* 생략 */ };
const contains = (char, query) => { /* 생략 */ };

const search = (str, searchQuery) => {
  // 문자열을 배열로 만든다.
  const strArray = [...str];
  
  // 검색 시작 위치를 저장 
  const startIndex = strArray.findIndex(char => contains(char, searchQuery[0]));
  
  // 검색 시작 위치가 없으면 검색 실패
  if (startIndex === -1) {
    return false;
  }
  
  // contains로 한 글자씩 검사 후, filter된 길이와 검색어의 길이가 일치하면 검색 성공
  return strArray.slice(startIndex, startIndex + size)
            .filter((char, index) => contains(char, searchQuery[index]))
            .length === searchQuery.length;
}


console.log(search('안녕하세요', 'ㅇㄴ')); // true
console.log(search('안녕하세요', 'ㄴㅎ')); // true
console.log(search('안녕하세요', 'ㅇㅎ')); // false
console.log(search('안녕하세요', '안녕')); // true
console.log(search('안녕하세요', 'ㅇ녕ㅎ')); // true
console.log(search('안녕하세요', 'ㅎㅅㅇ')); // true
console.log(search('안녕하세요', 'ㅎㅅ요')); // true
console.log(search('안녕하세요', 'ㅇㅇ')); // false
console.log(search('안녕하세요', 'ㄴ하ㅎ')); // true
```

생각보다 쉽지 않은가?


전체 코드는 다음과 같다.

```javascript
const rangeSize = '깋'.charCodeAt(0) - '가'.charCodeAt(0);
const rangeStarts = {
  "ㄱ": '가',
  "ㄲ": '까',
  "ㄴ": '나',
  "ㄷ": '다',
  "ㄸ": '따',
  "ㄹ": '라',
  "ㅁ": '마',
  "ㅂ": '바',
  "ㅃ": '빠',
  "ㅅ": '사',
  "ㅆ": '싸',
  "ㅇ": '아',
  "ㅈ": '자',
  "ㅉ": '짜',
  "ㅊ": '차',
  "ㅋ": '카',
  "ㅌ": '타',
  "ㅍ": '파',
  "ㅎ": '하',
}

const contains = (char, query) => {
  if (!rangeStarts[query]) {
    return char === query;
  }
  const start = rangeStarts[query].charCodeAt(0);
  const end = start + rangeSize;
  return start <= char.charCodeAt(0) && char.charCodeAt(0) <= end;
};

const search = (str, searchQuery) => {
  const strArray = [...str];
  const startIndex = strArray.findIndex(char => contains(char, searchQuery[0]));
  if (startIndex === -1) {
    return false;
  }
  return strArray.slice(startIndex, startIndex + size)
    .filter((char, index) => contains(char, searchQuery[index]))
    .length === searchQuery.length;
}
```
