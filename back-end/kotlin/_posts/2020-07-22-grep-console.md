---
layout: post
published: false
title: Intellij 콘솔창 색깔(console color) 설정 - Grep Console
icon: kotlin
description: >
  Intellij에서 Grep Console로 콘솔창 색깔(console color) 설정하는 방법을 소개해드립니다.
author: navy apple
toc: true
permalink: /back-end/kotlin/grep-console
tags:
  - intellij
  - console color
  - grep console
  - 인텔리제이
  - 콘솔 색깔
---

## Intellij 콘솔창 색깔 설정 - Grep Console

개발을 할때, 뭔가를 확인하고 싶어서 로그 찍고 콘솔창에서 확인하는 작업을 많이하게 되는 것 같습니다.
그런데 로그의 양이 많아서 찾기가 힘들고, 가독성이 떨어져서 다음과 같은 식으로 로그를 확인하게 됩니다.

- 로그 검색창에 검색어를 입력해서 로그를 찾는다.
- 로그에 `####`, `>>>>`등을 붙여서 보기 쉽게 만든다.

다양한 방법이 있겠지만, 저는 개인적으로 색깔이 있으면 좋겠어서 위 플러그인을 소개해드리려고 합니다.
소개드릴 플러그인은 Eclipse, Intellij 등에 사용가능며, 여기서는 요즘 많이들 사용하는 `Intellij`에서 설정하는 법을 소개해드리겠습니다.

<hr>

### Preperences > Plugins로 이동하기

이동 방법은 간단합니다.

- [Intellij] -> [Preferences] 또는 단축키 `⌘` + `,` (for macOS) 
- [File] -> [settings...] 또는 단축키 `Ctrl` + `Alt` + `S` (for Windows)

Preferences 창에서 plugins 탭을 찾아서 바로 이동 하면 되겠습니다.

가장 빠르게 `plugins` 창으로 이동하는 방법은 Intellij 오른쪽 최상단의 검색 기능을 눌러 이동하는 방법입니다.
macOS의 경우 `shift`키 두번으로 검색창을 활성화 할 수 있습니다.

![grep-console1](/assets/images/grep-console1.png)

위 이미지처럼 검색창에 plugins를 검색하고 선택해줍니다.

### Grep Console 플러그인 설치하기
  
![grep-console2](/assets/images/grep-console2.png)

플러그인 탭에서 위 이미지처럼 `grep console`을 검색하고 설치를 진행해줍니다.
플러그인을 설치하면 `restart IDEA` 버튼이 활성화되는데, 적용을 위해서 Intellij를 재시작합니다.

![grep-console3](/assets/images/grep-console3.png)

재시작 해줍니다.

### 콘솔에 색 설정하기

![grep-console4](/assets/images/grep-console4.png)

재시작한 이후에 `Run` 콘솔창을 열면, 창 왼쪽 상단에 이미지와 같은 버튼이 생성됩니다.

![grep-console5](/assets/images/grep-console5.png)

버튼을 클릭하면 위처럼 콘솔에 관련된 설정창이 열립니다.

왼쪽 빨간색 박스부터 설명드리겠습니다.

- 설정된 규칙을 활성/비활성할 수 있는 체크박스가 있습니다.
- Expression 표현식을 설정하여 해당 표현식이 포함된 라인의 배경색, 글자색이 바뀝니다.
- 배경색, 글자색을 선택할 수 있고, 배경색을 체크를 하지 않는다면 배경은 투명한 색으로 표시되고, 글자색의 경우, 디폴트 색으로 설정됩니다.

확인 버튼을 눌러 설정을 완료합니다.

### 콘솔 색 확인하기

![grep-console6](/assets/images/grep-console6.png)

해당 예시에서는 `WARN`, `INFO`, `ERROR`만 보여주고 있지만, 정상적으로 작동하는 것을 확인할 수 있었습니다.

### 맺음

Intellij에서 grep console을 이용하여 콘솔창에 색을 입히는 방법에 대해서 알아보았습니다.

감사합니다.
