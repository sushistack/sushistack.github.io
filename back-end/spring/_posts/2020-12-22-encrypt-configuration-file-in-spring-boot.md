---
layout: post
published: true
title: "[Spring/스프링] 스프링 부트 설정파일(properties, yml) 암호화"
icon: spring
description: >
  Spring boot에서 application.properties, application.yml 설정 파일을 암호화 하는 방법을 소개합니다.
author: deeplify
toc: true
permalink: /back-end/spring/encrypt-configuration-file-in-spring-boot
tags: 
  - 설정파일 암호화
  - 스프링부트 설정
  - 스프링부트 암호화
  - spring boot
  - encrpyt configuration
---

스프링을 환경에서 개발하는 개발자들이라면 `application.properties` 또는 `application.yml` 설정파일을 아주 유용하게 사용하시고 계실 것입니다.

이런 설정파일을 사용하는 가장 큰 이유는 파라미터 설정만으로 서비스 환경을 구분하여 빌드하거나 서비스를 실행시킬 수 있기 때문입니다.

사용하기는 편리하지만, 보안적인 측면에서 봤을 때는 상당히 취약할 수가 있습니다. 그래서 이 글에서는 보안적으로 어떻게 취약하고, 이를 암호화할 수 있는 라이브러리를 소개해드리도록 하겠습니다.

## 스프링 부트 설정파일(properties, yml) 암호화

누군가 서비스의 Jar 파일를 탈취하는데 성공했다면 디컴파일러를 이용하여 Jar 내부에 있는 설정파일을 얻어 낼 수 있습니다.

제가 생각하는 탈취된 설정파일에서 가장 취약한 정보는 아무래도 DB 접속 정보라고 생각합니다.

```yml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/test
    username: root
    password: 1234
```

위와 같이 설정파일에 접속과 관련된 정보들이 그대로 드러나기 때문에 만약 누군가 DB에 접근하여 DB 있는 정보들을 가져가거나 데이터를 조작할 수도 있습니다.

### Jasypt

설정파일의 보안을 위한 스프링 부트 자체 암호화 라이브러리는 없습니다. 따라서 **Jasypt** 라는 라이브러리를 이용하여 설정파일을 암호화 하는 방법에 대해서 소개하는 시간을 가져보겠습니다.

#### 의존성 추가

```gradle
dependencies {
  implementation("com.github.ulisesbocchio:jasypt-spring-boot-starter:3.0.3")
  implementation("org.bouncycastle:bcprov-jdk15on:1.64")
}
```

위 처럼 두 가지 의존성을 추가해줍니다.

> 라이브러리
> - jasypt-spring-boot-starter: 설정파일 암호화
> - bcprov-jdk15on: 암호 알고리즘 추가

#### 설정

```yml
jasypt:
  encryptor:
    password: password # 암호화에 사용할 Passowrd 설정
    bean: jasyptStringEncryptor # Bean 이름
```

위 처럼 설정파일에 jasypt 관련한 설정을 해줍니다.

```kotlin
@Configuration
class JasyptConfig {

    @Value("\${jasypt.encryptor.password}")
    lateinit var password: String

    @Bean("jasyptStringEncryptor")
    fun stringEncryptor() =
        PooledPBEStringEncryptor()
            .also {
                it.setConfig(
                    SimpleStringPBEConfig().also { conf ->
                        conf.poolSize = 1
                        conf.password = password
                        conf.stringOutputType = "base64"
                        conf.keyObtentionIterations = 1000
                        conf.provider = BouncyCastleProvider()
                        conf.algorithm = "PBEWithSHA256And128BitAES-CBC-BC"
                        conf.setSaltGeneratorClassName("org.jasypt.salt.RandomSaltGenerator")
                    }
                )
            }
}
```

저 같은 경우, 개발 언어로 코틀린을 사용하였기 때문에 위처럼 설정을 해주었습니다. 설정은 서비스에 따라 다르게 적용하시면 될 것 같습니다.

여기서 `jasypt.encryptor.password` 값이 암호화되지 않아서 설정파일이 탈취되면 노출의 위험이 있습니다.

하지만 서비스를 시작할 때 파라미터로 `-Djasypt.encryptor.password=example` 같은 형태로 주시면 노출 없이 실행 가능합니다.

#### 암호화

설정파일에 암호화하는 방법을 알아보겠습니다.

```kotlin
@ExtendWith(SpringExtension::class)
@SpringBootTest(classes = [ApiApplication::class])
@PropertySource(value = ["application.yml"])
class JasyptConfigTest {

    @Autowired
    @Qualifier("jasyptStringEncryptor")
    lateinit var stringEncrytor: StringEncryptor

    @Log
    private lateinit var logger: Logger

    @Test
    fun encrypt() {
      assertThat(stringEncrytor).isNotNull
      val text = "some text"
      logger.info("ENC(${stringEncrytor.encrypt(text)})")
    }
```

위와 같이 테스트를 만들어서 암호화하고 싶은 텍스트를 작성하여 암호화된 텍스트를 얻어냅니다.

```yml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: ENC(QHuRBWDOi8Uk7Q7NRgHrIDlhhfhfwRiOT00wy3xJLl463Q+r4vqJc2TTkuMVt19DWR44=)
    username: ENC(OPGoF02MSB8+1Aks4GSuRg==)
    password: ENC(RKqGd35KO1Cc5RxSiM1GoSG1PvcOeSiw)
```

테스트를 통해 얻어낸 암호화된 텍스트를 위처럼 `ENC(암호화된 텍스트)`형태로 채워주시면 됩니다.

## 맺음

라이브러리를 이용하여 간단하게 설정파일을 암호화하는 방법에 대해서 알아보았습니다. 혹시 궁금하신 점이나 이상한 점이 있으면 댓글 부탁드리겠습니다.

감사합니다.
