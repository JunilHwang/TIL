---

title: 2020년 11월 회고
description: 개발자 황준일의 2020년 11월 회고입니다.
sidebarDepth: 2
date: 2020-12-29 23:00:00
feed:
  enable: false

---

# 2020년 11월 회고

이번 달은 어떻게 지나갔는지 잘 모르겠다. 그래도 한 번 정리해보자.

## 공적

11월에는 큼직한 프로젝트를 하나 마무리했고, 신규 서비스 런칭을 위한 프로젝트를 시작했다.

### 1. CMS 마무리

몇 개월 동안 작업하던 CMS Project를 마무리했다. 정말 우여곡절이 많았지만 덕분에 공부한게 많은 프로젝트였다고 생각한다.
아무래도 회사 프로젝트라서 구체적으로 어떤 것들을 했는지 이야기하기는 조금 어렵지만, 뜻 깊은 프로젝트였다.

그런데 한 컴포넌트에 무척 많은 기능을 구현해놨다.

정확히 말하면 Container의 역할을 하는 Component라서 하위 컴포넌트에 불필요한 로직을 전부 상위 컴포넌트에 구현해놨는데,
기능 자체가 많은 것도 있지만, 어려운 로직도 있고 여러모로 잠재적 위험을 가진 컴포넌트가 되어버렸다.

추후에 **Vue Composition API로 리팩토링** 할 예정이다.
그래서 Composition API를 개인적으로 학습했는데, 이건 [Composition API 학습 섹션](#_3-composition-api-학습)에서 상세히 다루도록 하겠다.

### 2. 신규 프로젝트

이것도 대외비라서 어떤 프로젝트인지 구체적으로 언급하긴 어렵지만,
핵심적인 내용은 **크롬 브라우저(혹은 최신 브라우저)를 전용으로 서비스하는 프로젝트**를 담당하여 진행중이다.

올 해의 마지막 프로젝트이며 입사 이후에 처음으로 신규 서비스를 처음부터 만드는 것이기 때문에 무척 재밌다.
이 프로젝트도 서비스가 런칭 되면 자세히 다뤄야겠다.

## 사적

회고 할게 있을까 싶었는데 제목을 나열하고 보니 뭘 이리 많이 했나 싶다.
~~하.. 11월 회고는 편하게 쓸 수 있을 것 같았는데!!~~

### 1. 넥스트 스텝 리뷰어

이번 달에는 [NextStep - TDD, Clean Code with Java 10기](https://edu.nextstep.camp/s/MNii0Puk) 리뷰어로 활동했다.
다음 달까지 활동할 예정이다.

***

#### (1) 미션당 7명

원래 리뷰어 한 명당 총 20명을 리뷰해야 하는데, 이번에는 굉장히 많은 사람들을 리뷰하게 생겼다.
> 포비(박재성님)의 DM을 캡쳐하려고 했는데.. 슬랙으로 주고받은거라 사라져버렸다.. ㅠㅠ

10기 리뷰어 신청 과정에서 미션당 원하는 리뷰이의 수를 적는 항목이 있었다.
이 때는 아무 생각 없이(?) 자신만만하게 "인원 무관"이라고 적었다.
그리고 포비가 미션당 7명을 배정할 예정이며 상관 없냐고 물었고 나는 괜찮다고 했다.
**미션이 시작되고 나서야 괜찮지 않은 것을 알게 되었다.**

![1](./1.jpg)

말 그대로 PR이 쏟아져나왔다 😂😂😂😂
NextStep과 관련된 PR 갯수만 60개인데 대체로 한 PR 당 2번 이상의 리뷰를 하기 때문에 대략 하루에 3~4번의 리뷰를 했다고 볼 수 있다.
알고보니 이번에 넥스트스텝과 카카오가 연계하여 카카오 리뷰어 양성 과정을 진행했는데, 이에 해당하는 사람들이 이번 기수에 참여했다.
그래서 **뭔가 코드에서 심상치 않은 기운이 느껴진다 싶으면 대체로 카카오 사람들**이었다.


![3](./3.jpg)

![2](./2.jpg)

리뷰는 대체로 위와 같이 남겼다.
각각의 코드에 대해 리뷰를 하고, 마지막으로 핵심적인 내용을 정리해서 중점적으로 개선해야 하는 부분들을 피드백했다.

***

#### (2) 나의 한계

내가 가진 현재 역량의 한계를 일깨워준 분이 있었다.

![4](./4.jpg)

내가 남기는 피드백의 반절 이상은 뚜렷한 근거를 기반으로 하기 보단 **경험적인 측면**을 토대로 남기는 것들이 대부분이었다.
그래서 이렇게 근거를 토대로 질문을 남기면 당황스러웠다.
현재의 나는 남들은 다 한 번씩 읽어 본다는 `Clean Code`나 `Effective Java`도 안 읽어본 상태였기 때문에 명확한 근거 같은게 생각날 수가 없었다. 

그래서 또 이것 저것 자료를 찾아보다가 결국 답이 나오질 않아서 _내가 어쩌다 이런 생각을 했는지 다시 경험적인 측면을 토대로 리뷰를 남기게 된다._

![5](./5.jpg)

덕분에 슬랙채널에서 여러가지 논쟁이 오고 갔으며,
**Stream은 어차피 사다리 미션에서 다루기 때문에 지금의 논쟁은 큰 의미가 없으며 자동차 미션 자체에 집중 하자**는 이야기로 마무리 되었다. 
무엇보다 제일 큰 문제는 리뷰이의 **신뢰를 잃어버렸다**고 해야할까?

![6](./6.jpg)

내가 정말 리뷰이가 말한 것 처럼 남겼나 확인해본 결과 **리뷰이가 피드백을 잘못 해석했고(혹은 내가 제대로 전달을 하지 못했거나 😂)** 다시 잘 설명드렸다.

이러한 과정을 통해서 스스로의 한계와 문제점을 발견했고, 이를 극복하기 위한 재정비 기간이 필요하다는 것을 깨달았다.
그래서 다음 리뷰어 활동은 접어두고 스스로의 역량 강화에 집중할 예정이다.

***

#### (3) 블랙커피 스터디의 연장

9월에 블랙커피 스터디에 참여했던 사람들에게 이 코스를 추천 했고, 세 분이 이번 기수에 신청했다.
세 분 모두 잘 완주하길 기대중이다.

다음엔 누굴 꼬드겨야하나 🤔

***

### 2. 단쿠키 리쿠르트 지원

나는 [에브리타임](https://everytime.kr/)이라는 대학교 커뮤니티를 자주 사용하는 편이다.
개발과 관련된 정보를 공유하기도 하고, 진로에 대해 고민하는 후배들과 이야기를 나누는 등의 소통 창구로 사용하고 있다.

그러던 중 눈에 띄는 글을 하나 발견했다.
> 글을 캡쳐해서 올릴라 했는데.. 지금 찾아보니 삭제됐다. 아쉬운대로 단쿠키에 올라온 글을 캡쳐해서 올려야겠다.

![7](./7.jpg)

보자마자 지원하고 싶다는 생각을 했다.
그런데 나는 졸업생이다보니 이걸 지원해야하나 말아야하나 고민하다가 졸업생도 지원 가능한지 물어보는 댓글을 남겼고, 가능하다는 답변을 받았다.

![8](./8.jpg)

그래서 고민 끝에 지원했다.

![9](./9.jpg)

이렇게 코딩 테스트 및 온라인 면접 일정을 잡고 진행했다.
코딩 테스트 문제 자체는 어렵지 않았으나, 내가 너무 어렵게 생각해서 조금 헤맸다.

이 외에도 다양한 면접 질문을 받았는데 내가 생각하지도 못했던 부분들이 있어서 조금 당황했다.
내가 당황했던건 대체로 보안과 관련된 질문이었고, 내가 보안과 관련된 도메인에 약하다는 것을 인지했다.
덕분에 공부할 것들이 늘었다 😅

여담으로, 학부시절에 같이 단쿠키측에서 함께 하고 싶은 의향 있으면 연락 달라고 했었는데 그 당시에는 정말 미친듯이 바빠서 아예 연락을 하지 않았다.
당시에 작은 에이전시 회사에서 원격근무도 하고 있었고, 학부 연구생도 하고 있었고, 같은 학부 연구생들과 정부 과제도 하고 있었고, 고등학교 강사도 하고 있었다.
거기에 수업에 시험에 과제에 이것 저것 다 포함하면.. 거기서 무언가를 더 할 엄두가 나질 않았다.

![10](./10.jpg)

어쨌든 12월에 대면 면접을 거치면 결과를 알 수 있겠지 싶다.
내년엔 또 얼마나 바쁘려나 🤣

***

### 3. Composition API 학습

회사 프로젝트에 [Composition API](https://composition-api.vuejs.org/)를 사용할 일이 생겼다.
아직 **Composition API**를 제대로 사용해본적이 없어서 어떤 방식으로 공부해야 고민하다가,
[Black Coffee Study](https://edu.nextstep.camp/c/L1Ma1gyX/) 할 때 만들었던 **TodoList를 Composition API로** 다시 만들어보자고 생각했다.

![11](./11.jpg)

Composition API를 사용하면서 느낀 것은 React Hook과 굉장히 유사하다는 점이다.
그래서 처음에는 Store 없이 오직 Composition API만 이용해서 구현했는데, 문제가 굉장히 많았다.

```js
import { reative, toRefs } from "vue";

const useTodo = () => {
  const state = reactive({
    todoItems: []
  });
  
  const addItem = (item) => {
    state.todoItems = [ ...state.todoItems, item ];
  }
  
  return {
    ...toRefs(state),
    addItem
  }
}

const { todoItems, addItem } = useTodo();
addItem("test");
console.log(todoItems); // ["test"];
```

위와 같이 useTodo를 `Composition API`의 `reative` `todRefs` 등을 이용하여 만들었다.
이 때 문제점은 `useTodo`는 `함수`라는 것이다.
즉, 여러번 실행할 수 있다.

```js
const todo1 = useTodo();
const todo2 = useTodo();

todo1.addItem("test1");
console.log(todo1.todoItems); // ["test1"];

todo2.addItem("test2");
console.log(todo2.todoItems); // ["test2"];
```

그래서 composition api만 이용하여 전역 상태를 관리하는 것은 무척 힘들다. 하고자 한다면 못할 건 없으나.. 추천하진 않는다.
무엇보다 store(vuex)를 쓰면 좋은 이유 중 하나가 VueDevtool을 이용하여 mutation이나 dispatch가 실행 한 시점의 데이터를 조회할 수 있다는 점이다.
뿐만아니라 현재 state도 바로바로 조회할 수 있으니 이를 포기하기란 쉽지 않은 선택이다.

다만 Composition API와 같이 사용할 때 힘든 점은 store에 대한 유틸성 라이브러리가 없다는 점이다.
기본적으로 Vuex로 구성한 것들은 `createNamespaceHelper` `mapState` `mapGetters` `mapMutations` `mapActions` 등을 통해 컴포넌트에 쉽게 매핑할 수 있다. 
그러나 Composition API에 Vuex를 매핑하는 라이브러리는 존재하지 않는다.

그래서 이를 직접 만들어 사용해야 했다.

```js
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";

export default function useStoreModuleMapper(namespace) {
  const store = useStore();

  const mapState = keys => keys.map(key => computed(() => store.state[namespace][key]));
  const mapMutations = keys => keys.map(key => (...payload) => store.commit(`${namespace}/${key}`, ...payload));
  const mapActions = keys => keys.map(key => (...payload) => store.dispatch(`${namespace}/${key}`, ...payload));
  const mapGetters = keys => keys.map(key => computed(() => store.getters[`${namespace}/${key}`]));

  return { mapState, mapMutations, mapActions, mapGetters };
}
```

짧게 구성했지만, 기존의 mapper와 유사하게 사용할 수 있게 만들었다.

```js
export default function useTodo() {
  const { mapState, mapGetters, mapActions, mapMutations } = useStoreModuleMapper("todo");
  const [listLoading, appendLoading] = mapState(["listLoading", "appendLoading"]);
  const [filteredTodoItems] = mapGetters(["filteredTodoItems"]);
  const [setTodoItems, setUser] = mapMutations([SET_TODO_ITEMS, SET_USER]);
  const [fetchItems, addItem, updateItem, toggleItem, removeItem, removeAllItem, updatePriority] = mapActions([
    FETCH_ITEMS,
    ADD_ITEM,
    UPDATE_ITEM,
    TOGGLE_ITEM,
    REMOVE_ITEM,
    REMOVE_ALL_ITEM,
    UPDATE_PRIORITY
  ]);
}
```

그러나 state나 method를 직접 문자열로 매칭해야 하기 때문에 **IDE에서 코드 추적이 쉽지 않기 때문에** 불편하긴 마찬가지이다.
제일 좋은 방법은 Vuex 측에서 만들어서 제공하는건데.. 과연 언제쯤 가능할까?

***

결과물은 코드는 [이 저장소](https://github.com/JunilHwang/vue-composition-todoapp)에서 확인해볼 수 있다.
데모는 아래의 링크에서 확인할 수 있다.

- [TodoList - Step1 : localStorage](https://junilhwang.github.io/vue-composition-todoapp/#/step1)
- [TodoList - Step2 : Rest API](https://junilhwang.github.io/vue-composition-todoapp/#/step2)
- [TodoList - Step3 : Team/Member](https://junilhwang.github.io/vue-composition-todoapp/#/step3)

그리고 다음과 같은 문서와 저장소를 참고했다.

- [Composition API RFC](https://composition-api.vuejs.org/)
- [Vue 3 공식문서 - Composition API](https://v3.vuejs.org/guide/composition-api-introduction.html#why-composition-api)
- [Composition API 경험 정리](https://chodragon9.github.io/blog/composition-api-rfc-migration/)
- [devjang/nuxt-realworld](https://github.com/devJang/nuxt-realworld)

***

### 4. 블랙커피 스터디 레벨 2

[블랙커피 스터디 레벨 1 3기](https://edu.nextstep.camp/s/tUzCRWul)를 9월에 들었고, 이번 달에 [레벨 2](https://edu.nextstep.camp/s/mnUCGXab)가 열렸다.
이번 과정은 Javascript로 Unit Test와 E2E Test를 작성하는 방법에 대해 다루고 있다.

![12](./12.jpg)

월말에 시작했기 때문에 **1주차 미션** 까지만 완료한 상태이다.
과연.. 이번 과정을 잘 마무리 할 수 있을지 걱정이다.
아무래도 리뷰어 활동과 겹치기 때문에 쉽지 않으리라 생각한다.

미션과 관련된 코드는 [이 저장소](https://github.com/JunilHwang/black-coffee-study-lv2)에 올려놨다.
레벨 1을 할 때 보다 의욕이 많이 사라진 느낌이다.

***

### 5. 블로그 스터디 2기

지난 달에 이어서 [블로그 스터디](https://edu.nextstep.camp/s/4dBdkika)를 참여했다.
이번에는 [넥스트 스텝](https://edu.nextstep.camp)에 정식으로 수강모집을 올려서 그런지 참여하는 사람이 훨씬 많았다.

원래 일정대로면 이번 달에 두 개의 글을 썼어야 했는데, 한 개의 글만 썼다.

- [유년시절 이야기 Part 03](https://junilhwang.github.io/TIL/Writing/01-%EC%9C%A0%EB%85%84%EC%8B%9C%EC%A0%88-%EC%9D%B4%EC%95%BC%EA%B8%B0-3/)

::: tip 유년 시절 이야기 모음
- [Part 01](https://junilhwang.github.io/TIL/Writing/01-%EC%9C%A0%EB%85%84%EC%8B%9C%EC%A0%88-%EC%9D%B4%EC%95%BC%EA%B8%B0-1/)
- [Part 02](https://junilhwang.github.io/TIL/Writing/01-%EC%9C%A0%EB%85%84%EC%8B%9C%EC%A0%88-%EC%9D%B4%EC%95%BC%EA%B8%B0-2/)
- [Part 03](https://junilhwang.github.io/TIL/Writing/01-%EC%9C%A0%EB%85%84%EC%8B%9C%EC%A0%88-%EC%9D%B4%EC%95%BC%EA%B8%B0-3/)
:::

해당 글을 작성하면서 2012년도에 공부했던 것들을 다시 들여다봤다. 그 때는 잘 만들었다 싶었는데 역시 과거의 코드는 보는 게 아니다. ~~나는 똥을 만들었다.~~
2012년도에 [전국대회](https://meister.hrdkorea.or.kr/sub/3/3/1/20160512111525375100_view.do)를 준비하면서 만든 [결과물 코드](https://github.com/JunilHwang/webskills-2012-national-furniture)이다.
자세한 내용은 앞서 소개한 링크를 타고 들어가면 볼 수 있다.

사실 아직 작성하지 않은 **Part 04**가 개발과 동떨어진 정말 진지한 나의 이야기일 것 같은데, 언제 쯤 작성할 수 있을지 모르겠다. ~~사실 쓰기 귀찮다.~~

이번에는 인상 깊었던 글들을 소개하기보단 그냥 [PR 링크](https://github.com/next-step/blog/pull/55)만 달아놓겠다.
사실 글을 읽을 여유도 거의 없었다..

### 6. 기능대회용 PHP Tutorial

기능대회 전용으로 [PHP Step By Step Tutorial](https://github.com/sdhs-webskills/php-architecture-step-by-step)을 만들었다.
데모는 [이 링크](https://stormy-coast-06452.herokuapp.com/)에서 확인할 수 있으며 따로 문서는 없고 코드만 작성해놓은 상태이다.

![13](./13.jpg)

요즘에 PHP를 하다 보면 내가 PHP라는 언어를 다뤄봤다는게 낯설다.
옛날에는 Server-side 언어로 할줄 아는거라곤 PHP 밖에 없었는데 언제 이렇게 낯설어진걸까?

이 튜토리얼을 작성하면서 [heroku](https://dashboard.heroku.com/)를 처음 사용해봤다.
그리고 [Getting Started on Heroku with PHP](https://devcenter.heroku.com/articles/getting-started-with-php)를 따라해보면서 [composer](https://getcomposer.org/doc/00-intro.md)를 처음 사용해봤다.

이제 [PHP 8.0](https://www.php.net/releases/8.0/en.php)이 나오면서 한 층 더 성숙해진 언어가 된 것 같다.
여유 있을 때(대체 언제?) [Laravel](https://laravel.com/)로 토이 프로젝트를 진행해봐도 괜찮을 것 같다.

***

이대로 마무리하기는 아쉬워서 마지막 스텝에서 작성한 `Router`에 대해 소개해본다.
[express.js](https://expressjs.com/ko/)의 [router](https://expressjs.com/ko/starter/basic-routing.html)를 따라해보려고 했는데 URI Pattern을 파싱하고 매칭시키는게 귀찮아서 그냥 정규식으로 처리했다.

```php

namespace src\core;

class Router {
    private array $routes = [];
    private String $requestUri;

    function __construct($baseUri) {
        $path = preg_replace("/\?.+/", "", $_SERVER['REQUEST_URI'] ?? "/");
        $this->requestUri = str_replace($baseUri, "", $path);
    }

    public function get($uri, $callback) { $this->routes[] = ["get", $uri, $callback]; }
    public function post($uri, $callback) { $this->routes[] = ["post", $uri, $callback]; }
    public function delete($uri, $callback) { $this->routes[] = ["delete", $uri, $callback]; }
    public function put($uri, $callback) { $this->routes[] = ["put", $uri, $callback]; }

    public function run() {
        $routes = array_reduce($this->routes, function ($routes, $route) {
            [$method, $uri, $callback] = $route;
            $uri = '/^'. str_replace("/", "\/", $uri) .'$/';

            if (
                $method !== strtolower($_SERVER['REQUEST_METHOD']) ||
                !preg_match($uri, $this->requestUri)
            ) return $routes;

            preg_match_all($uri, $this->requestUri, $params, 2, 0);
            $routes[] = [$callback, $params[0]];

            return $routes;
        }, []);

        if (count($routes) === 0) {
            echo 'Not Found ' . $this->requestUri;
            return;
        }
        [$callback, $params] = current($routes);
        $callback($params);
    }
}
```

위의 코드는 다음과 같이 사용할 수 있다.

```php
class UserController {
    private Router $router;
    function __construct(Router $router) {
        $router->get('/api/users', fn($params) => $this->getUsers($params));
        $router->get('/api/user/([0-9]+)', fn($params) => $this->getUser($params));
        $router->get('/api/user', fn($params) => $this->getUserByEmail($params));
        $router->post('/api/user', fn($params) => $this->setUser($params));
    }
    private function getUsers($params) {}
    private function getUser($params) {}
    private function getUserByEmail($params) {}
    private function setUser($params) {}
}

$router = new Router(BASE_URI);
$router->get('/', function ($param) {
    include_once(VIEW . '/main.php');
});

new UserController($router);
$router->run();
```

다만 `PUT`과 `DELETE` method의 경우 `$_GET`, `$_POST` 처럼 읽어올 수 없기 때문에 귀찮아서 생략했다. ~~이정도만 있어도 하드코딩 하는데 큰 문제는 없겠지?~~

***

국제대회 금메달을 받았고 지금은 카카오에서 근무중인 친구와 함께 위키를 조금씩 만들다가 현타가 와서 포기했었는데,
그 당시에 만들었던 자료도 같이 첨부한다.

- [기능경기대회 Wiki](https://github.com/ChoDragon9/skills/wiki)
- [MySQL 기본 CRUD 명령어](https://github.com/ChoDragon9/skills/wiki/MySQL-%EA%B8%B0%EB%B3%B8-CRUD-%EB%AA%85%EB%A0%B9%EC%96%B4)
- [PHP+MySQL CRUD Tutorial](https://github.com/ChoDragon9/skills/wiki/PHP-MySQL-CRUD-Tutorial)
- PHP MySQL로 게시판 만들기 without MVC
  - Part 01
    - [문서](https://github.com/ChoDragon9/skills/wiki/PHP-MySQL%EB%A1%9C-%EA%B2%8C%EC%8B%9C%ED%8C%90-%EB%A7%8C%EB%93%A4%EA%B8%B0-without-mvc-01)
    - [유튜브 영상](https://www.youtube.com/watch?v=lv5mxcGXnaU)
  - Part 02
    - [문서](https://github.com/ChoDragon9/skills/wiki/PHP-MySQL%EB%A1%9C-%EA%B2%8C%EC%8B%9C%ED%8C%90-%EB%A7%8C%EB%93%A4%EA%B8%B0-without-mvc-02)
    - [유튜브 영상](https://www.youtube.com/watch?v=t0Q9U2VS0gQ)

***

### 7. 모각코

어쩌다보니 10월에 참여했던 [프로그래머스 리액트 스터디](http://localhost:8080/TIL/Review/2020-year/10-October/#_1-%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%85%E1%85%A2%E1%84%86%E1%85%A5%E1%84%89%E1%85%B3-%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A2%E1%86%A8%E1%84%90%E1%85%B3-%E1%84%89%E1%85%B3%E1%84%90%E1%85%A5%E1%84%83%E1%85%B5)의 몇몇 스터디원과 `모각코(모여서 각자 코딩)`을 하기로 했다.

![14](./14.jpg)

이렇게 먼저 제안을 주셨고, 둘 다 성남에 살다보니 첫 주에는 우리 집 근처에서 보기로 했다.

![15](./15.jpg)

그 다음 모임에는 한 분이 더 껴서 만났다.

태의님과 태현님은 [부스트캠프](https://boostcamp.connect.or.kr/)를 통해서 이미 서로 알고 있던 사이라고 했다.
태의님의 경우 10월 말에 [부스트캠프 옥토버페스트](https://m.blog.naver.com/boostcamp_official/222140296542)에서 나와 똑같은 주제(나와 찰떡인 회사)로 발표했었다.

![16](./16.jpg)

이 때 언젠가 기회가 되면 뵈었으면 좋겠다고 말했었는데, 실제로 뵙게 되니까 반가웠다.
태의님과 태현님 두 분 모두 정말 좋은 분들이고, 열심히 공부하고 살아가는 분들이라서 유독 반가웠다.
이러한 인연을 맺게 해준 [프로그래머스 리액트 스터디](https://programmers.co.kr/learn/courses/10658)에 다시 한 번 감사를 전한다.

그러나 갑자기 코로나 확진자가 많아지면서 모각코는 3회만 진행되었다. 빨리 코로나가 잠잠해지길 바랄 뿐이다 😂

***

### 8. 네이버 면접

## Summary