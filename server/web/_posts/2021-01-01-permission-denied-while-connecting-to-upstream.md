---
layout: post
published: true
title: "[Nginx] Permission denied while connecting to upstream 에러 해결" 
icon: nginx
description: >
  nginx 웹서버에서 Permission denied while connecting to upstream 에러 해결 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /server/web/permission-denied-while-connecting-to-upstream
tags:
  - nginx
  - permission denied
  - upstream
  - web server
---

웹사이트를 만들면서 Nginx 웹서버를 이용하게 되었습니다. 웹서버 설정을 하면서 발생했던 에러를 정리해보는 시간을 가져보도록하겠습니다.

## Permission denied while connecting to upstream

우선 에러가 발생한다는 것은 Nginx를 구동한 후에 실제로 요청을 날려보면서 확인하게 되었습니다.

Nginx에서 보내주는 응답 코드는 `502 Bad Gateway` 였고, 원인을 파악하기 위해 로그를 확인해보았습니다.

### 에러 로그 위치

```text
/var/log/nginx/error.log
```

Nginx의 에러 로그는 기본적으로 위 위치에 남겨지게됩니다. 에러가 발생한다면 위 로그를 확인해서 어떤 에러인지 확인하실 수 있습니다.

### 에러 원인

에러로그 메시지에서 권한이 없다는 것을 보여주고 있습니다.


### 에러 해결 방법

에러를 해결하는 방법은 굉장히 간단합니다. 보통 이런 에러가 발생했다면 서버 OS 자체의 보안을 의심해봐야합니다. 

저같은 경우에는 `RedHat 8`을 이용하고 있었는데, **SELinux**라고 하는 OS 기본 보안프로세스 때문에 작동하지 않는 것을 확인했습니다.

다음과 같이 해결하실 수 있습니다.

- httpd 네트워크 연결

```bash
sudo setsebool httpd_can_network_connect on -P
# -P: 영구적으로 변경
```

- httpd 관련 설정 확인

```bash
getsebool -a | grep httpd
```

## 맺음

간단하게 `Permission denied while connecting to upstream` 에러가 발생하는 원인과 해결방법까지 소개해드렸습니다. 혹시 이상한 점이나 궁금하신 점이 있으면 댓글 부탁드리겠습니다.

감사합니다.
