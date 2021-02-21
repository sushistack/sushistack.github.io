---
layout: post
published: true
title: "[Js/자바스크립트] 배열(리스트) 또는 문자열에서 특정 문자 검색: indexOf 활용"
icon: js
description: >
  Javascript 배열 또는 문자열에서 특정 문자를 indexOf 함수를 이용하여 검색하는 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /front-end/js/search-text-in-string-with-index-of
tags:
  - js
  - javascript
  - 자바스크립트
  - indexOf
  - search
  - 배열 검색
  - 문자열 검색
---

웹 페이지에서 간단한 텍스트 검색 기능을 구현할 때는 **서버 측에서 검색**하여 내려주는 방식과 **클라이언트 측에서 필터링**을 통해서 검색 결과를 보여주는 방식이 있습니다.

이번 글에서는 자바스크립트에서 간단한 텍스트 검색 또는 텍스트 배열 검색을 하는 방법을 소개해보도록 하겠습니다.

## 배열 또는 문자열에서 특정 문자 검색하는 방법

자바스크립트에서는 배열 또는 문자열에 대한 데이터 가공을 할 수 있는 다양한 빌트인 함수들을 제공하고 있습니다.

이번 글의 주제인 배열 또는 문자열에서 **검색을 할 수 있도록 도와주는 함수**를 배열과 문자열 검색으로 나누어서 소개하겠습니다.

### 배열에서 특정 문자 검색

```js
var array = ['abc', 'def', 'ad'];
```

위와 같은 배열에서 `def`라는 배열을 검색하고 싶으면 어떻게 해야할까요?

#### Array.prototype.indexOf()

```js
array.indexOf(searchElement[, fromIndex])
```

자바스크립트의 배열에는 기본적으로 `indexOf()`라는 함수를 제공하고 있습니다. 이 함수는 배열의 **특정한 값을 갖는 문자열을 갖고** 있는 인덱스 번호를 반환해주는 함수입니다.

##### 배열의 indexOf 함수 예제와 반환 값

```js
var array = ['a', 'b', 'c', 'd'];

array.indexOf('a')  // 0
array.indexOf('b')  // 1
array.indexOf('c')  // 2
array.indexOf('d')  // 3
array.indexOf('e')  // -1
array.indexOf('except a, b, c, d')  // -1
```

위 코드는 배열의 `indexOf()` 함수에 찾으려는 값을 넣어주고, 실행 되었을 때의 반환 값을 보여주는 예제입니다.

만약 배열 내부에 찾으려는 **값이 존재**하는 경우에는 배열의 해당하는 값의 `인덱스`를 반환하고, 그렇지 않은 경우에는 `-1` 값을 반환합니다.

#### 배열에서 특정 값(문자) 검색

```js
var array = ['abc', 'def', 'ad'];

// 검색하려는 문자
var searchText = 'def';

// 검색하려는 문자가 있는 배열의 인덱스
var index = array.indexOf(searchText);

var logText = '';
if (index !== -1) {
  logText = 'array[' + index + '] = ' + searchText
} else {
  logText = 'Can not found text in array !'
}

console.log(logText); // array[1] = def
```

위 코드는 선언된 배열에서 `def`라는 문자를 찾는 예제입니다. 예제 하단의 로그를 통해서 결과를 확인할 수 있습니다.

### 문자열에서 특정 문자 검색

```js
var text = 'I am a student';
```

위와 같은 문자열에서 특정 문자를 검색할 수 있을까요?

#### String.prototype.indexOf()

```js
str.indexOf(searchValue[, fromIndex])
```

자바스크립트의 문자열 검색도 배열에서 검색했던 방식과 동일하게 `indexOf()` 함수를 이용하여 적용할 수 있습니다.

##### 문자열 indexOf 함수 예제와 반환 값

```js
var text = 'student';

text.indexOf('s');   // 0
text.indexOf('ud');  // 2
text.indexOf('x');   // -1
// ...
```

위와 같이 코드를 작성하고 실행하였을 때, 문자열 `student`에서 특정 문자 `s`와 `ud`를 **indexOf** 함수를 이용하면 해당 문자의 인덱스 번호를 얻을 수 있습니다.

배열의 indexOf와 동일하게 찾으려는 문자열이 있으면 해당 문자열의 **인덱스 번호**를 반환하고, 그렇지 않으면 `-1`을 반환합니다.

#### 문자열에서 특정 문자 검색 예제

```js
var text = 'student';

// 검색하려는 문자
var searchText = 'dent';

// 검색하려는 문자가 있는 배열의 인덱스
var index = text.indexOf(searchText); // index = 3

var isFound = index !== -1;

console.log(isFound); // true
```

위 코드처럼 작성한 경우, 문자열에서 검색하고자 하는 문자를 포함하는지 여부를 확인할 수 있습니다.

### 문자열 검색 응용: 문자열 리스트 검색

사실 대부분의 웹서비스에서의 검색 기능은 **문자열 리스트**에서 특정 문자를 포함하는 리스트를 노출시키려는 경우가 많습니다.

따라서 위에서 설명드린 문자열에서 특정 문자를 검색하는 방법과 필터링 기능을 이용하여 **문자열 리스트**에서의 검색을 할 수 있습니다. 다음 예제를 통해서 확인해보겠습니다.

#### Array.prototype.filter()

배열의 빌트인 함수인 filter 함수는 배열 내부에 **특정 조건에 맞는** 값만 선택하여 새로운 배열을 만들어주는 함수입니다.

```js
var array = ['a', 'a', 'b', 'c'];

var result = array.filter(function (currentValue) {
  return currentValue === 'a'
});

console.log(result)
// ['a', 'a']
```

위에 작성된 코드는 배열에서 `a`라는 문자를 갖는 값만 필터링하여 보여주는 예제입니다.

#### 문자열 리스트 검색 예제

문자열에서 특정 문자열 검색하는 방법과 배열 필터링 기능을 이용하여 문자열 리스트 검색하는 예제를 보여드리도록 하겠습니다.

```js
var list = [
  'I need you to help me',
  'I like listening to music',
  'I was washing the dishes',
  'What are you looking for?',
  'Why are you doing it?'
];

var searchText = 'you';
var result = list.filter(function (sentence) {
  return sentence.indexOf('you');
});

console.log(result);
/*
[
  'I need you to help me',
  'What are you looking for?',
  'Why are you doing it?'
]
*/
```

위와 같은식으로 문자열 리스트에서 특정 문자를 포함하는 리스트를 조회할 수 있습니다.

### indexOf 사용 주의점

배열 또는 문자열에서 `indexOf` 사용 시 주의할 점과 알아두면 좋은 점에 대해서 설명하도록 하겠습니다.

#### indexOf의 fromIndex 사용

```js
var text = 'abbabbbba';

text.indexOf('a');     // 0
text.indexOf('a', 1);  // 3
text.indexOf('a', 3);  // 3
text.indexOf('a', 4);  // 8
```

`indexOf`의 두 번째 파라미터인 `fromIndex`를 사용하면 위와 같이 검색의 시작 위치를 변경할 수 있습니다.

#### 대소문자 구분 (Case Sensitive)

```js
var text = 'aABcd';
var searchText = 'ab';

text.indexOf('ab'); // -1

text.toUpperCase().indexOf(searchText.toUpperCase()); // 1
text.toLowerCase().indexOf(searchText.toLowerCase()); // 1
```

indexOf를 사용할 때는 대소문자가 구분되어 동작됩니다.

따라서 **대소문자 구분 없이 검색**을 하고 싶다면 위와 같이 비교 대상 모두를 `upper case` 또는 `lower case`로 한 쪽으로 변경하여 진행하시면 됩니다.

#### 배열 또는 문자열의 값 중복 문제

```js
var array = ['a', 'a', 'b', 'b'];
var text = 'aabb';
```

위와 같이 배열 또는 문자열에는 중복된 값이 들어갈 수 있습니다. 그렇다면 `indexOf()` 함수에 중복된 문자열을 찾으려고 한다면 어떤 값을 반환해줄까요?

{% include base/components/hint-box.html type='info' text='배열 또는 문자열에 중복된 값이 있을 때 indexOf에 중복된 값을 전달하여 실행하면 배열 또는 문자열에서 가장 처음으로 만나는 인덱스를 리턴합니다.' %}

##### 예제 결과

```js
array.indexOf('a'); // 0
array.indexOf('b'); // 2
text.indexOf('a');  // 0
text.indexOf('b');  // 2
```

### 참고 문서

{% include base/components/link.html title='Array.prototype.indexOf() - JavaScript | MDN' internal_link='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf' %}

{% include base/components/link.html title='String.prototype.indexOf() - JavaScript | MDN' internal_link='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf' %}

{% include base/components/link.html title='Array.prototype.filter() - JavaScript | MDN' internal_link='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter' %}

## 맺음

간단하게 **배열 또는 문자열에서 특정 문자 검색하는 방법**에 대해서 소개해드렸습니다. 혹시 궁금하신 점이나 이상한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
