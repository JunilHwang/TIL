---

title: 2020년 8월 회고
description: 2020년 8월 회고 입니다.
sidebarDepth: 2
date: 2020-08-31

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

위의 사진 처럼 여태까지 **큰 문제 없이 굴러가고 있다고 생각했던 API들이 사실 폭탄 투성이**였다.
그래서 해당 API의 담당자들과 상의하여 이러한 폭탄을 미리 미리 제거할 수 있는 기회가 되었다.
하지만 워낙 꼬여있는 로직들이 많은 상태였고, **어쩔 수 없이 방치해야 하는 부분들**도 있었기 때문에 조금 찝찝하다.

어쨌든 결과적으로 `Sentry` 도입으로 인하여 해결 가능한 문제들은 빠르게 조치할 수 있었고,
당장 해결하지 못한 부분도 있지만 어느 정도 문제점을 인지할 수 있기 때문에 **장애가 발생했을 때 어느 정도 선방**이 가능하게 되었다.
      




### 2. 크롬 확장프로그램

::: tip

확장프로그램에 대한 자세한 내용은 [줌인터넷 기술블로그 - 크롬 확장프로그램 개발 회고](https://zuminternet.github.io/Zum-Chrome-Extension/)에서 확인해볼 수 있습니다!

:::

![크롬 확장프로그램](https://user-images.githubusercontent.com/18749057/95010212-7128e800-0662-11eb-918d-da7a31d64d7f.png)

확장프로그램 베타 버전은 이미 지난 달에 완성되었으나 **스토어 게시요청이 계속 반려**되면서 이후의 일정이 계속 지연되고 있었다.
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

덕분에 **하나의 프로젝트에 담당자도 많았고 잠재적인 위험**도 역시 무시할 수 없었다.

일단 위에 언급한 코드 중 제일 빈번하게 배포와 수정이 발생하는 부분인 `Mobile API`를 분리하기로 결정했다.

`Mobile API`는 `DB`를 사용하고 있지 않았고, `Domain` 관련 코드도 없었다.
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

**분리 과정에서 리팩토링도 진행하고, 시스템 환경도 변경하는 등의 추가 작업**도 있었다. 앞서 언급한 `Sentry`도 적용했다.

어쨌든 조금 더 **관리하기가 수월**해진 것은 확실하다.




### 4. CMS 작업 (feat. Legacy)

8월까지 작업하고 있던 **CMS 개발을 마무리**해야 했다. 사실 7월에 대부분의 기능을 만들어놔서 8월에 내가 할 일은 많지 않았다.
일단 **미리보기** 기능을 만들기 위해서 CMS와 엮여있는 `Zum Lego Project`를 분석해야 했다.

`Zum Lego Project`는 **굉장히 오래전부터 많은 사람들의 손을 거쳐 관리되어온 레거시 프로젝트**다.
덕분에 왜 이렇게 만들어졌는지 의문을 갖게 될 수 밖에 없는 코드들이 굉장히 많았고, 구조의 복잡도 또한 심상치 않았다.
~~차라리 처음부터 만들고 말지~~

**언젠간 사수가 이직하게 된다면, 이 프로젝트의 담당자는 내가 될 것**이다. 생각만해도 끔찍하다... 😭

_그리고 그 시기는 멀지 않았다._

마음의 준비를 단단히 하고 있어야지..

어쨌든 CMS 작업은 생각보다 많지 않았다.
QA를 진행하고, 해당 사항을 반영하는 과정을 반복했는데 사실 반영하는 것도 굉장히 간단했기 때문에 큰 어려움은 없었다.

~~그리고 9월에 고통받았다~~

## 사적

8월에는 꽤 많은 일을 했다. 그래서 사실 굉장히 힘들었다.




### 1. 카카오 면접관련

7월 말에 면접을 봤고, 8월 초에 결과가 나왔다. **결론적으로는 떨어졌다.**
아마 여러가지 이유가 있겠지만 사실 그건 **지금의 나에게 중요하지 않다고 생각**한다.

이번에 면접 준비를 하면서 **내적으로 스트레스**를 너무 많이 받았다.
합격해도 문제고 합격을 하지 않아도 문제인 그런 상황이었다.
그냥 **면접을 본 것 자체가 잘못** 된게 아닐까?

- 입사한지 1년도 되지 않았다
- 이제 막 업무에 익숙해졌고, 혼자서도 잘 할 수 있게 되었다.
- 팀원들과의 트러블이 없었다. 오히려 잘 지내고 있다.
- 연봉도 나쁘지 않은 상태다.

**이리보고 저리봐도 이직할 이유가 없었다.**

그래서 면접을 볼 당시 **제일 대답하기 힘들었던 것이 이직을 하는 이유**였다.
_재미로 본 코딩테스트 때문에 최종 면접까지 가게 될 줄 누가 알았겠는가?_

이 일 때문에 팀장님과 많은 이야기를 했다.
일단 현재의 나는 많이 부족하다는 것을 인정하기로 했다.
그리고 아직 **사내에서 무언가를 뚜렷하게 보여주질 못했다.**
조금 더 경험을 쌓고, 공부도 많이 하고, 이제 정말 떠날 때가 되었다고 생각이 들면 진짜 이직 준비를 해야지 아직은 아닌 것 같다.

***

팀장님 가라사대

- 네이버, 라인, 카카오 같은 국내 기업이 아닌 **구글, 마이크로소프트 같은 해외 기업을 목표로** 하든가 😨
- 혹은 아예 **파격적인 조건으로 스카웃이 될 정도의 역량**을 갖추든가 😨

둘 중의 하나가 아니라면 그냥 이직은 아직 생각하지 말라고 하신다. ~~말이 쉽지~~

***

음.. 일단 이건 팀장님의 바람이고 😅 스스로에게 부족한 부분을 계속 해서 채워나가야겠다.

_너무 조급하게 생각하지 말자._
기회가 언제나 오진 않지만,
준비된 자만이 그런 기회를 쟁취할 수 있는 것이다.

_잘 준비 하자!_   




### 2. Next Step Reviewer

[클린코드를 위한 TDD, 리팩토링 with Java](https://edu.nextstep.camp/c/8fWRxNWU/)의 **8기를 좋은 성적으로 수료하게 되어 9기는 리뷰어 활동**을 할 수 있게 되었다.
이렇게 리뷰어로 활동하는게 처음이다보니 어떻게 해야 좋을지 고민이 많았었는데, 생각보다 수월하게 진행할 수 있었다.

![리뷰이](https://user-images.githubusercontent.com/18749057/95013250-0daab480-067a-11eb-8ae8-f74248a334d1.png)

- 8월 한 달 동안 10명을 리뷰했으며 그 중에 3명이 미션을 완료했다.
- 일단 각 미션당 5명, 전체 미션에 대해 최대 20명을 리뷰해야 한다.
- 그런데 생각보다 자동차 미션에서 포기하는 사람이 많은 것 같다.
- 아무래도 회사 일과 병해하는 사람이 많다 보니 미션 수행 자체가 굉장히 부담스러울 수 있기 때문이라 생각한다.

![리뷰](https://user-images.githubusercontent.com/18749057/95013428-2c5d7b00-067b-11eb-8ec9-c5b64796f5ad.png)

어쨌든 리뷰를 하면서 스스로도 굉장히 많이 성장할 수 있는 기회가 되었다.
그리고 *8리뷰이가 점점 좋은 코드를 만들어내는 과정에 참여할 수 있다는 것도 큰 행운**이라고 생각한다.

_Javascript도 이런 식으로 참여/운영 해보고 싶다는 생각을 많이 하고 있다._ 



### 3. Boost Camp Reviewer

8월 초에 네이버의 `커넥트 재단`에서 운영하는 `부스트 캠프`에서 리뷰어를 구한다는 소식을 접했다.

<img src="https://user-images.githubusercontent.com/18749057/95013561-02f11f00-067c-11eb-9b32-e343d5e7c265.png" alt="부스트 캠프 리뷰어 모집 공고(1)" width="400" />

대략적인 내용은 다음과 같았다.

<img src="https://user-images.githubusercontent.com/18749057/95013576-1e5c2a00-067c-11eb-8759-f7cf70cab6c7.png" alt="부스트 캠프 리뷰어 모집 공고(2)" width="700" />

::: tip 부스트캠프 리뷰어

내용에는 6주라고 되어 있는데, 웹 과정의 경우 백엔드/프론트엔드를 격주로 하기 때문에 **총 3주 동안 활동**하게 된다.

- 리뷰어마다 6명의 캠퍼(리뷰이)를 배정한다.
- 3주간 주 2회의 리뷰를 한다.
- 따라서 6명의 캠퍼에게 각각 6회, **총 36회의 리뷰**를 해야한다.

:::

NextStep의 리뷰어 활동은 java에 대한 리뷰이기 때문에 사실 스스로 생각하기에 약간 아쉬운점이 있었다.
**나의 주력 언어는 javascript이고, 당연히 java보다 javascript를 더 좋아하기 때문이다.**

그래서 부스트캠프의 리뷰어 모집 공고는 굉장히 반가웠다. 빠르게 지원했다.

단, 지원하기 위해서는 모집공고 저장소에 올라온 코드에 대해 [코드리뷰](https://github.com/connectfoundation/review_2020/pull/3)를 남겨야했다.

<img src="https://user-images.githubusercontent.com/18749057/95013663-beb24e80-067c-11eb-80f1-73e790f76d5e.png" alt="부스트 캠프 리뷰어 모집 공고(3)" width="700" />

일단 코드가 `React`로 작성되어 있어서 조금 당황했다. React는 취업 준비를 할 때 아주 잠깐 공부했고, hooks는 사용해본적도 없기 때문이다.
그래서 **일단 코드 스타일, 변수명, 코딩컨벤션 위주의 리뷰**를 했다. 

![image](https://user-images.githubusercontent.com/18749057/95013761-544dde00-067d-11eb-8a72-884238a9281a.png)

\* 위의 리뷰에 대한 자세한 내용은 [이 링크](https://github.com/connectfoundation/review_2020/pull/3)를 참고해주세요.

며칠 후에 [코드스쿼드](https://codesquad.kr/), [우아한테크코스](https://woowacourse.github.io/), [우아한테크캠프](https://woowabros.github.io/devrel/2020/04/13/techcamp3.html) 등을 운영하고 계시는 [윤지수(크롱)](https://github.com/crongro) 마스터님께서 피드백을 남겨주셨다. 

![image](https://user-images.githubusercontent.com/18749057/95013767-5ca61900-067d-11eb-8128-111df6f0dbaf.png)

이렇게 부스트캠프 리뷰어로 활동할 수 있게 되었다. 다만 **8월 까지는 모집기간이고, 활동은 9월부터** 하기 때문에 이에 대한 기록은 [9월 회고](../09-September/)에 남길 예정이다.

그리고 [개인적인 친분이 있는 사람](https://github.com/minuukang)에게도 이 모집공고를 소개했고 결과적으로 같이 활동할 수 있게 되었다.
굉장히 존경하는 지인이며 [코드리뷰](https://github.com/connectfoundation/review_2020/pull/22) 또한 감탄이 나올 만큼 잘 작성해주었다.

개인적으로 내 또래의 프런트엔드 개발자 중에서 이 친구가 제일 잘하는 사람이 아닐까 생각한다.




### 4. React Study

사내에 **이스트소프트 계열사**에 근무하는 사람들끼리 스터디를 할 수 있는 시스템이 만들어졌다.
이 중에 [리액트 스터디](https://github.com/est-react-study)가 있어서 지원했다.
~~지원하고 보니 나만 줌인터넷 소속..~~

::: tip 이스트소프트 계열사

대표적인 이스트소프트 계열사는 다음과 같다.

- 이스트소프트
- 이스트시큐리티
- 이스트게임즈
- 줌인터넷

이 외에도 더 있지만 잘 알려지지 않았기 때문에 [여기](https://www.estsoft.ai/company/subsidiary)를 참고해주세요!

:::

일단 스터디에 참여하는 사람들 중 대부분이 리액트를 아예 해본적이 없는 경우가 많았기 때문에 간단하게 무엇을 만들어야 좋을지 회의했고, [Postman](https://www.postman.com/) Clone Coding을 하기로 결정되었다.

- [est-react-study/postman-junil](https://github.com/est-react-study/postman-junil)
- [데모 확인해보기](https://est-react-study.github.io/postman-junil/)

서버를 사용하지 않았기 때문에 `http reuqest` 요청은 `github api`를 기준으로 테스트 했다. 

#### (1) Recoil

이번에 스터디를 하면서 [Recoil](https://recoiljs.org/) 이라는 상태관리 라이브러리를 사용했다.

::: tip Recoil

Recoil은 React(Facebook) 진영에서 **직접 만든** 상태관리 라이브러리이다.

:::

일단 Redux나 Mobx보단 확실이 편리하다. 무엇보다 Hook으로 쉽게 사용할 수 있다보니 딱히 라이브러리를 사용한다는 느낌이 들지 않았다.

- [공식문서](https://recoiljs.org/)
- [Recoil 알아보기](https://medium.com/humanscape-tech/recoil-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0-285b29135d8e)
- [Recoil vs Redux | The Ultimate React State Management Face-Off](https://dev.to/chandan/recoil-vs-redux-the-ultimate-react-state-management-face-off-35b)
- [Recoil - 또 다른 React 상태 관리 라이브러리](https://ui.toast.com/weekly-pick/ko_20200616/)
- [사용 예제 Repository](https://github.com/chandan-reddy-k/redux-vs-recoil-example)

예시 코드는 다음과 같다.

```js
/** requestStore/index.js **/
import { atom, RecoilState } from "recoil";
import { Method } from "axios";

export interface IRequestTable {
  key: string
  value: string
}

export const methods: Method[] = [ 'GET', 'POST', 'PUT', 'PATCH', 'DELETE' ];
export const configTabs: string[] = ['Params', 'Headers', 'Body'];

export const methodState: RecoilState<Method> = atom({
  key: 'methodState',
  default: methods[0]
});

export const addressState: RecoilState<string> = atom({
  key: 'addressState',
  default: ''
});


export const tabState: RecoilState<number> = atom({
  key: 'tabState',
  default: 0
});

const headers: IRequestTable[] = [];
export const headersState: RecoilState<IRequestTable[]> = atom({
  key: 'headersState',
  default: headers
});

const params: IRequestTable[] = [];
export const paramsState: RecoilState<IRequestTable[]> = atom({
  key: 'paramsState',
  default: params
});

export const requestBodyState: RecoilState<string> = atom({
  key: 'requestBodyState',
  default: ''
});

```

이렇게 공통 state를 정의 한 다음에, `hook`으로 사용할 수 있다.
```js
/** RequestContainer.js **/
import React from "react";
import axios from 'axios';
import { RequestAddress } from "../components/Request/RequestAddress";
import { RequestConfig } from "../components/Request/RequestConfig";
import { getHeadersOf, getQueryParamsOf } from "utils";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { headersState, methodState, paramsState, requestBodyState } from "stores/requestStore";
import { responseState } from "stores/responseStore";
import { historyState } from "stores/historyStore";
import { HistoryService } from "services";
import { message } from "components/Common/Alert";

const getJSON = (text: string) => {
  try {
    return JSON.parse(text || 'null');
  } catch (e) {
    throw new Error('JSON 형식이 아닙니다.');
  }
}

export const RequestContainer: React.FC = () => {

  const setResponse = useSetRecoilState(responseState);
  const setHistories = useSetRecoilState(historyState);

  const params = useRecoilValue(paramsState);
  const headers = useRecoilValue(headersState);
  const method = useRecoilValue(methodState);
  const body = useRecoilValue(requestBodyState);

  const submitRequest = async (requestURL: string) => {
    const url = `${requestURL}${getQueryParamsOf(params)}`;
    try {
      const data = ['post', 'put', 'patch'].includes(method.toLocaleLowerCase())
        ? getJSON(body)
        : undefined;
      setResponse(undefined);
      const result = await axios({url, method, headers: getHeadersOf(headers), data})
      HistoryService.push({url, method});
      setHistories(HistoryService.fetchAll());
      setResponse(result);
    } catch (e) {
      console.error(e.response);
      message(e.toString());
    }
  }

  return (
    <section>
      <h2>Request</h2>
      <RequestAddress submitRequest={submitRequest} />
      <RequestConfig />
    </section>
  );
};
```


#### (2) react-app-rewired

`CRA(Create React App)`로 React App을 만들면 기본적으로 웹팩 설정이 내장된 형태로 프로젝트를 구성해준다.
따라서 웹팩 설정을 변경하기 위해선 `eject` 명령을 이용하여 모든 설정파일을 밖으로 꺼내야한다.

- [CRA eject란?](https://helloinyong.tistory.com/174)

::: tip eject

eject는 해당 프로젝트에 숨겨져 있는 모든 설정을 밖으로 추출해주는 명령어다.

:::

그런데 이렇게 설정파일을 밖으로 꺼낼 경우 신경써야 할게 무척 많아진다. 그리고 CRA가 업그레이드 될 때 마다 설정파일을 번거롭게 직접 수정하거나 아예 건드릴 수 없게 되어버린다.
이 때 `react-app-rewired`을 사용하면 된다.

::: tip react-app-rewired

- `CRA` 프로젝트를 `eject`하지 않고 **`customizing` 할 수 있게 도와주는 라이브러리**이다.
- 그러나 이 라이브러리를 사용한다고 해서 절대적으로 `CRA`가 가지는 안정성을 보장해주지 않는다 

:::

- [Create-React-App에서 Eject사용안하기(customize-cra, react-app-rewired)](https://medium.com/@jsh901220/create-react-app%EC%97%90%EC%84%9C-eject%EC%82%AC%EC%9A%A9%EC%95%88%ED%95%98%EA%B8%B0-customize-cra-react-app-rewired-10a83522ace0)
- [react-app-rewired repository](https://github.com/timarney/react-app-rewired) 

일단 `react-app-rewired`을 사용하기 위해선 `npm scripts`를 수정해야 한다.

```js
{
  /* 앞 내용 생략 */
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  },
  /* 뒷 내용 생략 */
}
```

그리고 프로젝트 루트에 다음과 같이 `config-overrides.js`를 통하여 웹팩 설정을 덮어씌울 수 있다.

```js
// config-overrides.js 
module.exports = function override(config, env) {
  if (process.env.GH_PAGES === 'true') {
    config.output.publicPath = './'; // build 경로 변경
  }
  return config
}
```

필자는 **build 경로를 변경**하기 위해서 이 라이브러리를 사용했다.

#### (3) [CSS-in-JS] emotion

Vue를 사용할 땐 굳이 [CSS-in-JS](https://d0gf00t.tistory.com/22) 관련 라이브러리를 사용하지 않아도 어차피 컴포넌트 파일 안에 Style을 포함시켜 작성할 수 있다.

::: tip CSS-in-JS

CSS-in-JS는 다음과 같은 장점을 가지고 있다.

- 더이상 스타일시트의 묶음을 유지보수 할 필요가 없다.
- CSS-in-JS는 CSS 모델을 문서 레벨이 아니라 컴포넌트 레벨로 추상화 한다.
- CSS-in-JS는 JavaScript 환경을 최대한 활용하여 CSS를 향상 시킨다.
- CSS에는 명시적으로 정의 하지 않은 경우, 부모 요소에서 자동으로 상속되는 속성이 있다. CSS-in-JS의 경우 부모 요소의 속성을 상속하지 않는다.
- 생성된 CSS 규칙은 자동적으로 벤더 프리픽스가 붙어있으므로 생각할 필요가 없다.
- JavaScript와 CSS사이에 상수와 함수를 쉽게 공유할 수 있다.
- 현재 화면에 사용중인 스타일만 DOM에 있다.

반대로 새로운 것을 배워야 하는 부담 정도의 단점이 있다.

:::

하지만 React의 경우 다양한 선택지가 존재한다. 일단 스터디 리더의 주도로 `@emotion/css`를 사용하기로 합의했다.
사실 여태까지 CSS-in-JS를 한 번도 사용해본적이 없어서 약간 낯설었다.

- [공식문서](https://emotion.sh/docs/introduction)
- [CSS 2019 - CSS IN JS](https://2019.stateofcss.com/technologies/css-in-js/)
  - `@emotion`의 사용자 만족도 비율이 제일 높았다.
    ![만족도 조사](https://user-images.githubusercontent.com/18749057/95018635-fe3c6300-069b-11eb-96b6-c892988d644e.png)
  - 그런데 주변 사람들에게 설문해보면 만족도를 떠나서 비교우위는 Styled-Components를 더 높게 평가하고 있다.
    <img src="https://user-images.githubusercontent.com/18749057/95018860-2aa4af00-069d-11eb-8415-4f975fba7425.png" alt="못생겨서" width=300 />
- [emotion을 활용한 크몽 프론트엔드 스타일링 시스템](https://brunch.co.kr/@kmongdev/17)
- [다양한 방식의 리액트 컴포넌트 스타일링 방식](https://velog.io/@velopert/react-component-styling)
- [Thinking about emotion js vs styled component]()
  - 개인적으로 이 포스트의 내용이 제일 괜찮았다.

직접 사용해본 결과, 나쁘진 않았다.

#### (4) 공통 컴포넌트와 Storybook

React를 하든, Vue를 하든, UI를 만들 때 제일 중요한 포인트는 `공통 컴포넌트`를 만드는 것이 아닐까 생각한다.
재활용할 수 있는 컴포넌트를 만드는 것. **어떤 상황에서든 사용할 수 있는 컴포넌트가 진정한 의미의 컴포넌트가 아닐까?**

이러한 생각을 가지고 깃허브를 뒤적뒤적 거리다가 [Storybook](https://hyunseob.github.io/2018/01/08/storybook-beginners-guide/)에 대해 알게 되었다.

::: tip Storybook

- Storybook은 **컴포넌트 단위의 개발 환경**을 지원하는 도구다.
- 개발자가 뷰를 개발할 때 고립된 환경을 제공해서 **관심사를 의존성과 환경으로부터 분리**시켜 준다.

즉, 외부 상태에 의존하지 않으면서 고립된 상태로 스스로를 표현하는 컴포넌트를 개발할 수 있도록 도와주는 도구라고 할 수 있다.

:::

관련 예제는 [Velog](https://velog.io/)의 개발자인 [김민준(velopert)](https://github.com/velopert)님의 저장소에서 볼 수 있었다.

- [Repository: react-uikit-sample](https://github.com/velopert/storybook-tutorial-code)
- [Storybook](https://react-uikit-sample.surge.sh/)

일단 나도 `Storybook`으로 공통 컴포넌트를 띄워볼 생각이었지만, **이 스터디 이외에도 해야할게 너무 많아서 설치까지만 했다.**

#### 짤막한 스터디 후기

일단 스터디 자체는 좋았다. 리액트를 공부할 수 있는 기회도 되었고, 여러가지 정보도 얻을 수 있었다.
다만 스터디에 참여하는 사람들 대부분이 프런트엔드 자체가 친숙하지 않기 때문에 스터디가 점점 흐지부지 되어가고 있다.

_일단 올해 말까지 진행하기로 하였으니 최대한 많은 경험을 할 수 있기를 바랄 뿐이다._ 




### 5. DKU-STUDY

여전히 단국대 스터디는 활발하게 진행중이다.

![DKU-STUDY](https://user-images.githubusercontent.com/18749057/95019254-34c7ad00-069f-11eb-8339-977bade6b500.png)

`8월 31일`을 기준으로 `1,859`개의 커밋이 발생했다.

그리고 github에서 우연히 [Mirim-Study/Algorithm](https://github.com/Mirim-Study/Algorithm)을 봤다.
[미림여자정보과학고등학교](https://www.e-mirim.hs.kr/main.do)에 다니고 있는 학생들이 우리 스터디를 모방하여 진행하고 있었다.

우리 스터디가 잘 굴러가고 있다는 증표라고 생각한다.

언제나 그렇듯 [코덕](https://co-duck.com)을 기준으로 DKU-STUDY가 전체 그룹 중 1위를 했다.

![co-duck](https://user-images.githubusercontent.com/18749057/95019363-e666de00-069f-11eb-86fe-e5faad159579.png)

그리고 나는 스터디 내에서 참여하고 있진 않지만, **몇몇 구성원이 javascript study를 하고 있다.**

개인적으로 면접준비를 할 때 [siots-study](https://gitlab.com/siots-study/topics/-/wikis/home)의 내용을 많이 참고했고, 우리 스터디 구성원들에게도 이 자료를 소개해줬다.
그리고 이 자료를 기준으로 공부하는 중이다.

![js study](https://user-images.githubusercontent.com/18749057/95019430-3cd41c80-06a0-11eb-99ac-8e4b2df696bb.png)

step5 까지는 나도 어느정도 피드백을 했으나, _8월에는 좀 많이 바쁜 관계로 알고리즘 코드리뷰만 하는 중이다._

그런데 스터디 구성원이 아직 한 번도 모인적이 없다. _코로나가 어느 정도 잠잠해지면 시간 내서 식사자리를 마련해야겠다._

### 6. 코덕과 일일커밋

의도치 않게 **8월 코덕 랭킹 1위**가 되었다.

![코덕 1위](https://user-images.githubusercontent.com/18749057/95019632-693c6880-06a1-11eb-9461-c8226e65d7e8.png)

그리고 `Top 5` 안에 필자를 포함하여 3명의 스터디 구성원이 랭킹되었다.

커밋을 많이 하진 않았는데, 만든 저장소가 많아서 그런게 아닐까?

![8월 통계](https://user-images.githubusercontent.com/18749057/95019686-cafcd280-06a1-11eb-8ffd-3d3c2b62c61f.png)

- 7월의 경우 **8개의 Repository에서 357개의 commit**이 발생했다.
- 8월의 경우 **19개의 Repository에서 393개의 commit**이 발생했다.

이번에 서울디지텍고등학교의 기능반을 지도하면서 만든 저장소 때문이 아닌가 싶다.

### 7. 서울 디지텍고등학교 기능반

8월부터 전국대회 기간까지 선생님의 부탁으로 **기능반 학생들**을 지도하게 되었다.

::: tip 기능경기대회

- 정식 명칭은 **기능올림픽**이다. 
- 기능경기대회는 **특성화고등학교의 수능이며 축제**라고 할 수 있다.
- **지방대회 - 전국대회 - 국가대표 선발전 - 세계대회** 등의 과정이 있다.
- **지방대회**는 4월에 개최된다. 그런데 올해는 **코로나 때문에 6월**에 개최되었다.
- **전국대회**는 9월/10월 중에 개최된다. 올해는 **9월 14일 부터 7일간** 진행될 예정이다.
- 세계대회는 2년에 한 번씩 개최된다.
- 자세한 내용은 [마이스터넷](https://meister.hrdkorea.or.kr/main/main.do) 참고

필자 또한 2012년도 경기도대회, 전국대회에서 입상을 했고 이를 계기로 본격적인 개발공부를 시작했다.

:::

이번에는 코로나의 여파도 있고, 여러모로 관리가 되지 않은 상태였기 때문에 학생들의 상태가 심상치 않았다.
대회도 코앞이고 기술적으로 알려줄 시간적 여유도 많지 않기 때문에 간단하게 코드리뷰를 하는 방식으로 진행했다.

- [광주 문제 코드리뷰](https://github.com/sdhs-webskills/GJ-2020-MS/pull/1)
- [서울 문제 코드리뷰](https://github.com/sdhs-webskills/Seoul-2020/pull/1)

일단 깃허브를 최대한 활용해보려고 했으나, 학생들이 깃허브에 익숙해지기엔 시간이 매우 촉박했다.
사실 문제를 풀이할 여유도 없는 상태였기 때문에 그냥 물어보는 것들에 대해서 답변해주는 식으로 지도했다.

다음 기수의 학생들에게는 조금 더 개발 자체에 집중할 수 있는 형태로 가르쳐볼 계획이다.

여기에 언급할 내용이 많진 않지만, 8월은 기능반 학생들을 가르치는데 시간을 많이 썼다.

## Summary

- 회사일 열심히 했다.
- React에 대해 공부했다.
- 리뷰어 활동 열심히 했다.
- 기능반 학생들을 가르쳤다.