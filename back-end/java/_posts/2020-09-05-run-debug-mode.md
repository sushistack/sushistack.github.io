---
layout: post
published: false
title: "[Java/자바] Run 모드와 Debug 모드의 차이"
icon: java
description: >
  Run 모드와 Debug 모드의 차이에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /back-end/java/run-debug-mode
tags:
  - java
  - run
  - debug
  - 차이
---

보통 IDE를 사용하여 개발할 때, 실행을 하고 싶을 때는 Run을 디버그를 하고 싶을 때는 Debug를 사용하여 어플리케이션을 동작시킵니다. Debug로 동작시키면, 단순히 실행중에 중단점에서 멈출 수 있다? 정도만 알고 계실텐데요.

오늘은 Java의 `Run` 모드와 `Debug`의 차이점에 대해서 알아보겠습니다.

### 컴파일 방식이 다릅니다

- 가장 큰 차이는 디버거가 디버깅을 하기 위해서는 `debug symbol`이 필요합니다.
- 다음은 javac 컴파일 옵션 중 `-g:none`를 이용해서 디버그 정보를 포함하지 않는 `.class` 파일과 디버그 정보를 포함하는 `.class` 파일을 나타냅니다.

```
javac: 컴파일러

options:
-g                         Generate all debugging info
-g:none                    Generate no debugging info

Javap 
클래스 파일을 원시 코드로 디어샘블해줍니다. 완전한 소스 파일을 구할 수는 없으며 인자로 클래스 이름을 받고 역어셈블한 결과를 표준 출력(콘솔)으로 내보냅니다.

option: 
-l                       Print line number and local variable tables
```

#### 디버그 정보 미포함

```java
javac -g:none Test.java

javap -l Test
public class Test {
    public Test(java.lang.String);

    public void print();

    public static void main(java.lang.String[]);
}

```

#### 디버그 정보 포함

```java
avac -g Test.java

javap -l Test
Compiled from "Test.java"
public class Test {
  public Test(java.lang.String);
   LineNumberTable:
    line 4: 0
    line 5: 4
    line 6: 9
   LocalVariableTable:
    Start  Length  Slot  Name   Signature
    0      10     0  this   LTest;
    0      10     1     s   Ljava/lang/String;

  public void print();
   LineNumberTable:
    line 9: 0
    line 10: 10
   LocalVariableTable:
    Start  Length  Slot  Name   Signature
    0      11     0  this   LTest;

  public static void main(java.lang.String[]);
   LineNumberTable:
    line 13: 0
    line 14: 10
    line 15: 14
   LocalVariableTable:
    Start  Length  Slot  Name   Signature
    0      15     0  args   [Ljava/lang/String;
    10       5     1  test   LTest;
}
```

{% include base/components/link.html title='java 컴파일 코드 출처'  internal_link='https://www.logicbig.com/how-to/java-command/compile-with-debug-info.html' %}

- 둘은 size 차이가 있습니다.
- 하지만 run 또는 debug를 할 때는 이미 컴파일된 소스를 실행하는 것이므로 같은 .class 파일(첫 번째 또는 두 번째 .class 파일)로 실행될 것입니다.
- 만약 두 번째 .class 파일로 실행을 한다고 가정하면, run은 디버그 정보를 무시할 뿐이고, debug는 디버그 정보를 사용해서 디버깅에 이용할 것입니다.
- **따라서 성능의 차이는 없습니다.**

### IDE 디버거가 디버깅을 하는 방법: JDK의 API를 이용합니다

```
프로그램이 디버깅 될 경우 개발자는 바이트 코드를 소스로 추적 할 수 있어야합니다. 
Java는 매우 동적 인 언어이므로 클래스의 실제 레이아웃은 컴파일 타임에 결정되지 않고 
실제로 클래스를로드 할 때 JVM에 의해 생성됩니다. 따라서 클래스 파일에는 모든 클래스, 
메소드 및 필드 이름이 보존되며 소스 파일의 이름과 바이트 코드 범위를 소스 파일의 해당 행에 
매핑하는 행 번호 테이블도 포함됩니다.

위 두 번째 코드에 나와있는 정보들이 파일의 행 번호 테이블입니다.
```

- JVM은 중단 점을 설정하고 스택 프레임을 조작하기위한 API를 제공합니다. 
- 이 것은 Java Development Kit (JDK) 디버거가 사용하는 API이며 sun.tools.debug 패키지에 포함되어 있습니다.
- JDK 디버거는 명령 줄 디버거로 jdb 명령을 사용하여 명령 줄에 중단 점을 삽입하고 발생한 예외를 catch 한 다음 스택 추적을 인쇄 및 진행하는 등의 기본 작업을 수행 할 수 있습니다.

{% include base/components/link.html title='Java debugging 설명 출처'  internal_link='http://www2.sys-con.com/itsg/virtualcd/java/archives/0603/winchester/index.html' %}
