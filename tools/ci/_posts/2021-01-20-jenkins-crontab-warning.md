---
layout: post
published: true
title: "[Jenkin/젠킨스] Spread load evenly by using rather than"
icon: jenkins
description: >
  spread load evenly by using rather than 경고가 언제 발생하는지 알아보고 해결 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /tools/ci/jenkins-crontab-warning
tags:
  - ci
  - jenkins
  - crontab
  - 젠킨스 
  - 크론탭
---

젠킨스는 소프트웨어 개발시 지속적인 통합(Continuous Integration)을 할 수 있도록 도와주는 대표적인 툴입니다. 젠킨스가 등장하고 기능과 UI 등에 많은 변화가 있었지만, 핵심적인 설정들은 변하지 않고 유지되고 있습니다.

이번 글에서는 젠킨스의 `빌드 유발(Build Triggers)` 설정할 때 발생할 수 있는 경고문구에 대해서 알아보고 경고문구가 발생하지 않도록 해결하는 방법까지 소개하도록 하겠습니다.

## Spread load evenly by using rather than

다양한 빌드 유발을 설정할 수 있지만, 일반적으로 가장 많이 사용되는 설정은 아무래도 `주기적으로 빌드 (Build Periodically)`를 많이 사용하는 것 같습니다.

### 주기적으로 빌드 (Build Periodically)

![build periodically in jenkins](/assets/images/jenkins-crontab-warning01.jpg)

저는 매시 30분마다 배치성 어플리케이션이 동작하기를 원했기 때문에 크론탭 표현식 `30 */1 * * *`으로 스케쥴 값을 세팅하려고 시도했습니다.

![build periodically in jenkins](/assets/images/jenkins-crontab-warning02.jpg)

위 사진과 같이 표현식을 입력해주니 `Spread load evenly by using "H */1 * * *" rather than "30 */1 * * *"`이라는 경고성 멘트가 하단에 표시되었습니다.

### 경고 멘트가 표시되는 이유는?

예를 들어, 젠킨스에 매일 00시에 동작하는 작업(Job)이 12개가 등록이 되어 있는 경우, 매일 00시마다 동시에 12개 작업이 각각 시작되면서 부하가 발생하게 될 것입니다.

하지만 12개의 작업 대부분이 꼭 00시 정각에 동작해야하는 경우가 많을까요?

젠킨스에서는 이러한 필요없는 부하를 발생시키는 것을 제거하기 위해서 표현식에 Hash 값을 사용할 수 있도록 제공하고 있습니다.

> 매일 00시 동작 크론 표현식
> - `0 0 * * *`
> - `H H * * *`

위 크론 표현식 중 Hash 값으로 표현된 크론 표현식을 사용하면 젠킨스에서 작업을 적절하게 분배하여 동작시켜주게 됩니다.

{% include base/components/hint-box.html type='info' text='"H(1-10) * * * *"와 같이 해시값에 기간을 줄 수도 있습니다. (1 ~ 10분 사이에서 동작)' %}

![build periodically in jenkins](/assets/images/jenkins-crontab-warning03.jpg)

저 같은 경우, 매일 30분에는 꼭 동작해야하기 때문에 위와같이 설정해주었습니다.

경고 얼럿이 사라진 것을 보실 수가 있습니다.

## 맺음

이번 글에서는 간단하게 `Spread load evenly by using rather than` 경고가 왜 발생하는지 알아보았고, 어떤식으로 경고를 해결할 수 있는지 알아보았습니다.

혹시 궁금한 점이나 이상한 점이 있으면 댓글 부탁드리겠습니다.

감사합니다.
