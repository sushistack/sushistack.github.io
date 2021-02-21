---
layout: post
published: false
title: "org.apache.ibatis.executor.ExecutorException: No constructor found in"
icon: spring
description: >
  "org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.executor.ExecutorException: No constructor found in"
author: deeplify
toc: true
permalink: /back-end/spring/no-constructor-found
tags:
  - spring
  - mybatis
  - no constructor found
  - constructor
---

Mybatis를 사용하여 개발을 하다보면 다음과 같은 에러를 만나는 경우가 있는데요.

```text
org.mybatis.spring.MyBatisSystemException: nested exception is 
org.apache.ibatis.executor.ExecutorException: No constructor found in ...
```

그냥 단순히 직역을 해보았을 때는 생성자가 없어서 실행할 수가 없다는 의미 인것 같은데, 자세하게 알아보도록 하겠습니다.

### Error

저에게 발생한 에러는 정확하게 다음과 같습니다.

```text
org.mybatis.spring.MyBatisSystemException: nested exception is 
org.apache.ibatis.executor.ExecutorException: No constructor found in 
com.xxx.xxx.AssociatedObject ... [java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String]
```

### Reason

이 에러는 디폴트 생성자가 없는 경우에 발생하는 에러입니다.

저 같은 경우, 다음과 같이 `Java 클래스`와 `resultMap`을 사용하였는데요.

```java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Test {
  private String columnOne;
  private String columnTwo;
  private String columnThree;
  private AssociatedObject associatedObject;
}
```

```java
@Getter
@Setter
@AllArgsConstructor
public class AssociatedObject {
  private String columnOne;
  private String columnTwo;
}
```

```xml
<resultMap id="TestResultMap" javaType="Test">
  <result property="columnOne" column="column_one">
  <result property="columnTwo" column="column_two">
  <result property="columnThree" column="column_three">
  <association property="associatedObject" javaType="AssociatedObject">
    <result property="columnOne" column="column_one">
    <result property="columnTwo" column="column_two">
  </association>
</resultMap>
```

에러 내용 중 `[java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String]` 이 부분을 보면서 이상했습니다.

분명히 `AssociatedObject`는 두 개의 프로퍼티만 있는데, 5개의 프로퍼티를 갖는 생성자가 없다는 에러가
발생했습니다. 이 부분이 조금 헷갈렸지만, 결론적으로 문제는 `@NoArgsConstructor`이 누락되어 있어 발생한 것이었습니다.

### Solution

디폴트 생성자를 만들어 줍니다. 그 이유는 `Mybatis`는 객체를 생성할 때, 디폴트 생성자로  객체를 생성한 뒤에 각 프로퍼티를 `set`하는 방식으로 생성하기 때문입니다.
