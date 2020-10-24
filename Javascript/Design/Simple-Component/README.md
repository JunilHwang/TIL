# 간단한 컴포넌트 설계하기

9월에 [넥스트 스텝](https://edu.nextstep.camp/)에서 진행하는 [블랙커피 스터디](https://edu.nextstep.camp/s/tUzCRWul)에 참여했다.
이 포스트는 스터디 기간동안 계속 고민하며 만들었던 컴포넌트를 차근 차근 구현해보는 내용이다.

## 필요한 도메인 지식

이 포스트를 이해하기 위해선 다음과 같은 것들에 대해 미리 숙지해야 한다.

- `DOM(Document Object Model)`
  - [MDN 문서](https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/%EC%86%8C%EA%B0%9C)
  - [관련 영상](https://www.youtube.com/watch?v=1yADBI27NCg&t=13s)
- [TECH CONCERT: FRONT END 2019 - 데이터 상태 관리. 그것을 알려주마](https://www.youtube.com/watch?v=o4meZ7MRd5o)

## jQuery와 DOM

필자가 웹 개발을 시작한지 얼마 되지 않았을 때(2012년도)에는 javascript를 공부할 때 제일 중요한게 [jQuery](https://jquery.com/) 였다.

``` tip jQuery
- jQuery는 빠르고 작고 기능이 풍부한 JavaScript 라이브러리입니다.
- jQuery API는 크로스 브라우징을 지원합니다.
- HTML 문서 탐색 및 조작, 이벤트 처리, 애니메이션 및 Ajax와 같은 작업을 훨씬 간단하게 만듭니다.
- 다용 성과 확장 성이 결합 된 jQuery는 수백만 명의 사람들이 JavaScript를 작성하는 방식을 변화 시켰습니다.
```

뭔가 구구절절 설명되어있긴 하지만, 내가 jQuery를 사용하면서 느낀 제일 큰 장점은 `DOM`을 쉽게 다룰 수 있도록 제공하는 `API`라고 생각한다.
그런데 점점 브라우저가 발전하고, javascript가 발전하고, 아예 렌더링을 javascript로 하는 과정에서 `상태를 관리하는 것`이 매우 중요해졌다.

::: tip SSR과 CSR
- 보통 약 5년전 까지만 해도 `JSP` `PHP` `ASP` 등을 웹 개발 3대장이라고 불렸다.
- 이러한 것들이 하는 역할이 바로 서버에서 HTML을 만들어서 클라이언트에 넘겨주는 것, 즉 `Server Side Rendering` 이다.
- 따라서 클라이언트단(브라우저)에서는 굳이 데이터를 깊은 단계까지, 정교하게 관리할 필요가 없었다.  
:::  
