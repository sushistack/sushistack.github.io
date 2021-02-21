---
layout: post
published: true
title: Android license status unknown 에러
icon: android
description: >
  Android license status unknown 에러에 대해서 알아보고 해결하는 방법에 대해서도 알아보도록 하겠습니다.
author: deeplify
toc: true
permalink: /front-end/app/android-license-status-unknown
tags:
  - Android
  - license
  - license status
  - status unknown
---

맥에서 `Flutter`로 앱 개발을 시도하던 중 에러가 발생하여 이 에러에 대해서 소개하도록 하겠습니다. 저와 비슷하게 Flutter 설치하려고 하신다면 아래 링크를 통해서 플러터 설치하는 방법을 확인하실 수 있습니다.

{% include base/components/link.html title='맥에서 Flutter 설치하기' internal_link='/front-end/app/install-flutter-in-mac' %}

## Android license

Android license status unknown 에러가 발생했습니다. 저는 Intellij가 있어서 따로 안드로이드 스튜디오 없이 플러터 플러그인만 설치하여 개발을 진행하려고 했습니다. 하지만 안드로이드 라이센스가 없다는 에러가 발생하게 되었습니다.

### 에러 로그

`flutter doctor -v` 명령어를 실행했을 때, 분명히 ANDROID SDK 설치도 잘 되었고 `ANDROID_HOME` 등록도 잘 된것으로 보입니다. 하지만 다음과 같이 **✗ Android license status unknown.** 라는 메시지가 나오는 경우가 있습니다.

```bash
flutter doctor -v

...

[!] Android toolchain - develop for Android devices (Android SDK version 29.0.3)
    • Android SDK at /Users/~~~/Library/Android/sdk
    • Android NDK location not configured (optional; useful for native profiling support)
    • Platform android-29, build-tools 29.0.3
    • ANDROID_HOME = /Users/~~~/Library/Android/sdk
    • ANDROID_SDK_ROOT = /Users/~~~/Library/Android/sdk
    • Java binary at: /Applications/Android Studio.app/Contents/jre/jdk/Contents/Home/bin/java
    • Java version OpenJDK Runtime Environment (build 1.8.0_212-release-1586-b4-5784211)
    ✗ Android license status unknown.
      Try re-installing or updating your Android SDK Manager.
      See https://developer.android.com/studio/#downloads or visit https://flutter.dev/setup/#android-setup for detailed
      instructions.

...

```

### 에러가 발생한 이유는?

- JDK 버전이 맞지 않는 경우

{% include base/components/link.html title='Caused by: java.lang.ClassNotFoundException: javax.xml.bind.JAXBException 에러' internal_link='/back-end/java/jaxb' %}

위 링크에서 확인할 수 있는 내용으로 **JDK9**이상 부터 몇 가지 제외된 라이브러리가 있어, 클래스를 찾지 못해서 발생하는 에러입니다.

- SDK tool을 찾지 못하는 경우

```bash
flutter doctor --android-licenses

Android sdkmanager tool not found (/Users/~~~/Library/Android/sdk/tools/bin/sdkmanager).
Try re-installing or updating your Android SDK,
visit https://flutter.dev/setup/#android-setup for detailed instructions.

```

### 에러 해결 방법

해결 방법에는 두 가지가 있습니다. 만약 개별적으로 시도해보고도 안된다면 두 가지 방법 모두 적용하면 해결하는데 도움이 될 수 있습니다.

#### JDK 버전을 JDK8 로 변경

{% include base/components/link.html title='[mac/맥] JDK 설치, 환경설정 완벽 정리' internal_link='/back-end/java/install-and-setting-jdk-in-mac' %}

#### Android SDK Tools(Obsolete)을 설치

![open preferences](/assets/images/open-preferences-and-sdk.png)

- Preferences 윈도우(`⌘` + `,`) 열어줍니다. (Open Preferences window)
- 왼쪽 상단에 `Android SDK` 검색합니다. (search android sdk at left-top search input)

![search android SDK](/assets/images/search-and-sdk.png)

- `Android SDK` > `SDK Tools` 탭으로 이동합니다. (Move SDK Tools tab)

![SDK Tools](/assets/images/sdk-tools.png)

- 하단의 **Hide Obsolete Packages**를 체크 해제합니다.
- 저는 이미 다운로드한 상태이기 때문에 Android SDK Tools(Obsolete) 영역의 왼쪽에 다운로드 버튼이 없지만, 다운로드 버튼으로 해당 패키지를 다운로드 합니다.

결과를 확인해보면,

```bash
flutter doctor --android-licenses

[✓] Android toolchain - develop for Android devices (Android SDK version 29.0.3)
    • Android SDK at /Users/~~~/Library/Android/sdk
    • Android NDK location not configured (optional; useful for native profiling support)
    • Platform android-29, build-tools 29.0.3
    • ANDROID_HOME = /Users/~~~/Library/Android/sdk
    • ANDROID_SDK_ROOT = /Users/~~~/Library/Android/sdk
    • Java binary at: /Applications/Android Studio.app/Contents/jre/jdk/Contents/Home/bin/java
    • Java version OpenJDK Runtime Environment (build 1.8.0_212-release-1586-b4-5784211)
    • All Android licenses accepted.
```

### 맺음

android license status unknown 에러에 대해서 한 번 알아보았습니다. 혹시나 이상한 부분이나 궁금하신 점 있으시면 아래 댓글 부탁드리겠습니다.

감사합니다.
