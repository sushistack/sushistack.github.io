---
layout: post
published: true
title: "[Vue] VueJS 설치 하는 방법 (feat. vue CLI)"
icon: vue
description: >
  vue 설치하는 다양한 방법에 대해서 소개와 예제를 통해 프로젝트를 시작하는 방법에 대해서 알아봅니다.
author: deeplify
toc: true
permalink: /front-end/vue/how-to-install
tags:
  - vue
  - install
  - vue cli
  - vue install
  - sass loader
---

몇년 전에 프론트엔드쪽에도 많은 변화가 생기기 시작했습니다. 많은 프론트엔드 개발자들이 사용하기 편한 환경을 만들기 위해 노력했고, 그 결과 중 하나인 `SPA (Single Page Application)`들이 탄생하기 시작했습니다.

저도 모든 SPA 어플리케이션을 경험해본 것은 아니지만, 가장 진입 장벽이 가장 낮은 것은 아무래도 `Vue`라고 생각합니다.

그래서 이번 포스팅에서는 **Vue를 설치**하고 프로젝트를 생성하는 방법에 대해서 자세하게 해보도록 하겠습니다.

## VueJS 설치 하는 방법

VueJS를 사용할 수 있는 방법은 세 가지가 있습니다.

> 1. CDN 패키지로 HTML 페이지에서 script 추가 하기
> 2. NPM을 이용하여 추가 하기
> 3. 공식 Vue CLI를 사용하여 Vue 프로젝트 만들기

일반적으로 CND 패키지나 NPM으로 추가하는 방법은 기존에 존재하는 **특정 페이지에서 Vue를 적용**하여 개발 생산성을 올리려는 목적으로 사용된다고 생각합니다. 이 두 가지 방법은 정말 간단하므로 Vue를 추가한 후, 초기화 하는 것만 빠르게 보여드리도록 하겠습니다.

### 페이지에서 CDN 패키지 추가

```html
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
```

```js
const vue = new Vue({ template: '<div>{{ test }}</div>' })
```

페이지에서 CND 패키지를 추가하여 위와 같이 사용할 수 있습니다.

### NPM을 이용하여 추가 하기

```bash
npm install vue
```

```js
import Vue from '~/vue'

const vue = new Vue({ template: '<div>{{ test }}</div>' })
```

npm을 이용하여 vue를 설치한 후, 위와 같이 import 하여 사용할 수 있습니다.

### Vue CLI 이용하여 vue 프로젝트 생성

#### Vue CLI 설치

```bash
npm i -g @vue/cli
```

{% include base/components/hint-box.html type='warning' text='Vue CLI를 설치하기 위해서는 node.js 6.x 버전 이상, npm 3.x 버전 이상으로 설치되어 있어야합니다.' %}

위 명령어를 통해서 **Vue CLI**를 설치할 수 있고, 설치 후에 `vue --version` 또는 `vue -V` 명령어를 이용하여 vue 바이너리를 통해 버전을 확인 할 수 있게 됩니다.

#### Vue 프로젝트 생성

```bash
vue init <template-name> <project-name>
```

{% include base/components/hint-box.html type='info' list='webpack: webpack 빌드 도구와 vue-loader를 이용하는 옵션으로 linter, router, css preprocessing, 단위 테스트 도구들을 선택적으로 사용 가능|webpack-simple: webpack 빌드 도구와 vue-loader를 이용하는 옵션 간단한 프로젝트를 구성하는데 사용|browserify: browserify와 vuetify를 이용하는 옵션으로 linter와 단위 테스트 도구를 선택적으로 사용 가능|browserify-simple: browserify와 vuetify를 이용하는 간단한 옵션으로 작은 프로젝트를 구성하는데 사용|pwa-webpack: 빌드 도구를 이용하는 PWA 기반의 애플리케이션을 만드는데 사용|simple: 하나의 HTML안에서 Vue컴포넌트로 개발할 때 사용' %}

Vue CLI를 통해서 Vue 프로젝트를 생성하는 방법은 위와 같은 명령어를 사용하는 것입니다. 또한 자신의 **프로젝트 성격에 맞는 템플릿**을 선택하여 프로젝트를 생성할 수 있습니다.

#### Vue 프로젝트 생성 예제

```bash
vue init webpack test-project

? Project name (test-project)
? Project description (A Vue.js project)
? Author (tester)
? Vue build (Use arrow keys)
❯ Runtime + Compiler: recommended for most users
  Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere
? Install vue-router? (Y/n)
? Use ESLint to lint your code? (Y/n)
? Pick an ESLint preset (Use arrow keys)
❯ Standard (https://github.com/standard/standard)
  Airbnb (https://github.com/airbnb/javascript)
  none (configure it yourself)
? Set up unit tests (Y/n)
? Pick a test runner (Use arrow keys)
❯ Jest
  Karma and Mocha
  none (configure it yourself)
? Setup e2e tests with Nightwatch? (Y/n)
? Should we run `npm install` for you after the project has been created? (recommended) (Use arrow keys)
❯ Yes, use NPM
  Yes, use Yarn
  No, I will handle that myself

# Installing project dependencies ...
# ========================
```

Vue init 명령어를 실행하면 다양한 옵션을 선택할 수 있는 로그가 출력됩니다. 이 또한 자신의 프로젝트에 맞게 설정해주시면 됩니다.

```bash
cd test-project
npm run dev # or npm start
```

이후 생성된 Vue 프로젝트로 이동하여 `npm run dev` 명령어를 이용하여 프로젝트를 실행할 수 있습니다.

실행된 이후에는 `http://localhost:8080`로 이동하여 Vue가 실행되는 것을 확인하실 수 있습니다.

### 맺음

간단하게 Vue CLI를 이용하여 Vue 프로젝트 생성하는 방법에 대해서 알아보았습니다. 혹시 궁금하신 점이나 이상한 점이 있으면 댓글 부탁드리겠습니다.

감사합니다.
