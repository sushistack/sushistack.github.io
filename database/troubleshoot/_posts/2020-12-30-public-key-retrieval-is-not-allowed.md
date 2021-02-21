---
layout: post
published: true
title: "[Mysql] Public key retrieval is not allowed 에러 해결"
icon: mysql
description: >
  Public key retrieval is not allowed 에러가 발생하는 이유와 해결하는 방법에 대해서 소개해드립니다.
author: deeplify
toc: true
permalink: /database/troubleshoot/public-key-retrieval-is-not-allowed
tags:
  - mysql
  - public key retrieval
  - mysql versions
  - mysql 8
---

Mysql DB에 접속하려면 기본적으로 url, username, password 이 세 가지가 필요합니다. 하지만 `Mysql 8.0` 버전부터는 보안적인 이슈로 **useSSL** 옵션에 대한 추가적인 설정이 필요해졌습니다.

## Public key retrieval is not allowed

만약 사용하시는 DB가 Mysql 8.0 버전이고 `public key retrieval is not allowed`에러가 발생한다면 다음과 같은 옵션을 확인해보셔야합니다.

> 속성
> - useSSL: DB에 SSL로 연결
> - allowPublicKeyRetrieval: 서버에서 RSA 공개키를 검색하거나 가져와야하는지

### 에러 발생 원인

에러가 발생하는 원인은 `useSSL=false`로 설정하고 `allowPublicKeyRetrieval` 설정을 하지 않은 경우입니다.

따라서 다음과 같이 설정해주시면 해결하실 수 있습니다.

### 접속 URL 설정

```text
jdbc:mysql://localhost:3306/test_db?useSSL=false&allowPublicKeyRetrieval=true
```

접속하는 datasource URL에 쿼리 파라미터로 위와 같이 설정해주시면 됩니다.

### 드라이버에서 설정

![access database in Intellij](/assets/images/access-db-intellij.jpg)

저는 보통 DB에 접속할 때, Intellij를 활용하여 접속합니다.

1. database 속성에서 advanced 탭에 들어갑니다.
2. allowPublicKeyRetrieval가 true로 설정되어 있는지 확인합니다.

## 맺음

간단하게 Public key retrieval is not allowed 에러의 원인과 어떻게 해결해야하는지 알아보았습니다. 혹시 궁금하신 점이나 이상한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
