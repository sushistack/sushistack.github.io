---
layout: post
published: true
title: "[스프링/Spring] Port 8080 is already in use 에러 해결 방법"
icon: spring
description: >
  스프링에서 가끔 발생하는 8080 포트는 이미 사용중이라는 에러에 대해서 알아보고 해결하는 방법까지 알아보도록 하겠습니다.
author: deeplify
toc: true
permalink: /back-end/spring/port-is-already-in-use
tags: 
  - spring boot
  - spring
  - 스프링부트
  - 스프링
  - port
  - already in use
  - 포트
  - 이미 사용중인 포트
---

스프링 또는 스프링 부트를 이용하여 웹 어플리케이션을 개발하다보면, 가끔 **포트가 이미 사용중**이라는 에러 메시지를 보신 경험이 있으실겁니다. 간단한 에러인데도 처음에는 해당 포트를 사용하는 프로세스를 종료하지 못해서 해결하는데 오랜 시간이 걸렸던 경험이 있습니다.

`PortInUseException`에러가 발생하는 원인에 대해서 알아보고, 에러를 해결하는 방법에 대해서도 알아보도록 하겠습니다.

## Port 8080 is already in use

```text
org.springframework.boot.web.server.PortInUseException: Port 8080 is already in use
```

스프링부트를 이용하여 개발한 내용을 로컬에서 확인하기 위해 위와 실행했을 때, 위와 같은 에러가 발생할 수 있습니다. 이 에러가 발생하는 이유는 이미 포트를 사용중인 포트이기 때문입니다.

### 발생 원인

> 1. 동일한 포트를 사용하는 어플리케이션을 번갈아가며 실행 시키는 경우 (이미 다른 하나가 실행중)
> 2. IDE 상에서는 프로세스가 종료되었으나 실제 프로세스가 종료되지 않은 경우

일반적으로 위 두 가지 경우에 `PortInUseException` 에러가 발생하게되고, 보통 2번의 경우가 많이들 겪게 되는 상황이라고 생각됩니다.

2번 상황이 발생하는 이유는 컴퓨터가 한번 종료되었을 경우라던가 IDE의 문제라고 생각됩니다.

### 해결 방법

포트가 이미 실행중이라면 생각해볼 수 있는 해결방법은 두 가지가 있습니다.

{% include base/components/hint-box.html type='success' list='실행하려고하는 어플리케이션의 실행 포트를 변경한다.|현재 포트를 사용하고 있는 프로세스를 종료한다.' %}

#### 포트 변경하기

```diff
# application.yml
+ server.port: 8081
```

스프링 또는 스프링부트에서 위와 같이 설정해주시면 어플리케이션의 포트를 변경할 수 있습니다.

#### 프로세스 종료하기

프로세스를 종료하는 방법은 OS 별로 다르기 때문에 macOS와 Windows에서 각각 소개해드리도록 하겠습니다.

##### Windows OS 프로세스 종료

###### 1. cmd 창을 열고 아래와 같은 명령어를 입력해줍니다.

```shell
netstat -ano
```

{% include base/components/hint-box.html type='info' list='netstat: 현재 TCP/IP 네트워크 연결 상태 확인|a: 모든 연결 및 수신 대기 포트를 표시|n: 주소 및 포트 번호를 숫자 형식으로 표시|o: 각 연결의 소유자 프로세스 ID를 표시' %}

```text
프로토콜  /    로컬 주소    /  외부 주소   /    상태     /  PID
TCP       0.0.0.0:8080    0.0.0.0     LISTENING     12345
```

###### 2. taskkill 명령어로 해당 포트를 사용하고 있는 프로세스 종료한다.

```shell
taskkill /f /pid 12345
```

위 명령어를 통해 프로세스를 종료해줍니다.

##### macOS 프로세스 종료

###### 1. lsof 명령어로 해당 포트를 사용하는 프로세스를 조회합니다.

```shell
lsof -n -i -P | grep 8080
```

{% include base/components/hint-box.html type='info' list='lsof: 현재 실행중인 프로세스를 확인한다.|-n: 호스트네임을 제거한다.|-i: IPv[46] 파일들을 선택한다.|-P: 포트의 이름을 제거한다.' %}

```text
COMMAND   PID    USER  FD    TYPE DEVICE    SIZE/OFF   NODE NAME
java      12345  user  128u  IPv6 0x5210d6  0t0        TCP 127.0.0.1:8080 (LISTEN)
```

###### 2. 해당 포트를 사용하는 프로세스를 종료한다.

```shell
kill -9 12345
```

위 명령어를 통해 프로세스를 종료합니다.

### 맺음

간단하게 스프링 또는 스프링부트에서 발생하는 `PortInUseException` 에러의 원인을 확인해보고, 해결 방법까지 소개해드렸습니다. 궁금하신 점이나 이상한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
