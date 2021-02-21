---
layout: post
published: true
title: "[Mysql] 버전 확인하는 방법"
icon: mysql
description: >
  "Mysql에서 버전 확인하는 방법에 대해서 소개합니다."
author: deeplify
toc: true
permalink: /database/troubleshoot/how-to-check-mysql-version
tags:
  - mysql
  - check version
  - mysql version
  - mysql 버전
  - 버전 확인
---

mysql은 전 세계적으로 가장 유명한 무료로 이용할 수 있는 RDMS 데이터베이스입니다.

하지만 계속해서 버전이 올라가면서 다양한 기능 및 문법이 추가되거나 제거되는 등의 변화가 생기게 되었습니다.

다양한 버전이 나오게 되면서 버전을 확인하게 되는 일이 점차 많아지게 되었습니다.

이번 글에서 소개해드릴 내용은 Mysql의 버전을 확인하는 방법입니다.

## Mysql 버전 확인하는 방법

먼저 Mysql은 클라이언트와 서버 두 가지로 나뉘게 됩니다.

보통 Mysql 버전을 확인이 필요한 곳은 서버이기 때문에 Mysql 서버 내부에서 버전을 확인하는 방법과 Mysql 클라이언트에서 확인하는 방법도 함께 알아보겠습니다.

### Mysql 서버 버전 확인

```sql
SELECT VERSION();
```

| VERSION() |
|:-:|
|8.0.21|

Mysql 서버에 접속 후, 위와 같은 쿼리를 실행해주시면, 위와 같은 결과를 얻을 수 있습니다.

```sql
SHOW VARIABLES LIKE '%VERSION%'
```

| Variable_name | Value |
|:-:|:-:|
| admin_tls_version | "TLSv1,TLSv1.1,TLSv1.2,TLSv1.3" |
| immediate_server_version | 999999 |
| innodb_version | 8.0.21 |
| original_server_version | 999999 |
| protocol_version | 10 |
| slave_type_conversions |  |
| tls_version | "TLSv1,TLSv1.1,TLSv1.2,TLSv1.3" |
| version | 8.0.21 |
| version_comment | Homebrew |
| version_compile_machine | x86_64 |
| version_compile_os | osx10.15 |
| version_compile_zlib | 1.2.11 |

버전에 대한 정보를 조금 더 자세하게 알고 싶은 경우 위와 같은 쿼리문을 실행시켜주시면 상세한 버전 정보를 얻을 수 있습니다.

### Mysql 클라이언트 버전 확인

```bash
mysql --version
```

또는

```bash
mysql -V
```

```text
mysql  Ver 8.0.21 for osx10.15 on x86_64 (Homebrew)
```

클라이언트 버전을 확인하고 싶으신 경우 위와 같은 명령어를 실행해주시면 됩니다.

## 맺음

간단하게 Mysql의 서버와 클라이언트의 버전 확인하는 방법에 대해서 알아보았습니다. 혹시 궁금하신 점이나 이상한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
