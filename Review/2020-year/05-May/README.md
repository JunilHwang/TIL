---

title: 2020년 5월 회고
description: 2020년 5월 회고 입니다.
date: 2020-05-31
sidebarDepth: 2
feed:
  enable: true

---

# 2020년 5월 회고

이번 달은 성인이 된 이후로 제일 열심히 공부하며 지낸 것 같다.

## 공적

5월은 거의 크롬 확장프로그램 개발 위주의 업무를 진행했다.
API도 만들고 FE도 만들었다.
그러면서 겪은 일들을 회고한다.

### API 개발

다른 회사는 어떤지 모르겠지만.. 우리 회사는 철저하게 망 분리가 된 상태로 서버를 관리하고 있다.
이것도 [IDC(Internet Data Center)](https://blog.naver.com/kinxtime/220648265067?proxyReferer=https%3A%2F%2Fwww.google.com%2F)와
[AWS(Amazon Web Service)](https://aws.amazon.com/ko/what-is-aws/)를 동시에 사용하고 있기 때문에 API를 개발할 때 신경써야 할게 한 둘이 아니다.

#### Local API 개발

일단 로컬 환경에서 개발할 때는 다음과 같은 프로세스를 따른다.

- 필요한 외부 API를 일일히 찔러서 JSON 파일로 저장한다.
  - 아예 외부 API가 아니라 사내에서 만든 API의 경우 개발망 -> IDC연결망 -> IDC망 으로 접속해서 찔러야 한다.
  - 이 때 IDC망에서 인바운드/아웃바운드가 되어 있지 않다면 API를 호출해도 오류만 발생한다.
  - 그러나 보안 때문에 필요한 API 망만 열어놓기 때문에 시스템 인프라팀에서 바운드 설정해줘야 한다.
  - Domain에 대한 IP도 `/etc/hosts`에서 설정해줘야 API를 호출할 수 있다.
- JSON 파일에 대한 Data Class를 만든다.
- Adapter Interface와 MockUpAdapter를 만든다.
- MockUpAdapter는 API를 직접 호출 하지 않고 직접 API를 호출하여 저장한 JSON 파일을 파싱하여 읽어온다.
- Spring의 Profile이 local이나 test일 때는 MockUpAdapter를 통해 API의 Data를 수집한다.


## 사적

## Summary