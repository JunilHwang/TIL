---

title: 2020년 9월 회고
description: 개발자 황준일의 2020년 9월 회고입니다.
sidebarDepth: 2
date: 2020-09-30

---


# 2020년 9월 회고

<img width="778" alt="image32" src="https://user-images.githubusercontent.com/18749057/96290347-689cbe00-1021-11eb-873c-612efe8ec1d7.png">

9월은 정신 없이 시간이 흘러갔다. 사실 왜 벌써 10월인지, **왜 벌써 여름이 저물었고 가을이 왔는지 혼란스럽다.**
9월 말에 리액트 스터디 세션을 하면서 **이제 2020년이 100일도 남지 않았다는 것**을 알았다.
기똥찬 한 해를 보내자고 다짐했던게 엊그제 같은데.. 언제 이렇게 시간이 흘렀는지..

각설하고, 회고 시작!

## 공적

한 달 내내 재택근무를 했는데 덕분에 회사에 대한 약간의 그리움(?)을 느꼈다.

### 1. 크롬 확장프로그램

![크롬 확장프로그램](https://user-images.githubusercontent.com/18749057/95010212-7128e800-0662-11eb-918d-da7a31d64d7f.png)

8월에는 확장프로그램 베타 버전 배포를 했고, 9월에는 회사 기술블로그에 [확장프로그램에 대한 포스팅](https://zuminternet.github.io/Zum-Chrome-Extension/)을 완료했다.
 
확실히 확장프로그램을 만들면서 **기술적으로 많은 생각을 하는 계기**가 되었다.
일반적인 웹 서비스가 아니기 때문에 고려해야할 것도 많았고, **완성도에 대한 중요성** 또한 다시 한 번 깨우칠 수 있었다.

~~그런데 또 하고 싶다는 생각이 들진 않는다.~~

언젠간 ~~죽기 전에~~ 확장프로그램으로 재미난 일들을 해보고 싶다.

### 2. CMS QA

8월에 진행 하던 CMS 개발을 완료했고, 9월에는 QA를 진행하면서 각종 이슈 및 버그를 해결했다.
이번에 작업한 CMS는 약 5개 정도의 서비스와 맞물려 있기 때문에 어떤 부분을 작업했다고 하기가 조심스럽다.

그래도 그중에 꽤 인상 깊었던 작업만 적어보자면, 서비스에 노출중인 아이템의 순서를 `Sortable.js`로 변경하는 것이었다.
기존에도 `Sortable.js`를 이용하여 아이템의 순서를 변경하긴 했다. _그런데 `Sortable.js`는 `DOM`을 직접적으로 조작하는 라이브러리다._
그래서 `Vue`와 깊게 연관되면 오작동 하는 경우가 꽤 많았다.
_`Vue`의 경우 데이터를 기반으로 `DOM`을 그린다. 즉, `DOM`이 변경되어도 데이터는 변경되지 않는 것이다._

덕분에 다음과 같은 문제들을 맞닥뜨렸다.

- Sortable.js로 DOM의 순서를 변경했다.
- 그러나 Vue에서 관리중인 data의 순서는 변경되지 않는다.
- _따라서 DOM을 보고 data를 업데이트 해야한다._
- 그런데 data를 업데이트하면 DOM이 꼬여버린다. 왜냐하면 **현재 데이터에 바인딩 되어 있는 DOM은 변경되지 않기 때문**이다.

글로 읽는 것 보단 눈으로 보고 직접 체험해 보는게 제일 빠르다.

일단 다음과 같이 간단하게 Vue에 Sortablejs를 적용할 수 있다.

<div style="display: none">

::: demo [vanilla]
```html
<html></html>
<script>
  window.loadedScript = Promise.all(
  ['https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js',
   'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js'].map(src => new Promise(resolve => {
      const script = document.createElement('script');
      script.setAttribute('src', src);
      document.head.appendChild(script);
      script.onload = () => resolve();
  })))
</script>
```
:::

</div>

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
loadedScript.then(() => 
  new Vue({
    el: '#sortable-app1',
    data: {
      items: ['item01', 'item02', 'item03', 'item04'],
    },
    mounted () {
      new Sortable(this.$refs.$sortedList);
    }
  }))
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
loadedScript.then(() => 
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
  }));
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
loadedScript.then(() => 
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
    }))
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

9월은 정말 정말 바쁘게 살았다.

### 1. Black Coffee Study

매달 `NextStep`에서 메일로 뉴스레터를 보내주고 있다. 그런데 눈에 띄는 항목이 보였다.

![image01](https://user-images.githubusercontent.com/18749057/96161643-80594100-0f52-11eb-8254-76e542afff4c.png)

**처음으로 Javascript Study가 진행되고 있다는 내용**이다. **무료로 신청**할 수 있었기 때문에 고민 없이 바로 신청했다.

::: tip 블랙 커피 스터디

- 스터디 이름은 `훌륭한 의사소통은 블랙커피처럼 자극적이며, 후에 잠들기가 어렵다.` 라는 문장에 감명 받아 `블랙 커피 스터디`라고 짓게 되었다고 한다.
- 이름의 유래에서 유추할 수 있듯 `함께 좋은 커뮤니케이션으로 통찰을 이끌어내고, 그 통찰과 함께 성장하고, 소프트웨어 장인으로 거듭나기`가 목표인 스터디이다.
- 이 스터디는 위와 같은 목표를 달성하기 위해서 `페어 프로그래밍`과 `코드리뷰`라는 수단을 이용한다.  

:::

::: tip 소프트웨어 장인이란?

1. 동작하는 소프트웨어 뿐만 아니라 정교하고 솜씨있게 만들어직 작품을
1. 변화에 대한 대응하는것 뿐만이 아니라, 계속해서 가치를 더하는 것을
1. 개별적으로 협력하는 것 뿐만이 아니라, 프로페셔널 커뮤니티를 조성하는 것을
1. 고객과 협업하는 것 뿐만 아니라, 생산적인 동반자 관계를 추구한다.

:::


#### (1) 스터디 미션소개

<p>
  <img src="https://user-images.githubusercontent.com/18749057/96161916-d928d980-0f52-11eb-9138-b75d03d0f442.png" alt="image02" width="600" />
</p>

스터디의 미션은 생각보다 간단했다.

- `1주차` Todo App 만들기
  - [Document Object Model](https://www.youtube.com/watch?v=1yADBI27NCg)
  - [Browser Object Model](https://www.youtube.com/watch?v=BYRTKmPAr8c)
  - [Event](https://www.youtube.com/watch?v=u49E4_4hyeI)
- `2주차` API 연동
- `3주차` SPA 만들기 (Router 사용하기)

사실 **수준 높은 코드를 만들기 위한 적합한 미션**이라고 생각한다.
현재 보다 더 어려웠어도 혹은 더 쉬웠어도 **설계에 집중**하기가 힘들었을 것 같다.

일단 **1주차 때 3주차 미션까지 모두 구현**했다. 그리고 **한 달 동안 계속 리팩토링**만 했다.



#### (2) 스터디 진행 방식

스터디는 다음과 같이 진행되었다.

<img src="https://user-images.githubusercontent.com/18749057/96162462-8996dd80-0f53-11eb-84bc-7bb3db19ed17.png" alt="image03" width="800" />

요약하자면 아래와 같다.

- `주 1회 온라인 세션`을 통한 미션 소개 및 회고
- `주 2회 페어프로그래밍`
- `코드리뷰` : PR 순서대로 3명씩 묶어서 코드리뷰를 진행한다. 혹은 자유롭게 리뷰를 남겨도 상관없다.

~~온라인 세션이 무척 길었지만~~ 모든 과정이 마음에 들었다.
**온라인 세션에서 한 주에 대한 회고**를 진행하는데,
이 때 회고의 주제가 항상 달라져서 **여러가지 면에서 생각**할 수 있는 기회가 되어서 좋았고,
다른 사람들의 이야기를 많이 들을 수 있어서 좋았다.

- `1주차`에는 **미션과 스터디에 대한 내용 위주**로 세션이 진행되었다.
- `2주차`에는 1주차에 대한 회고와 **좋은 개발자에 대한 덕목**에 대해서 토의 하는 과정이 좋았다.
  - 이 때 대부분의 사람들이 비슷한 이야기를 했고, 마지막 차례였던 나는 조금 다른 이야기를 했다.
  - 내가 생각하는 좋은 개발자의 덕목은 **좋은 영향력을 행사**하는 것, **같이 일하고 싶은 사람**이 되는 것이다.
    - 현재 같은 팀 소속의 [체대생 개발자로 알려진 한정수 담당님](https://github.com/integerous)이 그렇다.
      - [체대 출신 개발자의 2018년 회고](https://ryan-han.com/post/memoirs/memoirs2018/)
      - [체대 출신 개발자의 2019년 회고](https://ryan-han.com/post/memoirs/memoirs2019/)
      - [체대생, 개발자가 되다! (한정수ㅣ줌인터넷 포털개발팀)](https://www.edwith.org/sef-2019/lecture/44869/)
      - [고퀄리티 개발 컨텐츠 모음](https://github.com/Integerous/goQuality-dev-contents)
      - 이런 분과 **같은 팀에서 일할 수 있다는 것은 큰 행운**이라고 생각한다.
    - 그리고 [우리 팀장님](https://beyondj2ee.wordpress.com/) 또한 그렇다.
      - [이 글](https://beyondj2ee.wordpress.com/2014/05/16/%ec%a0%91%ec%86%8d-%ec%a0%9c%ea%b0%80-%ed%95%9c%eb%b2%88-%ea%b0%9c%eb%b0%9c%ec%9e%90%eb%a5%bc-%eb%a7%8c%eb%82%98-%eb%b4%a4%ec%8a%b5%eb%8b%88%eb%8b%a4-my-story/)은 팀장이 인터뷰한 내용을 정리한 것인데 읽으면서 굉장히 마음에 와닿았다.
      - 항상 긍정적인 마인드로 주변을 이끌어 가는 사람과 일할 수 있는 것은 큰 행운이라고 생각한다.
      - 제일 인상 깊은 내용이다. <br> <img src="https://user-images.githubusercontent.com/18749057/96334105-35057680-10a9-11eb-9791-ab828a734df8.png" alt="팀장님의 명언" width="500"  />
  - 이 외에도 우리 팀에는 좋은 분들이 너무 많이 있다. **필자 또한 긍정적인 영향력을 가진 구성원이 되는 것이 목표**이다.
- `3주차`에는 회고 주제가 기억나지 않았다. 기억나는건 공개 코드리뷰를 하면서 `Typescript`에 대해 설명하고 덤으로 **`intellij`를 이용하여 git을 운영하는 방법과 코드리뷰를 하는 방법** 등을 설명했다.
- `4주차`에는 스터디 자체에 대한 회고와 **앞으로의 계획**, 그리고 그냥 각자에 대한 이야기를 했던걸로 기억한다.

#### (3) 페어프로그래밍

[페어프로그래밍](https://www.youtube.com/watch?v=ts-ErQNUGNo)은 들어보기만 했고 실제로 해본 경험은 없었기 때문에 많이 생소했다.
결과적으로 **총 3회**를 참여했으며, 충분히 좋은 경험이 되었다고 생각한다.

페어프로그래밍은 요약하자면 정해진 시간동안 `드라이버` 코드를 작성하고,
`네비게이터`는 **드라이버가 작성하는 코드를 실시간으로 리뷰**를 하면서 진행하는 것이다.
그리고 시간이 다 되거나 혹은 드라이버가 목표로하는 기능을 구현했을 때 서로 역할을 바꾸는 것이다.
_페어프로그래밍이 끝나면 각자 짧게 회고 및 서로에 대한 피드백을 한다._

코로나 때문에 `행아웃`과 `줌`의 화면공유 기능을 이용하여 온라인으로 진행했다.    

- `1주차`
  - 스터디를 여자친구와 같이 신청했다. _설마설마 했는데 첫 번째 페어 프로그래밍 부터 지인과 매칭이 되었다._
  - 덕분에 매우 ~~조심스럽게~~ 편하게 진행할 수 있었다.
  - **15분 간격**으로 역할을 바꿨고, **총 3시간** 정도 진행했다.
  - 페어프로그래밍을 할 때 작성한 코드를 기준으로 **다시 내 코드를 리팩토링** 했다.
- `2주차`
  - JS를 시작한지 얼마 되지 않은 분과 매칭이 되었다.
  - 그래서 **주로 네비게이터의 역할**을 맡아서 했다. 
  - 피드백 시간에 스터디장님과 같이 어떤식으로 개발 공부를 하면 되고, **피드백과 코드리뷰의 중요성**에 대해서 열변을 토한걸로 기억한다.
  - 확실히 같이 공부하는 사람이 많을 수록, **주변에 피드백을 해주는 사람이 많을 수록 빠르게 성장**할 수 있는 것 같다.
- `3주차`
  - 또 다시 지인과 매칭이 되었다.
  - 이번에는 전체적인 기능 구현이 아닌 **옵저버를 구현하기로 합의**하고 진행했다. ~~내가 제안했는데, 내가 많이 헤맸다.~~
  - 단순한 옵저버 패턴 구현이 아니라 만드는게 아니라 `Object.defineProperty`를 이용하여 **자동으로 옵저빙** 하는 코드를 만들었다.
  - _이 때 코드가 잘 만들어졌고 이를 2주차 / 3주차 미션에 적용했다._ 다만 리팩토링할 부분이 너무 많아서 **거의 처음부터 다시 만들었다.** ~~리팩토링의 연속~~

결과적으로 **페어프로그래밍을 하면서 고민했던 것들을 내 코드에 전부 녹였다.**
확실히 다른 사람과 같이 무언가를 만들면 더 고민을 많이 하게 된다.
**당장 서로가 알아볼 수 있게 코드를 만들어야 한다는 점**이 매리트라고 생각한다.
그리고 **즉각적인 피드백**을 주고 받기 때문에 잘못된 점을 빠르게 고칠 수 있다.

다만 한 번 하면 3시간 정도 소요되기 때문에 굉장히 피곤했다. ~~그냥 하는 일이 많아서 피곤했다.~~

#### (4) 코드리뷰

블랙 커피 스터디를 진행하는 동안 ~~정말 미친놈처럼~~ **코드리뷰를 굉장히 많이 했다.**

<img src="https://user-images.githubusercontent.com/18749057/96168601-f1512680-0f5b-11eb-8118-15e2a1a1b680.png" alt="image05" width="500" />

`1주차`에는 마지막에 올라온 5개의 PR을 제외한 모든 PR에 리뷰를 남겼다. 갯수를 세어보니 총 10개의 PR이었다.

<img src="https://user-images.githubusercontent.com/18749057/96168541-dbdbfc80-0f5b-11eb-982a-1cc4737f53dc.png" alt="image04" width="700" />

하루 날잡고 종일 리뷰만 했는데, JS 코드를 마음껏 볼 수 있어서 좋았다.

<img src="https://user-images.githubusercontent.com/18749057/96169597-56f1e280-0f5d-11eb-92e6-cc2553ea10ed.png" alt="image07" width="700" />

1주차에 올라온 코드는 대부분 비슷한 스타일로 작성되어 있어서 **설계적인 측면보단 문법적인 측면의 리뷰**를 많이 했던 것 같다.

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

<img src="https://user-images.githubusercontent.com/18749057/96169303-e5199900-0f5c-11eb-8103-ea57f18594ec.png" alt="image06" width="700" />

대부분의 사람들이 `Observer Pattern`을 이용해서 컴포넌트를 설계했다.
`Store`를 구현한 사람도 있었고, 혹은 다른 사람들과 아예 다른 방식으로 설계한 사람도 있었다.

그래서 리뷰를 할 때 고민을 더 많이 했고, 내가 작성한 코드에 맡게 다른 사람이 작성한 코드를 적용했다.
**똑같은 기능을 구현할 때 다른 사람이 작성한 코드를 볼 수 있다는 것은 큰 행운이라고 생각한다.**

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

<img src="https://user-images.githubusercontent.com/18749057/96171996-b0a7dc00-0f60-11eb-8348-ca62003836c6.png" alt="image09" width="700" />

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

<img src="https://user-images.githubusercontent.com/18749057/96173666-33319b00-0f63-11eb-8f29-bb8063e6433d.png" alt="image10" widht="500" />

마찬가지로 **컴포넌트 렌더링**에 사용할 수 있다.

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
    // 따라서 state(observable)가 변경되면 자동으로 render(observe)가 실행된다.
    observe(this.render);
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
**컴포넌트가 마운트될 때 컴포넌트를 감싸는 DOM에 전체 이벤트를 버블링을 이용하여 등록**한다.
따라서 이벤트를 조금 더 유연하게 관리할 수 있게 된다.

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

그런데 **이벤트의 type 때문에 무척 고생**했다.

- **기본 event type 자체가 애매모호** 하다. 제대로 할 수 있는게 정말 하나도 없다.
- **event의 target이 dom을 가르키고 있지 않고 있다.** 그래서 아무런 타입 선언 없이 `event.target`을 가져와서 사용하면 무조건 에러가 발생한다.

즉, **명시적으로 event의 type을 직접 정의**해야 하고, event에서 사용되는 **target의 type 또한 정의**해야 제대로 사용할 수 있다.
문제는 태그의 종류도 굉장히 많고, 이벤트의 종류도 굉장히 많이 있다는 것이다.

그래서 React는 `React.ChangeEvent<HTMLTextAreaElement>` 이런식으로 사용할 수 있도록 **모든 Event와 DOM 타입을 정의**했다.

일단 그냥 `any`로 처리할까 고민했지만 그럴꺼면 `ts`를 왜쓰겠냐는 생각 때문에 조금 머리를 굴렸다.

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

`Store`는 `Vuex`를 모방하여 만들었다. 그래서 거의 똑같이 사용했다. 따라서 위의 코드는 다음과 같이 사용할 수 있다.

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

***

다음으로 `RestClient.ts`를 살펴보자.

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

```

아쉬운 부분은 에러처리를 `RestClient`에서 하지 않는다는 점이다. ~~그냥 귀찮아서 안 했다.~~
어쨌든, 위의 코드는 다음과 같이 사용할 수 있다.

```ts
// 먼저 Adapter를 만들어야 한다.
export const todoAdapterURL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api';
export const todoAdapterClient: RestClient = new RestClient(todoAdapterURL);

// 그리고 adapter를 service에서 불러와 사용하면 된다. 
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

});

```

최대한 추상화를 한 코드이다. 아마 `axios`를 사용한다면 더 단축될 것이다.

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
    // 주소의 변경을 감지한다. 주소가 변경되면 load를 실행한다.
    window.onpopstate = () => this.load();
  }
  
  // load는 현재 주소에 매칭되는 일을 수행한다.
  public load (): void {
    const uri: string = location.pathname.split('/').pop() || '';
    this.$query = parseQuery(location.search);
    this.callback(uri);
  }

  // push는 주소를 변경한 해당 주소에 다음에 매칭되는 일을 수행하낟.
  public push (uri: string): void {
    const query: RequestQuery = parseQuery(uri);
    this.$query = query;
    this.callback(uri);
    history.pushState(query, '', uri);
  }

}
```
로직은 매우 단순하다.

- 주소가 변경되면 `Callback` 함수가 실행된다.
- `Callback`함수는 주소에 매칭되는 컴포넌트를 최상위 DOM에 렌더링하는 형태의 코드로 만든다.
- 혹은 `push`를 이용하여 직접 `Callback`을 호출할 수 있다.

그래서 다음과 같이 사용할 수 있다.

```ts
const $app = selectElement('#app');
export const todoRouter = new Router((uri: string) => {

  if (uri.includes('kanban')) {
    return new Kanban($app);
  }

  return new Team($app);

});

// 현재 주소에 대한 컴포넌트 렌더링
todoRouter.load();

// 라우터 변경
todoRouter.push('/kanban'); // Kanban 렌더링
todoRouter.push('/'); // Team 렌더
```

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
그리고 **주변 사람들에게도 많이 소개**했다.

먼저 팀원의 지인 중에 이 스터디에 대해 궁금해하는 사람이 있어서 최대한 자세히 설명해줬고,
**내가 가르치고 있는 학생들에게도 다음 기수에 꼭 신청하라고 신신당부** 해놨다.
_글을 작성하는 시점을 기준으로 3명의 학생이 4기 스터디를 신청했다._

그리고 같이 신청한 친구 중 한 명이 아예 활동을 안 했다.
왜 활동을 안 하냐고 물어보니 [프로그래머스](https://programmers.co.kr/)에서 진행한 [프론트엔드 개발을 위한 자바스크립트 스터디(feat. VanillaJS)](https://programmers.co.kr/learn/courses/10785)에 참여했었는데,
**블랙커피 스터디의 커리큘럼이 이와 매우 유사해서** 일부로 하지 않았다고 한다. ~~어디서 핑계를~~

나도 어떤 스터디인가 궁금해서 추천사를 봤는데,

<img src="https://user-images.githubusercontent.com/18749057/96236182-a9231a00-0fd6-11eb-9076-d5472c201514.png" alt="image11" width="600" />

_블랙커피 스터디장인 임동준님도 이 스터디를 거쳐오신 것 같았다._ ~~사실 여부는 잘 모르겠음~~

각설하고, 이 스터디를 통해서 **많은 사람들과 소통**할 수 있었고 **스스로에게 자극**을 많이 줄 수 있어서 좋았다.
`Javascript` 공부를 어떻게 시작 해야할지 모르는 사람에게 꼭 추천해주고 싶다. 그리고 _혼자서 공부하는 사람에게도!_

앞서 언급했지만 **개발 공부는 다른 사람들과 같이** 해야한다. 개발은 절대 혼자하는게 아니기 때문이다.

아 그리고 현재 스터디는 `Level01`이다.
[Level02](https://edu.nextstep.camp/c/30DRya3u/)에서는 주로 **테스트에 대한 내용**을 다루고 있다.

스터디장님은 최종 레벨을 [클린코드를 위한 TDD, 리팩토링 with Java](https://edu.nextstep.camp/c/8fWRxNWU/)와 유사한 커리큘럼으로 만들어서 운영하는게 목표라고 하셨다.  

#### (8) 짧막한 목표

뒤늦게 알았지만, _스터디를 운영 중인 동준님이 우아한 테크코스에서 Front-end 파트를 운영하고 계셨다._
사실 옛날부터 나의 직업적 꿈이 **개발과 교육을 같이 하는 것**이였기 때문에 동준님을 동경하게 되었다.

어쨌든 지금도 주업은 개발을 하고 있고 부업을 교육으로 하는 중이다.
매주 고등학생들을 지도하기도 하고, 인강을 찍어서 특성화고등학교의 방과후 수업에 활용하기도 하는 중이다.

지금은 주로 고등학생을 대상으로 교육을 하고 있으나, 조금 더 기회가 된다면 더 많은 사람들과 교류하며 나의 지식을 전달하는 일을 하고 싶다.
그게 꼭 동준님처럼 우아한 테크코스에서 일하는게 아닐지라도 말이다! 

그럴라면 또 열심히 공부해야지! 

### 2. 부스트캠프 리뷰어 활동

8월에 [부스트캠프 리뷰어](https://github.com/connectfoundation/review_2020)를 신청했다.

<img src="https://user-images.githubusercontent.com/18749057/95013576-1e5c2a00-067c-11eb-8759-f7cf70cab6c7.png" alt="부스트캠프 리뷰어" width="600" /> <br>

<img width="587" alt="image11" src="https://user-images.githubusercontent.com/18749057/96238793-d3c2a200-0fd9-11eb-983d-f3c5e182edd1.png">

본격적인 활동은 9월부터 시작했으며, **매주 월요일에 온라인 세션에서 회고**를 진행했다. 그런데 **웹 리뷰어의 경우 격주로 리뷰**하기 때문에, 회고 참여 또한 격주로 했다.

<img src="https://user-images.githubusercontent.com/18749057/96239127-49c70900-0fda-11eb-9ff9-b1c649c864ff.png" alt="image12" width="700" />

**격주**로 **화요일/목요일**에 올라오는 PR에 리뷰를 남기면 됐는데 처음에 리뷰할 때 **캠퍼들에게 대체로 위와 같은 내용의 리뷰**를 남겼다.
사실 첫 리뷰만 좀 힘들었고, 그 이후의 리뷰는 힘들진 않았다. 다만 **6명을 리뷰하는게 생각보다 시간이 많이 소요**됐다.

그리고 `블랙커피 스터디`의 `온라인 세션`은 화요일 `페어프로그래밍`은 목요일이었기 때문에 _화요일/목요일에는 정말 미친듯이 피곤했다... 😭😭😭_

어쨌든 부스트캠프에 관련된 내용은 리뷰 외에 특별한게 없었기 때문에 회고는 여기까지만 하겠다.
활동이 끝나면 다시 전체적인 내용을 정리해서 올릴 예정이다. 

### 3. 넥스트스탭 리뷰어 활동

7월 말부터 시작한 `클린코드를 위한 TDD, 리팩토링 with Java 9기` 과정이 9월 말에 종료되었다. **약 8주간의 과정**이었다.

<img width="952" alt="image12" src="https://user-images.githubusercontent.com/18749057/96241001-8e53a400-0fdc-11eb-869e-3bab4ecf7225.png">

**총 15명을 리뷰**했다. 예정대로라면 각 미션당 5명, 총 20명을 리뷰해야 하는데 5명이 아예 리뷰를 신청하지 않은 것이다.

<img width="925" alt="image13" src="https://user-images.githubusercontent.com/18749057/96241936-d4f5ce00-0fdd-11eb-98c7-d7365a440b5b.png">

내가 맡은 리뷰이 중 딱 **한 분만 최종 미션까지 완료**했다.

리뷰어를 하기 전에는 java 자체를 깊게 공부해본적이 없어서 걱정이 많았다.
그런데 TDD 과정은 **대부분 설계에 대한 내용**이 많았기 때문에 생각보다 수월하게 리뷰할 수 있었다.
 
지금은 javascript 공부에 집중하고 있는 상태라서 어느 정도 만족할 만한 수준이 된다면, java에 투자할 생각이다. ~~그게 대체 언제일까?~~

그냥.. 공부할게 너무 많다... 😭 

### 4. 기능경기대회 - 전국대회

8월부터 선생님의 부탁으로 기능반 학생들을 지도했고, **숙소(전주)까지 따라가서 학생들의 훈련을 도왔다.**

::: tip 기능경기대회

- 정식 명칭은 **기능올림픽**이다. 
- 기능경기대회는 **특성화고등학교의 수능이며 축제**라고 할 수 있다.
- **지방대회 - 전국대회 - 국가대표 선발전 - 세계대회** 등의 과정이 있다.
- **지방대회**는 4월에 개최된다. 그런데 올해는 **코로나 때문에 6월**에 개최되었다.
- **전국대회**는 9월/10월 중에 개최된다. 올해는 **9월 14일 부터 7일간** 대회가 진행되었다.
- **세계대회**는 2년에 한 번씩 개최된다. 세계대회 입상 혜택은 다음과 같다. _올림픽 입상 혜택과 동일하다고 보면 된다._
  - 병역대체복무
  - 신축 아파트 분양권 획득
  - 대기업 연봉급 상금
  - 대학 진학시 학비 전액 지원
  - 연금
- 자세한 내용은 [마이스터넷](https://meister.hrdkorea.or.kr/main/main.do) 참고
  - [지방대회](https://meister.hrdkorea.or.kr/sub/3/2/1/20160512110924569100_view.do)
  - [전국대회](https://meister.hrdkorea.or.kr/sub/3/3/1/20160512111525375100_view.do)
  - [세계대회](https://meister.hrdkorea.or.kr/sub/3/4/1/20160512111859974100_view.do)

필자 또한 **2012년도 경기도대회, 전국대회에서 입상**을 했고 이를 계기로 본격적인 개발공부를 시작했다.

:::

**9월 14일** 부터 대회 시작이었고, 올해는 전북에서 진행되었다.

<div style="padding-top: 40%; position: relative;">
    <img style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; object-fit: cover;" src="https://user-images.githubusercontent.com/18749057/96245616-7717b500-0fe2-11eb-8e0a-524b36ee50bd.jpeg" alt="image19" />
</div>

경기장은 `전북 하이텍 고등학교`인데 코로나 때문에 선수들만 입장 가능했다. ~~덕분에 무척 편했다.~~

<img src="https://user-images.githubusercontent.com/18749057/96245480-52bbd880-0fe2-11eb-9a33-f2e702a8dc10.png" alt="image14" width="500" />

나는 학생들이 경기가 끝나고 숙소에 돌아오면, 문제 풀이를 옆에서 도와주었다.
__며칠 동안 새벽 3시에 자거나 혹은 새벽 5시에 일어났다.__
회사 일도 재택근무로 병행하고 있던 상태라서 **정말 미친듯이 피곤**했다.

<img src="https://user-images.githubusercontent.com/18749057/96245578-6e26e380-0fe2-11eb-8226-0213e5fa6bd5.jpeg" alt="image15" width="600" />

어쨌든 **필자가 가르친 학생들(서울디지텍고등학교)이 올해에도 입상**했다.
학생 한 명이 제출을 잘못해서 대략 30점 정도를 채점도 못하고 통으로 날려보냈다.
그래도 입상은 했으니.. 이걸 다행이라고 해야할지.. 이 때 실수한 기억은 경험상 평생 가기 때문에 괜히 안쓰럽다.

***

그리고 이 글을 작성하는 시점을 기준(10/16)으로 **다음 기수의 학생들을 가르치는 중**이다.
이번 대회는 준비기간이 한 달 정도 밖에 되지 않았기 때문에 이번에 가르치는 학생들은 조금 더 차근차근 준비해서 **역량 자체를 키워줄 생각**이다.

기능대회는 이제 너무 꼰대같은 대회가 되어버렸다. _제발 제발 제발 문제 출제 기준좀 좀 변경했으면... ㅠㅠ_  

### 5. 프로그래머스 리액트 스터디

앞서 블랙커피 스터디를 다룰 때 언급한 프로그래머스에 올라온 스터디 목록을 쭉 보다가 **리액트 스터디**가 눈에 보였다.

<img src="https://user-images.githubusercontent.com/18749057/96252260-a7645100-0fec-11eb-89da-129fe0814166.png" alt="image20" width="700" />

<img width="818" alt="image24" src="https://user-images.githubusercontent.com/18749057/96285184-9120ba00-1019-11eb-9304-5ca917681409.png">

여기서도 **블랙커피 스터디장님의 추천사**를 볼 수 있었다 😮 

<img src="https://user-images.githubusercontent.com/18749057/96252674-4be69300-0fed-11eb-85ec-ef0abaa09e05.png" alt="image21" width="700" />

그래서 고민하지 않고 바로 신청했다. 이게 바로 **추천사의 중요성** 인가.. 🤔 

스터디는 **매주 목요일마다 진행되는 온라인 세션**을 통해 미션 진행에 필요한 기반 지식 및 미션 내용을 숙지할 수 있었다.

첫 번째 미션을 완수하고 PR을 올렸더니 **스터디 리더를 포함한 3명의 리뷰어 분들이 리뷰**를 남겨주셨다.

<img src="https://user-images.githubusercontent.com/18749057/96283857-c3311c80-1017-11eb-89db-6d9b3710f949.png" alt="image22" width="700" /><br>

<img src="https://user-images.githubusercontent.com/18749057/96283876-cb895780-1017-11eb-9b86-1eaef07a9a9a.png" alt="image23" width="700" />

일단 미션의 내용 자체가 굉장히 유익했기 때문에 재밌었다. 확실히 혼자 공부할 때 보다 빠르게 기술을 익히고 있다는 느낌이 들었다.

이 스터디는 4주 동안 진행된다. **10월에 조금 더 상세하게 회고**할 예정이다. 

***

뒤늦게 알았는데 스터디를 리드하시는 분이 프론트엔드, 백엔드, 그리고 데이터 엔지니어 업무를 겸하는 굉장히 다재다능한 분이었다.
이제 경력 13년차라고 하셨는데, 정말 꾸준히 공부를 했다는게 느껴졌다.

**나는 과연 10년 정도의 시간이 흐른 뒤에 어떤 모습일까?**

***

### 6. 네이버 아폴로 챌린지

프로그래머스에서 [Naver Apollo CIC 경력 개발자 채용 - 프론트엔드 개발 챌린지](https://programmers.co.kr/competitions/383/2020-naver-fe-recruitment)를 신청했다.

<img width="919" alt="image25" src="https://user-images.githubusercontent.com/18749057/96285579-199f5a80-101a-11eb-9095-1fe19d9b6123.png">

먼저 **9월 20일에 알고리즘 테스트**를 통과하면 **9월 27일에 프론트엔드 테스트**를 볼 수 있는 과정이었다.
**알고리즘은 3문제**가 출제되었고 다 풀이했다. 다만 마지막 문제에서 정확성 테스트를 통과하지 못했다.

카카오 챌린지때도 두 문제만 풀었는데 통과했기 때문에 이번에도 알고리즘에서 떨어지진 않을 것이라고 생각했다.
실제로 같이 응시한 사람 중 한 명이 한 문제만 제대로 풀었는데도 통과했다.

프론트엔드 테스트는 **바닐라 JS로 영화 리뷰와 관련된 SPA(Single Page APP)를 만드는 내용의 과제**였다.

원래 프로그래머스에서 프론트엔드 챌린지를 볼 때 어느 정도 기본 컴포넌트 설계가 된 코드를 제공해줬는데 **이번에는 아예 처음부터** 만들어야 했다.
덕분에 블랙커피 스터디를 진행하면서 **공부한 내용을 정말 알차게 써먹었다.**

`Component` `Router` `RestClient` `Observer` `debounce` 등을 포함한 모든 코어를 적용했고,
결과적으로 완성도 있게 만들 수 있었다.

**한 달 전의 나였으면 불가능했을 일이었다.**
~~물론 내가 열심히 했기 때문도 있었지만~~ 이 모든것이 블랙커피 스터디 덕분이었다.

결과는 10월 말에 나오는데, 카카오 챌린지는 상위 10% 였기 때문에 **이번엔 상위 5% 정도는 되리라 예상**해본다.

> 10월 말에 결과가 나왔고, 무려 상위 0%의 점수를 획득했다. ~~아싸가오리~~ 

### 7. 단국대 개발자 스터디

이번 달도 큰 일 없이 스터디가 진행되었다.

<img width="700" alt="image31" src="https://user-images.githubusercontent.com/18749057/96289265-b1537780-101f-11eb-91ca-d2531e50fa7a.png" />

위의 사진 처럼 현재 이 글을 작성하는 시점을 기준으로 **2,247개의 commit**이 존재한다.

<img width="700" alt="image30" src="https://user-images.githubusercontent.com/18749057/96288817-fcb95600-101e-11eb-862b-eda2980496ea.png" />

이번 달에는 **약 50개의 PR에 리뷰**를 남겼다.
현재는 나만 꾸준히 리뷰를 남기고 있는데, 다른 사람들도 조금만 의욕을 가지고 서로에게 피드백을 했으면 하는 바람이 있다.

<img width="838" alt="image31" src="https://user-images.githubusercontent.com/18749057/96289514-28890b80-1020-11eb-99bd-570a22ffc29f.png">

그리고 스터디장이 _돈을 써야 돈이 생긴다면서_ 큰맘먹고 사비를 들여 활발하게 활동하는 사람들에게 상금을 지급했다. 

***

이 외에 기분 좋은 이슈가 있었다. 8월 리뷰에 언급했었지만 [미림여자정보과학고등학교](https://www.e-mirim.hs.kr/main.do)에서 우리 스터디를 모방하여 알고리즘 스터디를 진행 중이었다.
그런데 이 스터디를 운영하는 학생에게 메일이 한 통 왔다.

![image26](https://user-images.githubusercontent.com/18749057/96286371-3d16d500-101b-11eb-9d68-35a7a1694fd4.png)

사실 내가 원해서 시작한 스터디는 아니지만, 나름 잘 굴러가고 있었고 이렇게 누군가가 모방할 만큼 성장했다는게 믿기지 않았다.

![image27](https://user-images.githubusercontent.com/18749057/96288105-dba43580-101d-11eb-8191-3f7b9d20ed26.png)

그래서 다음과 같이 답변을 하면서 현재 운영하고 있는 방식들을 소개했다.
그리고 겸사 겸사 간간이 리뷰도 해주게 되었다.

<img width="700" alt="image28" src="https://user-images.githubusercontent.com/18749057/96288516-8583c200-101e-11eb-858a-d44da5f2c612.png">

**한 달 동안 대략 25개의 리뷰**를 남겼다.

<img width="700" alt="image29" src="https://user-images.githubusercontent.com/18749057/96288752-e4e1d200-101e-11eb-854a-5c21c4f4e00e.png">

고등학교 때 부터 이렇게 준비하는 이 학생들이 내심 부럽기도 하고 또 힘 닿는 만큼 도와주고 싶다는 생각도 든다. ~~지금 내 코가 석자인데 오지랖만 넓어지고 있다.~~

***

그리고 스터디원 중에 굉장히 [성실한 사람](https://github.com/Jaewon0702)이 있다.
내용이 너무 많아서 이곳에 보여주긴 힘들고, 궁금한 사람만 [이 링크](https://github.com/DKU-STUDY/TodayReview/issues/136#issuecomment-684861911)에서 확인해보길 바란다.

이러한 분량의 [TodayReview](https://github.com/DKU-STUDY/TodayReview/issues)를 거의 매일 남기고 있다.
이러한 열정이 부럽기도 하고, 존경스럽기도 하고, **같이 스터디를 할 수 있음에 감사함을 느낀다.**

### 8. 일일커밋 및 코덕

이번 달에는 확실히 깃허브에 기록을 많이 남겼다.

<img width="778" alt="image32" src="https://user-images.githubusercontent.com/18749057/96290347-689cbe00-1021-11eb-873c-612efe8ec1d7.png">

핵심적인 내용만 정리하자면

- Commit `770개`
- Pull Request `15개`
- Code Review `133개` -> 사실 커밋 갯수보다 이게 더 놀랍다.

그리고 **글을 작성하는 시점을 기준으로 올 해에 4785개의 기여(Contributions)를 했다.**

<img width="934" alt="image33" src="https://user-images.githubusercontent.com/18749057/96290964-625b1180-1022-11eb-9609-078d376126c6.png">

**원래 5000개가 목표였는데, 6000개로 늘려야겠다.**

이렇게 왕성하게 활동한 덕분에 8월에 이어서 **9월 코덕 랭킹 1위**를 달성했다.

<img width="634" alt="image34" src="https://user-images.githubusercontent.com/18749057/96291283-c8479900-1022-11eb-92c9-f18174124dfc.png">

다만 이번에는 `우아한 테크코스` 그룹에게 1등을 내어주었다. `DKU-STUDY`는 2등으로 마무리했다.  ~~스터디원을 더 모집해야 할까?~~

<img width="535" alt="image35" src="https://user-images.githubusercontent.com/18749057/96291354-e1e8e080-1022-11eb-9b27-27230437b212.png">

## 이쯤에서 돌아보는 스케쥴 정리

- `월요일` 부스트 캠프 세션 (약 2시간 정도 진행)
- `화요일` 블랙커피 스터디 세션 (약 2시간 정도 진행) + 부스트캠프 리뷰
- `목요일` 블랙커피 스터디 페어프로그래밍 (약 3시간 정도 진행) + 부스트캠프 리뷰

이 외에도 다음과 같은 상시 스케쥴이 존재했다.

- `블랙커피 스터디`에 PR 리뷰
- `클린코드를 위한 TDD, 리팩토링 with Java 9기` 리뷰
- `서울디지텍고등학교 기능반` 학생들이 올리는 코드에 대한 리뷰

덕분에 본문에서 언급한 것 처럼 한 달 동안 코드리뷰만 100개 넘게 했다.. 😰   

## Summary

- 확장프로그램 관련 포스팅 완료
- Sortable.js 때문에 고생했음
- 블랙커피 스터디 덕분에 공부를 많이 했음
- 부스트 캠프 리뷰어 활동
- 넥스트 스텝 리뷰어 활동
- 프로그래머스 리액트 스터디
- 기능반 학생들 지도 및 입상
- 9월 코덕 랭킹 1위

***

마지막은 주인님 사진으로 마무리!

![포동이](https://user-images.githubusercontent.com/18749057/96334155-86ae0100-10a9-11eb-95bc-ad5d5a3f19ff.jpeg)

