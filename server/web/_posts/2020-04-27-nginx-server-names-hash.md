---
layout: post
published: false
title: Nginx server_names_hash 설정
icon: server
description: >
  could not build the server_names_hash, you should increase server_names_hash_bucket_size 32 에러가 발생했을 때 해결하는 방법에 대해서 알아봅니다.
author: deeplify
toc: true
permalink: /server/web/nginx-server-names-hash
tags:
  - nginx
  - mac
  - ubuntu
  - centos
  - 맥
  - 우분투
  - 센토스
---

웹 서버 설정 중 도메인을 구매하여 도메인을 설정하거나 추가적인 도메인을 설정하려고할 때, 아래와 같은 에러가 발생할 수 있습니다. 아래 에러의 원인에 대해서 알아보고, 해결하는 방법 또한 소개해 드리도록하겠습니다.

```text
could not build the server_names_hash,
you should increase server_names_hash_bucket_size: 32
```

### nginx.conf 설정으로 에러 해결하기

이 에러는 여러 개의 호스트 명을 사용하거나 긴 호스트 명을 사용해서 서버네임 해시 버킷 사이즈를 넘은 경우 발생하게 됩니다.

이 에러는 설정을 통해 사이즈를 변경하여 간단하게 해결할 수 있습니다.

```nginx
http {
  server_names_hash_bucket_size 512;
}
```

이렇게 해시 버킷의 사이즈를 512 정도로 넉넉하게 설정해주시면 됩니다.

## 맺음

이렇게 nginx server_names_hash 설정에 대해서 정리해 보았습니다.
잘 못된 점이나 궁금한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.

#### Related

{% include base/components/link.html title='Nginx 설정' internal_link='/server/web/nginx-configuration' %}
