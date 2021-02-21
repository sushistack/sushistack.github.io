---
layout: post
published: true
title: 깃 태그 생성하는 3 가지 방법
icon: github
description: >
  깃 태그 생성를 생성하는 3 가지 방법에 대해서 여러 방법에 대해서 알아보겠습니다.
author: deeplify
toc: true
permalink: /tools/git/create-tag
tags:
  - git
  - github
  - create tag
  - 깃
  - 깃허브
---

깃허브 또는 깃을 사용하다보면, 태그를 생성하고 싶은 경우가 있습니다. 예를 들어 현재 브랜치에 뭔가를 강력하게 표시하고 싶을 때 라던가 브랜치를 통해서 무엇인가를 식별하려고 할 때 등 다양하게 사용될 수 있습니다.

## 깃 태그 생성하는 3 가지 방법

이 글에서는 깃 태그 생성하는 3가지 방법에 대해서 알아보도록 하겠습니다.

> 깃 태그 생성하는 3가지 방법
> 1. 깃 커맨드 라인
> 2. 소스 트리
> 3. 깃허브 웹페이지 인터페이스

### 깃 커맨드 라인

제가 생각하는 가장 간단한 방법입니다.

현재 브랜치에서 다음과 같이 명령어를 입력해줍니다.

```bash
git tag <tag-name>
```

만약 태그에 추가적인 설명을 넣고 싶다면, 다음과 같이 anotated tag를 생성하는 명령어를 사용합니다.

```bash
git tag <tag-name> -a
```

만들어진 태그를 확인하고 싶다면, 다음과 같은 명령어를 사용합니다.

```bash
git tag
```

태그 전체를 리모트 저장소에 푸시하려면, 다음과 같은 명령어를 사용합니다.

```bash
git push origin --tags
```

특정 태그 1개만 리모트 저장소에 푸시하려면, 다음과 같은 명령어를 사용합니다.

```bash
git push origin <tag-name>
```

### 소스 트리

![source tree](/assets/images/source-tree.png)

1. 소스 트리에서 **Tags** 영역에 오른쪽 버튼을 클릭합니다.
2. `New Tag..`를 클릭합니다.

![create tag](/assets/images/source-tree-tag.png)

1. 태그 이름을 입력합니다.
2. 만약 태그를 생성함과 동시에 리모트 저장소에 푸시하고 싶다면 `push tag`를 체크합니다.
3. **Add**버튼으로 태그를 생성합니다.

### 깃허브 웹 페이지 인터페이스

![github page](/assets/images/github-release.png)

- 깃허브 메인 페이지에서 **releases**를 클릭합니다.

![github page](/assets/images/github-draft-release.png)

- **Draft a new release** 버튼을 클릭합니다.

![github page](/assets/images/github-release-new.png)

1. 새로운 릴리즈를 생성하기 위해 모든 칸을 다 채우고, **Publish release** 버튼을 클릭 합니다.
2. 로컬 저장소에 가져와 확인하고 싶다면 다음과 같은 명령어를 사용하여 로컬 저장소에 가져옵니다.

```bash
git fetch
```

## 맺음

**깃 태그 생성하는 3 가지 방법**에 대해서 알아보았습니다. 혹시 궁금하신 점이나 이상한 점이 있으시다면 댓글 부탁드리겠습니다.

감사합니다.
