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
문제는 확장프로그램에서 사용하는 사내 서비스 중에 쉽게 `https`로 전환할 수 없는 부분이 있었다.
문제는 팀 내에서 자체적으로 이 문제를 해결할 수 없는 상태였고, 인프라팀에 업무요청을 하여 처리해야 했다.
근데 인프라팀에서도 이것 저것 밀린 일정이 많다보니 `https` 전환을 바로 처리하기가 곤란한 입장이었다.

일단 요청 자체를 `https`로 보내면 어떨까 해서 url만 `https`로 변경하여 검수 요청을 시도했고,
예상대로 검수는 통과할 수 있었다.
그래서 아예 아파치단에서 `https://pass.abc.com`으로 도메인을 호출하면 `http://abc.com`으로 `redirect` 되도록 설정해놨다.

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

### 1. Next Step Reviewer

### 2. Boost Camp Reviewer

### 3. React Study

### 4. 단국대 스터디

### 5. 코덕

### 6. TIL

### 7. 서울 디지텍고등학교 기능반

## Summary