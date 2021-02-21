---
layout: post
published: true
title: "[Linux/리눅스] Bash 디렉토리 전체 삭제"
icon: bash
description: >
  [Linux] Bash 디렉토리 전체 삭제하는 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /server/bash/rm-recursive
tags:
  - bash
  - remove
  - directory
  - rmdir
  - rm
---

개발을 하면서 Bash에서 파일이나 디렉토리를 삭제해야하는 경우는 정말 많습니다. GUI가 환경이라면 우클릭이나 드래그&드랍으로 손쉽게 삭제 할 수 있지만, CLI 환경에서는 모든 것이 명령어로 동작합니다.

## Bash 디렉토리 전체 삭제

이 글에서 다룰 내용은 Bash에서 명령어를 통해서 디렉토리를 삭제하는 방법에 대해서 알아보도록 하겠습니다.

> 디렉토리 삭제
> - rmdir을 이용한 방법
> - rm을 이용한 방법

### rmdir 명령어로 디렉토리 삭제

```bash
rmdir [directory name]
```

이런 식으로 디렉토리를 삭제할 수 있습니다. 단, `directory`가 비어있을 때만 가능합니다. directory 가 비어있지 않으면 다음과 같은 에러가 발생합니다.

```text
rmdir: [directory name]: Directory not empty
```

### rm으로 재귀적으로 디렉토리 삭제

비어 있지 않은 디렉토리를 전체 삭제하고 싶으면 다음과 같이 `rm` 명령어를 사용해야합니다.

```bash
rm -r [directory name]
```

- r: 하위에 있는 것들도 들도 재귀적으로 제거하겠다는 의미 입니다.
- f: 경고를 무시하고 강제로 지우겠다라는 의미 입니다.

```bash
rm [not empty directory name]
```

하지만 `rm`의 옵션을 주지 않고, 실행할 경우 `rm: [directory name]is a directory.`라는 에러 메시지를 받게 됩니다.

## 맺음

간단하게 리눅스에서 디렉토리를 삭제하는 방법에 대해서 알아보았습니다.

감사합니다.
