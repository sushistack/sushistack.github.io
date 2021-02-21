---
layout: post
published: true
title: 파이썬 버전 확인
icon: bash
description: >
  mac 또는 windows에서 파이썬 버전 확인하는 방법에 대해서 알아봅니다.
author: deeplify
toc: true
permalink: /server/bash/check-python-version
tags:
  - python
  - check version
  - python version
  - 파이썬 버전
---

맥(macOS) 또는 윈도우(windows) 환경에서 각각 설치된 파이썬의 버전을 확인하는 방법에 대해서 알아보겠습니다. 설치되지 않은 경우 설치 후, 확인할 수 있습니다.

## 파이썬 버전 확인

파이썬 버전을 확인하는 방법을 맥과 윈도우 각각의 환경에서 파이썬이 설치되어 있는 경우와 아닌 경우로 나누어서 소개해드리도록 하겠습니다.

### 파이썬이 설치된 경우

> 맥 (macOS) & 윈도우 (windows)

```bash
python --version
```

### 파이썬이 설치되지 않은 경우

> 맥 (macOS)

맥에서는 기본적으로 `Python 2.7.x` 버전이 설치되어 있습니다.

하지만 파이썬2의 경우, 더 이상 유지보수 되고있지 않습니다. 따라서 **Homebrew**라는 맥 전용 패키지 매니저를 통해서 파이썬 2.7.x를 파이썬 3.8.x대로 업그레이드 해주어야합니다. (python 2.7.x to pyton 3.8.x)

- Homebrew 설치

아래 링크를 통해서 Homebrew를 설치해줍니다.

{% include base/components/link.html title='The Missing Package Manager for macOS (or Linux) — Homebrew' internal_link='https://brew.sh' %}

- 파이썬 업그레이드

```bash
brew update && brew upgrade python
```

> 윈도우 (windows)

- 파이썬 3.8.x 다운로드

아래 링크를 통해서 파이썬을 다운 받으실 수 있습니다.

{% include base/components/link.html title='Download Python | Python.org' internal_link='https://www.python.org/downloads' %}

설치를 완료한 이후에 다시 버전 확인 명령어를 입력하여 확인 하시면 됩니다.

## 맺음

간단하게 맥 (macOS) 또는 윈도우 (windows) 환경에서 각각 파이썬 버전을 확인하는 방법에 대해서 알아보았습니다. 궁금하신 점이나 이상한 점 있으시면 아래 댓글 부탁드리겠습니다.
