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

::: tip Composition API와 this

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

### 2. 순정 API 개발

새로운 프로젝트 시작하게 맡게 되면서 처음부터 API를 만들어야 했다.
여태 만들어진 API를 유지보수만 하다가 처음부터 순정 API를 만드는 것이다.

회사에서 관리하고 있는 프로젝트는 대충 다음과 같은 Component를 사용한다.

- Adapter: 다른 API의 데이터를 가져옴
- Repository: DB 연동
- Service: Adapter나 Repository에서 필요한 데이터를 가져옴
- Facade: 각종 Service를 조합하여 필요한 데이터를 정제한다.
- Module: Facade에서 필요한 데이터를 가져온 다음 캐싱처리하여 모듈에 맞는 데이터로 반환
- TemplateFacade: Module을 조합하여 최종 데이터를 생성
- Caching: Service/Module 데이터를 캐싱
- Scheduler: Caching을 주기적으로 실행

이미 설계 가이드가 있기 때문에 잘 구성된 가이드라인대로만 만들면 큰 문제 없이 작동한다.
어쨌든 복습도 되고, 처음부터 만들기고 있기 때문에 즐겁게 임하는 중이다.

### 3. DynamoDB

앞으로 만들게 될 서비스는 [DynamoDB](https://aws.amazon.com/ko/dynamodb/)를 사용할 예정이다.
물론 사용해도 큰 무리가 없는 서비스에만!

DynamoDB는 AWS에서 만든 NoSQL인데 앞으로의 서비스는 Node.js를 적극적으로 사용할 예정이기도 하고,
NoSQL이 Node.js 같은 Non-blocking 방식과 궁합이 맞다.

DynamoDB의 경우 indexing이 굉장히 빠른데, Index를 생성할 때 하드카피를 하기 때문이다.
다만, 모든 질의가 전부 비용이기 때문에 설계를 처음부터 정교하게 해야한다.
RDB의 경우 Entity와 Relation이 중요하지만(당연하게도...) DynamoDB의 경우 Query가 중요하다.
그래서 일단 RDB로 Entity를 설계하고, Relation을 설계한 다음, 이에 따른 Query를 만들어야한다.
그 후에 Query를 보고 필요한 Index를 설계한 다음에 DynamoDB의 Table을 설계한다.

어찌보면 당여한 과정이지만, 설계가 조금이라도 빗나가면 그 여파가 꽤 큰편이다..
아직은 공부중이기 때문에 조금 더 정리가 되면 TIL에 올릴 생각이다.

### 4. 재택근무 종료

사회적 거리두기가 해제됨에 따라 재택근무도 종료되었다. 다만 출근 하자마자 다시 사회적거리두기 연장이 되었다는점 (~~이런 그랜드캐니언 같은 경우가!~~)
어쨌든 팀원들을 오랜만에 만나니 반갑기도 하고, 일하는 맛이 났다.

그런데 업무에 대한 질은 회사나 집이나 똑같은 것 같다. 주말 출근할 일이 있으면 그냥 집에서 했으면.. 하는 바람이 있다.

### 5. 총선

이번 달에는 총선이 있었다. 우리 회사는 포털서비스를 제공하기 때문에 이러한 국가적인 이벤트에 민감하다.
내가 담당하는 서비스 또한 그랬기 때문에 여러모로 신경을 많이 써야 했다.
결과적으론 아무일도 일어나지 않았다. ~~무슨 일이 터져 봐야 경험이 되긴 할텐데..~~

어쨌든 다행이다!