---
layout: post
published: true
title: "[HTML/CSS] div 가운데 정렬 하는 방법"
icon: html
description: >
  CSS를 이용하여 div 등의 엘리먼트를 가운데 정렬하는 방법을 소개합니다.
author: deeplify
toc: true
permalink: /front-end/markup/align-div-center
tags:
  - css
  - 가운데 정렬
  - div 가운데 정렬
  - html
  - html div align
---

웹페이지 디자인 마크업에는 다양한 규칙들이 존재합니다. CSS 규칙이 다양하게 존재하기 때문에 작업을 하는데 시간이 많이 소요될 수 있습니다.

마크업 디자인을 배우면서 가장 어려운 듯하면서도 쉬운 것이 바로 **Html 가운데 정렬**, Div 내의 글자 가운데 정렬, Div 자식 노드 가운데 정렬 등의 어떤 요소들을 가운데로 배치하는 것이라고 생각합니다.

이번 글에서는 웹페이지 마크업에서 가장 기본적이면서 사용할 일이 많은 Div 세로 가운데 정렬, Div 가로 가운데 정렬하는 방법에 대해서 자세하게 소개해드리도록 하겠습니다.

## div 가운데 정렬 하는 방법

div 영역을 중앙에 배치하는 방향에 따라 다양한 방법이 존재합니다. 다음과 같이 정렬 방향에 따라 케이스를 나눠서 방법을 소개해드리도록 하겠습니다.

> 정렬 방향
> - div의 가로만 정렬
> - div의 세로만 정렬
> - div의 가로와 세로 모두 정렬

### div의 가로만 정렬

> 가로로 정렬하는 세 가지 방법

1. text-align 속성 이용
2. flex 속성 이용
3. position과 transform 속성 이용

#### text align 속성 이용하여 가로 정렬

{% include base/components/jsfiddle/index.html src='//jsfiddle.net/deeplify/vk2a6o8e/83/embed/result,html,css/dark/' %}

위 처럼 `div.outer`안에 `div.inner`가 있는 상황이고, 이 정렬 방법은 `text-align` 속성을 이용하여 정렬하는 방식입니다.

```css
.outer {
  text-align: center;
}

.inner {
  display: inline-block;
}
```

이 가로 가운데 정렬 방법에서 가장 중요한 키포인트는 `div.outer`에는 text-align 속성이 `center`, `div.inner` 영역의 display가 `inline-block`으로 설정되어 있다는 것입니다.

#### flex 속성 이용하여 가로 정렬

{% include base/components/jsfiddle/index.html src='//jsfiddle.net/deeplify/f2mnek4u/21/embed/result,html,css/dark/' %}

같은 구조의 영역에서 CSS 속성만 변경하여 동일하게 적용해보겠습니다.

```css
.outer {
  display: flex;
  justify-content: center;
}
```

또는

```css
.outer {
  display: flex;
}

.inner {
  margin: 0 auto;
}
```

위 처럼 flex 속성을 이용하도 동일하게 가로 정렬을 적용할 수 있습니다.

이 방법의 키포인트는 `div.outer` 영역에 대해서 display 속성을 `flex`, justify-content 속성을 `center`로 설정하시거나 justify-content 속성 없이 `div.inner` 영역에 margin 속성을 `0 auto`로 설정해주시면 됩니다.

#### position과 transform 속성 이용하여 가로 정렬

{% include base/components/jsfiddle/index.html src='//jsfiddle.net/deeplify/5sjf29h1/10/embed/result,html,css/dark/' %}

```css
.inner {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
```

이 방법은 position과 transform 속성을 이용하여 가운데 정렬하는 방법입니다. position 속성이 `absolute`로 설정되어야하기 때문에 `div.outer`의 width가 고정되어 있어야합니다.

![transform 예제](/assets/images/align-div-center.jpg)

transform 속성을 설정해주는 이유는 left 속성은 div 영역의 `좌표(0,0)` 기준으로 설정되기 때문입니다. transform 속성을 이용하면 위 그림과 같이 `div.inner`의 영역을 이동시킬 수 있습니다.

### div의 세로만 정렬

세로로 정렬하는 세 가지 방법

1. vertical-align 속성 이용
2. flex 속성 이용
3. position과 transform 속성 이용

#### vertical align 속성 이용하여 세로 정렬

{% include base/components/jsfiddle/index.html src='//jsfiddle.net/deeplify/nacdb1s8/64/embed/result,html,css/dark/' %}

div 영역은 위와 동일한 상태로 구성하였고, 이 세로 정렬 `vertical-align` 속성을 이용하는 방법입니다.

```css
.outer {
  height:250px;
  display: table-cell;
  vertical-align: middle;
}

.inner {
  display: inline-block;
}
```

이 세로로 가운데 정렬하는 방법은 `div.outer` 영역은 높이가 고정적으로 설정이 되어 있어야하고, display 속성은 `table-cell` 그리고 vertical-align 속성은 `middle`로 설정이 되어야합니다. 또한 `div.inner` 영역의 display 속성은 `inline-block` 으로 설정되어야합니다.

{% include base/components/hint-box.html type='warning' text='외부 div 영역의 높이를 설정하지 않거나 높이가 고정값이 아니라 "auto", "100%" 등의 가변적인 경우 정상적으로 정렬되지 않습니다.' %}

#### flex 속성 이용하여 세로 정렬

{% include base/components/jsfiddle/index.html src='//jsfiddle.net/deeplify/69mu7o8h/44/embed/result,html,css/dark/' %}

영역 구조는 동일하게 하고 css의 속성만 변경하여 적용해보겠습니다.

```css
.outer {
  display: flex;
  align-items: center;
}
```

또는

```css
.outer {
  display: flex;
}

.inner {
  margin: auto 0;
}
```

`div.outer` 영역에 flex 속성과 align-items를 적용하여 세로 정렬이 가능합니다. 또는 align-items 속성이 없이도 `div.inner` 영역에 margin 속성을 `auto 0`으로 설정하여 적용 가능합니다.

#### position과 transform 속성 이용하여 세로 정렬

{% include base/components/jsfiddle/index.html src='//jsfiddle.net/deeplify/me3yhx1q/7/embed/result,html,css/dark/' %}

```css
.inner {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

앞서 설명했던 postion과 transform으로 가로 정렬하는 방법과 동일한 방식으로 적용 가능합니다.

### div의 가로와 세로 모두 정렬

지금까지는 가로만 정렬하거나 세로만 정렬하는 방법에 대해서 소개해드렸습니다. 지금부터는 가로와 세로 모두 정렬할 수 있는 방법을 알려드리겠습니다.

#### flex 속성으로 가로와 세로 모두 정렬

{% include base/components/jsfiddle/index.html src='//jsfiddle.net/deeplify/evga4wtf/25/embed/result,html,css/dark/' %}

```css
.outer {
  display: flex;
}

.inner {
  margin: auto;
}
```

또는

```css
.outer {
  display: flex;
  align-items: center; /* 수직 정렬 */
  flex-direction: row; /* default: row */
  justify-content: center; /* flex direction에 대해서 정렬방식 선택 */
}
```

위에서 설명했던 가로와 세로 정렬의 flex 방식을 적용하여 정렬을 할 수 있습니다.

flex 속성에 대한 자세한 내용은 아래 링크를 통해 확인하실 수 있습니다.

{% include base/components/link.html title='flex - CSS: Cascading Style Sheets | MDN' internal_link='https://developer.mozilla.org/ko/docs/Web/CSS/flex' %}

#### postion과 transform으로 가로와 세로 모두 정렬

{% include base/components/jsfiddle/index.html src='//jsfiddle.net/deeplify/ex5mjq4t/11/embed/result,html,css/dark/' %}

```css
.inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
```

position과 transform을 이용한 가로와 세로 가운데 정렬을 동시에 적용한 예제입니다.

### 주의 사항

{% include base/components/hint-box.html type='info' text='지금까지 소개해드린 모든 방법 중에 동작이 되지 않는 경우가 있으면 width 혹은 height가 고정적으로 선택이 되어 있는지 확인해보시기 바랍니다.' %}

## 맺음

간단하지만 자주 까먹게되는 div 가운데 정렬하는 방법을 다양한 방식을 적용하여 구현해보면서 소개해드렸습니다.

또한 추후에는 Bootstrap 에서는 div 가운데 정렬을 어떻게 간단하게 구현해 두었는지, Div의 CSS 속성 중 float이 있을 때는 어떻게 가운데 정렬을 할 수있는지에 대해서도 각각 포스팅할 예정입니다.

혹시 궁금하신 점이나 이상한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
