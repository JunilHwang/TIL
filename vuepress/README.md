# Vuepress

vuepress로 TIL 문서를 만들면서 알게된 내용들을 정리한 것이다.

vuepress를 시작하기 전에, vuepress가 무엇이고 어디다 사용하는지 알아야 한다.

먼저 vuepress 이전에 `SSG(Static Site Generator)` 에 대한 이해가 필요하다. SSG는 한국말로 `정적 사이트 생성기` 이며, 말 그대로 html, js, css 로만 만들어진 사이트를 의미한다. 감이 잘 안잡힌다면 `동적 사이트` 라는 개념을 생각해보자.

아마 다음과 같은 기술(혹은 프로그래밍 언어, 프레임워크)은 익숙할 것이다.

- `java` Spring framework, jsp
- `php` Laravel, Codeigniter framework, Wordpress
- `python` Django, Flask framework
- `node.js` Express.js, Coa.js, Nest.js
- `C#` .NET framework

위와 같은 기술스택으로 만들어진 사이트를 '동적 사이트' 라고 생각하면 된다. 예를 들어 `게시판`이 그렇다. `게시판` 이라는 시스템은 글작성, 글수정, 글삭제, 글조회 등이 존재한다.

 필자도 그렇고 대부분의 개발자는 java spring, python django, node.js의 express.js, php 혹은 php laravel, ruby의 rails ... 같은 프로그래밍 언어나 프레임워크로 프레임워크로 `동적 사이트`를 만듭니다. 예를들어 게시판 같은 것을 동적 사이트라고 할 수 있습니다.

::: tip Vuepress
vuepress는 vue.js를 기반으로한 정적 사이트 생성기(SSG: Static Site Generator) 입니다.
:::
