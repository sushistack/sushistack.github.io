---
layout: post
published: false
title: Nginx 로드밸런싱 설정
icon: server
description: >
  nginx에서 간단하게 로드밸런싱을 설정하는 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /server/web/nginx-load-banlancing
tags:
  - nginx
  - configuration
  - load balance
  - balancing
---

Load banlancer에는 Layer이름을 붙여서 명명하는 경우가 많습니다. 예를 들어 4 Layer에 있는 Load banlancer는 `L4 Load banlancer`, 7 Layer에 있는 로드 밸런서는 `L7 Load Banlacer`라고 부릅니다.

이 글에서는 nginx에서 로드 밸런싱을 설정하는 방법에 대해서 소개해드리겠습니다.

### nginx.conf 로드밸런싱 설정하기

{% include base/components/link.html title='Full Example Configuration | NGINX' internal_link='https://www.nginx.com/resources/wiki/start/topics/examples/full/#nginx-conf' %}

위 링크를 통해서 가져온 예제입니다.

```nginx
http {
  upstream big_server_com {
    server 127.0.0.3:8000 weight=5;
    server 127.0.0.3:8001 weight=5;
    server 192.168.0.1:8000;
    server 192.168.0.1:8001;
  }

  server { # simple load balancing
    listen          80;
    server_name     big.server.com;
    access_log      logs/big.server.access.log main;

    location / {
      proxy_pass      http://big_server_com;
    }
  }
}
```

#### upstream 설정

서버 그룹을 정의합니다.

서버는 다른 포트에서 요청을 대기 할 수 있습니다. 또한 TCP 및 UNIX 도메인 소켓에서 수신 대기하는 서버를 혼합 할 수 있습니다. 또한 weight를 설정하여 computing power가 높은 서버에 더 많이 요청하도록 할 수 있습니다.

#### server location 설정

server location 설정은 `proxy_pass`이용하여 타겟 서버그룹에 요청합니다.

## 맺음

간단하게 nginx 로드밸런싱 설정하는 방법에 대해서 알아보았습니다.
궁금한점이나 글에 이상한 점이 있으면 댓글 부탁드리겠습니다.

감사합니다.

#### Related

proxy_pass 관련한 설정은 아래 링크에서 자세하게 확인하실 수 있습니다.

{% include base/components/link.html title='Nginx proxy pass 설정' internal_link='/server/web/nginx-proxy-pass' %}
