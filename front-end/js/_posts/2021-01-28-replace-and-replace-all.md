---
layout: post
published: true
title: "[Js/자바스크립트] 문자열 치환(변환, 대치, 바꾸기): replace, replaceAll"
icon: js
description: >
  Javascript의 replace 함수를 이용하여 문자열 내부의 특정 문자 또는 문자열을 변하는 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /front-end/js/replace-and-replace-all
tags:
  - js
  - javascript
  - 자바스크립트
  - replace
  - replaceAll
  - 문자열 치환
  - 문자열 바꾸기
  - 문자열 변경
---

웹 서비스에서 문자열에 대한 변환처리를 해주어야하는 경우가 있습니다.

예를 들어 숫자를 `1000` -> `1,000` 형태로 바꿔주어 보여주어야 할 수도 있고, `A B C D`-> `ABCD`와 같이 공백을 제거해주어야 하는 경우가 있을 수 있습니다.

이번 글에서는 자바스크립트에서 문자열의 **특정한 문자 또는 문자열을 치환** 하는 방법에 대해서 소개해드리도록 하겠습니다.

## 문자열 치환하는 방법

```text
aaaabbbbcccc -> aaaaaaaaaaaa
```

어떻게 하면 위와 같이 `aaaabbbbcccc`라는 문자열을 `aaaaaaaaaaaa`로 변경시킬 수 있을까요?

### String.prototype.replace()

자바스크립트에서는 문자열 치환과 관련된 빌트인 함수인 `replace()`를 이용하여 문자열을 치환할 수 있습니다.

```js
var newStr = str.replace(정규식|부분 문자열, 새로운 부분 문자열|함수)
```

#### 정규식

정규식 객체나 리터럴 값입니다. **정규식에 일치**하는 부분 문자열을 `새로운 부분 문자열`이나 `지정된 함수`를 통해서 치환할 수 있습니다.

#### 부분 문자열

새로운 부분 문자열로 바꿀 타겟 부분 문자열입니다. 이 값은 정규식이 아닌 문자 또는 문자열이 될 수 있습니다. 전체 문자열에서 찾은 첫 번째만 새로운 부분 문자열로 대치됩니다.

#### 새로운 부분 문자열

지정된 부분 문자열을 대치할 새로운 부분 문자열입니다. 여러가지 대체 패턴들이 지원되지만 일반적으로 String을 사용합니다.

#### 함수

주어진 정규식 또는 부분 문자열에 일치하는 요소를 대체할 때 사용할 함수입니다.

#### 주의할 점

{% include base/components/hint-box.html type='warning' text='replace 함수는 문자열 내의 가장 첫 번째로 찾은 부분 문자열만 새로운 부분 문자열로 변경시켜줍니다. 따라서 문자열 내부의 전체 부분 문자열에 적용하기 위해서는 정규표현식을 사용해야 합니다.' %}

### 문자열 치환 예제

> - 일반 문자열 치환
> - 정규식을 사용하여 문자열 치환
> - 함수를 이용하여 문자열 치환

문자열을 치환하는 방법에 대해서는 위와 같이 세 가지의 예제를 소개해드리도록 하겠습니다.

#### 일반 문자열 치환

```js
var text = 'aaaabbbbcccc';

text.replace('b', 'a'); // aaaaabbbcccc
```

위에서 설명했던 바와 같이 `replace`를 사용하면 문자열의 처음부터 가장 처음으로 찾은 문자를 바꿔줍니다.

#### 정규식을 사용하여 문자열 치환

문자열 전체에서 일치하는 부분 문자열 전부를 새로운 문자열로 바꿔주려면 **정규식**을 이용해야합니다.

```js
var text = 'aaaabbbbcccc';

var regexForB = /b/gi;     // b 문자 전체
var regexForC = /c/gi;     // c 문자 전체

text
  .replace(regexForB, 'a') // aaaaaaaacccc
  .replace(regexForC, 'a') // aaaaaaaaaaaa
```

위 코드는 정규식을 이용하여 문자열 내부의 모든 `b`와 `c`를 `a`로 바꿔주는 예제입니다.

> - g modifier: global, 전체 매치
> - i modifier: insensitive, 대소문자 구분 제거

정규식에 대한 궁금증이 있으신 분이 있을 것 같아서 정규식에 대한 설명을 추가해주었습니다.

#### 함수를 이용하여 문자열 치환

replace 함수에서는 조금 더 **복잡한 형태**의 치환을 할 수 있도록 하기위해 파라미터로 함수를 받아서 문자열 치환을 할수 있도록 제공하고 있습니다.

```js
var text = 'aaaabbbbcccc';

function replaceWithAddingBrace(match) {
  return '{' + match + '}';
}

text.replace(/b/gi, replaceWithAddingBrace);
// aaaa{b}{b}{b}{b}cccc
```

위 코드는 `replace` 함수에 문자열 내의 `b`를 찾아서 `{b}`형태로 변경해주는 함수를 전달하여 조금 더 복잡한 형태의 치환을 하는 예제 입니다.

### 참고 문서

{% include base/components/link.html title='String.prototype.replace() - JavaScript | MDN' internal_link='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace' %}

## 맺음

간단하게 **문자열 치환하는 방법**에 대해서 알아보았습니다. 혹시 궁금하신 점이나 이상한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
