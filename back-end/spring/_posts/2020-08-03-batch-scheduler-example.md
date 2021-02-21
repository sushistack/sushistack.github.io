---
layout: post
published: false
title: "Spring Boot Batch + Scheduler Example"
icon: spring
description: >
  Spring Boot Batch와 Quartz Scheduler를 사용한 간단한 예제를 소개해드리도록 하겠습니다.
author: deeplify
toc: true
permalink: /back-end/spring/batch-scheduler-example
tags: 
  - spring boot
  - batch
  - scheduler
  - quartz
---

기존 spring과 spring batch 모듈을 이용하여, 배치 프로젝트를 만드는 것은 굉장한 시간과 노력이 들어 갔었습니다. 하지만 **Spring Boot**에서 간단하게 배치를 설정하고, Quartz의 Scheduler를 이용하여 일정 시간마다 실행되는 작업을 만들어 보도록 하겠습니다.

> Stack
> - Spring Boot 2.3.2.RELEASE
> - Gradle 6.4.1
> - kotlin 1.3.7
> - JDK 11

<hr/>

참고로 배치잡을 실행시키기 위해서는 기본적으로 배치용 DB 테이블이 필요합니다. 따라서 DB 설정이 반드시 필요합니다. 혹시 생각해놓으신 DB가 없다면 해시맵이나 In-memory DB를 사용할 수 있습니다. 저도 Inmemory DB 중 하나인 `h2database`를 사용할 것입니다.

### Gradle dependencies

만약, 새로운 프로젝트를 생성하려한다면 batch와 quartz 모듈을 추가하고 생성합니다. 혹시 추가를 안했다면 아래와 같이 dependency 들을 추가해주셔야합니다. 그리고 사용하시려는 DB 관련 dependency들도 잊으시면 안됩니다.

```gradle
dependencies {
    implementation("org.springframework.boot:spring-boot-starter-batch")
    implementation("org.springframework.boot:spring-boot-starter-quartz")
    implementation("com.h2database:h2:1.4.197")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
    }
    testImplementation("org.springframework.batch:spring-batch-test")
}
```

### application.yml

Spring Boot에서 yml 파일에 해야하는 설정은 굉장히 단순합니다.

- 스프링 배치 기본 동작 해제
- datasource 설정
- scheme 설정

scheme 설정의 경우, 배치 관련 테이블을 생성해주는 sql 쿼리가 들어있습니다. mysql 관련 설정이나 자세한 설명은 아래 링크를 통해 확인 가능합니다.

{% include base/components/link.html title='Table BATCH_JOB_INSTANCE not found' internal_url='/back-end/spring/batch-meta-error' %}

```yml
spring:
  # disable default behavior
  batch.job.enabled: false
  datasource:
    driver-class-name: org.h2.Driver
    url: jdbc:h2:mem:test;DB_CLOSE_DELAY=-1;MODE=MYSQL;
    schema: classpath:/org/springframework/batch/core/schema-h2.sql
```

### DemoApplication.kt

Spring Batch와 Quartz Scheduler를 사용할 것이기 때문에 아래와 같이 다음 두 Annotation을 추가해줍니다.

```diff
+ @EnableScheduling
+ @EnableBatchProcessing
```

```kotlin
package com.template.batch.demo

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.scheduling.annotation.EnableScheduling

@EnableScheduling
@EnableBatchProcessing
@SpringBootApplication
class DemoApplication

fun main(args: Array<String>) {
    runApplication<DemoApplication>(*args)
}

```

### DemoConfig.kt

배치잡에 대한 설정입니다. 배치잡을 만드는 방법이나 잡을 설정하는 방법에 대한 자세한 내용은 다른 곳에서 충분히 확인 가능합니다. 따라서 여기서는 설정된 코드만 첨부해 드립니다.

```kotlin
package com.template.batch.demo.jobs.demo

import org.springframework.batch.core.configuration.annotation.JobBuilderFactory
import org.springframework.batch.core.configuration.annotation.JobScope
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory
import org.springframework.batch.repeat.RepeatStatus
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class DemoConfig(
        private val jobBuilderFactory: JobBuilderFactory,
        private val stepBuilderFactory: StepBuilderFactory
) {

    @Bean
    fun demoJob () =
            jobBuilderFactory["demoJob"]
                    .start(demoStep(null))
                    .build()

    @Bean
    @JobScope // for getting jobParameters 
    fun demoStep(@Value("#{jobParameters[datetime]}") datetime: String?) =
            stepBuilderFactory["demoStep"]
                    .tasklet { _, _ ->
                        println(">>>>> [DEBUG] job parameter[datetime]: $datetime")
                        RepeatStatus.FINISHED
                    }
                    .build()
}
```

### DemoScheduler.kt

스케쥴링 설정하는 내용입니다. 어려운 것은 없으니, 그대로 사용하시면 될 것 같습니다. 참고로 `jobParameters`를 설정하는 이유는 스프링 배치는 같은 jobParameter로 동일한 작업을 실행하지 않기 때문입니다. 따라서 매번 달라지는 `datetime`으로 jobParameter를 전달하였습니다.

```kotlin
package com.template.batch.demo.schedules

import org.springframework.batch.core.Job
import org.springframework.batch.core.JobParametersBuilder
import org.springframework.batch.core.launch.JobLauncher
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component
import java.time.LocalDateTime

@Component
class DemoScheduler(
        private val job: Job,
        private val jobLauncher: JobLauncher
) {

    @Scheduled(fixedDelay = 5000)
    fun runJob () {
        jobLauncher.run(
                job,
                JobParametersBuilder()
                        .addString(
                                "datetime",
                                LocalDateTime.now().toString()
                        )
                        .toJobParameters())
    }
}
```

## 맺음

간단하게,

- Spring Boot
- Spring Batch
- Spring Quartz의 Scheduler
- H2 Database

위 4가지 컴포넌트만을 이용해서 배치 예제를 만들어 보았습니다. 혹시 궁금하신 점이나 이상한 점이 있으면 댓글 부탁드리겠습니다.

감사합니다.
