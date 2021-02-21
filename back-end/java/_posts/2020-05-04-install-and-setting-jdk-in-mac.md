---
layout: post
published: false
title: "[Mac/맥] JDK 설치, 환경설정 완벽 정리"
icon: java
description: >
  맥에서 다양한 버전의 JDK를 설치하고, 환경설정하는 방법을 소개해드립니다.
author: deeplify
toc: true
permalink: /back-end/java/install-and-setting-jdk-in-mac
tags:
  - java
  - mac
  - install jdk
  - setting
---

맥에서 JDK8 설치하는 방법 및 환경설정하는 방법에 대해서 정리하도록 하겠습니다. 또 여러 버전의 JDK가 있다면, 상황에 따라 적절하게 JDK 버전을 바꾸는 방법에 대해서 알아보도록하겠습니다.

### JDK 다운로드

mac에 설치를 할 것이기 때문에, `Homebrew`를 이용하여 설치를 하도록하겠습니다.<br>
만약, `Homebrew`가 설치되어 있지 않다면 아래 링크에서 다운로드 받아 사용하실 수 있습니다.

{% include base/components/link.html title='The Missing Package Manager for macOS (or Linux) — Homebrew' internal_link='https://brew.sh/index_ko' %}

- 오라클 JDK를 사용하려는 경우 (최신 Homebrew의 경우 java 13 버전이 다운로드 됩니다.)

```bash
brew cask install java

// old Homebrew
brew cask install java8
```

- OpenJdk를 사용하려는 경우

```bash
brew tap adoptopenjdk/openjdk
```

```bash
brew cask install adoptopenjdk8
```

Homebrew를 통해서 JDK를 설치하는 경우, 기본적으로 설치되는 위치가 존재하는데요. 그 위치는 아래와 같습니다.

```text
/Library/Java/JavVirtualMachines/adoptopenjdk-8.jdk/Contents/Home
```

### 환경 설정하기 (JAVA_HOME 설정)

- `bash`를 사용하는 경우

다음 명령으로 `.bash_profile`을 열어주세요.

```bash
vim ~/.bash_profile
```
그 이후, 파일에 다음 코드를 적절한 위치에 추가해줍니다.

```text
export JAVA_HOME=/Library/Java/JavVirtualMachines/adoptopenjdk-8.jdk/Contents/Home
export PATH=${PATH}:JAVA_HOME/bin
```

- `zsh`등 다른 것을 사용하는 경우

동일하게,

```bash
vim ~/.zshrc
```

다음 코드를 적절한 위치에 추가해줍니다.

```text
export JAVA_HOME=/Library/Java/JavVirtualMachines/adoptopenjdk-8.jdk/Contents/Home
export PATH=${PATH}:JAVA_HOME/bin
```

#### 주의!

만약에 `.zshrc`파일에 `PATH`가 정의 되어 있지 않다면, **최 상단**에 다음과 같은 코드를 추가해줍니다.

```text
export PATH=$HOME/bin:/usr/local/bin:$PATH
```

이렇게 수정을 하고, 저장하고, source 명령으로 변경사항을 적용해줍니다.

```bash
source ~/.bash_profile[.zshrc]
```

### 확인하기

- JAVA_HOME 확인하기

```bash
echo $JAVA_HOME
# 경로가 뜬다면 성공입니다.
```

- java 설정이 되었는지 확인하기

```bash
javac -version
# 버전 내용이 뜬다면 성공입니다.
```
