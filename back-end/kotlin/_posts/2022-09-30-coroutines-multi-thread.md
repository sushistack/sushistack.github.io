---
layout: post
published: true
title: "[Kotlin/코틀린] Coroutines Multithreading (feat. Fuel)"
icon: kotlin
description: >
  Kotlin의 coroutines를 이용하여 멀티 스레드 예제를 통해서 간단하게 소개합니다.
author: deeplify
toc: true
permalink: /back-end/kotlin/coroutines-multi-thread
tags:
  - kotlin
  - coroutines
  - fuel
  - thread
  - 코틀린
  - 코루틴
  - 멀티 스레드
---

Java를 사용하던 시절에는 멀티 스레드를 이용한 병렬 프로그래밍은 조심해서 사용해야합니다. 자칫 잘못해서 성능이 떨어질 수도 있고, 의도하지 않은 대로 동작하는 경우가 많습니다. 하지만 코틀린에서는 **Coroutines**라는 라이브러리를 통해서 멀티스레딩을 간단하면서도 컨트롤 하기 쉽도록 해줍니다.

### Coroutines Multithreading

이번 글에서는 코루틴에 대해서 간단하게만 소개하고, 이를 이용하여 Fuel을 이용하여 네트워크 통신을 Parallel하게 전송하고 받는 예제를 보여드리도록 하겠습니다.

> Key Points
> - CoroutineScope: 새로운 coroutine에 대한 범위를 정의합니다.
> - CoroutineContext: coroutine이 실행될 스레드를 결정합니다.
> - Dispatchers: context의 요소(동작 방식 등)들로 미리 정의되어 있습니다.

### Coroutines

위에서 간단하게 정리를 해보았는데, 좀더 자세히 알아보도록 하겠습니다.

#### CoroutineScope

이름 그대로 코루틴의 범위를 결정하는 것으로 다음과 같이 인터페이스 형태로 구현되어 있습니다.

```kotlin
package kotlinx.coroutines

public interface CoroutineScope {
    public abstract val coroutineContext: kotlin.coroutines.CoroutineContext
}
```

또한 코루틴 `Scope`를 다음과 같은 코드로 간단하게 생성이 가능합니다.

```kotlin
val scope = CoroutineScope(Dispatchers.Default)
```

하지만, 보통 더 간단하고, 흔히 사용되는 `Scope`는 다음과 같이 미리 Singleton 객체로 정의가 되어있습니다.

```kotlin
package kotlinx.coroutines

public object GlobalScope : kotlinx.coroutines.CoroutineScope {
    public open val coroutineContext: kotlin.coroutines.CoroutineContext /* compiled code */
}
```

#### CoroutineContext & Dispatchers

코루틴이 어떻 방식으로 실행되고, 어떤 스레드에서 실행되는지 등 코루틴이 동작하는데 필요한 여러가지 정보들을 가지고 있습니다. 요소로는 **Job**과 **Dispatcher** 두 가지가 있습니다.

```kotlin
public interface Job : kotlin.coroutines.CoroutineContext.Element { /*...생략...*/ }

public abstract class CoroutineDispatcher public constructor() : kotlin.coroutines.AbstractCoroutineContextElement, kotlin.coroutines.ContinuationInterceptor { /*...생략...*/ }
```

위 두 가지 또한 많이 사용할 것 같은 것을 미리 싱글톤으로 구현을 해놓았습니다.

```kotlin
package kotlinx.coroutines

public object Dispatchers {
    @kotlin.jvm.JvmStatic public final val Default: kotlinx.coroutines.CoroutineDispatcher /* compiled code */

    @kotlin.jvm.JvmStatic public final val IO: kotlinx.coroutines.CoroutineDispatcher /* compiled code */

    @kotlin.jvm.JvmStatic public final val Main: kotlinx.coroutines.MainCoroutineDispatcher /* compiled code */

    @kotlin.jvm.JvmStatic public final val Unconfined: kotlinx.coroutines.CoroutineDispatcher /* compiled code */
}
```

각각의 Dispatcher들의 특징이 있는데,

- Default: 메인 스레드에서 작업하기에 벅찬 작업들을 실행하기에 적합합니다. 컨텍스트가 지정되지 않은 경우 이 디스패처가 사용됩니다.
- IO: 네트워크, 디스크 등 IO 작업에 적합합니다.
- Main: UI 객체로 동작하는 단일 스레드입니다.
- Unconfined: 특정 스레드에 국한되지 않는 디스패처입니다.

### Coroutines Example

기본 예제들은 다른 블로그나 공식 문서에도 잘 정리되어 있어, Coroutines와 Fuel을 이용하여 네트워크 통신을 Parallel 하게 하는 예제를 보도록하겠습니다.

```kotlin
fun main() {
  val jobs = List(10) {
    GlobalScope.launch (Dispatchers.IO) {
      println("------- Request: $it --------")
      val result = request()
      println("Status Code: ${result.statusCode}")
    }
  }

  runBlocking { jobs.forEach { it.join() } }
}

fun request() =
  Fuel.get("https://google.com")
      .responseString().second
```

##### 결과

```text
------- Request: 2 --------
------- Request: 1 --------
------- Request: 4 --------
------- Request: 3 --------
------- Request: 0 --------
------- Request: 8 --------
------- Request: 5 --------
------- Request: 7 --------
------- Request: 9 --------
------- Request: 6 --------
200
200
200
200
200
200
200
200
200
200
```

## 맺음

간단하게 코루틴의 기초에 대해서 알아보고, 코루틴을 이용하여 네트워크 통신을 병렬로 처리하는 예제를 소개해드렸습니다. 혹시 궁금하신 점이나 이상한 점이 있다면 댓글 부탁드리겠습니다.

#### Ref

{% include base/components/link.html title='Basics - Kotlin Programming Language' internal_link='https://kotlinlang.org/docs/reference/coroutines/basics.html' %}
