---
layout: post
published: true
title: "[Js/자바스크립트] 공백(space) 제거 하는 방법: trim, replace"
icon: js
description: >
  Javascript에서 trim과 replace를 이용하여 공백을 제거하는 방법 소개합니다.
author: deeplify
toc: true
permalink: /front-end/js/remove-space
tags:
  - js
  - javascript
  - 자바스크립트
  - remove space
  - 공백 제거
  - 공백
  - 띄어쓰기
  - space
---

웹 페이지 개발을 하다보면 데이터를 조작할 일이 많이 있습니다. 특히 문자열을 다룰 때 많이 발생하는 문제점으로 문자열에 **공백**이 포함되어서 이를 **제거**해야하는 경우가 만습니다.

이번 글에서는 자바스크립트를 이용하여 공백을 제거하는 방법에 대해서 소개해드리도록 하겠습니다.

## 공백 제거 하는 방법

> - trim 함수를 이용하여 앞 뒤 공백 제거
> - replace 함수를 이용하여 공백 제거

공백을 제거하는 방법은 요구사항에 따라서 약간씩 다른 방법으로 적용가능합니다. 위와 같이 `trim`을 이용한 방법과 `replace`를 이용한 방법 두 가지를 모두 알아보도록 하겠습니다.

### String.prototype.trim()

```js
str.trim()
```

trim() 함수는 문자열의 앞 뒤의 모든 공백을 제거합니다. 공백이란 모든 공백문자(space, tab, NBSP 등)와 모든 개행문자(LF, CR 등)를 의미합니다.

#### trim을 이용한 앞 뒤 공백 제거 예제

```js
var text1 = ' test ';
var text2 = '\ttest\t';
var text3 = '\ntest\n';

text1.trim();   // test
text2.trim();   // test
text3.trim();   // test
```

위 코드는 모든 앞 뒤의 공백을 제거할 수 있는 예제입니다. 문자열 앞 뒤에 공백이 **중복**되어 여러 개가 있어도 모두 제거됩니다.

### String.prototype.replace()

문자열 앞 뒤 공백은 `trim` 함수를 통해서 처리가 가능하지만 문자열 내부에 대한 공백 처리는 `trim` 함수로는 불가능합니다.

따라서 `replace` 함수와 **정규식**을 이용하여 공백을 제거해야합니다.

{% include base/components/link.html title='[Js/자바스크립트] 문자열 치환(변환, 대치, 바꾸기): replace, replaceAll' internal_link='/front-end/js/replace-and-replace-all' %}

replace 함수에 관한 자세한 내용을 확인하고 싶으신 경우, 위 링크를 통해서 동작 방식과 다양한 예시를 통해서 `replace` 함수에 대해서 자세하게 확인하실 수 있습니다.

#### replace를 이용한 공백 제거 예제

##### 문자열 내의 모든 공백 제거

```js
var text = ' a b c     d e';
var regex = / /gi;
// 또는
// var regex = /\s/gi;

text.replace(regex, '');  // 'abcde'
```

위 코드는 문자열 내의 모든 공백을 제거하는 예제입니다. 정규식 `/ /gi` 또는 `/\s/gi`를 사용하여 문자열 내부의 모든 공백 제거가 가능합니다.

##### 문자열 처음의 공백만 제거

```js
var text = '    a b c     d e';
var regex = /^[\s\uFEFF\xA0]+/gi;

text.replace(regex, '');  // 'a b c     d e'
```

위 코드는 문자열의 처음에 있는 **모든 공백**을 제거하는 예제입니다.

위 정규식의 의미는 `^`(문자열의 처음), `\s`(공백), `\uFEFF`(이스케이프된 빈 문자), `+`(일치하지 않을 때까지), `\xA0`(이스케이프된 공백) 입니다.

##### 문자열 끝의 공백만 제거

```js
var text = ' a b c     d e     ';
var regex = /[\s\uFEFF\xA0]+$/gi;

text.replace(regex, '');  // ' a b c     d e'
```

위코드는 문자열의 끝에 있는 **모든 공백**을 제거하는 예제입니다.

위 정규식의 의미는 `\s`(공백), `\uFEFF`(이스케이프된 빈 문자), `\xA0`(이스케이프된 공백), `+`(일치하지 않을 때까지), `$`(문자열의 끝) 입니다.

{% include base/components/hint-box.html type='info' list='g modifier: global, 전체 매치|i modifier: insensitive, 대소문자 구분 제거' %}

### Trim 크로스 브라우저 이슈 해결 방법

```js
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}
```

IE9과 같은 옛날 브라우저의 경우, `trim` 함수가 동작하지 않을 수 있습니다. 따라서 `replace`와 **정규식**으로 구현된 코드를 페이지 상단에 추가해주어 정상적으로 동작하게 할 수 있습니다.

### 참고 문서

{% include base/components/link.html title='String.prototype.trim() - JavaScript | MDN' internal_link='https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/Trim' %}

{% include base/components/link.html title='String.prototype.replace() - JavaScript | MDN' internal_link='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace' %}

## 맺음

간단하게 자바스크립트를 이용하여 **공백을 제거하는 방법**에 대해서 알아보았습니다. 혹시 궁금하신 점이나 이상한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
