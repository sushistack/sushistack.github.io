---
layout: post
published: true
title: "[Vue] Module build failed: TypeError: this.getResolve is not a function 에러"
icon: vue
description: >
  "Vue.js: scss-loader error가 발생하는 이유에 대해서 소개하고 해결 방법까지 알아보도록 하겠습니다."
author: deeplify
toc: true
permalink: /front-end/vue/vue-scss-error
tags:
  - vue
  - webpack
  - scss
  - sass
  - sass loader
---

`Vue.js` 프로젝트 셋업 시, scss를 사용하기 위해서 `sass-loader`를 설치하였을 때, 발생했던 에러를 기록하기 위해 이 포스팅을 작성하게 되었습니다.

저와 동일한 문제를 겪고 있는 사람들에게 이 글이 도움이 되길 바랍니다.

## this.getResolve is not a function 에러

```bash
vue init webpack my-project
```

```bash
npm i -D node-sass sass-loader
```

저는 위와과 같은 식으로 Vue.js를 vue-cli를 이용하여 프로젝트를 생성하였고, vue에서 scss를 사용하기 위해서 npm을 통해서 sass-loader를 설치해주었습니다.

{% include base/components/hint-box.html type='info' text='webpack 버전은 4.46.0' %}

### 에러가 발생한 이유는?

검색을 통해서 알아보니 `vue-cli(webpack v3.x ~ 4.4x)`로 생성된 프로젝트에서 `sass-loader 8.x` 버전이 호환이 되지 않기 때문에 에러가 발생하게되었습니다.

### 에러 해결 방법

에러를 해결하는 방법은 간단합니다. 저는 webpack 버전과 호환이 되는 sass-loader 버전으로 변경해주어 해결하였습니다.

#### sass-loader 버전 변경

```bash
npm uninstall sass-loader
npm i -D sass-loader@7.3.1
```

위와 같이 sass-loader와 관련된 모듈을 모두 삭제해준 후, `7.3.1` 버전으로 새로 설치해주었습니다.

##### 참고

{% include base/components/link.html title='github issue: webpack-contrib/sass-loader' internal_link='https://github.com/webpack-contrib/sass-loader/issues/761' %}

## 맺음

간단하게 Vue에서 `Module build failed: TypeError: this.getResolve is not a function` 에러가 발생하는 원인과 해결방법까지 알아보았습니다. 혹시 궁금하신 점이나 이상한 점이 있으면 댓글 부탁드리겠습니다.

감사합니다.
