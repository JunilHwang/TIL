---

title: 2020년 4월 회고
description: 2020년 4월 회고 입니다.
date: 2020-05-01
sidebarDepth: 2
feed:
  enable: true

---

# 2020년 4월 회고

이번 달은 꽤 열심히 보낸 것 같다.

## 공적

### 1. Vue Composition API

곧 Vue 3.0이 출시될 예정이며 Composition API는 Vue 3.0의 내장 API이다.
회사에서 Vue를 사용하고 있기 때문에 Composition API에 대한 사전 조사가 필요했다.

Composition API를 사용하면 코드를 유지보수 하기 좋게 관리할 수 있으며, 재사용성 또한 증가하게 된다.
다만 아직 VueRouter나 Vuex 같은 서드파티와 연동하는 것에 대한 방법이 없는 상태다.

나는 Vuex의 Namespace 기능을 적극적으로 이용하고 있는데, Namespace 또한 지원하지 않는다.

::: Composition API와 this

Composition API에서는 this를 사용할 수 없도록 설계되어 있다.
그런데 Vuex의 경우 Namespace를 정의할 때 this를 사용한다.
그래서 Composition과 Vuex의 Namespace를 같이 사용할 경우 에러가 발생한다.

:::

어쨌든 Composition API에 대한 글 중 제일 도움이 많이 되었던 것은 카카오에 다니는 친구가 작성한 [이 글](https://chodragon9.github.io/blog/composition-api-rfc-migration/)이다.

그리고 이 글을 읽으면서 친구의 포스트이므로 그냥 읽으면서 내 생각을 첨가한(?) [PR](https://github.com/ChoDragon9/ChoDragon9.github.io/pull/7)을 날려도 되는지 물어봤다.
어찌보면 굉장히 무례한 부탁일 수 있었는데, 흔쾌하게 수락해진 친구에게 감사하고 미안했다.
결과적으로 친구도, 나도 만족할 수 있는 경험이 되었으리라 생각한다.

![Composition API 정리](https://user-images.githubusercontent.com/18749057/80866090-dea5a680-8cc7-11ea-88c2-a3bca2e2dd35.png)

이게 바로 개발의 매력이고, 코드리뷰의 매력임을 느꼈다.

약간 삼천포로 빠졌는데, 어쨌든 중요한 점은 이러한 경험을 통해서 Composition API에 대해 이해할 수 있었다는 것이다.
그런데 우리 팀은 포털서비스를 만들어야 하기 때문에.. IE 호환성을 아예 놓을 수 있는 상황이 아니었다.
그래서 아직은 도입할 시기가 아니라고 결론을 내렸다. ~~젠장~~

아쉽지만 사이드 프로젝트에 적용해볼 생각이다.