---
layout: post
published: false
title: Self hosted Github Actions Runner 설치 가이드
icon: github
description: >
  Self hosted Github Actions 설치하는 방법을 알아보도록 하겠습니다.
author: deeplify
toc: true
permalink: /tools/git/self-hosted-github-actions-runner-install-guide
tags:
  - git
  - github
  - github actions
  - actions
  - self-hosted
---

이번 포스팅에서는 Self hosted Github Actions Runner를 설치 하는 방법과 설치된 Actions Runner 위에서 실행되는 workflow를 만들어보고 실행해보는 시간을 가져 보겠습니다.

## Github 설정

> 환경
> 1. Github Enterprise를 사용 중입니다.
> 2. 권한은 Organization 어드민 권한입니다. (Enterprise Owers 아님)
> 3. Actions Runner가 설치될 서버의 OS는 Ubuntu 22.04 입니다.
> 4. Actions Runner는 Docker로 래핑하여 구성합니다.
> 5. 쿠버네티스는 사용하지 않고, docker-compose를 통해 단순 배포하는 형식으로 진행합니다.

### 1. github 설정

#### 러너 그룹 설정

우선 러너 그룹은 Enterprise에서만 사용 가능합니다. 러너들의 그룹을 설정하는 이유는 리소스 관리와 캐시의 사용성 등을 위함입니다. 예를 들어 java 빌드용 러너가 있을 수 있고, python 빌드용 러너가 있을 수 있습니다.

![gh-action-runner-01](/assets/images/gh-actions-runner-01.png)

위 사진과 같이 Orgaization의 설정으로 이동합니다.

![gh-action-runner-02](/assets/images/gh-actions-runner-02.png)

왼쪽 메뉴의 Actions > Runner Groups로 이동하여 `New runner group`을 눌러줍니다.

![gh-action-runner-03](/assets/images/gh-actions-runner-03.png)

러너 그룹 이름과 해당 그룹이 사용될 repository, workflow에 대한 접근 권한 설정을 할 수 있습니다.

#### 러너 생성

Self-hosted Runner 의 경우, github 설정 페이지를 통해서 생성할 수도 있고 PAT(Personal-Access-Token)을 이용하여 외부에서 설치하면서 연동할 수도 있습니다.

![gh-action-runner-04](/assets/images/gh-actions-runner-04.png)

위 사진과 같이 왼쪽 메뉴에서 Actions > Runners로 이동하여 `New runner`를 눌러줍니다.

![gh-action-runner-05](/assets/images/gh-actions-runner-05.png)

위와 같이 러너를 설치 가이드가 상세하게 작성되어 있습니다.

### 2. 외부에서 러너 설치 및 연동

> 사전 조건
> 1. 러너 그룹은 생성되어 있다고 가정합니다.
> 2. PAT(Personal-Access-Token)은 발급 받은 상태여야 합니다. (최소 admin:org, admin:enterprise 권한 필요)
> 3. 도커가 설치되어 있어야 합니다.

#### 도커 이미지 선택하기

{% include base/components/link.html title='actions/runner-images: GitHub Actions runner images' internal_link='https://github.com/actions/runner-images' %}

Github Actions에서 공식으로 제공하는 Runner 이미지 입니다. 위 레포지토리에서 필요한 이미지를 선택해서 다운 받아서 진행해도 무방합니다.

{% include base/components/link.html title='runner-images/images/ubuntu/Ubuntu2204-Readme.md at main · actions/runner-images' internal_link='https://github.com/actions/runner-images/blob/main/images/ubuntu/Ubuntu2204-Readme.md' %}

하지만 위 내용을 읽어보시면, 러너 이미지 내에 잘 사용하지도 않는 너무 많은 패키지들과 툴들이 설치되어 있어 저는 새롭게 Dockerfile을 만들어서 진행하도록 하겠습니다.

#### 커스텀 액션 러너 이미지 만들기 및 설치

##### Dockerfile

```Dockerfile
# Base Image
FROM ubuntu:22.04

# 기본 패키지 설치 & 그룹 및 유저 추가
RUN apt-get update -y && apt-get upgrade -y && useradd -m docker

# 패키지 설치
RUN DEBIAN_FRONTEND=noninteractive apt-get install -y \
    --no-install-recommends \
    curl \
    wget \
    unzip \
    jq \
    build-essential \
    libssl-dev \
    libffi-dev \
    ca-certificates \
    git \
    gnupg \
    gpg \
    locales \
    tzdata

# Locale 설정
RUN locale-gen en_US.UTF-8
ENV LC_ALL en_US.UTF-8

# Timezone 설정
ENV TZ=Asia/Seoul

# GitHub CLI 설치
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | gpg --dearmor -o /usr/share/keyrings/githubcli-archive-keyring.gpg;
RUN echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null;
RUN apt-get install -y gh

# Gradle 설치
ENV GRADLE_VERSION=8.7
ENV GRADLE_HOME=/opt/gradle
ENV PATH=$PATH:$GRADLE_HOME/bin
RUN curl -L https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip -o gradle-${GRADLE_VERSION}-bin.zip && \
   unzip -d /opt gradle-${GRADLE_VERSION}-bin.zip && \
   ln -s /opt/gradle-${GRADLE_VERSION} /opt/gradle && \
   rm gradle-${GRADLE_VERSION}-bin.zip

# Maven 다운로드 및 설치
ENV MAVEN_VERSION=3.9.6
ENV MAVEN_HOME /opt/maven
ENV PATH $MAVEN_HOME/bin:$PATH
RUN wget -q -O /tmp/apache-maven.zip https://dlcdn.apache.org/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.zip && \
   unzip -q /tmp/apache-maven.zip -d /opt && \
   ln -s /opt/apache-maven-${MAVEN_VERSION} /opt/maven && \
   rm -f /tmp/apache-maven.zip

# GitHub Actions Runner 다운로드 및 설치
ENV RUNNER_VERSION=2.315.0
RUN mkdir -p /home/docker/actions-runner && cd /home/docker/actions-runner && \
    curl -O -L https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz && \
    tar xzf /home/docker/actions-runner/actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz && ./bin/installdependencies.sh && \
    rm -rf /home/docker/actions-runner/actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz

# docker 디렉토리 소유주 변경
RUN cd /home && chown -R docker:docker docker

# copy over the entrypoint.sh script
COPY entrypoint.sh entrypoint.sh

# make the script executable
RUN chmod +x entrypoint.sh

# Set Host OS User
USER docker

# set the entrypoint to the entrypoint.sh script
ENTRYPOINT ["./entrypoint.sh"]
```

```sh
#!/bin/bash

GITHUB_HOST=$GITHUB_HOST                        # github.com / enterprise host
RUNNER_GROUP=$RUNNER_GROUP                      # ex) group-1
ORGANIZATION=$ORGANIZATION                      # ex) your organization
CONTAINER_NUM=$CONTAINER_NUM                    # ex) 1,2,3 ...
GITHUB_API_URI=$GITHUB_API_URI                  # ex) orgs, api/v3/orgs
GITHUB_API_HOST=$GITHUB_API_HOST                # ex) api.github.com
PERSONAL_ACCESS_TOKEN=$PERSONAL_ACCESS_TOKEN    # ex) ghp_xxx
GITHUB_API_URL="https://$GITHUB_API_HOST/$GITHUB_API_URI/$ORGANIZATION/actions/runners/registration-token"

# Github CLI Login
gh --version
echo $PERSONAL_ACCESS_TOKEN | gh auth login --hostname $GITHUB_HOST --with-token

# Getting registration token for action runner
RUNNER_REG_TOKEN=$(curl -sX POST -H "Accept: application/vnd.github+json" -H "Authorization: Bearer ${PERSONAL_ACCESS_TOKEN}" ${GITHUB_API_URL} | jq .token --raw-output)

echo "reg token := $RUNNER_REG_TOKEN"

cd /home/docker/actions-runner

./config.sh \
    --replace \
    --token ${RUNNER_REG_TOKEN} \
    --url https://${GITHUB_HOST}/${ORGANIZATION} \
    --name ${RUNNER_GROUP}-runner-${CONTAINER_NUM} \
    --runnergroup ${RUNNER_GROUP} \
    --labels ubuntu,${RUNNER_GROUP}

cleanup() {
    echo "Removing runner..."
    ./config.sh remove --unattended --token ${RUNNER_REG_TOKEN}
}

trap 'cleanup; exit 130' INT
trap 'cleanup; exit 143' TERM

./run.sh & wait $!
```

위와 같은 내용으로 필요한 것만 설치하여 Dockerfile을 생성했습니다.

```sh
# Dockerfile이 있는 위치로 이동 후
# Dockerfile과 entrypoint.sh가 같은 디렉토리에 있어야 합니다.
$ docker build -t <your-docker-hub-name>/github-actions-runner:1.0.0 .

# 빌드 완료 후, 이미지가 잘 만들어졌는지 확인.
$ docker images
REPOSITORY                                                     TAG         IMAGE ID       CREATED         SIZE
<your-docker-hub-name>/github-actions-runner                                 1.0.0       71667fbff8f4   1 days ago     1.9GB
```

위와 같이 빌드를 실행해줍니다.

##### docker-compose.yml

```yml
version: '3'

services:
  build-runner1:
    image: <your-docker-hub-name>/github-actions-runner:1.0.0
    restart: always
    volumes:
      - github-actions_runner-1:/home/docker/actions-runner
    logging:
      driver: 'json-file'
      options:
        max-size: '20m'
        max-file: '10'
    environment:
      - TZ=Asia/Seoul
      - GITHUB_HOST=<Your-Github-Enterprise-Host>
      - RUNNER_GROUP=build
      - ORGANIZATION=<Your-Organization>
      - CONTAINER_NUM=1
      - GITHUB_API_URI=api/v3/orgs
      - GITHUB_API_HOST=<Your-Github-Enterprise-Host>
      - PERSONAL_ACCESS_TOKEN=<Your-PAT>

volumes:
  github-actions_runner-1:
```

```sh
$ docker compose up
# docker compose up -d 데몬으로 실행
```

docker compose 파일을 위와 같이 생성한 뒤, compose 명령으로 해당 컨테이너를 띄워줍니다.

```
$ docker compose up
WARNING: Some services (runner) use the 'deploy' key, which will be ignored. Compose does not support 'deploy' configuration - use `docker stack deploy` to deploy to a swarm.
Recreating github-action-runner_runner_1 ... done
Attaching to github-action-runner_runner_1
runner_1  | --------------------------------------------------------------------------------
runner_1  | |        ____ _ _   _   _       _          _        _   _                      |
runner_1  | |       / ___(_) |_| | | |_   _| |__      / \   ___| |_(_) ___  _ __  ___      |
runner_1  | |      | |  _| | __| |_| | | | | '_ \    / _ \ / __| __| |/ _ \| '_ \/ __|     |
runner_1  | |      | |_| | | |_|  _  | |_| | |_) |  / ___ \ (__| |_| | (_) | | | \__ \     |
runner_1  | |       \____|_|\__|_| |_|\__,_|_.__/  /_/   \_\___|\__|_|\___/|_| |_|___/     |
runner_1  | |                                                                              |
runner_1  | |                       Self-hosted runner registration                        |
runner_1  | |                                                                              |
runner_1  | --------------------------------------------------------------------------------
runner_1  | 
runner_1  | # Authentication
runner_1  | 
runner_1  | 
runner_1  | √ Connected to GitHub
runner_1  | 
runner_1  | # Runner Registration
runner_1  | 
runner_1  | 
runner_1  | 
runner_1  | 
runner_1  | √ Runner successfully added
runner_1  | √ Runner connection is good
runner_1  | 
runner_1  | # Runner settings
runner_1  | 
runner_1  | Enter name of work folder: [press Enter for _work] 
runner_1  | √ Settings Saved.
runner_1  | 
runner_1  | 
runner_1  | √ Connected to GitHub
runner_1  | 
runner_1  | Current runner version: '2.315.0'
runner_1  | 2024-03-23 Listening for Jobs
```

compose 명령어 실행 시, 위 처럼 떳다면 러너가 정상적으로 설치 및 연결되었다는 의미 입니다.

![gh-action-runner-06](/assets/images/gh-actions-runner-06.png)

위 사진과 같이 설정 > Actions > Runners 로 이동하여 러너의 연결 상태 등을 확인 할 수 있습니다.

### 3. 간단한 workflow 작성

레파지토리 > Actions 탭 > New workflow로 이동하고, 1`setup a workflow yourself` 를 클릭하여 이동합니다.

```yml
name: Check Tools in Runner

on:
  # 사용자가 워크플로우를 수동으로 실행할 수 있도록 설정
  workflow_dispatch:

jobs:
  check-tools:
    runs-on:
      group: build
    steps:
      # $GITHUB_WORKSPACE 밑의 레파지토리로 접근이 가능하도록 체크아웃
      - uses: actions/checkout@v4
      # Java 설정
      - uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'
      - name: print java default version
        run: java --version
      - name: print maven version
        run: mvn --version
      - name: print gradle version
        run: gradle --version
      - name: print git version
        run: git --version
      - name: print gh version
        run: gh --version
```

위 내용을 넣고, 다시 Actions 탭으로 이동하면 왼쪽 탭에 해당 `Check Tools in Runner` 라는 메뉴를 클릭합니다.

오른쪽에 Run workflow 를 이용하여 해당 workflow를 실행할 수 있습니다.

## 맺음

Github Actions Self-hosted Runner 를 설치해보고 해당 러너에서 workflow를 실행 시켜보는 예제를 소개해드렸습니다. 혹시 궁금한 점이 있으시면 댓글 부탁드리겠습니다.
