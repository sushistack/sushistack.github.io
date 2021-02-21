---
layout: post
published: true
title: "[Spring/스프링] Failed to determine a suitable driver class 에러"
icon: spring
description: >
  Failed to determine a suitable driver class 에러에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /back-end/spring/datasource-error
tags:
  - spring
  - spring boot
  - datasource
  - application.yml
---

이 에러는 처음 프로젝트를 만들고 실행할 때, 많이 겪는 에러입니다. 아마도 이 글을 읽고 있는 독자분들도 스프링을 시작하시는 단계이거나 스프링에 익숙하지 않은 분들 일거라고 생각합니다.

## 에러의 발생 원인은?

이 에러의 원인은 스프링에서 database를 사용한다고 설정해두고, 정작 **datasource**는 설정이 되어 있지 않은 것입니다.

### 에러 로그

```text
***************************
APPLICATION FAILED TO START
***************************

Description:

Failed to configure a DataSource: 'url' attribute is not specified and no embedded datasource could be configured.

Reason: Failed to determine a suitable driver class


Action:

Consider the following:
	If you want an embedded database (H2, HSQL or Derby), please put it on the classpath.
	If you have database settings to be loaded from a particular profile you may need to activate it (no profiles
are currently active).
```

위 에러 로그는 DataSource의 **url**설정이 없어 특정할 수 없는 경우 입니다.

### 해결 방법

해결하는 방법에는 2가지가 있습니다. 스프링 설정에서 datasource 자동설정을 제외하는 방법과 datasource 데이터를 설정해주는 방법입니다.

#### 자동 설정 제외하는 방법

다음 코드는 kotlin, spring boot 환경에서 작성되었습니다.

```kotlin
@SpringBootApplication(exclude = [DataSourceAutoConfiguration::class])
class TestApplication

fun main(args: Array<String>) {
    runApplication<TestApplication>(*args)
}
```

위와 같이 `@SpringBootApplication` 어노테이션안에 exclude 배열 값에 `DataSourceAutoConfiguration::class`를 추가해주시면, 
어플리케이션이 구동할 때, datasource 설정하는 부분이 동작하지 않아 에러가 발생하지 않습니다.

#### datasource 데이터를 설정하는 방법

설정을 해제하지 않고 적절한 설정 값을 넣어주면 정상 동작하게됩니다.

```yml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/db_name?serverTimezone=UTC&characterEncoding=UTF-8&useSSL=false
    username: root
    password: root
```

## 맺음

간단하게 Failed to determine a suitable driver class 에러 발생원인과 해결 방법을 알아보았습니다. 혹시 궁금하신 점이나 이상한 점 있으면 댓글 부탁드리겠습니다.
