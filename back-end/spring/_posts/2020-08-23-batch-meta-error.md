---
layout: post
published: false
title: Table BATCH_JOB_INSTANCE not found
icon: spring
description: >
  Table BATCH_JOB_INSTANCE not found 에러가 발생하는 원인을 알아보고, 해결하는 방법도 소개해드립니다.
author: deeplify
toc: true
permalink: /back-end/spring/batch-meta-error
tags:
  - spring batch
  - meta table
  - batch job instance
---

Table BATCH_JOB_INSTANCE not found 에러는 언제 발생하는가?

### error

`bad SQL grammar [SELECT JOB_INSTANCE_ID, JOB_NAME from BATCH_JOB_INSTANCE where JOB_NAME = ? and JOB_KEY = ?]`
`nested exception is org.h2.jdbc.JdbcSQLSyntaxErrorException: Table "BATCH_JOB_INSTANCE" not found;`

### Reason

1. Spring Batch 메타 테이블들이 존재하지 않아서 발생하는 것입니다.

### Solution

1. h2 database

```yml
datasource:
  driver-class-name: org.h2.Driver
  url: jdbc:h2:mem:test;DB_CLOSE_DELAY=-1;MODE=MYSQL;
  username: 
  password: 
  schema: classpath:/org/springframework/batch/core/schema-h2.sql
```

2. Mysql

mysql 같은 외부 DB를 사용하게 된다면, spring-batch-core에 있는 meta schema에 테이블 생성관련 명령어들이 있습니다. 이 것을 활용하여 DB에 Table들을 생성합니다.

`classpath:/org/springframework/batch/core/schema-mysql.sql`

또는 다음 링크를 통해서 확인하실 수 있습니다.

{% include base/components/link.html title='git-spring-batch' internal_link='https://github.com/spring-projects/spring-batch/blob/master/spring-batch-core/src/main/resources/org/springframework/batch/core/schema-mysql.sql' %}
