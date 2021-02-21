---
layout: post
published: false
title: h2 database mode mysql (h2 mysql 모드)
icon: spring
description: >
  h2 database mode mysql (h2 mysql 모드)
author: deeplify
toc: true
permalink: /back-end/spring/h2-mysql-mode
tags:
  - h2
  - database
  - mysql mode
---

h2 database Mysql 모드임에도 에러가 발생하는 경우에 대해서 알아보겠습니다.

### Error

```sql
INSERT INTO test_table(
      column1,
      column2,
      column3,
      column4,
      column5,
      column6
  ) VALUES (
      #{column1},
      #{column2},
      #{column3},
      #{column4},
      #{column5},
      #{column6}
  )
  ON DUPLICATE KEY UPDATE
      column1 = #{column1},
      column2 = #{column2};
```

```
Cause: org.h2.jdbc.JdbcSQLSyntaxErrorException: Syntax error in SQL statement
...
ON[*] DUPLICATE KEY UPDATE
```

### Reason
h2 databse의 경우, INSERT ... DUPLICATE KEY UPDATE를 지원하지 않는다고 합니다.
하지만 방법은 있습니다. h2 의 Compatibility mode를 설정할 수 있습니다.

### Solution

1. configuration application.yml

```yml
datasource:
  driver-class-name: org.h2.Driver
  url: jdbc:h2:mem:test;DB_CLOSE_DELAY=-1;MODE=MYSQL;
  username:
  password:
  schema: classpath:import.sql
```

위 방법이 안된다면... 

2. import.sql 커맨드 추가

```sql
SET MODE MYSQL;
```

