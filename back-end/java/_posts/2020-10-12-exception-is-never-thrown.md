---
layout: post
published: true
title: Exception is never thrown in body of corresponding try statement
icon: java
description: >
  Exception is never thrown in body of corresponding try statement 에러에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /back-end/java/exception-is-never-thrown
tags:
  - java
  - 자바
  - sql
  - sqlexception
  - exception
---

자바 환경에서 개발하다보면 다양한 에러를 접하게 됩니다. 그 중에서도 Exception 핸들링을 하면서 가장 흔하게 발생하는 에러에 대해서 소개해드리도록 하겠습니다.

물론 Exception 핸들링을 할 때 여러가지 이유로 에러가 발생할 수 있겠지만, 이 번 포스팅에서는 스택 트레이스에서 `Exception is never thrown in body of corresponding try statement.`라는 문구가 출력되는 경우에 대해서 다루어 보겠습니다.

## Exception is never thrown in body of corresponding try statement

이 오류의 내용을 직역해보자면 **try statement** 내부에서 `Exception`이 던져질 수 없다라는 내용입니다.

### 발생 원인

이 에러가 발생하는 원인은 간단하지만 더 이해하기 쉽도록 설명하기 위해서 예를 들어보겠습니다.

#### 예제

```java

try {
  // service code

} catch (SQLException e) {

  log.error(e.getMessage());
}

```

위 예제에서는 `SQLException`에 대한 에러 핸들링을 하고 있습니다. 그렇기 때문에 `try statement` 안에는 `SQLException`을 발생시킬 메소드나 코드가 들어가 있어야합니다.

즉, 제가 `service code`라고 주석으로 표현해 놓은 공간에서 SQLException이 발생할 수 있어야한다는 말이됩니다.

### 해결 방법

이 에러를 해결하는 방법은 간단합니다.

- try catch 구문을 사용할 필요가 없으면 제거 (예외 핸들링을 하지 않음)
- try 문 안에 있는 메소드 또는 코드가 발생시킬 수 있는 예외로 catch 안의 파라미터 변경

예를 들어, 다음과 같이 변경할 수 있습니다.

```java
try {
  // service code -> PersistenceException을 리턴하는 메소드 호출

} catch (PersistenceException e) {

  log.error(e.getMessage());
}
```

## 맺음

`Exception is never thrown in body of corresponding try statement`이 발생하는 원인에 대해서 알아보고 해결하는 방법에 대해서도 알아보았습니다.

혹시 궁금하신 점이나 이상한 점은 댓글로 남겨주시면 감사하겠습니다.
