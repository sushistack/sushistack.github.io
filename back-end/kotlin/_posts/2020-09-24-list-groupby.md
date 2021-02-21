---
layout: post
published: true
title: "[Kotlin/코틀린] List GroupBy (리스트 그룹핑)"
icon: kotlin
description: >
  코틀린에서 람다를 이용하여 리스트를 그룹핑하는 방법에 대해서 알아봅니다.
author: deeplify
toc: true
permalink: /back-end/kotlin/list-groupby
tags:
  - kotlin
  - 코틀린
  - groupby
  - grouping
  - 그룹핑
---

자바 및 코틀린의 리스트 그룹화하는 방법에 대해서 알아보려고 합니다. 자바의 경우, lambda를 이용하여 간단하게 필요한 데이터를 가공할 수 있습니다. 또한 코틀린에서는 더욱 간단하게 표현할 수 있습니다.

## List GroupBy (리스트 그룹핑)

코틀린으로 리스트를 그룹핑하는 코드를 보기 전에 자바에서는 어떻게 리스트를 그룹화 했었는지 java와 kotlin 두 코드를 비교하면서 알아보겠습니다.

### List Grouping in Java

그룹핑이 필요한 경우는 다양하게 있겠지만, 저는 은행을 예로 들도록 하겠습니다. 간단하게 입금 내역을 날짜&시간 별로 그룹화하여 보고싶은 경우 다음과 같이 구현할 수 있습니다.

> Deposit 클래스

```java
public class Deposit {
  private int point;
  private LocalDateTime createdAt;
}
```

```java
public static void main(String[] args) {

  List<Deposit> deposits = new ArrayList<>();
  
  // - Map<LocalDateTime, List<Deposit>> 날짜별 입금 리스트
  deposits.stream()
    .collect(Collectors.groupingBy(Deposit::getCreatedAt));

  // - Map<LocalDateTime, Int> 날짜별 포인트 합계
  deposits.stream()
    .collect(
      Collectors.groupingBy(
        Deposit::getCreatedAt,
        Collectors.summingInt(Deposit::getPoint)
      )
    );

}
```

### List Grouping in Kotlin

코틀린의 경우도 다음과 같이 간단하게 표현할 수 있고, 이번에는 실제로 값을 넣어 예제를 만들어 보았습니다.

```kotlin
fun main() {

  val deposits = listOf(
    Deposit(1000, LocalDateTime.of(2020, 1, 1, 0, 0, 0)),
    Deposit(20000, LocalDateTime.of(2020, 1, 1, 0, 0, 0)),
    Deposit(300000, LocalDateTime.of(2020, 1, 2, 0, 0, 0)),
    Deposit(400, LocalDateTime.of(2020, 1, 2, 0, 0, 0)),
    Deposit(50, LocalDateTime.of(2020, 1, 3, 0, 0, 0)),
    Deposit(6, LocalDateTime.of(2020, 1, 3, 0, 0, 0)),
    Deposit(7000000, LocalDateTime.of(2020, 1, 4, 0, 0, 0))
  )

  // - Map<LocalDateTime, List<Deposit>> 날짜별 입금 리스트
  deposits.groupBy { it.createdAt }

  // - Map<LocalDateTime, Int> 날짜별 포인트 합계
  deposits.groupBy { it.createdAt }
    .map { it.key to it.value.sumBy { deposit ->  deposit.point } }
    .toMap()

}

/*
2020-01-01: 21000
2020-01-02: 300400
2020-01-03: 56
2020-01-04: 7000000
*/
```

## 맺음

개발을 하다보면 여러가지 요구사항이 생기기 마련입니다. 따라서 언어들도 개발자의 수요에 맞게 편한 방향으로 진화하고 있는 것 같습니다. 이렇게 해서 자바 및 코틀린에서 리스트를 그룹화하는 방법에 대해서 각각 알아보았습니다.

궁금하신 점이나 이상한점 있으시면 댓글 부탁드리겠습니다.

감사합니다.
