---
layout: post
published: false
title: "[TestContainer] Can not connect to Ryuk at localhost"
icon: spring
description: >
  Spring I/O에서 공개한 modulith 라는 프로젝트에 대해서 알아봅시다.
author: deeplify
toc: true
permalink: /back-end/spring/spring-modulith
tags: 
  - spring
  - testcontainer
---

Colima를 사용하여 TestContinaer를 시킬 때 발생하는 오류 해결 방법을 소개합니다.

https://github.com/abiosoft/colima/issues/449
https://github.com/testcontainers/testcontainers-java/issues/6450

```
export TESTCONTAINERS_DOCKER_SOCKET_OVERRIDE=/var/run/docker.sock
export TESTCONTAINERS_HOST_OVERRIDE=$(colima ls -j | jq -r '.address')
export DOCKER_HOST="unix://${HOME}/.colima/default/docker.sock"
```