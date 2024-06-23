---
layout: post
published: true
title: Github CLI
icon: github
description: >
  Github CLI에 대해서 알아보겠습니다.
author: deeplify
toc: true
permalink: /tools/git/github-cli
tags:
  - git
  - github
  - cli
---

![github-cli01](/assets/images/github-cli01.png)

 > GitHub와의 상호작용을 커맨드라인에서 사용할 수 있게 해주는 도구.

## Github CLI 특징

- github cli는 hub 라는 command line tool로 시작해서, 2019년에 github cli 공식화 되었음.
- github cli는 내부적으로 github API를 사용하도록 구현되어 있음.
- github cli는 go 언어로 작성 됨.

### Github CLI 명령어 예제

```sh
gh repo create      # 레포지토리 생성
gh pr create        # PR 생성
```

Github CLI Manual > 명령어 전체 확인 가능

## Github CLI 사용해보기
  
### 1. 설치

```sh
brew install gh
```

![github-cli02](/assets/images/github-cli02.png)

![github-cli03](/assets/images/github-cli03.png)

 or

[GitHub CLI](https://cli.github.com/)

### 2. 로그인

1. 로그인 명령어

```sh
$ gh auth login
```

2. github 서버 선택

? What account do you want to log into?  [Use arrows to move, type to filter]
> GitHub.com
  GitHub Enterprise Server

![github-cli04](/assets/images/github-cli04.png)

```sh
 2-1) github hostname 입력 (Enterprise Only)

? What account do you want to log into? GitHub Enterprise Server
? GHE hostname: github.nhnent.com
```

3. 사용할 프로토콜 선택

```
? What is your preferred protocol for Git operations?  [Use arrows to move, type to filter]
  HTTPS
> SSH
```

![github-cli05](/assets/images/github-cli05.png)

4. 인증 방법 선택

```sh
? How would you like to authenticate GitHub CLI?  [Use arrows to move, type to filter]
  Login with a web browser
> Paste an authentication token
```

![github-cli06](/assets/images/github-cli06.png)

![github-cli07](/assets/images/github-cli07.png)

![github-cli08](/assets/images/github-cli08.png)

![github-cli09](/assets/images/github-cli09.png)

5. github cli 인증 정보 확인

```sh
$ gh auth status

github.com
✓ Logged in to github.com as (keyring)
✓ Git operations for github.com configured to use ssh protocol.
✓ Token: ghp_************************************
✓ Token scopes: admin:enterprise, admin:gpg_key, admin:org, admin:org_hook, admin:public_key, admin:repo_hook, admin:ssh_signing_key, audit_log, codespace, delete:packages, delete_repo, gist, notifications, project, repo, user, workflow, write:discussion, write:packages
```

![github-cli10](/assets/images/github-cli10.png)

### 3. 명령어 사용하기

#### Repository 관련 명령어

```sh
$ gh repo [create|fork|clone]
```

##### 레포지토리 생성 예제

```sh
$ gh repo create github-cli-tutorial # 레포지토리 생성
$ gh repo clone s~/github-cli-tutorial # 클론 (git clone 동일)
```

![github-cli11](/assets/images/github-cli11.png)

- 빈 프로젝트에 README.md 생성 (main 브랜치)

```md
# This is a Gihub CLI Tutorial
```

![github-cli12](/assets/images/github-cli12.png)

#### 2. Issue 관련 명령어

```sh
$ gh issue [create|close|reopen|status|list]
$ gh issue list --[assignee|author|label|state|web]
$ gh issue view [number|url]
```

##### 이슈 생성 예제

```sh
$ cd github-cli-tutorial
$ gh issue create
```

![github-cli13](/assets/images/github-cli13.png)

![github-cli14](/assets/images/github-cli14.png)

```sh
$ gh issue list
```

![github-cli15](/assets/images/github-cli15.png)

```sh
$ gh issue view 1
```

![github-cli16](/assets/images/github-cli16.png)

#### 3. Pull Request 관련 명령어

```sh
$ gh pr [create|list|close|status|edit|checkout|...]
```

##### PR 생성 예제

1. 새로운 브랜치 생성

```sh
$ git checkout -b feature#1
```

2. README .md 를 아래와 같이 수정

```diff

# This is a Gihub CLI Tutorial

- 안녕하세요.
```

 3. PR 생성하기

```sh
$ git add .
$ git commit -m "add text to README.md"

$ gh pr create
```

![github-cli17](/assets/images/github-cli17.png)

![github-cli18](/assets/images/github-cli18.png)

##### PR 리뷰 예제

![github-cli19](/assets/images/github-cli19.png)

1. PR 리스트 조회

```sh
$ gh pr list

Showing 1 of 1 open pull request in s~/github-cli-tutorial

# 5  README.md 내용 추가  feature#1  about 12 days ago
```

2. pr 브랜치로 바로 checkout 하기

```sh
$ gh pr checkout feature#1
```

![github-cli20](/assets/images/github-cli20.png)

3. pr 리뷰 완료하기

```sh
$ gh pr review --comment --body "2번째 라인 수정이 필요합니다."
$ gh pr review --approve
```

## 그래서 어디에 쓰지?

위에서 한 작업들은 그냥 웹이나 IDE에서 하면 더 직관적이고 편할 것 같은데... 굳이 CLI로?

### 장점을 뽑아보자면

 1. 브라우저, 깃 GUI 툴, IDE 간의 전환 필요 없이 개발이 가능하다.
 2. issue나 pr등 github API에서 제공하는 기능들을 간단한 명령어로 사용 가능하도록 해준다.
  => 기존 github API 라이브러리 or 모듈을 사용하여 개발하는 것보다 심플하게 개발 가능.

### 유용할 것 같은 케이스

#### 간단한 자동화 예제

 1. PR 생성 시, 자동으로 라벨을 붙여주는 기능
 2. 오래된 PR들을 조회하여 주기적으로 알림 전송

#### 준비물

- Github CLI
- Github Action (github에서 공식적으로 제공하는 CI/CD 툴, jenkins 등으로 대체 가능)

#### 1. PR 생성 시, 자동으로 라벨을 붙여주는 기능

```
$ cd ~/github-cli-tutorial
$ vi .github/workflows/auto_pr_labeling.yml
```

```yaml
 name: 자동 PR 라벨 추가

 on:
   pull_request:
     branches: [main]
     types:
       - opened

 jobs:
   auto_pr_labeling_job:
     runs-on: ubuntu-latest

     steps:
       - name: 레포지토리 체크아웃
         uses: actions/checkout@v2
 
       - name: PR 조회 및 라벨 추가하기
         run: |
           label="work-in-process"
           # 1. 라벨 생성
           gh label list -S $label 2>/dev/null || gh label create $label --color FFA500 --description "This PR is a work in process"
           # 2. PR 조회 후, 라벨 달아주기
           pr_numbers=$(gh pr list --json number --search "is:pr is:open -label:work-in-process" | jq -r '.[].number')
           for pr_number in $pr_numbers; do
             gh pr edit $pr_number --add-label $label
           done
         env:
           GH_TOKEN: ${{ secrets.CUSTOM_GH_TOKEN }}
```

![github-cli21](/assets/images/github-cli21.png)

<br> <br>

#### 2. 오래된 PR들을 조회하여 주기적으로 알림 전송

```yaml
 name: 오래된 PR 알림

 on:
   schedule:
     - cron: '0 0 ** *'  # 매일 자정마다 실행

# 수동 실행

# on: [workflow_dispatch]

 jobs:
   stale_pr_notification_job:
     runs-on: ubuntu-latest

     steps:
       - name: 레포지토리 체크아웃
         uses: actions/checkout@v2
 
       - name: 오래된_PR_가져오기
         id: get_stale_prs
         run: |
           stale_prs=$(gh pr list --state open --json number --jq ".[] | select(.updated_at < (now - 30*24*60*60)) | .number")
           echo "::set-output name=stale_prs::$stale_prs"
         env:
           GH_TOKEN: ${{ secrets.CUSTOM_GH_TOKEN }}
 
       - name: Slack 알림 전송
         uses: rtCamp/action-slack-notify@v2
         env:
           SLACK_CHANNEL: github-workflows
           SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK_URL }}
           SLACK_TITLE: 'Stale PR'
           SLACK_MESSAGE: '생성된지 오래된 PR이 있습니다: ${{ steps.get_stale_prs.outputs.stale_prs }}'
           SLACK_USERNAME: 'GITHUB'
```

![github-cli22](/assets/images/github-cli22.png)

#### 그외

- 특정 시간에 PR 자동 승인, 머지, 클로즈 하도록 하는 기능
- 소나큐브 연동

등등 아이디어만 있으면 여러가지를 적용해 볼 수 있다.

### Extensions

```sh
$ gh extension browse
```

![github-cli23](/assets/images/github-cli23.png)

### 예제: gh-ls

```sh
$ gh extension install wuwe1/gh-ls
$ gh ls -R ~/github-cli-tutorial
```

![github-cli24](/assets/images/github-cli24.png)

## 결론

 > Github CLI라는 도구가 있고, 이를 이용하여 Github와 Github API 등과 관련된 작업을 쉽게 할 수 있다.

## 참고

{% include base/components/link.html title='GitHub CLI | Take GitHub to the command line' internal_link='https://cli.github.com' %}

{% include base/components/link.html title='GitHub - cli/cli: GitHub\'s official command line tool' internal_link='https://github.com/cli/cli' %}

{% include base/components/link.html title='GitHub - wuwe1/gh-ls: List contents of GitHub repo' internal_link='https://github.com/wuwe1/gh-ls' %}

{% include base/components/link.html title='GitHub 공식 CLI gh :: Outsider\'s Dev Story' internal_link='https://blog.outsider.ne.kr/1498' %}
