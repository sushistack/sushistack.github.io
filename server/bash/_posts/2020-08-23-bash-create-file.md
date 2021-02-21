---
layout: post
published: true
title: "[Linux/리눅스] Bash 파일 생성 하는 법"
icon: bash
description: >
  Bash에서 파일 생성 하는 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /server/bash/bash-create-file
tags:
  - bash
  - linux
  - file
  - create
---

웹 서버 설정이나 여러가지 다양한 이유로 Linux Bash를 사용하는 경우가 있습니다. bash에서 가장 흔하게 사용하는 기능은 폴더를 이동하거나 파일을 읽는 경우 입니다. 하지만 그 외에도 파일을 새로 생성하는 경우도 종종 생깁니다.

## 파일 생성

Bash에서 파일을 생성할 수 있는 방법에는 여러 가지가 있습니다.

- touch
- echo
- vi
- nano 

위와 같이 4가지 뿐만 아니라 다른 방법으로도 파일을 생성할 수 있습니다. 이번 글에서는 4가지의 파일을 생성하는 방법을 각각 예제를 통해 알아보겠습니다.

### touch 명령어

```bash
touch [filename].txt
```

기본적으로 많이 사용하는 파일 생성 명령어 입니다. 다음과 같이 사용할 수 있습니다. touch로 생성하는 경우, 현재 디렉토리에 빈 파일에 만들어지게 됩니다.

### echo 명령어

```bash
echo "A beautiful day !!" > [filename].txt
```

echo 명령어도 파일을 만들때 많이 사용하는 명령어로 내용을 파일에 넣으면서 만들 수 있다는 장점이 있습니다.

{% include base/components/link.html title='[Linux/리눅스] Bash echo로 파일 끝에 붙여쓰기' internal_link='/server/web/transactional-propagation' %}

만들어진 파일에 echo 명령어로 더 붙이고 싶으면 위 링크를 통해서 방법을 확인하실 수 있습니다.

### vi(vim) 편집기

```bash
vi [filename].txt

push button i for edit

test

esc // 편집모드 나가기
:wq // 저장 후 닫기
```

이 방법은 **vi** 편집기를 이용하는 방법입니다. 편집기로 파일을 생성하고 파일에 내용을 작성 후 저장을 하는 방식으로 가장 기본적이고 보편적인 방법입니다.

### nano 편집기

```bash
nano [filename].txt
```

`nano`의 경우도 vi와 같은 편집기입니다. 다만 저는 사용해본 적은 없지만 많은 사람들이 nano를 사용하는 것으로 알고 있습니다. 익숙해진다면 강력한 편집기라고 합니다.

## 맺음

이렇게 `bash`에서 파일을 만드는 4가지 방법에 대해서 알아보았습니다. 궁금하신 점이나 이상한 점은 댓글로 부탁드리겠습니다.

감사합니다.
