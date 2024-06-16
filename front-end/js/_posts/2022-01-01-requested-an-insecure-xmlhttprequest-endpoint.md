---
layout: post
published: true
title: "[Js/자바스크립트] Mixed content: Requested an insecure XMLHttpRequest endpoint 에러 해결"
icon: js
description: >
  Requested an insecure XMLHttpRequest endpoint에러가 발생하는 이유와 해결 방법을 소개합니다.
author: deeplify
toc: true
permalink: /front-end/js/requested-an-insecure-xmlhttprequest-endpoint
tags:
  - js
  - xmlhttprequest
  - http
  - https
---

요즘은 개발 환경이 변화하면서 Front-End와 Back-End 개발이 명확하게 나눠지게 되어버린 것 같습니다.

이렇게 영역이 나뉘는 것은 좋은 현상이라고 생각합니다. 영역이 나뉘면서 한 영역에서 조금 더 집중적으로 개발 공부를 할 수 있고, 자신이 관심 있는 것 외에는 신경을 덜 쓰게되기 떄문입니다.

하지만 이렇게 영역이 나뉘다보니 없었던 문제들이 이슈들이 발생하게 됩니다. 이번 글에서는 Front-End와 Back-End에서 종종 발생하는 에러를 소개해보고 해결 방법까지 알아보도록 하겠습니다.  

## Requested an insecure XMLHttpRequest endpoint

{% include base/components/link.html title='[Js/자바스크립트] XMLHttpRequest 사용법' internal_link='/front-end/js/xml-http-request' %}

Front-End에서 Back-End로 요청을 할 때 사용하는 가장 유용한 도구는 Js의 XMLHttpRequest 객체입니다.

이 객체를 이용하여 요청을 할 때, `Requested an insecure XMLHttpRequest endpoint`이런 메시지와 함께 에러가 발생하는 경우가 있습니다.

### 에러 발생 원인

```text
https://example.com --- XMLHttpRequest ---> http://api.exmaple.com
```

이 에러는 보통 위와 같은 경우에 발생하고, 원인은 보안 프로토콜인 **https**에서 **http**로 요청을 보냈기 때문입니다.

또한 이 에러는 IE, 크롬 등과 같은 브라우저에서 프로토콜을 확인하고, 보안에 위배되는 요청인 경우 예외를 발생시킵니다.

### 에러 해결 방법

에러를 해결하는 방법은 다음과 같이 여러 가지가 있습니다.

> Insecure XMLHttpRequest endpoint 에러 해결 방법
> 1. 타겟 API 서버에 SSL 적용
> 2. JSONP 사용
> 3. 브라우저 Extension 사용

가장 깔끔하게 에러를 처리리하는 방법은 첫 번째 방법인 타겟 API 서버에 SSL을 적용하여 https로 적용해주는 것이 입니다.

이 이외에 개발 환경이나 SSL을 적용하기가 어려운 경우에는 JSONP나 브라우저의 Extension을 이용하는 것이 있습니다.

#### 해결 방법별 관련 링크

위에서 설명한 해결 방법에 대한 링크를 공유해드리겠습니다.

##### nginx SSL 설정

{% include base/components/link.html title='Nginx SSL 설정' internal_link='/server/web/nginx-ssl' %}

##### JSONP

{% include base/components/link.html title='jsonp | Search Results  | jQuery API Documentation' internal_link='https://api.jquery.com/?s=jsonp' %}

##### 브라우저 Extension

{% include base/components/link.html title='HTTPS Mixed Content Locator - Chrome 웹 스토어' internal_link='https://chrome.google.com/webstore/detail/https-mixed-content-locat/pbljfomgollbampmcmalflifheichabj' %}

## 맺음

간단하게 Mixed content: Requested an insecure XMLHttpRequest endpoint 에러 해결하는 방법에 대해서 소개해드렸습니다. 혹시 궁금하신 점이나 이상한 점이 있으면 댓글 부탁드리겠습니다.

감사합니다.
