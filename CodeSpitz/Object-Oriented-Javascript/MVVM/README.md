---

title: MVVM System 만들기
description: 객체지향을 통해서 MVVM System을 만드는 과정입니다.
date: 2020-01-21
sidebarDepth: 2

---

# MVVC System 만들기

MVVM : Model - View - ViewModel

### MVC Model

MVVC를 언급하기 이전에, MVC부터 알아야 한다.

MVC는 Model - View - Controller 등을 사용하며, 주로 Spring Framework 같이 Server에서 사용 된다.

@startuml
card View
card Model
card Controller

View -[hidden] Model
Controller -->> Model
View <<-- Controller : data
@enduml

이렇게 Server에서 사용하는 MVC의 형태는 View와 Model은 직접적으로 의존하지 않고 Controller를 통해서 메세지를 주고 받는다.

그런데 Client에서 사용할 땐 다음과 같이 바뀌게 된다.

@startuml
card View
card Model
card Controller

View ->> Model
Controller -->> Model
View <<-- Controller : data
@enduml

- Controller는 Model과 View를 알고 있다.
- View는 User의 Interaction(Event)를 알고 있다.
- View는 어떤 Model을 갱신해야 되는지 알고 있어야 한다.

이럴 경우의 문제는 다음과 같다.

- Model은 비지니스로직과 관련있다.
- View는 UI와 관련있다.
- 즉, Model과 View는 변화의 이유가 다르다.
- 그런데 서로 간의 의존성이 있다

이렇게 Client에서 MVC Model을 사용할 경우, 변화의 이유가 다른데 서로간의 의존성이 있기 때문에 문제가 발생한다.

실제로 많은 사람들이 사용하는 MVC는 다음과 같은 `제왕적 MVC Model`이다.

@startuml
card View
card Model
card Controller

View -[hidden] Model
Controller -->> Model
Controller <<-- Model
View <<-- Controller
View -->> Controller : data
@enduml

이 구조에서는 View가 Model에 의존하는 건 없지만, Controller에 대한 의존이 너무 강하다는 것이다.

즉, Controller가 View와 Model의 변화를 흡수해야 한다는 것이고, 그럴 수록 Controller의 변화가 매우 많다.

