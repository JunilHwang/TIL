---

title: 2020년 10월 회고
description: 개발자 황준일의 2020년 10월 회고입니다.
sidebarDepth: 2
date: 2020-12-28
feed:
  enable: false

---

# 2020년 10월 회고

10월에는 바쁜듯 한가하게 살았다.

## 공적

### 1. CMS 개발

9월과 마찬가지로 10월도 CMS를 만드는데 열중했다.
다만 9월에 배포하고 나서 지속적으로 수정사항이 생기고 있었고 **이 상태로 배포했다고?**
싶을 정도로 버그도 많고 QA를 하지 않고 넘어간 부분도 무척 많았다.

제일 최악은, 이미 배포가 되어 있고 서비스 데이터까지 삽입된 상태의 DB의 설계를 건드려야 하는 부분이었다.
외래키가 무척 복잡하게 만들어진 상태에서 스키마를 변경하는 것 보단 새로 만드는게 나아보였다.

그래서 `hotissue_v2_schedule` `hotissue_v2_template` 처럼 `v2`라는 `suffix`를 붙여서 테이블을 새로 만들었고,
테이블의 변경에 따라 서비스 로직도 대폭 수정했다.

이 과정에서 드러난 제일 큰 문제는 기획쪽과 개발쪽의 커뮤니케이션 문제도 있었고,
기획과 QA를 CMS를 사용하는 실무진이 했기 때문에(개발을 사용자에게 시킨 것과 비슷하달까?) 오히려 놓친 부분이 무척 많았던 것 같다.

그래서 배포하는 도중에 수정사항이 생기기도 하고.. QA를 아예 하지 않은 부분도 있었고.. 다사다난 했다.

결과적으로 트러블이 생긴 후에 많은 문제점이 겉으로 드러났기 때문에 문제를 잘 핸들링 할 수 있었다.
2차 배포 전까지 QA도 완벽하게 끝냈고, 끊임 없이 커뮤니케이션을 했었다.
일하는 시간 보다 커뮤니케이션 하는 시간이 많았다.

만들고 나서 보니까 복잡한 로직이 너무 많이 있어서 리팩토링이 무조건 필요한 상태였다.
그런데 11월부터 바로 다른 프로젝트를 들어가야해서, 리팩토링은 시간 있을 때 틈틈이 할 예정이다.

## 사적

### 1. 프로그래머스 React Study

나는 개인적으로 [프로그래머스](https://programmers.co.kr/)를 무척 애용하는 편이고, 주변에도 많이 추천하고 있다.
프로그래머스에는 [알고리즘](https://programmers.co.kr/learn/challenges)과 관련된 서비스 뿐만 아니라 프론트와 백엔드를 포함한 여러가지 [챌린지 서비스](https://programmers.co.kr/competitions)도 있고,
[온라인 강의](https://programmers.co.kr/learn)와 스터디 형태의 강의도 존재한다.

제일 중요한게 취업 준비를 할 때 프로그래머스에 이력서를 작성했고, **현재 재직 중인 회사가 프로그래머스를 통해 오퍼**를 줬고 자연스럽게 취업이 되었다.

각설하고, 주변 사람들이 프로그래머스에서 진행하고 있는 스터디에 참여했고 만족도가 높은 것 같아서 나도 한 번 참여해볼까 둘러보다가 [React Study]9https://programmers.co.kr/learn/courses/10658)를 신청했다.
결론부터 말하자면 무척 만족스러운 스터디였다.

![스터디 후기](./2.jpg)\
~~다시 쓰기 귀찮아서~~ 프로그래머스에 올라온 후기를 첨부한다.

어쨌든 이 스터디가 더 많이 알려졌으면 하는 바람으로 상세하게 소개해 보도록 하겠다.

#### (1) Facebook 클론 코딩

React로 Facebook의 뉴스피드와 로그인/회원가입 등을 만드는 과정이다.

![image 3](./3.png)

위와 같이 뉴스피드를 구성해야 하고,

![image 4](./4.png)

로그인과 회원가입 페이지도 만들어야 한다.

#### (2) CRA(Create React App)을 사용하지 않고 개발환경 구성하기

여태까지 번들러는 [webpack](https://webpack.js.org/)만 사용해봤는데, 이 스터디를 통해서 처음으로 [parcel](https://ko.parceljs.org/)을 사용해봤다.
생각보다 훨씬 더 편했고, 환경 구성 또한 어렵지 않았다.

- 설치하기
```sh
# yarn
yarn add -D parcel-bundler

# npm
npm install -D parcel-bundler
```

- index.html 작성
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>페이스북 클론 코딩</title>
</head>
<body>
<div id="root"></div>
<script src="./src/index.js"></script>
</body>
</html>
```

- index.js 작성
```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

- npm script 작성
```js
// package.json
{
  /* 앞 내용 생략 */
  "scripts": {
    "dev": "parcel index.html"
  },
  /* 뒷 내용 생략 */
}
```

- 실행
```sh
# npm
> npm run dev

# yarn
> yarn dev
```

- 빌드
```sh
# build script
> parcel build ./src/entry.js

# build path 지정
> parcel build ./src/entry.js --out-dir ./dist
> parcel build ./src/entry.js -d ./dist
```

webpack보다 훨씬 단순하고 이해하기도 쉽다. 

![5](./5.jpg)

공식문서에 따르면, `4개의 물리 CPU가 있는 2016형 MacBook Pro에서 1726개의 module을 포함한 미 압축 6.5M의 app 기준으로 빌드`를 기준으로 위와 같은 성능을 보인다고 한다.
위의 내용을 완전히 신뢰할 순 없지만 직접 사용해본 입장에서 확실히 빠른 속도가 체감된다.

어쨌든, 스터디를 통해서 CRA를 사용하지 않고 parcel을 이용하여 직접 React를 개발하는데 필요한 각종 패키지를 설치했다.
사실 `react` `react-dom`만 설치해도 무방하다.

그래도 다양한 실습을 위해 `redux` `react-redux` `redux-thunk` `redux-saga` `react-router-dom` `connected-react-router` `styled-jsx` 등을 설치했고,
각종 `babel plugin`과  `eslint` `prettier` 등을 설치했다.

#### (3) React Router

react-router-dom에 나와있는 내용와 보편적으로 사용하는 Router의 경우 다음과 같은 형태이다.
```jsx
export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">about</Link></li>
            <li><Link to="/login">login</Link></li>
            <li><Link to="/join">join</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about"><About /></Route>
          <Route path="/login"><Login /></Route>
          <Route path="/join"><Join /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </div>
    </Router>
  );
}
```

그런데 특정 라우터마다 공통적으로 표현하는 레이아웃이 존재할 수 있다.
예를 들자면
- 로그인/회원가입 페이지의 경우 회원은 접근할 수 없어야 하고 비슷한 레이아웃을 가질 것이다.
- 헤더와 푸터를 가지고 있는 페이지가 있을 것이다. 반대로, 헤더와 푸터가 없는 페이지도 있을 수 있다.
- 이 외에도 공통분모를 가진 여러가지 페이지 레이아웃이 있을 수 있다.

이 때 다음과 같은 형태로 Router Component를 표현할 수 있다.

```jsx
export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">about</Link></li>
            <li><Link to="/login">login</Link></li>
            <li><Link to="/join">join</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about"><About /></Route>
          <Route path="/login"><Login /></Route>
          <Route path="/join"><Join /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </div>
    </Router>
  );
}
```

### 2. Blog Study

### 3. 인터넷 강의 영상 제작