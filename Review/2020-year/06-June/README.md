---

title: 2020년 6월 회고
description: 2020년 6월 회고 입니다.
sidebarDepth: 2
date: 2020-06-30

---

# 2020년 6월 회고

이번 달은 [크롬 확장프로그램](https://chrome.google.com/webstore/detail/zum-newtab/bghgeookcfdmkoocalbclnhofnenmhlf?hl=ko&authuser=2)과 싸웠고,
**NextStep**의 [클린코드를 위한 TDD, 리팩토링 with Java](https://edu.nextstep.camp/c/8fWRxNWU) 과정을 무사히 수료했다.

## 공적

### 1. 크롬 확장프로그램

6월 업무는 말 그대로 **확장프로그램과의 전쟁**이었다. 개발이 어려운 게 아니라 _검수를 통과하는 게_ 무척 어려웠다.

![확장프로그램 검수 정보 1](https://user-images.githubusercontent.com/18749057/86334105-bb778300-bc87-11ea-804c-1abf82170b6b.png)

![확장프로그램 검수 정보 2](https://user-images.githubusercontent.com/18749057/86334283-fd082e00-bc87-11ea-9732-5f348891ec76.png)

_수 십 번의 검수 요청_ 끝에 확장프로그램을 게시할 수 있었다.

![확장프로그램](https://user-images.githubusercontent.com/18749057/86334687-83bd0b00-bc88-11ea-94c6-33f6971a01c7.png)

게시된 확장프로그램은 [여기](https://chrome.google.com/webstore/detail/zum-newtab/bghgeookcfdmkoocalbclnhofnenmhlf?hl=ko&authuser=2)서 확인할 수 있다. 아직 최종 완성은 아니고, 사내 테스트를 거쳐 조금 더 퀄리티를 높일 예정이다.

확장프로그램 검수 과정은 다음에 따로 정리해야겠다. 이곳에 담기엔.. 분량이 너무 많다.. ㅠㅠ

### 2. 의사 결정 과정

이번에는 CMS처럼 사내에서만 사용하는 서비스를 만드는 것이 아니라 **아예 신규 서비스를 만들었다.**\
신규 서비스를 만들 때 **주니어 개발자 스스로 결정할 수 있는 것**들은 사실 거의 없다.

주니어 개발자가 주로 하게 되는 일은 아마도 코드 작성일 것이다.\
_그럼 코드를 내 맘대로 작성해도 될까?_ 결론부터 말하자면 안 된다.\
회사에서 작성하는 코드는 나의 것이 아니다.

회사에서 작성한 나의 코드는 _회사의 것이고 팀의 것이다._ 그러므로 우리는 코드리뷰를 진행한다.

우리 회사에서 코드리뷰를 하는 목적은 해당 프로젝트를 _내가 아닌 다른 사람이 백업 가능할 수 있도록 하는 것이 첫 번째 목적이다._

코드리뷰를 통하여 코드 스타일을 통일할 수 있고, 프로젝트의 구조를 파악할 수 있기 때문이다. 

::: tip 줌인터넷 포털개발팀
웃픈 이야기지만, 우리 팀은 이직률이 높은 편이다.
우리들끼리의 이야기로 줌인터넷은 어떻게 보면 대학원(?) 과정이라고 한다.
더 좋은 회사로 가기 위한 발판이랄까?

그래서 팀장님이 많이 고통받고 계신다...

![팀장님 하소연 1](https://user-images.githubusercontent.com/18749057/87239420-fc228980-c449-11ea-9441-e80ae62393b6.png)

![팀장님 하소연 2](https://user-images.githubusercontent.com/18749057/87239366-4ce5b280-c449-11ea-9421-79231c4310e7.png)

~~이젠 그냥 체념하신 것 같은 느낌..?~~ 

그렇기 때문에 누군가 이직을 했을 때 _남겨진 사람이 떠난 사람의 빈자리를 충분히 메꿀 수 있도록_ 코드를 작성해야 한다.
그래야 팀과 서비스가 유지 된다.
:::

결국 내가 작성한 코드조차 나의 것이 될 수 없다.
그래서 주관적인 시선이 아니라 **객관적인 시선**으로 코드를 작성하는 연습이 필요하다.

사실.. 많이 어렵다. 아무리 쉽게 코드를 작성한다고 하더라도 한계가 있기 때문이다.
그래서 주석을 최대한 많이 활용하는 중이다. ~~너무 귀찮아!!~~

특히, intellij와 [jsdoc](https://jsdoc.app/)의 호환성이 좋아서 적극 응용 중이다.

어쨌든 주니어 개발자가 결정할 수 있는 것들은 지극히 한정적이다.
무엇 하나 맘대로 할 수 있는 것이 없다
_그렇기 때문에 같이 일하는 사람들의 생각을 항상 존중하고 또 따라가려고 애쓰는 중이다._

### 3. Quality assurance

확장프로그램을 만드는 과정에서 QA를 진행했는데, 생각보다 나쁘지 않았다.
그리고 **이 정도는 해야 괜찮은 서비스가 나오는 것**을 느낄 수 있는 경험이었다.

먼저 개발자로서 할 수 있는 테스트를 한다.

- 코드상의 오류 확인
- 타입 검증
- 콘솔에 나오는 오류/경고 문구 해결
- 성능 테스트
- 메모리 누수 확인
- 캐싱/스케쥴링 확인

이렇듯 _개발자가 아니면 할 수 없는 것들_ 위주로 먼저 검증을 진행한다.
그다음 제품이 기획서의 명세대로 만들어졌는지 일차적인 검수 및 수정 과정을 거친다. 

그리고 기획자분들이 한 번 더 꼼꼼하게 QA를 진행한다. 마지막으로 큐레이션팀이 정말 섬세하게 QA를 진행한다. 이 과정에서 약간 자괴감이 든다.

_왜 나는 이렇게까지 꼼꼼하게 검수를 하지 못했을까? 왜 이제서야 이러한 버그를 발견한 걸까? 하는 자괴감 말이다._

조금 더 내가 만드는 서비스에 애정을 가지고 테스트를 진행해야겠다.

## 사적

### 1. Java Clean Code

NextStep의 [클린코드를 위한 TDD, 리팩토링 with Java](https://edu.nextstep.camp/c/8fWRxNWU) 를 6월 중순까지 마무리했다.
내가 무사히 수료할 수 있을까 고민했는데, 운이 좋게 제일 먼저 수료할 수 있었다.

::: tip 해당 과정을 진행하면서 올린 PR(코드리뷰) 모음

- Racingcar
  - [step1: String 클래스에 대한 학습](https://github.com/next-step/java-racingcar/pull/716)
  - [step2: 문자열 계산기](https://github.com/next-step/java-racingcar/pull/761)
  - [step3: 자동차 경주](https://github.com/next-step/java-racingcar/pull/826)
  - [step4: 자동차 경주 우승자](https://github.com/next-step/java-racingcar/pull/870)
  - [step5: 자동차 경주 리팩토링](https://github.com/next-step/java-racingcar/pull/984)
- Lotto
  - [step1: 문자열 덧셈 계산](https://github.com/next-step/java-lotto/pull/495)
  - [step2: 로또 (1)](https://github.com/next-step/java-lotto/pull/509)
  - [step2: 로또 (2)](https://github.com/next-step/java-lotto/pull/527)
  - [step3: 로또 2등 (2)](https://github.com/next-step/java-lotto/pull/532)
  - [step3: 로또 2등 (2)](https://github.com/next-step/java-lotto/pull/541)
  - [step4: 로또 수동](https://github.com/next-step/java-lotto/pull/550)
- Ladder
  - [step1: Stream, Lambda, Optional](https://github.com/next-step/java-ladder/pull/389)
  - [step2: 사다리 생성](https://github.com/next-step/java-ladder/pull/396)
  - [step3: 사다리 게임 실행](https://github.com/next-step/java-ladder/pull/399)
  - [step4: 리팩토링](https://github.com/next-step/java-ladder/pull/407)
- Ladder
  - [step1: Stream, Lambda, Optional](https://github.com/next-step/java-ladder/pull/389)
  - [step2: 사다리 생성](https://github.com/next-step/java-ladder/pull/396)
  - [step3: 사다리 게임 실행](https://github.com/next-step/java-ladder/pull/399)
  - [step4: 리팩토링](https://github.com/next-step/java-ladder/pull/407)
- Bowling
  - [step1: 질문 삭제하기 기능 리팩토링](https://github.com/next-step/java-bowling/pull/155)
  - [step2: 볼링 점수판](https://github.com/next-step/java-bowling/pull/157)
  - [step3: 볼링 점수판 점수 계산](https://github.com/next-step/java-bowling/pull/164)
  - [step4: 볼링 점수판 n명](https://github.com/next-step/java-bowling/pull/165)
:::

약간의 소감을 이야기 해보자면, 시작(Racingcar)과 끝(Bowling)이 어려웠다.

시작할 때는 자바 자체에 익숙하지 않다 보니, 말 그대로 모든 것들이 생소했다.
그나마 스트림은 어느 정도 사용할 줄 알았기 때문에 코드를 짧게 작성한다던가, **if나 while, for 없이 작성하는 것**은 어렵지 않았다.

그런데 일급 컬렉션이나 원시값 포장 같은 개념은 쉽게 이해되지 않아서 애먹었다.
이러한 문제점을 보완하기 위해서 _실력이 뛰어난 다른 수강생분들이나 코드리뷰를 해주시는 리뷰어분들이 이 과정을 수행할 때 작성했던 코드를 보면서 많이 참고했다._

> 개인적으로 생각하는 나의 장점 중 하나가 주변에 있는 뛰어난 사람들에게 주눅 들기보단 그 사람들의 노하우나 사고방식, 가치관을 잘 받아들이는 점이다. 

결과적으로 초반에 애먹은 덕분에 Lotto와 Ladder는 쉽게 통과할 수 있었다.

마지막 미션인 Bowling은 설계 자체가 정말 어려웠다. _어떻게 설계하지?_ 라는 고민을 일주일 내내 했던 것 같다.
그래서 step2를 진행할 때, 지웠다가 썼다를 반복하다 보니 무려 한 step에 45개의 커밋이 발생했다.

step1을 6월 9일에 완료했고, step2를 6월 16일에 완료했다. 그리고 step3, step4는 각각 18일, 20일에 완료했다.
정말 step2에서 설계에 대한 고민을 일주일 내내 한 것이다. 덕분에 step3와 step2는거의 바로 끝낼 수 있었다.   

**어쨌든 결과적으로 해당 과정을 전체 인원 중 첫 번째로 수료할 수 있었다.**

![클린코드 수료](https://user-images.githubusercontent.com/18749057/87239161-d778e280-c446-11ea-808f-2f3e2d8966e4.png)

내가 실력이 좋아서라기보단, _하루도 쉬지 않고 꾸준히 했기 때문에 이런 성과를 낼 수 있었으리라 생각한다._

::: tip 꾸준히 공부하는 습관을 지니자

_5월에는 코덕 1등을 했고, 6월에는 클린코드 1등을 했다._

항상 한계점의 페이스를 유지하기보단, 한 번 한계점까지 도달한 후에 70% ~ 80% 정도를 유지하는 게 좋다고 생각한다.
그렇지 않으면 _너무 빨리 지치기 때문이다._

나는 줌인터넷에 입사한 다음에 주변 자극을 적극적으로 수용하고 있다.
그중에 제일 인상 깊었던 것은 우리 팀을 거쳐 간 [우아한형제들에서 근무하고 계신 이동욱 님의 인터뷰](https://www.youtube.com/watch?v=V9AGvwPmnZU&t=174s)이다.
무언가를 거창하게 하기보단 **그냥 매일 꾸준히 하는 것**이다. 확실히 나에게는 이 사고방식과 가치관이 맞아떨어진다. 

* 근데 이동욱 님은 굉장히 많은 것을 하고 계신다. ~~인간이 아닌 듯~~

:::

전체 과정을 수료한 다음에 미션별로 파편화된 코드를 [한 저장소](https://github.com/junilhwang/java-clean-code)에 모아놨다. ~~사실 깃허브 잔디에 반영하고 싶었다.~~

![java-clean-code-repository](https://user-images.githubusercontent.com/18749057/87239173-f5464780-c446-11ea-9383-9ae7cfcc95d0.png)

모아놓고 보니 _두 달 동안 약 600개의 commit이 발생했다._ 내가 개발 공부를 이렇게 열심히 했던 적이 있었나 싶다. ~~사실 고등학교 3학년 여름방학 때 제일 열심히 했다.~~

### 2. DKU Study

4월 말부터 [여자친구](https://github.com/eyabc)가 운영하고, 내가 멘토(?)로 활동하고 있는 [단국대학교 알고리즘 스터디](https://github.com/DKU-STUDY)에 대한 내용이다.

::: tip TMI(Too much Information)

본인과 여자친구는 단국대학교 소프트웨어 학과의 CC(캠퍼스 커플)이다.

나와 여자친구는 학교 다닐 때 학부 내에 학생들에게 도움이 되는 동아리나 스터디 같은 게 거의 없다는 것이 참 아쉬웠다.
그래서 같이 그런 스터디를 만들어서 운영해보자며 해당 스터디를 시작했다.

:::

6월에는 기말고사가 있기 때문에 활동이 매우 활발하진 않았다. 그래도 하는 사람은 꾸준히 했다.

어느새 [DKU-STUDY/Algorithm](https://github.com/DKU-STUDY/Algorithm) 저장소의 커밋이 1000개가 넘었다. ~~(사실 6월이 아니라 7월에 넘겼다.)~~

![알고리즘 스터디](https://user-images.githubusercontent.com/18749057/87239179-0ee78f00-c447-11ea-9428-b2bb4cea50a2.png)

그리고 기존에 카톡으로 운영하던 채팅방을 디스코드로 옮겼다.
디스코드로 옮기면서 디스코드의 _Channel API, Bot, github webhooks_ 등을 이용하여 [깃허브 알림 봇](https://github.com/JunilHwang/discord-study-bot)을 만들었다.

![디스코드 채팅방](https://user-images.githubusercontent.com/18749057/87239216-7e5d7e80-c447-11ea-8af4-ee489355b683.png)

아직 API에 직접 정의한 템플릿과 채널에 대해서만 알림을 보내고 있다. _7월에는 CMS를 구축하여 조금 더 유연하게 관리할 수 있도록 생각 중이다._

추가로 7월에는 알고리즘 이외에 다양한 주제의 스터디를 할 예정이다. ~~(물론 운영은 스터디장 님이..)~~

개인적으로 해보고 싶은 것은, 이번에 수강한 _java clean code의 내용을 typescript로 다듬어서 운영해보는 것이다._
지금 당장 하기는 힘들고, 준비 과정이 ~~조금이 아니라~~ 많이 필요할 것 같다.

### 3. 프로그래머스 챌린지

이번 달에는 프로그래머스 챌린지가 없었다.
그나마 참여할 수 있었던 챌린지는,
지난달에 신청한 [카카오 경력 개발자 영입 프런트엔드 개발 챌린지](https://programmers.co.kr/competitions/151/2020-kakao-fe-recruitment)였다.

1차는 알고리즘 테스트, 2차는 VanillaJS 테스트였다. 

일단 1차 알고리즘 테스트는 카카오에서 낸 문제 치곤 생각보다 쉬웠다.\
__* 여태까지 응시했던 카카오 코딩 테스트는 모두 극악의 난이도를 자랑했다.__

그래도 통과할 만큼의 솔루션은 아니라고 생각했기 때문에 2차 코딩테스트는 기대하지 않았다.
그런데, 정말 운이 좋았던 건지 1차 테스트를 통과해서 2차 테스트도 응시할 수 있었다.

2차 테스트의 문제 또한 프로그래머스에서 여태까지 나왔던 프런트엔드 개발 과제 중에 제일 만족스러웠다. ~~사실 우아한테크코스 문제 빼곤 다 좋았다~~

고민이 필요한 문제들이 꽤 있어서 좋은 경험이 되었다!

### 4. 코덕

5월에 코덕에서 1등을 했기 때문에 6월은 쉬엄쉬엄했다. 그래도 6등으로 마무리 할 수 있었다.

![코덕 6등](https://user-images.githubusercontent.com/18749057/87239582-e4e49b80-c44b-11ea-9808-77965ecca802.png)

그리고 코덕에서 측정하길, 하루에 30회 이상의 커밋을 했다고 한다.

![평균 커밋](https://user-images.githubusercontent.com/18749057/87239574-c383af80-c44b-11ea-9606-d348dc297079.png)

이보다 더 기분 좋은 사실은, 코덕에서 통계를 내는 그룹 중 DKU-STUDY가 거의 압도적인 1등이라는 점!

![코덕 그룹 1등](https://user-images.githubusercontent.com/18749057/87239588-f0d05d80-c44b-11ea-9514-ee12b269bfa0.png)

2등과 2000점 정도 차이 난다.

약간의 아쉬운 점은, 커밋은 매일 했으나 푸쉬를 매일 하지 않아서 일일 커밋 스티커를 받지 못했다.. 코덕의 시스템이 수정되길 간절히 바라고 있다.. ~~너무 아쉽다~~

## 개발외

### 1. 수영

이번 달도 열심히 수영하러 다녔다. 이제 배영/자유영은 꽤 잘할 수 있다. ~~다만 오래 못한다.. 아직까진 저질 체력..~~

그래서 평영을 연습 중인데 아직 나는 개구리가 되려면 멀지 않았나 싶다.. 허허

그런데 6월 말부터 회사에서 **Work+** 라는 제도를 만들어서 **재택근무**를 할 수 있도록 해줬다.
그런데 수영을 하려면 회사 앞으로 와야 하기 때문에.. 지금 굉장히 고민 중이다.

강습은 월/수/금인데, 월/목은 고정출근을 해야 하고 화/수/금은 선택적 재택근무를 할 수 있다.
그래서 주 2회 재택을 하고 강습 2회, 자유 수영 1회 정도로 생각 중이다.

### 2. 오버워치

자바 클린코드 과정을 모두 수료한 직후에 갑자기 번아웃이 왔다.
번아웃이라기보단, 한동안 일상에서 큰 비중을 차지하고 있던 일이 사라지니까 그 시간을 어떻게 메꿔야 좋을지 몰라서 방황했다.

그래서 수료한 직후에 주말 내내 원없이 오버워치만 했다.

![오버워치](https://user-images.githubusercontent.com/18749057/87240018-8b32a000-c450-11ea-91ea-1fcd41ecbd76.jpeg)

약 2일만에 마스터를 찍었다. ~~오버워치만 맨날 했으면 좋겠다!!~~

오버워치.. 참 잘 만든 게임인데 유저가 다 망쳐가고 있어서 아쉽다. 빨리 오버워치2가 나왔으면 하는 바람!

## Summary

- 크롬 확장프로그램 개발
- 자바 클린코드 수료
- 카카오 코딩테스트 응시
- DKU-STUDY 잘 운영 중
- 코덕 6등
- 평형을 잘하고 싶다 ~~(개구리가 되고 싶다.)~~
- 오버워치 재밌다.