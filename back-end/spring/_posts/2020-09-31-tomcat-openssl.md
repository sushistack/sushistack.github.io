---
layout: post
published: true
title: "[Spring/스프링] 톰캣 OpenSSL 적용하기"
icon: spring
description: >
  톰캣에서 OpenSSL로 만든 인증서를 등록하여 톰캣으로 띄운 서버에 https를 적용하는 방법을 소개해드립니다.
author: deeplify
toc: true
permalink: /back-end/spring/tomcat-openssl
tags: 
  - spring
  - spring boot
  - tomcat
  - OpenSSL
  - https
  - 톰캣
---

과거 글 중에 톰캣에 오라클에서 만든 Keytool이라는 커맨드라인 프로그램을 이용하여 만든 키를 적용하는 방법에 대해서 소개해 드린적이 있습니다. 하지만 만약 웹 어플리케이션이 FE와 BE로 나뉘어져 있는 상태에서 FE에서 사용하는 인증서와 BE에서 사용하는 인증서가 다를 수 밖에 없습니다. 그 이유는 BE에서는 keytool을 이용하여 인증서를 대체할 파일을 만들었기 때문입니다.

## 톰캣 OpenSSL 적용하기

이번 글에서는 OpenSSL 등으로 이미 생성되어 있는 인증서를 톰캣에 적용하는 방법에 대해서 소개해드리려고 합니다. 저도 검색해가면서 적용을 하였습니다. 생각보다 간단하게 할 수 있엇는데, 시간은 오래걸렷던 것 같습니다.

keytool만을 이용해서 톰캣에 SSL을 적용하는 방법을 아래 링크를 통해서 확인하실 수 있습니다.

{% include base/components/link.html title='스프링 부트 내장 톰캣 SSL 적용하기' internal_link='/back-end/spring/tomcat-ssl' %}

### OpenSSL

OpenSSL은 인증서 파일의 `.pem`과 `.key` 파일을 만들어낼 수 있는 툴입니다. 설치는 검색해보시면 바로 나오니 따로 설명은 드리지 않도록 하겠습니다.

OpenSSL을 설치하셨으면 다음과 같은 명령어로 키셋을 만들어줍니다.

```bash
openssl req -x509 -sha256 -nodes -newkey rsa:2048 -keyout private.key -out public.pem
```

### OpenSSL to PKCS12

톰캣에는 바로 OpenSSL로 만들어진 파일을 설정하여 인증서를 등록할 수 없습니다. 따라서 PKCS12 파일로 변경을 해서 설정해주셔야합니다. `.key`파일과 `.pem`파일이 있는 곳에서 다음 명령어를 실행해주시면 PKCS12 파일을 만드실 수 있습니다.

```bash
openssl pkcs12 -export -inkey private.key -in public.pem -name alias_name -out certificate.p12 -caname root
```

`alias_name`은 따로 자신이 알아볼 수 있는 값으로 변경하시고, 만들어진 파일(certificate.p12)을 프로젝트 resources 폴더에 위치시켜주시면 됩니다.

### 설정 (application.yml)

```yml
server:
  port: 8443
  ssl:
    enabled: true
    key-alias: alias_name
    key-store: classpath:certificate.p12
    key-store-type: PKCS12
    key-store-password: pa55w0rd
```

## 맺음

간단하게 OpenSSL에서 만든 인증서를 톰캣에 적용하는 방법에 대해서 알아보았습니다. 궁금하신 점이나 이상한 점이 있으면 댓글 부탁드리겠습니다.

감사합니다.
