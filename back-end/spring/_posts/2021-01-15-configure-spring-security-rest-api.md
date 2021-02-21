---
layout: post
published: true
title: "[spring boot/스프링] Spring Security REST API 적용 하는 방법"
icon: spring
description: >
  스프링 시큐리티를 REST API에 맞게 설정하는 방법에 대해서 소개합니다.
author: deeplify
toc: true
permalink: /back-end/spring/configure-spring-security-rest-api
tags: 
  - spring security
  - rest api
  - restful
  - rest
  - security
---

요즘 개인적으로 공부도 하면서 `nuxtjs + spring boot`의 조합으로 개발을 하면서 프로젝트를 하나 진행하고 있습니다.

가장 먼저 개발이 필요한 부분은 아무래도 인증과 관련된 부분이라고 생각을 하게 되었고, 여러가지 문서들 및 블로그를 참고하여 개발을 진행했습니다.

이번 글에서는 스프링부트에 **spring security**를 적용하는 과정들을 소개하는 시간을 가져보도록 하겠습니다.

## REST API에 security 설정하는 방법

스프링 security를 설정을 소개하는 문서들은 굉장히 많지만, 제가 느끼기에는 개발자 각자의 스타일대로 설정하시기 때문에 너무 헷갈렸던 것 같아서 저는 좀 더 순차적으로 나눠서 소개해보겠습니다.

### security 의존성 추가

```gradle
dependencies {
  ...

  implementation("org.springframework.boot:spring-boot-starter-security")
  implementation("io.jsonwebtoken:jjwt:0.9.1") // jwt 방식을 사용

  ...

  // security 테스트 관련
  testImplementation("org.springframework.security:spring-security-test")
}
```

위와 같이 `spring-boot-starter-security`와 `jjwt` 의존성을 추가해 주었습니다. 테스트 관련 의존성은 선택입니다.

테스트가 꼭 필요하다고 생각되시는 분들은 추가해주시면됩니다.

### 역할 및 사용자 관련 클래스 정의

```kotlin
enum class RoleType {
    ROLE_USER,
    ROLE_ADMIN;
}
```

우선적으로 `spring security` 에서는 `역할`이라는 개념이 존재합니다. 역할의 용도는 일반 사용자와 관리자를 구분하기 위함입니다.

저는 위 코드처럼 roleType이라는 enum 클래스를 하나 정의해주었습니다.

```kotlin
import com.{groupId}.{name}.{name}.entity.enums.RoleType
import org.apache.ibatis.type.Alias

@Alias("user") // mybatis 설정관련
class User (
        val id: String,
        val name: String,
        val password: String,
        val roleType: RoleType
)
```

`Spring security`에서 유저와 관려된 정보를 메모리, DB, 파일 등 다양한 곳에 저장할 수 있지만, 저는 DB에 저장하여 관리하기 위해서 위와 같이 DB에서 사용될 클래스를 정의해주었습니다.

```kotlin
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class UserPrincipal(
        private val id: String,
        private val name: String,
        private val password: String,
        private val authorities: Collection<GrantedAuthority>
): UserDetails {
    companion object {
        private fun create(user: User) =
                UserPrincipal(
                        user.id,
                        user.name,
                        user.password,
                        listOf<GrantedAuthority>(SimpleGrantedAuthority(user.roleType.name))
                )
    }

    override fun getAuthorities() = this.authorities

    override fun getPassword() = this.password

    // !! 중요 UserDetails에서 PK로 활용될 속성을 설정해줍니다.
    override fun getUsername() = this.id

    override fun isAccountNonExpired() = true

    override fun isAccountNonLocked() = true

    override fun isCredentialsNonExpired() = true

    override fun isEnabled() = true

}
```

{% include base/components/hint-box.html type='info' list='Spring Security에서 인증과 관련된 정보는 Authentication이라는 객체에 저장.|Authentication 객체는 SecurityContextHolder 에서 관리 됨.|Authentication은 principal을 상속한 객체.|principal은 일반적으로 UserDetails로 캐스팅 됨.' %}

저는 SecurityContext에서 얻을 수 있는 인증 정보를 핸들링할 수 있도록 `UserDetails`를 구현하는 **UserPrincipal** 클래스를 정의하여 하였습니다.

UserDetails에 대해서 궁금하신 분들은 아래 링크를 통해서, 확인하실 수 있습니다.

{% include base/components/link.html title='UserDetails (spring-security-docs-manual 5.4.2 API)' internal_link='https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/core/userdetails/UserDetails.html'  %}

### 인증을 위한 DB 접근 관련 클래스 생성

```kotlin
import org.apache.ibatis.annotations.Mapper

@Mapper
interface UserMapper {
    fun selectUserById(id: String?): User?
}
```

```kotlin
import com.{groupId}.{name}.{name}.repository.mapper.UserMapper
import org.springframework.stereotype.Repository

@Repository
class UserRepository(private val userMapper: UserMapper) {
    fun selectUserById(id: String?) =
            userMapper.selectUserById(id)
}
```

위 처럼 ID로 유저 정보를 얻을 수 있도록, Mapper와 Repository 클래스를 작성해주었습니다. 자신이 사용하고 있는 ORM이 있다면, 입맛에 맞게 설정해주시면 됩니다.

### 커스텀 UserDetailsService 정의

UserDetailsService는 UserDetails 정보를 가져오기 위한 인터페이스입니다.

```kotlin
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

@Service
class CustomUserDetailsService(private val userRepository: UserRepository): UserDetailsService {

    // overriding을 하다보니 id와 username이 혼용되서 사용되고 있음
    override fun loadUserByUsername(username: String?): UserDetails =
            userRepository.selectUserById(username)?.let {
                UserPrincipal(
                        it.id,
                        it.name,
                        it.password,
                        listOf<GrantedAuthority>(SimpleGrantedAuthority(it.roleType.name))
                )
            } ?: throw UsernameNotFoundException("Can not found username.")
}
```

위 처럼 아까 상단에서 만들었던 UserRepository를 통해서 UserDetails를 가저오도록 구현을 해주었습니다. 이제 이 `CustomUserDetailsService`을 Spring Security에서 사용할 수 있도록 등록해주시면 됩니다.

Security에 등록하는 과정은 하단에서 진행하겠습니다.

### Jwt Token Provider 구현

저는 인증 방식에 Jwt 토큰 방식을 이용하여 진행하였습니다. 다양한 방법들이 있으니, 이 것 또한 자기 서비스에 맞도록 선택하시면 될 것 같습니다.

```kotlin
import io.jsonwebtoken.Jwts
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.stereotype.Component
import java.util.*
import javax.annotation.PostConstruct
import javax.servlet.http.HttpServletRequest


@Component
class JwtTokenProvider(private val userDetailsService: CustomUserDetailsService) {
    companion object {
        private const val TOKEN_TTL = 60 * 60 * 1000L
    }

    // 설정 파일에 등록해 두었습니다.
    @Value("\${spring.jwt.secret:}")
    lateinit var secretKey: String

    // 비밀키를 Base64로 인코딩해 주었습니다.
    @PostConstruct
    protected fun init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.toByteArray())
    }

    // 토큰 만들기
    fun createToken(authentication: Authentication?): String =
            Jwts.builder().let {
                val now = Date()

                // 전달받은 인증 정보로부터 principal 값을 가져옵니다.
                val userPrincipal = authentication?.principal as UserPrincipal

                // 토큰 빌더를 통해서 토큰을 생성해줍니다.
                it.setClaims(
                            // username = id 입니다.(PK)
                            Jwts.claims().setSubject(userPrincipal.username)
                                .also { claims ->
                                    claims["role"] = userPrincipal.authorities.first()
                                }
                        )
                        .setIssuedAt(now)
                        .setExpiration(Date(now.time + TOKEN_TTL))
                        .signWith(io.jsonwebtoken.SignatureAlgorithm.HS256, secretKey)
                        .compact()
            }!!

    // Authentication 객체 가져오기
    fun getAuthentication(token: String?): Authentication =
            userDetailsService.loadUserByUsername(this.getUserId(token)).let {
                UsernamePasswordAuthenticationToken(it, it.password, it.authorities)
            }

    // 사용자 Id 가져오기
    fun getUserId(token: String?): String =
            Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .body
                    .subject

    // 요청으로부터 토큰 가져오기
    fun resolveToken(req: HttpServletRequest) =
            req.getHeader("Authorization")?.let {
                when (it.startsWith("Bearer ")) {
                    true -> it.substring(7, it.length)
                    false -> null
                }
            }

    // 토큰 유효성 검사
    fun validateToken(jwtToken: String?): Boolean {
        return try {
            Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(jwtToken)
                    .let { !it.body.expiration.before(Date()) }
        } catch (e: Exception) {
            false
        }
    }

}
```

### Jwt 인증 필터 정의

```kotlin
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.filter.GenericFilterBean
import javax.servlet.FilterChain
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServletRequest


class JwtAuthenticationFilter(private val jwtTokenProvider: JwtTokenProvider): GenericFilterBean() {

    override fun doFilter(request: ServletRequest?, response: ServletResponse?, chain: FilterChain?) {
        // 1. 요청으로부터 토큰을 가져오고, 유효성 검사를 해줍니다.
        // 2. 토큰의 유효성 검사가 완료되면 Security의 Authentication에 토큰을 저장해줍니다.
        jwtTokenProvider.resolveToken((request as HttpServletRequest?)!!).let {
            when (it != null && jwtTokenProvider.validateToken(it)) {
                true -> {
                    SecurityContextHolder.getContext().authentication = jwtTokenProvider.getAuthentication(it)
                }
                false -> {}
            }
        }

        chain!!.doFilter(request, response)
    }

}
```

토큰을 제공해줄 수 있는 Provider를 만들었다면, 이 과정에서는 Jwt 인증 필터 정의했습니다.

### RestAuthenticationEntryPoint 정의

```kotlin
import org.slf4j.Logger
import org.springframework.security.core.AuthenticationException
import javax.servlet.http.HttpServletResponse
import javax.servlet.ServletException
import java.io.IOException
import javax.servlet.http.HttpServletRequest
import org.springframework.security.web.AuthenticationEntryPoint
import kotlin.jvm.Throws

class RestAuthenticationEntryPoint : AuthenticationEntryPoint {

    @Log
    private lateinit var log: Logger

    @Throws(IOException::class, ServletException::class)
    override fun commence(
        httpServletRequest: HttpServletRequest,
        httpServletResponse: HttpServletResponse,
        e: AuthenticationException
    ) {
        e.printStackTrace()
        log.error("Responding with unauthorized error. Message - {}", e.message)
        httpServletResponse.sendError(
                HttpServletResponse.SC_UNAUTHORIZED,
                e.localizedMessage
        )
    }
}
```

Spring security에서 Exception이 발생했을 때, 처리해줄 클래스인 RestAuthenticationEntryPoint를 정의했습니다.

### Security 설정

지금까지는 Securty 설정에서 필요한 클래스를 생성하는 작업이었습니다. 지금부터 정의한 클래스들을 이용하여 security 설정을 해보겠습니다.

```kotlin
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter


@Configuration
class SecurityConfig(
        private val jwtTokenProvider: JwtTokenProvider,
        private val customUserDetailsService: CustomUserDetailsService,
): WebSecurityConfigurerAdapter() {

    @Bean
    @Throws(Exception::class)
    override fun authenticationManagerBean() = super.authenticationManagerBean()!!

    override fun configure(http: HttpSecurity?) {
        http!!
                    .cors() // cors 설정
                .and()
                    .httpBasic().disable() // Rest API 형태로 개발하기 때문에 비활성 시킵니다.
                    .csrf().disable() // 비활성
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션설정도 STATELESS로 해줍니다.
                .and()
                    .exceptionHandling() // 상단에서 만들었던 RestAuthenticationEntryPoint 클래스 객체를 등록해줍니다.
                    .authenticationEntryPoint(RestAuthenticationEntryPoint())
                .and()
                    // matcher를 통해서 권한에 따른 제한을 두는 설정입니다.
                    .authorizeRequests()
                    .antMatchers("/api/v1/admin/**").hasRole("ADMIN") // 어드민만 접근 가능
                    .antMatchers("/api/**").permitAll() // 모든 권한의 유저 접근 가능
                    .anyRequest().authenticated() // 모든 리퀘스트는 인증과정을 거처야 함
                .and()
                    // 상단에서 만들었던 Jwt 토큰 필터를 등록해줍니다.
                    .addFilterBefore(
                            JwtAuthenticationFilter(jwtTokenProvider),
                            UsernamePasswordAuthenticationFilter::class.java
                    )
    }

    // 인증의 저장 관리를 해줄 userDetailsService, passwordEncoder와 함께 등록해줍니다.
    override fun configure(auth: AuthenticationManagerBuilder?) {
        auth!!
                .userDetailsService<UserDetailsService>(customUserDetailsService)
                .passwordEncoder(passwordEncoder())
    }

    @Bean
    fun passwordEncoder() = BCryptPasswordEncoder()
}

```

### 사용자 로그인 및 토큰 생성

```kotlin
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/auth")
class AuthController(
        private val authenticationManager: AuthenticationManager,
        private val tokenProvider: JwtTokenProvider
) {

    @PostMapping("/sign-in")
    fun signIn(@RequestBody authReqModel: AuthReqModel): String =
            // 사용자 id와 password로 UsernamePasswordAuthenticationToken 객체를 생성하여
            // 인증을 시도합니다.
            authenticationManager.authenticate(
                    UsernamePasswordAuthenticationToken(
                            authReqModel.id,
                            authReqModel.password
                    )
            )
            // 인증이 완료되면, 인증 객체를 저장해줍니다.
            // 토큰을 만들어서 리턴하여 줍니다.
            .let { authentication ->
                SecurityContextHolder.getContext().authentication = authentication
                return tokenProvider.createToken(authentication)
            }

}
```

로그인 요청에 대한 Controller 구현입니다.

```kotlin
import org.springframework.security.authentication.InternalAuthenticationServiceException
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/users")
class UserController(private val userService: UserService) {

    @GetMapping
    fun getUser() =
            // Spring security 로부터 Principal을 가져옵니다.
            // 인증 필터에서 user 정보가 이미 세팅되었습니다.
            SecurityContextHolder.getContext().authentication.principal
                    .let { principal ->
                        when(principal) {
                            // 객체 타입이 UserPrincial인면 username을 받아옵니다.
                            is UserPrincipal -> it.username
                            else -> throw InternalAuthenticationServiceException("Can not found matched User Principal")
                        }.let { id -> // 헷갈리겠지만 username = id 입니다.
                            ApiResponse.success("user" to userService.getUserById(id))
                        }
                    }

}
```

토큰을 가지고 있는 사용자는 위 Contoller를 통해서 유저 정보를 얻을 수 있습니다.

## 마무리

이렇게 해서 Spring Security를 Rest API에 적용하는 방법에 대해서 소개해드렸습니다. 혹시 궁금하신 점이나 이상한 점이 있으시다면 댓글 부탁드리겠습니다.

감사합니다.
