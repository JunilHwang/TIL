---

title: 추상화를 정렬하기 | 리액트 클린코드
description: 문장이 단어로 단어가 글자로 구성되듯 코드도 적절한 추상화 계층을 만들어 정렬해야 한다.
sidebarDepth: 2
date: 2025-07-28
tag: javascript, react, 클린코드
keywords: javascript clean code, react clean code, 자바스크립트 클린코드, 리액트 클린코드, 프론트엔드 클린코드
thumbnail: https://raw.githubusercontent.com/JunilHwang/TIL/refs/heads/master/clean-code/조각모음/thumbnail.webp

---

# [클린코드 조각모음] 추상화를 정렬하기

> 이 글은 **React**와 **JavaScript**를 사용한 **프론트엔드 개발**에서 **클린코드**를 작성하기 위한 실용적인 가이드입니다.
> 특히 함수와 훅을 이용하여 **추상화 수준**을 정렬하는 방법에 중점을 두고 있습니다.
 
![클린코드 조각모음](https://raw.githubusercontent.com/JunilHwang/TIL/refs/heads/master/clean-code/조각모음/thumbnail.webp)

::: tip 좋은 코드는 한 편의 글과 같다.

문단은 문장으로, 문장은 단어로, 단어는 글자로 구성되듯이, 코드도 동일한 추상화 레벨이 모여 더 높은 차원의 추상화를 만들어야 한다.

:::


## 1. 한글로 생각해보는 "추상화 수준"

한글은 기본 요소는 “자음”과 “모음”이다.

자음과 모음이 모여서 글자가 되고, 글자가 모여 단어가 되고, 단어가 모여 문장이 된다.

가령, "안녕하세요 황준일입니다"라는 문장은 이렇게 구성이 된다.

@startuml
!theme plain

package "한글 추상화 계층" {
   
   class "자음·모음" as consonant_vowel {
      ㅇ, ㅏ, ㄴ, ㄴ, ㅕ, ㅇ, ㅎ, ㅏ...
      ㅈ, ㅓ, ㄴ, ㅡ, ㄴ, ㅎ, ㅘ, ㅇ...
   }
   
   class "글자" as character {
      안, 녕, 하, 세, 요
      저, 는, 황, 준, 일, 입, 니, 다
   }
   
   class "단어" as word {
      안녕하세요
      저는, 황준일, 입니다
   }
   
   class "문장" as sentence {
      안녕하세요. 저는 황준일입니다.
   }
   
   consonant_vowel ||--o{ character : "조합"
   character ||--o{ word : "결합"
   word ||--o{ sentence : "구성"
}

note right of sentence : 최종적으로 의미를 전달하는 단위
note right of word : 독립적인 의미를 가진 최소 단위
note right of character : 발음 가능한 최소 단위
note bottom of consonant_vowel : 한글의 기본 구성 요소

@enduml

그럼 이 규칙이 깨지면 어떤 모습일까?

**“안녕하세요ㅈㅓㄴㅡㄴㅎㅘㅇ준일ㅇㅣㅂ니다”** 이라는 추상화 규칙이 깨진 문장을 파헤쳐보면 다음과 같다.

@startuml
!theme plain

participant "독자" as reader
participant "정상 문장\n(안녕하세요)" as normal
participant "깨진 문장\n(ㅈㅓㄴㅡㄴㅎㅘㅇ준일ㅇㅣㅂ니다)" as broken

== 정상적인 읽기 ==
reader -> normal : 읽기 시도
activate normal
normal --> reader : 즉시 인식\n(에너지 1x)
deactivate normal

== 추상화가 깨진 읽기 ==
reader -> broken : 읽기 시도
activate broken

loop 각 자음·모음별로
broken -> broken : 자음·모음 분석\n(ㅈ + ㅓ = 저)
end

broken -> broken : 글자 조합\n(저 + 는 = 저는)
broken -> broken : 단어 해석\n(저는 황준일입니다)
broken --> reader : 최종 해석 완료\n(에너지 2~3x)
deactivate broken

note over reader : 추상화가 깨지면\n2~3배 더 많은 에너지 소모

@enduml



- “안녕하세요” → 처음에는 매끄럽게 잘 읽힌다.
- “ㅈㅓㄴㅡㄴㅎㅘㅇ준일ㅇㅣㅂ니다” → **한 글자씩 곱씹어보면서 자음 모음을 조합하여 어떤 단어인지 유추**한다
- “저는 황준일입니다” 라고 해석이 완료되었을 때, “안녕하세요”를 합쳐서 전체적인 한 문장으로 해석할 수 있다.

추상화가 잘 되어있는 기존의 문장은 한글이 숙련된 사람들에게 굉장히 잘 읽힌다.

그런데 이제 **추상화 수준이 깨지면 이를 해석하기 위해 잘 쓰여진 문장보다 2~3배의 에너지**를 더 써야한다.

이건 **코드를 작성할 때에도 마주할 수 있는 문제**라고 생각한다.

## 2. 문제가 되는 코드

React에서 무한 스크롤을 구현하는 커스텀 훅을 살펴보자.

```tsx
// useThemeInfiniteScroll.ts - 문제가 있는 코드
export function useThemeInfiniteScroll({
  themeId,
  initialCursor = null,
  threshold = 0.5,
}: ThemeInfiniteScrollOptions) {
  
  // Level 1: 기본 훅과 상태 관리
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState<number | null>(initialCursor);
  const [moreAvailable, setMoreAvailable] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  // Level 2: API 호출 훅
  const { data: initialData } = useSuspenseApiQuery<ThemeProductResponse>({
    url: `${API_ENDPOINTS.THEME_PRODUCTS(Number(themeId))}`,
    queryKey: ["theme-products", themeId, "initial"],
  });

  // Level 2: API 호출 훅
  const {
    isLoading: queryLoading,
    error: queryError,
    refetch,
  } = useApiQuery<ThemeProductResponse>({
    url: `${API_ENDPOINTS.THEME_PRODUCTS(Number(themeId))}${cursor ? `?cursor=${cursor}` : ""}`,
    queryKey: ["theme-products", themeId, cursor],
    enabled: false,
  });
  
  // level 1: 초기 데이터 설정
  useEffect(() => {
    if (initialData) {
       setProducts(initialData.list);
       setCursor(initialData.cursor ?? null);
       setMoreAvailable(
         initialData.hasMoreList !== false && !!initialData.list.length
       );
    }
  }, [initialData]);
  
  // Level 1: 복잡한 페이징 로직과 에러처리
  const fetchNext = useCallback(
   async (entries: IntersectionObserverEntry[]) => {
      if (!moreAvailable || loading) return;
      setLoading(true);
      setError(null);
      try {
         const result = await refetch();
         const res = result.data as ThemeProductResponse;
         setProducts((prev) => {
            const existingIds = new Set(prev.map((item) => item.id));
            const filtered = res.list.filter((item) => !existingIds.has(item.id));
            return [...prev, ...filtered];
         });
         setCursor(res.cursor ?? null);
         setMoreAvailable(res.hasMoreList !== false && !!res.list.length);
      } catch (err) {
         setError(err);
      } finally {
         setLoading(false);
      }
   },
   [refetch, moreAvailable, loading]
  );
  
  // Level 2: Intersection Observer 훅
  useIntersectionObserver({
    targetRef: observerRef,
    onIntersect: fetchNext,
    enabled: moreAvailable && !loading && products.length > 0,
    threshold,
  });
  
  return {
    products,
    loading: loading || queryLoading,
    moreAvailable,
    error: error || queryError,
    observerRef,
    fetchNext,
  };
}
```

이 코드는 추상화 수준이 정렬되지 않은 **서로 다른 추상화 레벨로 조합된 코드이다.**

- Level 1: `useState` 등의 기본 훅과 이를 사용하는 복잡한 페이징 로직과 에러처리
- Level 2: `useQuery`, `useIntersectionObserver` 등의 커스텀 훅
- Level 3: 1~2를 가져다 사용한 `useThemeInfiniteScroll` 훅 자체

@startuml
!theme plain

rectangle "Level 1" as level1 #ffcccc {
   rectangle "useState, useRef, useCallback"
   rectangle "복잡한 페이징 로직"
}

rectangle "Level 2" as level2 #ffffcc {
   rectangle "useQuery"
   rectangle "useIntersectionObserver"
}

rectangle "Level 3" as level3 #ccffcc {
   rectangle "useThemeInfiniteScroll"
}

level1 --> level3 : "직접 사용"
level2 --> level3 : "함께 사용"

note bottom : 문제: 서로 다른 추상화 수준이 한 곳에 섞임\n마치 "안녕하세요ㅈㅓㄴㅡㄴㅎㅘㅇ준일ㅇㅣㅂ니다"와 같음

@enduml


마치 문장을 쓸 때 "**안녕하세요ㅈㅓㄴㅡㄴㅎㅘㅇ준일ㅇㅣㅂ니다**" 처럼 읽기 어려운 형태의 훅이라고 할 수 있다. 이걸 “안녕하세요 저는 황준일입니다” 로 개선하는 과정이 필요하다.

::: tip 파생되는 문제

사실 추상화 수준과 관련된 부분 말고도 아래와 같은 잠재적인 문제를 가지고 있다.
추상화 수준이 낮다는 것은 단일 책임 원칙에 위배되는 상황과 맞물릴 수 있다.
**현재 useThemeInfiniteScroll 훅은 여러가지 일을 한 번에 수행하고 있다.**

- api 호출 데이터를 직접적으로 관리한다.
- api 호출을 직접 수행하고 있다.
- 다양한 훅을 조합하고 있다.

개발 조직을 통해 비유해보자면, 팀장이 팀장의 역할 외의 다양한 잡일(?)을 수행하는 모습이다. ~~사실 인력이 부족하면 이런 일이 발생한다.~~

신입 개발자를 채용하여(=커스텀훅을 만들어서) 이 문제를 해결 하거나 혹은 다른 개발자(=다른 훅)에게 이 일을 위임할 수 있다.

:::

## 3. 개선된 모습

### 정렬된 추상화 레벨과 조합

```
Level 2 (각각 명확한 단일 책임):
├── useInitThemeData (초기 데이터 fetching)
├── useInitNextThemeData (다음 페이지 데이터 쿼리)
└── useThemeData (테마 데이터 상태 관리)

Level 3 (Level 2 훅들의 조합):
└── useThemeInfiniteScroll (훅들을 조합하여 완전한 기능 제공)
```

### Step 1) Level 1 - 원자적 훅들 (각각 하나의 명확한 책임)

```tsx
// 2-1. 초기 데이터 fetching만 담당
const useInitThemeData = (themeId: string) => {
  return useSuspenseApiQuery<ThemeProductResponse>({
    url: `${API_ENDPOINTS.THEME_PRODUCTS(Number(themeId))}`,
    queryKey: ["theme-products", themeId, "initial"],
  });
};

// 2-2. 다음 페이지 데이터 쿼리만 담당
const useInitNextThemeData = (themeId: string, cursor: number | null) => {
  return useApiQuery<ThemeProductResponse>({
    url: `${API_ENDPOINTS.THEME_PRODUCTS(Number(themeId))}${cursor ? `?cursor=${cursor}` : ""}`,
    queryKey: ["theme-products", themeId, cursor],
    enabled: false,
  });
};

// 2-3. 테마 데이터 상태 관리만 담당
const useThemeData = (
  initData: ReturnType<typeof useInitThemeData>["data"],
  initialCursor: number | null,
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cursor, setCursor] = useState(initialCursor);
  const [moreAvailable, setMoreAvailable] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 명확한 역할 분리된 내부 함수들
  const start = () => {
    setLoading(true);
    setError(null);
  };

  const onError = (err: string) => setError(err);
  const end = () => setLoading(false);

  const append = useCallback(
    (newProducts: Product[], newCursor: number | null, hasMore: boolean) => {
      setProducts((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const filtered = newProducts.filter(
          (item) => !existingIds.has(item.id),
        );
        return [...prev, ...filtered];
      });
      setCursor(newCursor);
      setMoreAvailable(hasMore && !!newProducts.length);
    },
    [],
  );

  const fetchNext = useCallback(
    (
      request: () => Promise<QueryObserverResult<ThemeProductResponse, Error>>,
    ) => {
      if (!moreAvailable || loading) return;
      start();
      request()
        .then((result) => {
          const data = result.data as ThemeProductResponse;
          append(data.list, data.cursor, data.hasMoreList);
        })
        .catch(onError)
        .finally(end);
    },
    [append, loading, moreAvailable],
  );

  // 초기 데이터 설정
  useEffect(() => {
    if (initData) {
      append(initData.list, initData.cursor ?? null, initData.hasMoreList);
    }
  }, [initData, append]);

  return {
    data: products,
    cursor,
    moreAvailable,
    loading,
    error,
    fetchNext,
  };
};
```

### Step 2) Level 2 - 조합 훅들 (Level 1 훅들의 조합)

```tsx
// 3. Level 2 훅들을 조합하여 완전한 무한 스크롤 기능 제공
export function useThemeInfiniteScroll({
  themeId,
  initialCursor = null,
  threshold = 0.5,
}: ThemeInfiniteScrollOptions) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Level 2 훅들을 조합
  const { data: initialData } = useInitThemeData(themeId);
  const theme = useThemeData(initialData, initialCursor);
  const nextTheme = useInitNextThemeData(themeId, theme.cursor);
  
  // 각 훅의 기능을 연결
  const fetchNextTheme = useCallback(
    () => theme.fetchNext(nextTheme.refetch),
    [nextTheme.refetch, theme],
  );

  // Level 1 훅과 연결
  useIntersectionObserver({
    targetRef: observerRef,
    onIntersect: fetchNextTheme,
    enabled: theme.moreAvailable && !theme.loading && theme.data.length > 0,
    threshold,
  });

  return {
    ...theme,
    loading: theme.loading ?? nextTheme.isLoading,
    error: theme.error ?? nextTheme.error,
    observerRef,
    fetchNext: fetchNextTheme,
  };
}
```

@startuml
!theme plain

rectangle "Level 1" as new_level1 #e6f3ff {
   rectangle "useIntersectionObserver"
   rectangle "useSuspenseApiQuery"  
   rectangle "useApiQuery"
}

rectangle "Level 2" as new_level2 #cce6ff {
   rectangle "useInitThemeData"
   rectangle "useInitNextThemeData"
   rectangle "useThemeData"
}

rectangle "Level 3" as new_level3 #b3daff {
   rectangle "useThemeInfiniteScroll"
}

new_level1 --> new_level2 : "구성"
new_level2 --> new_level3 : "조합"

@enduml

::: tip 정리하기

1. 명확한 추상화 레벨 분리
   - `Level 1:` useIntersectionObserver, useSuspenseApiQuery, useApiQuery
   - `Level 2:` useInitThemeData, useInitNextThemeData, useThemeData
   - `Level 3:` useThemeInfiniteScroll (조합을 통한 완전한 기능)

2. 단일 책임 원칙 준수
   - `useInitThemeData`: 초기 데이터 fetching만
   - `useInitNextThemeData`: 다음 페이지 쿼리만
   - `useThemeData`: 데이터 상태 관리만
   - `useThemeInfiniteScroll`: 조합을 통한 연결만

3. 조합 가능성과 재사용성
   - `useThemeData`는 다른 데이터 타입에도 재사용 가능
   - 각 훅을 독립적으로 테스트 가능
   - 필요에 따라 일부 훅만 사용 가능

4. 가독성 향상
   - AS-IS: "안녕하세요ㅈㅓㄴㅡㄴㅎㅘㅇ준일ㅇㅣㅂ니다"
   - TO-BE: "안녕하세요. 저는 개발자입니다."

:::

## 4. 추상화 정렬의 핵심 원칙

### (1) 같은 레벨끼리만 조합하자

```
✅ 올바른 조합:
useInitThemeData + useThemeData + useInitNextThemeData = useThemeInfiniteScroll

❌ 잘못된 조합 (기존):
useState + useSuspenseApiQuery + 복잡한 로직 + useIntersectionObserver = ???
```

### (2) 각 훅의 명확한 단일 책임

- **useInitThemeData**: "초기 데이터만 가져온다"
- **useThemeData**: "테마 데이터 상태만 관리한다"
- **useInitNextThemeData**: "다음 페이지 쿼리만 준비한다"
- **useThemeInfiniteScroll**: "위 훅들을 조합해서 완전한 기능을 제공한다"

### (3) 조합을 통한 확장성

```tsx
// 다른 방식으로도 조합 가능
const MyComponent = () => {
  const { data: initialData } = useInitThemeData(themeId);
  const theme = useThemeData(initialData, null);

  // 다른 조건으로 사용
  const handleButtonClick = () => {
    theme.fetchNext(someOtherRefetchFunction);
  };

  return <div>...</div>;
};
```

## 마무리

좋은 코드는 한글을 읽는 것처럼 자연스럽게 읽혀야 한다.
**같은 추상화 레벨의 훅들이 모여 더 높은 레벨의 기능을 구성**할 때, 코드의 의도가 명확해지고 유지보수가 쉬워진다.
각 훅이 명확한 단일 책임을 가지고, 이들이 조합되어 완전한 기능을 만드는 구조.

이것이 바로 **추상화를 정렬하는 방법**이라고 생각한다.

훅(혹은 함수)는 레고 블록과 비슷하다. 각각이 명확한 기능을 가지고, 이들을 조합해서 더 복잡한 기능을 만들어야 한다.
하나의 블록에 모든 기능을 우겨넣지 말고, 작은 블록들을 조합해서 아름다운 구조물을 만들 수 있다.
