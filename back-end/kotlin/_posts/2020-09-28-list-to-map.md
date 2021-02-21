---
layout: post
published: true
title: "[Kotlin/코틀린] List to Set, List to Map"
icon: kotlin
description: >
  코틀린에서 List to Set 및 List to Map으로 변경하는 방법에 대해서 알아보겠습니다.
author: deeplify
toc: true
permalink: /back-end/kotlin/list-to-set-or-map
tags:
  - kotlin
  - 코틀린
  - list
  - toSet
  - toMapc
---

보통 리스트의 내의 값들 중, 중복되지 않는 셋을 만들고 싶거나, 리스트의 특정 프로퍼티를 기준으로 맵을 만들어야하는 경우가 종종 있습니다. 오늘은  자주 사용하게되는 리스트를 셋이나 맵으로 변경하는 방법에 대해서 소개해드리도록 하겠습니다.

## List to Set, List to Map

우선 자바에서 람다를 활용하여 List를 Set으로 변경하는 방법을 보고, 자바와는 다르게 코틀린에서는 어떠한 방식으로 변환을 할 수 있는지 알아보겠습니다.

둘을 비교하면서 봐주시면 더 이해하기가 편하실 것 같습니다.

### to set, to map in Java

Java 람다를 이용한 방법을 소개해드리겠습니다.

> to set

```java
public static void main(String[] args) {

  List<Integer> integers = new ArrayList<>();
  
  integers.stream()
    .collect(Collectors.toSet());

}
```

**toSet**의 경우, 정말 간단하게 `Collectors.toSet()`를 이용하여 Set으로 변경할 수 있습니다. 위 예제에서 데이터 형태는 `Set<Integer>`가 됩니다.

> toMap

```java
public class Item {
  private int id;
  private String name;
}
```

```java
public static void main(String[] args) {

  List<Item> items = new ArrayList<>();
  
  Map<Integer, String> itemsMap = items.stream()
    .collect(Collectors.toMap(Item::getId, Item::getName));

}
```

**toMap**의 경우, `Collectors.toMap()`을 사용하고, 첫 번째 파라미터로 Map의 Key가 되는 람다를 넣어주고, 두 번째 파라미터로 Value가 될 람다를 넣어주면 됩니다.

### to set, to map in Kotlin

코틀린의 경우, 아무래도 언어 자체가 람다를 고려해서 만들었기 때문에 훨씬 간단하게 표현이 가능합니다.

> toSet

```kotlin
fun main () {

  val integers = listOf<Int>()

  integers.toSet()

}
```

코틀린의 경우, 자바보다 너무나 간단하게 표현이 가능합니다.

> toMap

```kotlin
fun main () {

  val items = listOf<Item>()

  items.map { it.id to it.name }.toMap()

}
```

Map으로 변환하는 경우도 `map {}` 람다를 통해서 Pair로 표현이 가능하고 이를 다시 toMap() 함수를 통해서 Map으로 바꿀 수 있습니다.

## 맺음

정말 간단하게 자바 및 코틀린을 비교하여 리스트를 셋 또는 맵으로 변환하는 방법에 대해서 알아보았습니다. 궁금하신 점이나 이상한 점이 있으면 댓글 부탁드리겠습니다.

감사합니다.
