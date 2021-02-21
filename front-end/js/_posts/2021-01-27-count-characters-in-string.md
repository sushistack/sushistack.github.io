---
layout: post
published: true
title: "[Js/자바스크립트] 문자열의 특정 문자 개수 세는 방법"
icon: js
description: >
  Javascript 문자열에서 특정 문자의 개수를 세는 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /front-end/js/count-characters-in-string
tags:
  - js
  - javascript
  - 자바스크립트
  - indexOf
  - 문자열 개수
  - 문자 개수 세기
---

웹 페이지 개발을 하다보면 다양한 요구사항들이 생기기 마련입니다. 저도 자바스크립트의 다양한 함수에 대해서 공부를 진행하면서 여러가지 고민을 하게됩니다.

제가 했던 고민들 중 js의 문자열과 관련된 문제 중 하나인 문자열 내의 특정 문자의 개수를 세는 방법에 대해서 소개해드리려고 합니다.

## 문자열의 특정 문자 개수 세는 방법

```js
var text = 'aaabbbaaabababaaaabaa';
```

위와 같은 형태의 문자열이 있을 때, `a`의 개수와 `b`의 개수를 알고 싶다면 어떻게 해야할까요?

### String.prototype.indexOf()

```js
str.indexOf(searchValue[, fromIndex])
```

자바스크립트의 문자열과 관련된 `indexOf`라는 빌트인 함수가 있습니다. 이 함수는 문자열 내의 `특정 문자`를 포함하는 **가장 첫 번째 인덱스**를 반환합니다.

이 함수를 적절하게 이용하면 앞서 질문드렸던 문제를 해결할 수 있습니다.

#### fromIndex 사용 방법

```js
var text = 'abbabbbba';

text.indexOf('a');     // 0
text.indexOf('a', 1);  // 3
text.indexOf('a', 3);  // 3
text.indexOf('a', 4);  // 8
```

`indexOf`의 두 번째 파라미터인 `fromIndex`를 사용하면 위와 같이 검색의 시작 위치를 변경할 수 있습니다.

### 문자열 내의 특정 문자 개수 세기 예제

```js
var text = 'aaabbbaaabababaaaabaa';
var count = 0;
var searchChar = 'a'; // 찾으려는 문자
var pos = text.indexOf(searchChar); //pos는 0의 값을 가집니다.

while (pos !== -1) {
  count++;
  pos = text.indexOf(searchChar, pos + 1); // 첫 번째 a 이후의 인덱스부터 a를 찾습니다.
}

console.log(count); // 로그에 14를 출력합니다.
```

위 코드는 `aaabbbaaabababaaaabaa`라는 문자열에서 `a`라는 문자가 몇 개가 있는지 셀 수 있는 예제입니다.

위 코드에서 검색하려는 문자를 `a`에서 `b`로 변경하면 `b`가 몇 개가 있는지도 확인할 수 있습니다.

### 참고 문서

{% include base/components/link.html title='String.prototype.indexOf() - JavaScript | MDN' internal_link='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf' %}

## 맺음

간단하게 **문자열에서 특정 문자의 개수를 세는 방법**에 대해서 소개해봤습니다. 혹시 궁금하신 점이나 이상한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
