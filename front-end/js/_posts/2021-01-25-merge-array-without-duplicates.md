---
layout: post
published: true
title: "[Js/자바스크립트] 배열 합치기, 중복 제거하는 방법"
icon: js
description: >
  Javascript로 값의 중복없이 배열을 합치는 방법에 대해서 알아봅니다.
author: deeplify
toc: true
toc: true
permalink: /front-end/js/merge-array-without-duplicates
tags:
  - js
  - concat
  - deduplicate
  - merge arrays
---

자바스크립트 뿐만 아니라 여러가지 언어에서 개발을 하면서 여러 배열들을 병합해야하는 경우가 있습니다. 요즘 새로 생긴 언어같은 경우 간단하게 처리가 가능한 내장 함수를 지원해주기도 합니다.

자바스크립트에서도 중복 없이 배열을 합치는 함수는 없지만 여러가지 빌트인 함수를 이용하여 손쉽게 코드를 작성할 수 있습니다.

## 배열 합치면서 중복 제거하는 방법

자바스크립트의 빌트인 함수인 **concat**과 **filter**를 이용하여 두 개의 배열의 중복을 제거하여 합치는 방법을 소개합니다.

### Concat

`Array.prototype.concat()` 함수는 두 개 또는 그 이상의 배열들을 합치는 함수입니다.

#### 예제

```js
var a1 = [1, 2, 3];
var a2 = [3, 4, 5, 6];
var a3 = a1.concat(a2);

console.log(a3);
// expected output: Array [1, 2, 3, 3, 4, 5, 6]
```

#### Ref

{% include base/components/link.html title='Array.prototype.concat() - JavaScript | MDN' internal_link='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat' %}

### 중복 제거하기

위의 `concat()` 함수를 통해서 얻어진 배열에서 중복을 제거해야하는 경우가 있습니다. 그런 경우 다음과 같이 `filter()` 함수를 이용하여 손쉽게 중복 값을 제거 할 수 있습니다.

```js
var a = [1, 2, 3, 3, 4, 5, 6];
var unique = a.filter((item, pos) => a.indexOf(item) === pos);

console.log(unique);
// [1, 2, 3, 4, 5, 6]
```

### 중복 없이 배열 합치기

결론적으로 두 가지 함수를 한 번에 적용하면 다음과 같이 간단하게 코드를 작성할 수 있습니다.

```js
var a
var a1 = [1, 2, 3];
var a2 = [3, 4, 5, 6];

var merged = a1.concat(a2)
var unique = merged.filter((item, pos) => merged.indexOf(item) === pos);

console.log(unique);
// [1, 2, 3, 4, 5, 6]
```

## 맺음

간단하게 중복없이 배열을 합치는 방법에 대해서 알아보았습니다. 궁금하신 점이나 이상한 부분은 댓글로 남겨주세요

감사합니다.
