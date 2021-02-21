---
layout: post
published: true
title: "[HTML] 공백(스페이스, 빈칸) 넣는 방법"
icon: html
description: >
  html에서 공백(스페이스, 띄어쓰기)를 삽입하는 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /front-end/markup/html-space
tags:
  - html
  - space
  - 공백
  - 띄어쓰기
  - 빈칸
---

웹 마크업 디자인을 하다보면, 뜻대로 글이 써지지 않는 경우가 있습니다. 그 중 가장 잊기 쉬운 것이 **공백(스페이스)**입니다. 오늘은 HTML에 공백문자를 삽입하여 페이지에 노출이 잘 되는지까지 확인해보는 시간을 가져보도록 하겠습니다.

## Non-breaking Space

`Non-breaking space` 직역하면, 줄바꿈 없는 공백이라는 뜻입니다. 이를 HTML 환경에서 축약해서 나타내는 문자는 `&nbsp;` 입니다.

### 설명

`NBSP`는 단순히 여러 개의 공백만 추가할 수 있는 기능뿐만이 아니라 **NBSP**를 포함하는 문자열의 길이가 너무 긴 경우, 문자열 자체를 다음줄로 넘겨주는 기능을 하고 있습니다.

우선 여러 개의 공백을 넣어주는 방법을 먼저 소개하고, NBSP의 진짜 용도인 다음줄로 넘겨주는 기능을 추가적으로 소개해보도록 하겠습니다.

### 공백(스페이스, 빈칸) 여러 개 추가

HTML에서 여러 개의 공백을 추가하는 방법을 일반적인 스페이스를 활용한 방법과 NBPS를 활용한 방법을 예제를 통해서 비교하며 설명드리겠습니다.

#### 스페이스 사용

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
  </head>
  <body>
    <div>This is    Test.</div>
  </body>
</html>
```

위와 같이 `This is    Test.` **is**와 **Test.** 문자 사이에 4개의 공백을 채웠습니다.

![non-breaking-space1](/assets/images/non-breaking-space1.png)

결과는 위와 같이 공백이 하나인 문자가 출력됩니다. 이번에는 공백 대신에 `&nbsp;`를 사용해서 문서를 작성해보겠습니다.

#### NBPS 사용

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Document</title>
  </head>
  <body>
    <div>This is&nbsp;&nbsp;&nbsp;&nbsp;Test.</div>
  </body>
</html>
```

일반적으로 사용하는 공백 대신에 4개의 `&nbsp;`로 채웠습니다.

![non-breaking-space2](/assets/images/non-breaking-space2.png)

4개의 공백만큼 잘 떨어져서 출력되는 것을 확인하실 수 있습니다.

### NBPS를 포함한 문자열을 다음줄로 이동

방금 전에 NBPS는 여러 개의 공백만 추가하는 기능 외에 원래의 기능인 NBPS를 포함한 문자열이 긴 경우 다음줄로 이동시키는 기능이 있다고 말씀드렸습니다.

이 기능을 예제를 통해서 알아보도록 하겠습니다.

#### 스페이스 사용한 문장

```html
<!-- 생략 -->
<div class="text" style="font-size:40px">
  I would I had that corporal soundness now, As when thy father and myself in friendship First tried our soldiership!
</div>
<!-- 생략 -->
```

HTML에 텍스트로 긴문장을 넣어서 자동으로 줄바꿈이되는 문장을 넣어주었습니다.

![nbps example 1](/assets/images/nbps01.jpg)

일반적인 스페이스 공백문자가 들어간 경우 이렇게 문자의 길이에 따라 자동으로 줄바꿈이 되는 현상을 보실 수 있습니다.

#### NBPS 사용한 문장

```html
<!-- 생략 -->
<div class="text" style="font-size:40px">
  I would I had that corporal soundness now,&nbsp;As when thy father and myself in friendship First tried our soldiership!
</div>
<!-- 생략 -->
```

줄바꿈이 되는 `now,`와 `As`사이의 공백을 스페이스에서 `&nbsp;`로 바꿔주었습니다.

![nbps example 2](/assets/images/nbps02.jpg)

결과는 위 사진과 같이 `now, As`라는 문자열이 길다고 판단되었고 따라서 다음줄로 이동되는 결과를 보실 수 있습니다.

## 맺음

간단하게 html에서 공백 삽입하는 방법에 대해서 알아보았습니다. 혹시 궁금한 점이나 이상한 점 있으면 댓글 부탁드리겠습니다.

감사합니다.
