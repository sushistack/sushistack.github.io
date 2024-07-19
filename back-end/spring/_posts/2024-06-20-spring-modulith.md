---
layout: post
published: false
title: "Spring Modulith"
icon: spring
description: >
  Spring I/O에서 공개한 modulith 라는 프로젝트에 대해서 알아봅시다.
author: deeplify
toc: true
permalink: /back-end/spring/spring-modulith
tags: 
  - spring 
  - spring I/O 2024
  - spring modulith
---

Spring Modulith는 개발자들이 잘 구조화된 Spring Boot 애플리케이션을 구축할 수 있도록 도와주며, 도메인에 의해 구동되는 애플리케이션 모듈을 찾고 작업하는 데 가이드를 제공합니다. 또한 이러한 모듈 구성의 검증, 개별 모듈의 통합 테스트, 모듈 수준에서 애플리케이션의 동작 등을 확인할 수 있습니다.



```
□ Example
└─ □ src/main/java
   ├─ □ example           <1>
   │  └─ Application.java
   ├─ □ example.inventory <2>
   │  └─ …
   └─ □ example.order     <2>
      └─ …
```
