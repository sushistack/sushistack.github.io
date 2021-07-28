---
layout: post
published: false
title: "[Spring Boot] OAuth2 소셜(구글, 페이스북, 네이버, 카카오) 로그인 완벽 가이드"
icon: spring
description: >
  스프링부트와 OAuth2 소셜
author: deeplify
toc: true
permalink: /back-end/spring/oauth2-social-login
tags: 
  - spring boot
  - oauth2
  - 스프링부트
  - 소셜 로그인
  - 구글 로그인
  - 페이스북 로그인
  - 네이버 로그인
  - 카카오 로그인
---

웹 또는 앱 서비스에서 로그인을 구현하는 일은 간단하지 않은 일입니다. 로그인을 구현하기 위해서는 다양한 사전 지식들을 가지고 있어야합니다. 특히 세션이나 쿠키 등의 역할 등을 알아야하고, 보안적인 측면에서도 신경을 써주어야합니다.

하지만 로그인을 구현하기 위헤서 개발 시간을 단축시켜줄 수 있는 것이 있다면 어떨까요? 이번 글에서는 스프링부트에서 핵심이되는 `Spring Security`, `Spring Oauth2`를 포함한 여러가지 모듈을 이용하여 REST API 기반의 소셜 로그인 기능을 구현하는 방법을 소개해리도록 하겠습니다.

## 스프링부트 소셜 로그인


![spring social diagram](/assets/images/springboot-oauth.jpg)