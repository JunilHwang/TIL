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



## 사적

### 1. Black Coffee Study

### 2. 부스트캠프 리뷰어 활동

### 3. 넥스트스탭 리뷰어 활동

### 4. 기능경기대회

### 5. 프로그래머스 리액트 스터디

### 6. 네이버 아폴로 챌린

## Summary