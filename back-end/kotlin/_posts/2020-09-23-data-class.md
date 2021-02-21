---
layout: post
published: true
title: "[Kotlin/코틀린] data class 와 equals, hashCode, toString"
icon: kotlin
description: >
  Java와 비교하여 kotlin에서의 data class, equals, hashcode, toString에 대해서 알아봅니다.
author: deeplify
toc: true
permalink: /back-end/kotlin/data-class
tags:
  - kotlin
  - 코틀린
  - data class
  - equals
  - hashCode
  - toString
---

처음 자바를 배울 때는 C언어나 C++ 보다는 훨씬 편하고 쉽다고 생각했습니다. 그런데 요즘에 **코틀린**으로 개발을 하기 시작했는데, 제가 머릿속으로 생각한 로직이 정말 간단하게 표현할 수 있는 언어라고 느꼈습니다.

이 번 글에서는 추가적인 코드를 작성해야하는 java와는 달리 kotlin에서는 어떻게 **equals**, **hashCode**, **toString** 등을 간단하게 작성할 수 있는지에 대해서 알아보겠습니다.

## Object 또는 Any 객체의 기본 메소드 

우선적으로 Java와 kotlin의 최상위 객체인 Object와 Any의 기본적인 메소드들에 대해서 알아보도록 하겠습니다.

- hashCode: 객체의 레퍼런스 값을 가지고 있습니다.
- equals: hashCode로 객체를 비교할 수 있도록 합니다.
- toString: 객체의 class name과 해시코드 값을 보여줍니다.

### Java에서 Object 기본 메소드 사용하는 방법

Object 클래스의 내부를 보면 다음과 같이 되어있습니다.

```java
public class Object {

  public native int hashCode();

  public boolean equals(Object obj) {
    return (this == obj);
  }

  public String toString() {
    return getClass().getName() + "@" + Integer.toHexString(hashCode());
  }

}
```

기본적으로 객체의 비교를 하기 위해서, Object의 `equals` 메소드를 override해서 사용하고, 객체의 정보를 문자열 형태로 보기위해서 `toString` 메소드를 override해서 사용하게 됩니다.

아래의 예제를 통해서 알아보겠습니다.

#### 예제 코드

```java
public class Person {
  private String name;
  private int age;

  @Override
  public int hashCode() {
    return super.hashCode();
  }

  @Override
  public boolean equals(Object obj) {
    Person other = (Person) obj;
    return this.name == other.name && this.age == other.age;
  }

  @Override
  public String toString() {
    return "Person(name=)" + this.name + ", age=" + this.age + ")";
  }
}
```

Person이라는 클래스가 있고, 이 클래스는 name과 age라는 프로퍼티를 가지고 있습니다. 그리고 equals 메소드에서는 자기 자신과 비교대상의 name, age를 비교하도록 override하였고, toString 메소드에서는 이름과 나이를 문자열 형태로 보여주도록 override하였습니다.

### Kotlin에서 Any의 기본 메소드 사용하는 방법

코틀린에서도 자바에서 Object와 같은 최상위 클래스인 **Any** 클래스가 존재합니다.

```kotlin
public open class Any {

  public open operator fun equals(other: Any?): Boolean

  public open fun hashCode(): Int

  public open fun toString(): String

}
```

코틀린에서는 굉장히 단순한 방법으로 자바에서 했던 과정을 `data classes`를 이용하여 생략할 수 있도록 지원해주고 있습니다. 다음 예제를 통해서 알아보도록 하겠습니다.

#### 예제 코드

```kotlin
data class Person(
  val name: String,
  val age: Int
)
```

위와 같이 **data class**로 Person을 정의해줍니다. 그리고 결과를 다음과 같이 확인할 수 있습니다.

```kotlin
fun main() {
  val personA = Person("name", 1)
  val personB = Person("name", 1)
  
  println(personA == personB)
  println(personA.toString())

}

/*
data 키워드를 붙이지 않았을 때, 결과
false
Person@60e53b93

data 키워드를 붙였을 때, 결과
true
Person(name=name, age=1)
*/
```

data 키워드를 붙이지 않았을 때는 personA와 personB가 객체 `레퍼런스 비교`를 했기때문에 **false**, data 키워드를 붙였을 때는 personA와 personB의 각 프로퍼티가 전부 같은지 비교를 하여 **true**가 출력되었습니다.

또한 data class의 경우, toString 또한 각 프로퍼티의 실제값을 알아볼 수 있도록 문자열로 출력되고 있는 것을 볼 수 있습니다.

### Data Classes란?

`data` 키워드가 붙은 클래스의 경우, 코틀린 컴파일러에서 자동으로 다음 메소드들을 추가해줍니다.

- equals()
- hashCode()
- toString()
- componentN()
- copy()

data 클래스가 되기 위한 조건은 4가지가 있습니다.

> 조건
> 1. Primary Constructor에 하나 이상의 파라미터를 가지고 있어야 합니다.
> 2. Primary Constructor 파라미터는 val 또는 var로 선언해야합니다.
> 3. data 클래스는 abstract, open, seal, internal 등의 키워드를 사용할 수 없습니다.
> 4. data 클래스는 interface만 구현할 수 있습니다. (1.1 이전)

만약에 자동으로 추가되는 메소드를 명시적으로 구현했다면 컴파일 할 때, 자동으로 구현되지 않도록하여 명시적으로 정의한 메소드가 실행되도록 합니다.

#### componentN() functions

다른 것들은 많이 보셨을 것 같지만 `ComponentN`은 생소하신 분들이 있을 것 같아 소개해드리겠습니다. 코틀린에서는 다음과 같은 형태로 코드를 작성할 수 있습니다. 이를 destructuring declarations라고 하는데 말 그대로 선언한 것을 분해하는 기능을 말합니다.

이 때 사용하는 것이 componentN 메소드입니다. 이는 각 프로퍼티의 값을 순서대로 component1(), component2() ... 등으로 분해할 수 있도록 해줍니다.

```kotlin
fun main() {
  val (name, age) = Person("name", 1)
  print("$name, $age")
}
```

## 맺음

자바와 비교하여 코틀린의 data classes 와 equals, hashCode, toString에 대해서 알아보았습니다. 궁금하신 점이나 이상한 점 있으면 댓글 부탁드리겠습니다.

#### Ref

{% include base/components/link.html title='Data Classes - Kotlin Programming Language' internal_link='https://kotlinlang.org/docs/reference/data-classes.html' %}
