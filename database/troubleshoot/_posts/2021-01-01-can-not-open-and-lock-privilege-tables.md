---
layout: post
published: true
title: "[Mysql] Can't open and lock privilege tables 에러 해결"
icon: mysql
description: >
  "Can't open and lock privilege tables 에러 해결 하는 방법을 소개해드립니다."
author: deeplify
toc: true
permalink: /database/troubleshoot/can-not-open-and-lock-privilege-tables
tags:
  - mysql
  - privilege tables
  - mysql.host
  - mysql.user
  - exist
---

이번 글에서는 Mysql을 설치 에러 중 하나인 **Can't open and lock privilege tables** 에러가 발생하는 원인에 대해서 알아보고 해결 방법까지 소개해드리는 시간을 가져보겠습니다.

## Can't open and lock privilege tables

버전 별로 에러 메시지가 다를 수 있습니다. Mysql 5.x 기준으로 설명드리도록 하겠습니다.

### 에러 내용

#### Mysql 5.7 이하

```text
[ERROR] Fatal error: Can't open and lock privilege tables: Table 'mysql.host' doesn't exist
```

#### Mysql 5.7 이상

```text
[ERROR] Fatal error: Can't open and lock privilege tables: Table 'mysql.user' doesn't exist
```

위 에러 메시지는 Mysql을 설치할 때 주로 발생합니다. 대부분의 이유는 예전에 설치 했었던게 남아 있던가 아니면 최초 설치시에 취소를 한 경우 일 것입니다.

### 에러 발생 원인

이 에러의 발생원인은 `datadir`로 설정된 디렉토리 안에 비어 있지 않기 때문입니다. datadir은 Mysql initailize 하는 과정에서 필요한 데이터들이 저장되는 공간입니다.

#### datadir 확인하는 방법

- Linux

```text
/etc/my.conf
```

- Windows

```text
> C:\ProgramData\MySQL\MySQL Server {version}\my.ini
```
datadir은 Mysql 설정파일을 통해 확인을 하실 수 있습니다. 설정파일의 위치는 OS 별로 다르기 때문에 다음에서 해당하는 OS에 따라 설정파일을 확인해주시면 됩니다.

### 에러 해결 방법

- 설정 파일 확인

```bash
vi {path}/{to}/my.conf
```

- datadir 디렉토리 삭제

```bash
rm -rf {datadir}
```

MySQL 설정 파일에 있는 `datadir`을 확인하시고, 해당 디렉토리를 삭제해주시면 됩니다.

## 맺음

간단하게 `Can't open and lock privilege tables` 에러에 대해서 알아보고 해결하는 방법에 대해서도 소개해 드렸습니다. 혹시 궁금하신 점이나 이상한 점이 있으면 댓글 부탁드리겠습니다.

감사합니다.
