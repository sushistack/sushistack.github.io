---
layout: post
published: true
title: "[Linux/리눅스] Shell 실행 파일 만드는 방법 및 예제"
icon: bash
description: >
  리눅스 환경에서 Shell 스크립트로 실행파일을 만드는 방법을 예제를 통해 소개합니다.
author: deeplify
toc: true
permalink: /server/bash/create-execute-file-in-linux
tags:
  - linux
  - 실행파일
  - shell
  - shell script
  - 쉘 스크립트
  - shell file
---

많은 개발자들이 리눅스를 다룰 것이라고 생각합니다. 저 또한 리눅스를 꾸준히 써오고 있고, 터미널에서 명령어를 입력하여 실행하는 것은 유용하다고 생각하고 있습니다.

명령어를 입력해서 어떤 작업을 진행하는 것은 쉽지만, 약간의 응용이 필요한 경우 **쉘 스크립트**를 작성하는 것이 훨씬 편한 경우가 자주 있습니다.

이번 글에서는 쉘 스크립트를 작성하여 여러가지 명령어를 한 번에 처리하는 방법을 소개해드리도록 하겠습니다.

## Shell 실행 파일 만드는 방법

리눅스 CLI 환경에서 Shell script를 만드는 방법은 굉장히 간단합니다. 실행 스크립트 파일을 만들고 실행될 수 있도록 권한을 부여하기만 하면됩니다.

{% include base/components/link.html title='[Linux/리눅스] Bash 파일 생성 하는 법' internal_link='/server/bash/bash-create-file' %}

혹시 파일을 만드는 방법을 모르신다면 위 링크를 통해서 파일 만드는 방법을 배우실 수 있습니다.

### 실행 파일 만들기 (Shell script)

- 새 파일 만들기

```bash
vi test.sh
```

- 파일 내용에 명령어 추가

```bash
#!/bin/bash

ls
clear
```

> 1. vi 편집기로 새 파일을 생성합니다.
> 2. 새 파일 내용 최 상단에 `#!/bin/bash` 라인을 추가합니다.
> 3. 원하는 명령어를 추가해줍니다.

저의 경우 `ls`와 `clear` 명령어를 작성한 뒤 저장해주었습니다.

### 실행 권한 부여하기

일반적으로 vi 편집기를 통해서 만들어진 파일은 실행권한이 없습니다. 따라서 해당 파일을 실행할 수 있도록 실행권한을 부여해주어야합니다.

```bash
chmod +x test.sh
```

위 명령어를 통해서 `test.sh` 파일에 실행권한을 부여할 수 있습니다.

#### 실행 권한 변경 전후 비교

```bash
# 변경 전
-rw-r--r--  1 user  user     5B Jan 01 00:00 test.sh

# 변경 후
-rwxr-xr-x  1 user  user     5B Jan 01 00:01 test.sh
```

#### 실행 예제

```bash
./test.sh

bash test.sh
```

만들어진 실행가능한 스크립트를 실행하려면 파일이 있는 위치에서 위 처럼 명령어를 입력해주시면 됩니다. 위 두 가지 방법 모두 실행 가능합니다.

### 맺음

이렇게 간단하게 **리눅스 환경에서 실행파일을 만드는 방법**에 대해서 예제를 통해 소개해드렸습니다. 다음에는 shell 스크립트 작성하는 방법에 대해서 조금씩 소개해드리려고 합니다.

혹시 본문 내용에 이상한 점이나 궁금하신 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
