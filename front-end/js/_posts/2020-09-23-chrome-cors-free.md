---
layout: post
published: false
title: Access to XMLHttpRequest at from origin has been blocked by CORS policy
icon: js
description: >
  브라우저에서 CORS 에러가 발생했을 때, 간단하게 해결하는 방법에 대해서 알아보겠습니다.
author: deeplify
toc: true
permalink: /front-end/js/chrome-cors-free
tags:
  - CORS
  - cross domain
  - 크롬
  - 브라우저
  - js
---

요즘에는 `Vue`나 `React`로 개발하는 사람들이 늘어나고 있는 것으로 알고 있습니다. FE와 BE로 분리되면서 얻은 장점도 있지만, 단점들도 분명히 존재합니다. 프론트 엔드와 백 엔드로 분리되면서 FE에서 외부로 Ajax 요청이 많아졌습니다. 외부로 xhr 요청을하면서 흔하게 발생하는 에러는 **CORS (Cross-Origin Resource Sharing)**일텐데요. 오늘 다룰 내용은 `CORS`입니다.

CORS는 해결 하고자하면 설정을 통해 간단하게 해결할 수 있는 것이지만, 브라우저 플러그인을 통해서 손쉽게 해결할 수 있는 방법이 있어 소개해드리려고 합니다.

<hr>

### CORS

cors 에러는 서로다른 도메인에서 리소스를 공유하려할 때, 발생하는 에러로 xhr 요청을 할 때, 흔히 발생합니다.
아래 링크에서 xhr 요청 예시를 확인하실 수 있습니다.

{% include base/components/link.html title='XMLHttpRequest 예제 (XMLHttpRequest example) | Navy Apple' internal_link='/dev/etc/xml-http-request' %}

> Example

```js
Request domain:  aaa.com
Response domain: bbb.com

aaa.com ---- xhr 요청  ----> bbb.com
aaa.com <---- CORS 에러 ---- bbb.com
```

보안상의 이유로 CORS 에러가 발생하게 됩니다. 어떠한 보안 문제가 발생하는지, 또 CORS 에러에 대해서 깊게 알고 싶다면 MDN 링크를 첨부해드릴테니 가시면 자세한 설명들이 나와 있습니다.

{% include base/components/link.html title='CORS errors - HTTP | MDN' internal_link='https://developer.mozilla.org/ko/docs/Web/HTTP/CORS/Errors' %}

### Solution

일반적으로 CORS 문제를 해결하기 위해서는 FE와 BE 모두 설정을 해주어야 합니다. 먼저 백엔드의 경우는 설정하는 방법 외에는 다른 방법이 없는 것 같으니 설정하는 방법에 대해서 알아보고, 프론트엔드의 설정방법도 알아보도록 하겠습니다.

#### Back End (서버 설정)

일반적으로 웹서버는 Apache 아니면 Nginx를 사용하기 때문에 각각 설정하는 방법을 알아보겠습니다.

- Apache

`httpd.conf` > `mod_headers.c`에서 아래와 같이 설정해주시면 됩니다.

```apache
<IfModule mod_headers.c>
  Header set Access-Control-Allow-Origin "*"
</IfModule>
```

- Nginx

nginx.conf 내용 중 다음과 같이 설정 해주시면 됩니다.

```nginx
http {
  # ...
  server {
    # ...
    location [path] {
      root [root directory path];
      index [index page];
      add_header 'Access-Control-Allow-Origin' '*';
    }
  }
}
```

#### Front End

프론트엔드의 경우도 다양하게 해결하는 방법이 있습니다.

- Jsonp (Json with padding)
- Jquery의 ajaxPrefilter
- 각 브라우저의 Extension (확장 프로그램)

일단 Jsonp의 경우, HTML 내의 `script` 요소로부터 호출될 경우, 보안에 위배되지 않는 것을 이용한 방법입니다. 그렇기 때문에 `GET` 요청만 할 수 있습니다.

Jquery의 ajaxPrefilter의 경우도 Jquery를 사용하지 않는 환경이라면 쓰기 애매한 부분이 있습니다.

그리고 가장 손쉽게 해결할 수 있는 방법이 바로 각 브라우저의 확장 프로그램을 이용하는 방법입니다. 점유율이 가장 높은 크롬을 예로 소개해드리겠습니다.


#### Allow CORS

![cors1](/assets/images/cors1.png)

chrome 웹 스토어에 방문 후, 확장 프로그램 검색창에 `cors`를 검색합니다.

![cors2](/assets/images/cors2.png)

검색 후, `Allow CORS`라는 확장 프로그램을 chrome에 추가합니다. 첫 번째 프로그램을 선택하지 않은 이유는 **Allow CORS**가 UI적으로 간단하게 키고 끌 수 있기 때문입니다.

![cors3](/assets/images/cors3.png)

오른쪽 상단의 `C:` 같이 생긴 아이콘을 클릭하여 왼쪽에 큰 붉은 박스를 클릭합니다.

![cors4](/assets/images/cors4.png)

색깔이 변하면서 활성화 되었습니다.

## 맺음

이렇게 간단하게 CORS 에러에 대해서 알아보았습니다. 이상한 점이나 궁금한 점은 댓글로 부탁드리겠습니다.

감사합니다.
