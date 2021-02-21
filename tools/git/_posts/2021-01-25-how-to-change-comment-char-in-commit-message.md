---
layout: post
published: true
title: "[Git/깃] 커밋 메시지의 주석문자 변경으로 #(Hash) 사용 하는 방법"
icon: github
description: >
  "깃 커밋 메시지에서 주석문자를 변경하여 Hash 또는 Sharp를 사용할 수 있는 방법에 대해서 소개합니다."
author: deeplify
toc: true
permalink: /tools/git/how-to-change-comment-char-in-commit-message
tags:
  - git
  - hash
  - hash mark
  - sharp mark
  - comment message
  - 주석
  - 주석 문자 변경
---

깃은 개발코드의 버전 관리 툴로 많은 개발자들에게 사랑받고 있습니다. 개발자라면 아주 극소수를 제외하고 모두 깃을 사용하는 방법을 익히고 실전에서 사용하고 있을 것입니다.

이번 글에서는 깃 커밋 메시지 사용에 있어서 불편하다고 느꼈던 커밋 메시지 **주석 문자**에 대해서 소개해드리려고 합니다.

## 깃 커밋 메시지 주석 문자 변경 하는 방법

깃(Git)은 커맨드라인 기반으로 커밋 메시지와 함께 커밋을 생성할 수 있습니다.

```bash
git commit
```

위와 같이 커밋을 하게 되면 보통 기본으로 설정되어 있는 vi 에디터가 켜지고, 그 곳에서 메시지를 작성할 수 있습니다.

### 커밋 메시지

```bash
# 제목

## 부제목

### 내용

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch master
# ...
# Changes to be committed:
#       new file: xxx
#
```

하지만 위 코드와 같이 vi 에디터는, 기본적으로 주석 문자열 (comment character)가 `#(Hash)`로 결정이 되어 있기 때문에 입니다.

{% include base/components/hint-box.html type='info' text='#(Hash)를 안쓰면 된다고 생각하실 수도 있지만, 깃허브에서는 마크업 언어로 마크다운을 사용하기 때문에 #(Hash)가 없으면 정상적인 마크다운 메시지를 작성할 수 없습니다.' %}

```text
Aborting commit due to empty commit message.
```

```text
int: Waiting for your editor to close the file... error: There was a problem with the editor 'vi'.
Please supply the message using either -m or -F option.
```

위에서 작성한 커밋 메시지를 저장하면, 위와 같이 메시지가 비어있어서 안된다거나 에디터에서 문제가 발생했다는 등의 경고성 문구를 보실 수 있습니다.

### 주석문자 변경

다행이도 Git에서는 위에서 언급했던 `#(Hash)`문자를 사용할 수 있도록 주석 문자를 변경하는 기능을 제공하고 있습니다. 이제부터 그 방법을 소개해드리겠습니다.

#### config 명령어 사용

```bash
git config --global core.commentChar ";"
```

가장 간단한 방법으로 위 명령어를 사용하시면, 주석으로 사용되는 문자가 `#`에서 `;`으로 변경됩니다.

##### 결과

```bash
git commit
```

```bash

; Please enter the commit message for your changes. Lines starting
; with ';' will be ignored, and an empty message aborts the commit.
;
; On branch master
; ...
; Changes to be committed:
;       new file: xxx
;
```

커밋 명령어를 실행하면 위 처럼 주석 문자가 바뀐 것을 확인하실 수 있습니다.

#### config 파일에서 추가

만약 주석문자가 변경 되지 않는 경우, `.gitconfig` 파일을 확인해서 설정이 정상적으로 되어 있는지 확인해보시면 됩니다.

```bash
git ~/.gitconfig
```

깃 설정 파일을 엽니다.

```diff
# .gitconfig 파일

[alias]
  co = checkout
  ci = commit
  st = status
  br = branch
+ [core]
+   commentChar = ";"

[user]
  name = {username}
  email = {user@github.com}
```

설정 파일내에 `[core]` 섹션의 **commentChar**가 정상적으로 설정되어 있는지 확인

## 맺음

간단하게 깃 커밋 메시지 주석 문자 변경 하는 방법에 대해서 소개해드렸습니다. 혹시 궁금하신 점이나 이상한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
