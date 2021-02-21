---
layout: post
published: false
title: "[Java/자바] 가비지 컬렉션"
icon: java
description: >
  가비지 컬렉션 (garbage collection)에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /back-end/java/gc
tags:
  - java
  - Garbage Collection
  - GC
  - 자바
  - 가비지 컬렉션
---

회사 시험이나 면접에서의 단골 문제 또는 질문 중에 하나가 바로 `Java Garbage Collection`입니다.
저도 상당히 회사 시험이나 면접을 준비할 때, 이 부분에 대해서 공부했던 기억이 있습니다. 옛날 생각도 나고
정리해두면 좋을 것 같아서 정리하려고 합니다.

자 그럼, Java 가비지 컬렉션에 대해서 간략하게 알아보도록하겠습니다.

그 이전에 용어에 대해서 이해하고 넘어가도록 하겠습니다.

```
Mark: 메모리에 올라와 있는 객체 중 Reference가 있거나 끊긴 객체를 체크하는 단계로, 주로 살아있는 객체만 체크합니다.
(왜? 탐색의 시간을 줄이기 위해서 마치 링크드 리스트를 탐색하듯이 수행합니다.)
Sweep: Reference가 끊긴 객체의 메모리를 회수하는 단계.
Compaction: Sweeping 이후, 단편화된 공간을 압축하는 단계.

마킹을 하고 마킹이 안된 객체에 대해서 스위핑을 수행하고 컴팩션을 합니다.
이러한 방식으로 GC를 수행합니다.
```

### Generational Garbage Collection

GC란? `사용 중인 객체`(reference가 있는 객체)와 `사용하지 않는 객체`를 확인하고 `사용하지 않는 객체`를 삭제하는 프로세스입니다.
현재 JDK에서 사용중인 GC는 모두 세대별 GC라는 형태로 수행됩니다.

> 왜 굳이 `세대 별`로 GC를 수행 하는 것일까요?

그 이유를 알기 전에 다음의 그림을 보고 가겠습니다.

![image](/assets/images/java-gc1.png){: refdef}

위의 이미지는 JVM이 OS로부터 할당받은 메모리 중 Heap을 나타냅니다. 이미지처럼 heap영역을 나누지 않고 Heap영역 하나에 대해 GC를 수행할 수도 있습니다.
이렇게 Heap 영역 하나에서 GC를 수행한다면 다음과 같은 과정을 직관적으로 생각할 수 있습니다.

![image](/assets/images/java-gc2.png){: refdef}

간단하게 설명을 해보자면 다음과 같은 순으로 진행이 될 것입니다.

1. heap 공간이 꽉차면 Marking을 하면서 살아있는 객체와 아닌 객체를 구분합니다.
2. Sweep 과정을 통해서 쓰레기를 수집합니다.
3. Compaction 과정을 통해서 공간을 압축합니다.

#### 위 방법의 장단점

##### 장점

1. Mark-Sweep-Compation과정과 다음 메모리영역(다음 객체가 할당받을 영역)에 대한 포인터만 가지고 구현하면되기 때문에 알고리즘 구현이 간단합니다.
2. 구현이 간단하기 때문에 디버깅 & 유지보수 비용이 감소합니다.

##### 단점

1. 객체들의 생명주기가 각각 다르다는 점을 고려하지 않았기 때문에 GC를 수행할 때, 모든 객체를 확인해야 하고, 성능을 떨어 뜨립니다.
2. 대부분의 객체는 수명이 짧습니다. 이 때문에 압축단계에서 모든 객체를 움직이는데 많은 비용을 발생시킵니다.

위의 단점을 극복하면서 장점의 일부를 살린 방법이 `Generational Garbage Collection` 입니다.

<hr/>

### Generational Garbage Collection (Split a Heap by generation)

설명에 앞서, 용어 정리를 또 한번 하겠습니다.

- Stop-The-World: GC가 수행될 때, 발생하는 이벤트로 이 Stop-The-World가 수행되는 동안에는 응용프로그램의 모든 thread가 중지됩니다.
- Minor GC: young 영역에서 발생하는 GC입니다. Major GC보다 Stop-The-World 시간이 짧습니다. (대상은 young 영역 전체에 대해서 수행)
- Major GC: old 영역에서 발생하는 GC입니다.

우선 heap을 아래 이미지와 같이 세대별로 나눕니다.


그 영역에는 eden, survive0, survive1, old, permanent 영역이 있습니다.(survive0의 크기와 survive1의 크기는 같습니다.)

![image](/assets/images/java-gc3.png){: refdef}

#### Young Area
Young 영역은 eden, survive0, survive1 영역을 포함합니다. 우선 객체가 할당되면 eden 영역에 할당되고, `eden 영역이 가득차면` `minor GC`를 수행하게 됩니다. young 영역에서 GC 수행과정은 다음과 같습니다.

1. 객체가 생성되면 eden 영역에 객체에 대한 메모리를 할당해줍니다.
2. eden영역이 가득차면 minor GC를 수행하게 됩니다.
3. 살아남은 객체는 Survive 영역으로 이동합니다. (구현에 따라 다르겠지만, 둘다 비어있으면 Survive0으로, 아니면 비어있지 않은 영역으로 이동)
4. GC이후 Survive 영역에 더이상 객체를 넣을 수 없다면, 원래 Survive 영역(S0, from)에 있던 객체와 GC를 통해 살아남은 객체를 다른 Survive 영역(s1, to)으로 이동합니다. 이 때, 원래 영역에 존재했던 객체의 age 값을 하나 증가 시킵니다. 이후 원래 영역은 아무것도 없게 되고, S0과 S1의 `역할이 바뀌게 됩니다.`
5. `2 ~ 4`를 반복하면서 age 값이 정해진 threshould 값을 넘는 경우, old영역으로 이동시킵니다.

그림으로 보면 이해가 쉬울 것 같아, 3 ~ 5의 과정 표현해 보았습니다.

![image](/assets/images/java-gc4.png){: refdef}

여기서 몇 가지 의문이 들 것입니다.

1. GC이후 Survive0 에서 Survive1로 이동 중 Survive1 영역으로 이동해야하는 객체의 메모리가 Survive1의 영역을 초과하면 어떻게 될까요?
2. survive영역을 왜 2개로 나눠서 사용할까요?
3. Old영역에 있는 객체가 young 영역의 객체를 참조하고 있는 경우는 어떻게 될까요?

> 의문에 대한 답

1. Survive 영역에 대해서는 Compaction 작업이 없기 때문에, 다음 이미지와 같이 단편화가 일어납니다.

![image](/assets/images/java-gc5.png)

따라서 Survive1 영역이 가득찰 가능성이 거의 없습니다. 만약 Survive0 영역이 단편화 없이 전부 가득 차있다면 메모리가 부족한 경우이고,
Jvm option을 통해서 young 영역을 늘릴 필요가 있을 것입니다.

2. 단편화를 없애는 방법은 2가지가 있습니다.

  - 첫 번째는 Compaction을 하는 것입니다. 하지만 Compaction의 경우, Marking과 deletion 이후에 가능한 작업입니다.
이는 Minor GC의 수행시간에 영향을 미칩니다. Marking은 살아있는 객체만 체크하므로, 메모리 상의 어떤 영역이 free 영역인지 알 수 없기 때문에 동시에 진행할 수 없습니다.
  - 두 번째는 복사를 해서 다른 곳으로 옮기는 것입니다. `사실상 Compaction 또한 Marking된 객체들을 다른 곳에 복사한 후, 원래영역을 지운 뒤 다시 위치시키는 것`입니다.
하지만 단순한 복사의 경우, Marking 단계에서 동시에 수행할 수 있습니다. 이를 이용해서 Minor GC의 수행시간에 영향을 미치지 않으면서 단편화를 제거할 수 있게됩니다.
하지만 단점은 여분의 영역이 필요하다는 것입니다.

3. Old 영역에는 512바이트의 덩어리(chunk)로 되어 있는 `카드 테이블(card table)`이 존재합니다. 카드 테이블에는 Old 영역에 있는 객체가 Young 영역의 객체를 참조할 때마다 정보가 표시됩니다. Young 영역의 `Minor GC`를 실행할 때에는 Old 영역에 있는 모든 객체의 참조를 확인하지 않고,
이 카드 테이블만 뒤져서 GC 대상인지 식별합니다.

#### + 빠른 메모리 할당 - Bump-The-Pointer

bump-the-pointer는 Eden 영역에 할당된 마지막 객체를 추적합니다. 마지막 객체는 Eden 영역의 맨 위(top)에 있습니다.
그리고 그 다음에 생성되는 객체가 있으면, 해당 객체의 크기가 Eden 영역에 넣기 적당한지만 확인합니다.

> Multi-thread 환경에서는?

멀티 스레드 환경을 고려하면 이야기가 달라집니다. `Thread-Safe`하기 위해서 만약 여러 스레드에서 사용하는 객체를 Eden 영역에 저장하려면 락(lock)이 발생할 수 밖에 없고, lock-contention 때문에 성능은 매우 떨어지게 될 것입니다.

HotSpot VM에서 이를 해결한 것이 TLABs입니다. 각각의 스레드가 각각의 몫에 해당하는 Eden 영역의 작은 덩어리를 가질 수 있도록 하는 것입니다.

각 쓰레드에는 자기가 갖고 있는 TLAB에만 접근할 수 있기 때문에, bump-the-pointer라는 기술을 사용하더라도 아무런 락이 없이 메모리 할당이 가능합니다.

##### ref

{% include base/components/link.html title='네이버D2' internal_link='https://d2.naver.com/helloworld/1329' %}

- permanent Area(= Method area)

`JVM에 필요한 메타 데이터, Java SE 라이브러리 클래스 및 메소드를 저장하는 공간입니다.`

#### +참고(JVM Memory Model)

![image](/assets/images/java-gc6.png){: refdef2}
{: refdef: style="text-align: center; width: 80%; margin: 0 auto;"}
{: refdef2: style="text-align: center; width: 100%; margin: 0 auto;"}
