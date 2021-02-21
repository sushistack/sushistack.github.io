---
layout: post
published: true
title: "[Spring/스프링] 내장 톰캣 SSL 적용하기"
icon: spring
description: >
  스프링 부트 내장 톰캣 SSL 적용하는 방법에 대해서 소개해드립니다.
author: deeplify
toc: true
permalink: /back-end/spring/tomcat-ssl
tags: 
  - spring boot
  - tomcat
  - SSL
  - https
  - 톰캣
---

개발 환경이 `SPA(Single Page Application)` + `spring boot`이면서 내장 톰캣(internal tomcat)을 사용 중일 때, 간혹 내장 톰캣에 `SSL`을 적용해야할 때가 있습니다.

## 내장 톰캣 SSL 적용하기

최근에 google chrome 버전 80부터 `SameSite=Secure`가 기본으로 설정되도록 정책 변경을 하게 되었고,
정책이 변경되면서 저희 쪽에 소셜 로그인 쿠키관련 사이드 이펙트가 발생했습니다.

다양한 이슈들이 있었지만, 결론적으로 로그인 관련하여 `http` -> `https`화 작업이 급하게 진행되었습니다.

저희 쪽 개발자 PC에서도 소셜 로그인이 적용된 채로 개발을 진행중이었는데요, 로컬에서도 `https`를 적용해야할 필요가 생겼고, 로컬 tomcat에 ssl을 적용하면서 어떻게 적용했는지 공유하면 좋을 것 같아서 소개해드리려고 합니다.

### 내장 톰캣 확인하기

```kotlin
providedRuntime 'org.springframework.boot:spring-boot-starter-tomcat'
```

gradle 설정에서 위 dependency를 추가하고 있다면, 내장 톰캣을 사용하는 것이라고 생각하시면 됩니다.

일단 외부 톰캣에 대한 테스트는 해보지 않아서, 될지는 모르겠습니다.

### keyStore 생성하기

`keyStore`는 Jdk에 있는 `keytool`이라는 키생성 툴을 사용할 예정입니다.

{% include base/components/link.html title='keytool' internal_link='https://docs.oracle.com/javase/8/docs/technotes/tools/unix/keytool.html' %}

#### 커멘드 옵션

```shell
Key and Certificate Management Tool

Commands:

 -certreq            Generates a certificate request
 -changealias        Changes an entry's alias
 -delete             Deletes an entry
 -exportcert         Exports certificate
 -genkeypair         Generates a key pair
 -genseckey          Generates a secret key
 -gencert            Generates certificate from a certificate request
 -importcert         Imports a certificate or a certificate chain
 -importpass         Imports a password
 -importkeystore     Imports one or all entries from another keystore
 -keypasswd          Changes the key password of an entry
 -list               Lists entries in a keystore
 -printcert          Prints the content of a certificate
 -printcertreq       Prints the content of a certificate request
 -printcrl           Prints the content of a CRL file
 -storepasswd        Changes the store password of a keystore

Use "keytool -?, -h, or --help" for this help message
Use "keytool -command_name --help" for usage of command_name.
Use the -conf <url> option to specify a pre-configured options file.
```

#### key 생성하기

```shell
keytool -genkeypair -alias tomcat-localhost -storetype jks -keyalg RSA -keysize 2048 -validity 3650 -keystore <your project path>/<your project class path>/keystore.jks
```

```shell
> Enter keystore password:  (입력하시면 됩니다.)
> Re-enter new password:  (입력하시면 됩니다.)
> What is your first and last name?
  [Unknown]:  (입력하시면 됩니다.)
> What is the name of your organizational unit?
  [Unknown]:  (입력하시면 됩니다.)
> What is the name of your organization?
  [Unknown]:  (입력하시면 됩니다.)
> What is the name of your City or Locality?
  [Unknown]:  (입력하시면 됩니다.)
> What is the name of your State or Province?
  [Unknown]:  (입력하시면 됩니다.)
> What is the two-letter country code for this unit?
  [Unknown]:  (입력하시면 됩니다.)
> Is CN=, OU=, O=, L=, ST=, C= correct?
  [no]:  (yes)
> Enter key password for <tomcat-localhost>
  (RETURN if same as keystore password):  (입력하시면 됩니다.)
```

#### key 확인하기

```shell
keytool -list
```

### tomcat 설정하기

키를 만들었으니, 이제는 톰캣에 적용을 시켜야합니다. 설정 방법은 생각보다 간단합니다. `application.yml` 파일에 다음과 같이 설정하시면 됩니다.

```yml
server:
  port: 8443
  ssl:
    enabled: true
    key-alias: tomcat-localhost
    key-password: <your key password>
    key-store: classpath:keystore.jks
    key-store-type: PKCS12
    key-store-password: <your store key password>
    key-store-provider: SUN
```

## 맺음

간단하게 내장 톰캣에 SSL을 적용하는 방법에 대해서 알아보았습니다. 혹시 궁금하신 점이나 이상한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
