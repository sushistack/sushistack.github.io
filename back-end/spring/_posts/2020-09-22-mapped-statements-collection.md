---
layout: post
published: false
title: Mapped Statements collection does not contain value for 에러
icon: spring
description: >
  mapped statements collection does not contain value for
author: deeplify
toc: true
permalink: /back-end/spring/mapped-statements-collection
tags:
  - spring
  - mybatis
  - spring
  - mapper
---

Spring과 Mybaits를 이용하여 개발 하다며보면 에러가 종종 발생합니다. 저 같은 경우도
과거에 해결 해보았던 에러도 다시 까먹어서 시간을 허비하는 경우가 많은데, 이번 기회를 통해서
트러블 슈팅 시간단축에 도움이 되었으면 좋겠습니다.

그럼 바로 에러에 대해서 알아보고, 어떻게 해결하는지 까지도 알아보겠습니다.

### Error

```text
java.lang.IllegalArgumentException: 
mapped statements collection does not contain value for...

...
...

```

### Reason

이러한 에러가 발생하는 경우는 여러가지가 있습니다. 상세하게 알아보면 다음과 같습니다.

#### xml상의 mapper id가 다른 경우

```xml
<select id="selectSomethings">
  ...
</select>
```

#### mapper xml 파일 내부에 namespace가 다른 경우

```xml
<mapper namespace="com.example...">
```

#### 스프링 설정 중 application.yml에서 mybatis.mapper-locations 설정이 되지 않았거나 잘못된 경우

```yml

mybatis:
  mapper-locations: classpath*:/mapper/*-mapper.xml
...

```

### Solution

1. DAO에서 메소드 파라미터 또는 mapper interface를 사용하신다면 메소드 네임을 확인합니다.
2. namespace 매칭이 잘 되어 있는지 확인합니다.
3. mapper-locations가 잘 설정되어 있는지 확인합니다.

여러가지 경우가 더 있을 수 있지만, 이렇게 세 가지로 정리를 마치고, 추후에 추가적으로 발견되는 에러 상황이 
있다면 업데이트 하도록하겠습니다.

질문이나 이상한 점있으시면 댓글 부탁드리겠습니다.

감사합니다.
