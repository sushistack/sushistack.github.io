---
layout: post
published: false
title: "[Mysql] auto increment 초기화 하기"
icon: mysql
description: >
  Mysql에서 auto increment 초기화 하는 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /database/concept/mysql-reset-ai
tags:
  - mysql
  - auto increment
  - reset
---

간혹 개발을 하다보면 `auto_increment`로 된 컬럼의 값을 초기화 하고 싶은 경우가 있습니다.
하지만 레코드만 지운다고 increment 값이 1로 초기화 되지는 않는데요. 그런 경우에 사용할 수 있는 명령어가 있습니다.

예를 들어 다음과 같은 테이블이 있다고 가정하겠습니다.

```sql
CREATE TABLE test(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL DEFAULT '',
);
```

그리고 increment 초기화가 필요한 순간을 만들어 나가보겠습니다.

### 다음과 같이 레코드를 삽입

```sql
INSERT INTO test(name) 
VALUES ('test1'), ('test2'), ('test3'), ('test4');
```

레코드 삽입 이후에는 테이블에 들어 있는 값은 다음 표와 같겠죠?

| id |  name |
| -- | ----- |
|  1 | test1 |
|  2 | test2 |
|  3 | test3 |
|  4 | test4 |

### 테이블의 레코드를 모두 삭제

```sql
DELETE 
FROM test
WHERE 1 = 1;
```

레코드 삭제 이후에는 다음과 같이 테이블이 비어 있게 될 것입니다.

| id |  name |
| -- | ----- |

### 레코드를 다시 삽입

```sql
INSERT INTO test(name) 
VALUES ('test1');
```

당연하면 당연하다고 생각하겠지만, 아래와 같이 auto_increment로 설정된 id 값은 5로 들어가게 됩니다.

| id |  name |
| -- | ----- |
|  5 | test1 |

이런 경우 id를 1로 다시 세팅해서 넣고 싶은 경우가 있는데요, 다음과 같이 레코드를 전부 삭제한 후, reset 명령어를 입력해주시면 됩니다.

```sql
DELETE
FROM test
WHERE 1 = 1;

ALTER TABLE test auto_increment = 1;  -- 초기화
```

#### 이제 다시 레코드를 삽입합니다.

```sql
INSERT INTO test(name) 
VALUES ('test1');
```

| id |  name |
| -- | ----- |
|  1 | test1 |

이렇게 간단하게, Mysql에서 auto increment 초기화 하는 방법에 대해서 알아보았습니다.

감사합니다.
