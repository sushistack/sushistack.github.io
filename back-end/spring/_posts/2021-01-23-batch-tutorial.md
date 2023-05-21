---
layout: post
published: true
title: "[스프링/Spring] Batch 소개와 간단한 예제"
icon: spring
description: >
  스프링 배치에 대한 기본적인 소개와 예제를 통해서 잡을 실행하는 방법에 대해서 알아보도록 하겠습니다.
author: deeplify
toc: true
permalink: /back-end/spring/batch-tutorial
tags: 
  - spring boot
  - spring batch
  - 스프링 배치
  - batch
  - scheduler
  - quartz
---

스프링 배치 프레임워크를 사용하여 개발을 했던 경험은 있지만, 알고 사용하는 것과 모르고 사용하는 것은 큰 차이가 있다는 생각에 이 글을 작성하게 되었습니다.

이 글의 스프링 배치에 대한 간략한 소개와 실제로 잘 동작하는 간단한 예제를 통해 글을 읽을 시간이 없는 급하신 분에게 도움이 되길 바랍니다.

## 스프링 배치 (Spring Batch)

배치 프로세싱은 **일괄처리**라는 뜻을 가지고 있습니다. 일괄처리의 의미는 **일련의 작업을 정해진 로직**으로 수행하는 것이라고 할 수 있습니다.

이런 일괄처리는 어떠한 경우에 필요할까요?

{% include base/components/hint-box.html type='info' list='대용량의 비즈니스 데이터를 복잡한 작업으로 처리해야하는 경우|특정한 시점에 스케쥴러를 통해 자동화된 작업이 필요한 경우 (ex. 푸시알림, 월 별 리포트)|대용량 데이터의 포맷을 변경, 유효성 검사 등의 작업을 트랜잭션 안에서 처리 후 기록해야하는 경우' %}

위와 같은 경우에 배치 어플리케이션을 작성하여 처리하게됩니다. 실제로 엔터프라이즈 환경에서는 정말 다양 종류의 작업들을 **배치**를 이용하여 처리하고 있습니다.

스프링 팀은 위와 같은 요구사항을 처리해줄 수 있는 배치와 관련된 어플리케이션 제작의 편의를 위해서 **스프링 배치** 프레임워크를 만들어 표준화하게 되었습니다.

### 스프링 배치 탄생 배경

웹 기반의 MSA에 집중을 하고 있던 `Spring source(현 Pivotal)`은 Java 기반의 일괄처리 프레임워크 제작에는 집중하지 못하였습니다. 그래서 많은 기업들이 일괄처리를 하기 위해 자체 사내 솔루션을 개발하는 경우가 많았습니다.

하지만 점차 일괄처리에 대한 표준 프레임워크를 만들어달라는 요구가 많아지면서 Pivotal은 독점적으로 일괄처리 프레임워크를 가지고 있던 기업인 Accenture와 협력하여 Spring Batch 프로젝트를 시작하게 되었습니다.

{% include base/components/link.html title='Spring Batch Introduction' internal_link='https://docs.spring.io/spring-batch/docs/current/reference/html/spring-batch-intro.html' %}

### 배치의 일반적인 사용 시나리오

![spring batch senario](/assets/images/spring-batch-senario.jpg)

> - 데이터베이스, 파일 또는 큐에서 데이터 읽기
> - 데이터를 정의한 방식으로 처리
> - 처리된 데이터를 데이터 쓰기

스프링 배치는 위와 같은 방식으로 사용자와의 상호작용 없이 반복적으로 데이터를 트랜잭션 단위로 처리할 수 있도록 구현되어 있고, 개발자는 **데이터 처리**에 대한 비즈니스 로직에만 집중하여 **배치 프로세스**를 작성할 수 있습니다.

### 스프링 배치가 제공할 수 있는 비즈니스 시나리오

{% include base/components/hint-box.html type='success' list='주기적인 배치 프로세스|동시적인 배치 프로세스: 작업의 병렬 처리|단계별 엔터프라이즈 메시지 기반 처리|대규모 작업에 대한 병렬 배치 프로세스|실패 후 수동 또는 예약 된 재시작|단계별 순차 처리|부분 처리: 레코드 건너 뛰기 (예: 롤백 시)|배치 작업 처리의 단위가 작은 경우, 기존 저장 프로시저/스크립트가 있는 경우 전체 배치에 대한 트랜잭션 처리' %}

`스프링 배치` 프레임워크는 위와 같이 다양한 비즈니스 시나리오를 처리할 수 있도록 설계되어 있습니다.

### 스프링 배치 계층 구조

![spring batch structure](/assets/images/spring-batch-structure.jpg)

스프링 배치 프레임워크는 확장성과 최종사용자를 염두해두고 설계되었기 때문에 위와 같이 `Application`, `Batch Core` 그리고 `Batch Infrastructure`로 설계되었습니다.

> - Application: 개발자가 작성한 모든 배치 작업과 사용자 정의 코드 포함
> - Batch Core: 배치 작업을 시작하고 제어하는데 필요한 핵심 런타임 클래스 포함 (`JobLauncher`, `Job`, `Step`)
> - Batch Infrastructure: 개발자와 어플리케이션에서 사용하는 일반적인 Reader와 Writer 그리고 RetryTemplate과 같은 서비스를 포함

`스프링 배치`는 계층 구조가 위와 같이 설계되어 있기 때문에 개발자는 **Application** 계층의 비즈니스 로직에 집중할 수 있고, 배치의 동작과 관려된 것은 **Batch Core**에 있는 클래스들을 이용하여 제어할 수 있습니다.

{% include base/components/link.html title='[스프링/Spring] Batch 구조와 구성 요소' internal_link='/back-end/spring/batch-architecture-and-components' %}

**스프링 배치의 전체적인 구조**와 구조 내부에 있는 각 **요소**들에 대해서 자세히 알고싶으신 경우 위 링크를 통해서 확인 가능합니다.

### 배치 원칙 및 가이드

> - 일반적으로 같은 서비스 환경에서 동작하는 서비스와 배치는 서로에게 영향을 미칠 수 있기 때문에 `배치와 서비스에 영향을 최소화` 할 수 있도록 구조와 환경에 맞게 디자인해야 합니다.
> - 배치 어플리케이션 내에서 가능한한 복잡한 로직은 피하고 `단순`하게 설계해야 합니다.
> - 데이터 처리하는 곳과 데이터의 저장소는 물리적으로 가능한한 가까운 곳에 위치하도록 합니다.
> - 데이터 베이스 I/O, 네트워크 I/O, 파일 I/O 등의 `시스템 리소스의 사용을 최소화`하고 최대한 많은 데이터를 메모리 위에서 처리하도록 합니다.
> - 처리 시간이 많이 걸리는 작업을 시작하기 전에 메모리 재할당에 소모되는 시간을 피하기 위해 충분한 메모리를 할당합니다.
> - 데이터 무결성을 위해서 적절한 `검사 및 기록`하는 코드를 추가 합니다.

위에 나열한 원칙 및 가이드 말고도 배치를 사용하는 방법에 따라 주의해야할 사항들이 더 있습니다. 하지만 단순한 구조의 배치를 사용한다면 위의 **원칙과 가이드**만으로도 충분히 잘 설계된 배치 프로젝트를 작성하실 수 있을 것이라고 생각합니다.

{% include base/components/google/infeed-ad.html slot=site.data.ad.second.infeed %}

## 스프링 배치 예제

스프링 배치가 무엇이고 탄생하게 된 배경, 어떤 경우에 사용하는지, 어떤 구조로 되어 있는지 그리고 간략한 원칙과 가이드까지 소개해드렸습니다.

{% include base/components/hint-box.html type='warning' text='이 글은 배치에 대한 소개와 간략한 예제를 위해서 작성되었기 때문에 예제를 위한 최소한의 사전 지식만을 설명하고 있습니다.' %}

먼저, 예제를 시작하기 전에 꼭 알고 있어야 하는 두 가지를 정말 간단하게 설명하고 스프링 배치 프로젝트를 생성하여 동작시키는 예제를 보여드리도록 하겠습니다.

> 예제 시작 전 알아야하는 내용
> - 스프링 배치 메타 테이블
> - Job, Step, Tasklet

### 스프링 배치 메타 테이블

![spring batch meta tables](/assets/images/spring-batch-meta-tables.jpg)

**Spring Batch**는 비즈니스 로직만 작성한다고 정상적으로 실행되지 않습니다.

개발자가 작성한 작업이 아주 잘 작성되었다고 하더라도, 작성된 일괄 작업들이 어떤 주기에 따라 지속적으로 동작한다면 성공 확률이 100%가 절대로 될 수 없을 것입니다.

따라서 스프링 배치에서는 작업을 수행하면서 일련의 **상태**에 관한 메타 데이터들을 `메타 테이블`에 저장해서 실패한 작업에 대한 기록을 남겨 실패에 대한 대비를 준비할 수 있게 도와주는 역할을 하게 됩니다.

{% include base/components/link.html title='메타 데이터 - 나무위키' internal_link='https://namu.wiki/w/%EB%A9%94%ED%83%80%EB%8D%B0%EC%9D%B4%ED%84%B0' %}

메타 데이터에 대해서 궁굼하신 분들은 위 링크를 통해서 확인하실 수 있습니다.

### Job, Step, Tasklet

![spring batch job](/assets/images/spring-batch-job.jpg)

> - Job: 배치 처리 과정을 하나의 단위로 만들어 표현한 객체이고 여러 Step 인스턴스를 포함하는 컨테이너
> - Step: Step은 실직적인 배치 처리를 정의하고 제어 하는데 필요한 모든 정보가 있는 도메인 객체
> - Tasklet: Step안에서 수행될 비즈니스 로직 전략의 인터페이스

{% include base/components/hint-box.html type='info' text='일반적으로 스프링 배치는 대용량 데이터를 다루는 경우가 많기 때문에 Tasklet보다 상대적으로 트랜잭션의 단위를 짧게 하여 처리할 수 있는 Reader, Proccessor, Writer를 이용한 Chunk 지향 프로세싱을 이용합니다.' %}

{% include base/components/link.html title='[스프링/Spring] Batch Chunk Oriented Proccessing' internal_link='/back-end/spring/chunk-oriented-processing-in-spring-batch' %}

### 프로젝트 생성부터 시작하는 예제

{% include base/components/hint-box.html type='info' list='예제에서는 편의성을 위해서 스프링 부트 배치를 사용|스프링 배치 메타 테이블이 생성될 DB로 H2를 사용|배치 실행에 대한 주기적인 트리거의 역할로 스케쥴러로 Quartz를 사용' %}

{% include base/components/hint-box.html type='warning' text='다음 예제는 Intellij IDE 환경에서 제작되었습니다.' %}

#### 1. 스프링 프로젝트 생성

![initialize spring project](/assets/images/spring-batch-tutorial01.jpg)

위 사진과 같이 `Spring Initializr`를 이용하여 프로젝트를 만들어 주도록하겠습니다.

![set project](/assets/images/spring-batch-tutorial02.jpg)

그룹타입과 아티팩트는 적절하게 넣어주었습니다. 빌드툴은 Gradle을 선택하였습니다.

![add dependencies](/assets/images/spring-batch-tutorial03.jpg)

- Lombok: 보일러플레이트 제거 및 로깅을 사용하기 위해서 추가
- H2 Database: 메모리 DB를 사용하기 위해 추가
- Spring Batch: 스프링 배치 프레임워크 사용하기 위해 추가
- Quartz Scheduler: 배치를 주기적으로 실행시키기 위한 트리거로 사용하기 위해서 추가

{% include base/components/google/infeed-ad.html slot=site.data.ad.third.infeed %}

#### 2. Gradle 확인

```gradle
// ... 생략

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-batch'
    implementation 'org.springframework.boot:spring-boot-starter-quartz'
    implementation 'com.h2database:h2:1.4.197'
    compile 'org.projectlombok:lombok'
    testCompile 'org.projectlombok:lombok'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testImplementation 'org.springframework.batch:spring-batch-test'

    annotationProcessor 'org.projectlombok:lombok'
    testAnnotationProcessor 'org.projectlombok:lombok'
}

// ... 생략
```

프로젝트 생성이 완료된 후, `build.gradle` 파일을 확인해보시면 위와 같은 형태로 의존성 라이브러리가 추가되어 있는지 확인해주시면 됩니다.

만약 추가되지 않은 것이 있다면, 위 코드를 보고 추가해주시면 됩니다.

#### 3. 배치 및 스케쥴러 활성화

```java
package com.deeplify.tutorial.batch;

// ... 생략

@EnableBatchProcessing  // 배치 기능 활성화
@SpringBootApplication
public class BatchApplication {
    public static void main(String[] args) {
        SpringApplication.run(BatchApplication.class, args);
    }
}
```

위 사진과 같이 스프링 배치의 기능을 활성화하기 위해서 설정과 관련된 어노테이션(`@EnableBatchProcessing`)을 사용해줍니다.

#### 4. 데이터베이스 설정

```yaml
spring:
  datasource:
    driver-class-name: org.h2.Driver
    url: jdbc:h2:mem:test;DB_CLOSE_DELAY=-1;
    schema: classpath:/org/springframework/batch/core/schema-h2.sql # 스키마 위치 설정
```

이 예제의 배치 어플리케이션은 H2 메모리 데이터베이스를 사용하기 때문에 위와 같이 설정을 해주었습니다.

참고로 다른 데이터베이스를 사용하신다면 `org/springframework/batch/core` 위치에 가셔서 자신이 사용할 스키마 파일을 사용하시면 될 것 같습니다.

#### 5. 비즈니스 로직 작성

이제부터는 실제 비즈니스 로직을 작성하는 과정을 단계별로 소개하겠습니다.

##### 배치 패키지 및 클래스 생성

![project structure](/assets/images/spring-batch-tutorial04.jpg)

```text
com.deeplify.tutorial.batch
├── jobs                            # 패키지 생성
│   └── TutorialConfig.java
└── tasklets                        # 패키지 생성
    └── TutorialTasklet.java
```

위와 같이 `jobs`과 `tasklets`라는 패키지를 만들고, 각각 `TutorialConfig`, `TutorialTasklet` 파일을 생성해주었습니다.

##### Tasklet 생성

```java
package com.deeplify.tutorial.batch.tasklets;

// ... 생략

@Slf4j
public class TutorialTasklet implements Tasklet {

    @Override
    public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {
        log.debug("executed tasklet !!");
        return RepeatStatus.FINISHED;
    }
}
```

Tasklet 인터페이스를 구현한 `TutorialTasklet` 클래스를 정의해주었습니다. execute 메소드에는 간단하게 로그를 남겨주는 코드를 작성해주었습니다.

##### Job 설정

```java
package com.deeplify.tutorial.batch.jobs;

// ... 생략

@Configuration
@RequiredArgsConstructor
public class TutorialConfig {

    private final JobBuilderFactory jobBuilderFactory; // Job 빌더 생성용
    private final StepBuilderFactory stepBuilderFactory; // Step 빌더 생성용

    // JobBuilderFactory를 통해서 tutorialJob을 생성
    @Bean
    public Job tutorialJob() {
        return jobBuilderFactory.get("tutorialJob")
                .start(tutorialStep())  // Step 설정
                .build();
    }

    // StepBuilderFactory를 통해서 tutorialStep을 생성
    @Bean
    public Step tutorialStep() {
        return stepBuilderFactory.get("tutorialStep")
                .tasklet(new TutorialTasklet()) // Tasklet 설정
                .build();
    }
}
```

위 코드와 같이 상단에서 정의한 `TutorialTasklet`으로 Step을 만들고, 만들어진 Step을 Job에 등록해주었습니다.

이 상태로 스프링 프로젝트를 실행하면 다음과 같은 결과를 얻을 수 있습니다.

```text
0000-00-00 01:14:40.469  INFO 12924 --- [           main] c.d.tutorial.batch.BatchApplication      : Started BatchApplication in 1.675 seconds (JVM running for 2.581)
0000-00-00 01:14:40.476  INFO 12924 --- [           main] o.s.b.a.b.JobLauncherApplicationRunner   : Running default command line with: []
0000-00-00 01:14:40.560  INFO 12924 --- [           main] o.s.b.c.l.support.SimpleJobLauncher      : Job: [SimpleJob: [name=tutorialJob]] launched with the following parameters: [{}]
0000-00-00 01:14:40.591  INFO 12924 --- [           main] o.s.batch.core.job.SimpleStepHandler     : Executing step: [tutorialStep]
0000-00-00 01:14:40.600 DEBUG 12924 --- [           main] c.d.t.batch.tasklets.TutorialTasklet     : executed tasklet !!
0000-00-00 01:14:40.607  INFO 12924 --- [           main] o.s.batch.core.step.AbstractStep         : Step: [tutorialStep] executed in 15ms
0000-00-00 01:14:40.612  INFO 12924 --- [           main] o.s.b.c.l.support.SimpleJobLauncher      : Job: [SimpleJob: [name=tutorialJob]] completed with the following parameters: [{}] and the following status: [COMPLETED] in 35ms
```

#### 6. Quartz 스케쥴러 적용하기

일반적으로 배치를 사용할 때는 스케쥴링 프레임워크를 이용하여 주기적으로 작업이 동작되도록 만드는 경우가 많습니다. 따라서 방금 만든 배치 어플리케이션에 스케쥴러를 적용하여 일정한 주기마다가 제가 설정한 작업이 동작하도록 수정해보겠습니다.

##### 스케쥴러 사용 설정

```diff
package com.deeplify.tutorial.batch;


+ @EnableScheduling     // 스케쥴러 기능 활성화
@EnableBatchProcessing  // 배치 기능 활성화
@SpringBootApplication
public class BatchApplication {
    public static void main(String[] args) {
    SpringApplication.run(BatchApplication.class, args);
    }
}
```

스케쥴러 기능을 활성화 해주었습니다.

##### 설정 수정

```diff
spring:
+ batch.job.enabled: false # CommandLineRunner 설정 해제
  datasource:
    driver-class-name: org.h2.Driver
    url: jdbc:h2:mem:test;DB_CLOSE_DELAY=-1;
    schema: classpath:/org/springframework/batch/core/schema-h2.sql
```

`CommandLineRunner`는 어플리케이션 구동시점에 특정 작업이 실행될 수 있도록 해주는 역할을 합니다.

스케쥴러를 사용할 것이기 때문에 구동시점에 동작하는 작업을 제거해주는 설정을 추가해주었습니다.

##### 스케쥴러 패키지 생성

```text
com.deeplify.tutorial.batch
├── jobs
│   └── TutorialConfig.java
├── schedulers                      # 패키지 생성
│   └── TutorialScheduler.java
└── tasklets
    └── TutorialTasklet.java
```

위와 같이 스케쥴러 설정을 해주기 위해서 스케쥴러 패키지를 생성해주었습니다.

##### 스케쥴러 클래스 생성

```java
package com.deeplify.tutorial.batch.schedulers;

// .. 생략

@Component
@RequiredArgsConstructor
public class TutorialScheduler {

    private final Job job;  // tutorialJob
    private final JobLauncher jobLauncher;

    // 5초마다 실행
    @Scheduled(fixedDelay = 5 * 1000L)
    public void executeJob () {
        try {
            jobLauncher.run(
                    job,
                    new JobParametersBuilder()
                            .addString("datetime", LocalDateTime.now().toString())
                    .toJobParameters()  // job parameter 설정
            );
        } catch (JobExecutionException ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        }
    }

}
```

`@Scheduled` 어노테이션을 이용하여 일정한 주기마다 작성한 Job이 실행되도록 설정해주었습니다.

또 메소드 내부에는 등록된 Job을 스프링 배치의 JobLauncher 인스턴스를 통해서 실행시킬 수 있도록 구현해두 었습니다.

> JobLauncher.run() 메소드
> - `run()` 메소드는 첫 번째 파라미터로 Job과 두 번째 파라미터로 Job Parameter를 받고 있습니다.
> - Job Parameter는 추후에 따로 글을 작성하여 소개드릴 예정이기 때문에 이 글에서는 간단하게 Job Parameter의 역할은 반복해서 실행되는 Job의 유일한 ID라고 생각해주시면 될 것 같습니다.

```text
0000-00-00 01:30:43.702  INFO 16963 --- [   scheduling-1] o.s.batch.core.step.AbstractStep         : Step: [tutorialStep] executed in 14ms
... 생략 ...
0000-00-00 01:30:48.748  INFO 16963 --- [   scheduling-1] o.s.batch.core.job.SimpleStepHandler     : Step already complete or not restartable, so no action to execute: StepExecution: id=1, version=3, name=tutorialStep, status=COMPLETED, exitStatus=COMPLETED, readCount=0, filterCount=0, writeCount=0 readSkipCount=0, writeSkipCount=0, processSkipCount=0, commitCount=1, rollbackCount=0, exitDescription=

```

위 처럼, Job Parameter에 동일한 값이 세팅되도록 하면, 두 번째부터 실행되는 Job의 Step은 실행되지 않습니다.

{% include base/components/link.html title='sushistack/batch-tutorial at tutorial#2' internal_link='https://github.com/sushistack/batch-tutorial/tree/tutorial%232' %}

지금까지 진행한 모든 예제 코드들은 위 링크를 통해서 프로젝트 전체를 확인하실 수 있습니다.

## 맺음

이 번글에서는 스프링 배치에 대해서 정말 간단하게 알아보는 시간을 가져보았습니다. 또한 간단한 예제를 통해서 스프링 배치가 동작하는 것을 확인해보았습니다. 혹시 이상한 점이나 궁금한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.
