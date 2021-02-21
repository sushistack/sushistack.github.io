---
layout: post
published: true
title: "[Js/자바스크립트] 타이머 함수: setTimeout, setInterval"
icon: js
description: >
  Javascript 타이머 함수인 setTimeout, setInterval에 대하여 소개합니다.
author: deeplify
toc: true
permalink: /front-end/js/timer-functions
tags:
  - js
  - javascript
  - 자바스크립트
  - setTimeout
  - setInterval
  - clearInterval
---

자바스크립트를 사용하는 용도는 정말 다양합니다. 대표적인 예시로 사용자의 액션에 대한 이벤트를 처리하거나 비동기 통신 등이 있습니다.

위와 같은 기능들을 만들다보면 이벤트 처리나 비동기 통신을 통해 얻은 데이터를 **일정 시간**이 지난 후에 처리해야하는 요구사항들이 생기는 경우가 있습니다.

이번 글에서는 자바스크립트를 통해 시간을 제어할 수 있는 **타이머 함수**들에 대해서 소개드리도록 하겠습니다.

## 타이머 함수란?

자바스크립트에서 다루는 타이머 함수는 일정 시간이 지난 후 특정 코드 또는 함수가 실행될 수 있도록 해주는 함수와 일정 시간마다 함수가 실행될 수 있도록 해주는 함수를 말합니다.

> 타이머 함수
> - setTimeout & clearTimeout
> - setInterval & clearInterval

일반적으로 사용하는 타이머 함수는 위의 두 종류입니다.

### setTimeout

```js
setTimeout(함수/코드[, 지연시간, 파라미터1, 파라미터2, ...])
```

`setTimeout`은 파라미터로 함수를 받고와 지연시간 그리고 추가적인 파라미터가 주어질 수 있습니다.

#### 함수

개발자가 작성한 함수로 `setimeout`에 지정한 지연시간이 만료된 이후에 실행됩니다.

#### 코드

setimeout의 첫 번째 파라미터로 함수 대신에 문자열이 들어갈 수 있습니다. 이 또한 시간이 만료되면 코드를 분석하여 실행하게 됩니다.

{% include base/components/hint-box.html type='danger' text='이 구문은 eval()를 사용하는 것과 마찬가지로 보안적으로 위험하기 때문에 사용 권장되지 않습니다.' %}

#### 지연시간

ms 단위의 **지연될 시간**을 의미하고, 만약 이 파라미터를 생략하면 지연시간을 넣지 않으면 0ms의 후에 지정된 함수 또는 코드가 실행됩니다.

#### 파라미터N

setTimeout에 지정된 함수로 전달되는 파라미터들입니다.

#### 반환 값

setTimeout 함수를 통해서 나오는 반환 값은 **타이머의 ID**입니다. 이 ID값과 하단에서 소개드릴 clearTimeout을 통해서 타이머를 취소할 수 있습니다.

#### setTimeout 예제

```js
function changeBackgroundColor () {
  document.body.style.background = 'red'
}

// 5초 후에 changeBackgroundColor 함수를 실행
var timeoutId = setTimeout(changeBackgroundColor, 5000)
```

위와 같은 코드로 작성을 하게되면, 페이지가 로드되면서 setTimeout 함수가 실행되는 시점으로부터 5초 후 `changeBackgroundColor` 함수가 실행되어 body 엘리먼트의 배경색이 빨간색으로 변경됩니다.

### clearTimeout

clearTimeout 함수는 setTimeout 함수가 시작하면서 반환한 `timeoutId`를 이용하여 예약된 타이머를 취소할 수 있는 기능을 가지고 있습니다.

```js
function changeBackgroundColor () {
  document.body.style.background = 'red'
}

// 5초 후에 changeBackgroundColor 함수를 실행
var timeoutId = setTimeout(changeBackgroundColor, 5000)

// 시작된 타이머를 취소
clearTimeout(timeoutId);
```

위 코드 처럼 구현할 경우, 타이머가 취소되기 때문에 배경색이 빨간색으로 변경되지 않습니다.

### setInterval

```js
setInterval(함수/코드[, 지연시간, 파라미터1, 파라미터2, ...])
```

**setInterval**은 setTimeout과는 다르게 주어진 지연시간마다 계속해서 지정한 함수를 수행합니다.

{% include base/components/hint-box.html type='info' text='setInterval에 사용되는 파라미터들은 setTimeout과 동일하기 때문에 생략하도록 하겠습니다.' %}

### clearInterval

clearInterval은 setInterval 함수의 반환값이 `intervalId`를 이용하여 해당 타이머를 취소 또는 종료할 수 있는 함수입니다.

{% include base/components/hint-box.html type='info' text='setInterval 함수는 주기를 가지고 계속 실행되기 때문에 clearInterval을 이용하여 종료해주어야 합니다.' %}

### setInterval, clearInterval 예제

예제를 통해서 사용하는 방법을 소개해드리도록 하겠습니다.

```js
function alertMessage () {
  alert("I'm AlertMessage");
}

// 5초마다 alertMessage 함수를 실행
var intervalId = setInterval(alertMessage, 5000)

function stopInterval (intervalId) {
  clearInterval(intervalId)
}

// 20초 후에 실행시켰던 interval 타이머를 종료
setTimeout(stopInterval, 20000, intervalId)
```

setInterval과 clearInterval은 함께 사용하는 경우가 많기 때문에 위와 같은 예제를 준비하였습니다.

위 예제의 경우, 페이지 로드 후 5초마다 얼럿창을 띄우게 되고, 20초후부터는 얼럿창을 띄우는 타이머가 종료되어 더 이상 타이머가 얼럿이 뜨지 않게 됩니다.

### 참고 사항

setTimeout과 setInterval을 사용하면서 알아두면 좋을 것들을 중요도 순서대로 소개해보도록 하겠습니다.

#### 메모리 누수 (Memory leak)

자바스크립트는 JS 엔진에 의해서 메모리가 관리되고 있습니다.

JS 엔진은 더 이상 사용하지 않는 메모리를 추적하여 메모리를 해제하는 가비지 컬렉팅 (Garbage Collecting) 기능을 가지고 있습니다.

하지만 여러 개의 타이머 함수를 사용하는 페이지에서 정확히 `clear 함수`를 이용하여 해제해주지 않으면 **GC를 통한 메모리 해제가 정상적으로 동작하지 않을** 수 있습니다.

{% include base/components/hint-box.html type='warning' text='요즘 인기를 얻고 있는 SPA (Single Page Application)은 실제로 페이지를 새로 로드하는 것이 아니기 때문에 타이머 함수 사용 시, 더욱더 주의를 기울여야합니다.' %}

#### 클로져 이슈

타이머 함수에 대한 클로저 이슈는 setTimeout, setInterval 둘 모두에 해당하므로 setTimeout으로 예제를 소개해보도록 하겠습니다.

```js
for (var i = 0; i < 5; i += 1) {
  setTimeout(function () {
    console.log(i)
  }, i * 1000)
}
```

위와 같은 코드를 실행했을 때, 결과 값으로 `0 ~ 4`까지 순차적으로 로그가 찍힌다고 생각하셨다면, 클로져에 대한 이해가 필요합니다.

```text
5
5
5
5
5
```

예제에 대한 실제 로그는 위와 같은 형태로 모두 `4`로 찍히게됩니다. 그 이유는 setTimeout 모두는 `for` 문이 실행된 이후에 실행되기 때문입니다.

```js
for (var i = 0; i < 5; i += 1) {
  (function (a) {
    setTimeout(function () {
      console.log(a)
    }, i * 1000)
  })(i);
}
```

```text
0
1
2
3
4
```

위와 같은 방식으로 익명 함수로 래핑하여 변수를 익명 함수의 파라미터로 전달하게되면 `0 ~ 4`가 차례대로 출력되는 원하는 결과를 얻을 수 있습니다.

#### Clear 함수의 사용

`setTimeout`과 `setInterval`의 리턴 값인 타이머ID는 같은 공간에서 관리되기 때문에 실행된 타이머를 `clearTimeout` 또는 `clearInterval` 둘 중 어느 것을 사용하여도 기술적으로 동일하게 동작합니다.

### 참고 문서

{% include base/components/link.html title='WindowOrWorkerGlobalScope.setTimeout() - JavaScript | MDN' internal_link='https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout' %}

{% include base/components/link.html title='WindowOrWorkerGlobalScope.setInterval() - JavaScript | MDN' internal_link='https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval' %}

## 맺음

이번 글에서는 자바스크립트에서 자주 사용하는 타이머 함수인 setTimeout, setInterval에 대해서 알아보고 예제를 통해 사용방법에 대해서 소개해드렸습니다.

혹시 궁금하신 점이나 이상한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
