---
layout: post
published: false
title: "org.apache.catalina.LifecycleException: Failed to start component 에러"
icon: spring
description: >
  org.apache.catalina.LifecycleException 에러가 왜 발생하는지 알아보도록 하겠습니다.
author: deeplify
toc: true
permalink: /back-end/spring/lifecycle-exception
tags:
  - spring
  - spring boot
  - lifecycle
  - exception
  - spring
---

스프링 또는 스프링부트로 개발을 하다보면 가끔 위와 같은 형태의 에러가 발생하는 경우가 있습니다. 저 같은 경우도 이 에러가 콘솔창 상단부에 출력이 되었기 때문에 Exception 자체를 검색해보았지만, 제 에러와는 상관 없는 것들만 결과에 있어서 시간을 허비했습니다.

### Error

```text
org.apache.catalina.LifecycleException
```
이 에러는 어플리케이션이 시작하려고할 때, 경우에 따라 다르겠지만 설정이 제대로 되어있지 않다거나 멀티모듈 프로젝트라면 특정 모듈이 컴파일되어있지 않은 상태이기 때문에 클래스를 찾지 못하여 발생합니다.

### Reason

저의 경우가 특정 모듈이 모듈로서 Import 되어 있지 않았기 때문에 발생했습니다. 모듈로 인식이 되지 않아서 컴파일이 되었어도, 해당 `.class` 파일을 찾지 못하여 실패했었습니다.

### Solution

Intellij 기준으로 `Project Structure`에 접근하여, 해당 모듈을 잘 인식할 수 있도록 모듈에 추가해주셔야합니다.

그 이후 Maven이나 Gradle 탭에서 resysnc 해주시는 것을 잊지 마시고, 그래도 안된다 싶으면, clean > build(compile)로 새롭게 target 폴더를 생생해주시면 됩니다.


간단하게 `org.apache.catalina.LifecycleException: Failed to start component`에러에 대해서 알아보았습니다.

감사합니다.
