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

***

#### (1) Facebook 클론 코딩

React로 Facebook의 뉴스피드와 로그인/회원가입 등을 만드는 과정이다.

![image 3](./3.png)

위와 같이 뉴스피드를 구성해야 하고,

![image 4](./4.png)

로그인과 회원가입 페이지도 만들어야 한다.

***

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

***

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

그런데 각각의 라우터가 독립된 레이아웃을 가지는 것이 아니라 분명히 **공통분모**가 존재할 것이다.

예를 들자면
- 로그인/회원가입 페이지의 경우 회원은 접근할 수 없어야 하고 **비슷한 레이아웃**을 가질 것이다.
- 헤더와 푸터를 가지고 있는 페이지가 있을 것이다. 반대로, 헤더와 푸터가 없는 페이지도 있을 수 있다.
- 이 외에도 **공통분모**를 가진 여러가지 페이지 레이아웃이 있을 수 있다.

이 때 다음과 같은 형태로 Router를 표현할 수 있다. 정확히는 재사용이랄까?

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
          <PublicLayout path="/login" component={Login} />
          <PublicLayout path="/join" component={Join} />
          <DefaultLayout path="/about" component={About} />
          <DefaultLayout path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
}
```

구현 방법은 [이 링크](https://simonsmith.io/reusing-layouts-in-react-router-4)를 참고하면 된다.
여기에서 다루기엔 양이 너무 많다.

***

#### (4) 원리 부터 깨우친다.

단순하게 React로 무언가를 만드는 과정이 아니라

- 어쩌다가 이러한 프레임워크가 등장했는지
- React의 철학은 무엇인지
- 타 프레임워크와 비교했을 때 React의 장점이 무엇인지
- 옳바르게 React를 사용하는 방법
- React를 공부하는데 필요한 기초 지식

등을 먼저 설명하고 그 다음에 구현에 필요한 API를 공부할 수 있도록 방향이 잡혀있다.

예를 들자면 다음과 같은 것들(도메인 지식이랄까?)에 대해 먼저 공부한다.

- `spread 연산자`와 `rest 연산자`의 차이점/공통점
- `Arrow Function`과 `this`
- `module loader` vs `module bundler`
- `ES Module`
- `Virtual DOM`
- `Element` vs `Component`
- `props`
- `propTypes`
- `state`
- `Component Life Cycle`
- `Controlled Component`
- `Uncontrolled Component`
- `Pure Component`
- `Memoization`
- `SPA(Single Page Application)`
- `Hook Motivation`
- `상태관리`
- Javascript의 `실행 컨텍스트`
  - Outer Environment
  - Lexical Environment
- 함수 생성과 호출규칙, 그리고 `클로저`
- `Currying`과 Middleware
- `StateLess` 아키텍쳐와 `JWT(Json Web Token)`
- `Iterator`, `Iterable`, `Generator`
- `promise` 그리고 `async/await`
- `Saga Pattern`

이러한 개념들 이외에도 무척 많은 것들을 배웠으나, 사실 기억 나는게 많지 않다.. 😂
어쨌든 중요한 점은 단순하게 React에 대해 공부하는 것이 아니라 어떤 과정을 통해서 React가 현재의 모습을 갖추게 되었고,
어떤 Motivatino을 통해서 디자인 되었는지 알 수 있었기 때문에 **스터디를 통해서 React에 대한 전반적인 이해도**가 좋아졌다.

***

#### (5) 스터디 리더가 작성한 코드 공유

미션이 종료된 후에 리더가 작성한 코드를 공유해주기 때문에 내가 작성한 코드와 비교하며 부족한 부분을 채울 수 있다는 점도 큰 매리트라고 생각한다.
코드에 정답은 없지만 그래도 내가 작성한 것 보단 정답에 가까운 코드를 보는 것 만으로도 굉장히 큰 도움이 된다.

그리고 내가 현업에서 접하지 못했던 유용한 라이브러리를 많이 볼 수 있었다.
무엇보다 Redux를 정말 제대로, 그리고 잘 사용할 수 있는 방법을 접할 수 있는 점도 좋았다.

***

#### (6) 유쾌한 운영진

스터디 리더와는 별개로, 스터디를 개설하고 관리하는 운영진 덕분에 매 스터디가 즐거웠다. 

크리시님 혹시 이 글을 읽고 계신가요? **당근 상모돌리기** 무척 인상 깊었습니다 😁

***

#### (7) 기술 외적 동기 부여

그리고 스터디 리더인 Harry의 경우 싱가포르 소재의 핀테크 회사에서 팀장급 Full-Stack 개발자로 근무 중이며, 
전 회사인 카카오 뱅크에서는 데이터 엔지니어로 근무했다.

여담으로, Harry는 프로그래머스에서 React Study 뿐만 아니라 다음과 같은 스터디 리더로 활동하고 있다.

- [단순 CRUD는 그만! 웹 백엔드 시스템 구현(Spring Boot)](https://programmers.co.kr/learn/courses/11186)
- [씹고 뜯고 맛보는 Node.js with REST&GraphQL](https://programmers.co.kr/learn/courses/10617)

굉장히 화려한 이력을 가지고 있지만 Harry는 비전공자이다.

이렇게 다방면의 기술을 깊게 공부하고 전파할 수 있었던 이유 중 하나가 바로 `영어`라고 했다.
`영어`는 **모든 지식의 도메인 지식**이라고 할 수 있다.
특히 **개발자의 경우 영어로된 문서를 항상 마주봐야 하기 때문에** 어찌보면 개발자가 제일 먼저 공부해야 하는 것이 영어라고 할 수 있다.

`Harry`가 특히 영어를 강조했고, 무척 설득력 있게 다가왔다.
그래서 내년에는 일일커밋 대신 `일일영어`를 하기로 다짐했다.

***

#### 정리

결국 내가 하고 싶은 이야기는 한 가지이다.
React를 학습 하고 싶다면 꼭 이 스터디에 참여해보길 권한다.

***

### 2. Blog Study

### 3. 인터넷 강의 영상 제작