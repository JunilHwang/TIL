---

title: MVVM 개선하기
description: 다양한 Design Pattern을 이용하여 MVVM System을 개선하는 방법에 대해 소개합니다.
date: 2020-01-28
sidebarDepth: 2

---

# MVVM 개선하기

다양한 Design Pattern을 이용하여 MVVM System을 개선하는 방법에 대해 소개합니다.

## Strategy

`Strategy(전략)`이란 쉽게 말해서 프로그램을 만들었을 때 핵심적인 부분을 의미한다. 이전에 MVVM System을 만들 때 만든 Binder의 코드를 분해해보면 다음과 같다.

::: tip Structure

먼저 Binder에 대한 `자료구조` 부분이다.

``` js{2-5}
const Binder = class {
  #items = new Set()
  add (v, _ = type(v, BinderItem)) { this.#items.add(v) }
  render (viewmodel, _ = type(viewmodel, ViewModel)) {
    this.#items.forEach(item => {
      const vm = type(viewmodel[item.viewmodel], ViewModel), el = item.el
      Object.entries(vm.styles).forEach(([k, v]) => el.style[k] = v)
      Object.entries(vm.attributes).forEach(([k, v]) => el.attribute[k] = v)
      Object.entries(vm.properties).forEach(([k, v]) => el[k] = v)
      Object.entries(vm.events).forEach(([k, v]) => el[`on${k}`] = e => v.call(el, e, viewmodel))
    })
  }
}
```
:::

::: tip Control

`자료구조`를 제어하는 부분이다.

``` js{7-10}
const Binder = class {
  #items = new Set()
  add (v, _ = type(v, BinderItem)) { this.#items.add(v) }
  render (viewmodel, _ = type(viewmodel, ViewModel)) {
    this.#items.forEach(item => {
      const vm = type(viewmodel[item.viewmodel], ViewModel), el = item.el
      Object.entries(vm.styles).forEach(([k, v]) => el.style[k] = v)
      Object.entries(vm.attributes).forEach(([k, v]) => el.attribute[k] = v)
      Object.entries(vm.properties).forEach(([k, v]) => el[k] = v)
      Object.entries(vm.events).forEach(([k, v]) => el[`on${k}`] = e => v.call(el, e, viewmodel))
    })
  }
}
```
:::

::: tip Strategy

마지막으로 Binder의 핵심인 알고리즘 부분에 해당하는 부분이다.

- `([k, v]) => el.style[k] = v`
- `([k, v]) => el.attribute[k] = v`
- `([k, v]) => el[k] = v`
- `([k, v]) => el[`on${k}`] = e => v.call(el, e, viewmodel)`

:::

Strategy는 Structure와 분리되어 작동할 수 없다. Strategy는 Structure를 가지고 있어야 작동한다. 객체지향에서는 이것을 composition이라는 기법을 이용하여 해결한다.

> code를 object(객체)로 바꾼다. object를 도출할 때 형태가 있어야 한다. 그래서 interface와 class로 도출해야 한다.

이럴 경우, binder는 startegy 객체에 대한 dependency가 생기게 된다.

::: tip 객체지향에서 Dependency가 발생하는 이유

나의 strategy를 외부에 있는 객체의 도움으로 해결하기 때문이다.

:::