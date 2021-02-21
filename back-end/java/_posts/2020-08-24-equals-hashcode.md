---
layout: post
published: false
title: "[Java/자바] Equals, hashCode, toString 메소드"
icon: java
description: >
  equals와 hashCode 그리고 toString method에 대해서 소개해드리도록 하겠습니다.
author: deeplify
toc: true
permalink: /back-end/java/equals
tags:
  - java
  - Equals
  - hashCode
  - toString
---

equals를 가장 처음에 접하는 때는 String의 비교를 때라고 생각합니다. 그렇지만 보통의 경우,
String 비교는 eqals로 하는구나 이렇게 넘어가기 마련입니다.

그래서 이 번에는 `equals`, `hashCode`, `toString`에 대해서 간략히 정리해 보려고 합니다.

### equals

먼저 equals 내부를 뜯어보겠습니다.

```java
 * @param   obj   the reference object with which to compare.
 * @return  {@code true} if this object is the same as the obj
 *          argument; {@code false} otherwise.
 * @see     #hashCode()
 * @see     java.util.HashMap
 */
public boolean equals(Object obj) {
    return (this == obj);
}
```

위는 Object 클래스의 equals 메소드입니 굉장히 단순한데요, 그냥 자기 자신과 비교연산자(==)를 통해 비교를 하고 있습니다. 
그렇다면 실제로 비교가 되는 값(리터럴)은 무엇일까요?

예상하셨겠지만 당연히 *주소값* 입니다. 아래의 예제를 통해서 비교해보면

```java
public class App {
    public static void main(String[] args) {
        Value value1 = new Value(1);
        Value value2 = new Value(1);
        System.out.println((value1.equals(value2)) ? "같다" : "다르다");
        //> 다르다
        value1 = value2;
        System.out.println((value1.equals(value2)) ? "같다" : "다르다");
        //> 같다
    }
}

class Value {
    int x;
    Value(int x) {
        this.x = x;
    }
}
```

### String

Java에서 지원하는 String은 어떤지 살펴보겠습니다.

```java

/** The value is used for character storage. */
    private final char value[];

   ...

/**
 * Compares this string to the specified object.  The result is {@code
 * true} if and only if the argument is not {@code null} and is a {@code
 * String} object that represents the same sequence of characters as this
 * object.
 *
 * @param  anObject
 *         The object to compare this {@code String} against
 *
 * @return  {@code true} if the given object represents a {@code String}
 *          equivalent to this string, {@code false} otherwise
 *
 * @see  #compareTo(String)
 * @see  #equalsIgnoreCase(String)
 */
public boolean equals(Object anObject) {
    if (this == anObject) {
        return true;
    }
    if (anObject instanceof String) {
        String anotherString = (String)anObject;
        int n = value.length;
        if (n == anotherString.value.length) {
            char v1[] = value;
            char v2[] = anotherString.value;
            int i = 0;
            while (n-- != 0) {
                if (v1[i] != v2[i])
                    return false;
                i++;
            }
            return true;
        }
    }
    return false;
}
```

코드를 보시면 이미 `Overriding`이 되어있는 것을 확인할 수 있고, 간단한 로직으로 작성되어 있습니다.

1. 일단 *같은 주소값*을 가진 객체라면 true
2. 같은 객체는 아니면서 String이라면 캐릭터 값으로 비교하여 문자열이 같은지 비교
3. String 객체도 아니면 false

이러한 형식으로 이미 overriding이 되어있는 클래스들도 있습니다. 예를 들어 Date, File, wrapper 클래스도 override 되어 있습니다.

자 그럼 String의 equals메소드를 사용하기 전에 아래와 같은 코드를 보겠습니다.

```java
String string1 = "test";              //1번
String string2 = new String("test");  //2번
```

위의 두 가지 String 변수를 보면, 무슨 차이가 있는 것일까요? 물론 둘다 잘 컴파일되고, 실행됩니다. 이해하기 쉽도록 아래 그림을 보겠습니다.

![java-string](/assets/images/java-string.png)

1번의 경우, 바로 data 영역 즉 자바에서 말하는 constant pool에 저장됩니다. 변수가 바로 data를 참조하는 경우입니다.

2번의 경우, Heap영역에 String이라는 객체를 생성하고 2번 변수가 가리키게 됩니다, 또 그 객체가 Data를 참조하고 있는 형태가 됩니다.

자, 이제 코드를 보면 어떻게 나올지 예상이 될 것입니다.

```java
public class App {
    public static void main(String[] args) {
        String s1 = "hello";
        String s2 = "hello";
        System.out.println(s1 == s2);
        //> true
        System.out.println(s1.equals(s2));
        //> true
        String s3 = new String("h");
        String s4 = new String("h");

        System.out.println(s3 == s4);
        //> false
        System.out.println(s3.equals(s4));
        //> true
    }
}
```

헷갈릴 수 있는 위와 같은 코드도 어떻게 생성이 되는지 알 수 있다면, 이해가 가능합니다.
외우는 것이 아니라 이해하면 더 쉽게 기억할 수 있습니다.

> hashCode

```java

 /* @return  a hash code value for this object.
 * @see     java.lang.Object#equals(java.lang.Object)
 * @see     java.lang.System#identityHashCode
 */
public native int hashCode();
```

이 hashCode()라는 친구는 `native 코드`로 구현된 메소드입니다. `native 코드`란 자바가 아닌 C/C++과 같은 언어로 작성된 코드를 말합니다.
즉 이 메소드는 `JNI(Java Native Inteface)`을 통해서 native code를 실행할 수 있습니다.

그렇다면 왜, java의 hashCode는 native 코드를 사용할까요?

- C/C++의 경우, 기계어 코드이기 때문에 interpret 방식의 Java와 비교했을 때, 빠른 편입니다. 즉, 성능을 이유로 C 코드로 작성되었다는 것입니다.
- hashCode()는 JVM 메모리 Heap에 올라와 있는 객체의 포인터에 관련이 있는 Integer 값을 리턴해야하기 때문입니다. 이는 core java에서 할 수 없는 일이기 때문에 JVM상에 native method로 구현되어 있습니다.

해시코드의 역할은 서로다른 객체를 구별하는데 사용할 수 있습니다.
해시코드를 이용하여 클래스의 멤버 변수 값으로 같다고 판단하게 만들려면 hashCode method를 overriding하면 가능합니다.
String은 또 overriding이 되어있습니다. 정말로 문자열이 같다면 hash code 값도 일치할 것입니다.

```java

/** Cache the hash code for the string */
  private int hash; // Default to 0

/**
 * Returns a hash code for this string. The hash code for a
 * {@code String} object is computed as
 * <blockquote><pre>
 * s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]
 * </pre></blockquote>
 * using {@code int} arithmetic, where {@code s[i]} is the
 * <i>i</i>th character of the string, {@code n} is the length of
 * the string, and {@code ^} indicates exponentiation.
 * (The hash value of the empty string is zero.)
 *
 * @return  a hash code value for this object.
 */
public int hashCode() {
    int h = hash;
    if (h == 0 && value.length > 0) {
        char val[] = value;

        for (int i = 0; i < value.length; i++) {
            h = 31 * h + val[i];
        }
        hash = h;
    }
    return h;
}
```

### toString method

- toString 메소드는 인스턴스에 대한 정보를 문자열로 제공할 목적으로 정의한 것입니다.
- overriding를 하지 않는 이상 class name과 hash code 값을 반환 합니다.

간단하게 `equals`, `hashCode`, `toString` 메소드에 대해서 알아보았습니다.

감사합니다.
