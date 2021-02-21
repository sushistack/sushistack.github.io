---
layout: post
published: true
title: "Unknown initial character set index '255' received from server 에러"
icon: mysql
description: >
  "Unknown initial character set index '255' received from server가 발생하는 원인과 해결 방법에 대해서 소개합니다."
author: deeplify
toc: true
permalink: /database/troubleshoot/unknown-initial-character-set-index
tags:
  - mysql
  - unkown initial
  - character set
  - set index
  - encoding
---

개인적으로 Spring boot 프로젝트를 만들며 공부하던 중 만나게된 에러인 `Unknown initial character set index '255' received from server`에 대해서 알아보도록 하겠습니다.

## Unknown initial character set index

```text
Unknown initial character set index '255' received from server.
Initial client character set can be forced via the 'characterEncoding' property.
```

어플리케이션에 DB와 관련된 세팅을 하던 도 중 위와 같은 에러가 발생하게 되었습니다.

내용은 Mysql 서버로부터 알 수 없는 인덱스 255 초기화 문자 셋을 받았다는 의미입니다. 뒤이어 캐릭터 인코딩과 관련된 설정을 수정하라는 식의 메시지도 있습니다.

### 에러 발생 원인은?

검색을 통해 알아보니, **Mysql 8.0** 부터 캐릭터 셋과 관련한 변경사항이 발생한 것이 이유였습니다.

> 문자 세트 지원
> - 기본 문자 집합이 latin1에서 utf8mb4로 변경
> - character_set_server 및 character_set_database 시스템 변수의 기본값이 latin1에서 utf8mb4로 변경
> - collation_server 및 collation_database 시스템 변수의 기본값이 latin1_swedish_ci 에서 utf8mb4_0900_ai_ci로 변경

{% include base/components/link.html title='java - Unknown initial character set index 255 received from server - Stack Overflow' internal_link='https://stackoverflow.com/questions/50855622/unknown-initial-character-set-index-255-received-from-server' %}

### 해결 방법

{% include base/components/link.html title='[Mysql] 버전 확인하는 방법' internal_link='/database/troubleshoot/how-to-check-mysql-version' %}

제가 설치한 Mysql 버전을 확인해보니 `8.0.21`인 것을 확인했습니다.

```gradle
dependencies {
  compile group: 'mysql', name: 'mysql-connector-java', version: '5.1.6'
}
```

또한 Mysql Connector 버전은 `5.1.6`으로 되어 있었습니다.

```diff
dependencies {
- compile group: 'mysql', name: 'mysql-connector-java', version: '5.1.6'
+ compile group: 'mysql', name: 'mysql-connector-java', version: '5.1.44'
}
```

위에서 말한 mysql 8.0 에서의 변경 사항은 이미 새로운 버전의 `Mysql Connector`에서 대응을 해두었기 때문에 위와 같이 버전만 변경 해주어 해결 할 수 있었습니다.

## 맺음

간단하게 `Unknown initial character set index '255' received from server`에러가 발생하는 원인과 해결 방법에 대해서도 알아보았습니다.

궁금하신 점이나 이상한 점이 있으면 댓글 부탁드리겠습니다.

감사합니다.
