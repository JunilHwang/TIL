---

title: 02 프로그래밍 언어로서의 자바 | 객체지향의 원리와 이해
description: 프로그래밍 언어로서의 Java가 가지고 있는 여러 가지 특성들을 알아보고 이해하여봅시다. 
date: 2020-02-18 13:00:00
sidebarDepth: 2

---

# 프로그래밍 언어로서의 자바

자바는 근본적으로 프로그래밍 언어다.
자바가 어떻게 작동하는지,
변수가 메모리에 어떻게 저장되고 사용되는지,
메서드가 어떻게 호출되고 메모리에 어떤 변화를 일으키는지 살펴볼 필요가 있다.

그리고 앞서 언급한 메모리는 JVM에 존재하는 _가상의 메모리 구조_ 이다.

## Java Virtual Machine

일단 java source file 을 실행하기 위해서는 `JVM(Java Virtual Machine)` 이라는 것이 필요하다.

|Real World|Java Virtual World|대응|
|:---:|:---:|:---:|
|소프트웨어 개발 도구|JDK(Java Develop Kit)|JVM용 소프트웨어 개발 도구(이클립스, 인텔리제이)|
|운영체제|JRE(Java Runtime Environment)|JVM용 OS|
|하드웨어(머신)|JVM(Java Virtual Machine)|가상의 컴퓨터|

::: tip 용어 정리

- **JDK** : Java Develop Kit. 자바를 개발할 때 필요한 도구
- **JRE** : Java Runtime Environment. 자바가 실행되는 환경
- **JVM** : Java Virtual Machine. 자바가 실행되는 가상의 머신

JVM에는 가상의 메모리 구조가 있고, Java에서 실행되는 코드는 이 JVM에 종속적이다.

:::

@startuml
rectangle JDK {
  rectangle JRE {
    rectangle JVM
    rectangle Library
  }
  rectangle DevKit {
    collections packages
  }
}
@enduml

C언어 같은 경우에는 Runtime이 OS지만, Java의 경우 Runtime이 JVM이다.\
_그리고 JVM이 Byte Code(*.class file)를 OS에 특화된 코드로 변환하여 실행한다._

JVM의 구조는 다음과 같다.

@startuml
rectangle "Class Loader System" as cls {
  rectangle Loading
  rectangle Linking
  rectangle Initialization
}

rectangle Memory {
  rectangle Stack
  rectangle "PC(Program Counter)" as PC
  rectangle "Native Method Stack" as NMS
  rectangle Heap
  rectangle Method  
}

rectangle "Execution Engine" as exec {
   rectangle Interpreter
   rectangle JIT
   rectangle "GC(Garbage Collector)" as GC
}

rectangle JNI
rectangle "Native Method Library" as NML

@enduml

- Class Loader System
  - *.class에서 Byte Code를 읽고 메모리에 저장
  - `Loading`: 클래스를 읽어오는 과정
  - `Linking`: Reference를 연결하는 과정
  - `Initialization`: static 값들 초기화 및 변수 할당
  - 일종의 **Static 영역**이라고 할 수 있다.
  
- Memory
  - Class 수준의 정보(Class Name, Super Class Name, Method, Variable) 저장
  - `Heap`: Object 저장. 공유자원
  - `Stack`
    - Thread 마다 Runtime Stack을 만들고, 그 안에서 Method 호출을 Stack Frame 이라고 부르는 Block 으로 쌓는다.
    - Thread 종료 후 Runtime Stack 도 사라진다.
  - `Program Counter`: Thread 마다 Thread 내 현재 실행할 Stack Frame 을 가르키는 포인터가 생성된다.
  - `Native Method Stack`: 말 그대로 Native Method에 대한 Stack
    - Native Method는 다른 언어로 작성된 코드를 자바에서 호출하는 것을 의미한다.

- Execution Engine
  - `Interpreter`: 바이트 코드를 한 줄씩 실행
  - `JIT Compiler`: 인터프리터의 효율을 높이기 위해 반복되는 코드를 발견시 모두 네이티브 코드로 변환
  - `Garbage Collector`: 더 이상 참조 되지 않는 객체를 모아서 정리함

- JNI(Java Native Interface)
  - 자바 애플리케이션에서 C, C++, Assembly 등으로 작성된 함수를 사용할 수 있는 Interface 제공
  - Native 키워드를 사용한 메소드 호출

- Native Method Library
  - _C, C++ 등으로 작성된 Library_

   
Java에서 사용되는 Class들을 Class Loader에서 관리하고,
Class가 Object(혹은 Instance)를 만들면 Heap에 쌓이게 된다.

- `Static(Class Loader System)`
  - Class의 놀이터
  - Static Property, Method
  - Object의 Method Address
- `Heap`: Object(Instance)의 놀이터
- `Stack`: Method의 놀이터

## Main Method의 Stack Frame

다음과 같은 코드가 있을 때 JVM의 메모리 구조 변화를 살펴보자.

```java
public class Start {
  public static void main (String[] args) {
    System.out.println("Hello OOP!!");
  }
}
```

1. main method가 실행되기 전에는 일단 java.lang과 start class가 Static 영역에 올라온다.
  @startuml
  rectangle Static {
    [java.lang]
    component Start {
      card main
    }
  }
  rectangle Heap {
  }
  rectangle Stack {
  }
  @enduml

2. main method의 실행이 시작되면, main method의 지역변수와 매개변수가 stack 영역에 생성됩니다.
