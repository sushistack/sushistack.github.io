---
layout: post
published: false
title: Duplicate entry '0' for key 'PRIMARY' Spring Batch
icon: spring
description: >
  Duplicate entry '0' for key 'PRIMARY' Spring Batch
author: deeplify
toc: true
permalink: /back-end/spring/batch-duplicate-entry
tags:
  - batch
  - spring batch
  - batch meta
  - meta table
---

Spring Batch에서 Duplicate entry '0' for key 'PRIMARY' 에러가 발생하는 경우에 대해서 정리해보겠습니다.

### Error 

`Duplicate entry '0' for key 'PRIMARY'`

### Reason

1. Spring batch 메타 테이블만 존재하고, 기본적으로 들어가야하는 데이터가 들어가 있지 않다.

### Solution

```sql
INSERT INTO BATCH_STEP_EXECUTION_SEQ values(0, '0');
INSERT INTO BATCH_JOB_EXECUTION_SEQ values(0, '0');
INSERT INTO BATCH_JOB_SEQ values(0, '0');
```
