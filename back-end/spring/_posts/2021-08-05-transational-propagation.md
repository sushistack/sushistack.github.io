---
layout: post
published: false
title: "[spring/스프링] transactional propagation 옵션"
icon: spring
description: >
  spring transactional propagation 옵션에 대해서 소개해드립니다.
author: deeplify
toc: true
permalink: /back-end/spring/transactional-propagation
tags:
  - spring
  - spring boot
  - tranactional
  - annotation
  - propagation
  - propagation properties
---

스프링을 사용하면서 가장 편리한 부분 중에 하나는 `@Transactional`이라고 생각합니다. 정말 간단하게
트랜잭션처리를 할 수 있도록 기술을 제공하고 있는데요. 하지만 이 annotation에는 여러가지 속성들(properties)이 있습니다.

그 중에서도 이 번에 알아볼 속성은 `propagation` 속성입니다.

### Propagation

#### REQUIRED

![required](https://docs.spring.io/spring/docs/4.2.x/spring-framework-reference/html/images/tx_prop_required.png)
- Transactional propagation 속성의 기본 값.
- `@Transactional`이 선언된 `method`를 `caller`가 호출하였을 때, `caller`에 **이미 시작된 Transaction**이 있다면, 그 Transaction에 참여하고, 그렇지 않으면 새로운 트랜젝션을 생성한다.

내용은 간단하지만, 주의해야 할 점이 있습니다. 아래 내용은 아래 링크의 설명을 요약한 것입니다. 

{% include base/components/link.html title='Spring docs: Transaction propagation'  internal_link='https://docs.spring.io/spring/docs/4.2.x/spring-framework-reference/html/transaction.html#tx-propagation' %}

```text
1. method-A, method-B 각각 있을 때, method-A와 method-B 모두 @Transactional이 선언되어 있고,
   propagation이 required라면, 각각 독립적인 Transaction scope가 생성됩니다.

2. 각 Transaction scope는 [Rollback-only] 상태를 개별적으로 결정할 수 있습니다.

3. 호출된(내부) Transaction scope의 [Rollback-only] 상태 marker는 호출한(외부) Transaction scope의
   커밋 상황에 영향을 미칩니다.

예를 들어, method-A가 method-B를 호출한다고 가정했을 때 method-B에서 [Rollback-only] 상태를 마킹을 하면, method-A의 Transaction scope 입장에서는 [Rollback-only] 상태가 마킹된지 모릅니다.
이러한 상태에서 method-A가 커밋을 하려고 하면 method-A는 자신의 transaction scope는 이미 Rollback이 되었다는 <UnexpectedRollbackException>를 받게됩니다.
```

#### REQUIRES_NEW

![require_new](https://docs.spring.io/spring/docs/4.2.x/spring-framework-reference/html/images/tx_prop_requires_new.png)

- REQUIRE와 는 대조적으로 무조건 완전히 독립적인 transaction을 새롭게 만들어서 수행합니다. 이 경우
물리적으로도 다른 Transaction이기 때문에, 외부 Transaction은 커밋과 롤백 모두 내부 Transaction에
영향을 받지 않으면서 독립적으로 수행됩니다.
- 이미 진행중인 Transaction은 잠시 중단 시킵니다.

#### NESTED

- 이미 진행중인 Transaction이 있다면, 중첩된 Transaction을 시작합니다.

이는 물리적으로 독립적인 Transaction을 만드는 것으로, 독립적으로 롤백을 할 수 있는 멀티 save point를 지원합니다. 내부 Transaction은 자신만의 [Rollback-only] 상태를 마킹할 수 있습니다. 따라서 외부 Transaction은 내부 Transaction에서 [Rollback-only] 마킹을 했다해도 커밋할 수 있습니다.

#### MANDATORY

- 이미 시작된 Transaction이 있으면 참여하고, 없으면 예외를 발생시킵니다.

#### NOT_SUPPORTED

- Transaction을 사용하지 않도록 합니다, 이미 진행중인 Transaction은 잠시 중단 시킵니다.

#### NEVER

- 트랜젝션을 사용하지 않도록 강제합니다. 이미 진행중인 Transcation이 있다면 예외를 발생시킵니다.
  
감사합니다.
