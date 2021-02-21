---
layout: post
published: true
title: "[Linux/리눅스] 심볼릭 링크 사용 방법"
icon: bash
description: >
  리눅스 Bash에서 심볼릭 링크를 사용하는 방법을 소개해드립니다.
author: deeplify
toc: true
permalink: /server/bash/symbolic-link
tags:
  - 심볼릭 링크
  - symbolic link
  - bash
  - ln
  - linux
  - 리눅스
---

리눅스에서 유용하게 사용할 수 있는 기능들이 있습니다. 이번 글에서는 특정 디렉토리에 대한 심볼릭 링크를 만드는 방법에 대해서 소개해드리려고 합니다.

아직 하드 링크와 심볼릭 링크의 개념을 모르신다면 아래 링크를 통해 확인하실 수 있습니다.

{% include base/components/link.html title='[Linux/리눅스] 하드 링크와 심볼링 링크 | Deeplify' internal_link='/server/bash/hard-link-and-symbolic-link' %}

## 심볼릭 링크란?

이 기능은 Windows OS의 바로가기 아이콘과 비슷한 것이라고 생각하실 수 있습니다.

일반적으로 실행파일이나 설정파일은 디렉토리 아주 깊숙한 곳에 저장되어 관리되고 있는 경우가 많습니다. 그런 경우 Windows에서는 바탕화면에 바로가기 아이콘을 만들어 실행하거나 설정할 수 있습니다.

이와 비슷하게 리눅스 파일시스템에서도 심볼릭 링크라는 기능을 제공하고 있습니다. 한 번 자세하게 알아보도록 하겠습니다.

## 심볼릭 링크 사용 방법

심볼릭 링크를 사용하려면 `ln`이라는 명령어를 사용해야 합니다. ln은 `link`의 약자인 명령어로 링크를 다루는 명령어 입니다.

### ln 명령어 옵션

```text
-b, --backup[=CONTROL]: 기존 타겟 파일을 각각 백업
-d, -F, --directory: 슈퍼유저가 디렉토리를 하드 링크하도록 허용
-f, --force: 기존 타겟 파일 제거
-i, --interactive: 타겟 파일들의 제거 여부를 입력 받음
-L, --logical 심볼릭 링크인 대상 참조 제거
-n, --no-dereference:  LINK_NAME이 심볼릭 링크인 경우 일반 파일로 처리
-P, --physical: 하드 링크를 심볼릭 링크에 직접 연결
-r, --relative: 링크 위치와 관련된 심볼릭 링크 생성
-s, --symbolic: 하드 링크 대신 심볼 링크 생성
-S, --suffix=SUFFIX: 일반적인 백업 접미사를 재정의
-t, --target-directory=DIRECTORY: 링크를 만들 디렉터리 지정
-T, --no-target-directory: LINK_NAME을 항상 일반 파일로 처리
-v, --verbose: 링크된 각 파일의 인쇄 이름
--help: 도움말을 표시
--version: 버전 정보를 출력
```

#### 참고 링크

{% include base/components/link.html title='ln(1) - Linux manual page' internal_link='https://man7.org/linux/man-pages/man1/ln.1.html' %}

### 심볼링 링크 생성 예제

#### 샘플 디렉토리 생성

```text
.
└── target_directory
    └── target.txt
```

심볼링 링크 테스트를 하기 위해서 위와 같이 현재 위치에서 `target_directory`를 만들고 그 안에 `target.txt` 파일을 만들어 두었습니다.

#### 심볼릭 링크 생성

```bash
ln -s ./target_directory ./symbolic_link_directory
```

그리고 위와 같은 명령어를 실행하여 `target_directory`에 대한 심볼릭 링크를 만들었습니다.

```text
.
├── symbolic_link_directory -> ./target_directory
└── target_directory
    └── target.txt
```

심볼릭 링크를 생성한 후 현재 디렉토리의 구조는 위와 같은 형태가 되었습니다.

#### 심볼릭 링크 내부

```bash
cd symbolic_link_directory
```

```text
.
└── target.txt
```

심볼릭 링크 디렉토리인 `symbolic_link_directory`로 이동 하면 위와 같이 디렉토리 내부 구조를 확인할 수 있습니다.

## 맺음

간단하게 심볼릭 링크 사용하는 방법에 대해서 소개해드렸습니다. 혹시 궁금하신 점이나 이상한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
