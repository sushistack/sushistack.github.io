---
layout: post
published: false
title: SonarQube Community 버전 설치 및 설정 가이드 (With. Docker)
icon: github
description: >
  엔터프라이즈 Github Actions에서 실행 가능한 SonarQube 설치 및 설정 방법을 소개합니다.
author: deeplify
toc: true
permalink: /tools/git/sonaqube-install-guide
tags:
  - sonar
  - sonarqube
  - github actions
---

SonarQube는 소프트웨어 품질을 관리하고 코드 분석을 자동화하기 위한 오픈 소스 플랫폼입니다. 다양한 프로그래밍 언어에 대해 정적 코드 분석을 수행하여 코드 품질을 측정하고 향상시킬 수 있는 도구입니다. 

SonarQube는 코드베이스의 결함, 버그, 코드 스멜 등을 찾아내고 이를 수정할 수 있도록 돕습니다. 주요 기능과 이점은 아래와 같습니다.


> 주요 기능
> 1. 정적 코드 분석: SonarQube는 다양한 프로그래밍 언어에 대해 정적 코드 분석을 수행하여 코드의 결함, 버그, 보안 취약점, 코드 냄새 등을 식별합니다.
> 2. 품질 게이트: 프로젝트의 품질 상태를 평가하고 특정 조건을 만족하지 않는 경우 빌드를 실패시키는 품질 게이트를 설정할 수 있습니다.
> 3. 코드 커버리지: 테스트 커버리지를 측정하여 코드베이스의 어느 부분이 테스트되지 않았는지 확인할 수 있습니다.
> 4. 지속적인 통합(CI) 및 지속적인 배포(CD)와의 통합: Github Actions, Jenkins, GitLab CI, Travis CI 등과 통합하여 지속적인 통합 및 배포 파이프라인에 코드 분석을 포함시킬 수 있습니다.
> 5. 개발자 피드백: 코드 분석 결과를 개발자에게 피드백으로 제공하여 코드 품질을 개선할 수 있습니다.
> 6. 다양한 언어 지원: Java, JavaScript, TypeScript, C#, Python, C/C++, PHP 등 다양한 프로그래밍 언어를 지원합니다.

<br>

> 주요 이점
> 1. 코드 품질 향상: SonarQube는 코드의 결함과 보안 취약점을 식별하여 코드 품질을 향상시킬 수 있습니다.
> 2. 비용 절감: 코드의 결함을 조기에 발견하고 수정함으로써 나중에 발생할 수 있는 유지보수 비용을 절감할 수 있습니다.
> 3. 개발 효율성 증대: 개발자에게 실시간으로 피드백을 제공하여 코드 작성 시점에서 품질 문제를 해결할 수 있습니다.
> 4. 규정 준수: 코드 품질 표준을 준수하고, 규정 준수 보고서를 생성하여 규정 준수를 증명할 수 있습니다.


## SonarQube 다운로드 및 설치

{% include base/components/link.html title='Download | SonarQube | Sonar' internal_link='https://www.sonarsource.com/products/sonarqube/downloads' %}

{% include base/components/link.html title='Try out SonarQube' internal_link='https://docs.sonarsource.com/sonarqube/10.3/try-out-sonarqube' %}

위 링크를 통해 SonarQube를 다운로드 및 설치 가이드를 확인하실 수 있습니다.

## SonarQube Pricing & Overview

![sonarqube-01](/assets/images/sonarqube-01.jpg)

소나큐브를 정식으로 사용하려면 위 처럼 Develop Edition 이상의 플랜을 구독해야합니다. 다행이도 가장 왼쪽의 Community Edition을 이용하면 라이센스 이슈 없이 소나 큐브를 이용할 수 있습니다.

단, SonarQube Community Edition의 경우, 1개의 브랜치(main)에 대해서만 분석을 할 수 있는 제한이 있습니다.

하지만 제가 원하는 것은 Community Edition 사용으로 라이센스 이슈는 피하면서 멀티 브랜치 및 Pull Request 분석까지 가능한 Sonarqube 입니다.

## Branch Plugin (for Community Edition)

{% include base/components/link.html title='mc1arke/sonarqube-community-branch-plugin' internal_link='https://github.com/mc1arke/sonarqube-community-branch-plugin' %}

위 레포지토리는 Sonarqube Community 버전에서 멀티 브랜치 및 PR 분석을 할 수 있게 해주는 플러그인입니다. 글 작성 기준으로는 Sonarqube 10.3 버전과 해당 플러그인 1.18.0 버전이 호환되는 것으로 확인 됩니다.

## SonarQube Community Edition + Branch plugin 설치 및 적용

모든 준비물이 준비되었으니 이제부터 SonarQube를 설치를 진행해보도록 하겠습니다.

> 사전 조건
> 1. 소나큐브가 설치될 서버가 있어야합니다. (저는 Ubuntu 22.04)
> 2. 도커가 설치되어 있어야합니다.
> 3. Github와 연동을 진행할 것이므로 PAT(Personal-Access-Token)이 필요합니다.
> 4. Github Actions에 대한 기초 지식이 필요합니다.
