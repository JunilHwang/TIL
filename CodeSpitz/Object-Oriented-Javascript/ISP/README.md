
---

title: MVVM System 개선 (2)
description: ISP 원칙을 적용하여 MVVM System을 더욱 개선합니다.
date: 2020-02-03
sidebarDepth: 2
feed:
  enable: true

---

# MVVM System 개선하기 (2)

::: tip 해당 포스트는 아래의 내용들을 토대로 정리한 것입니다.

- [코드스피츠 86기 4회차 동영상](https://www.youtube.com/watch?v=r4vOF7WpxgM&t=868s)
- [코드스피츠 86기 4회차 교안](https://www.youtube.com/redirect?event=video_description&redir_token=XLwW9xXpx7jguNfQtusWz-xpQG18MTU4MDc3MTMzNEAxNTgwNjg0OTM0&q=https%3A%2F%2F1drv.ms%2Fb%2Fs%21As25AGJ08guuhLNW7fuz3TgPMCZSkA&v=r4vOF7WpxgM)

:::

객체지향 프로그램이란 처음에 이루고하자는 목표에서부터 덩어리진 것을 차근차근 분리하고 깎아내는 과정이다 -> Agile 개발론에 적합하다

깎아내는 기준 : 역할과 책임

책임과 역할은 비슷하지만 동전의 양면과 같다.

책임을 진다는 것은, 책임에 맡는 권한도 갖고 있다.

책임이 없는데 권한이 없거나, 권한이 없는데 책임이 있다면 문제가 생긴다.