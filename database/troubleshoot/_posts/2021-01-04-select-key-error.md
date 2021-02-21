---
layout: post
published: true
title: Error selecting key or setting result to parameter object 에러
icon: database
description: >
  Error selecting key or setting result to parameter object 에러가 발생하는 경우에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /database/troubleshoot/select-key-error
tags:
  - mybatis
  - select key error
  - select key
  - generated key
---

스프링과 마이바티스를 사용하는 개발 환경에서 **select key**는 아주 유용하면서 중요한 개념입니다. 중요한 만큼 관련된 에러를 자주 만나는 분들이 계실거라고 생각합니다.

저 또한 select key와 관련된 에러를 만나본 경험이 있습니다, 그 중에서도 가장 많이 발생했었고 기본적인 에러인 `Error selecting key or setting result to parameter object`에 대해서 소개하도록 하겠습니다.

## 에러 발생 원인은?

이 에러가 발생하는 이유에는 여러가지가 있습니다. 이 글에서는 에러 발생 원인 총 3가지를 소개하겠습니다.

> 대표적인 Select key error 종류
> 1. selectKey의 resultType이 일치하지 않는 경우
> 2. selectKey의 return 값이 빈 경우
> 3. table에 자동으로 생성되는 Key property가 없는 경우

### selectKey의 resultType이 일치하지 않는 경우

```sql
<insert id="insertTest">
        INSERT INTO test_table(
            column1,
            column2,
            column3,
            column4
        )
        VALUES (
            #{column1},
            #{column2},
            #{column3},
            #{column4}
        )
        /*  check result type !! */
        <selectKey keyColumn="id" keyProperty="id" resultType="int" order="AFTER">
            SELECT LAST_INSERT_ID() AS id
            FROM test_table
        </selectKey>
</insert>
```

위 코드의 하단의 selectKey 구문을 보면, **resultType** 값이 `int`로 설정되어 있는 것을 보실 수 있습니다. 만약 조회하려는 id 값의 타입이 `int`가 아니면 에러가 발생할 수 있습니다.

### selectKey의 return 값이 빈 경우

```sql
<insert id="insertTest">
        INSERT INTO test_table(
            column1,
            column2,
            column3,
            column4
        )
        VALUES (
            #{column1},
            #{column2},
            #{column3},
            #{column4}
        )
        /* check return value is not empty ! */
        <selectKey keyColumn="id" keyProperty="id" resultType="int" order="AFTER">
            SELECT LAST_INSERT_ID() AS id
            FROM test_table
        </selectKey>
</insert>
```

select key 구문을 통해 조회하는 id 값이 없을 경우, 에러가 발생합니다. 이 경우는 테이블에 데이터 값이 있는지 없는지 확인해야합니다.

#### table에 자동으로 생성되는 Key property가 없는 경우

select key를 사용하는 경우는 보통 마지막에 삽입된 데이터의 id값을 조회하고 싶을 때, 사용하게 됩니다. 대부분은 auto increment로 설정된 값을 받아오는 경우가 많고, 직접 설정해주는 경우도 있습니다.

하지만 자동으로 넣어주는 값이 없는 경우, 에러가 발생하게됩니다.

만약 자동 생성 키 없이 사용하고 싶다면, 아래와 같이 사용하는 방법도 있습니다.

```sql
<insert id="insertSomething" useGeneratedKeys="false" parameterType="something">
/* ... */
</insert>
```

### 해결 방법

위에서 문제의 원인을 파악했기 때문에 해결하는 방법은 간단합니다.

1. resultType의 타입을 실제로 반환되는 값의 타입과 일치시킵니다.
2. selectKey를 통해서 리턴될 데이터가 있는 확인합니다.
3. 테이블에 자동으로 생성되는 키가 제대로 설정이 되어있는지 확인 또는 `useGeneratedKeys="false"`를 사용합니다.

## 맺음

간단하게 `Error selecting key or setting result to parameter object` 에러가 발생한 원인들과 각 원인들에 대한 해결 방법을 소개해드렸습니다. 혹시 궁금하신 점이나 이상한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
