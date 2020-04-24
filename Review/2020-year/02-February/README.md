---

title: 2020년 2월 회고
description: 2020년 2월 회고 입니다.
date: 2020-02-29
sidebarDepth: 1
feed:
  enable: true

---

# 2020년 2월 회고

나는 2월 한 달을 어떻게 지냈나? 에 대한 고찰이다.

## 공적

사내에서 진행했던 내용을 간략하게(?) 되새겨본다.

### 1. 업무에 적응하는 과정

#### 1-1. 개발망(부들부들)

1월 말에 처음으로 배포를 했었는데 배포 과정 보단 개발망 때문에 굉장히 스트레스를 받았다.
인터넷망과 개발망이 분리되어 있어서 배포 이후에 디버깅을 하거나 API의 정상 작동 확인 과정이 꽤 번거로웠다.
개발망에 접근해서 curl로 직접 api을 호출 해야 하는데, 이 때 json이 한 줄로 나오기 때문에 보기가 굉장히 힘들었다.

```sh
# 대략 다음과 같은 형태이다.
curl -H "Accept: application/vnd.github.v3+json" "https://api.github.com/"
```

그러면 이렇게 한 줄로 출력이 된다(사실 위와 같이 github api를 요청하면 포맷팅이 된 형태로 반환한다.)

```json
{"current_user_url": "https://api.github.com/user","current_user_authorizations_html_url": "https://github.com/settings/connections/applications{/client_id}","authorizations_url": "https://api.github.com/authorizations","code_search_url": "https://api.github.com/search/code?q={query}{&page,per_page,sort,order}","commit_search_url": "https://api.github.com/search/commits?q={query}{&page,per_page,sort,order}","emails_url": "https://api.github.com/user/emails","emojis_url": "https://api.github.com/emojis","events_url": "https://api.github.com/events","feeds_url": "https://api.github.com/feeds","followers_url": "https://api.github.com/user/followers","following_url": "https://api.github.com/user/following{/target}","gists_url": "https://api.github.com/gists{/gist_id}","hub_url": "https://api.github.com/hub","issue_search_url": "https://api.github.com/search/issues?q={query}{&page,per_page,sort,order}","issues_url": "https://api.github.com/issues","keys_url": "https://api.github.com/user/keys","label_search_url": "https://api.github.com/search/labels?q={query}&repository_id={repository_id}{&page,per_page}","notifications_url": "https://api.github.com/notifications","organization_url": "https://api.github.com/orgs/{org}","organization_repositories_url": "https://api.github.com/orgs/{org}/repos{?type,page,per_page,sort}","organization_teams_url": "https://api.github.com/orgs/{org}/teams","public_gists_url": "https://api.github.com/gists/public","rate_limit_url": "https://api.github.com/rate_limit","repository_url": "https://api.github.com/repos/{owner}/{repo}","repository_search_url": "https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}","current_user_repositories_url": "https://api.github.com/user/repos{?type,page,per_page,sort}","starred_url": "https://api.github.com/user/starred{/owner}{/repo}","starred_gists_url": "https://api.github.com/gists/starred","user_url": "https://api.github.com/users/{user}","user_organizations_url": "https://api.github.com/user/orgs","user_repositories_url": "https://api.github.com/users/{user}/repos{?type,page,per_page,sort}","user_search_url": "https://api.github.com/search/users?q={query}{&page,per_page,sort,order}"}
```

그래서 사수가 알려준 python script를 이용하여 어느 정도 응답 형태를 이쁘게 만들었다.

```sh
curl -H "Accept: application/vnd.github.v3+json" "https://api.github.com/" | python -c "
import fileinput, json
print(
    json.dumps(
        json.loads(''.join(fileinput.input())),
        sort_keys=True,
        ensure_ascii=False,
        indent=4
    )
)"
```

그러면 이렇게 포맷팅이 된 결과를 출력해준다.

```js
{
  "current_user_url": "https://api.github.com/user",
  "current_user_authorizations_html_url": "https://github.com/settings/connections/applications{/client_id}",
  "authorizations_url": "https://api.github.com/authorizations",
  "code_search_url": "https://api.github.com/search/code?q={query}{&page,per_page,sort,order}",
  "commit_search_url": "https://api.github.com/search/commits?q={query}{&page,per_page,sort,order}",
  "emails_url": "https://api.github.com/user/emails",
  "emojis_url": "https://api.github.com/emojis",
  "events_url": "https://api.github.com/events",
  // 너무 길어서 생략
}
```

이건 또 python으로 출력한 것이기 때문에 grep을 사용할 수 없다.
그래서 몇 백줄이 되는 결과값에서 필요한 부분만 확인할 때 여전히 불편했으며, 확인해야 하는 API 요청이 한 개가 아니기 때문에 말 그대로 불편함 그 자체였다.

> 그러나 개발자라면 불편함을 해결할 수 있어야 한다! ~~이름하여 창조적 귀찮음~~

나는 위의 python script와 shell script을 결합하여 모든 요청을 한 번에 수행 후 파일로 저장하는 스크립트를 만들었다.

#### /bin/ApiAllTestScript
```sh
#! /bin/sh

version=$1
path=$2

# 예시를 위하여 github로 대체
curl -H "Accept: application/vnd.github.v${version}+json" \
"http://api.github.com/${path}" | python -c "
import fileinput, json
str = json.dumps(json.loads(''.join(fileinput.input())), sort_keys=True, ensure_ascii=False, indent=4)
f = open('~/output_${version}', 'w')
f.write(str.encode('utf-8'))
f.close()"
```
#### /bin/ApiAllTestScript
```sh
#! /bin/sh

str="path1,path2,path3,path4,path5,path6,path7,path8"

mkdir ~/output_$1

echo "" > ~/output_$1/moduleCheck

for value in `echo ${str} | tr ',' '\n'`;
do
  sh ApiAllTestScript $1 $value
  echo -e "\n\n[${value}]\n" >> ~/output_$1/moduleCheck
  grep '            "type"' ~/output_$1/${value} | grep -v '                    ' >> ~/output_$1/moduleCheck
done
```

실행은 다음과 같이 하면 된다.

```sh
> sh ApiAllTestScript 3
```

그러면 Shell Script 에 정의된 모든 path에 대해 api 요청 후 결과를 저장하게 된다.

그래도 여전히.. 개발망에서 로그를 확인할 때는 여간 불편한게 아니였다.
무엇보다 개발망에서 패키지를 설치하면 패키지 의존성이 전부 깨져있어서 원격데스크톱, vim, ssh 등의 편리한 도구들을 사용할 수 없었다.

패키지가 깨지는 문제 때문에 대략 5번 정도의 포맷 및 재설치를 하였으나 여전히 해결 되진 않고 있다.
우여곡절 끝에 우분투에 내장 되어 있는 데스크톱 공유 기능을 이용하여 [VNC 화면 공유](https://extrememanual.net/12210) 를 통해 원격 제어가 가능하게 되었으나, 이건 너무 느렸다.

내가 원하는건 아이패드로 ssh 접근을 하여 개발망을 사용하고, 블루투스 키보드를 통해서 간단하게 개발망/인터넷망을 오가며 개발하는 것이었는데.. 너무 큰 꿈인 것 같다.

어쨌든 몇 번의 삽질을 통해서 배포 과정에 대해서는 금방 이해할 수 있었고.. 배포가 두렵지 않게 되었다. 다만 **배포 이후의 에러/버그**가 두려울뿐..

#### 1-2. 기획팀과의 커뮤니케이션

 

### 2. CMS 프로젝트 시작
### 3. 코드 리뷰
### 4. 재택근무


## 사적
### 4. 아쉬운 점
## Summary