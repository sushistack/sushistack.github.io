---
layout: post
published: true
title: "DDD(Domain Driven Design) 왜 탄생했을까?"
icon: logo
description: >
  DDD의 출현 배경과 목적을 알아봅니다.
author: deeplify
toc: true
permalink: /back-end/etc/what-is-domain-driven-design
tags: 
  - ddd
  - domain driven
  - domain driven design
---

소프트웨어 개발이 점점 복잡해짐에 따라 비즈니스 도메인의 복잡성을 효과적으로 관리하고 코드에 반영하는 것이 중요해졌습니다. 기존의 개발 방식은 기술적인 구현에만 초점을 맞추는 경향이 있었고, 이는 비즈니스 요구사항과 코드 사이의 격차를 발생시켰습니다. 이러한 문제를 해결하기 위해 **에릭 에반스(Eric Evans)**는 2003년에 **Domain-Driven Design: Tackling Complexity in the Heart of Software**라는 책을 통해 DDD 개념을 제시했습니다.

## 목적


> 1. 비즈니스 도메인 중심의 설계: 비즈니스 로직과 규칙을 코드에 명확하고 일관되게 반영합니다.
> 2. 공통 언어(Ubiquitous Language) 사용: 개발자와 비즈니스 전문가가 동일한 언어를 사용하여 의사소통의 오류를 줄입니다.
> 3. 복잡성 관리: 도메인을 모듈화하고 분리하여 시스템의 복잡성을 줄이고 유지보수성을 향상시킵니다.

## 간단한 예시

시나리오: 온라인 주문 시스템을 개발한다고 가정합니다.

### 엔티티(Entity)

-	Order(주문): 주문 ID, 주문 날짜, 고객 정보 등을 포함합니다.
-	Customer(고객): 고객 ID, 이름, 연락처 정보를 포함합니다.

### 밸류 오브젝트(Value Object)

- Address(주소): 도로명, 도시, 우편번호 등을 포함하며 불변 객체로 취급됩니다.
-	Money(금액): 통화와 금액을 나타내며, 계산 로직에 사용됩니다.

### 어그리게이트(Aggregate)와 어그리게이트 루트(Aggregate Root)

- Order는 여러 OrderItem(주문 항목)을 포함하며, Order가 어그리게이트 루트입니다.

### 리포지토리(Repository)

- OrderRepository: 주문 정보를 저장하고 검색하는 인터페이스를 제공합니다.

### 서비스(Service)

- OrderService: 주문 생성, 취소 등의 비즈니스 로직을 처리합니다.

### 도메인 이벤트(Domain Event)

- OrderPlacedEvent: 주문이 생성되었을 때 발생하며, 재고 감소나 알림 전송 등의 후속 작업을 트리거합니다.

## Entity vs Value Object

### 엔티티(Entity)

> - 정의: 엔티티는 고유한 식별자를 가지며, 해당 식별자를 통해 동일성을 판단하는 도메인 객체입니다.
> - 특징
>> - 식별성: 시스템 내에서 유일하게 구분될 수 있는 식별자를 가집니다. 
>> - 상태 변화: 시간이 지남에 따라 속성이나 상태가 변할 수 있지만, 동일한 식별자를 통해 동일한 엔티티로 인식됩니다.
>> - 생명주기: 생성부터 삭제까지의 독립적인 생명주기를 가집니다.
> - 예시
>> - User(사용자): 사용자 ID를 통해 식별되며, 이름이나 이메일이 변경되더라도 동일한 사용자로 간주됩니다.
>> - Order(주문): 주문 번호로 식별되며, 주문 상태나 내용이 변경될 수 있습니다.


### 값 객체(Value Object, VO)

> - 정의: 값 객체는 식별자가 없으며, 속성 값 자체로 동일성을 판단하는 불변 객체입니다.
> - 특징:
>> - 불변성: 생성 후 상태가 변경되지 않으며, 변경이 필요하면 새로운 객체를 생성합니다.
>> - 동일성 판단: 모든 속성 값이 같다면 동일한 값 객체로 간주합니다.
>> - 재사용성: 동일한 값을 가지는 경우 여러 곳에서 재사용할 수 있습니다.
> - 예시:
>> - Money(금액): 통화와 금액이 동일하면 같은 값으로 간주합니다.
>> - Address(주소): 거리, 도시, 우편번호 등이 동일하면 같은 주소로 인식됩니다.

## 어그리게이트(Aggregate)와 어그리게이트 루트(Aggregate Root)

### 어그리게이트(Aggregate)

어그리게이트는 관련된 엔티티(Entity)와 값 객체(Value Object)를 하나의 단위로 묶은 도메인 모델의 집합입니다. 도메인의 복잡성을 줄이고, 데이터 일관성을 보장하며, 외부에서 이를 효과적으로 관리할 수 있도록 설계된 구조입니다.

#### 역할

> 1. 모델 단위 관리: 어그리게이트 내부의 모든 객체는 특정 비즈니스 개념을 나타내며, 하나의 논리적 단위로 관리됩니다.
> 2. 일관성 보장: 어그리게이트 내부의 상태 변화는 어그리게이트의 책임으로 제한되어, 불필요한 외부 침투를 막습니다.
> 3. 트랜잭션 경계 설정: 어그리게이트 내부는 단일 트랜잭션 내에서 처리되도록 설계됩니다.


### 어그리게이트 루트(Aggregate Root)

어그리게이트 루트는 어그리게이트의 진입점이 되는 객체입니다. 외부에서 어그리게이트를 조작하거나 접근할 때는 어그리게이트 루트를 통해야 합니다.

#### 역할

> 1. 어그리게이트 외부 인터페이스: 외부에서 어그리게이트의 내부 객체에 접근하지 못하도록 보호합니다.
> 2. 불변성 제어: 어그리게이트의 상태를 변경하거나 검증하는 책임을 가집니다.
> 3. ID 제공: 어그리게이트를 식별할 수 있는 고유 식별자를 제공합니다.

### 예시

- 고객이 여러 상품을 장바구니에 담아 주문을 생성합니다.
- 주문 내역은 고객, 상품, 배송 정보 등을 포함하며, 각 주문 항목은 주문에 종속됩니다.


#### 어그리게이트(Aggregate)

- Order(주문): 주문에 관련된 모든 데이터를 하나의 논리적 단위로 묶음.
- 내부 구성 요소:
  -	OrderItem(주문 항목): 개별 상품에 대한 정보를 담는 엔티티.
  -	Address(배송 주소): 값 객체로, 주소 정보를 불변으로 표현.
  -	Money(총 금액): 값 객체로, 금액 계산 로직 포함.

#### 어그리게이트 루트(Aggregate Root)

- Order는 어그리게이트 루트로서, 주문의 상태를 변경하거나 주문 항목을 추가/삭제하는 책임을 가짐.


```kotlin
// Value Object: Money
data class Money(val amount: Double, val currency: String)

// Value Object: Address
data class Address(val street: String, val city: String, val zipCode: String)

// Entity: OrderItem
class OrderItem(
    val productId: String,
    val productName: String,
    val quantity: Int,
    val price: Money
)

// Aggregate Root: Order
class Order(
    val orderId: String,
    private val customerId: String,
    private var shippingAddress: Address,
    private val items: MutableList<OrderItem> = mutableListOf()
) {
    // Add an order item
    fun addItem(item: OrderItem) {
        items.add(item)
    }

    // Remove an order item
    fun removeItem(productId: String) {
        items.removeIf { it.productId == productId }
    }

    // Update shipping address
    fun updateShippingAddress(newAddress: Address) {
        shippingAddress = newAddress
    }

    // Calculate total price
    fun calculateTotal(): Money {
        val totalAmount = items.sumOf { it.price.amount * it.quantity }
        return Money(totalAmount, "USD")
    }
}
```

## Domain Event

> - 도메인 이벤트는 도메인에서 중요한 상태 변화나 비즈니스 사건을 나타냅니다.
> - 도메인 모델 내부에서 발생하는 이벤트로, 다른 부분에 알릴 필요가 있는 중요한 행동이나 결과를 캡슐화합니다.
> - DDD의 핵심 개념 중 하나로, 어플리케이션에서 도메인 로직을 중심으로 구성하고 결합도를 낮추는 데 중요한 역할을 합니다.

### 특징

> 1. 의미 있는 비즈니스 사건: 도메인 전문가와 이해 관계자들이 관심을 가지는 사건을 모델링합니다.
> 2. 독립적이고 불변: 도메인 이벤트는 발생한 시점의 상태를 캡슐화하며, 이후에는 변경되지 않습니다.
> 3. 비동기적 처리 가능: 도메인 이벤트를 다른 컴포넌트에서 비동기로 처리하여 결합도를 낮출 수 있습니다.
> 4. 발생 시점 기록: 이벤트가 발생한 시간이나 관련 데이터를 포함해 히스토리를 추적할 수 있습니다.


### 도메인 이벤트 설계

1.	도메인 이벤트 정의:
	-	중요한 비즈니스 사건을 나타냅니다.
	-	예: OrderPlacedEvent (주문 생성됨)
2.	이벤트 발행:
	-	특정 비즈니스 로직이 실행된 후 이벤트를 발행합니다.
3.	이벤트 처리:
	-	다른 컴포넌트에서 해당 이벤트를 구독하고, 후속 작업을 처리합니다.
	-	예: 이메일 발송, 재고 업데이트.


### 예시

```kotlin
import java.time.LocalDateTime

// 도메인 이벤트 클래스
data class OrderPlacedEvent(
    val orderId: String,
    val customerId: String,
    val orderTotal: Double,
    val occurredAt: LocalDateTime = LocalDateTime.now()
)

// 어그리게이트 루트: Order
class Order(
    val orderId: String,
    private val customerId: String,
    private val items: List<OrderItem>
) {
    private val domainEvents = mutableListOf<Any>()

    fun placeOrder() {
        // 주문 관련 비즈니스 로직 실행 (예: 결제 검증)

        // 도메인 이벤트 생성
        val event = OrderPlacedEvent(
            orderId = orderId,
            customerId = customerId,
            orderTotal = calculateTotal()
        )

        // 이벤트 발행
        domainEvents.add(event)
    }

    fun getDomainEvents(): List<Any> = domainEvents

    private fun calculateTotal(): Double {
        return items.sumOf { it.price * it.quantity }
    }
}

// OrderItem 클래스
data class OrderItem(
    val productId: String,
    val price: Double,
    val quantity: Int
)

// 이벤트 리스너
class OrderEventListener {
    fun onOrderPlaced(event: OrderPlacedEvent) {
        println("Order placed! Sending email to customer: ${event.customerId}")
        // 이메일 발송 로직
    }
}

// 메인 실행
fun main() {
    val order = Order(
        orderId = "12345",
        customerId = "customer1",
        items = listOf(
            OrderItem("prod1", 50.0, 2),
            OrderItem("prod2", 30.0, 1)
        )
    )

    // 주문 생성
    order.placeOrder()

    // 이벤트 처리
    val eventListener = OrderEventListener()
    order.getDomainEvents().forEach { event ->
        if (event is OrderPlacedEvent) {
            eventListener.onOrderPlaced(event)
        }
    }
}
```

### 도메인 이벤트의 장점

> 1. 결합도 감소:	어플리케이션 내의 다른 컴포넌트 간 의존성을 줄일 수 있습니다,	주문 처리와 이메일 발송 로직이 분리됩니다.
> 2. 확장성 증가:	새로운 이벤트 처리 로직을 추가해도 기존 코드에 영향을 주지 않습니다.
> 3. 비즈니스 로직 중심 설계:	도메인 이벤트를 통해 비즈니스 중심의 설계가 가능합니다.
