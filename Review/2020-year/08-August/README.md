---

title: 2020년 8월 회고
description: 2020년 8월 회고 입니다.
date: 2020-10-03 00:21:00
sidebarDepth: 2
feed:
  enable: true

---

# 2020년 8월 회고

7월 못지 않게 8월도 꽤나 바쁘게 지낸 것 같다.

## 공적

### 1. Sentry 적용

[Sentry](https://sentry.io/welcome/)는 서비스내에서 오류가 발생했을 때 다양한 방식으로 개발자에게 알려주는 제공해주는 서비스다.

이번에 사내 프로젝트에 `Sentry`를 적용했다.
내가 담당하고 있는 프로젝트는 약 4개 정도 있었고, 적용하는 것도 딱히 어렵진 않았다.

`Sentry`를 적용하면서 좋았던 점은, 서비스가 내재하고 있는 문제점들을 어느정도 파악할 수 있다는 점이다.
사내 서비스의 경우 망 분리가 철저하게 되어있기 때문에 직접 로그를 보거나 에러를 실시간으로 확인하는게 수월하지 않은 상태이다.
그런데 `Sentry`를 적용하면서 실시간으로 에러를 확인할 수 있게 되었고, 에러 발생시에 알림도 오기 때문에 여러가지 문제점을 확인하기가 쉬웠다.

![Sentry](https://user-images.githubusercontent.com/18749057/94988755-95c18900-05aa-11eb-9221-f11c86da4d9e.png)

위의 사진 처럼 여태까지 큰 문제 없이 굴러가고 있다고 생각했던 API들이 사실 폭탄투성이였다.
그래서 해당 API의 담당자들과 상의하여 문제를 해결하는 기회를 가질 수 있었다.
하지만 워낙 꼬여있는 로직들이 많다보니 어쩔 수 없이 방치해야 하는 부분들도 있기 때문에 조금 찝찝하다.

어쨌든 결과적으로 `Sentry` 도입으로 인하여 해결 가능한 문제들은 빠르게 조치할 수 있었고,
당장 해결하지 못한 부분도 있지만 어느 정도 문제점을 인지할 수 있기 때문에 장애가 발생했을 때 어느 정도 선방이 가능하게 되었다.
      

### 2. 크롬 확장프로그램

::: tip
확장프로그램에 대한 자세한 내용은 [줌인터넷 기술블로그 - 크롬 확장프로그램 개발 회고](https://zuminternet.github.io/Zum-Chrome-Extension/)에서 확인해볼 수 있습니다!
:::

![크롬 확장프로그램](https://user-images.githubusercontent.com/18749057/95010212-7128e800-0662-11eb-918d-da7a31d64d7f.png)

확장프로그램 베타 버전은 이미 지난 달에 완성되었으나 스토어 게시요청이 계속 반려되면서 이후의 일정이 계속 지연되고 있었다.
반려의 원인은 `http` 때문인데, 가능하면 모든 요청에 `SSL`을 적용하는 것이 좋다.
문제는 확장프로그램에서 사용하는 사내 서비스 중에 쉽게 `https`로 전환할 수 없는 부분이 있었으며
팀 내에서 자체적으로 이 문제를 해결할 수 없는 상태였고, 인프라팀에 업무요청을 하여 처리해야 했다.
근데 인프라팀에서도 이것 저것 밀린 일정이 많다보니 `https` 전환을 바로 처리하기가 곤란한 입장이었다.

일단 혹시나 하는 마음에 `URL`만 `https`로 변경하여 검수 요청을 시도했고, 결과는 예상과 다르게 통과했다. ~~막장이네 구글놈들.~~ 
그래서 아예 `Apache`설정에서 `https://pass.abc.com`으로 요청하면 `http://abc.com`으로 `redirect` 되도록 설정해놨다.

그렇게 검수도 통과 했고, 확장프로그램도 문제 없이 작동하게 되었다.

확장프로그램은 **사내에서 꽤 긍정적인 반응**을 보이고 있고, 조금 더 완성도를 높여 사용자에게 선보일 예정이다.  

### 3. Mobile API 분리 이전

드디어 `Zum Front Backend Project`에서 `Mobile`를 관련 코드를 완전히 분리하여 `Zum Mobile Backend Project`로 만들었다.
다음과 같이 기존에는 하나의 프로젝트에 너무 많은 코드가 존재했다.

@startuml
node "Zum Front" as ZumFront
node "Zum Mobile" as ZumMobile
node "Zum App API" as AppAPI

node "Zum Front BackEnd Project" {
    node "API" as APIS {
        node "Chrome Extension API" as EXT
        node "Mobile API" as Mobile
        node "Common API" as Common
        node "Hub API" as Hub
        node "Ad API" as Ad
    }
    node Adapter
    node Batch
    node Admin
    node Domain
}

Adapter --down-> APIS
Domain --down-> Hub
Admin --down-> Hub
Batch --down-> Hub
AppAPI <--up- Mobile
AppAPI <--up- Common
AppAPI <--up- EXT
ZumMobile <--up- Mobile
ZumMobile <--up- Common
ZumFront <--up- Hub
ZumFront <--up- Ad
@enduml

덕분에 하나의 프로젝트에 담당자도 많았고 잠재적인 위험도 역시 무시할 수 없었다.

일단 위에 언급한 코드 중 제일 빈번하게 배포와 수정이 발생하는 부분은 Mobile API이기 때문에 분리하기로 결정했다.

Mobile API는 DB를 사용하고 있지 않았고, Domain 관련 코드도 없었다.
그래서 생각보다 쉽게 분리할수 있었다.

분리한 다음의 형태는 다음과 같다. 


@startuml
node "Zum Front" as ZumFront
node "Zum Mobile" as ZumMobile
node "Zum App API" as AppAPI

node "Zum Front BackEnd Project" {
    node "API" as FrontAPIS {
        node "Hub API" as Hub
        node "Ad API" as Ad
    }
    node Adapter as FrontAdapter
    node Batch
    node Admin
    node Domain
}

node "Zum Mobile BackEnd Project" {
    node "API" as MobileAPIS {
        node "Chrome Extension API" as EXT
        node "Mobile API" as Mobile
        node "Common API" as Common
    }
    node Adapter as MobileAdapter
}

MobileAdapter --down-> EXT
MobileAdapter --down-> Mobile
MobileAdapter --down-> Common
FrontAdapter --down-> Hub
FrontAdapter --down-> Ad
Domain --down-> Hub
Admin --down-> Hub
Batch --down-> Hub
AppAPI <--up- Mobile
AppAPI <--up- Common
AppAPI <--up- EXT
ZumMobile <--up- Mobile
ZumMobile <--up- Common
ZumFront <--up- Hub
ZumFront <--up- Ad
@enduml

분리 과정에서 리팩토링도 진행하고, 시스템 환경도 변경하는 등의 추가작업도 있었다. 앞서 언급한 `Sentry`도 적용했다.

어쨌든 조금 더 관리하기가 수월해진 것은 확실하다.

### 4. CMS 작업 (feat. Legacy)

8월까지 작업하고 있던 CMS 개발을 마무리해야 했다. 사실 7월에 대부분의 기능을 만들어놔서 8월에 내가 할 일은 많지 않았다.
일단 미리보기 작업을 위해서 CMS와 엮여있는 Zum Lego Project를 분석해야 했다.

Zum Lego Project는 굉장히 오래전부터 많은 사람들의 손을 거쳐 관리되어온 레거시 프로젝트다.
덕분에 왜 이렇게 만들어졌는지 의문을 갖게 될 수 밖에 없는 코드들이 굉장히 많았고, 구조의 복잡도 또한 심상치 않았다.
~~차라리 처음부터 만들고 말지~~

언젠간 사수가 이직하게 된다면, 이 프로젝트의 담당자는 내가 될 것이다. 생각만해도 끔찍하다... 😭

_그리고 그 시기는 멀지 않았다._

마음의 준비를 단단이 하고 있어야지..

어쨌든 CMS 작업은 생각보다 많지 않았다.
QA를 진행하고, 해당 사항을 반영하는 과정을 반복했는데 사실 반영하는 것도 굉장히 간단했기 때문에 큰 어려움은 없었다.

~~그리고 9월에 고통받았다~~

## 사적

8월에는 꽤 많은 일을 했다. 그래서 사실 굉장히 힘들었다.

### 0. 카카오 면접관련

7월 말에 면접을 봤고, 8월 초에 결과가 나왔다. **결론적으로는 떨어졌다.**
아마 여러가지 이유가 있겠지만 사실 그건 **지금의 나에게 중요하지 않다고 생각**한다.

이번에 면접 준비를 하면서 내적으로 스트레스를 너무 많이 받았다.
합격해도 문제고 합격을 하지 않아도 문제인 그런 상황이었다.
그냥 면접을 본 것 자체가 잘못 된게 아닐까?

어쨌든 입사한지 1년도 되지 않았고
이제 막 업무에 익숙해지기 시작했고
팀원과의 문제도 없고
연봉도 나쁘지 않았고
**이리보고 저리봐도 이직할 이유가 없었다.**

그래서 면접을 볼 당시 제일 대답하기 힘들었던 것이 이직을 하는 이유였다.
재미로 본 코딩테스트 때문에 최종 면접까지 가게 될 줄 누가 알았겠는가?

이 일 때문에 팀장님과 많은 이야기를 했다.
일단 현재의 나는 많이 부족하다는 것을 인정하기로 했다.
그리고 아직 사내에서 무언가를 뚜렷하게 보여주질 못했다.
조금 더 경험을 쌓고, 공부도 많이 하고, 이제 정말 떠날 때가 되었다고 생각이 들면 진짜 이직 준비를 해야지 아직은 아닌 것 같다.

팀장님이 말씀하시길 다른 회사에 갈거면

- 네이버, 라인, 카카오 같은 국내 기업이 아닌 **구글, 마이크로소프트 같은 해외 기업을 목표로** 하든가 😨
- 혹은 아예 **파격적인 조건으로 스카웃이 될 정도의 역량**을 갖추든가 😨

둘 중의 하나가 아니라면 그냥 이직은 아직 생각하지 말라고 하신다. ~~말이 쉽지~~

음.. 일단 이건 팀장님의 바람이고 😅 스스로에게 부족한 부분을 계속 해서 채워나가야겠다.

_너무 조급하게 생각하지 말자._
기회가 언제나 오진 않지만,
준비된 자만이 그런 기회를 쟁취할 수 있는 것이다.

_잘 준비 하자!_   

### 1. Next Step Reviewer

[클린코드를 위한 TDD, 리팩토링 with Java](https://edu.nextstep.camp/c/8fWRxNWU/)의 **8기를 좋은 성적으로 수료하게 되어 9기는 리뷰어 활동**을 할 수 있게 되었다.
이렇게 리뷰어로 활동하는게 처음이다보니 어떻게 해야 좋을지 고민이 많았었는데, 생각보다 수월하게 진행할 수 있었다.

![리뷰이](https://user-images.githubusercontent.com/18749057/95013250-0daab480-067a-11eb-8ae8-f74248a334d1.png)

8월 한 달 동안 10명을 리뷰했으며 그 중에 3명이 미션을 완료했다.
일단 각 미션당 5명, 전체 미션에 대해 최대 20명을 리뷰해야 한다.
그런데 생각보다 자동차 미션에서 포기하는 사람이 많은 것 같다.
아무래도 회사 일과 병해하는 사람이 많다 보니 미션 수행 자체가 굉장히 부담스러울 수 있기 때문이라 생각한다.

![리뷰](https://user-images.githubusercontent.com/18749057/95013428-2c5d7b00-067b-11eb-8ec9-c5b64796f5ad.png)

어쨌든 리뷰를 하면서 스스로도 굉장히 많이 성장할 수 있는 기회가 되었다.
그리고 리뷰이가 점점 좋은 코드를 만들어내는 과정에 참여할 수 있다는 것도 큰 행운이라고 생각한다.

javascript도 이런 식으로 참여/운영 해보고 싶다는 생각을 많이 하고 있다. 

### 2. Boost Camp Reviewer

8월 초에 네이버의 커넥트 재단에서 운영하는 부스트 캠프에서 리뷰어를 구한다는 소식을 접했다.

<img src="https://user-images.githubusercontent.com/18749057/95013561-02f11f00-067c-11eb-9b32-e343d5e7c265.png" alt="부스트 캠프 리뷰어 모집 공고(1)" width="400" />

대략적인 내용은 다음과 같았다.

<img src="https://user-images.githubusercontent.com/18749057/95013576-1e5c2a00-067c-11eb-8759-f7cf70cab6c7.png" alt="부스트 캠프 리뷰어 모집 공고(2)" width="700" />

::: tip 부스트캠프 리뷰어

내용에는 6주라고 되어 있는데, 웹 과정의 경우 백엔드/프론트엔드를 격주로 하기 때문에 총 3주 동안 활동하게 된다.

- 리뷰어마다 6명의 캠퍼(리뷰이)를 배정한다.
- 3주간 주 2회의 리뷰를 한다.
- 따라서 6명의 캠퍼에게 각각 6회, **총 36회의 리뷰**를 해야한다.

:::

NextStep의 리뷰어 활동은 java에 대한 리뷰이기 때문에 사실 스스로 생각하기에 약간 아쉬운점이 있었다.
나의 주력 언어는 javascript이고, 당연히 java보다 javascript를 더 좋아하기 때문이다.

그래서 부스트캠프의 리뷰어 모집 공고는 굉장히 반가웠다. 빠르게 지원했다.

단, 지원하기 위해서는 모집공고 저장소에 올라온 코드에 대해 [코드리뷰](https://github.com/connectfoundation/review_2020/pull/3)를 남겨야했다.

<img src="https://user-images.githubusercontent.com/18749057/95013663-beb24e80-067c-11eb-80f1-73e790f76d5e.png" alt="부스트 캠프 리뷰어 모집 공고(3)" width="700" />

일단 코드가 `React`로 작성되어 있어서 조금 당황했다. React는 취업 준비를 할 때 아주 잠깐 공부했고, hooks는 사용해본적도 없기 때문이다.
그래서 일단 코드 스타일, 변수명, 코딩컨벤션 위주의 리뷰를 했다. 

![image](https://user-images.githubusercontent.com/18749057/95013761-544dde00-067d-11eb-8a72-884238a9281a.png)

며칠 후에 [코드스쿼드](https://codesquad.kr/), [우아한테크코스](https://woowacourse.github.io/), [우아한테크캠프](https://woowabros.github.io/devrel/2020/04/13/techcamp3.html) 등을 운영하고 계시는 [윤지수(크롱)](https://github.com/crongro) 마스터님께서 피드백을 남겨주셨다. 

![image](https://user-images.githubusercontent.com/18749057/95013767-5ca61900-067d-11eb-8128-111df6f0dbaf.png)

그렇게 부스트캠프 리뷰어로 활동하게 되었다.



### 3. React Study

### 4. 단국대 스터디

### 5. 코덕

### 6. TIL

### 7. 서울 디지텍고등학교 기능반

## Summary