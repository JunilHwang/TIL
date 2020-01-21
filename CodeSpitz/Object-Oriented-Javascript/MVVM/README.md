---

title: MVVM System 만들기
description: 객체지향을 통해서 MVVM System을 만드는 과정입니다.
date: 2020-01-21
sidebarDepth: 2

---

# MVVC System 만들기

MVVM : Model - View - ViewModel

## MVC Model

MVVC를 언급하기 이전에, MVC부터 알아야 한다.

MVC는 Model - View - Controller 등을 사용하며, 주로 Spring Framework 같이 Server에서 사용 된다.

@startuml
rectangle View
rectangle Model
rectangle Controller

View -[hidden] Model : "          "
Model <<-- Controller 
View <<-- "data" Controller
@enduml

이렇게 Server에서 사용하는 MVC의 형태는 View와 Model은 직접적으로 의존하지 않고 Controller를 통해서 메세지를 주고 받는다.

그런데 Client에서 사용할 땐 다음과 같이 바뀌게 된다.

@startuml
rectangle View
rectangle Model
rectangle Controller

View ->> Model : "          "
Model <<-- Controller 
View <<-- "data" Controller
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
rectangle View
rectangle Model
rectangle Controller

View --[hidden]right-- Model : "          "
Model --->> Controller 
Model <<--- Controller 
View <<--- "data" Controller
View --->> Controller
@enduml

이 구조에서는 View가 Model에 의존하는 건 없지만, Controller에 대한 의존이 너무 강하다는 것이다.

즉, Controller가 View와 Model의 변화를 흡수해야 한다는 것이고, 그럴 수록 Controller의 변화가 매우 많다.

## MVP

MVP : Model - View - `Presenter`

- MFC 같은 Builder에서 사용된다
- 안드로이드에서도 사용하고 있다 

@startuml
rectangle "**View**\n- getter\n- setter" as View
rectangle Model
agent Presenter

View --[hidden]right-- Model : "          "
Model --->> Presenter 
Model <<--- Presenter 
View <<--- Presenter
View --->> Presenter
@enduml

View에는 Logic이 없고, getter와 setter만 있다. Presenter는 View의 getter, setter를 사용 한다.

이럴 경우, View는 Model에 대한 의존성이 완전히 없어진다. 즉, View는 Model을 몰라도 된다.

그러기 위해선, _필요한 모든 getter와 setter를 만들어야 한다._ 

문제점

- View Component가 매우 커진다.
- 가볍게 Application을 만들기는 너무 부담스럽다.
- 그래서 Framework 차원에서 제공하는 경우에만 사용한다.

## MVVM

이제 MVVM(Model - View - ModelView)에 대해 알아보자.

@startuml
rectangle View
rectangle Binder
rectangle Model
agent ViewModel

View -[hidden] Model : "                    "
View <<-- Binder
Binder ->> ViewModel : "**observer**"
Model <<-- ViewModel 
Model -->> ViewModel 
@enduml

MVVM은 ViewModel에 대해 이해해야 한다.

ViewModel은 인메모리로서의 순수한 Data에 대한 View를 의미한다.

즉, View를 대신하는 순수한 data 구조체(객체)이다.

Binder는 ViewModel을 감지하여 View에 반영하기도 한다.

양방향 바인딩의 경우 Binder가 View에도 Observing을 하고 있는 상태이다. 즉, Binder가 View와 ViewModel 모두 감지하여 모두 반영하는 것을 의미한다. 

그래서 Binder가 없으면 MVVM은 성립하지 않으며 Binder로 인해 ViewModel은 View를 모르는 상태로 유지할 수 있다.

위의 형태를 직접 구현하기는 무척 힘들다. 그래서 다음과 같이 만들어볼 것이다.

@startuml
rectangle View
rectangle Binder
rectangle Model
agent ViewModel

View -[hidden] Model : "                    "
View <<-- Binder
Binder ->> ViewModel
Binder <<- ViewModel : "**call**"
Model <<-- ViewModel 
Model -->> ViewModel 
@enduml

ViewModel이 Binder에게 변화를 알리는 방식으로 구현할 것이다.
즉, 자동으로 감지하는 방식(Observer)에서 수동으로 감지를 알리는 방식(Call)을 사용하는 것이다.

1. ViewModel의 순수한 데이터 갱신
2. Binder에 알림
3. Binder가 View를 갱신
4. 결론적으로 ViewModel은 View를 모르는 상태로 유지한다.

