---
layout: post
published: true
title: "[Js/자바스크립트] 배열 최소값, 최대값, 평균 구하는 방법"
icon: js
description: >
  Javascript의 배열의 값 중 최소값 최대값 평균을 구하는 방법을 소개합니다.
author: deeplify
toc: true
permalink: /front-end/js/min-max-avg-in-array
tags:
  - js
  - javascript
  - 자바스크립트
  - 배열
  - 배열 최소값
  - 배열 최대값
  - 배열 평균
---

자바스크립트에서 배열을 사용할 때, 은근히 많이 사용하게 되는 빌트인 함수 또는 커스텀 함수들이 있습니다. 일반적으로 배열에 `Number` 타입의 리터럴 값이 있는 경우, **최소값**, **최대값**, **평균값**을 구해야하는 요구사항들이 많다고 생각합니다.

이번 글에서는 자바스크립트 Number 타입의 리터럴 값을 갖는 배열의 최소값, 최대값 그리고 평균값을 구하는 방법을 소개하는 시간을 가져보도록 하겠습니다.

## 배열 최소값, 최대값, 평균 구하는 방법

일반적인 프로그래밍 언어(c, c++, java)를 사용하여 최소값, 최대값, 평균값을 구할 때는 반복문을 이용하여 구하는 경우가 많습니다.

하지만 자바스크립트에서는 반복문을 이용하지 않고도 빌트인 함수로 최대와 최소 그리고 평균값을 구할 수 있습니다.

### 배열에서 최소값

```js
const array = [1, 2, 3, 4, 5]

Math.min.apply(null, array)   // 1
```

> - `apply` 함수의 첫 번째 파라미터는 함수에 사용될 this이고, 두 번째 인자는 원본 배열입니다.

위와 같이 정말 간단하게 배열의 최소값을 구할 수 있습니다.

### 배열에서 최대값

```js
const array = [1, 2, 3, 4, 5]

Math.max.apply(null, array)   // 5
```

배열의 최대값은 최소값을 구하는 것과 사용되는 빌트인 함수만 다릅니다.

### 배열의 평균 값

```js
const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

const array = [1, 2, 3, 4, 5]
average(array)  // 3
```

> - reduce 함수는 인자로 callback 함수와 초기값을 받음.
> - callback 함수의 인자는 누산 저장될 변수(acc), 현재 값(cur), 현재 인덱스(idx), 원본 배열(src).

배열의 평균을 구하기 위한 가장 간단한 방법은 `Array.prototype.reduce()` 빌트인 함수를 이용하는 것입니다. `reduce` 함수를 이용하면 배열 내의 모든 값의 합계를 구할 수 있고, 이를 배열의 길이로 나눠주기만 하면 됩니다.

### 참고 문서

{% include base/components/link.html title='Function.prototype.apply() - JavaScript | MDN' internal_link='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply' %}

{% include base/components/link.html title='Array.prototype.reduce() - JavaScript | MDN' internal_link='https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce' %}

### 맺음

이번 글에서는 간단하게 자바스크립트 배열의 최소값, 최대값, 평균을 구하는 방법에 대해서 소개해드렸습니다. 혹시나 글에 이상한 점이 있다거나 궁금하신 점이 있으신 경우, 댓글 달아주시면 감사하겠습니다.
