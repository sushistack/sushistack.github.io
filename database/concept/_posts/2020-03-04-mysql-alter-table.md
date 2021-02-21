---
layout: post
published: true
title: "[Mysql] 테이블 명, 테이블 컬럼 이름, 위치 수정"
icon: mysql
description: >
  mysql에서 테이블 명, 테이블 컬럼 이름, 위치 수정하는 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /database/concept/mysql-alter-table
tags:
  - mysql
  - alter table
  - column
  - column name
  - column location
---

DB에서 테이블을 생성하고 어떤 요구사항에 의해 테이블 명을 변경하거나 테이블 컬럼 이름을 수정하거나 하는 요구사항이 생길 때가 있습니다. 뿐만 아니라 미관상 테이블 내의 컬럼의 위치도 변경하고 싶을 때가 있습니다.

## 테이블, 컬럼 수정

테이블의 이름, 컬럼의 이름, 컬럼의 위치를 수정하는 방법을 예제를 통해서 알아보겠습니다.

### 사전 테이블 정의

```sql
CREATE TABLE test_table (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(16) NOT NULL DEFAULT '',
  `age` INT NOT NULL DEFAULT 0
);
```

### 테이블 명 변경

테이블 명을 변경하는 것은 `ALTER`, `RENAME` 키워드를 이용하면 됩니다. 다음 예시를 보면 쉽게 이해하실 수 있습니다.

```sql
ALTER TABLE test_table RENAME user;
```

위 쿼리는 `test_table`이라는 테이블 이름을 `user`로 변경하는 예제입니다.

### 테이블 컬럼명 변경

테이블 컬럼의 이름을 변경하고 싶은 경우 `ALTER`, `CHANGE` 키워드를 이용하면 됩니다.

```sql
ALTER TABLE user CHANGE name user_name VARCHAR(32) NOT NULL DEFAULT '';
```

위 예제는 `user.name` 테이블 컬럼을 `user.user_name`으로 변경하는 예제입니다. 한 가지 주의하실 점은 변경될 컬럼은 속성들까지 전부 넣어줘야 합니다. 즉, `user_name`만 쓰면 쿼리가 동작하지 않습니다.

### 테이블 컬럼 위치 변경

테이블 내에서 컬럼의 위치를 변경해야하는 경우가 있는데요, 다음과 같이 해주시면 됩니다.

```sql
ALTER TABLE user MODIFY age INT NOT NULL DEFAULT 0 AFTER `id`;
```

- AS-IS

| Number | Field | Type |
| :-: | :-: | :-: |
| 1 | id | INT |
| 2 | user_name | VARCHAR(16) |
| 3 | age | INT |

- TO-BE

| Number | Field | Type |
| :-: | :-: | :-: |
| 1 | id | INT |
| 2 | age | INT |
| 3 | user_name | VARCHAR(16) |

## 맺음

Mysql에서 테이블 명, 컬럼 명, 컬럼 위치 변경하는 방법에 대해서 알아보았습니다. 궁금하신 점이나 이상한 점은 댓글 부탁드리겠습니다.

감사합니다.
