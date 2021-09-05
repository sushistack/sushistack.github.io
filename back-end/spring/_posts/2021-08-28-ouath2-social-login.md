---
layout: post
published: true
title: "[Spring Boot] OAuth2 소셜 로그인 가이드 (구글, 페이스북, 네이버, 카카오)"
icon: spring
description: >
  스프링부트를 이용하여 구글, 페이스북, 네이버, 카카오 OAuth2 로그인 구현하는 방법에 대해서 소개합니다.
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

웹 또는 앱 서비스에서 로그인을 구현하는 것은 간단하지 않은 일입니다. 로그인을 구현하기 위해서는 다양한 사전 지식들을 가지고 있어야합니다. 특히 세션이나 쿠키 등의 역할 등을 알아야하고, 보안적인 측면에서도 신경을 써주어야합니다.

하지만 로그인을 구현하기 위헤서 개발 시간을 단축시켜줄 수 있는 것이 있다면 어떨까요? 이번 글에서는 스프링부트에서 `Spring Security` 및 `OAuth2`를 포함한 여러가지 프레임워크와 라이브러리를 이용하여 REST API 기반의 소셜 로그인 기능을 구현하는 방법을 소개해리도록 하겠습니다.

## 스프링부트 소셜 로그인

스프링부트에서 구글, 페이스북, 네이버, 카카오 등 다양한 서비스를 이용하여 소셜 로그인을 구현할 수 있습니다.

> 1. 스프링 보안 프레임워크 Spring Security 소개
> 2. OAuth2.0 및 Spring OAuth 프레임워크 소개
> 3. 예제: 각 Provider에서 OAuth 로그인 서비스 등록
> 4. 예제: 스프링부트 OAuth 로그인 설정
> 5. 예제: 프론트엔드 및 백엔드 예제 프로젝트 연동 테스트

위와 같은 순서로 Spring Security, OAuth2.0, Spring OAuth 프레임워크를 소개하고, 구글 로그인, 페이스북 로그인, 네이버 로그인, 카카오 로그인 등을 적용하는 예제 프로젝트를 만들어보도록 하겠습니다.

### OAuth 로그인을 위한 Spring 하위 프레임워크

스프링부트로 생성된 프로젝트에서 OAuth 로그인을 구현하기 위해서는 일반적으로 스프링 시큐리티와 스프링 시큐리티 OAuth2 클라이언트를 이용합니다.

#### Spring Security

{% include base/components/link.html title='Spring Security Reference' internal_link='https://docs.spring.io/spring-security/site/docs/current/reference/html5' %}

`Spring Security`는 Spring 기반의 어플리케이션 권한과 인증, 인가 등의 보안을 담당하는 하위 프레임워크입니다. 스프링 시큐리티는 **인증**과 **권한**을 Filter 흐름에 따라 처리하게 구현되어 있고, 이미 대부분의 보안적인 로직들이 포함되어 있어 개발자가 추가로 개발하지 않아도 된다는 장점이 있습니다.

#### OAuth2란?

OAuth2란 Open Authentication2의 약자로 인증 및 권한획득을 위한 **업계표준 프로토콜**입니다.

OAuth2는 보안수준이 어느정도 검증된 플랫폼의 API를 이용하여 사용자 인증과 리소스에 대한 권한 획득(인가)을 할 수 있도록 해주는 역할을 하고, 대부분의 영향력이 있고 OAuth2 인증을 제공하는 플랫폼들은 모두 OAuth2 규칙을 지키는 API를 제공하고 있습니다.

그렇다면 왜 OAuth라는 프로토콜이 탄생하게 되었을까요? 그 이유는 보안수준이 검증되지 않은 플랫폼에 동일한 아이디와 패스워드를 사용하는 상황이 자주 발생했기 때문입니다. 여러 플랫폼에 회원 가입을 하게 되면 사용자는 일반적으로 동일한 아이디와 비밀번호를 사용하는 경우가 많기 때문에 보안에 취약해 질 수 밖에 없습니다.

반대로 OAuth 인증을 통하면 신뢰할 수 있는 플랫폼이 인증과 리소스에 대한 권한을 외부 플랫폼에 부여하므로써 위에서 언급했던 문제를 해결할 수 있고, 사용자는 회원가입을 한 번 더 하지 않아도되기 때문에 사용자 경험 측면에서도 장점이 있습니다.

##### OAuth2.0 구성 요소

{% include base/components/hint-box.html type='info' list='1. Resource Owner: 사용자|2. Client: 리소스 서버에서 제공해주는 자원을 사용하는 외부 플랫폼|3. Authorization Server: 외부 플랫폼이 리소스 서버의 사용자 자원을 사용하기 위한 인증 서버|4. Resource Server: 사용자의 자원을 제공해주는 서버' %}

OAuth2.0는 위와 같이 4개의 구성요소를 가지고 있습니다. 예를 들어 저는 페이스북 계정이 있고, 페이스북 로그인 기능을 지원하는 외부 플랫폼에 로그인 하려고합니다. 이런 경우 외부 플랫폼을 통해 페이스북 인증 서버(Authorization Server)에 인증 요청을 하게 되고 외부 플랫폼은 저의 페이스북 정보들(이름, 나이, 프로필 사진 등)을 사용할 수 있는 권한을 얻게 됩니다.

##### OAuth2.0 인증 종류

{% include base/components/hint-box.html type='info' list='1. Authorization Code Grant: 권한 코드 승인 방식|2. Implicit Grant: 암시적 승인 방식|3. Password Credentials Grant: 비밀번호 자격 증명 방식|4. Client Credentials Grant: 클라이언트 자격 증명 방식' %}

OAuth2.0에 명시된 인증 종류는 위와 같이 크게 4가지로 구분됩니다.

###### Authorization Code Grant

일반적으로 서버 사이드에서 인증을 처리할 때 이용하는 방식으로 Resource Owner로부터 리소스 사용에 대한 허락을 의미하는 `Authorization Code`를 이용하여 Access Token을 요청하는 방식입니다. 이 방식은 Access Token이 바로 클라이언트로 전달되지 않기 때문에 다른 방식보다 보안에 좋은 특징을 가지고 있습니다.

###### Implicit Grant

권한 코드 없이 바로 토큰을 발급하여 사용하는 방식으로 브라우저나 앱과 같은 서버와의 연동이 없는 어플리케이션에서 주로 사용됩니다. 권한 코드 검증이 들어가지 않기 때문에 보통 Read Only 서비스에서만 사용하는 것이 좋습니다.

###### Password Credentials Grant

Client에 Service Provider(구글, 페이스북 등)의 아이디와 비밀번호를 저장해두고 사용하는 방식입니다. 일반적으로 Client와 Service Provider의 관계가 아주 긴밀한 관계일때만 사용하는 것이 좋습니다.

###### Client Credentials Grant

Client와 Resource Owner가 같을 때 사용하는 인증 방식입니다. Client와 Resource Owner가 같기 때문에 추가적인 인증이 필요하지 않고 Authorization Server로부터 바로 토큰을 받을 수 있습니다.

##### Spring OAuth2 Client

일반적으로 OAuth 인증을 하기 위해서는 인증을 위한 여러가지 절차대로 진행해야만 인증이 가능합니다. 이러한 일련의 절차들을 설정 한번으로 간단하게 사용할 수 있도록 도와주는 것이 `Spring OAuth2 Client`입니다.

{% include base/components/hint-box.html type='success' text='OAuth2 Client 또한 위에서 언급한대로 OAuth2.0 표준에 맞게 잘 설계가 되어 있습니다.' %}

## Spring OAuth 로그인 예제

프로젝트를 처음부터 만들면서 스프링에서 OAuth 로그인을 적용하는 방법을 소개해드리도록 하겠습니다.

### 예제 작성에 참고한 프로젝트

{% include base/components/link.html title='Spring Boot React OAuth2 Social Login with Google, Facebook, and Github' internal_link='https://github.com/callicoder/spring-boot-react-oauth2-social-login-demo' %}

### 필요한 프레임워크 또는 라이브러리

{% include base/components/hint-box.html type='info' list='1. Spring Security|2. OAuth2 Client|3. Json Web Token(JWT)'%}

{% include base/components/link.html title='JSON 웹 토큰 - 위키백과, 우리 모두의 백과사전' internal_link='https://ko.wikipedia.org/wiki/JSON_%EC%9B%B9_%ED%86%A0%ED%81%B0' %}

Spring Security와 OAuth2 Client에 대해서는 간단하게 소개해드렸습니다. JWT에 대해서 궁금하시다면 상단 링크에서 자세하게 확인해보실 수 있습니다.

### 서비스 등록

OAuth 로그인을 구현하기 위해서는 꼭 각 플랫폼에서 제공하는 OAuth 앱 또는 서비스를 등록해야합니다. 많이들 사용하는 구글, 페이스북, 네이버, 카카오 총 네 가지의 플랫폼에 서비스를 등록하는 방법을 소개해드리도록 하겠습니다.

각 플랫폼에서 서비스 등록하면 각 플랫폼별 `클라이언트ID`와 `클라이언트 secret`을 얻어야합니다.

#### 구글 OAuth 서비스 등록

{% include base/components/link.html title='API 및 서비스 – API 및 서비스 – CommentAlert – Google Cloud Platform' internal_link='https://console.cloud.google.com/apis' %}

기본적으로 구글 계정은 있다는 가정하에 서비스 등록방법을 소개해보도록 하겠습니다. 구글 OAuth 서비스를 등록하기 위해서는 위 링크를 통해 콘솔로 접속해야합니다.

![google oauth registration 01](/assets/images/google-oauth-registration01.jpg)

콘솔 대시보드화면에서 프로젝트 만들기를 클릭하여 프로젝트를 생성화면으로 이동합니다.

![google oauth registration 02](/assets/images/google-oauth-registration02.jpg)

자신의 서비스에 대한 프로젝트 이름을 작성하고, 프로젝트를 생성합니다.

![google oauth registration 03](/assets/images/google-oauth-registration03.jpg)

구글 OAuth 클라이언트를 사용하기 위해서는 OAuth 동의화면이 먼저 구성되어 있어야합니다. 위 사진과 같이 `OAuth 동의 화면` 탭을 클릭하여 설정화면으로 이동합니다.

![google oauth registration 04](/assets/images/google-oauth-registration04.jpg)

앱 이름, 이메일, 로고(Optional)를 입력합니다.

![google oauth registration 05](/assets/images/google-oauth-registration05.jpg)

테스트용으로 만들 앱이라 `앱 도메인`은 입력하지 않고 넘어갑니다.

![google oauth registration 06](/assets/images/google-oauth-registration06.jpg)

역시 테스트용 앱이라서 승인된 도메인이 없으므로 도메인은 추가하지 않고, 개발자 연락처 정보만 입력해줍니다.

![google oauth registration 07](/assets/images/google-oauth-registration07.jpg)

범위(scope)는 사용할 데이터의 권한 범위를 의미합니다. 구글로부터 어떤 데이터에 접근하고 싶은지 선택할 수 있습니다.

![google oauth registration 08](/assets/images/google-oauth-registration08.jpg)

이메일 정보와 프로필정보만 필요하므로 위 사진과 같이 선택합니다.

![google oauth registration 09](/assets/images/google-oauth-registration09.jpg)

그 이외에는 건들지 않고 다음으로 넘어갑니다.

![google oauth registration 10](/assets/images/google-oauth-registration10.jpg)

테스트 사용자를 설정하는 화면입니다. 계정 주인 이외의 다른 테스터를 추가할 때 설정할 수 있습니다.

![google oauth registration 11](/assets/images/google-oauth-registration11.jpg)

OAuth 동의 화면 설정은 완료되었고, `사용자 인증 정보` 탭으로 이동합니다.

![google oauth registration 12](/assets/images/google-oauth-registration12.jpg)

상단의 사용자 인증정보 만들기를 클릭합니다.

![google oauth registration 13](/assets/images/google-oauth-registration13.jpg)

OAuth 클라이언트 ID를 선택합니다.

![google oauth registration 14](/assets/images/google-oauth-registration14.jpg)

클라이언트ID의 이름을 작성합니다.

![google oauth registration 15](/assets/images/google-oauth-registration15.jpg)

```text
http://localhost:8080/login/oauth2/code/google
```

리다이렉션 URI에 위와 같이 작성해줍니다. 이 URI는 밑에서 설명하겠지만 구글 로그인이 완료된 후 리다이렉션되는 페이지를 말합니다.

![google oauth registration 16](/assets/images/google-oauth-registration16.jpg)

OAuth 클라이언트를 생성하고 나면 클라이언트 ID(client-id)와 클라이언트 보안 비밀번호(client-secret)을 얻을 수 있습니다.

client-id와 client-secret은 스프링 OAuth 설정 시 사용되므로 잘 복사해두어야합니다.

#### 페이스북 OAuth 서비스 등록

{% include base/components/link.html title='Facebook for Developers' internal_link='https://developers.facebook.com' %}

역시나 페이스북 계정은 있다는 가정하에 서비스 등록방법을 소개해보도록 하겠습니다. 페이스북 로그인을 사용하기위해서는 위 링크를 통해 페이스북 개발자 페이지로 이동해야합니다.

![facebook oauth registration 01](/assets/images/facebook-oauth-registration01.jpg)

오른쪽 상단에 내 앱이라는 탭을 선택하고, 앱 만들기를 클릭합니다.

![facebook oauth registration 02](/assets/images/facebook-oauth-registration02.jpg)

앱 유형 선택은 `비즈니스`로 선택합니다.

![facebook oauth registration 03](/assets/images/facebook-oauth-registration03.jpg)

자신의 서비스에 맞는 앱 이름을 설정해줍니다.

![facebook oauth registration 04](/assets/images/facebook-oauth-registration04.jpg)

앱 목적에는 클라이언트를 선택합니다.

![facebook oauth registration 05](/assets/images/facebook-oauth-registration05.jpg)

앱이 생성되면 위 사진과 같이 앱ID가 생성된 것을 보실 수 있습니다. 그 이후 왼쪽 상단의 선택 박스를 클릭합니다.

![facebook oauth registration 06](/assets/images/facebook-oauth-registration06.jpg)

저희는 테스트용으로 로그인을 할 것이기 때문에 `테스트 앱 만들기`를 선택합니다.

![facebook oauth registration 07](/assets/images/facebook-oauth-registration07.jpg)

테스트 앱 이름을 적절하게 넣어주고 테스트 앱을 만듭니다.

![facebook oauth registration 08](/assets/images/facebook-oauth-registration08.jpg)

위 사진과 같이 테스트 앱이 만들어지면 앱ID가 새로 생성됩니다. 이 후 대시보드에서 Facebook 로그인의 설정 버튼을 클릭합니다.

![facebook oauth registration 09](/assets/images/facebook-oauth-registration09.jpg)

Spring REST API로 OAuth 로그인을 구현할 것이기 때문에 웹 플랫폼을 선택합니다.

![facebook oauth registration 10](/assets/images/facebook-oauth-registration10.jpg)

사이트 URL은 위 사진과 같이 `http://localhost:30000`으로 설정하고 저장합니다.

![facebook oauth registration 11](/assets/images/facebook-oauth-registration11.jpg)

```text
http://localhost:8080/login/oauth2/code/google
```

왼쪽 탭 하단의 Facebook 설정으로 들어가서 리다이렉션 URL 설정하는 부분이 있습니다. 위 처럼 리다이렉션 URL을 설정해주고 저장합니다.

![facebook oauth registration 12](/assets/images/facebook-oauth-registration12.jpg)

기본 설정 탭으로 들어가면 앱ID(client-id)와 앱 시크릿 코드(client-secret)을 확인하실 수 있습니다.

앱ID와 앱 시크릿 코드를 복사해둡니다.

#### 네이버 OAuth 서비스 등록

{% include base/components/link.html title='네이버 개발자 센터 - NAVER Developers' internal_link='https://developers.naver.com' %}

역시나 네이버 계정을 이미 가지고 있다고 생각하고 서비스 등록 방법을 소개하겠습니다. 위 링크를 통해서 네이버 개발자 센터로 이동합니다.

![naver oauth registration 01](/assets/images/naver-oauth-registration01.jpg)

로그인을 한 후, 상단 탭의 내 어플리케이션을 선택합니다.

![naver oauth registration 02](/assets/images/naver-oauth-registration02.jpg)

`Application 등록` 버튼을 클릭하여 새로운 어플리케이션을 등록합니다.

![naver oauth registration 03](/assets/images/naver-oauth-registration03.jpg)

어플리케이션의 이름을 설정합니다.

![naver oauth registration 04](/assets/images/naver-oauth-registration04.jpg)

사용할 API 중 네아로(네이버 아이디로 로그인) API를 선택하고, 위 사진과 같이 제공 정보(scope) 설정을 해줍니다.

![naver oauth registration 05](/assets/images/naver-oauth-registration05.jpg)

```text
서비스 URL: http://localhost:3000
Callback URL: http://localhost:8080/login/ouath2/code/naver
```

환경은 PC 웹으로 선택하고 위 와 같이 서비스 URL과 Callback URL을 설정해줍니다.

![naver oauth registration 06](/assets/images/naver-oauth-registration06.jpg)

전부 설정이 완료되었으면 등록하기를 눌러 어플리케이션을 생성해줍니다.

![naver oauth registration 07](/assets/images/naver-oauth-registration07.jpg)

어플리케이션 생성이 완료되면 어플리케이션 정보를 확인할 수 있고, Client ID(client-id)와 Client Secret(client-secret)을 복사해둡니다.

#### 카카오 OAuth 서비스 등록

{% include base/components/link.html title='Kakao Developers' internal_link='https://developers.kakao.com' %}

카카오 계정이 있다고 가정하고 서비스 등록 방법 소개하도록 하겠습니다. 위 링크를 통해서 카카오 개발자 페이지로 이동합니다.

![kakao oauth registration 01](/assets/images/kakao-oauth-registration01.jpg)

로그인을 한 후, 상단 탬의 내 어플리케이션을 선택합니다.

![kakao oauth registration 02](/assets/images/kakao-oauth-registration02.jpg)

위 사진과 같이 어플리케이션을 추가합니다.

![kakao oauth registration 03](/assets/images/kakao-oauth-registration03.jpg)

어플리케이션 이름과 사업자명을 입력하고 저장합니다.

![kakao oauth registration 04](/assets/images/kakao-oauth-registration04.jpg)

요약정보 화면을 보시면 앱키 리스트가 있는 것을 확인하실 수 있습니다. 저희는 REST API로 이용할 예정이기 때문에 `REST API 키`(client-id)를 복사해둡니다.

이 후, 왼쪽 탭의 동의 항목으로 이동합니다.

![kakao oauth registration 05](/assets/images/kakao-oauth-registration05.jpg)

동의 항목 중 닉네임을 필수 동의로 한 후 저장합니다.

![kakao oauth registration 06](/assets/images/kakao-oauth-registration06.jpg)

동의 항목 중 프로필 이미지 또한 필수 동의로 설정한 후 저장합니다.

![kakao oauth registration 07](/assets/images/kakao-oauth-registration07.jpg)

이메일은 민감 정보로 분류가 될 수 있기 때문에 카카오의 승인을 받아야합니다. 따라서 선택 동의로 받도록 설정한 후 저장합니다.

![kakao oauth registration 08](/assets/images/kakao-oauth-registration08.jpg)

위 사진과 같이 동의 항목(scope)을 설정합니다.

![kakao oauth registration 09](/assets/images/kakao-oauth-registration09.jpg)

왼쪽 탭의 카카오 로그인을 선택한 후 활성화 설정을 `OFF` -> `ON`으로 변경합니다.

![kakao oauth registration 10](/assets/images/kakao-oauth-registration10.jpg)

다음은 Client Secret을 생성하기 위해 왼쪽에 보안 탭을 클릭하고 코드 생성 버튼을 눌러줍니다.

![kakao oauth registration 11](/assets/images/kakao-oauth-registration11.jpg)

코드값(client-secret)을 복사해둔 후, 활성화 상태를 사용으로 변경해줍니다.

![kakao oauth registration 12](/assets/images/kakao-oauth-registration12.jpg)

다음은 리다이렉션 URI 설정을 위해 다시 카카오 로그인 탭으로 이동하고, `Redirect URI 등록`을 클릭합니다.

![kakao oauth registration 13](/assets/images/kakao-oauth-registration13.jpg)

```text
http://localhost:8080/login/oauth2/code/kakao
```

위와 같이 리다이렉션 URI를 설정한 후, 저장해줍니다.

### 전체 시퀀스 다이어그램

![spring social diagram](/assets/images/springboot-oauth.jpg)

{% include base/components/hint-box.html type='info' list='시퀀스 상단: OAuth2.0 표준을 따르는 소셜 로그인 시퀀스 다이어그램|시퀀스 하단: JWT 토큰의 유효기간이 끝났을 때의 시퀀스 다이어그램' %}

#### 시퀀스 설명

> 1. 소셜 로그인 요청
> 2. 백엔드로 GET "/oauth2/authorization/{provider-id}?redirect_uri=http://localhost:3000/oauth/redirect"으로 OAuth 인가 요청
> 3. Provider 별로 Authorization Code 인증을 할 수 있도록 리다이렉트 (Redirect: GET
"https://oauth.provider.com/oauth2.0/authorize?...")
> 4. 리다이렉트 화면에서 provider 서비스에 로그인
> 5. 로그인이 완료된 후, Athorization server로부터 백엔드로 Authorization 코드 응답
> 6. 백엔드에서 인가 코드를 이용하여 Authorization Server에 엑세스 토큰 요청
> 7. 엑세스 토큰 획득
> 8. 엑세스 토큰을 이용하여 Resource Server에 유저 데이터 요청
> 9. 획득한 유저 데이터를 DB에 저장 후, JWT 엑세스 토큰과 리프레시 토큰을 생성
> 10. 리프레시 토큰은 수정 불가능한 쿠키에 저장하고, 엑세스 토큰은 프로트엔드 리다이렉트 URI 에 쿼리스트링에 토큰을 담아 리다이렉트 (Redirect: GET http://localhost:3000/oauth/redirect?token={jwt-token})
> 11. 프론트엔드에서 토큰을 저장 후, API 요청 시 헤더에 `Authroization: Bearer {token}`을 추가하여 요청
> 12. 백엔드에서는 토큰을 확인하여 권한 확인
> 13. 토큰이 만료된 경우, 쿠키에 저장된 리프레시 토큰을 이용하여 엑세스 토큰과 리프레시 토큰을 재발급

##### 3번 요청 예시

```text
GET
https://oauth.provider.com/oauth2.0/authorize
  ?response_type=code
  &client_id={client_id}
  &scope=profile
  &state={random_string}
  &redirect_uri=http://localhost:8080/login/oauth2/code/{provider-id}
```

##### 5번 리다이렉트 응답 예시

```text
GET
/login/oauth2/code/{provider-id}?code=MLiFGqZjfdubcXUqOexxdN4TKXCICuP1Kp9D5vKQcCwx5AmQPZewX5rDQAXE80ucXsSZZwo9c00AAAF68RgEXQ&state=Vi2q6hfu7YqKwcVxrIaVt1FFzy-qkOMhVzbwf7CaEZU%3D
```

##### 6번 엑세스 토큰 요청 예시

```text
POST
https://auth.provider.com/oauth/token
{
  "grant_type": "authorization_code",
  "code": "MLiFGqZjfdubcXUqOexxdN4TKXCICuP1Kp9D5vKQcCwx5AmQPZewX5rDQAXE80ucXsSZZwo9c00AAAF68RgEXQ",
  "redirect_uri": "http://localhost:8080/login/oauth2/code/{provider-id}",
  "client_id": "{client-id}",
  "client_secret": "{client-secret}"
}
```

##### 8번 리소스 서버로 유저 정보 요청

```text
GET
https://api.provider.com/user/me
```

### 예제 프로젝트

REST API 기반으로 OAuth 로그인을 구현하기 위해서는 프론트엔드와 백엔드 프로젝트 모두 있어야합니다. 따라서 다음과 같이 프론트엔드 프로젝트와 백엔드 프로젝트를 각각 생성하도록 하겠습니다.

이 포스팅에서는 주요 코드에 대한 설명만 할 예정이기 때문에 혹시 자세한 코드가 궁금하신 분이나 예제 프로젝트를 실행해보고 싶은 분들은 아래 링크를 통해 확인하시거나 실행해볼 수 있습니다.

#### 프론트엔드 (Vue Project)

{% include base/components/link.html title='deeplify/oauth-login-fe: OAuth login fe vue project' internal_link='https://github.com/deepIify/oauth-login-fe' %}

#### 백엔드 (Spring Boot Project)

{% include base/components/link.html title='deeplify/oauth-login-be: OAuth login be spring boot project' internal_link='https://github.com/deepIify/oauth-login-be' %}

### 프론트엔드 OAuth 로그인

프론트엔드의 경우, 소셜 로그인 버튼을 눌렀을 때, 백엔드에 어떤 요청을 하는지와 인증이 끝난 후, 엑세스 토큰을 어떻게 저장하는지에 대해서만 간략하게 알아보도록 하겠습니다.

#### 소셜 로그인 버튼

![oauth login](/assets/images/oauth-login.jpg)

```text
http://localhost:8080/oauth2/authorization/{provider-id}?redirect_uri=http://localhost:3000/oauth/redirect
```

위 사진과 같이 각 서비스 제공자 별로 백엔드에 요청합니다.

`redirect_uri`는 인증이 완료된 후, 백엔드 API에 접근할 수 있는 **Access Token**을 쿼리스트링으로 받을 수 있는 프론트엔드 페이지입니다.

##### Redirect 페이지

```js
<template lang="pug">
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  created () {
    // 컴포넌트 렌더링이 되었을 때,

    // 쿼리스트링으로부터 토큰을 획득
    const token = this.$route.query.token
    console.log('token', token)

    // 토큰이 존재하는 경우, Vuex Store에 토큰을 저장한다.
    if (token) {
      this.setToken(token)
      this.fetchUser()
    }

    // 토큰이 있던 없던, 루트 페이지로 이동한다.
    this.$router.replace('/')
  },
  methods: {
    ...mapActions(['fetchUser']),
    ...mapMutations(['setToken'])
  }
}
</script>
```

```text
# 백엔드 --Redirect--> 프론트엔드
http://localhost:3000/oauth/redirect?token={jwt-token}
```

소셜 로그인 요청에 파라미터로 같이 넣어주었던 `redirect_uri`에 쿼리스트링을 추가해 백엔드에서 프론트엔드로 토큰을 전달해준다.

프론트엔드에서 받은 토큰을 저장한 후, 백엔드 API 요청 시 헤더에 토큰을 추가하여 API를 사용할 수 있습니다.

### 백엔드 OAuth 로그인

백엔드에 OAuth 설정은 코드량이 좀 많아 잘 설명드릴 수 있을지 걱정이 됩니다만 가능한 잘 설명드리도록 하겠습니다.

#### build.gradle 의존성

```gradle
//... 생략 ...

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-oauth2-client'
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-log4j2'
    implementation 'io.jsonwebtoken:jjwt-api:0.11.2'
    implementation 'jakarta.xml.bind:jakarta.xml.bind-api:2.3.2'
    runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.11.2'
    runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.11.2'
    compileOnly 'org.projectlombok:lombok'
    developmentOnly 'org.springframework.boot:spring-boot-devtools'
    runtimeOnly 'mysql:mysql-connector-java'
    annotationProcessor 'org.projectlombok:lombok'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testImplementation 'org.springframework.security:spring-security-test'
}

//... 생략 ...
```

##### application.yml

```yaml
spring:
  profiles.active: local
  # 데이터 소스 설정
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/oauth_login_tutorial?useSSL=false&serverTimezone=UTC&useLegacyDatetimeCode=false&allowPublicKeyRetrieval=true
    username: root
    password: root
    hikari:
      pool-name: jpa-hikari-pool
      maximum-pool-size: 5
      jdbc-url: ${spring.datasource.url}
      username: ${spring.datasource.username}
      password: ${spring.datasource.password}
      driver-class-name: ${spring.datasource.driver-class-name}
      data-source-properties:
        rewriteBatchedStatements: true
  # JPA 설정
  jpa:
    generate-ddl: true
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        hbm2ddl.import_files_sql_extractor: org.hibernate.tool.hbm2ddl.MultipleLinesSqlCommandExtractor
        current_session_context_class: org.springframework.orm.hibernate5.SpringSessionContext
        default_batch_fetch_size: ${chunkSize:100}
        jdbc.batch_size: 20
        order_inserts: true
        order_updates: true
        format_sql: true
  # Security OAuth
  security:
    oauth2.client:
      registration:
        google:
          clientId: '{구글 client-id}'
          clientSecret: '{구글 client-secret}'
          scope:
            - email
            - profile
        facebook:
          clientId: '{페이스북 client-id}'
          clientSecret: '{페이스북 client-secret}'
          scope:
            - email
            - public_profile
        naver:
          clientId: '{네이버 client-id}'
          clientSecret: '{네이버 client-secret}'
          clientAuthenticationMethod: post
          authorizationGrantType: authorization_code
          redirectUri: "{baseUrl}/{action}/oauth2/code/{registrationId}"
          scope:
            - nickname
            - email
            - profile_image
          clientName: Naver
        kakao:
          clientId: '{카카오 client-id}'
          clientSecret: '{카카오 client-secret}'
          clientAuthenticationMethod: post
          authorizationGrantType: authorization_code
          redirectUri: "{baseUrl}/{action}/oauth2/code/{registrationId}"
          scope:
            - profile_nickname
            - profile_image
            - account_email
          clientName: Kakao
      # Provider 설정
      provider:
        naver:
          authorizationUri: https://nid.naver.com/oauth2.0/authorize
          tokenUri: https://nid.naver.com/oauth2.0/token
          userInfoUri: https://openapi.naver.com/v1/nid/me
          userNameAttribute: response
        kakao:
          authorizationUri: https://kauth.kakao.com/oauth/authorize
          tokenUri: https://kauth.kakao.com/oauth/token
          userInfoUri: https://kapi.kakao.com/v2/user/me
          userNameAttribute: id

# cors 설정
cors:
  allowed-origins: 'http://localhost:3000'
  allowed-methods: GET,POST,PUT,DELETE,OPTIONS
  allowed-headers: '*'
  max-age: 3600

# jwt secret key 설정
jwt.secret: '8sknjlO3NPTBqo319DHLNqsQAfRJEdKsETOds'

# 토큰 관련 secret Key 및 RedirectUri 설정
app:
  auth:
    tokenSecret: 926D96C90030DD58429D2751AC1BDBBC
    tokenExpiry: 1800000
    refreshTokenExpiry: 604800000
  oauth2:
    authorizedRedirectUris:
      - http://localhost:3000/oauth/redirect
```

#### 프로젝트 구조

```text
com/deeplify/tutorial/oauthlogin
├── OauthLoginApplication.java
├── api
│   ├── controller
│   │   ├── auth
│   │   │   └── AuthController.java
│   │   └── user
│   │       └── UserController.java
│   ├── entity
│   │   ├── auth
│   │   │   └── AuthReqModel.java
│   │   └── user
│   │       ├── User.java
│   │       └── UserRefreshToken.java
│   ├── repository
│   │   └── user
│   │       ├── UserRefreshTokenRepository.java
│   │       └── UserRepository.java
│   └── service
│       └── UserService.java
├── common
│   ├── ApiResponse.java
│   └── ApiResponseHeader.java
├── config
│   ├── properties
│   │   ├── AppProperties.java
│   │   └── CorsProperties.java
│   └── security
│       ├── JwtConfig.java
│       └── SecurityConfig.java
├── oauth
│   ├── entity
│   │   ├── ProviderType.java
│   │   ├── RoleType.java
│   │   └── UserPrincipal.java
│   ├── exception
│   │   ├── OAuthProviderMissMatchException.java
│   │   ├── RestAuthenticationEntryPoint.java
│   │   └── TokenValidFailedException.java
│   ├── filter
│   │   └── TokenAuthenticationFilter.java
│   ├── handler
│   │   ├── OAuth2AuthenticationFailureHandler.java
│   │   ├── OAuth2AuthenticationSuccessHandler.java
│   │   └── TokenAccessDeniedHandler.java
│   ├── info
│   │   ├── OAuth2UserInfo.java
│   │   ├── OAuth2UserInfoFactory.java
│   │   └── impl
│   │       ├── FacebookOAuth2UserInfo.java
│   │       ├── GoogleOAuth2UserInfo.java
│   │       ├── KakaoOAuth2UserInfo.java
│   │       └── NaverOAuth2UserInfo.java
│   ├── repository
│   │   └── OAuth2AuthorizationRequestBasedOnCookieRepository.java
│   ├── service
│   │   ├── CustomOAuth2UserService.java
│   │   └── CustomUserDetailsService.java
│   └── token
│       ├── AuthToken.java
│       └── AuthTokenProvider.java
└── utils
    ├── CookieUtil.java
    └── HeaderUtil.java
```

전체 프로젝트 구조입니다. 이렇게 보니까 양이 엄청 많아보이지만 OAuth 로그인 설정에 꼭 필요합니다.

지금부터 하나하나 살펴보도록 하겠습니다.

##### AuthToken

```java
@Slf4j
@RequiredArgsConstructor
public class AuthToken {

    @Getter
    private final String token;
    private final Key key;

    private static final String AUTHORITIES_KEY = "role";

    AuthToken(String id, Date expiry, Key key) {
        this.key = key;
        this.token = createAuthToken(id, expiry);
    }

    AuthToken(String id, String role, Date expiry, Key key) {
        this.key = key;
        this.token = createAuthToken(id, role, expiry);
    }

    private String createAuthToken(String id, Date expiry) {
        return Jwts.builder()
                .setSubject(id)
                .signWith(key, SignatureAlgorithm.HS256)
                .setExpiration(expiry)
                .compact();
    }

    private String createAuthToken(String id, String role, Date expiry) {
        return Jwts.builder()
                .setSubject(id)
                .claim(AUTHORITIES_KEY, role)
                .signWith(key, SignatureAlgorithm.HS256)
                .setExpiration(expiry)
                .compact();
    }

    public boolean validate() {
        return this.getTokenClaims() != null;
    }

    public Claims getTokenClaims() {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (SecurityException e) {
            log.info("Invalid JWT signature.");
        } catch (MalformedJwtException e) {
            log.info("Invalid JWT token.");
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token.");
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT token.");
        } catch (IllegalArgumentException e) {
            log.info("JWT token compact of handler are invalid.");
        }
        return null;
    }

    public Claims getExpiredTokenClaims() {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token.");
            return e.getClaims();
        }
        return null;
    }
}
```

##### AuthTokenProvider

```java
@Slf4j
public class AuthTokenProvider {

    private final Key key;
    private static final String AUTHORITIES_KEY = "role";

    public AuthTokenProvider(String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public AuthToken createAuthToken(String id, Date expiry) {
        return new AuthToken(id, expiry, key);
    }

    public AuthToken createAuthToken(String id, String role, Date expiry) {
        return new AuthToken(id, role, expiry, key);
    }

    public AuthToken convertAuthToken(String token) {
        return new AuthToken(token, key);
    }

    public Authentication getAuthentication(AuthToken authToken) {

        if(authToken.validate()) {

            Claims claims = authToken.getTokenClaims();
            Collection<? extends GrantedAuthority> authorities =
                    Arrays.stream(new String[]{claims.get(AUTHORITIES_KEY).toString()})
                            .map(SimpleGrantedAuthority::new)
                            .collect(Collectors.toList());

            log.debug("claims subject := [{}]", claims.getSubject());
            User principal = new User(claims.getSubject(), "", authorities);

            return new UsernamePasswordAuthenticationToken(principal, authToken, authorities);
        } else {
            throw new TokenValidFailedException();
        }
    }
}
```

##### JwtConfig

```java
@Configuration
public class JwtConfig {
    @Value("${jwt.secret}")
    private String secret;

    @Bean
    public AuthTokenProvider jwtProvider() {
        return new AuthTokenProvider(secret);
    }
}
```

Jwt을 사용하기 위한 설정입니다.

##### TokenAuthenticationFilter

```java
@Slf4j
@RequiredArgsConstructor
public class TokenAuthenticationFilter extends OncePerRequestFilter {
    private final AuthTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)  throws ServletException, IOException {

        String tokenStr = HeaderUtil.getAccessToken(request);
        AuthToken token = tokenProvider.convertAuthToken(tokenStr);

        if (token.validate()) {
            Authentication authentication = tokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }
}
```

##### TokenValidFailedException

```java
public class TokenValidFailedException extends RuntimeException {

    public TokenValidFailedException() {
        super("Failed to generate Token.");
    }

    private TokenValidFailedException(String message) {
        super(message);
    }
}
```

##### TokenAccessDeniedHandler

```java
@Component
@RequiredArgsConstructor
public class TokenAccessDeniedHandler implements AccessDeniedHandler {

    private final HandlerExceptionResolver handlerExceptionResolver;

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException {
        //response.sendError(HttpServletResponse.SC_FORBIDDEN, accessDeniedException.getMessage());
        handlerExceptionResolver.resolveException(request, response, null, accessDeniedException);
    }
}
```

##### ProviderType

```java
@Getter
public enum ProviderType {
    GOOGLE,
    FACEBOOK,
    NAVER,
    KAKAO,
    LOCAL;
}
```

##### RoleType

```java
@Getter
@AllArgsConstructor
public enum RoleType {
    USER("ROLE_USER", "일반 사용자 권한"),
    ADMIN("ROLE_ADMIN", "관리자 권한"),
    GUEST("GUEST", "게스트 권한");

    private final String code;
    private final String displayName;

    public static RoleType of(String code) {
        return Arrays.stream(RoleType.values())
                .filter(r -> r.getCode().equals(code))
                .findAny()
                .orElse(GUEST);
    }
}
```

##### User

```java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USER")
public class User {
    @JsonIgnore
    @Id
    @Column(name = "USER_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userSeq;

    @Column(name = "USER_ID", length = 64, unique = true)
    @NotNull
    @Size(max = 64)
    private String userId;

    @Column(name = "USERNAME", length = 100)
    @NotNull
    @Size(max = 100)
    private String username;

    @JsonIgnore
    @Column(name = "PASSWORD", length = 128)
    @NotNull
    @Size(max = 128)
    private String password;

    @Column(name = "EMAIL", length = 512, unique = true)
    @NotNull
    @Size(max = 512)
    private String email;

    @Column(name = "EMAIL_VERIFIED_YN", length = 1)
    @NotNull
    @Size(min = 1, max = 1)
    private String emailVerifiedYn;

    @Column(name = "PROFILE_IMAGE_URL", length = 512)
    @NotNull
    @Size(max = 512)
    private String profileImageUrl;

    @Column(name = "PROVIDER_TYPE", length = 20)
    @Enumerated(EnumType.STRING)
    @NotNull
    private ProviderType providerType;

    @Column(name = "ROLE_TYPE", length = 20)
    @Enumerated(EnumType.STRING)
    @NotNull
    private RoleType roleType;

    @Column(name = "CREATED_AT")
    @NotNull
    private LocalDateTime createdAt;

    @Column(name = "MODIFIED_AT")
    @NotNull
    private LocalDateTime modifiedAt;

    public User(
            @NotNull @Size(max = 64) String userId,
            @NotNull @Size(max = 100) String username,
            @NotNull @Size(max = 512) String email,
            @NotNull @Size(max = 1) String emailVerifiedYn,
            @NotNull @Size(max = 512) String profileImageUrl,
            @NotNull ProviderType providerType,
            @NotNull RoleType roleType,
            @NotNull LocalDateTime createdAt,
            @NotNull LocalDateTime modifiedAt
    ) {
        this.userId = userId;
        this.username = username;
        this.password = "NO_PASS";
        this.email = email != null ? email : "NO_EMAIL";
        this.emailVerifiedYn = emailVerifiedYn;
        this.profileImageUrl = profileImageUrl != null ? profileImageUrl : "";
        this.providerType = providerType;
        this.roleType = roleType;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
}
```

##### UserRepository

```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(String userId);
}
```

##### UserRefreshToken

```java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USER_REFRESH_TOKEN")
public class UserRefreshToken {
    @JsonIgnore
    @Id
    @Column(name = "REFRESH_TOKEN_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long refreshTokenSeq;

    @Column(name = "USER_ID", length = 64, unique = true)
    @NotNull
    @Size(max = 64)
    private String userId;

    @Column(name = "REFRESH_TOKEN", length = 256)
    @NotNull
    @Size(max = 256)
    private String refreshToken;

    public UserRefreshToken(
            @NotNull @Size(max = 64) String userId,
            @NotNull @Size(max = 256) String refreshToken
    ) {
        this.userId = userId;
        this.refreshToken = refreshToken;
    }
}
```

##### UserRefreshTokenRepository

```java
@Repository
public interface UserRefreshTokenRepository extends JpaRepository<UserRefreshToken, Long> {
    UserRefreshToken findByUserId(String userId);
    UserRefreshToken findByUserIdAndRefreshToken(String userId, String refreshToken);
}
```

##### UserPrincipal

```java
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class UserPrincipal implements OAuth2User, UserDetails, OidcUser {
    private final String userId;
    private final String password;
    private final ProviderType providerType;
    private final RoleType roleType;
    private final Collection<GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getName() {
        return userId;
    }

    @Override
    public String getUsername() {
        return userId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Map<String, Object> getClaims() {
        return null;
    }

    @Override
    public OidcUserInfo getUserInfo() {
        return null;
    }

    @Override
    public OidcIdToken getIdToken() {
        return null;
    }

    public static UserPrincipal create(User user) {
        return new UserPrincipal(
                user.getUserId(),
                user.getPassword(),
                user.getProviderType(),
                RoleType.USER,
                Collections.singletonList(new SimpleGrantedAuthority(RoleType.USER.getCode()))
        );
    }

    public static UserPrincipal create(User user, Map<String, Object> attributes) {
        UserPrincipal userPrincipal = create(user);
        userPrincipal.setAttributes(attributes);

        return userPrincipal;
    }
}
```

##### CustomOAuth2UserService

```java
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);

        try {
            return this.process(userRequest, user);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User user) {
        ProviderType providerType = ProviderType.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase());

        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
        User savedUser = userRepository.findByUserId(userInfo.getId());

        if (savedUser != null) {
            if (providerType != savedUser.getProviderType()) {
                throw new OAuthProviderMissMatchException(
                        "Looks like you're signed up with " + providerType +
                        " account. Please use your " + savedUser.getProviderType() + " account to login."
                );
            }
            updateUser(savedUser, userInfo);
        } else {
            savedUser = createUser(userInfo, providerType);
        }

        return UserPrincipal.create(savedUser, user.getAttributes());
    }

    private User createUser(OAuth2UserInfo userInfo, ProviderType providerType) {
        LocalDateTime now = LocalDateTime.now();
        User user = new User(
                userInfo.getId(),
                userInfo.getName(),
                userInfo.getEmail(),
                "Y",
                userInfo.getImageUrl(),
                providerType,
                RoleType.USER,
                now,
                now
        );

        return userRepository.saveAndFlush(user);
    }

    private User updateUser(User user, OAuth2UserInfo userInfo) {
        if (userInfo.getName() != null && !user.getUsername().equals(userInfo.getName())) {
            user.setUsername(userInfo.getName());
        }

        if (userInfo.getImageUrl() != null && !user.getProfileImageUrl().equals(userInfo.getImageUrl())) {
            user.setProfileImageUrl(userInfo.getImageUrl());
        }

        return user;
    }
}
```

##### OAuth2UserInfoFactory

```java
public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(ProviderType providerType, Map<String, Object> attributes) {
        switch (providerType) {
            case GOOGLE: return new GoogleOAuth2UserInfo(attributes);
            case FACEBOOK: return new FacebookOAuth2UserInfo(attributes);
            case NAVER: return new NaverOAuth2UserInfo(attributes);
            case KAKAO: return new KakaoOAuth2UserInfo(attributes);
            default: throw new IllegalArgumentException("Invalid Provider Type.");
        }
    }
}
```

##### OAuth2UserInfo

```java
public abstract class OAuth2UserInfo {
    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public abstract String getId();

    public abstract String getName();

    public abstract String getEmail();

    public abstract String getImageUrl();
}
```

##### GoogleOAuth2UserInfo

```java
public class GoogleOAuth2UserInfo extends OAuth2UserInfo {

    public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get("sub");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getImageUrl() {
        return (String) attributes.get("picture");
    }
}
```

##### FacebookOAuth2UserInfo

```java
public class FacebookOAuth2UserInfo extends OAuth2UserInfo {
    public FacebookOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get("id");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getImageUrl() {
        return (String) attributes.get("imageUrl");
    }
}
```

##### NaverOAuth2UserInfo

```java
public class NaverOAuth2UserInfo extends OAuth2UserInfo {

    public NaverOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        if (response == null) {
            return null;
        }

        return (String) response.get("id");
    }

    @Override
    public String getName() {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        if (response == null) {
            return null;
        }

        return (String) response.get("nickname");
    }

    @Override
    public String getEmail() {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        if (response == null) {
            return null;
        }

        return (String) response.get("email");
    }

    @Override
    public String getImageUrl() {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        if (response == null) {
            return null;
        }

        return (String) response.get("profile_image");
    }
}
```

##### KakaoOAuth2UserInfo

```java
public class KakaoOAuth2UserInfo extends OAuth2UserInfo {

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getName() {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");

        if (properties == null) {
            return null;
        }

        return (String) properties.get("nickname");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("account_email");
    }

    @Override
    public String getImageUrl() {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");

        if (properties == null) {
            return null;
        }

        return (String) properties.get("thumbnail_image");
    }
}
```

##### CustomUserDetailsService

```java
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserId(username);
        if (user == null) {
            throw new UsernameNotFoundException("Can not find username.");
        }
        return UserPrincipal.create(user);
    }
}
```

##### OAuth2AuthenticationFailureHandler

```java
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    private final OAuth2AuthorizationRequestBasedOnCookieRepository authorizationRequestRepository;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        String targetUrl = CookieUtil.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElse(("/"));

        exception.printStackTrace();

        targetUrl = UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("error", exception.getLocalizedMessage())
                .build().toUriString();

        authorizationRequestRepository.removeAuthorizationRequestCookies(request, response);

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
```

##### OAuth2AuthenticationSuccessHandler

```java
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final AuthTokenProvider tokenProvider;
    private final AppProperties appProperties;
    private final UserRefreshTokenRepository userRefreshTokenRepository;
    private final OAuth2AuthorizationRequestBasedOnCookieRepository authorizationRequestRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Optional<String> redirectUri = CookieUtil.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);

        if(redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
            throw new IllegalArgumentException("Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
        }

        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
        ProviderType providerType = ProviderType.valueOf(authToken.getAuthorizedClientRegistrationId().toUpperCase());

        OidcUser user = ((OidcUser) authentication.getPrincipal());
        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
        Collection<? extends GrantedAuthority> authorities = ((OidcUser) authentication.getPrincipal()).getAuthorities();

        RoleType roleType = hasAuthority(authorities, RoleType.ADMIN.getCode()) ? RoleType.ADMIN : RoleType.USER;

        Date now = new Date();
        AuthToken accessToken = tokenProvider.createAuthToken(
                userInfo.getId(),
                roleType.getCode(),
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
        );

        // refresh 토큰 설정
        long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();

        AuthToken refreshToken = tokenProvider.createAuthToken(
                appProperties.getAuth().getTokenSecret(),
                new Date(now.getTime() + refreshTokenExpiry)
        );

        // DB 저장
        UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserId(userInfo.getId());
        if (userRefreshToken != null) {
            userRefreshToken.setRefreshToken(refreshToken.getToken());
        } else {
            userRefreshToken = new UserRefreshToken(userInfo.getId(), refreshToken.getToken());
            userRefreshTokenRepository.saveAndFlush(userRefreshToken);
        }

        int cookieMaxAge = (int) refreshTokenExpiry / 60;

        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
        CookieUtil.addCookie(response, REFRESH_TOKEN, refreshToken.getToken(), cookieMaxAge);

        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("token", accessToken.getToken())
                .build().toUriString();
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        authorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }

    private boolean hasAuthority(Collection<? extends GrantedAuthority> authorities, String authority) {
        if (authorities == null) {
            return false;
        }

        for (GrantedAuthority grantedAuthority : authorities) {
            if (authority.equals(grantedAuthority.getAuthority())) {
                return true;
            }
        }
        return false;
    }

    private boolean isAuthorizedRedirectUri(String uri) {
        URI clientRedirectUri = URI.create(uri);

        return appProperties.getOauth2().getAuthorizedRedirectUris()
                .stream()
                .anyMatch(authorizedRedirectUri -> {
                    // Only validate host and port. Let the clients use different paths if they want to
                    URI authorizedURI = URI.create(authorizedRedirectUri);
                    if(authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
                            && authorizedURI.getPort() == clientRedirectUri.getPort()) {
                        return true;
                    }
                    return false;
                });
    }
}
```

##### OAuthProviderMissMatchException

```java
public class OAuthProviderMissMatchException extends RuntimeException {

    public OAuthProviderMissMatchException(String message) {
        super(message);
    }
}
```

##### RestAuthenticationEntryPoint

```java
@Slf4j
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException
    ) throws IOException, ServletException {
        authException.printStackTrace();
        log.info("Responding with unauthorized error. Message := {}", authException.getMessage());
        response.sendError(
                HttpServletResponse.SC_UNAUTHORIZED,
                authException.getLocalizedMessage()
        );
    }
}
```

##### AppProperties

```java
@Getter
@ConfigurationProperties(prefix = "app")
public class AppProperties {

    private final Auth auth = new Auth();
    private final OAuth2 oauth2 = new OAuth2();

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Auth {
        private String tokenSecret;
        private long tokenExpiry;
        private long refreshTokenExpiry;
    }

    public static final class OAuth2 {
        private List<String> authorizedRedirectUris = new ArrayList<>();

        public List<String> getAuthorizedRedirectUris() {
            return authorizedRedirectUris;
        }

        public OAuth2 authorizedRedirectUris(List<String> authorizedRedirectUris) {
            this.authorizedRedirectUris = authorizedRedirectUris;
            return this;
        }
    }
}
```

##### CorsProperties

```java
@Getter
@Setter
@ConfigurationProperties(prefix = "cors")
public class CorsProperties {
    private String allowedOrigins;
    private String allowedMethods;
    private String allowedHeaders;
    private Long maxAge;
}
```

##### SecurityConfig

```java
@Configuration
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CorsProperties corsProperties;
    private final AppProperties appProperties;
    private final AuthTokenProvider tokenProvider;
    private final CustomUserDetailsService userDetailsService;
    private final CustomOAuth2UserService oAuth2UserService;
    private final TokenAccessDeniedHandler tokenAccessDeniedHandler;
    private final UserRefreshTokenRepository userRefreshTokenRepository;

    /*
    * UserDetailsService 설정
    * */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                    .cors()
                .and()
                    .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .csrf().disable()
                    .formLogin().disable()
                    .httpBasic().disable()
                    .exceptionHandling()
                    .authenticationEntryPoint(new RestAuthenticationEntryPoint())
                    .accessDeniedHandler(tokenAccessDeniedHandler)
                .and()
                    .authorizeRequests()
                    .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                    .antMatchers("/api/**").hasAnyAuthority(RoleType.USER.getCode())
                    .antMatchers("/api/**/admin/**").hasAnyAuthority(RoleType.ADMIN.getCode())
                    .anyRequest().authenticated()
                .and()
                    .oauth2Login()
                    .authorizationEndpoint()
                    .baseUri("/oauth2/authorization")
                    .authorizationRequestRepository(oAuth2AuthorizationRequestBasedOnCookieRepository())
                .and()
                    .redirectionEndpoint()
                    .baseUri("/*/oauth2/code/*")
                .and()
                    .userInfoEndpoint()
                    .userService(oAuth2UserService)
                .and()
                    .successHandler(oAuth2AuthenticationSuccessHandler())
                    .failureHandler(oAuth2AuthenticationFailureHandler());

        http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    /*
    * auth 매니저 설정
    * */
    @Override
    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    /*
    * security 설정 시, 사용할 인코더 설정
    * */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /*
    * 토큰 필터 설정
    * */
    @Bean
    public TokenAuthenticationFilter tokenAuthenticationFilter() {
        return new TokenAuthenticationFilter(tokenProvider);
    }

    /*
    * 쿠키 기반 인가 Repository
    * 인가 응답을 연계 하고 검증할 때 사용.
    * */
    @Bean
    public OAuth2AuthorizationRequestBasedOnCookieRepository oAuth2AuthorizationRequestBasedOnCookieRepository() {
        return new OAuth2AuthorizationRequestBasedOnCookieRepository();
    }

    /*
    * Oauth 인증 성공 핸들러
    * */
    @Bean
    public OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler() {
        return new OAuth2AuthenticationSuccessHandler(
                tokenProvider,
                appProperties,
                userRefreshTokenRepository,
                oAuth2AuthorizationRequestBasedOnCookieRepository()
        );
    }

    /*
     * Oauth 인증 실패 핸들러
     * */
    @Bean
    public OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler() {
        return new OAuth2AuthenticationFailureHandler(oAuth2AuthorizationRequestBasedOnCookieRepository());
    }

    /*
    * Cors 설정
    * */
    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource corsConfigSource = new UrlBasedCorsConfigurationSource();

        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.setAllowedHeaders(Arrays.asList(corsProperties.getAllowedHeaders().split(",")));
        corsConfig.setAllowedMethods(Arrays.asList(corsProperties.getAllowedMethods().split(",")));
        corsConfig.setAllowedOrigins(Arrays.asList(corsProperties.getAllowedOrigins().split(",")));
        corsConfig.setAllowCredentials(true);
        corsConfig.setMaxAge(corsConfig.getMaxAge());

        corsConfigSource.registerCorsConfiguration("/**", corsConfig);
        return corsConfigSource;
    }
}
```

##### AuthReqModel

```java
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthReqModel {
    private String id;
    private String password;
}
```

##### AuthController

```java
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AppProperties appProperties;
    private final AuthTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final UserRefreshTokenRepository userRefreshTokenRepository;

    private final static long THREE_DAYS_MSEC = 259200000;
    private final static String REFRESH_TOKEN = "refresh_token";

    @PostMapping("/login")
    public ApiResponse login(
            HttpServletRequest request,
            HttpServletResponse response,
            @RequestBody AuthReqModel authReqModel
    ) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authReqModel.getId(),
                        authReqModel.getPassword()
                )
        );

        String userId = authReqModel.getId();
        SecurityContextHolder.getContext().setAuthentication(authentication);

        Date now = new Date();
        AuthToken accessToken = tokenProvider.createAuthToken(
                userId,
                ((UserPrincipal) authentication.getPrincipal()).getRoleType().getCode(),
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
        );

        long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();
        AuthToken refreshToken = tokenProvider.createAuthToken(
                appProperties.getAuth().getTokenSecret(),
                new Date(now.getTime() + refreshTokenExpiry)
        );

        // userId refresh token 으로 DB 확인
        UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserId(userId);
        if (userRefreshToken == null) {
            // 없는 경우 새로 등록
            userRefreshToken = new UserRefreshToken(userId, refreshToken.getToken());
            userRefreshTokenRepository.saveAndFlush(userRefreshToken);
        } else {
            // DB에 refresh 토큰 업데이트
            userRefreshToken.setRefreshToken(refreshToken.getToken());
        }

        int cookieMaxAge = (int) refreshTokenExpiry / 60;
        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
        CookieUtil.addCookie(response, REFRESH_TOKEN, refreshToken.getToken(), cookieMaxAge);

        return ApiResponse.success("token", accessToken.getToken());
    }

    @GetMapping("/refresh")
    public ApiResponse refreshToken (HttpServletRequest request, HttpServletResponse response) {
        // access token 확인
        String accessToken = HeaderUtil.getAccessToken(request);
        AuthToken authToken = tokenProvider.convertAuthToken(accessToken);
        if (!authToken.validate()) {
            return ApiResponse.invalidAccessToken();
        }

        // expired access token 인지 확인
        Claims claims = authToken.getExpiredTokenClaims();
        if (claims == null) {
            return ApiResponse.notExpiredTokenYet();
        }

        String userId = claims.getSubject();
        RoleType roleType = RoleType.of(claims.get("role", String.class));

        // refresh token
        String refreshToken = CookieUtil.getCookie(request, REFRESH_TOKEN)
                .map(Cookie::getValue)
                .orElse((null));
        AuthToken authRefreshToken = tokenProvider.convertAuthToken(refreshToken);

        if (authRefreshToken.validate()) {
            return ApiResponse.invalidRefreshToken();
        }

        // userId refresh token 으로 DB 확인
        UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserIdAndRefreshToken(userId, refreshToken);
        if (userRefreshToken == null) {
            return ApiResponse.invalidRefreshToken();
        }

        Date now = new Date();
        AuthToken newAccessToken = tokenProvider.createAuthToken(
                userId,
                roleType.getCode(),
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
        );

        long validTime = authRefreshToken.getTokenClaims().getExpiration().getTime() - now.getTime();

        // refresh 토큰 기간이 3일 이하로 남은 경우, refresh 토큰 갱신
        if (validTime <= THREE_DAYS_MSEC) {
            // refresh 토큰 설정
            long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();

            authRefreshToken = tokenProvider.createAuthToken(
                    appProperties.getAuth().getTokenSecret(),
                    new Date(now.getTime() + refreshTokenExpiry)
            );

            // DB에 refresh 토큰 업데이트
            userRefreshToken.setRefreshToken(authRefreshToken.getToken());

            int cookieMaxAge = (int) refreshTokenExpiry / 60;
            CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
            CookieUtil.addCookie(response, REFRESH_TOKEN, authRefreshToken.getToken(), cookieMaxAge);
        }

        return ApiResponse.success("token", newAccessToken.getToken());
    }
}
```

##### UserService

```java
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUser(String userId) {
        return userRepository.findByUserId(userId);
    }
}
```

##### UserController

```java
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ApiResponse getUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userService.getUser(principal.getUsername());

        return ApiResponse.success("user", user);
    }
}
```

##### ApiResponseHeader

```java
@Setter
@Getter
@AllArgsConstructor
public class ApiResponseHeader {
    private int code;
    private String message;
}
```

##### ApiResponse

```java
@Getter
@RequiredArgsConstructor
public class ApiResponse<T> {

    private final static int SUCCESS = 200;
    private final static int NOT_FOUND = 400;
    private final static int FAILED = 500;
    private final static String SUCCESS_MESSAGE = "SUCCESS";
    private final static String NOT_FOUND_MESSAGE = "NOT FOUND";
    private final static String FAILED_MESSAGE = "서버에서 오류가 발생하였습니다.";
    private final static String INVALID_ACCESS_TOKEN = "Invalid access token.";
    private final static String INVALID_REFRESH_TOKEN = "Invalid refresh token.";
    private final static String NOT_EXPIRED_TOKEN_YET = "Not expired token yet.";

    private final ApiResponseHeader header;
    private final Map<String, T> body;

    public static <T> ApiResponse<T> success(String name, T body) {
        Map<String, T> map = new HashMap<>();
        map.put(name, body);

        return new ApiResponse(new ApiResponseHeader(SUCCESS, SUCCESS_MESSAGE), map);
    }

    public static <T> ApiResponse<T> fail() {
        return new ApiResponse(new ApiResponseHeader(FAILED, FAILED_MESSAGE), null);
    }

    public static <T> ApiResponse<T> invalidAccessToken() {
        return new ApiResponse(new ApiResponseHeader(FAILED, INVALID_ACCESS_TOKEN), null);
    }

    public static <T> ApiResponse<T> invalidRefreshToken() {
        return new ApiResponse(new ApiResponseHeader(FAILED, INVALID_REFRESH_TOKEN), null);
    }

    public static <T> ApiResponse<T> notExpiredTokenYet() {
        return new ApiResponse(new ApiResponseHeader(FAILED, NOT_EXPIRED_TOKEN_YET), null);
    }
}
```

## 맺음

포스팅을 나누지 않고 한 번에 작성하다보니 엄청나게 긴 포스팅이 되었습니다. 나눠서 하는 것보다는 이 포스팅 하나만 보면 OAuth 로그인을 구현할 수 있으면 좋겠다는 생각에 이렇게 작성하게되었습니다.

가능한한 최대한 자세하게 설명하려고 노력했지만 부족한 점이 있을 것 같습니다. 혹시나 읽으시면서 궁금하신 점이나 이상한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
