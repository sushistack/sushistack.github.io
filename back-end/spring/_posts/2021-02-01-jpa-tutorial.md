---
layout: post
published: false
title: "[스프링/Spring] JPA 소개 및 예제"
icon: spring
description: >
  스프링 배치의 Chunk Oriented Processing 방식에 대해서 알아보고 예제를 통해 사용방법을 알아봅니다.
author: deeplify
toc: true
permalink: /back-end/spring/chunk-oriented-processing-in-spring-batch
tags: 
  - spring boot
  - spring batch
  - 스프링 배치
  - batch
  - chunk oriented
  - chunk
---

## JPA 예제

```diff
plugins {
    id 'java'
}

group 'org.example'
version '1.0-SNAPSHOT'

repositories {
    mavenCentral()
}

dependencies {
+   compile group: 'org.hibernate', name: 'hibernate-entitymanager', version: '5.4.27.Final'
+   compile group: 'mysql', name: 'mysql-connector-java', version: '5.1.6'
+   compile group: 'org.projectlombok', name: 'lombok', version: '1.18.12'
    testCompile group: 'junit', name: 'junit', version: '4.12'
}
```

