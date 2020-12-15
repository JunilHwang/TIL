---

title: github page에 배포하기
description: Vuepress로 만든 문서를 github page에 배포하는 방법에 대해 기록한 문서이다.
sidebarDepth: 2

---

# github page에 배포하기 

Vuepress로 만든 문서를 github page에 배포하는 방법에 대해 기록한 문서이다.

## 1. 배포 과정 이해하기

먼저 `deploy.sh` 를 작성해야 한다. 이 스크립트가 하는 일은 다음과 같다.

1. 문서 빌드
2. 빌드된 문서를 git init -> add -> commit
3. github에 push
    - `https://<user>.github.com/` 에 배포하고 싶다면,
      - repository: `<user>.github.com`
      - branch: `master`
    - `https://<user>.github.com/<repo>` 에 배포하고 싶다면,
      - repository: `<repo>`
      - branch: `gh-pages`
    - 참고링크 : [Github Pages 기능 이용하기](http://dogfeet.github.io/articles/2012/github-pages.html)

이 때 `package.json의 npm script`와 `deploy.sh의 위치`가 중요하기 때문에 프로젝트 폴더 구조에 따라 작성하는 방법이 다르다.

## 2. 프로젝트가 root 기준일 때

폴더 구조가 다음과 같다면

```{4}
.(VuepressProject)
├─ node_modules
├─ package.json
├─ .vuepress
└─ deploy.sh 
```

일단 `package.json`의 `npm scripts`는 아래 처럼 작성해야 한다.

``` json{4,5}
{
  ... // 앞 내용 생략
  "scripts": {
    "docs:dev": "vuepress dev",
    "docs:build": "vuepress build"
  },
  ... // 뒷 내용 생략
}
```

`deploy.sh`는 이렇게 작성해야 한다.

``` sh{10}
#!/usr/bin/env sh

# 오류 발생시 중단한다.
set -e

# 문서(md)를 build하여 html로 만든다. 
yarn docs:build

# build가 output된 폴더로 이동한다. 
cd .vuepress/dist

# init + add + commit을 해준 다음
git init
git add -A
git commit -m 'deploy'

# https://<USERNAME>.github.io 에 배포하는 경우
# git push -f https://github.com/<USERNAME>/<USERNAME>.github.io.git master

# https://<USERNAME>.github.io/<REPO> 에 배포하는 경우
# git push -f https://github.com/<USERNAME>/<REPO>.git master:gh-pages

# 필자의 경우 TIL repository에 배포하기 때문에 아래와 같이 작성했다.
git push -f https://github.com/JunilHwang/TIL.git master:gh-pages

cd -
```  

## 3. vuepress가 root/docs 기준일 때

폴더 구조가 다음과 같다면

```{4,5}
.(VuepressProject)
├─ node_modules
├─ package.json
├─ docs
│   └─ .vuepress
└─ deploy.sh 
```

package.json에서 `vuepress cli`에 `docs`를 붙여야한다.

``` json{4,5}
{
  ... // 앞 내용 생략
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  },
  ... // 뒷 내용 생략
}
```

`deploy.sh`는 이렇게 작성해야 한다.

``` sh{10}
#!/usr/bin/env sh

# 오류 발생시 중단한다.
set -e

# 문서(md)를 build하여 html로 만든다. 
yarn docs:build

# build가 output된 폴더로 이동한다. 
cd docs/.vuepress/dist

# init + add + commit을 해준 다음
git init
git add -A
git commit -m 'deploy'

# https://<USERNAME>.github.io 에 배포하는 경우
# git push -f https://github.com/<USERNAME>/<USERNAME>.github.io.git master

# https://<USERNAME>.github.io/<REPO> 에 배포하는 경우
# git push -f https://github.com/<USERNAME>/<REPO>.git master:gh-pages

# 필자의 경우 TIL repository에 배포하기 때문에 아래와 같이 작성했다.
git push -f https://github.com/JunilHwang/TIL.git master:gh-pages

cd -
```

물론 위의 두 가지 경우 말고도 다양한 프로젝트 구조가 있을 수 있다.

중요한 것은 **deploy.sh가 정확하게 build된 폴더로 이동하여 github에 push할 수 있어야 한다는 점**이다. 

## 4. Shell Script 실행하기

처음 vuepress를 github pages에 배포할 때 push만 하면 deploy.sh를 자동으로 실행하는 줄 알았다(?)

그건 나의 희망사항 이였고, `deploy.sh는 직접 실행`해야 한다.

``` sh
sh deploy.sh
```

- **window** : `git bash` 를 통해서 실행하면 된다.
- **mac** : `terminal` 에서 실행하면 된다.

## 5. 자동으로 배포하기

자동으로 배포하는 방법은 다양하다. ~~하지만 난 수동으로 할래!~~

- [Travis CI](https://docs.travis-ci.com/user/deployment/pages/)
- [Netlify](https://netlify.com/)
- [Google Firebase](https://www.npmjs.com/package/firebase-tools)
- [Surge](https://www.npmjs.com/package/surge)
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
- [Now](https://zeit.co/examples/vuepress/)

이 부분은 [공식문서](https://vuepress.vuejs.org/guide/deploy.html)를 참고하는걸로..

## 6. gh-pages branch 에 commit 기록 남기기

배포를 성공하는 것 까진 좋았다. 그런데 gh-pages에는 항상 commit 기록이 1개만 남아있는 상태가 유지된다. 이 때 `deploy.sh`의 내용을 조금 손보면 된다.

``` sh
#!/usr/bin/env sh

# 오류 발생시 중단한다.
set -e

# 문서(md)를 build하여 html로 만든다. 
yarn docs:build

# build가 output된 폴더로 이동한다. 
cd docs/.vuepress/dist

# https://<USERNAME>.github.io 에 배포하는 경우
# git clone https://github.com/<USERNAME>/<USERNAME>.github.io/

# https://<USERNAME>.github.io/<REPO> 에 배포하는 경우
# 필자는 이 경우에 해당한다.
git clone -b gh-pages https://github.com/<USERNAME>/<REPO>/

# .git의 내용을 복사한 후 clone은 삭제한다.
cp -rf TIL/.git ./.git
rm -rf TIL

# 이제 add + commit + push를 차례대로 실행해주면 끝
# $1은 문자열 인자
git add .
git commit -m '$1'

# https://<USERNAME>.github.io/<REPO> 에 배포하는 경우
# git push origin master

# https://<USERNAME>.github.io/<REPO> 에 배포하는 경우
# 필자는 이 경우에 해당한다.
git push origin gh-pages

cd -
```

이렇게 작성된 `deploy.sh`은 다음과 같이 사용하면 된다.

``` sh
sh deploy.sh "커밋 메세지"
```

`문서 commit + deploy까지 같이 자동화` 하고 싶다면 또 새로운 shell scripts를 작성하면 된다.

파일명은 대충 `commit.sh` 이라고 지었다. 

``` sh
#!/usr/bin/env sh

# abort on errors
set -e

git add .
git commit -m "$1"
git push origin master

sh deploy.sh "$1"
```

사용 방법은 다음과 같다.

``` sh
sh commit.sh "커밋 메세지"
```

이러면 문서도 commit해주고 같은 commit message로 배포까지 완료해준다.

## Reference

- [Github Pages 기능 이용하기](http://dogfeet.github.io/articles/2012/github-pages.html)
- [공식문서](https://vuepress.vuejs.org/guide/deploy.html)
- [Vuepress 사이트 배포하기 절차](https://joshua1988.github.io/vue-camp/vuepress/learning-note.html#%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%B0%B0%ED%8F%AC-%ED%95%98%EA%B8%B0-%EC%A0%88%EC%B0%A8)
