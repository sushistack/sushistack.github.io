---
layout: post
published: false
title: "Uncaught DOMException: Blocked a frame with origin from accessing a cross-origin frame 에러"
icon: js
description: >
  "Uncaught DOMException: Blocked a frame with origin from accessing a cross-origin frame"
author: deeplify
toc: true
permalink: /front-end/js/cross-origin-frame
tags:
  - js
  - iframe
  - postMessage
---

자바스크립트를 이용하여 프론트엔드 개발을 할 때, `iframe`을 사용해야하는 경우가 종종 있는데요.
뭔가 외부 서비스, 예를 들어 광고나 플러그인을 내 페이지에 부분적으로 보여주고 싶을 때 사용하게 됩니다.

저 같은 경우, 블로그에 `AMP-DISQUS`를 설치하다가 이런 에러가 발생하였습니다.

### Error

`Blocked a frame with origin from accessing a cross-origin frame`


### Reason

![js_iframe](/assets/images/js-iframe.png)

해당 에러는 부모와 자식간의 Origin 즉, `Domain`이 다른 상황에서 자신이 아닌 상대방의 DOM에 접근 하려고 
할 때, 발생합니다.

예를 들어 다음과 같은 상황에서 발생합니다.

```html
<!-- this document's domain is example.com -->
<html>
  <head>...</head>
  <body>
    <iframe id="child" src="https://different-domain.com"><iframe>
  </body>
</html>
```

- 부모 DOM에서 자식 DOM이 가지고 있는 함수 또는 프로퍼티를 참조하려고 하는 경우.

```js
// this script is located in parent DOM

var child = document.getElementById('child').contentWindow;

// Blocked a frame with origin from accessing a cross-origin frame
child.functionOfChild();
```

- 자식 DOM에서 부모 DOM이 가지고 있는 함수 또는 프로퍼티를 참조하려고 하는 경우.

```js
// this script is located in child DOM

var parent = window.parent;

// Blocked a frame with origin from accessing a cross-origin
parent.finctionOfParent();
```

### Solution

- Domain 변경.

이 경우는 서브 도메인(Sub domain) 제거만 가능합니다.

```js
// Parent's domain is [aaa.example.com]
// Child's domain is [bbb.example.com]

// In a Parent's DOM
document.domain = 'example.com'
// In a child's DOM
document.domain = 'example.com'
```

- `window.postMessage()` 빌트인 함수를 이용하는 방법

```js
targetWindow.postMessage(message, targetOrigin, [transfer]);
```

- Send data Parent to Child.

```js
// host: http://example.com:8080
// In a Parent DOM.

// Child로 팝업을 뛰웁니다.
var popup = window.open(...popup details...);

// This does nothing, assuming the window hasn't changed its location.
popup.postMessage(
  {
    "user": "bob",
    "password": "secret"
  },
  "http://example.com"
);

// window가 자신의 위치를 바꾸지 않았다면,
// 아래코드가 실행되면서 팝업에 보내질 데이터를 큐에 넣어줍니다.
popup.postMessage(
  {
    "message": "Hi, there"
  },
  "http://example.com"
);

function receiveMessage(event) {
  // 우리는 이 메시지에 대한 발신자를 신뢰 할 수 있을까요?
  // (이 메시지는 우리가 열었던 팝업창에서 온 것이 아닐 수 있습니다.)
  if (event.origin !== "http://example.com")
    return;

  // event.source is popup
  // event.data is {"message1": "Hi there!", "message2": "It's me!"}
}

window.addEventListener("message", receiveMessage, false);
```

- Reply to Parent.

```js
// host: http://example.com
// parent DOM의 postMessage가 호출 된 뒤, 호출 됩니다.
function receiveMessage(event) {
  // 우리는 이 메시지의 발신자를 신뢰할 수 있을 까요?
  if (event.origin !== "http://example.com:8080")
    return;

  // event.source is window.opener
  // event.data is {"message": "Hi, there"}


  // origin을 검증했다고 가정하면, 이 메시지에 대한 답장을 위한
  // 가장 편리한 도구는 event.source.postMessage()를 사용하는 것 입니다.
  event.source.postMessage(
    {
      "message1": "Hi there!",
      "message2": "It's me!"
    },
    event.origin
  );
}

window.addEventListener("message", receiveMessage, false);
```

#### Ref

{% include base/components/link.html title='Window.postMessage() - Web API | MDN'  internal_link='https://developer.mozilla.org/ko/docs/Web/API/Window/postMessage' %}

이렇게 간단하게 `Blocked a frame with origin from accessing a cross-origin frame` 에러에 대해서 알아보았고, 그에 대한 해결 방법까지 알아보았습니다.

감사합니다.
