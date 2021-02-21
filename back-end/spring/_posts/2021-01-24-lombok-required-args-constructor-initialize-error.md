---
layout: post
published: true
title: "[스프링/Spring] Lombok: variable not initialized in the default constructor"
icon: spring
description: >
  RequiredArgsConstructor 사용 시 not initialized in the default constructor 에러가 발생하는 원인과 해결 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /back-end/spring/lombok-required-args-constructor-initialize-error
tags: 
  - Lombok
  - RequiredArgsConstructor
  - spring
  - spring boot
  - 롬복
  - not initialized
---

Java 환경의 어플리케이션을 개발하게되면, 유용한 라이브러리나 플러그인들을 많이 사용하게 됩니다. 이 번글에서는 보일러플레이트 코드를 제거하기 위해 사용되는 Lombok에서 발생할 수 있는 에러에 대해서 알아보도록하겠습니다.

아래와 같은 스펙의 개발환경에서 테스해보았습니다.

{% include base/components/hint-box.html type='info' list='Spring boot 2.4.2|Gradle 6.7.1 (Groovy)' %}

## 롬복 (Lombok)

롬복의 다양한 어노테이션을 이용하여 보일러플레이트를 제거할 수 있습니다.

보통 아래와 같은 방식으로 많이들 사용하면 컴파일될 때, getter와 setter 그리고 constructor를 자동으로 만들어지게 됩니다.

```java
@Getter
@Setter
@NoArgsConstructor
public class User {
  private String name;
  private int age;
}
```

### Lombok Constructor

생성자와 관련한 어노테이션은 보통 `@NoArgsConstructor`, `@AllArgsConstructor` 그리고 `@RequiredArgsConstructor`를 사용하게 됩니다.

예제 코드를 통해서 각각 어떤 방식으로 코드가 생성되는지 확인해보겠습니다.

#### NoArgsConstructor

```java
@NoArgsConstructor
public class User {
  private String name;
  private int age;

  /*
  public User() {}
  */
}
```

`@NoArgsConstructor`는 위 예제에서 주석으로 처리되어 있는 User에 대한 디폴트 생성자가 자동으로 생성되게 됩니다.

#### AllArgsConstructor

```java
@AllArgsConstructor
public class User {
  private String name;
  private int age;

  /*
  public User(String name, int age) {
    this.name = name;
    this.age = age;
  }
  */
}
```

`@AllArgsConstructor`의 경우에는 User 클래스가 가지고 있는 모든 속성들을 포함하는 생성자를 자동으로 만들어줍니다.

#### RequiredArgsConstructor

```java
@RequiredArgsConstructor
public class User {
  private final String name;
  private int age;

  /*
  public User(String name) {
    this.name = name
  }
  */
}
```

`@RequiredArgsConstructor` 어노테이션을 사용하면 `@NotNull` 어노테이션이나 `final` 키워드를 사용하고 있는 속성들만으로 이루어진 생성자를 자동으로 만들어줍니다.

## Variable not initialized in the default constructor

생성자를 롬복을 이용하여 만들었는데, 막상 `variable not initialized in the default constructor`라는 에러가 발생했다면, 롬복이 정상적으로 동작하지 않는다는 뜻으로 다음과 같은 상황을 의심해봐야합니다.

### Gradle 버전 확인

Gradle을 통해서 롬복 의존성 라이브러리를 추가해주었지만 동작하지 않는다면 자신의 Gradle 버전이 5.x 이상인지 확인해주셔야합니다.

그 이유는 Gradle 버전이 올라가면서 Lombok 의존성을 추가하는 방법이 바뀌었기 때문입니다.

#### Gradle 5.x 미만

```gradle
dependencies {
  implementation 'org.projectlombok:lombok'
}
```

#### Gradle 5.x 이상

```gradle
dependencies {
  compileOnly 'org.projectlombok:lombok'
  annotationProcessor 'org.projectlombok:lombok'
}
```

## 맺음

롬복을 사용하면서 발생할 수 있는 `variable not initialized in the default constructor` 에러에 대해서 알아보았습니다. 혹시 궁금하신 점이나 이상한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
