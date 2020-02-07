---

title: MVVM System 개선하기 (3)
description: MVVM System을 최종적으로 어떻게 개선하였는지 설명합니다.
date: 2020-02-07
sidebarDepth: 2
feed:
  enable: true

---

# MVVM System 개선하기 (3)

::: tip 해당 포스트는 아래의 내용들을 토대로 정리한 것입니다.

- [코드스피츠 86기 5회차 동영상](https://www.youtube.com/watch?v=r4vOF7WpxgM&t=868s)
- [코드스피츠 86기 5회차 교안](https://www.youtube.com/redirect?event=video_description&v=5UUISCK6CL4&q=https%3A%2F%2Fgist.github.com%2FhikaMaeng%2Fae5301b2808afd150c4f55a47bd9466a&redir_token=fgYZoCbcsU8p-Oa6Bb3WraDTBQx8MTU4MTEyOTUwMUAxNTgxMDQzMTAx)

:::

## ViewModelListener 개선

[MVVM System 개선하기 (1)](../03-Strategy-Observer)에서 만든 Binder의 viewmodelUpdated는 문제가 있다.

```js{4}
  viewmodelUpdated (updated) {
    const items = {}
    this.#items.forEach(({ vmName, el }) => {
      items[vmName] = [type(rootViewModel[vmName], ViewModel), el]
    })
    updated.forEach(({ subKey, category, k, v }) => {
      if (!items[subKey]) return
      const [vm, el] = items[subKey], processor = this.#processors[category]
      if (!el || !processor) return
      processor.process(vm, el, k, v)
    })
  }
```

rootViewModel은 client 코드에서 생성한 전역변수(전역객체)이다.
그런데 이 전역변수를 지금 viewmodelUpdate에서 사용하고 있는 것이다.
이 부분을 개선해야 한다.

```js{3,5,8}
const ViewModelListener = class extends {
  /* 생략 */
  viewmodelUpdated (updated, viewmodel) { throw 'override!' }
}
const Binder = class extends ViewModelListener {
  viewmodelUpdated (updated, viewmodel) {
    const items = {}
    this.#items.forEach(({ vmName, el }) => {
      items[vmName] = [type(viewdmoel[vmName], ViewModel), el]
    })
    updated.forEach(({ subKey, category, k, v }) => {
      if (!items[subKey]) return
      const [vm, el] = items[subKey], processor = this.#processors[category]
      if (!el || !processor) return
      processor.process(vm, el, k, v)
    })
  }
}
```

viewmodel을 인자로 받아오도록 해야 한다.
그런데 viewmodelUpdated는 Binder에만 있는게 아니라 ViewModel에도 존재한다.
그리고 ViewModel에서 notify로 Binder에게 최신 정보를 보내게 된다. 이 코드 또한 수정해야 한다.

```js
const ViewModel = class extends ViewModelListener {
  /* 생략 */
  notify () { this.#listeners.forEach(v => v.viewmodelUpdated(this.#isUpdated, this)) }
  // ViewModel에서 실행한 viewmodelUpdated는 viewmodel 인자를 사용하지 않는다.
  viewmodelUpdated (updated, viewmodel) { updated.forEach(v => this.#isUpdated.add(v)) }
}
```

그런데 [MVVM System 개선하기 (2)](../04-ISP-Visitor)에서 만든 viewmodelUpdated는 위와 같이 단순하지가 않다.

ViewModelSubject와 Binder가 계약(의존 관계)을 맺는다.

- ViewModelSubject는 notify를 통해 Binder에게 viewmodel의 updated 내역을 알린다.

그런데 이 때 앞서 작성한 코드를 그대로 사용할 경우,
Binder에서 받아들이는 viewmodel이 ViewModelSubject일 수도 있고, ViewModel일 수도 있게 된다.

이 것을 해결하기 위해 ViewModelSubject에 넘기는 Parameter(viewmodel)를 ViewModel에게 위임해야 한다.

```js{3}
const ViewModelSubject = class extends ViewModelListener {
  // ... 생략
  notify () { this.#listeners.forEach(v => v.viewmodelUpdated(this.#info, this.notifyTarget)) }
  get notifyTarget () { throw 'must be override!' } // ViewModel에게 위임한다.
}
``` 

이렇게 notifyTarget이라는 getter method를 통해 위임을 하고

```js{2}
const ViewModel = class extends ViewModelSubject {
  // ... 생략
  get notifyTarget () { return this } // notifyTarget을 호출하면 ViewModel을 보낸다.
}
```

그리고 Binder의 코드도 다음과 같이 변경되어야 한다.

```js{3}
const Binder = class extends ViewModelListener {
  // .. 생략
  viewmodelUpdated(updated, target, _1 = type(target, ViewModel)){ // target은 ViewModel 이여야 한다.
    const items = {}
    this.#items.forEach(({ vmName, el }) => {
      items[vmName] = [type(target[vmName], ViewModel), el]
    })
    updated.forEach(({ subKey, category, k, v }) => {
      if (!items[subKey]) return
      const [vm, el] = items[subKey], processor = this.#processors[category]
      if (!el || !processor) return
      processor.process(vm, el, k, v)
    })
  }
}
```

주석에도 표기했지만, Binder가 받아들이는 viewmodel(target)은 ViewModelSubject가 아니라 ViewModel이여야 한다.

이렇게 추상 계층을 분리하게 될 경우, 각각의 계층에서 해결하도록 만들어야 한다.

## Processor 개선

