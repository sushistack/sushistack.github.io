---
layout: post
published: false
title: "[Spring/스프링] InputStream to ByteArray 변환"
icon: spring
description: >
  Spring 또는 Spring Boot 환경에서 InputStream을 ByteArray로 변환하는 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /back-end/spring/stream-to-byte-array
tags: 
  - spring
  - inputstream
  - byte Array
  - spring
  - spring Boot
---

이미지, PDF, text 파일 등을 다루다보면 Java의 `byte[]`로 변환해야하는 경우가 있습니다. 저도 개발을 하다보니 이미지 바이너리를 저장하거나 클라이언트에 내려주어야 하는 경우가 생겼습니다. 문제는 외부 이미지 파일을 다운받아서 byte array로 변환하는 과정에서 발생했습니다.

기본적으로 Multipart 형태로 받은 이미지는 Spring에서 알아서 `byte[]` 형태로 변환해주는데, 외부에서 요청을 통해 받아온 이미지의 경우는 InputStream 형태로 받을 수 있었습니다. 더 찾아보면 더 다양한 타입으로 받을 수도 있을 것 같지만, 저는 이 데이터를 **byte[]** 형태로 변환하려고 했습니다.

<hr>

### 시도한 방법들

`InputStream`에서 `byte[]` 형태로 변환하는 코드는 여러가지가 있습니다.

> Plain Java를 사용해서 변환

```java
InputStream is = entity.getContent();
byte[] ba = new byte[is.available()];
```

이미지의 경우, 정상적으로 변환되지 않았습니다.

> 구글 Guava를 이용한 변환

```java
InputStream is = entity.getContent();
byte[] ba = ByteStreams.toByteArray(is);
```

저는 이 라이브러리로 시도를 해보지는 않았지만, 구글의 Guava 라이브러리를 사용해서 변환을 할 수 있다고 합니다. 하지만 라이브러리를 import 해야하니까, 약간 귀찮기도 하고 추가하고 싶지 않습니다.

> Commons IO를 사용하서 변환

```java
InputStream is = entity.getContent();
byte[] ba = IOUtils.toByteArray(is);
```

Commons IO는 Apache의 라이브러리입니다. 역시 저는 사용해보지 않았지만, 변환이 가능하다고 합니다. 역시 라이브러리를 import해야한다는 부담이 있습니다.

> StreamUtils를 사용해서 변환

```java
InputStream is = entity.getContent();
StreamUtils.copyToByteArray(is);
```

제가 사용한 것은 StreamUtils라는 클래스의 `copyToByteArray`라는 메소드를 사용했습니다. **StreamUtils** 클래스는 `springframework.util`에 포함되어 있기 때문에, 만약 이미 포함되어 있는 클래스일 가능성이 높습니다. 저 같은 경우에는 이미 패키지가 import 되어 있어, 사용만하면 됐었기에 간단하게 해결 할 수 있었습니다.

또한 이미지파일을 byte array로 변환하는 것이었는데, multipart로 받아온 byte array와 완전히 동일한 포맷으로 변환할 수 있었습니다.

## 맺음

이번 글에서는 InputStream을 ByteArray로 변환하는 방법에 대해서 알아보았습니다. 혹시 궁금하신 점이나 이상한 점있으면 댓글 부탁드리겠습니다.

감사합니다.
