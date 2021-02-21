---
layout: post
published: true
title: "Github Action으로 Jekyll & Github Pages 배포 자동화 하는 방법"
icon: github
description: >
  Github Action을 이용하여 jkeyll 사이트를 Github Pages에 배포하는 방법에 대해서 소개해드립니다.
author: deeplify
toc: true
permalink: /tools/git/github-pages-github-action
tags:
  - github action
  - workflow
  - jekyll
  - github pages
  - auto deployment
---

저번 글에서 Travis CI를 이용하여, Github Pages 배포 자동화 하는 방법에 대해서 알아보았습니다. 이번 글에서는 Github Action을 활용한 배포 자동화에 대해서 소개해 드리도록 하겠습니다.

저번 글에도 동일하게 언급했지만, 왜 Github Pages에 배포 자동화가 필요한지 간략하게 짚고 넘어가도록 하겠습니다.

> 배포 자동화가 필요한 이유
> 1. Github Pages는 화이트 리스트에 포함된 플러그인만 사용 가능하기 때문에 자동 빌드 및 배포 시에 플러그인이 적용이 되지 않는다.
> 2. 쉘 스크립트를 작성하여 배포하는 방식을 단순화할 수 있지만, 환경적인 요인이 있어 불편한 점이 있다.
> 3. 쉘 스크립트를 활용한 방식은 두 개의 브랜치를 관리 해주어야 한다.

좀 더 자세하게 설명을 보고 싶다면 아래 링크를 통해서 확인하실 수 있습니다.

{% include base/components/link.html title='Travis CI로 Jekyll & Github Pages 배포 자동화 하는 방법' internal_url='/tools/ci/github-pages-travis-ci' %}

## Github Action

Github Action은 github에서 지원하는 workfow 기능으로 일반적으로 Jenkins, Travis CI와 비슷한 툴이라고 생각하시면 될 것 같습니다. 따로 외부 툴을 연동하지 않아도 Github Action으로 손쉽게 배포 자동화를 구축할 수 있습니다.

### Travis CI vs Github Action

저번 글에서 Travis CI를 이용해서 배포 자동화를 하는 방법에 대해서 소개했습니다. VM 내의 gemfile 캐시가 잘 동작하지 않는 이슈가 있어서 배포 될 때마다 새로 gem 패키지들을 새로 다운받느라 시간이 오래걸렸습니다. 그러던 중 Github Action이라는 것을 활용할 수 있다는 글을 보고, 적용해보게 되었습니다.

배포시간을 보고, Github Action을 사용하길 잘했다는 생각이 들었는데요.

```yml
travis-ci: 4m 30s
github-action: 1m 30s
```

배포 시간이 무려 3분이나 단축되는 효과를 얻었습니다.

자 그럼 바로 Github Action으로 Github Pages 배포 자동화하는 방법에 대해서 소개해드리도록 하겠습니다.

### Github Action으로 Github Pages 배포 자동화

Github에서 아무런 초기 설정 없이 순서대로 Github Pages 배포하는 방법에 대해서 설명하도록 하겠습니다.

#### Personal Access Token in Github

![github-token1](/assets/images/github-token1.png)
![github-token2](/assets/images/github-token2.png)

오른쪽 상단의 계정 버튼을 눌러 Github  Settings > Developer Settings로 들어갑니다.

![github-token3](/assets/images/github-token3.png)

이후 Personal Access Tonkens > **Generate new tokens** 버튼을 눌러 새로운 토큰을 만들어야합니다.

물론 같은 Github라 할지라도 Action의 workflow가 외부 VM에서 동작하는 것이므로 **Access Token**이 필요합니다.

![github-token4-1](/assets/images/github-token4-1.png)

Note에서는 이 토큰이 어떤 용도로 사용될지 알아볼 수 있는 내용으로 넣어주시고, `repo`로 체크합니다.

![github-token5](/assets/images/github-token5.png)

다른 설정은 따로 해주실 필요없이 바로 생성해주시면 됩니다.

![github-token6](/assets/images/github-token6.png)

생성된 키는 재 조회가 불가능하기 때문에 잘 복사해두셔야 합니다.

![github-token7](/assets/images/github-token7.png)

그리고 repository > settings > Secrets > `new secret` 버튼을 눌러 새로운 secret을 생성해줍니다.

![github-token8](/assets/images/github-token8.png)

이후, personal access token을 **JEKYLL_PAT**이라는 이름으로 등록 해줍니다.

#### Github Action 등록

![github-action1](/assets/images/github-action1.png)

위 그림에서 빨간색 박스에 있는 `Actions`를 클릭합니다.

![github-action2](/assets/images/github-action2.png)

제 저장소가 Jekyll 코드가 있어서 그런지는 모르겠지만, 추천에 Jekyll관련된 Action이 노출되어 있습니다. 이 것을 클릭합니다.

![github-action3](/assets/images/github-action3.png)

이후 위 그림의 다음 코드를 넣어주시고, `start commit` 버튼을 클릭합니다. 그러면 프로젝트 내에 `.github/workflows/jekyll.yml` 파일이 생성됩니다.

```yml
name: Jekyll CI

on:
  push

jobs:
  jekyll:
    runs-on: ubuntu-16.04
    steps:
    - uses: actions/checkout@v2

    # Use GitHub Actions' cache to shorten build times and decrease load on servers
    - uses: actions/cache@v1
      with:
        path: vendor/bundle
        key: {% raw %}${{ runner.os }}-gems-${{ hashFiles('**/Gemfile.lock') }}{% endraw %}
        restore-keys: |
          {% raw %}${{ runner.os }}-gems-{% endraw %}

    # Standard usage
    - uses:  helaili/jekyll-action@2.0.3
      env:
        JEKYLL_PAT: {% raw %}${{ secrets.JEKYLL_PAT }}{% endraw %}
```

{% include base/components/link.html title='helaili/jekyll-action: A GitHub Action to publish Jekyll based content as a GitHub Pages site' internal_link='https://github.com/helaili/jekyll-action' %}

![github-action4](/assets/images/github-action4.png)

이후 다시 `Actions`에 접근하시면 위와 같은 형태로 표시됩니다. 해당 작업들을 클릭하면 상세 내역을 볼 수 있습니다.

처음 작업은 기본 작업의 경우, 기본 템플릿으로 했더니 실패했고, 위에 작성되어있는 코드를 이용하니 정상작동 하였습니다.

그리고 또 한 가지는 첫 번째와 두 번째 시간차이가 약 `1분 30초` 정도가 있는데, 이 것이 바로 캐시의 효과입니다.

![github-action5](/assets/images/github-action5.png)

작업이 어떻게 진행되었는지는 `This run` 탭에 표시가 되고, 어떤 workflow file을 통해 실행이 되었는지 확인하는 탭은 `Workflow file`입니다.

![github-action6](/assets/images/github-action6.png)

또한 이런식으로 작업의 상세 내역과 걸린 시간 등을 보실 수 있습니다.

## 맺음

이렇게 간단하게 Github Action을 이용하여 Github Pages 배포 자동화 하는 방법에 대해서 알아보았습니다.
궁금하신 점이나 이상한점 있으면 댓글 부탁드리겠습니다.

감사합니다.
