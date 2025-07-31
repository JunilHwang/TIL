---

title: 이벤트와 함수는 다르다 | 리액트 클린코드
description:  React와 JavaScript에서 이벤트와 함수를 구분하는 방법에 대해 다룹니다.
sidebarDepth: 2
date: 2025-07-30
tag: javascript, react, 클린코드
keywords: javascript clean code, react clean code, 자바스크립트 클린코드, 리액트 클린코드, 프론트엔드 클린코드
thumbnail: https://raw.githubusercontent.com/JunilHwang/TIL/refs/heads/master/clean-code/조각모음/thumbnail.webp

---

# [클린코드 조각모음] 이벤트와 함수는 다르다

> 이 글은 **React**와 **JavaScript**를 사용한 **프론트엔드 개발**에서 **클린코드**를 작성하기 위한 실용적인 가이드입니다.
> 특히 **자바스크립트** 이벤트 처리와 **리액트** 컴포넌트 설계에 대한 베스트 프랙티스를 다룹니다.

![클린코드 조각모음](https://raw.githubusercontent.com/JunilHwang/TIL/refs/heads/master/clean-code/조각모음/thumbnail.webp)

::: tip 이벤트는 "알림"이고, 함수는 "실행"이다.

컴포넌트가 "나는 이런 일이 일어났다고 알려줄게"라고 말한다면, 사용하는 쪽에서는 "그럼 난 그 알림을 받아서 이런 일을 할게"라고 응답해야 한다.

:::

## 1. 이벤트에 대한 고찰

### (1) 이벤트 이름의 의미 파악하기

React 컴포넌트를 개발하다 보면 이런 props 이름들을 자주 만나게 된다

```tsx
// 자주 보는 이벤트 props들
<Modal onClose={handleClose} />
<Header onLogout={handleLogout} />
<Button onClick={handleClick} />
<Tab onTabChange={handleTabChange} />
```

언뜻 보기에는 자연스러워 보이지만, 각각의 의미를 정확히 파악하고 있을까?

**"on"으로 시작하는 props의 의미**를 다시 한번 생각해보자. `on`은 "~할 때", "~가 발생했을 때"라는 의미를 가진다.

- `onClose` → "close가 발생했을 때"
- `onLogout` → "logout이 발생했을 때"
- `onClick` → "click이 발생했을 때"

여기서 중요한 점은 **이벤트는 "이미 일어난 일"에 대한 알림**이라는 것이다.

### (2) `onClose`는 무엇을 의미할까?

```tsx
// 문제가 있는 Modal 컴포넌트
interface ModalProps {
  opened: boolean;
  onClose: () => void;  // 이게 정말 "close 이벤트"일까?
}

const Modal = ({ opened, onClose }: ModalProps) => {
  return (
    <div className="modal">
      {/* onClose가 "닫는 함수"로 사용되고 있다 */}
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

// 사용하는 곳
const App = () => {
  const [modalOpened, setModalOpened] = useState(false);
  
  const handleCloseModal = () => {
    setModalOpened(false);  // 실제 "닫는" 작업
  };
  
  return (
    <Modal 
      opened={modalOpened} 
      onClose={handleCloseModal}  // "닫는 함수"를 전달하고 있다
    />
  );
};
```

위 코드에서 `onClose`는 실제로는 **닫는 함수**의 역할을 하고 있다. 하지만 이름은 **닫힘 이벤트**를 의미한다.

**`onClose`가 유의미한 이벤트가 되기 위해선** 이런 역할을 수행해야 하지 않을까?
- Modal 컴포넌트가 **"나는 지금 닫혔어!"** 라고 알려주는 것
- 사용하는 쪽에서 **"아, 닫혔구나. 그럼 상태를 업데이트해야지"** 라고 반응하는 것

### (3) `onLogout`은 무엇을 의미할까?

```tsx
// 혼동이 있는 Header 컴포넌트
const Header = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <header>
      {/* onLogout이 "로그아웃 함수"처럼 사용되고 있다 */}
      <button onClick={onLogout}>로그아웃</button>
    </header>
  );
};

// 사용하는 곳  
const App = () => {
  const handleLogout = () => {
    // 실제 로그아웃 로직
    clearUserSession();
    navigate('/login');
  };
  
  return <Header onLogout={handleLogout} />;
};
```

여기서도 `onLogout`이 이벤트가 아닌 함수의 역할을 수행하고 있다.

**`onLogout`이 유의미한 이벤트가 되기 위해선** 이런 역할을 수행해야 하지 않을까?
```tsx
// 올바른 관점에서의 사용법
const Header = ({ onLogout }) => {
  const handleLogout = () => {
    alert('로그아웃이 완료되었습니다.')
    onLogout?.();  // "로그아웃이 발생했음"을 알리는 콜백 호출
  };
  
  const { logout } = useAuth({ onLogout: handleLogout });
  
  return (
    <header>
      <button onClick={logout}>로그아웃</button>
    </header>
  );
};

// 사용하는 곳  
const App = () => {
  // 실제 로그아웃 이후에 실행할 로직
  const handleLogout = () => navigate('/login');
  return <Header onLogout={handleLogout} />;
};
```

### (4) HTML의 `onClick`과 비교해보기

HTML의 기본 이벤트를 생각해보자

```tsx
<button onClick={handleClick}>클릭</button>
```

여기서 `onClick`은
- **"클릭이 발생했음"** 을 브라우저가 알려주는 이벤트
- `handleClick`은 **그 이벤트를 받아서 실행되는 함수**

즉, 브라우저는 "클릭이 일어났어!"라고 알려주고, 개발자는 "그럼 이 함수를 실행할게"라고 응답하는 구조다.

**React 컴포넌트도 동일한 관점으로 접근해야 한다**

```tsx
// HTML의 관점을 React에 적용
<MyComponent 
  onClick={handleClick}     // "클릭이 발생했을 때" 실행할 함수
  onClose={handleClose}     // "닫힘이 발생했을 때" 실행할 함수  
  onLogout={handleLogout}   // "로그아웃이 발생했을 때" 실행할 함수
/>
```

컴포넌트는 **"이런 일이 일어났다"고 알려주는 역할**만 해야 하고, 사용하는 쪽에서 **"그럼 이런 일을 하겠다"고 응답**하는 구조가 되어야 한다.


## 2. 관점의 차이로 이해하기

### (1) 컴포넌트 입장: "나는 이런 일이 일어났다고 알려줄게"

컴포넌트는 **자신 내부에서 발생한 일**에 대해서만 알려줄 수 있다.

#### 1) 기능이 없는 모달

```tsx
const ConfirmModal = ({ onCancelClick, onConfirmClick }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>알림</h2>
        <p>정말로 삭제하시겠습니까?</p>
        <button
          // 사용자가 '취소' 버튼을 클릭 -> "취소 버튼을 클릭했다"고 알려주기만 함
          onClick={onCancelClick}
        >
          취소
        </button>
        <button
          // 사용자가 '확인' 버튼을 클릭 -> "확인 버튼을 클릭했다"고 알려주기만 함
          onClick={onConfirmClick}
        >
          확인
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [opened, setOpened] = useState(false);
  // 취소 버튼을 클릭했을 때 close 함수를 실행한다.
  const close = () => setOpened(false);
  
  // 확인 버튼을 클릭했을 때 confirm 함수를 실행한다.
  const confirm = () => {
    alert('완료되었습니다.')
    close();
  };

  return (
    <div>
      {opened && (
        <ConfirmModal
          onCancelClick={close}
          onConfirmClick={confirm}
        />
      )}
    </div>
  );
};
```

닫기 기능을 자체적으로 가지고 있지 않은 Modal 컴포넌트는
- **취소 버튼이 클릭되었음**을 알 수 있다
- **확인 버튼이 클릭되었음**을 알 수 있다
- **Modal을 어떻게 닫을지** 등은 Modal의 책임이 아니고, 이에 대한 용어(close, confirm) 또한 알 필요가 없다

즉, **컴포넌트는 자신의 경계 안에서 일어난 일** 만 바깥에 알려줄 수 있어야 한다.

#### 2) 기능이 포함된 모달

```tsx
const ConfirmModal = ({ onClose, onCancelClick, onConfirmClick }) => {
  // close 함수 실행 후에 내부적으로 onClose가 호출되도록 한다.
  // confirm 함수 실행 후에 내부적으로 onConfirm이 호출되도록 한다.
  const { close } = useModal({ onClose });
  
  // Esc 키로 닫기 기능 추가
  useEscKeyDown(close);

  const handleCancelClick = () => {
    // 모달을 닫은 후에 onCancelClick을 호출한다.
    close();
    onCancelClick?.();
  };
  
  const handleConfirmClick = () => {
    // 모달을 닫은 후에 onConfirmClick을 호출한다.
    close();
    onConfirmClick?.();
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>알림</h2>
        <p>정말로 삭제하시겠습니까?</p>
        <button onClick={handleCancelClick}>취소</button>
        <button onClick={handleConfirmClick}>확인</button>
      </div>
    </div>
  );
};
````

Modal이 자체적으로 닫기 기능을 가지고 있을 경우
- **취소 버튼이 클릭되었음**을 알 수 있다
- **확인 버튼이 클릭되었음**을 알 수 있다
- **Modal이 닫혔음**을 알 수 있다

### (2) 사용하는 입장: "그럼 나는 그 알림을 받아서 이런 일을 할게"

컴포넌트를 사용하는 쪽에서는 **그 알림을 받아서 어떤 일을 할지 결정**한다.

```tsx
// App 컴포넌트의 관점
const App = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  // Modal에서 취소 버튼이 클릭됨. 이 때 모달을 닫아야함.
  const handleCancelClick = () => setModalOpened(false);
  
  // Modal에서 확인 버튼이 클릭됨. 이 때 사용자 설정을 저장하고 모달을 닫아야함.
  const handleConfirmClick = async () => {
    // "그럼 나는 이런 일들을 하겠어"
    setLoading(true);             // 로딩 상태 표시
    await saveUserPreference();   // 사용자 설정 저장
    handleCancelClick();          // 모달 닫기
    showSuccessToast();           // 성공 메시지 표시
    setLoading(false);            // 로딩 완료
  };

  return (
    <div>
      {modalOpened && (
        <Modal
          // "Modal에서 취소 버튼이 클릭된 경우 이에 대해 처리함"
          onCancelClick={handleCancelClick}
          onConfirmClick={handleConfirmClick}
        />
      )}
      {loading && <Spinner />}
    </div>
  );
};
```

App 컴포넌트는

- Modal의 상태 관리 책임을 가진다
- 취소 버튼 클릭과 확인 버튼 클릭 후의 로직 결정권을 가진다
- 전체 애플리케이션의 흐름 제어권을 가진다
- Modal 내부의 구현 세부사항은 알 필요가 없다

### (3) 이벤트 핸들러와 함수를 구분하자

앞서 살펴본 코드에서 중요한 문제가 하나 있다

```tsx{4}
const handleConfirmClick = async () => {
  setLoading(true);
  await saveUserPreference();
  handleCancelClick(); // cancel을 클릭하지 않았는데 이 함수를 호출하는게 맞는걸까?
  showSuccessToast();
  setLoading(false);
};
```

`handleCancelClick`을 다른 곳에서 호출하는 것이 어색하다.
이름은 **"취소 버튼 클릭 핸들러"** 를 의미하는데, 실제로는 **취소 버튼을 클릭하지 않았기 때문**이다.

즉, 이름이 행동을 제한하도록 만든 것이다.

그래서 이벤트 핸들러로 네이밍을 하는 대신, 함수가 실제로 하는 일에 맞게 이름을 변경하하면 어떨까?

```tsx
const App = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  // 기존의 handleCancelClick으로 네이밍이 되었을 때, 이름을 통해 행동을 제한하게 된다.
  // 즉, "이건 취소 버튼이 클릭되었을 때 실행되는 함수야"라고 생각하게 된다.
  // 그런데 실제로는 "모달을 닫는 함수"이기 때문에 close로 이름을 변경하면 더 명확해진다.
  const close = () => setModalOpened(false);
  
  // 마찬가지로 handleConfirmClick으로 네이밍이 되었을 때 "이건 확인 버튼이 클릭되었을 때 실행되는 함수야"라고 생각하게 된다.
  // 하지만 실제로는 "사용자 설정을 저장하고 모달을 닫는 함수"이기 때문에 confirm으로 이름을 변경하면 더 명확해진다.
  const confirm = async () => {
    setLoading(true);
    await saveUserPreference();
    close();
    showSuccessToast();
    setLoading(false); 
  };

  return (
    <div>
      {modalOpened && (
        <Modal
          // "Modal에서 취소 버튼이 클릭된 경우 이에 대해 처리함"
          onCancelClick={close}
          onConfirmClick={confirm}
        />
      )}
      {loading && <Spinner />}
    </div>
  );
};
```

close, confirm이라고 이름을 지어주면 꼭 이벤트가 발생했을 때 사용할 수도 있고, 다른 함수에서 호출하여 사용해도 큰 어색함이 없다.

그릐고 커스텀 훅을통해 관심사를 분리하고 다양한 상황에 쓰일 수 있도록 할 수 있다.

```tsx
const useModal = ({ onConfirm }) => {
  const [opened, setOpened] = useState(false);
  const close = () => setOpened(false);
  const confirm = () => {
    const result = onConfirm?.();
    if (result instanceof Promise) {
      result.then(close);
    } else {
      close();
    }
  };
  
  return { opened, close, confirm }
};

const useSaveUserPreference = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const save = () => {
    setLoading(true);
    saveUserPreference()
      .then(toast.showSuccess)
      .catch(toast.showError)
      .finally(() => setLoading(false))
  };

  return { loading, save }
};

const App = () => {
  const userPreference = useSaveUserPreference();
  const modal = useModal({ onConfirm: userPreference.save });

  return (
    <div>
      {modalOpened && (
        <Modal
          // "Modal에서 취소 버튼이 클릭된 경우 이에 대해 처리함"
          onCancelClick={modal.close}
          onConfirmClick={modal.confirm}
        />
      )}
      {userPreference.loading && <Spinner />}
    </div>
  );
};
```

`modal`에서 `confirm`이 실행될 때 `userPreference.save`가 실행되고 그 결과에 따라 모달이 닫히도록 설계한 것이다.

::: tip 추상화를 정렬하기

모달과 모달에 대한 연계 기능을 훅으로 분리했다. 이건 "추상화를 정렬하기" 원칙에 따라 모달과 모달에 대한 연계 기능을 분리한 것이다.

[link-preview: https://junilhwang.github.io/TIL/clean-code/%EC%A1%B0%EA%B0%81%EB%AA%A8%EC%9D%8C/%EC%B6%94%EC%83%81%ED%99%94%EB%A5%BC-%EC%A0%95%EB%A0%AC%ED%95%98%EA%B8%B0/]

:::

## 3. 이벤트와 함수 네이밍 가이드

지금까지 살펴본 내용을 바탕으로 **실용적인 네이밍 가이드라인**을 정리하자.

### (1) 이벤트 네이밍: `on` + 실제 발생한 일

**컴포넌트 내부에서 실제로 발생한 일을 기준으로 명명하기**

```tsx
// ✅ 올바른 이벤트 네이밍
<Button onClick={handleClick} />           // 클릭이 발생함
<Modal onCancelClick={handleCancel} />     // 취소 버튼 클릭이 발생함  
<Form onSubmit={handleSubmit} />           // 제출이 발생함
<Input onChange={handleChange} />          // 값 변경이 발생함
<Modal onClose={handleClose} />            // 닫힘이 발생함 (실제로 닫힌 후)

// ❌ 잘못된 이벤트 네이밍  
<Modal onClose={closeModal} />             // 아직 닫히지 않았는데 onClose?
<Tab onTabChange={changeTab} />            // change 함수를 이벤트처럼 사용
```

#### 이벤트 네이밍 패턴

| 패턴 | 의미 | 예시 | 발생 시점 |
|------|------|------|----------|
| **on + Click** | "~이 클릭됨" | `onCancelClick`, `onConfirmClick` | 버튼을 클릭했을 때 |
| **on + Change** | "~이 변경됨" | `onChange`, `onValueChange` | 값이 실제로 변경된 후 |
| **on + Submit** | "~이 제출됨" | `onSubmit`, `onFormSubmit` | 폼이 제출될 때 |
| **on + Close** | "~이 닫힘" | `onClose`, `onModalClose` | 실제로 닫힌 후 |
| **on + Open** | "~이 열림" | `onOpen`, `onMenuOpen` | 실제로 열린 후 |
 

### (2) 함수 네이밍: 실제 수행할 작업 기준

**함수가 실제로 수행하는 작업을 동사 원형으로 표현하기**

```tsx
// ✅ 올바른 함수 네이밍
const close = () => setModalOpen(false);          // 모달을 닫는다
const submit = () => sendFormData();              // 폼을 제출한다  
const save = () => saveUserPreference();          // 저장한다
const confirm = () => processConfirmation();      // 확인 처리한다
const cancel = () => resetForm();                 // 취소 처리한다

// ❌ 잘못된 함수 네이밍
const handleClose = () => setModalOpen(false);    // handle은 이벤트 핸들러용
const onClose = () => setModalOpen(false);        // on은 이벤트용
const closeModal = () => setModalOpen(false);     // 불필요한 중복
```

여기서 주목해야할건, 대부분의 사람들이 handleClose를 close로 사용한다는 점이다.
**handleClose는 "실제로 close가 되었을 때 이를 처리하는 이벤트 핸들러" 임을 명심하자.**

#### 함수 네이밍 패턴

| 패턴 | 사용 상황 | 예시 | 
|------|----------|------|
| **동사 원형** | 일반적인 동작 함수 | `close`, `open`, `save`, `delete` |
| **handle + 동사** | 이벤트 핸들러 함수 | `handleClick`, `handleSubmit`, `handleChange` |
| **동사 + 명사** | 구체적인 동작 | `saveUser`, `deletePost`, `updateProfile` |

### (3) HTML 태그처럼 생각하기

**HTML의 이벤트 시스템을 기준으로 생각하면 자연스러운 네이밍이 나온다.**

```tsx
// HTML의 이벤트 패턴
<button onclick="handleClick()">클릭</button>
<form onsubmit="handleSubmit()">제출</form>
<input onchange="handleChange()">입력</input>

// React 컴포넌트도 동일한 패턴
<Modal onCancelClick={handleCancel}>모달</Modal>
<Form onSubmit={handleSubmit}>폼</Form>  
<Input onChange={handleChange}>입력</Input>
```

::: tip

컴포넌트를 그냥 확장된 태그라고 생각해보면 편하다. 이벤트나 함수를 다룰 때 handle로 시작하는 속성을 가진 태그는 없으니까.

```tsx
// ❌ HTML에는 이런 속성이 없다
<button handleClick="..." />
<form handleSubmit="..." />

// ✅ HTML과 동일한 패턴을 유지
<MyButton onClick={handleClick} />
<MyForm onSubmit={handleSubmit} />
```

:::


### (4) 예시로 살펴보기

#### 1) Modal 컴포넌트

```tsx
// ❌ Before: 이벤트와 함수가 혼재
<Modal 
  handleClose={closeModal}        // handle은 props에 적합하지 않음
  onClose={closeModal}            // onClose가 함수를 받고 있음
/>

// ✅ After: 명확한 역할 분리
<Modal 
  onCancelClick={close}           // 취소 버튼 클릭 이벤트
  onConfirmClick={confirm}        // 확인 버튼 클릭 이벤트  
  onClose={handleModalClose}      // 모달 닫힘 이벤트 (실제로 닫힌 후)
/>
```

#### 1) Form 컴포넌트

```tsx
// ❌ Before: 의미가 모호함
<UserForm 
  onFormSubmit={submitUserForm}           // 중복
  handleSubmit={submitUserForm}           // handle은 props에 부적절
  submitForm={submitUserForm}             // 함수를 props로 전달
/>

// ✅ After: 명확한 의미
<UserForm 
  onSubmit={saveUser}                     // 제출 이벤트 → 저장 함수
  onCancel={goBack}                       // 취소 이벤트 → 뒤로가기 함수
  onValidationError={showErrorMessage}   // 검증 실패 이벤트 → 에러 표시 함수
/>
```

#### 1) Tab 컴포넌트

```tsx
// ❌ Before: 이벤트 이름과 실제 동작 불일치
<Tabs 
  onTabChange={changeTab}        // change 함수가 이벤트 핸들러로 사용됨
  handleTabClick={changeTab}     // handle이 props에 사용됨
/>

// ✅ After: 실제 발생하는 이벤트 기준
<Tabs 
  onTabClick={switchTab}         // 탭 클릭 이벤트 → 탭 전환 함수
  onTabChange={trackTabChange}   // 탭 변경 이벤트 → 분석 추적 함수
/>
```

### (5) 정리

#### 1) 핵심 원칙들

1. **이벤트는 "알림"** - `on` + 실제 발생한 일
2. **함수는 "실행"** - 동사 원형 + 실제 수행할 작업
3. **HTML처럼 생각** - 기본 태그의 이벤트 패턴 참고
4. **재사용 고려** - 특정 컨텍스트에 종속되지 않는 이름
5. **의미의 일치** - 이름과 실제 동작이 일치해야 함

#### 2) 좋은 네이밍의 효과

- 코드의 의도가 명확해진다
- 재사용성이 높아진다
- 팀원 간의 소통이 원활해진다
- 버그 발생 가능성이 줄어든다
- 유지보수가 쉬워진다

이벤트와 함수를 명확히 구분하는 것은 단순한 네이밍 문제가 아니라 **더 나은 컴포넌트 설계의 시작**이다.

## 더 생각해보기: Headless UI 

지금까지 살펴본 이벤트와 함수의 구분을 더 발전시키면 **Headless UI**의 개념으로 이어질 수 있다.

::: tip Headless UI란?

- 컴포넌트는 **오직 UI 렌더링**에만 집중
- 상태와 로직은 **Context에서 관리**
- 이벤트는 **Context를 통해 자동으로 처리**

::: 

### (1) Modal의 Headless UI 구현

```tsx
// 1. Modal 상태와 로직을 관리하는 Context
const ModalContext = createContext(null);

// 2. Modal Provider - 상태 관리의 중심
const ModalProvider = ({
  ref,
  children,
  onClose
}) => {
  const [opened, setOpened] = useState(false);
  
  const open = () => setOpened(true);
  const close = () => {
    setOpened(false);
    onClose?.(); // close가 되었을 때 onClose 콜백 호출
  };
  
  useImperativeHandle(ref, () => ({
    open,
    close
  }), [open, close]);
  
  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

// 3. Modal 상태에 접근하는 Hook
const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
};

// 4. UI 컴포넌트들 - 순수하게 렌더링만 담당
const ModalTrigger = ({ children }) => {
  const { open } = useModal();
  return <div onClick={open}>{children}</div>;
};

const ModalWrapper = ({ children }) => {
  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

const ModalClose = ({ children }) => {
  const { close } = useModal();
  return <button onClick={close}>{children}</button>;
};

const ModalRoot = ({ children, onClose, ref }) => {
  return (
    <ModalProvider onClose={onClose} ref={ref}>
      {children}
    </ModalProvider>
  );
};

const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Content: ModalWrapper,
  Close: ModalClose
});
```

- ModalContext: Modal의 상태와 로직을 관리하는 Context
- ModalProvider: Modal의 상태를 관리하고, 외부에서 접근할 수 있는 open/close 함수를 제공
- useModal: Modal의 상태에 접근할 수 있는 Hook
- ModalTrigger, ModalWrapper, ModalClose: UI 컴포넌트들로, 각각의 역할에 맞게 렌더링만 담당
- ModalRoot: Modal의 최상위 컴포넌트로, ModalProvider를 감싸고 children을 렌더링
- Modal: ModalRoot를 확장하여 Trigger, Content, Close 컴포넌트를 포함하는 객체

이렇게 구현된 Modal은 Headless UI 패턴을 따르며, UI와 로직을 완전히 분리할 수 있다.

이 코드가 쓰이는 모습은 다음과 같다.

```tsx
const App = () => {
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);
  
  // Modal이 닫힐 때 실행될 로직
  const handleModalClose = () => {
    console.log('Modal이 닫혔습니다!');
  };
  
  const handleConfirm = async () => {
    setLoading(true);
    await saveUserPreference();
    showSuccessToast();
    setLoading(false);
    modalRef.current.close(); // Modal을 닫는 함수 호출
  };

  return (
    <Modal ref={modalRef} onClose={handleModalClose}>
      <div>
        <Modal.Trigger>
          <button>모달 열기</button>
        </Modal.Trigger>
        
        <Modal.Content>
          <h2>정말로 삭제하시겠습니까?</h2>
          <div>
            <Modal.Close>
              <button>취소</button>
            </Modal.Close>
            <button onClick={handleConfirm}>
              확인
            </button>
          </div>
        </Modal.Content>
      </div>
      
      {loading && <Spinner />}
    </Modal>
  );
};
```


### (2) 이벤트와 상태 관리의 완전한 분리

Headless UI 패턴의 핵심은 **이벤트가 자동으로 적절한 시점에 발생**한다는 것이다.

Modal 예시에서 보면
- 사용자가 취소 버튼을 **클릭** → `onClick` 이벤트 발생
- Context 내부에서 Modal을 **닫음** → `onClose` 이벤트 자동 발생
- 외부에서는 **"닫혔다"는 알림**만 받아서 후속 처리

이렇게 각 이벤트가 **실제로 발생한 일**을 정확히 반영하게 된다.

### (3) Headless UI의 장점들

#### 1) 관심사의 완전한 분리

```tsx
// ❌ 기존 방식: 로직과 UI가 섞임
const Modal = ({ onClose, onConfirm }) => {
  const [loading, setLoading] = useState(false);
  // UI와 비즈니스 로직이 한 곳에...
};

// ✅ Headless UI: 각각의 역할이 명확
const ModalProvider = () => { /* 상태 관리만 */ };
const ModalContent = () => { /* UI 렌더링만 */ };
const useModal = () => { /* 로직 접근만 */ };
```

#### 2) 재사용성이 높아짐

```tsx
// 같은 로직, 다른 스타일
<ModalProvider>
  {/* 기본 모달 */}
  <ModalContent>
    <div className="basic-modal">...</div>
  </ModalContent>
</ModalProvider>

<ModalProvider>
  {/* 카드 형태 모달 */}
  <ModalContent>
    <Card className="modal-card">...</Card>
  </ModalContent>
</ModalProvider>

<ModalProvider>
  {/* 전체화면 모달 */}
  <ModalContent>
    <div className="fullscreen-modal">...</div>
  </ModalContent>
</ModalProvider>
```

#### 3) 접근성(Accessibility) 기능을 내장할 수 있음

```tsx
const ModalContent = ({ children }) => {
  const { opened, close } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);
  
  // 별도의 훅을 만들어서 관리할 수 있다.
  useEscapeKey(close);
  useFocusTrap(modalRef, opened);
  useScrollLock(opened);
  
  return (
    <div 
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {children}
    </div>
  );
};
```

### (4) 실제 라이브러리들의 패턴

**Radix UI, Headless UI, Ariakit** 등 유명한 디자인 시스템들이 모두 이 패턴을 사용한다

예시: [radix-ui의 Dialog](https://www.radix-ui.com/themes/docs/components/dialog)

```tsx
// Radix UI 스타일
<Dialog.Root>
  <Dialog.Trigger asChild>
    <button>Edit profile</button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Title>Edit profile</Dialog.Title>
      <Dialog.Description>
        Make changes to your profile here.
      </Dialog.Description>
      <Dialog.Close asChild>
        <button>Save changes</button>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```
