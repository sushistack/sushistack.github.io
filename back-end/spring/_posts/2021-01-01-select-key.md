---
layout: post
published: true
title: "[Spring/스프링] Mybatis selectKey 사용 방법"
icon: spring
description: >
  스프링 Mybatis에서 selectKey 사용하는 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /back-end/spring/select-key
tags: 
  - spring
  - mybatis
  - spring boot
  - select key
  - multiple column
---

Spring과 Mybatis를 이용하여 개발할 때는 쿼리를 직접 작성하기 때문에 장단점이 있습니다. 쿼리를 직접 작성하면 쿼리를 튜닝하기도 좋고, 데이터를 원하는 형태로 조회하기가 쉬워집니다.

이 번 글에서는 **selectKey**로 데이터를 가져오는 방법에 대해서 소개하도록 하겠습니다.

## SelectKey 사용하는 방법

selectkey를 사용하는 방법은 간단하지만 요구 사항에 따라 다르게 속성을 설정하여 적용할 수가 있습니다. 언제 selectkey를 사용하는지, 어떻게 적용하는지 알아보도록 하겠습니다.

### 속성 정리

> select key 엘리먼트 속성
> - keyProperty: selectKey구문의 결과가 셋팅될 대상 프로퍼티.
> - keyColumn: 리턴되는 결과셋의 칼럼명은 프로퍼티에 일치한다. 여러개의 칼럼을 사용한다면 칼럼명의 목록은 콤마를 사용해서 구분한다.
> - resultType: 결과의 타입. 마이바티스는 이 기능을 제거할 수 있지만 추가하는게 문제가 되지는 않을것이다. 마이바티스는 String을 포함하여 키로 사용될 수 있는 간단한 타입을 허용한다.
> - order: BEFORE 또는 AFTER를 셋팅할 수 있다. BEFORE로 설정하면 키를 먼저 조회하고 그 값을 keyProperty 에 셋팅한 뒤 insert 구문을 실행한다. AFTER로 설정하면 insert 구문을 실행한 뒤 selectKey 구문을 실행한다. 오라클과 같은 데이터베이스에서는 insert구문 내부에서 일관된 호출형태로 처리한다.
> - statementType: STATEMENT, PREPARED 또는 CALLABLE중 하나를 선택할 수 있다. 마이바티스에게 Statement, PreparedStatement 또는 CallableStatement를 사용하게 한다. 디폴트는 PREPARED 이다.

### 샘플 테이블 및 DTO

selectKey에 대한 설명을 보다 쉽게 하기 위해서 샘플 테이블과 DTO를 만들어 두겠습니다.

#### 테이블

user와 hobby 테이블을 샘플로 생성하였습니다.

##### user

```sql
CREATE TABLE user(
    user_id INT(11) NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(20) NOT NULL DEFAULT '',
    column1 VARCHAR(20) NOT NULL DEFAULT '',
    column2 VARCHAR(20) NOT NULL DEFAULT '',
    PRIMARY KEY(user_id)
);
```

##### hobby

```sql
CREATE TABLE hobby(
    hobby_id INT(11) NOT NULL DEFAULT 0,
    hobby_name VARCHAR(20) NOT NULL DEFAULT '',
    user_id INT(11) NOT NULL DEFAULT 0
    PRIMARY KEY(hobby_id)
)
```

#### DTO

위에 생성한 테이블에 맞춰서 DTO 클래스도 생성합니다.

##### User 클래스

```kotlin
class User(
    val userId: Int,
    val userName: String,
    val column1: String,
    val column2: String
)
```

##### Hobby 클래스

```kotlin
class Hobby(
    val hobbyId: Int,
    val hobbyName: String,
    val userId: Int
)
```

{% include base/components/google/infeed-ad.html slot=site.data.ad.second.infeed %}

### selectKey가 사용되는 사례

1. AUTO_INCREMENT가 적용되지 않은 테이블에 id를 계산해서 넣고 싶은 경우
2. AUTO_INCREMENT가 적용된 테이블에 삽입된 데이터의 id를 바로 조회하여 바로 다른 테이블에 삽입하고 싶은 경우

샘플 데이터를 가지고 사례의 순서대로 적용해보도록 하겠습니다.

#### 자동 채번이 적용되지 않은 테이블에 id를 계산해서 삽입

```sql
<insert id="insertHobby" parameterType="hobby">
    /* order="BEFORE" 삽입 전에 조회 */
    /* selectKey 구문의 위치는 INSERT 쿼리 위, 아래 상관 없이 위치할 수 있습니다. */
    <selectKey keyProperty="hobbyId" resultType="int" order="BEFORE">
        SELECT MAX(hobby_id) + 1 FROM hobby
    </selectKey>

    /* #{hobbyId}에는 SelectKey 구문을 통해서 조회한 값이 저장되어 있습니다. */
    INSERT INTO hobby(hobbdy_id, hobby_name, user_id)
    VALUES (#{hobbyId}, #{hobbyName}, #{userId})
</insert>
```

위 코드는 hobby 테이블에 데이터를 삽입하기 전에, `hobby_id` 값을 hobby_id의 (최대값 + 1)을 조회해서 삽입하는 예제입니다.

또한 `INT` 데이터 타입이 아닌 경우에도 적용 가능합니다.

#### 자동 채번이 적용된 테이블에 삽입된 데이터를 다른 곳에서 바로 사용

예를 들어 사용자에 대한 데이터와 해당 사용자의 취미를 저장하고 싶은 경우, 다음과 같은 형태로 `selectKey`를 사용할 수 있습니다.

##### 삽입 코드 예제

```sql
<insert id="insertUser" parameterType="user">
    /* user 테이블은 AUTO_INCREMENT 설정이 되어 있습니다. */
    INSERT INTO user(user_name, column1, column2)
    VALUES (#{userName}, #{column1}, #{column2})

    /* order="AFTER" 삽입 후에 조회 */
    /* INSERT 구문이 실행된 후, 방금 넣은 데이터의 ID를 조회하면 자동으로 DTO 객체에 설정됩니다. */
    <selectKey keyProperty="userId" resultType="int" order="AFTER">
        SELECT LAST_INSERT_ID()
    </selectKey>
</insert>
```

```sql
<insert id="insertHobby" parameterType="hobby">
    INSERT INTO hobby(hobbdy_id, hobby_name, user_id)
    VALUES (#{hobbyId}, #{hobbyName}, #{userId})
</insert>
```

##### 서비스 코드

```kotlin
fun insertUserData (user: User, hobby: Hobby) {
    insertUser(user)
    /* user가 삽입된 후, user 객체에는 userId가 설정되어 있습니다. */
    hobby.userId = user.userId
    insertHobby(hobby)
}
```

### BONUS: select key 컬럼 여러 개 사용 (Multiple selectKey)

Mybatis 3.2.6 버전부터는 selectKey에 여러 개 컬럼의 데이터를 조회할 수 있습니다. 여러 개의 컬럼을 가져오기 위해서는 `keyColumn`이라는 속성을 설정해주어야합니다.

```sql
<insert id="insertUser">
    INSERT INTO user(user_id, user_name, column1, column2)
    VALUES (#{userId}, #{userName}, #{column1}, #{column2})

    <selectKey keyColumn="user_id,user_name" keyProperty="userId,userName" resultType="map" order="AFTER">
        SELECT user_id, user_name
        FROM user
        WHERE column1 = #{column1} AND column2 = #{column2}
    </selectKey>
</insert>
```

위 코드처럼 데이터가 삽입이 된 이후에 특정한 조건에 맞는 컬럼들의 데이터를 조회합니다. 주의할 점은 selectKey를 통해서 나오는 데이터의 row 수는 무조건 1개여야합니다.

## 맺음

간단하게 selectKey를 사용하는 방법에 대해서 알아보았습니다. 혹시 궁금하신 점이나 이상한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
