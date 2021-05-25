---
layout: post
published: true
title: "[HTML/CSS] Position sticky 적용 방법"
icon: html
description: >
  CSS의 Postion 속성 중 sticky에 대한 소개와 적용 방법을 알아보도록 하겠습니다.
author: deeplify
toc: true
permalink: /front-end/markup/position-sticky
tags:
  - css
  - html
  - postion
  - sticky
  - postion sticky
---

css의 `position`에는 다양한 종류의 다양한 속성이 있습니다. 이 글에서는 static 속성과 fixed 속성의 특징을 동시에 갖고 있는 **position sticky**속성의 특성에 대해서 알아보겠습니다.

또 sticky 속성이 동작하지 않을 때 확인해야할 것들에 대해서 정리해드리겠습니다.

## Postion sticky

sitcky 속성은 필수적으로 `top`, `bottom`, `left`, `right`들 중에 하나를 필수적으로 설정해주어야 합니다. sitcky로 설정된 영역은 설정된 위치(예 top: 0px)에 도달하기 전까지는 static 속성처럼 행동하다가 `설정된 위치`에 다다르면 fixed 속성처럼 행동하는 속성입니다.

먼저 예제를 통해서 **static**, **fixed** 그리고 **sticky** 속성을 각각 적용했을 때 어떻게 동작하는지 알아보도록 하겠습니다.

### 예제

{% include base/components/jsfiddle/index.html src='//jsfiddle.net/deeplify/7uj83ayn/89/embed/result,html,css/dark/' %}

위의 예제를 통해서 position에 각 속성마다 각각 어떻게 동작하는지 살펴보았습니다. 이제 각 속성마다 css 코드를 보면서 어떻게 설정이 되어 있고, 어떻게 렌더링되어 적용되는지 알아보겠습니다.

#### static 속성

```css
.static {
  position: static;
  background: orange;
}
```

먼저 **static** 속성은 대부분의 html 태그들의 기본 속성입니다. 의미 그대로 정적인 위치를 갖도록 합니다.

위 예제에서 `div.sidebar`안의 최상단에 자리를 차지하며 위치하는 것을 확인할 수 있습니다.

#### fixed 속성

```css
.fixed {
  position: fixed;
  top: 99px;
  left: 155px;
  background: pink;
}
```

**fixed** 속성을 갖는 영역은 뷰포트의 특정 좌표에 고정되어 표현됩니다.

위 예제에서는 `top: 99px`, `left: 155px`으로 설정하여 브라우저 또는 디바이스의 최상단으로부터 `(x=155px, y=99px)`으로 고정된 위치에 보여지게 됩니다. 만약 position 속성을 fixed로 설정하고, 위치를 설정하지 않으면 `(x=0, y=0)`으로 설정한 것처럼 보여지게 됩니다.

{% include base/components/google/infeed-ad.html slot=site.data.ad.second.infeed %}

#### sticky 속성

```css
.sticky {
  position: sticky;
  top: 0;
  background: #8a4baf;
}
```

sticky 속성은 static과 fixed 속성의 특징을 모두 가지고 있는 속성입니다. sticky 영역의 x 또는 y 위치값이 설정한 위치에 도달하기 전까지는 static, 도달 이후에는 fixed처럼 행동하게 됩니다.

예제에서는 `div.sticky` 영역의 위치를 `top: 0;`으로 설정했습니다.

뷰포트의 관점에서 최초에 페이지가 랜더링 되었을 때,

- `div.sidebar` 영역은 `div.nav` 아래에 있는 `div.container`안에 있기 때문에 `div.sidebar`의 y좌표는 0보다 큼.
- `div.sticky` 영역은 `div.sidebar` 내부의 상단에 위치하기 때문에 `div.sticky`의 y좌표도 0보다 큼.

`div.sticky` 영역이 아직 설정한 위치인 `top: 0;`에 도달하지 않았기 때문에 마치 static 속성으로 설정한 것처럼 보이게 됩니다.

이 상태에서 스크롤을 하단으로 내리면 `div.sticky` 영역이 뷰포트의 y 좌표 0에 도달하는 순간, 이 영역은 fixed 속성처럼 행동하게 됩니다.

### sticky 속성이 동작하지 않는다면?

sitcky 속성은 굉장히 유용한 속성인 것임에는 틀림이 없습니다. 하지만 sticky 속성은 사용하기가 조금 까다롭습니다. sticky 속성이 동작하지 않을 때, 확인해봐야할 것을 정리해보도록 하겠습니다.

#### 도달 위치 설정이 되어 있는지 확인

sticky 엘리먼트는 `top`, `bottom`, `left`, `right` 속성 중 하나는 반드시 필요합니다. 설정 된 위치에서 fixed 속성처럼 동작해야 하는데 기준 위치가 없기 때문에 동작하지 않는 경우 입니다.

```css
.sticky {
  position: sticky;
  top: 0;
}
```

#### 크로스 브라우징 및 브라우저 확인

크로스 브라우징은 다음 링크를 통해서 확인하실 수 있습니다.

{% include base/components/link.html title='Can I use... Support tables for HTML5, CSS3, etc' internal_link='https://caniuse.com/css-sticky' %}


내용을 보면 IE는 지원하지 않는다고 합니다. 하지만 sticky 속성은 IE에서 static과 동일하게 처리되기 때문에 이 속성을 쓰지 않을 이유는 없을 것 같습니다.

```css
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}
```

만약에 Safari에서도 동작하게 하려면, 위와 같이 `-webkit-sticky` 속성을 추가해주시면 됩니다.

#### 부모 또는 조상 노드에 overflow 속성이 설정되어 있는지 확인

sticky 속성의 경우, 부모 또는 조상 노드에 overflow 설정이 아래와 같이 설정되어 있으면 동작하지 않습니다.

> - overflow: hidden
> - overflow: scroll
> - overflow: auto

브라우저의 develop tool에서 아래 코드를 실행시켜, sticky 속성의 부모 또는 조상 노드에 overflow 설정이 되어 있는지 확인하실 수 있습니다.

```js
//sticky element selector에 sticky 속성을 사용하고자하는 엘리먼트의 selector 설정
let parent = document.querySelector('[sticky element selector]').parentElement;

while (parent) {
  const hasOverflow = getComputedStyle(parent).overflow;
  if(hasOverflow !== 'visible') {
    console.log(hasOverflow, parent);
  }
  parent = parent.parentElement;
}
```

#### 부모 노드의 height가 설정되어 있는지 확인

sticky 속성을 갖는 엘리먼트의 부모 노드는 반드시 height가 설정되어 있어야합니다. 그렇지 않으면 sticky 속성의 엘리먼트는 stiatc 속성처럼 동작하게 됩니다.

`height: xx%;`같이 퍼센트로 설정한 경우에는 동작하지 않습니다.

> 올바른 예
> - height: auto
> - height: unset
> - height: 100vh
> - height: 1000px
> - height: 5em

## 맺음

간단하게 sticky 속성에 대해서 알아보았습니다, 혹시 궁금하신 점이나 이상한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
