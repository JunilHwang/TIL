---

title: 2020년 9월 회고
description: 2020년 9월 회고 입니다.
date: 2020-10-15 23:27:00
sidebarDepth: 2
feed:
  enable: true

---


# 2020년 9월 회고

9월은 한 달 내내 재택근무를 했다. 회사에 대한 약간의 그리움(?)을 느꼈다.

## 공적

### 1. 크롬 확장프로그램

![크롬 확장프로그램](https://user-images.githubusercontent.com/18749057/95010212-7128e800-0662-11eb-918d-da7a31d64d7f.png)

확장프로그램의 8월에는 확장프로그램 베타 버전 배포를 했고, 9월에는 회사 기술블로그에 [확장프로그램에 대한 포스팅](https://zuminternet.github.io/Zum-Chrome-Extension/)을 완료했다.
 
확실히 확장프로그램을 만들면서 기술적으로 많은 생각을 하는 계기가 되었다.
일반적인 웹 서비스가 아니기 때문에 고려해야할 것도 많았고, 완성도에 대한 중요성 또한 다시 한 번 깨우칠 수 있었다.

~~그런데 또 하고 싶다는 생각이 들진 않는다.~~

언젠간 ~~죽기 전에~~ 확장프로그램으로 재미난 일들을 해보고 싶다.

### 2. CMS QA

8월에 진행 하던 CMS 개발을 완료했고, 9월에는 QA를 진행하면서 각종 이슈 및 버그를 해결했다.
이번에 작업한 CMS는 약 5개 정도의 서비스와 맞물려 있기 때문에 어떤 부분을 작업했다고 하기가 조심스럽다.

그래도 그중에 꽤 인상 깊었던 작업만 적어보자면, 서비스에 노출중인 아이템의 순서를 `Sortable.js`로 변경하는 것이었다.
기존에도 `Sortable.js`를 이용하여 아이템의 순서를 변경하긴 했다. 그런데 `Sortable.js`는 `DOM`을 직접적으로 조작하는 라이브러리다.
그래서 `Vue`와 깊게 연관되면 오작동 하는 경우가 꽤 많았다.
`Vue`의 경우 데이터를 기반으로 `DOM`을 그린다. 즉, `DOM`이 변경되어도 데이터는 변경되지 않는 것이다.

- sortable.js로 DOM의 순서를 변경했다.
- 그러나 Vue에서 관리중인 data의 순서는 변경되지 않는다.
- 따라서 DOM을 보고 data를 업데이트 해야한다.
- 그런데 data를 업데이트하면 DOM이 꼬여버린다. 왜냐하면 현재 데이터에 바인딩 되어 있는 DOM은 변경되지 않기 때문이다.

글로 읽는 것 보단 눈으로 보고 직접 체험해 보는게 제일 빠르다.

일단 다음과 같이 간단하게 Vue에 Sortablejs를 적용할 수 있다.

<script>
  ['https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js',
   'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js'].forEach(src => {
      const script = document.createElement('script');
      script.setAttribute('src', src);
      document.head.appendChild(script);
  });
</script>

::: demo [vanilla]
```html
<html>
  <div id="sortable-app1">
    <p>아이템을 드래그앤 드롭으로 섞어주세요</p>
    <ul ref="$sortedList">
      <li v-for="(item, k) in items" :key="k" v-html="item" />
    </ul>
    <p>실제 Vue Data상의 아이템 순서: {{ JSON.stringify(items) }}</p>
  </div>
</html>
<script>
new Vue({
  el: '#sortable-app1',
  data: {
    items: ['item01', 'item02', 'item03', 'item04'],
  },
  mounted () {
    new Sortable(this.$refs.$sortedList);
  }
})
</script>
```
:::

문제는 Sort를 하여도 데이터의 변화는 없다는 점이다. 그래서 데이터를 직접 조작해야한다.

::: demo [vanilla]
```html
<html>
  <div id="sortable-app2">
    <p>아이템을 드래그앤 드롭으로 섞어주세요</p>
    <ul ref="$sortedList">
      <li v-for="(item, k) in items" :key="k" :data-key="k" v-html="item" />
    </ul>
    <p>실제 Vue Data상의 아이템 순서: {{ JSON.stringify(items) }}</p>
  </div>
</html>
<script>
new Vue({
  el: '#sortable-app2',
  data: {
    items: ['item01', 'item02', 'item03', 'item04'],
  },
  mounted () {
    new Sortable(this.$refs.$sortedList, {
      onEnd: () => {
        this.items = [ ...this.$refs.$sortedList.querySelectorAll('li') ].map(el => this.items[el.dataset.key]);
      }
    });
  }
})
</script>
```
:::

위의 코드는 다음과 같은 로직을 수행한다.
- DOM을 섞는다.
- DOM을 기준으로 items를 다시 만든다.
- **items를 기준으로 이미 섞인 DOM을 다시 렌더링한다.** (이 부분이 핵심이다.)

따라서 DOM을 기준으로 items를 섞은 다음에, **다시 DOM을 원상복구 해야한다.**


::: demo [vanilla]
```html
<html>
  <div id="sortable-app3">
    <p>아이템을 드래그앤 드롭으로 섞어주세요</p>
    <ul ref="$sortedList">
      <li v-for="(item, k) in items" :key="k" :data-key="k" v-html="item" />
    </ul>
    <p>실제 Vue Data상의 아이템 순서: {{ JSON.stringify(items) }}</p>
  </div>
</html>
<script>
new Vue({
  el: '#sortable-app3',
  data: {
    items: ['item01', 'item02', 'item03', 'item04'],
  },
  mounted () {
    const { $sortedList } = this.$refs;
    new Sortable($sortedList, {
      onEnd: ({ oldIndex, newIndex }) => {
        const newItems = [ ...this.$refs.$sortedList.querySelectorAll('li') ].map(el => this.items[el.dataset.key]);

        /* 섞인 DOM을 원상복구 하는 코드 */
        const isAfter = newIndex < oldIndex;
        $sortedList.insertBefore(
          $sortedList.querySelector(`li:nth-child(${newIndex + 1})`),
          $sortedList.querySelector(`li:nth-child(${oldIndex + 1 + (isAfter)})`)
        );

        this.items = newItems;
      }
    });
  }
})
</script>
```
:::

사실 `vue-sortable` 컴포넌트를 사용해도 되지만 생각보다 커스텀 하기가 쉽지 않았다. 그래서 `Sortable`을 그대로 사용해야 했고, 위와 같은 문제들과 맞닥뜨린 것이다.
굉장한 삽질 끝에 `DOM`을 원상복구 하는 해결 방안을 찾을 수 있었다.

~~그런데 지금 Vuepress에서 예제를 만든다고 더 삽질한 것 같다.~~

이외에도 `Sortable`을 그대로 사용하는게 아니라 `Swap`을 연동하여 사용하는 등의 과정이 있으나 글이 너무 길어질 것 같아서 이만 다음 주제로 넘어가야겠다.

### 3. API 관련 이슈 해결

8월에 `Mobile API`를 `Internal API`에서 분리시키는 작업을 했다.그리고 운영하는 과정에서 몇 가지 이슈가 있었다.

분리 작업 중 리팩토링을 진행하면서 캐싱 관련 코드를 전체적으로 수정했다.
그런데 정말 약 100개 가까이 되는 서비스 코드 중 정말 딱 한 개의 서비스 코드만 리팩토링을 진행하지 않았고 그 부분에서 에러가 터졌다.. 😢

어쨌든 전체적인 코드를 훑어볼 수 있는 기회가 되기도 했고, 한 번 더 불필요한 코드를 제거하는 등의 리팩토링을 진행했다.

그리고 `Internal API`에서 `Mobile API` 관련 코드를 모두 제거했고, `Sentry`도 연결했다.
입사 후에 계속 관리해오던 것들이라서 마음이 많이 홀가분해졌다.

## 사적

9월은 정신 없이 시간이 흘러갔다. 사실 왜 벌써 10월인지, **왜 벌써 여름이 저물었고 가을이 왔는지 혼란스럽다.**
9월 말에 리액트 스터디 세션을 하면서 **이제 2020년이 100일도 남지 않았다는 것**을 알았다.
기똥찬 한 해를 보내자고 다짐했던게 엊그제 같은데.. 언제 이렇게 시간이 흘렀는지..

어쨌든, 회고 시작!

### 1. Black Coffee Study

매달 `NextStep`에서 메일로 뉴스레터를 보내주고 있다. 그런데 눈에 띄는 항목이 보였다.

![image01](https://user-images.githubusercontent.com/18749057/96161643-80594100-0f52-11eb-8254-76e542afff4c.png)

처음으로 Javascript Study가 진행되고 있다는 내용이다. 무료로 참석할 수 있었고, 바로 신청했다.

#### (1) 스터디 미션소개

![image02](https://user-images.githubusercontent.com/18749057/96161916-d928d980-0f52-11eb-9138-b75d03d0f442.png)

스터디의 미션은 생각보다 간단했다.

- `1주차` Todo App 만들기
  - [Document Object Model](https://www.youtube.com/watch?v=1yADBI27NCg)
  - [Browser Object Model](https://www.youtube.com/watch?v=BYRTKmPAr8c)
  - [Event](https://www.youtube.com/watch?v=u49E4_4hyeI)
- `2주차` API 연동
- `3주차` SPA 만들기 (Router 사용하기)

사실 **수준 높은 코드를 만들기 위한 적합한 미션**이라고 생각한다.
현재 보다 더 어려웠어도 혹은 더 쉬웠어도 **설계에 집중**하기가 힘들었을 것 같다.

일단 1주차 때 3주차 미션까지 모두 구현했다. 그리고 한 달 동안 계속 리팩토링만 했다.



#### (2) 스터디 진행 방식

스터디는 다음과 같이 진행되었다.

![image03](https://user-images.githubusercontent.com/18749057/96162462-8996dd80-0f53-11eb-84bc-7bb3db19ed17.png) 

요약하자면 아래와 같다.

- `주 1회 온라인 세션`을 통한 미션 소개 및 회고
- `주 2회 페어프로그래밍`
- `코드리뷰` : PR 순서대로 3명씩 묶어서 코드리뷰를 진행한다. 혹은 자유롭게 리뷰를 남겨도 상관없다.

~~온라인 세션이 무척 길었지만~~ 모든 과정이 마음에 들었다.
온라인 세션에서 한 주에 대한 회고를 진행하는데, 이 때 회고의 주제가 항상 달라져서 여러가지 면에서 생각할 수 있는 기회가 되어서 좋았고, 다른 사람들의 이야기를 많이 들을 수 있어서 좋았다.

- `1주차`에는 미션과 스터디에 대한 내용 위주로 세션이 진행되었다.
- `2주차`에는 1주차에 대한 회고와 좋은 개발자에 대한 덕목에 대해서 토의 하는 과정이 좋았다.
- `3주차`에는 회고 주제가 기억나지 않았다. 기억나는건 공개 코드리뷰를 하면서 Typescript에 대해 설명하고 덤으로 intellij로 git을 운영하는 방법과 코드리뷰를 하는 방법 등을 설명했다.
- `4주차`에는 스터디 자체에 대한 회고와 앞으로의 계획, 그리고 그냥 각자에 대한 이야기를 했던걸로 기억한다.

#### (3) 페어프로그래밍

[페어프로그래밍](https://www.youtube.com/watch?v=ts-ErQNUGNo)은 들어보기만 했고 실제로 해본 경험은 없었기 때문에 많이 생소했다.
결과적으로 **총 3회**를 참여했, 충분히 좋은 경험이 되었다고 생각한다.

페어프로그래밍은 요약하자면 정해진 시간동안 `드라이버` 코드를 작성하고, `네비게이터`는 **드라이버가 작성하는 코드를 실시간으로 리뷰**를 하면서 진행하는 것이다.
그리고 시간이 다 되거나 혹은 드라이버가 목표로하는 기능을 구현했을 때 서로 역할을 바꾸는 것이다.
페어프로그래밍이 끝나면 각자 짧게 회고 및 서로에 대한 피드백을 한다.

코로나 때문에 `행아웃`과 `줌`의 화면공유 기능을 이용하여 온라인으로 진행했다.    

- `1주차`
  - 스터디를 지인과 같이 신청했다. 설마설마 했는데 첫 번째 페어 프로그래밍 부터 지인과 매칭이 되었다.
  - 15분 간격으로 역할을 바꿨고, 총 3시간 정도 진행했다.
  - 페어가 친한 지인이었기 때문에 매우 편하게(?) 진행할 수 있었다.
  - 페어프로그래밍을 할 때 작성한 코드를 기준으로 다시 내 코드를 리팩토링 했다.
- `2주차`
  - JS를 시작한지 얼마 되지 않은 분과 매칭이 되었다.
  - 그래서 주로 네비게이터의 역할을 맡아서 했다. 
  - 피드백 시간에 스터디장님과 같이 어떤식으로 개발 공부를 하면 되고, 피드백과 코드리뷰의 중요성에 대해서 열변을 토한걸로 기억한다.
  - 확실히 같이 공부하는 사람이 많을 수록, 주변에 피드백을 해주는 사람이 많을 수록 빠르게 성정할 수 있는 것 같다.
- `3주차`
  - 또 다시 지인과 매칭이 되었다.
  - 이번에는 전체적인 기능 구현이 아닌 **옵저버를 구현하기로 합의**하고 진행했다. ~~내가 제안했는데, 내가 많이 헤맸다.~~
  - 단순한 옵저버 패턴 구현이 아니라 만드는게 아니라 `Object.defineProperty`를 이용하여 **자동으로 옵저빙** 하는 코드를 만들었다.
  - 이 때 코드가 잘 만들어졌고 이를 2주차 / 3주차 미션에 적용했다. 다만 리팩토링할 부분이 너무 많아서 거의 처음부터 다시 만들었다. ~~리팩토링의 연속~~

결과적으로 **페어프로그래밍을 하면서 고민했던 것들을 내 코드에 전부 녹였다.**
확실히 다른 사람과 같이 무언가를 만들면 더 고민을 많이 하게 된다.
**당장 서로가 알아볼 수 있게 코드를 만들어야 한다는 점**이 매리트라고 생각한다.
그리고 **즉각적인 피드백**을 주고 받기 때문에 잘못된 점을 빠르게 고칠 수 있다.

다만 한 번 하면 3시간 정도 소요되기 때문에 굉장히 피곤했다. ~~그냥 하는 일이 많아서 피곤했다.~~

#### (4) 코드리뷰

블랙 커피 스터디를 진행하는 동안 ~~정말 미친놈처럼~~ 코드리뷰를 굉장히 많이 했다.

<img src="https://user-images.githubusercontent.com/18749057/96168601-f1512680-0f5b-11eb-8118-15e2a1a1b680.png" alt="image05" width="500" />

`1주차`에는 마지막에 올라온 5개의 PR을 제외한 모든 PR에 리뷰를 남겼다. 갯수를 세어보니 총 11개의 PR이었다.

![image04](https://user-images.githubusercontent.com/18749057/96168541-dbdbfc80-0f5b-11eb-982a-1cc4737f53dc.png)

하루 날잡고 종일 리뷰만 했는데, JS 코드를 마음껏 볼 수 있어서 좋았다.

![image07](https://user-images.githubusercontent.com/18749057/96169597-56f1e280-0f5d-11eb-92e6-cc2553ea10ed.png)

1주차에 올라온 코드는 대부분 비슷한 스타일로 작성되어 있어서 설계적인 측면보단 문법적인 측면의 리뷰를 많이 했던 것 같다.

- 리뷰 모음
  - [next-step/js-todo-list-step1#30](https://github.com/next-step/js-todo-list-step1/pull/30)
  - [next-step/js-todo-list-step1#31](https://github.com/next-step/js-todo-list-step1/pull/31)
  - [next-step/js-todo-list-step1#33](https://github.com/next-step/js-todo-list-step1/pull/33)
  - [next-step/js-todo-list-step1#34](https://github.com/next-step/js-todo-list-step1/pull/34)
  - [next-step/js-todo-list-step1#35](https://github.com/next-step/js-todo-list-step1/pull/35)
  - [next-step/js-todo-list-step1#36](https://github.com/next-step/js-todo-list-step1/pull/36)
  - [next-step/js-todo-list-step1#37](https://github.com/next-step/js-todo-list-step1/pull/37)
  - [next-step/js-todo-list-step1#38](https://github.com/next-step/js-todo-list-step1/pull/38)
  - [next-step/js-todo-list-step1#40](https://github.com/next-step/js-todo-list-step1/pull/40)
  - [next-step/js-todo-list-step1#41](https://github.com/next-step/js-todo-list-step1/pull/41)

***

`2주차`에는 PR을 올린 모든 사람이 코드를 굉장히 많이 개선했다.

![image06](https://user-images.githubusercontent.com/18749057/96169303-e5199900-0f5c-11eb-8103-ea57f18594ec.png)

대부분의 사람들이 `Observer Pattern`을 이용해서 컴포넌트를 설계했다.
`Store`를 구현한 사람도 있었고, 혹은 다른 사람들과 아예 다른 방식으로 설계한 사람도 있었다.

그래서 리뷰를 할 때 고민을 더 많이 했고, 내가 작성한 코드에 맡게 다른 사람이 작성한 코드를 적용했다.
항상 느끼고 있지만 똑같은 기능을 구현할 때 다른 사람이 작성한 코드를 볼 수 있다는 것은 큰 행운이다.

2주차에 올라온 PR은 전부 리뷰를 완료했다.

- 리뷰 모음
  - [next-step/js-todo-list-step2#16](https://github.com/next-step/js-todo-list-step2/pull/16)
  - [next-step/js-todo-list-step2#17](https://github.com/next-step/js-todo-list-step2/pull/17)
  - [next-step/js-todo-list-step2#18](https://github.com/next-step/js-todo-list-step2/pull/18)
  - [next-step/js-todo-list-step2#19](https://github.com/next-step/js-todo-list-step2/pull/19)
  - [next-step/js-todo-list-step2#20](https://github.com/next-step/js-todo-list-step2/pull/20)
  - [next-step/js-todo-list-step2#22](https://github.com/next-step/js-todo-list-step2/pull/22)
  - [next-step/js-todo-list-step2#23](https://github.com/next-step/js-todo-list-step2/pull/23)
  - [next-step/js-todo-list-step2#24](https://github.com/next-step/js-todo-list-step2/pull/24)
    - `#24`는 자신만의 확고한 신념을 가지고 설계한게 느껴진다. 그래서 마지막으로 PR을 올린게 아닐까 싶다.

***

`3주차`에는 필자를 포함하여 4명의 사람이 PR을 올렸다.

![image09](https://user-images.githubusercontent.com/18749057/96171996-b0a7dc00-0f60-11eb-8348-ca62003836c6.png)

그래서 리뷰 자체는 어렵지 않았다. 대부분 2주차의 설계를 그대로 가져온 모습을 보였다.
나의 경우 한 분이 `typescript`에 대해 언급해주셔서 스터디장님의 허락을 맡고 `typscript`를 적용했다. ~~괜히 한 것 같다~~

사실 말이 3주차고 대부분 4주차에 코드를 올렸다.

- 리뷰 모음
  - [next-step/js-todo-list-step3#12](https://github.com/next-step/js-todo-list-step3/pull/12)
  - [next-step/js-todo-list-step3#13](https://github.com/next-step/js-todo-list-step3/pull/13)
  - [next-step/js-todo-list-step3#16](https://github.com/next-step/js-todo-list-step3/pull/16) 
  - [next-step/js-todo-list-step3#17](https://github.com/next-step/js-todo-list-step3/pull/17)

이 때 PR을 올린 사람들은 **1주차와 비교했을 때 굉장히 발전을 많이한게 느껴졌다.** 확실히 스터디의 효과가 느껴지는 코드들이었다. 

#### (5) 내가 작성한 Core 코드

나는 `Step3`를 시점으로 `Observer` `Component` `Router` `Store` `RestClient` 등 5개의 코어를 설계했다.

***

먼저 `Observer.ts`에 대해 살펴보자.

```ts
// Observer.ts
import {debounceOneFrame} from "@/utils";

let currentObserver: Function | null = null;

// observable이 observer에서 사용되었다면 observable이 변경되었을 때 observer가 저절로 실행되도록 만들었다.
// 이 때 currentObserver가 observable에서 사용된다.
export const observe = (observer: Function) => {
  currentObserver = debounceOneFrame(observer);
  observer();
  currentObserver = null;
}

// obj의 key가 변하면 observe를 실행하도록 만들어주는 코드이다.
// obj에 새로운 key를 할당할 때도 사용할 수 있다.
export const observableOfKey = (obj: any, key: string, defaultValue: any) => {
  if (!obj) return;
  const observers: Set<Function> = new Set();
  let _value = defaultValue && typeof defaultValue === 'object'
                ? observable(defaultValue)
                : defaultValue;
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      if (currentObserver) observers.add(currentObserver);
      return _value;
    },
    set(value) {
      if (JSON.stringify(value) === JSON.stringify(_value)) return;
      _value = value && typeof value === 'object'
                  ? observable(value)
                  : value;
      observers.forEach(observer => observer());
    },
  })
  return obj;
}

// target으로 받은 object의 key를 전부 observable로 만들어서 반환한다.
export const observable = (target: any): any => (
  Object.entries(target)
        .reduce(
          (obj, [key, defaultValue]) => observableOfKey(obj, key, defaultValue),
          target
        )
);

```

위의 코드는 다음과 같이 사용할 수 있다.
```js
const state = observable({ a: 10, b: 20, c: 30 });
observe(() => console.log(`state.a = ${state.a}`));
observe(() => console.log(`state.b = ${state.b}`));
observe(() => console.log(`state.c : ${state.c}`));
observe(() => console.log(`state.a + state.b = ${state.a + state.b}`));
observe(() => console.log(`state.a + state.b + state.c = ${state.a + state.b + state.c}`));

state.a = 1;
state.a = 10;
state.b = 11;
state.b = 22;
state.c = 111;
state.c = 222;
```

![image10](https://user-images.githubusercontent.com/18749057/96173666-33319b00-0f63-11eb-8f29-bb8063e6433d.png)

마찬가지로 **컴포넌트가 렌더링**에 사용할 수 있다.

주목해야할 점 중에 하나가 `observer`에 `debounce`를 씌운 부분이다. `observable`에 변화가 생겼을 때 한 프레임 단위로 `observer`를 실행하도록 한 것이다.

```ts
const debounceOneFrame = (callback: Function) => {
  let timer: number = -1;
  return (props?: any) => {
    cancelAnimationFrame(timer);
    timer = requestAnimationFrame(() => callback(props));
  }
}
```

위의 코드를 이용하면 한 프레임 단위로 함수를 지연시킬 수 있다.

***

다음으로 `Component.ts`에 대해 살펴보자.

```ts
// Component.ts
import {addEventBubblingListener, selectAllElement} from "@/utils";
import {CommonEvent, ComponentConstructable, PickEvent} from "@/domains";
import {observe, observable} from "@/_core"; // 컴포넌트에서 앞서 언급한 Observer의 observe, observable을 사용한다. 

export interface ChildrenProp {
  constructor: ComponentConstructable,
  props?: any
}

export type ChildrenProps = Record<string, ChildrenProp>;

export class Component<Props = {}, State extends Record<string, any> = {}> {

  protected $state?: State;
  protected $children: ChildrenProps = {};

  constructor(
    protected readonly $target: HTMLElement,
    protected readonly $props?: Props
  ) {
    this.setup();
  }

  private async setup () {
    await this.componentInit();
    // state는 observable로 만들었다.
    this.$state = observable(this.$state || {});
    this.setEvent();
    // render는 observe로 만들었다.
    observe(this.render);
    // 따라서 state가 변경되면 자동으로 render가 실행된다.
  }

  private buildChildren () {
    selectAllElement('[data-component]', this.$target).forEach(target => {
      const componentName = target.dataset.component as string;
      const { constructor, props } = this.$children[componentName];
      new constructor(target, props);
    })
  }

  protected componentInit (): Promise<any> | void {}
  protected setEvent (): void {}
  protected componentDidMount (): void {}

  protected template (): string {
    return ''
  }

  protected setState (payload: Record<keyof State, any>) {
    Object.entries(payload)
          .forEach(([key, value]: [ keyof State, any]) => {
            this.$state![key] = value;
          });
  }

  protected addEvent <T = CommonEvent>(
    ref: string,
    eventType: string,
    callback: (event: PickEvent<T>) => void
  ) {
    addEventBubblingListener(this.$target, `[data-ref="${ref}"]`, eventType, callback);
  }

  public render = () => {
    this.$target.innerHTML = this.template();
    this.buildChildren();
    this.componentDidMount();
  };

}

```

위의 컴포넌트 코드는 다음과 같이 사용된다.

```ts
export const Kanban = class extends Component {

  protected async componentInit() {
    await todoOfTeamStore.dispatch(FETCH_TEAM, todoRouter.$query.id);

    this.$children = {
      TodoHeader: { constructor: TodoHeader },
      TodoListOfTeam: { constructor: TodoListOfTeam },
      TodoMemberAppendForm: { constructor: TodoMemberAppendForm },
    }
  }

  protected template () {
    return `
      <h1 data-component="TodoHeader" id="user-title"></h1>
      <ul data-component="TodoListOfTeam" id="todo-list-of-team" class="todoapp-list-container flex-column-container"></ul>
      <div data-component="TodoMemberAppendForm" id="member-append-form"></div>
    `;
  }

}

export const TeamList = class extends Component {

  protected template () {
    const { teams } = teamStore.$state;

    return `
      ${teams.map(({ _id, name }) => `
        <div class="team-card-container" data-id="${_id}">
          <a href="#!" class="card" data-ref="view">
            <div class="card-title">
              ${name}
            </div>
          </a>
        </div>
      `).join('')}
      
      <div class="add-team-button-container">
        <button id="add-team-button" class="ripple" data-ref="add">
          <span class="material-icons">add</span>
        </button>
      </div>
    `;
  }

  protected setEvent () {

    this.addEvent('view', 'click', event => {
      event.preventDefault();
      const id = selectParent('[data-id]', event.target).dataset.id as string;
      todoRouter.push(`./kanban.html?id=${id}`);
    })

    this.addEvent( 'add', 'click', () => {
      teamStore.commit(SET_OPENED_TEAM_APPEND_FORM, true);
    });

  }

}

```

그리고 컴포넌트 코드에서 주목해야할 부분은 `addEventBubblingListener` 이다.
컴포넌트가 생성될 때 최초에 한 번만 이벤트를 버블링으로 등록하고 이후에는 이벤트를 따로 등록하지 않고 있다.

```ts
export const addEventBubblingListener = <T = CommonEvent>(
  parent: HTMLElement,
  childSelector: string,
  eventType: string,
  callback: (event: PickEvent<T>) => void
) => {
  const isTarget = (target: HTMLElement) => selectAllElement(childSelector).includes(target) ||
                                            selectParent(childSelector, target);
  parent.addEventListener(eventType, (event: unknown) => {
    const e = event as PickEvent<T>;
    if (!isTarget(e.target)) return;
    callback(e);
  })
}
```

그런데 이벤트의 type 때문에 굉장히 고생을 많이 했다.

- 일단 event의 type 자체가 애매모호 하다. 제대로 할 수 있는게 정말 하나도 없다.
- event의 target이 dom을 가르키고 있지 않고 있다. 즉, 아무런 타입 선언 없이 event.target을 가져와서 사용하면 무조건 에러가 발생한다.

즉, 명시적으로 event의 type을 직접 정의해야 하고, event에서 사용되는 target의 type 또한 정의해줘야한다.
그런데 태그도, 이벤트도 굉장히 많은 유형을 가지고 있다.

그래서 React는 `React.ChangeEvent<HTMLTextAreaElement>` 이런식으로 사용할 수 있도록 **모든 Event와 DOM 타입을 정의**했다.

일단 그냥 `any` 처리할까 고민했지만 그럴꺼면 `ts`를 왜쓰겠냐는 생각 때문에 조금 머리를 굴렸다.

```ts
interface CommonEvent<T extends HTMLElement = HTMLElement> extends Omit<Event, 'target'> {
  target: T
}

interface KeyEvent<T extends HTMLInputElement = HTMLInputElement> extends Omit<KeyboardEvent, 'target'|'key'> {
  target: T;
  key: string;
}

type PickEvent<T> = Extract<CommonEvent | KeyEvent, T>

const addEventBubblingListener = <T = CommonEvent>(
  parent: HTMLElement,
  childSelector: string,
  eventType: string,
  callback: (event: PickEvent<T>) => void
) => {
  const isTarget = (target: HTMLElement) => selectAllElement(childSelector).includes(target) ||
                                            selectParent(childSelector, target);
  parent.addEventListener(eventType, (event: unknown) => {
    const e = event as PickEvent<T>;
    if (!isTarget(e.target)) return;
    callback(e);
  })
}


addEventBubblingListener<CommonEvent<HTMLInputElement>>('priority', 'change', ({ target }) => { /* ... */ });

```

위의 코드를 정리해보자면,
- 기본 이벤트 타입에서 `Omit`을 이용하여 기존 `target`의 타입을 제거하고, 제네릭으로 받아온 타입을 `target`에 대입한다.
- 위와 같은 방식으로 앱 내에서 사용중인 이벤트만 커스텀하여 만든다.
- 커스텀으로 정의한 이벤트 중 하나를 Extract를 통하여 선택할 수 있는 새로운 타입을 정의한다 (`PickEvent`) 
- `addEventBubblingListener`에서 `event` 파라미터의 타입을 unkown으로 정의한다.
- `addEventBubblingListener`의 제네릭으로 받아온 타입을 `event`에 명시적으로 타입 캐스팅을 해준다.

***

다음으로 `Store`에 대해서 살펴보자.

```ts
import {observable} from "@/_core";

export type Getter<T> = (state: T) => unknown;
export type Getters<T> = Record<string, Getter<T>>;
export type Mutations<T> = Record<string, (state: T, payload: any) => void>;
export interface ActionContext<T> {
  state: T,
  commit: (key: string, payload: any) => void,
  dispatch: (key: string, payload?: any) => Promise<unknown> | void,
}
export type Actions<T> = Record<string, (context: ActionContext<T>, payload?: any) => Promise<unknown> | void>;
export interface StoreProps<T> {
  state: T
  getters?: Getters<T>
  mutations?: Mutations<T>
  actions?: Actions<T>
}

export class Store<T> {

  public $state: T;
  public readonly $getters: Getters<T>;
  private readonly mutations: Mutations<T>;
  private readonly actions: Actions<T>;

  constructor({ state, getters = {}, mutations = {}, actions = {} }: StoreProps<T>) {
    this.$state = observable(state);
    this.$getters = Object.entries(getters)
                          .reduce((getters, [key, getter]) => {
                            Object.defineProperty(getters, key, {
                              get: () => getter(this.$state)
                            });
                            return getters;
                          }, {});
    this.mutations = mutations;
    this.actions = actions;
  }

  public commit (key: string, payload: any): void {
    this.mutations[key](this.$state, payload);
  }

  public dispatch (key: string, payload?: any): Promise<unknown> | void {
    return this.actions[key]({
      commit: (key: string, payload: any) => this.commit(key, payload),
      dispatch: (key: string, payload: any) => this.dispatch(key, payload),
      state: this.$state,
    }, payload);
  }

}

```

`Store`는 `Vuex`를 모방하여 만들었다. 그래서 거의 똑같이 사용했다.

그래서 다음과 같이 사용할 수 있다.

```ts
import {Store} from "@/_core";
import {TodoService} from "@/services";

export const SET_TEAMS = 'SET_TEAMS';

export interface TeamState {
  teams: TodoTeam[];
}

export const teamStore = new Store<TeamState>({

  state: {
    teams: [],
  },

  mutations: {

    [SET_TEAMS] (state, teams: TodoTeam[]) {
      state.teams = teams;
    },

  },

  actions: {

    async [FETCH_TEAMS] ({ commit }) {
      commit(SET_TEAMS, await TeamService.fetchTeams());
    },

    async [ADD_TEAM] ({ dispatch }, name: string) {
      await TeamService.addTeam(name);
      return dispatch(FETCH_TEAMS);
    },

  },

});

teamStore.commit(SET_TEAMS, []);
teamStore.dispatch(FETCH_TEAMS);
teamStore.dispatch(ADD_TEAMS, { name: 'TEAM A' });

const teams = teamStore.$state.teams;

```

vuex랑 사용방법이 거의 비슷하다.

***

다음으로 RestClient이다.

```ts
// RestClient

import {HttpMethod} from "@/constants";
import {RequestBody} from "@/domains";

export class RestClient {

  constructor (private readonly baseURL: string) {}

  private getUrlOf (uri: string): string {
    const slash = uri.indexOf('/') === 0 ? '' : '/';
    return `${this.baseURL}${slash}${uri}`;
  }

  private request (uri: string, method: HttpMethod = HttpMethod.GET): Promise<any> {
    return fetch(this.getUrlOf(uri), { method })
            .then(response => response.json());
  }

  private requestWithBody (uri: string, method: HttpMethod, body?: RequestBody): Promise<any> {
    const headers = { 'Content-Type': 'application/json' };
    const requestInit: RequestInit = { method, headers, body: JSON.stringify(body) };
    return fetch(this.getUrlOf(uri), requestInit).then(response => response.json());
  }

  public get (uri: string): Promise<any> {
    return this.request(uri);
  }

  public delete (uri: string) {
    return this.request(uri, HttpMethod.DELETE);
  }

  public post (uri: string, body?: RequestBody) {
    return this.requestWithBody(uri, HttpMethod.POST, body);
  }

  public put (uri: string, body?: RequestBody) {
    return this.requestWithBody(uri, HttpMethod.PUT, body);
  }

  public patch (uri: string, body?: RequestBody) {
    return this.requestWithBody(uri, HttpMethod.PATCH, body);
  }

}

// 다음과 같이 Adapter를 만들수 있다.
export const todoAdapterURL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api';
export const todoAdapterClient: RestClient = new RestClient(todoAdapterURL);

// 그리고 adapter를 service 로직에서 사용한다. 
export const todoService = Object.freeze({

 fetchTeams () {
   return todoAdapterClient.get('/teams');
 },

 fetchTeam (teamId: string) {
   return todoAdapterClient.get(`/teams/${teamId}`);
 },

 addTeam (name: string) {
   return todoAdapterClient.post(`/teams`, { name });
 },

 addTeamMember (teamId: string, name: string) {
   return todoAdapterClient.post(`/teams/${teamId}/members`, { name });
 },

 deleteTeam (teamId: string) {
   return todoAdapterClient.delete(`/teams/${teamId}`);
 },

 deleteTeamMember (teamId: string, memberId: string) {
   return todoAdapterClient.delete(`/teams/${teamId}/members/${memberId}`);
 },

})

```

최대한 추상화를 한 코드이다. 아마 axios를 사용한다면 더 단축될 것이다.

***

마지막으로 `Router.ts`를 살펴보자.

```ts
// Router.ts
import {parseQuery} from "@/utils";
import {RequestQuery} from "@/domains";

export const Router = class {

  public $query: RequestQuery = {};

  constructor (
    private readonly callback: (uri: string) => void
  ) {
    window.onpopstate = () => this.load();
  }

  public load (): void {
    const uri: string = location.pathname.split('/').pop() || '';
    this.$query = parseQuery(location.search);
    this.callback(uri);
  }

  public push (uri: string): void {
    const query: RequestQuery = parseQuery(uri);
    this.$query = query;
    this.callback(uri);
    history.pushState(query, '', uri);
  }

}

// 위의 코드는 다음과 같이 사용된다.
const $app = selectElement('#app');
export const todoRouter = new Router((uri: string) => {

  if (uri.includes('kanban')) {
    return new Kanban($app);
  }

  return new Team($app);

});

// 현재 주소에 대한 컴포넌트 렌더링
todoRouter.load();
```

Router는 uri와 매칭되는 컴포넌트를 렌더링해주는 역할을 수행한다.

***

이렇게 만들어본 코어는 추후에 [네이버 아폴로 챌린지](https://programmers.co.kr/competitions/383/2020-naver-fe-recruitment)에서 프론트엔드 과제를 만들 때 큰 도움이 되었다.
다만 라우터에 몇 가지 문제가 있어서 다시 개선해야 했다.. 너무 대충만들었달까.. 😅


#### (6) 정리

***

필자가 작성한 코드는 다음 저장소에서 볼 수 있다.

- [JunilHwang/js-todo-list-step1](https://github.com/JunilHwang/js-todo-list-step1)
- [JunilHwang/js-todo-list-step2](https://github.com/JunilHwang/js-todo-list-step2)
- [JunilHwang/js-todo-list-step3](https://github.com/JunilHwang/js-todo-list-step3)

그리고 위에 있는 내용을 정리한 저장소가 별개로 존재한다. ~~사실 깃허브 잔디를 만들기 위해서 따로 만들었다.~~

- [JunilHwang/black-coffee-study](https://github.com/JunilHwang/black-coffee-study)

데모는 다음 링크에서 확인할 수 있다.

- [step1 데모](https://junilhwang.github.io/black-coffee-study/step1/)
- [step2 데모](https://junilhwang.github.io/black-coffee-study/step2/)
- [step3 데모](https://junilhwang.github.io/black-coffee-study/step3/)

***

#### (7) 짧막한 회고

이렇게 다른 사람들과 `Javascript Study`를 해보는게 처음이었기 때문에 굉장히 재밌었다.
그리고 주변 사람들에게도 많이 소개했다.

먼저 팀원의 지인 중에 이 스터디에 대해 궁금해하는 사람이 있어서 최대한 자세히 설명해줬고,
내가 가르치고 있는 학생들에게도 다음 기수에 꼭 신청하라고 신신당부 해놨다.

그리고 같이 신청한 친구 중 한 명이 이 스터디를 신청해놓고 아예 활동을 하지 않았다.
왜 활동을 안 하냐고 물어보니 [프로그래머스](https://programmers.co.kr/)에서 진행한 [프론트엔드 개발을 위한 자바스크립트 온라인 스터디
](https://programmers.co.kr/learn/courses/10785)을 참여했었는데, 블랙커피 스터디의 커리큘럼이 이와 매우 유사해서 일부로 하지 않았다고 한다. ~~어디서 핑계를~~

나도 어떤 스터디인가 궁금해서 추천사를 봤는데,

![image11](https://user-images.githubusercontent.com/18749057/96236182-a9231a00-0fd6-11eb-9076-d5472c201514.png)

블랙커피 스터디장인 임동준님도 이 스터디를 거쳐오신 것 같았다. ~~사실 여부는 잘 모르겠음~~

각설하고, 이 스터디를 통해서 많은 사람들과 소통할 수 있었고 스스로에게 자극을 많이 줄 수 있어서 좋았다.
`Javascript` 공부를 어떻게 시작 해야할지 모르는 사람에게 꼭 추천해주고 싶다. 그리고 혼자서 공부하는 사람에게도!

앞서 언급했지만 개발 공부는 다른 사람들과 같이 해야한다. 개발은 절대 혼자하는게 아니기 때문이다.

아 그리고 현재 스터디는 `Level01`이다.
[Level02](https://edu.nextstep.camp/c/30DRya3u/)에서는 주로 테스트에 대한 내용을 다루고 있다.

스터디장님은 최종 레벨을 [클린코드를 위한 TDD, 리팩토링 with Java](https://edu.nextstep.camp/c/8fWRxNWU/)와 유사한 커리큘럼으로 만들어서 운영하는게 목표라고 하셨다.  

#### (8) 짧막한 목표

뒤늦게 알았지만, _스터디를 운영 중인 동준님이 우아한 테크코스에서 Front-end 파트를 운영하고 계셨다._
개인적으로 개발 교육에 관심이 많고, 교육을 부업으로 하고 있기 때문에 **현재 직장에서 충분히 경험이 쌓인다면 한 번 우아한 테크코스팀에 지원해볼 생각**이다.

![image08](https://user-images.githubusercontent.com/18749057/96171235-96b9c980-0f5f-11eb-9743-eaf5ad6770fd.png)

그 때가 언제일진.. 나도 잘 모르겠다 🤪 

### 2. 부스트캠프 리뷰어 활동

8월에 [부스트캠프 리뷰어](https://github.com/connectfoundation/review_2020)를 신청했다.

![부스트캠프 리뷰어](https://user-images.githubusercontent.com/18749057/95013576-1e5c2a00-067c-11eb-8759-f7cf70cab6c7.png)

<img width="587" alt="image11" src="https://user-images.githubusercontent.com/18749057/96238793-d3c2a200-0fd9-11eb-983d-f3c5e182edd1.png">

본격적인 활동은 9월부터 시작했으며, 매주 월요일에 회고를 진행했다. 그런데 **웹 리뷰어의 경우 격주로 리뷰**하기 때문에, 회고 참여 또한 격주로 했다.

![image12](https://user-images.githubusercontent.com/18749057/96239127-49c70900-0fda-11eb-9ff9-b1c649c864ff.png)

격주로 화요일/목요일에 올라오는 PR에 리뷰를 남기면 됐는데 처음에 리뷰할 때 대부분의 캠퍼에게 위와 같은 내용의 리뷰를 남겼다.
사실 첫 리뷰만 좀 힘들었고, 그 이후의 리뷰는 힘들진 않았다. 다만 6명을 리뷰하는게 생각보다 시간이 많이 소요됐다.

그리고 `블랙커피 스터디`의 `온라인 세션`은 화요일 `페어프로그래밍`은 목요일이었기 때문에 화요일/목요일에는 정말 미친듯이 피곤했다.

어쨌든 부스트캠프에 관련된 내용은 리뷰 외에 특별한게 없었기 때문에 회고는 여기까지만 하겠다.
활동은 10월까지라서 10월에 다시 회고할 예정이다. 

### 3. 넥스트스탭 리뷰어 활동

7월 말부터 시작한 `클린코드를 위한 TDD, 리팩토링 with Java 9기` 과정이 9월 말에 종료되었다. 약 8주간의 과정이었다.

<img width="952" alt="image12" src="https://user-images.githubusercontent.com/18749057/96241001-8e53a400-0fdc-11eb-869e-3bab4ecf7225.png">

총 15명을 리뷰했다. 예정대로라면 각 미션당 5명, 총 20명을 리뷰해야 하는데 5명이 아예 리뷰를 신청하지 않은 것이다.

<img width="925" alt="image13" src="https://user-images.githubusercontent.com/18749057/96241936-d4f5ce00-0fdd-11eb-98c7-d7365a440b5b.png">

내가 맡은 리뷰이 중 딱 한 분만 최종 미션까지 완료했다.

리뷰어를 하기 전에는 java 자체를 깊게 공부해본적이 없어서 사실 걱정이 많았다.실
그런데 TDD 과정은 대부분 설계에 대한 내용이 많았기 때문에 생각보다 수월하게 리뷰할 수 있었다.
 
지금은 javascript 공부에 집중하고 있는 상태라서 어느 정도 js에 대해 만족할 만한 수준이 된다면, java에 투자좀 해야겠다.

그냥.. 공부할게 너무 많다... 😭 

### 4. 기능경기대회

![image14](https://user-images.githubusercontent.com/18749057/96245480-52bbd880-0fe2-11eb-9a33-f2e702a8dc10.png)

![image15](https://user-images.githubusercontent.com/18749057/96245578-6e26e380-0fe2-11eb-8226-0213e5fa6bd5.jpeg)

![image16](https://user-images.githubusercontent.com/18749057/96245593-7121d400-0fe2-11eb-9d15-9d83c8d252df.jpeg)

![image17](https://user-images.githubusercontent.com/18749057/96245607-74b55b00-0fe2-11eb-8864-707e9ea657ca.jpeg)

![image18](https://user-images.githubusercontent.com/18749057/96245615-767f1e80-0fe2-11eb-8280-1a655e1875d6.jpeg)

![image19](https://user-images.githubusercontent.com/18749057/96245616-7717b500-0fe2-11eb-8e0a-524b36ee50bd.jpeg)

### 5. 프로그래머스 리액트 스터디

### 6. 네이버 아폴로 챌린

## 이쯤에서 돌아보는 스케쥴 정리

- `월요일` 부스트 캠프 세션 (약 2시간 정도 진행)
- `화요일` 블랙커피 스터디 세션 (약 2시간 정도 진행) + 부스트캠프 리뷰
- `목요일` 블랙커피 스터디 페어프로그래밍 (약 3시간 정도 진행) + 부스트캠프 리뷰

이 외에도 다음과 같은 상시 스케쥴이 존재했다.

- `블랙커피 스터디`에 PR 리뷰
- `클린코드를 위한 TDD, 리팩토링 with Java 9기` 리뷰
- `서울디지텍고등학교 기능반` 학생들이 올리는 코드에 대한 리뷰