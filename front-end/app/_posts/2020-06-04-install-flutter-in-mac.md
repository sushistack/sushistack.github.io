---
layout: post
published: false
title: 맥에서 Flutter 설치하기
icon: flutter
description: >
  맥에서 Flutter 설치하는 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /front-end/app/install-flutter-in-mac
tags:
  - flutter
  - install flutter
  - mac
---

언젠가 앱개발을 AOS/IOS 둘 동시에 개발하는 앱이 개발되지 않을까 생각했는데, 역시 `Google`이 또 만들어 냈네요. 오늘은 Flutter를 맥에 설치하는 방법에 대해서 정리해보겠습니다.

### Flutter SDK 설치하기

#### SDK 다운로드

아래 링크를 통해서 **Flutter SDK**를 다운로드 해줍니다.

{% include base/components/link.html title='Flutter SDK for Mac Download'  internal_link='https://flutter.dev/docs/get-started/install/macos' %}

![sdkdownload](/assets/images/flutter-down.png)

#### 압축 해제 및 PATH 설정

```bash
cd ~/development
unzip ~/Downloads/flutter_macos_<download version>.zip
```

이후에 PATH 설정을 하기 위해서,

```bash
cd flutter
cd bin
pwd
<yourpath>/flutter/bin  # copy path
```

`pwd`명령을 실행해서 나오는 경로를 복사해줍니다. 개발자마다 터미널 쓰는 종류가 다를텐데요.

#### bash를 쓰는 경우

`~/.bash_profile`에 다음과 같은 코드를 추가해줍니다.

```text
export PATH="$PATH:<yourpath>/flutter/bin"
```

저장 후,

```bash
source ~/.bash_profile
```

#### `zsh`를 쓰는 경우

`~/.zshrc`에 다음과 같은 코드를 동일하게 넣어줍니다.

```text
export PATH="$PATH:<yourpath>/flutter/bin"
```

만약 `.zshrc`내에 `PATH`가 정의되어 있지 않다면 다음과 같이 코드를 추가해줍니다.

```text
export PATH=$HOME/bin:/usr/local/bin:$PATH
export PATH="$PATH:<yourpath>/flutter/bin"
```

저장 후,

```bash
source ~/.zshrc
```

이후 다음과 같은 명령으로 `Flutter SDK`의 의존성이나 상태를 볼 수 있습니다.

```bash
flutter doctor
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, v1.12.13+hotfix.8, on Mac OS X 10.15.3 19D76, locale en-US)
[✗] Android toolchain - develop for Android devices
    ✗ ANDROID_HOME = /Users/~~~~/Library/Android/sdk
      but Android SDK not found at this location.

[✓] Xcode - develop for iOS and macOS (Xcode 11.3.1)
[✓] Android Studio (version 3.6)
[✓] IntelliJ IDEA Ultimate Edition (version 2018.3.6)
[!] Connected device
    ! No devices available

! Doctor found issues in 2 categories.
```

일단 의존성이나 상태가 `[✗]`로 뜬다고 해서 정상적으로 설치가 되지 않은 것은 아닙니다.
각각 설명을 해보면,

1. `Flutter SDK`가 정상적으로 설치되었는지
2. `Android SDK`가 정상적으로 설치되었는지
3. `Xcode`가 설치되어 있는지
4. `Android Studio`가 설치되어 있는지
5. `IntelliJ IDEA`가 설치되어 있는지

없으면, 설치를 해야하고 `IDE`같은 경우 Flutter 플러그인을 설치해야할 수 있습니다.

### Adroid SDK 설치

#### brew로 설치하기

```bash
brew install Caskroom/cask/android-sdk
```

#### 안드로이드 스튜디오로 SDK 설치: 추천

{% include base/components/link.html title='Download Android Studio and SDK tools |  Android 스튜디오' internal_link='https://developer.android.com/studio' %}

위 링크에서 `Android Studio`를 다운 받으시면 됩니다.

다운 받으시고 설치하시면, 자동으로 SDK 등 설치할 건지 묻는데 이 때 설치하시면 됩니다.

이후, Flutter PATH 설정 하듯이 다음과 같은 코드를 `.bash_profile`, `.zshrc`에 추가해주시면 됩니다.

```text
# ANDROID_SDK
export ANDROID_SDK_ROOT="/Users/~~~/Library/Android/sdk"
export ANDROID_HOME=$ANDROID_SDK_ROOT
```

이후에 `flutter doctor -v` 를 실행 후, SDK license 에러가 발생한다면 다음 링크를 통해서 에러처리를 하실 수 있습니다.

{% include base/components/link.html title='Android license status unknown 에러' internal_link='/front-end/app/android-license-status-unknown' %}

### Xcode 설치

Xcode 설치는 Apple App store에서 다운 받으실 수 있습니다. 주의하실 점은 Xcode 버전인데, 저 같은 경우 `v9.0`대 버전을 사용하고 있어서, 지원이 안됐었던걸로 기억합니다.

`v11.0`대가 아니시라면 업데이트나 지우고 새로 다운로드 받으시는 것을 추천드립니다.

### Android Studio 시작하기

#### Start a new Flutter project

![image](/assets/images/flutter-project.png)

#### Run

저같은 경우 맥 가상 시뮬레이터를 선택하고, 시작을 했습니다.

![image](/assets/images/android-studio.png)

| ![image](/assets/images/flutter-run1.png) | ![image](/assets/images/flutter-run2.png) |
| :-: | :-: |
| 홈에서 앱선택 | 앱실행화면 |

맥에서 Flutter 설치하기 (Install Flutter in mac)에 대해서 알아 보았습니다.

감사합니다.
