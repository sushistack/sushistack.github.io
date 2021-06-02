---
layout: post
published: false
title: "[스프링/Spring] Batch Job의 Step Flow 제어하기"
icon: spring
description: >
  스프링 배치의 Step flow란 무엇인지 알아보고 이를 제어하는 여러가지 방법들을 소개합니다.
author: deeplify
toc: true
permalink: /back-end/spring/controlling-step-flows-in-spring-batch
tags: 
  - spring boot
  - spring batch
  - 스프링 배치
  - batch
  - step flow
  - flows
---

지난 글에서는 스프링 배치에 대한 소개와 실제로 동작하는 스프링 배치 프로젝트를 만드는 예제를 소개해드렸습니다.

{% include base/components/link.html title='[스프링/Spring] Batch 예제 및 시작하기' internal_link='/back-end/spring/spring-batch-tutorial' %}

스프링 배치에 대한 소개와 예제를 통해 시작하는 방법을 아직 모르신다면 위 링크를 통해서 확인 가능합니다. 이번 글에서는 스프링 배치 Job을 설정하면서 유용하게 사용할 수 있는 Step Flow 제어하는 방법에 대해서 소개하도록 하겠습니다.

## Step Flow 제어 하는 방법

스프링 배치를 이용하여 

### Step Flow란?

![job step flows](/assets/images/job-step-flows.jpg)

위 그림과 같이 스프링 배치에서는 다양한 비즈니스 로직을 갖는 여러 개의 Step들을 Job에 등록하여 첫 번째 Step에서 다음 Step으로 이어지도록 구성할 수 있습니다.

왼쪽의 경우는 순차적으로 Step이 실행되게 되고, 오른쪽은 `STEP1`이 수행된 후, 결과에 따라서 `STEP2` 또는 `STEP3`를 수행하게 됩니다.

### 순차적 Flow와 조건적 Flow 예제

순차적인 Flow와 조건적 Flow를 예제를 통해서 알아보도록 하겠습니다.

{% include base/components/link.html title='deeplify/batch-tutorial at tutorial#2' internal_link='https://github.com/deepIify/batch-tutorial/tree/tutorial%231' %}

먼저 지난 글에서 작성했던, `tutorial#1` 브랜치로부터 새로 브랜치를 생성하여 진행하도록 하겠습니다.

{% include base/components/hint-box.html type='info' text='이번 글에서 작성되는 모든 코드들은 pring-batch-tutorial의 tutorial#2 브랜치에서 확인 가능합니다.' %}

{% include base/components/link.html title='deeplify/batch-tutorial at tutorial#2' internal_link='https://github.com/deepIify/batch-tutorial/tree/tutorial%232' %}

첫 번째로 `TutorialConfig` 클래스에 아래와 같이 람다로 작성된 Tasklet으로 만들어진 Step을 3개 작성했습니다.

```java
@Bean
public Step step1() {
    return stepBuilderFactory.get("step1")
            .tasklet((contribution, chunkContext) -> {
                log.debug("I'm STEP1");
                return RepeatStatus.FINISHED;
            })
            .build();
}

@Bean
public Step step2() {
    return stepBuilderFactory.get("step2")
            .tasklet((contribution, chunkContext) -> {
                log.debug("I'm STEP2");
                return RepeatStatus.FINISHED;
            })
            .build();
}

@Bean
public Step step3() {
    return stepBuilderFactory.get("step3")
            .tasklet((contribution, chunkContext) -> {
                log.debug("I'm STEP3");
                return RepeatStatus.FINISHED;
            })
            .build();
}
```

#### 순차적 Flow

먼저 가장 일반적이고, 쉽게 구현할 수 있는 순차적인 **Step Flow**에 대해서 소개하겠습니다.

##### Job 설정

```java
@Bean
public Job sequentialStepFlowJob() {
    return jobBuilderFactory.get("sequentialStepFlowJob")
            .start(step1())
            .next(step2())
            .next(step3())
            .build();
}
```

순차적인 흐름으로 Job을 설정하는 방법은 위 예제 코드처럼 JobBuilder의 `start()` 메소드와 `next()` 메소드 두 가지를 활용하여 구현할 수 있습니다.

##### 스케쥴러 설정 제거

스케쥴러 사용을 제거하고 CommandLineRunner에 의해 동작되도록 몇 가지 설정을 제거하도록 하겠습니다.

```diff
- @EnableScheduling     // 스케쥴러 기능 활성화 제거
@EnableBatchProcessing  // 배치 기능 활성화
@SpringBootApplication
public class BatchApplication {
    public static void main(String[] args) {
    SpringApplication.run(BatchApplication.class, args);
    }
}
```

```diff
- @Component
+ //@Component
@RequiredArgsConstructor
public class TutorialScheduler {

-   @Scheduled(fixedDelay = 5 * 1000L)
+   // @Scheduled(fixedDelay = 5 * 1000L)
    public void executeJob () {
        // .. 생략
    }

}
```

##### 실행할 Job 선택 및 결과 확인

```diff
spring:
- batch.job.enabled: false # 어플리케이션 시동 시, Job 시작 해제
+ batch.job.names: sequentialStepFlowJob
  datasource:
    driver-class-name: org.h2.Driver
    url: jdbc:h2:mem:test;DB_CLOSE_DELAY=-1;MODE=MYSQL;
    schema: classpath:/org/springframework/batch/core/schema-h2.sql

logging.level.com.deeplify.tutorial.batch: debug
```

위와 같이 어플리케이션 시동 시, CommandLineRunner에 의해서 Job이 실행되도록 `spring.batch.job.enabled: false` 설정을 제거, 설정된 Job이 두 개이기 때문에 **sequentialStepFlowJob**이 수행도되록 `spring.batch.job.names`를 설정해주고 실행했습니다.

```text
0000-00-00 17:11:36.590  INFO 53200 --- [           main] o.s.b.c.l.support.SimpleJobLauncher      : Job: [SimpleJob: [name=sequentialStepFlowJob]] launched with the following parameters: [{}]
0000-00-00 17:11:36.674  INFO 53200 --- [           main] o.s.batch.core.job.SimpleStepHandler     : Executing step: [step1]
0000-00-00 17:11:36.698 DEBUG 53200 --- [           main] c.d.tutorial.batch.jobs.TutorialConfig   : I'm STEP1
0000-00-00 17:11:36.719  INFO 53200 --- [           main] o.s.batch.core.step.AbstractStep         : Step: [step1] executed in 45ms
0000-00-00 17:11:36.745  INFO 53200 --- [           main] o.s.batch.core.job.SimpleStepHandler     : Executing step: [step2]
0000-00-00 17:11:36.753 DEBUG 53200 --- [           main] c.d.tutorial.batch.jobs.TutorialConfig   : I'm STEP2
0000-00-00 17:11:36.759  INFO 53200 --- [           main] o.s.batch.core.step.AbstractStep         : Step: [step2] executed in 14ms
0000-00-00 17:11:36.777  INFO 53200 --- [           main] o.s.batch.core.job.SimpleStepHandler     : Executing step: [step3]
0000-00-00 17:11:36.787 DEBUG 53200 --- [           main] c.d.tutorial.batch.jobs.TutorialConfig   : I'm STEP3
0000-00-00 17:11:36.790  INFO 53200 --- [           main] o.s.batch.core.step.AbstractStep         : Step: [step3] executed in 12ms
0000-00-00 17:11:36.796  INFO 53200 --- [           main] o.s.b.c.l.support.SimpleJobLauncher      : Job: [SimpleJob: [name=sequentialStepFlowJob]] completed with the following parameters: [{}] and the following status: [COMPLETED] in 150ms
```

정상적으로 Job의 Step들이 순차적으로 실행된 것을 확인할 수 있습니다.

{% include base/components/hint-box.html type='warning' text='spring.batch.job.names를 설정하지 않으면 등록된 두 개의 Job이 모두 실행됩니다.' %}

#### 조건적 Flow

스프링 배치에서는 조건에 따라 다음 수행할 Step을 선택하도록 제어를 할 수 있습니다.

우선, 스프링 배치에서 Step Flow 제어를 하기 위한 도구를 알아보도록 하겠습니다.

##### JobBuilders

**JobBuilder**는 Job을 쉽게 만들 수 있도록 해주는 클래스로 `JobBuilderFactory`를 통해서 다양한 `JobBuilder`를 생성할 수 있습니다.

| 빌더 | 설명 |
|-|-|
| JobBuilder | 다양한 종류의 Job 생성을 위한 클래스 |
| FlowBuilder | Job 또는 Job의 일부분으로 실행될 수 있는 Step들의 Flow 생성을 위한 클래스 |
| FlowJobBuilder | FlowJob 인스턴스 생성을 위한 클래스 |
| JobFlowBuilder | Job에 사용되는 Flow를 만들기 위한 클래스 |
| SimpleJobBuilder | 가장 기본적인 JobBuilder 클래스 |

스프링 배치에는 Job을 만들기위해 위와 같이 다양한 JobBuilder들이 존재하고있습니다.

##### from, on, to 메소드

조건에 따라 실행할 Step을 결정하기 위한 `from()`, `on()` 그리고 `to()`메소드가 있습니다.

from과 to 메소드는 파라미터 `Step`, `Flow`, `JobExecutionDecider`로 오버로딩되어 있지만, 우선 Step에 대한 것만 알아보고, 나머지는 차례대로 설명 드리게도록 하겠습니다.

|메소드| 역할 |
|-|-|
| from(Step step) | 이전에 등록된 Step으로 돌아가서 새로운 시작점으로 다시 시작하고, 등록된 Step이 없으면 `start()`와 동일하게 동작 |
| on(String pattern) | 이전에 등록된 Step의 Exit Status가 지정된 패턴과 일치하는 경우, 새로운 상태로 전환(Transition)으로 시작 |
| to(Step step) | 다음에 실행할 Step을 결정 |

