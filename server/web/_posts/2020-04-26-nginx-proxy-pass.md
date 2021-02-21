---
layout: post
published: false
title: Nginx proxy pass 설정
icon: server
description: >
  nginx에 proxy pass 설정을 하여 요청을 전달하는 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /server/web/nginx-proxy-pass
tags:
  - nginx
  - configuration
  - proxy pass
  - proxy
---

요즘에는 react, angular, Vue 등의 SPA로 웹사이트를 구현하는 경우가 많은데요. SPA로 구현된 사이트의 경우 어떤 요청은 `front end`에 어떤 요청은 `back end`로 요청이 전달되어야 합니다.

이렇게 요청 형태에 따라 `front end`로 갈지 `back end`갈지에 대한 결정을 해주는 설정을 nginx에서 설정해줄 수 있는데요. 설정하는 방법에 대해서 소개해드리겠습니다.

### proxy pass 설정하기

```nginx
http {
  server {
    location /backend {
      proxy_pass http://localhost:8080/backend;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
      proxy_set_header X-Forwarded-Port $server_port;
    }
  }
}
```

이런식으로 설정하면 요청중 `/backend/~~` 시작하는 모든 요청은 `back end`로 전달됩니다.

위 설정코드에서 변수에 대한 자세한 설명은 아래 링크에서 확인하실 수 있습니다.

{% include base/components/link.html title='Alphabetical index of variables' domain ='nginx.org' internal_link='http://nginx.org/en/docs/varindex.html' %}

## 맺음

간단하게 nginx에서 `proxy pass` 설정하는 방법에 대해서 알아보았습니다.
궁금하신 점이나 글에서 잘못된 점이 있다면 댓글 부탁드리겠습니다.

감사합니다.

#### Related

{% include base/components/link.html title='Nginx 설정' internal_link='/server/web/nginx-configuration' %}
