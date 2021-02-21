---
layout: post
published: false
title: "[Linux/리눅스] Bash echo로 파일 끝에 붙여쓰기"
icon: bash
description: >
  Bash echo로 파일 끝에 붙여쓰는 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /server/bash/echo-append-file
tags:
  - bash
  - echo
  - append
  - end of file
---

Bash에서 `echo` 명령어를 사용하는 경우는 아래 두 가지 입니다.

1. 무엇인가를 출력하고 싶은 경우
2. 무엇인가를 출력하여 파일에 쓰고 싶은 경우

### 예제

```bash
echo "A beautiful day !!"
A beautiful day !!
```

또는 다음과 같이 파일 입력을 위해 사용합니다.

```bash
echo "A beautiful day !!" > days.txt

vi days.txt

in file

A beautiful day !!


```

그런데, 이 후에 다시 다음과 같이 명령어를 실행하면, 파일의 내용이 덮어 씌어지게 됩니다.

```bash
echo "A awesome day !!" > days.txt
```

만약 파일 뒤에 이어서 써지게 하고 싶다면 다음과 같이 해야합니다.

> 파일 뒤에 붙여쓰기 (append to end of file)

```bash
echo "A awesome day !!" >> days.txt
```

`>` to `>>` 바꿔주시기만 하면 됩니다.

간단하게 bash에서 echo로 파일 끝에 붙여쓰기에 대해서 알아보았습니다.

감사합니다.
