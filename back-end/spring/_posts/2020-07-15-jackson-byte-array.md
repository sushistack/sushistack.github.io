---
layout: post
published: true
title: "[spring/스프링] Jackson byte array serialize 하는 방법"
icon: spring
description: >
  스프링 환경에서 Jackson을 이용하여 byte Array serialize 하는 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /back-end/spring/jackson-byte-array
tags:
  - spring
  - spring boot
  - jackson
  - serialize
  - byte array
---

스프링 환경에서 개발을 하면서, 이미지를 가공하여 클라이언트로 내려줘야하는 요구사항이 있었습니다. 이미지 데이터는 스프링 앱 내에서는 **Byte Array** 타입으로, Database 상에서는 **Binary** 타입으로 핸들링되고 있었습니다.

## Json Serialize in Jackson

> 이미지 데이터 전달
> 1. CLIENT <---> SPRING APP1
> 2. SPRING APP1 <---> SPRING APP2
> 3. SPRING APP2 <---> DATABASE

이미지 데이터를 저장하는 상황을 간단하게 위와 같이 3개의 흐름로 표현할 수 있습니다. 이 때 2번 케이스인 **Server To Server** 간의 데이터 전송에서 문제가 발생했습니다. `SPRING APP2`에서 이미지 **byte array** 데이터를 포함한 Json 데이터를 받고, 이미지를 serializing하는 과정에서 **String** 형태로 리턴되었습니다.

### byte array Jackson serialize 적용 방법

원인을 파악해보니, 기본적으로 적용되어 있는 byte array serializer의 경우, 다른 정수 배열과는 다르게 결과 값을 숫자의 배열이 아니라 **Base64**로 인코딩된 Bytes를 반환하도록 되어있었습니다.

{% include base/components/link.html title='ByteArraySerializer (jackson-databind 2.8.4 API)' internal_link='https://www.javadoc.io/doc/com.fasterxml.jackson.core/jackson-databind/2.8.4/com/fasterxml/jackson/databind/ser/std/ByteArraySerializer.html' %}

### 커스텀 Json Serializer 적용하기

다음 코드와 같이 JsonSerializer 클래스를 상속받아 byte array가 숫자로 이루어진 배열로 나올 수 있도록 설정해줍니다.

```java
public class ByteArraySerializer extends JsonSerializer<byte[]> {

    @Override
    public void serialize(byte[] bytes, JsonGenerator jsonGenerator, SerializerProvider provider) throws IOException {
        jsonGenerator.writeStartArray();

        for (byte b : bytes) {
            jsonGenerator.writeNumber(unsignedToBytes(b));
        }

        jsonGenerator.writeEndArray();
    }

    private static int unsignedToBytes(byte b) {
        return b & 0xFF;
    }

}
```

커스텀 byte array serializer를 만들었으면, 적용하고자 하는 클래스에 다음과 같이 `@JsonSerialize`을 이용하여 설정해줍니다.

```java
class Something {
  private String name;
  private byte[] binary;

  @JsonSerialize(using= ByteArraySerializer.class)
  public byte[] getBinary() {
    return binary;
  }
}
```

위 처럼 설정해주시면 byte array 형태의 데이터를 핸들링할 때, `Base64`로 인코딩된 값이 아니라 정수의 배열 형태의 byte array로 저장할 수 있습니다.

저 같은 경우, byte array 자체를 실제 정수의 배열 형태로 핸들링하려고 했습니다. 만약 그렇지 않고 base64 형태로 이용하려고 한다면 커스텀 serializer를 만드실 필요는 없으니 참고하시면 될 것 같습니다.

## 맺음

Jackson byte array serialize 하는 방법에 대해서 알아보았습니다. 궁금하신 점이나 이상한 점은 댓글로 부탁드리겠습니다.

감사합니다.
