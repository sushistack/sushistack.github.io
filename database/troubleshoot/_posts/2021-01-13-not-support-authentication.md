---
layout: post
published: true
title: "[Mysql] Client does not support authentication protocol requested by server 에러"
icon: mysql
description: >
  "Client does not support authentication protocol requested by server 에러가 발생하는 이유와 해결하는 방법에 대해서 소개합니다."
author: deeplify
toc: true
permalink: /database/troubleshoot/not-support-authentication
tags:
  - mysql
  - mysql 8
  - authentication
  - mysql 인증
---

Jpa와 Mysql을 이용하여 공부를 진행하던 중 만난 `authentication`관련 에러에 대해서 소개해드리도록 하겠습니다.

## Client does not support authentication

이 이유가 발생하게 된 이유는 Mysql 8.0에서는 다양한 플러그 형태의 인증 방법을 제공합니다. 기본적으로 제공하는 인증 방법은 `caching_sha2_password`입니다.

### 에러 발생 원인은?

제가 설치한 Mysql Connector의 버전은 `caching_sha2_password` 인증 방법은 지원하지 않는 버전이었기 때문에 인증 에러가 발생했습니다.

### 에러 해결 방법

```sql
-- mysql_native_password 사용하도록 변경
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'YourRootPassword';
```

또는

```sql
-- mysql_native_password를 사용한 계정을 새로 생성
CREATE USER 'foo'@'%' IDENTIFIED WITH mysql_native_password BY 'bar';
```

```sql
FLUSH PRIVILEGES;
```

위와 같이 Mysql 서버에서 쿼리를 실행하여 Mysql 8.0 이전의 인증 방법으로 사용할 수 있도록 변경해주면 됩니다.

또 다른 방법으로는 caching_sha2_password 인증 방법을 지원하는 버전으로 Mysql Connector의 버전을 변경해주시면 됩니다.

{% include base/components/link.html title='MySQL 8.0 - Client does not support authentication protocol requested by server; consider upgrading MySQL client - Stack Overflow' internal_link='https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server' %}

## 맺음

간단하게 `Client does not support authentication protocol requested by server`에러가 발생하는 원인과 해결 방법에 대해서 알아보았습니다.

혹시 궁금한 점이나 이상한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
