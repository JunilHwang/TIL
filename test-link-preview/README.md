---

title: 링크 미리보기 테스트
description: markdown-it 플러그인으로 구현한 링크 미리보기 기능 테스트
date: 2025-01-20
tag: test, link-preview, markdown

---

# 링크 미리보기 테스트

이 페이지는 markdown-it 플러그인으로 구현한 링크 미리보기 기능을 테스트하는 페이지입니다.

## 컨테이너 방식 테스트

- 링크

::: link-preview https://kimfield.tistory.com/entry/%ED%95%AD%ED%95%B4%ED%94%8C%EB%9F%AC%EC%8A%A4-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-2%EA%B8%B0-%EC%88%98%EB%A3%8C-%EA%B3%BC%EC%A0%9C%EB%A7%8C-%EB%A7%A4%EC%A3%BC-%EC%A0%9C%EC%B6%9C%ED%95%98%EC%9E%90%EA%B3%A0-%EB%8B%A4%EC%A7%90%ED%96%88%EB%8D%98-%EC%82%AC%EB%9E%8C%EC%9D%98-10%EC%A3%BC-%ED%9A%8C%EA%B3%A0-%EC%A0%95%EB%A7%90-%ED%9E%98%EB%93%A4%EC%97%88%EB%82%98%EC%9A%94-%EB%84%A4-%EB%B6%80%EC%A0%9C-%EB%8F%88-%EB%82%B4%EA%B3%A0-%EA%B5%90%EC%9C%A1-%EB%93%A3%EB%8A%94-%ED%98%84%EC%97%85-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%97%AC%EA%B8%B0-%EB%A7%8E%EC%95%84%EC%9A%94
:::

::: link-preview https://vuepress.vuejs.org/
:::

::: link-preview https://www.npmjs.com/package/node-html-parser
:::

## 일반 링크 테스트

다음은 일반적인 마크다운 링크들입니다:

- [GitHub](https://github.com)
- [Vue.js](https://vuejs.org)
- [VuePress](https://vuepress.vuejs.org)

## 단순 URL 테스트

https://github.com/JunilHwang/TIL

https://vuepress.vuejs.org/

https://www.notion.so

## 다양한 사이트 테스트

::: link-preview https://www.youtube.com/watch?v=dQw4w9WgXcQ
:::

::: link-preview https://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags
:::

::: link-preview https://developer.mozilla.org/ko/docs/Web/JavaScript
:::
