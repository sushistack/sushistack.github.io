---
layout: post
published: false
title: Iframe node 복사하기
icon: js
description: >
  Ifrme 노드의 전체 내용을 포함하여 복사하는 방법에 대해서 소개해드립니다.
author: deeplify
toc: true
permalink: /front-end/js/iframe-copy
tags:
  - js
  - javascript
  - iframe
  - copy node
---

javascript를 통해서 노드를 복사해야하는 경우가 있습니다. 노드를 복사하는 방법에는 2 가지가 있는데요.

1. Swallow copy (얕은 복사)
2. Deep copy (깊은 복사)

아래와 같은 html 태그가 있다고 가정하겠습니다.

#### Html

```html
<div class='iframe-container'>
  <iframe>
    document...
  </iframe>
</div>
```

<hr/>

### Swallow copy

#### Javascript

```javascript
var container = document.querySelector('.iframe-container');
var clonedContainer = container.CloneNode();

document.body.appendChild(clonedContainer);
```
#### Result

```javascript
console.log(clonedContainer);
```

⬇︎

```html
<div class="iframe-container">
  there is nothing.
</div>
```
<hr/>

### Deep Copy

#### Javascript

```javascript
...

var clonedContainer = container.CloneNode(true); // set true!!

...
```

#### Result

```javascript
console.log(clonedContainer);
```

⬇︎

```html
<div class='iframe-container'>
  <iframe>
    document...
  </iframe>
</div>
```

이런식으로 deep copy를 할 수 있습니다. 심지어 iframe이 가지고 있는 document 까지 복사가 되니까 다양한 상황에서 유용하게 사용할 수 있습니다.

감사합니다.
