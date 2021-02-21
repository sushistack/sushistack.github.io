---
layout: post
published: true
title: "[Github/깃허브] 리모트에 강제로 푸시하기"
icon: github
description: >
  깃허브 리모트에 강제로 푸시하는 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /tools/git/force-push
tags:
  - git
  - github
  - force push
  - 깃
  - 깃허브
---

깃허브 리모트 서버에 강제로 푸시해야하는 경우가 간혹 발생합니다. 예를 들어 리버트나 리셋을 해야하는 경우가 있습니다.

## 깃허브 리모트에 강제로 푸시하기

저의 경우는 리셋을 통해서 특정 브랜치의 커밋을 하나 이전 커밋으로 돌리고 싶었습니다. 제가 명령을 실행한 순서대로 적어보겠습니다.

> 리모트의 브랜치를 로컬에서 리셋하기.

1. 리모트(remote)에서 로컬로 `git pull origin <branch name>` 명령을 통해 로컬브랜치에 내려 받습니다.
2. `git reset --hard HEAD~` 명령으로 이전 커밋으로 변경합니다.
3. 다시 `git push origin <branch name>` 명령으로 리모트 서버에 업데이트를 시도합니다.

하지만 다음과 같은 에러가 발생합니다.

```text
! [rejected]        <branch name> -> <branch name> (non-fast-forward)

error: failed to push some refs to 'https://github.com/xxxx/xxx.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g. hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

`push` 명령이 거절된 이유는 리모트 브랜치의 커밋 타임이 로컬 브랜치의 있는 커밋 타임보다 최신이기 때문입니다.
따라서 다시 `git pull ...` 명령을 통해 최신화 시키라는 의미입니다.

하지만 저의 의도는 커밋을 이전으로 돌리는 것이 목적이었기 때문에 강제로 `push`를 하고 싶습니다.

### 강제로 push 하기

```bash
git --force push origin <branch name>
```

위와 같은 명령을 실행하면, 강제로 리모트 서버에 `push`할 수 있습니다.

## 맺음

간단하지만 계속 까먹는 명령어 옵션인 `--force`에 대해서 알아보았습니다. 혹시 궁금하신 점이나 이상한 점이 있다면 댓글 부탁드리겠습니다.

감사합니다.
