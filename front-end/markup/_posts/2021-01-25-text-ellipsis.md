---
layout: post
published: true
title: "[HTML/CSS] 말줄임 표시 하는 방법: 1줄, 2줄 예제"
icon: html
description: >
  html과 CSS를 이용하여 문장에 말줄임 표시하는 방법을 예제를 통해서 대해서 소개합니다.
author: deeplify
toc: true
permalink: /front-end/markup/text-ellipsis
tags:
  - html
  - css
  - ellipsis
  - 말줄임
  - 말줄임 표시
---

웹 페이지를 작성할 때, 디자인적인 측면에서 **말줄임**(`...`)을 사용해야 하는 경우가 많습니다. 말줄임표를 사용하면 해당 문장이 사실은 더 긴 문장이고 **생략**되었다라는 것을 암시해주는 역할을 합니다.

이번 글에서는 HTML/CSS를 이용하여 특정 영역에서 말줄임표를 사용하는 방법에 대해서 소개해드리도록 하겠습니다.

## 말줄임 표시 하는 방법

`Lorem ipsum dolor sit amet` -> `Lorem ipsum dol...`

위와 같이 긴 문장이 정해진 영역을 넘어갈 경우, 어떻게 말줄임표(`...`)를 사용하여 생략할 수 있을까요?

### css 말줄임 속성: text-overflow

```css
text-overflow: [ clip | ellipsis | <string> ]{1,2}
```

이 속성은 `overflow` 속성으로 숨겨진 컨텐츠가 어떤 상태에 있는지 효과적으로 전달하기 위한 속성입니다.

{% include base/components/hint-box.html type='warning' text='이 속성만으로 컨텐츠가 영역을 넘치도록(overflow) 해주지 않습니다.' %}

#### 텍스트가 영역을 넘치도록 만드는 방법

{% include base/components/jsfiddle/index.html src='//jsfiddle.net/deeplify/ub08vota/52/embed/result,html,css/dark/' is_small='true' %}

위 예제에서 가장 첫 번째는 div 영역에 `width` 속성만 적용한 모습을 나타냅니다.

두 번째와 세 번째는 각각`white-space: no-wrap`을 적용했을 때,  `white-space: no-wrap`과 `overflow: hidden`을 모두 적용했을 때의 모습입니다.

{% include base/components/hint-box.html type='success' list='white-space: no-wrap 속성은 영역 내의 문장이 길 때 자동으로 다음줄로 내려가는 것을 제거합니다.|overflow: hidden 속성은 영역의 넘치는 요소를 숨겨줍니다.' %}

#### css 말줄임 적용 예제

{% include base/components/jsfiddle/index.html src='//jsfiddle.net/deeplify/ub08vota/57/embed/result,html,css/dark/' is_small='true' %}

위 예제의 마지막 라인을 보시면 **말줄임**이 적용된 것을 확인하실 수 있습니다. 어떻게 적용했는지 알아보도록 하겠습니다.

```css
.ellipsis {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;  /* 말줄임 적용 */
}
```

특정 영역에 위와 같이 적용해주시면 간단하게 **말줄임**(`...`)을 적용하실 수 있습니다.

### css 말줄임 2줄 이상 적용하기

`text-overflow` 속성을 이용하여 1줄짜리 문장에 말줄임하는 방법을 적용해보았습니다. 지금부터는 2줄 이상의 문장의 끝에서 말줄임을 적용하는 방법에 대해서 알보도록 하겠습니다.

#### -webkit-line-clamp 속성

```css
-webkit-line-clamp: [none | <integer>]
```

이 속성은 영역 내의 **지정된 라인 수**로만 컨텐츠 내용을 제한 하는 기능을 합니다.

{% include base/components/hint-box.html type='warning' text='이름에서 알 수 있듯이 webkit 기반의 속성을 지원하지 않는 브라우저(ex. IE)에서는 이 속성이 동작하지 않습니다.' %}

#### 말줄임 2줄 이상 예제

{% include base/components/jsfiddle/index.html src='//jsfiddle.net/deeplify/zcLfjgwm/13/embed/result,html,css/dark/' is_small='true' %}

위 예제는 `-webkit-line-clamp` 속성을 이용하여 문장의 길이가 지정된 라인이 넘어가는 경우 말줄임 처리를 해주는 예제입니다. 어떻게 적용하는지 알아보겠습니다.

```css
.ellipsis {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

**한줄 또는 여러줄의 문장에 대해서 말줄임**을 하고 싶을 때는 원하는 영역의 속성을 위와 같이 적용해주시면 됩니다. 만약 3줄에 대한 말줄임을 적용하고 싶으면 `-webkit-line-clamp: 3;`으로 적용해주시면 됩니다.

{% include base/components/hint-box.html type='warning' text='white-space: no-wrap 속성은 꼭 제거해주셔야 합니다.' %}

여러 줄의 문장에 말줄임을 적용하는 각 속성에 대해서 자세히 알아보도록 하겠습니다.

{% include base/components/hint-box.html type='success' list='display: -webkit-box 속성은 해당 영역을 box 형태로 관리되도록 합니다.|-webkit-line-clamp 속성은 영역 내의 컨텐츠의 최대 라인수를 결정합니다.|-webkit-box-orient: vertical 속성은 영역 박스의 내의 정렬을 수직으로 하도록 합니다.' %}

### css 말줄임 2줄 이상 for IE (Internet Explorer)

{% include base/components/hint-box.html type='danger' text='안타깝게도 위에서 설명드린 -webkit-line-clamp 속성은 IE에서 적용되지 않습니다.' %}

다행이도 css 속성을 이용하여 IE에서도 2줄 이상의 문장에 말줄임을 적용하는 방법이 있습니다. IE에서는 **말줄임 표시에 대한 속성이 없기** 때문에 몇 가지 과정을 거쳐서 말줄임표 적용이 가능합니다.

지금부터 예제를 통해서 살펴보겠습니다.

#### 말줄임 2줄 이상 IE 예제

{% include base/components/jsfiddle/index.html src='//jsfiddle.net/deeplify/sku1xgjd/18/embed/result,html,css/dark/' %}

위와 같이 IE에서도 css를 이용하여 말줄임표를 적용할 수 있습니다. 어떻게 적용할 수 있었는지 알아보도록 하겠습니다.

##### 높이 설정

```css
.mulit-line-ellipsis {
  overflow: hidden;
  line-height: 1.2em;
  max-height: 3.6em;
}
```

긴 문장이 원하는 라인 수로 보여질 수 있도록 라인을 결정해야합니다.

위와 같은 속성을 이용하여 최대 높이를 `3.6em`으로 설정하고, 한줄 당 높이를 `1.2em`으로 설정하여 **세 줄**로 보여지도록 합니다. 또한 문장이 3줄을 넘치는 글자는 `overflow` 속성으로 숨겨줍니다.

{% include base/components/hint-box.html type='info' text='라인 수는 max-height와 line-height를 통해서 변경할 수 있습니다.' %}

##### 말줄임 표시 만들기

```css
.mulit-line-ellipsis:before {
  content: '...';
  position: absolute;
  right: 0;
  bottom: 0;
}
```

**말줄임**`(...)` 표시를 만들기 위해서 위와 같이 `before` 속성을 만들어주어 영역의 제일 오른쪽 하단에 위치시킵니다.

##### 문장 끝에 말줄임 표시를 가려줄 영역 만들기

```css
.mulit-line-ellipsis:after {
  content: '';
  position: absolute;
  right: 0;
  width: 1em;
  height: 1em;
  margin-top: 0.2em;
  background: white;  /* 배경색과 동일하게 적용 */
}
```

위와 같이 **말줄임 표시 만들기**만 적용하는 경우, 짧은 문장의 경우에도 말줄임`(...)`이 표시되게 됩니다. 따라서 위와 같이 보여지는 보여질 문장 끝에 말줄임을 가려줄 영역이 필요합니다.

##### 말줄임 영역만큼 전체 영역 width 줄이기

```css
.mulit-line-ellipsis {
  width: calc(180px - 1em);
  position: relative;
  margin-right: -1em;
  padding-right: 1em;
}
```

말줄임을 영역을 활용하여 표시해주었기 때문에 위 처럼 전체영역에 대한 넓이를 조절해주어야합니다.

##### 말줄임 속성 전체 코드

```css
.mulit-line-ellipsis {
  width: calc(180px - 1em);
  overflow: hidden;
  position: relative;
  line-height: 1.2em;
  max-height: 3.6em;
  margin-right: -1em;
  padding-right: 1em;
}

.mulit-line-ellipsis:before {
  content: '...';
  position: absolute;
  right: 0;
  bottom: 0;
}

.mulit-line-ellipsis:after {
  content: '';
  position: absolute;
  right: 0;
  width: 1em;
  height: 1em;
  margin-top: 0.2em;
  background: white;
}
```

IE에서 여러줄 말줄임 처리하는 방법은 위 속성을 원하는 영역에 넓이와 라인수 등을 고려하여 적용해주시면 됩니다.

### 알아두면 좋은 점

위에서 소개한 모든 css 말줄임 표시하는 방법들은 반응형 웹이나 테이블의 td, flex 영역 등에도 동일하게 적용가능 합니다.

또한 말줄임을 css로 적용하지 않고 **javascript 말줄임 처리**도 할수 있습니다.

하지만 이 방법은 문자열 자체를 잘라서 말줄임 표시`(...)`를 붙여주는 것입니다. 따라서 자신의 서비스에 맞는 방법을 찾아서 말줄임을 유연하게 적용하실 수 있습니다.

제 개인적인 의견으로는 자바스크립트를 통한 말줄임 표시보다는 **CSS를 활용한 말줄임 표시**를 적용하는게 일반적으로 좋다고 생각합니다.

### 참고 문서

{% include base/components/link.html title='text-overflow - CSS: Cascading Style Sheets | MDN' internal_link='https://developer.mozilla.org/en-US/docs/Web/CSS/text-overflow' %}

{% include base/components/link.html title='-webkit-line-clamp - CSS: Cascading Style Sheets | MDN' internal_link='https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp' %}

{% include base/components/link.html title='Pure CSS for multiline truncation with ellipsis – Hacking UI' internal_link='https://hackingui.com/a-pure-css-solution-for-multiline-text-truncation/' %}

## 맺음

이번 글에서는 **말줄임 표시 하는 방법**에 대해서 다양한 방법들을 소개해드렸습니다. 혹시 궁금하신 점이나 이상한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
