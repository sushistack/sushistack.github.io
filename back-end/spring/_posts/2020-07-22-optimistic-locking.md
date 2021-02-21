---
layout: post
published: false
title: OptimisticLockingFailureException
icon: spring
description: >
  OptimisticLockingFailureException
author: deeplify
toc: true
permalink: /back-end/spring/optimistic-locking
tags:
  - spring boot
  - transactional
  - optimistic locking
  - OptimisticLockingFailureException
---

Transactional 관련하여 발생할 수 있는 `OptimisticLockingFailureException` 에러에 대해서 
알아보도록 하겠습니다.

### Error

`OptimisticLockingFailureException`

### Reson

1. 이 에러는 `Object`가 이미 다른 Transaction에 의해서 자신의 데이터를 Database에 저장을 한 상태에서, 
다시 또 저장하려고 할 때, 발생합니다.

### Solution

1. Transactional한 곳에서 Database를 수정을 한다면, 하나의 Transcation 안에서 해결할 수 있도록 해야합니다.

{% include base/components/link.html title='java - How to resolve OptimisticLockingFailureException? - Stack Overflow' internal_link='https://stackoverflow.com/questions/27961402/how-to-resolve-optimisticlockingfailureexception' %}

감사합니다.
