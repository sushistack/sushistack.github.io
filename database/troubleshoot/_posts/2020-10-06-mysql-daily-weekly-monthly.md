---
layout: post
published: true
title: "[Mysql] 일간, 주간, 월간 그루핑하기"
icon: mysql
description: >
  Mysql 일간, 주간, 월간 그루핑하는 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /database/troubleshoot/mysql-daily-weekly-monthly
tags:
  - mysql
  - date
  - group by
  - daily
  - weekly
  - monthly
---

로그성 데이터를 일간, 주간, 월간별로 보여줘야하는 때가 있습니다. 예를들어 `google analytics`에서 일간, 주간, 월간으로 보여주는 기능이 있습니다.

## 일간, 주간, 월간 그루핑하기

이 번에는 `mysql`에서 `DATE` 타입의 데이터로 일간, 주간, 월간으로 그루핑 하는 방법에 대해서 알아보도록 하겠습니다.

### 사전 테이블 정의

리포트 테이블이 있고, 이 테이블은 `노출수`와 `클릭수`를 저장한다고 하겠습니다

```sql
CREATE TABLE report(
  record_date DATE NULL SYS_DATE PRIMARY KEY,
  impression INT NOT NULL DEFAULT 0,
  click INT NOT NULL DEFAULT 0
);
```

<hr>

### 일간 리포트 (Daily report)

일간 리포트의 경우, 아주 간단하게 표현할 수 있습니다.

```sql
SELECT
  rerport.record_date,
  impression,
  click
FROM report
```

### 주간 리포트 (Weekly report)

주간 리포트의 경우가 가장 까다로운 조건입니다. 코드로 먼저 확인하시고 아래 설명을 하도록 하겠습니다.

```sql
SELECT
  CONCAT(
    DATE_FORMAT(
      DATE_ADD(report.record_date, INTERVAL (WEEKDAY(report.record_date)) * -1 DAY),
      '%Y-%m-%d'
    ),
    ' ~ ',
    DATE_FORMAT(
      DATE_ADD(report.record_date, INTERVAL (6 - WEEKDAY(report.record_date)) * +1 DAY),
      '%Y-%m-%d'
    )
  ) AS `record_date`,
  SUM(impression) AS impression,
  SUM(click) AS click
FROM report
GROUP BY record_date
```

#### DATE_ADD

날짜를 더하는 mysql 함수입니다.

```sql
DATE_ADD(NOW(), INTERVAL 1 DAY)
```

이런식으로 할 경우, `현재날짜 + 시간 + 하루`를 리턴하게 됩니다.
이제 아래코드를 해석해보겠습니다.

```sql
DATE_ADD(report.record_date, INTERVAL (WEEKDAY(report.record_date)) * -1 DAY)
```

`record_date = '2020-03-06'`이라고 가정한다면, 다음과 같이 변경이 되는데요.

```sql
DATE_ADD('2020-03-06', INTERVAL (WEEKDAY('2020-03-06')) * -1 DAY)

-- WEEKDAY(날짜)는 한 주의 몇 번째 요일인지를 나타내는 숫자입니다.
-- 월 = 0, 화 = 1, 수 = 2, 목 = 3, 금 = 4, 토 = 5, 일 = 6
```

`2020-03-06`은 월요일이기 때문에 `2020-03-06`을 리턴할 것이고,
확장해서 생각해보면 `2020-03-06 ~ 2020-03-12`의 날짜들은 전부 `2020-03-06`을 리턴할 것입니다.

```sql
DATE_ADD('2020-03-06', INTERVAL (6 - WEEKDAY('2020-03-06')) * +1 DAY)
```

위의 경우는 어떨까요?

`2020-03-06 ~ 2020-03-12`의 날짜들은 전부 `2020-03-12`를 리턴할 것입니다.

| record_date | impression | click |
|:-:|-:|-:|
| 2020-03-06 ~ 2020-03-12 | 1,500 | 1,000 |

따라서, `DATE_FORMAT`함수와 `CONCAT`함수를 통해서 위와 같은 문자열이 만들어지고, 이 문자열로 그룹핑을 하면
주간 리포트를 얻을 수 있습니다.

### 월간 리포트 (Monthly report)

월간의 경우도 간단하게 표현할 수 있습니다.

```sql
SELECT
  DATE_FORMAT(report.record_date, '%Y-%m') AS record_date,
  SUM(impression) AS impression,
  SUM(click) AS click,
FROM report
GROUP BY record_date
```

## 맺음

이렇게 **Mysql에서 일간, 주간, 월간 그루핑하기**에 대해서 알아보았습니다. 혹시 궁금하신 점이나 이상한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
