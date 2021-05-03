---
layout: post
published: true
title: "[Js/자바스크립트] 소수점 자리수 올림, 내림, 반올림, 제거 완벽 가이드"
icon: js
description: >
  Javascript의 Number의 소수점 자리수 자리수 올림, 자리수 내림, 자리수 반올림, 자리수 제거하는 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /front-end/js/decimal-point-control
tags:
  - js
  - javascript
  - 자바스크립트
  - 소수점
  - 소수점 자리수
  - 소수점 올림
  - 소수점 내림
  - 소수점 반올림
---

웹 개발을 하다보면 다양한 요구사항이 생기기 마련입니다. 그 중에서도 아주 빈도가 높은 편은 아니지만 많이 요구되는 기능이 숫자 **소수점 처리**에 대한 것입니다.

보통 숫자를 표시하는 경우, 예를 들어 퍼센티지를 나타내는 등의 여러가지 지표를 보여줄 때 사용하게 됩니다.

이 번 포스팅에서는 자바스크립트에서 `소수점 처리하는 방법`에 대해서 알아보도록 하겠습니다.

## 자바스크립트 소수점 자리수 처리 하는 방법

자바스크립트에서 소수점을 처리하기 위해서 사용되는 함수는 다양하게 존재합니다. 가장 간단하면서 많은 사람들이 일반적으로 사용하는 방법은 빌트인 객체인 `Math` 객체와 `Number` 객체를 이용하는 것입니다.

> - Math.ceil(x): 주어진 값에 소수점 올림하여 정수를 반환
> - Math.floor(x): 주어진 값에 소수점 내림하여 정수를 반환
> - Math.round(x): 주어진 값에 소수점 반올림하여 정수를 반환
> - Number.prototype.toFixed(x): 주어진 값의 길이만큼 소수점 자리수를 반올림하여 반환

### 소수점 자리수 올림

```js
const number1 = 1.3434
const number2 = 10.4321
const number3 = 100.5342

console.log(Math.ceil(number1))   // 2
console.log(Math.ceil(number2))   // 11
console.log(Math.ceil(number3))   // 101
```

### 소수점 자리수 내림

```js
const number1 = 1.3434
const number2 = 10.4321
const number3 = 100.5342

console.log(Math.floor(number1))   // 1
console.log(Math.floor(number2))   // 10
console.log(Math.floor(number3))   // 100
```

### 소수점 자리수  반올림

```js
const number1 = 1.3434
const number2 = 10.4321
const number3 = 100.5342

console.log(Math.round(number1))   // 1
console.log(Math.round(number2))   // 10
console.log(Math.round(number3))   // 101
```

### 소수점 자리수 제거

```js
const number1 = 1.34313
const number2 = 1.35756

console.log(number1.toFixed(2))   // 1.34
console.log(number2.toFixed(4))   // 1.3576
```

`Number.prototype.toFixed()` 함수를 사용할 경우, 기본적으로 반올림이 원칙입니다. 따라서 올림이나 내림을 적용하려면 약간의 조작이 필요합니다.

### 소수점 자리수 제어 심화

`toFixed()` 함수를 사용하게 될 경우, 주어진 숫자의 뒷자리로부터 반올림하여 반환해주기 때문에 만약 특정 자리수에서 올림 또는 내림을 해야하는 상황이 있다면 다음과 같이 따로 구현을 해줄 수 있습니다.

#### 특정 자리수에서 올림

```js
const number = 1.003  // 소수점 세째 자리에서 올림하여 1.01으로 만들고 싶음

const temp1 = number * 100
const temp2 = Math.ceil(temp)
const result = temp2 / 100

console.log(result)   // 1.01
```

#### 특정 자리수에서 내림

```js
const number = 1.005  // 소수점 세째 자리에서 내림하여 1.00으로 만들고 싶음

const temp1 = number * 100
const temp2 = Math.floor(temp)
const result = temp2 / 100

console.log(result)   // 1.00
```

### 참고 문서

{% include base/components/link.html title='Math.ceil() - JavaScript | MDN' internal_link='https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil' %}

{% include base/components/link.html title='Math.floor() - JavaScript | MDN' internal_link='https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/floor' %}

{% include base/components/link.html title='Math.round() - JavaScript | MDN' internal_link='https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Math/round' %}

{% include base/components/link.html title='Number.prototype.toFixed() - JavaScript | MDN' internal_link='https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed' %}

## 맺음

이번 글에서는 간단하게 자바스크립트에서 소수점을 제어하는 다양한 방법들을 배워보았습니다. 혹시나 글에 이상한 점이 있다거나 궁금하신 점이 있으신 경우, 댓글 달아주시면 감사하겠습니다.
