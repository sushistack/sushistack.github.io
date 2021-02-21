---
layout: post
published: false
title: "[Mysql] index 확인, 추가, 삭제"
icon: mysql
description: >
  Mysql index 확인, 추가, 삭제하는 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /database/concept/index-in-mysql
tags:
  - mysql
  - index
  - create index
  - drop index
  - check index
---

Database의 검색 성능을 높여주는 요소 중 하나가 `Index`입니다. 테이블에 적절하게 `Index`를 추가해준다면, Database에서 검색 효율을 높여줍니다.

하지만 인덱스를 추가해 놓고, 잘 추가가 됐는지 확인을 해야할 필요가 있습니다. 생성은 되었는지?, 내가 의도한대로 잘 만들어 졌는지? 삭제해야하는 인덱스가 있는지? 알지 못한다면 답답할 것입니다.

그래서 오늘은 mysql에서 index 확인, 추가, 삭제하는 방법에 대해서 알아보도록 하겠습니다.

### 생성

```sql
ALTER TABLE <table_name> ADD INDEX <index_name> (<index_column1>, <index_column2>, ...);
```

생성의 경우 테이블에 `INDEX`를 추가할 수 있습니다. 여러 개의 컬럼을 한 `Index`에 순서를 주면서 생성할 수도 있습니다.

### 확인

```sql
SHOW INDEXES FROM <table_name>;
```

확인의 경우는 간단합니다. 예를 들면 속성을 몇 개 생략했지만 다음과 같은 결과를 얻을 수 있습니다.

| Non_unique  | Key_name  | Seq_in_index  | Column_name  |
| - | - | - | - |
| 1  | idx1  |  1 | column1  |
| 1  | idx2  |  1 | column2  |
| 1  | idx2  |  2 | column3  |
| 1  | idx2  |  3 | column4  |
| 0  | idx3  |  1 | column5  |

### 삭제

```sql
ALTER TABLE <table_name> DROP INDEX <index_name>;
```

삭제는 간단하게 위 명령만으로 수행이 가능합니다. 삭제 후, 잘 삭제 되었는지 `SHOW INDEXES <table_name>`으로 확인할 수 있습니다.

간단하게 테이블에 `Index` 확인, 생성, 삭제하는 방법에 대해서 알아보았습니다.

감사합니다.
