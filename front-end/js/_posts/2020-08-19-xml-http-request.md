---
layout: post
published: true
title: "[Js/자바스크립트] XMLHttpRequest 사용법"
icon: js
description: >
  XMLHttpRequest를 예제를 통해 정확하게 사용하는 방법에 대해서 소개해드리겠습니다.
author: deeplify
toc: true
permalink: /front-end/js/xml-http-request
tags:
  - XMLHttpRequest
  - xhr
  - async
  - javascript
---

프론트엔드에서 개발을 하면, 백엔드와의 통신을 위해서 요청을 보내야하는 경우가 있습니다. 요즘에는 **axios**같은 모듈이 있어서 간단하게 요청을 할 수 있습니다. 하지만 과거에는 JQuery의 `ajax`를 많이 이용했던 것 같습니다.

하지만 Jquery의 Ajax도 javascript의 **XMLHttpRequest**를 래핑하여 사용하기 쉽도록 구현해 놓은 것입니다.

## XMLHttpRequest란?

XMLHttpRequest는 서버와 상호 작용하는 데 사용됩니다. 전체 페이지를 새로 고칠 필요없이 API 호출을 통해 데이터를 조회 할 수 있습니다. 이를 통해 웹 페이지는 사용자가 수행하는 작업을 중단하지 않고 페이지의 일부만 업데이트 할 수 있습니다.

{% include base/components/link.html title='XMLHttpRequest - Web APIs: MDN'  internal_link='https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest' %}

XMLHttpRequest의 예제 코드를 통해 사용하는 방법에 대해서 알아보고, 어떻게 동작하는지 자세히 살펴보도록 하겠습니다.

### 예제 코드

```js
var xmlHttp = new XMLHttpRequest();

xmlHttp.onreadystatechange = function () {
  if (xmlHttp.readyState === xmlHttp.DONE) {
    if (xmlHttp.status === 200) {
      // do something with xmlHttp.responseText
      console.log(xmlHttp.responseText)
    } else {
      // handle errors
    }
  }
};
  xmlHttp.open( "GET", 'https://test.com');
  xmlHttp.send(null);
}
```

> 일반적인 사용 방법
> 1. XMLHttpRequest 객체 생성
> 2. onreadystatechange 이벤트 핸들러 함수 선언
> 3. open 함수를 통해 요청할 method, url 등의 다양한 설정
> 4. send 함수를 통해 전송할 데이터와 함께 요청

onreadystatechange 함수는 요청의 상태에 따라 시작부터 끝까지 발생하는 모든 이벤트들을 핸들링 할 수 있는 함수입니다. 예제 코드에서는 요청에 대한 데이터 처리가 완료되었고, 응답 코드가 200(success)인 경우에 응답 값을 콘솔에 찍도록 작성되었습니다.

### 상태 값

XMLHttpRequest의 상태 값에는 **readyState**와 **status** 속성 값이 있습니다.

#### readyState

요청의 상태를 반환합니다.

미리 정의된 코드값은 다음과 같습니다.

- UNSENT(0): XMLHttpRequest 객체의 생성된 상태
- OPEND(1): 예제에서도 있지만 `open(~)`메소드가 성공적으로 실행된 상태
- HEADERS_RECEIVED(2): 모든 요청에 대한 응답이 도착한 상태
- LOADING(3): 요청했던 데이터가 처리중(processing)인 상태
- DONE(4): 데이터 처리가 완료(processed)된 상태
  
#### Status

요청이 완료된 후, Http 상태 코드를 반환합니다.

- 200: SUCCESS
- 201: CREATED
- 404: NOT FOUND

더 자세한 값에 대해 알고 싶다면 다음 링크를 통해서 확인하실 수 있습니다.

{% include base/components/link.html title='HTTP 상태 코드 - HTTP: MDN'  internal_link='https://developer.mozilla.org/ko/docs/Web/HTTP/Status' %}

## 맺음

XMLHttpRequest 사용법에 대해서 소개해드렸습니다. 궁금하신 점이나 이상한 점 있으면 댓글 부탁드리겠습니다.

감사합니다.
