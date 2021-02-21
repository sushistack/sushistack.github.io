---
layout: post
published: true
title: "[spring boot/스프링] Spring boot jar 배포 하는 방법"
icon: spring
description: >
  스프링 부트 jar 실행 가능한 파일 만는 방법 및 실행하여 배포하는 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /back-end/spring/executable-jar
tags: 
  - spring boot
  - 스프링 부트
  - jar
  - boot jar
  - gradle
  - executable jar
---

개발 환경에 스프링부트 어플리케이션을 실행하는 것은 IDE에서 버튼 하나로 간단하게 실행할 수 있습니다. 하지만 실제로 운영할 서버에 배포할 때는 간단하게 `Run` 버튼만으로 할 수 없습니다.

보통 운영서버에 spring boot 어플리케이션을 배포할 때는 패키징된 **jar** 파일을 명령어로 실행시키는 방식을 사용합니다.

이번 글에서는 `gradle`을 활용하여 패키징 파일을 만들고, 서버에서 실행 배포 하는 방법을 소개해드리도록 하겠습니다.

## Spring boot jar 배포 하는 방법

Spring boot의 `starter-tomcat` 사용한다고 가정하고 다음과 같은 순서대로 설명하도록 하겠습니다.

1. 필요한 gradle 의존성 추가
2. gradle로 jar 패키징
3. 서버에서 jar 파일 실행

### 필요한 gradle 의존성 추가

보통 spring boot 프로젝트를 spring initializer를 통해서 생성할 때, `spring-boot-start-web`을 의존성을 추가하셨다면 아래와 같이 `spring-boot-starter-tomcat`도 같이 추가되어 있을 것입니다.

```gradle
implementation("org.springframework.boot:spring-boot-starter-web")
providedRuntime("org.springframework.boot:spring-boot-starter-tomcat")
```

`starter-tomcat`을 이용하면 따로 톰캣을 다운 받거나 설정할 필요 없이 바로 실행이 가능하게 해주는 굉장히 편리한 의존성입니다.

### Gradle jar 패키징

gradle로 jar를 패키징하는 방법은 간단합니다. 다음과 같이 진행해주시면 패키징된 jar 파일을 얻을 수 있습니다.

#### Gradle 탭 열기

![gradle 탭 열기](/assets/images/springboot-jar1.jpg)

`⌘` + `E` (for Mac) 또는 `Ctrl` + `E` (for windows)를 눌러 `Recent Files`를 열고, **Gradle**을 선택합니다.

#### BootJar 실행

![bootjar 실행하기](/assets/images/springboot-jar2.jpg)

Gradle 탭에서 `Task` > `build` > `bootJar`를 선택하여 실행합니다.

#### Jar 파일 위치 확인

![Jar 파일 위치 확인](/assets/images/springboot-jar3.jpg)

bootJar 작업이 끝나면 위 사진과 같은 위치에 jar 파일이 생성됩니다.

이제 jar 파일을 서버에 올려서 배포하는 방법에 대해서 알아보도록 하겠습니다.

### 서버에서 jar 파일 배포

서버에 jar 파일이 있고, 환경은 `CentOS 7` 기준으로 가정하고 배포하는 과정을 설명 드리도록 하겠습니다.

#### jdk 설치 하기

```bash
yum install -y java-11-openjdk-devel
```

위 명령어를 통해서 java를 설치해줍니다.

#### jar 실행 하기

```bash
java –jar [name-of-jar-file].jar
```

JDK가 잘 설치되었다면, 위 명령어를 통해서 jar 배포를 진행하실 수 있습니다.

{% include base/components/hint-box.html type='warning' text='위 명령어로 실행하는 경우, 프로세스가 foreground 에서 실행되기 때문에 종료를 하거나 로그아웃을 하면 프로세스가 종료됩니다.' %}

#### 백그라운드로 jar 배포 하기

```bash
nohup java –jar [name-of-jar-file].jar &
```

위와 같은 명령어로 jar를 실행해주시면 프로세스가 백그라운드에서 실행되게 됩니다. 또한 종료나 로그아웃을 해도 프로세스가 종료지 않습니다.

{% include base/components/hint-box.html type='info' text='nohup으로 jar를 실행하게 되는 경우 jar 실행에 대한 로그는 nohup.out 파일에 쓰여집니다.' %}

#### java application이 실행 중인지 확인

```bash
ps -ef | grep java
[pid]
```

위 명령어를 이용하여 jar로 실행시킨 java 프로세스를 확인하실 수 있습니다.

#### java application 종료

```bash
kill -9 [pid]
```

위의 `ps` 명령어를 통해 얻은 pid를 통해서 간단하게 프로세스를 종료시킬 수 있습니다.

## 맺음

간단하게 스프링부트로 실행가능한 jar 파일을 만들고, 이를 실행하는 것까지 소개해드렸습니다. 혹시 궁금하신 점이나 이상한 점은 댓글 부탁드리겠습니다.

감사합니다.
