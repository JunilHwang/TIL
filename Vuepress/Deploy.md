---

sidebarDepth: 2

---

# github page에 배포하기 

Vuepress로 만든 문서를 github page에 배포하는 방법에 대해 기록한 문서이다.

## 1. Shell Script 작성

먼저 `deploy.sh` 를 작성해야 한다. 이 스크립트가 하는 일은 다음과 같다.

1. 문서 빌드
2. 빌드된 문서를 git init -> add -> commit
3. github pages에 push

이 때 `package.json의 npm script`와 `deploy.sh의 위치`가 중요하기 때문에 프로젝트 폴더 구조에 따라 작성하는 방법이 다르다. `package.json` 

### root 기준

폴더 구조가 다음과 같다면

```
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

``` sh
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

## Reference

- [공식문서](https://vuepress.vuejs.org/guide/deploy.html)
- [Vuepress 사이트 배포하기 절차](https://joshua1988.github.io/vue-camp/vuepress/learning-note.html#%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%B0%B0%ED%8F%AC-%ED%95%98%EA%B8%B0-%EC%A0%88%EC%B0%A8)
