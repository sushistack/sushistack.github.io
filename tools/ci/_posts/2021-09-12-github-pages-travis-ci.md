---
layout: post
published: true
title: "Travis CI로 Jekyll & Github Pages 배포 자동화 하는 방법"
icon: travis
description: >
  Travis CI를 이용하여 커스텀 플러그인이 적용된 jkeyll 사이트를 Github Pages에 배포하는 방법에 대해서 소개해드립니다.
author: deeplify
toc: true
permalink: /tools/ci/github-pages-travis-ci
tags:
  - ci
  - travis
  - jekyll
  - github pages
  - auto deployment
---

**Jekyll**과 **Github Pages**를 이용해서 간단하게 블로그를 개설할 수 있습니다. 보통의 경우, github repository의 master 브랜치에 빌드 전 상태의 프로젝트를 올려두면, github에서 자동으로 이 프로젝트를 빌드해서 웹서버를 띄워 줍니다. 

### Travis CI로 Github Pages 배포하기

Jekins와 동일한 형태의 CI 툴인 Travis CI로 배포를 하게 된 이유는 Jekyll에 커스텀 플러그인을 적용하고 싶었기 때문입니다.

### Plugins

```yml
plugins:
  - jekyll-feed
  - jekyll-optional-front-matter
  - jekyll-paginate
  - jekyll-readme-index
  - jekyll-redirect-from
  - jekyll-relative-links
  - jekyll-seo-tag
  - jekyll-sitemap
  - jekyll-titles-from-headings
  - amp-jekyll
  - jekyll-liquify
  - jekyll-include-cache
```

저는 총 12개의 plugin 들을 사용 중 입니다. 하지만 이 상태로 repository에 셋업을 해놓으면 플러그인들이 적용되지 않은 상태로 블로그가 만들어지거나 아예 빌드가 실패할 수도 있습니다.

그 이유는 보안적인 이슈로 github에서 정해놓은 **whitelisted plugins**가 있기 때문입니다. 즉 화이트 리스트에 포함되지 않은 플러그인은 스킵하고 사이트 빌딩을 한다는 의미입니다. 아래 링크를 통해서 화이트 리스트에 포함된 플러그인들을 확인하실 수 있습니다.

{% include base/components/link.html title='Dependency versions | GitHub Pages' internal_link='https://pages.github.com/versions/' %}

### Custom plugin이 적용된 사이트 배포

화이트 리스트에 포함되지 않은 플러그인을 블로그에 적용하여 배포할 수는 없는 것은 아닙니다.

> Github pages는 repository 내용에 따라 다음과 같이 동작합니다.
> 1. 내용이 Jekyll 빌드 전 상태인 경우, 자동 빌드 및 배포 (커스텀 플러그인 X)
> 2. 내용이 Jekyll 빌드 완료 후 결과물인 경우, 그대로 웹 페이지 노출 (커스텀 플러그인 O)

하지만 2번으로 적용할 경우에는 번거로움이 생길 수 있는데요. 왜냐하면 로컬에서 포스팅을 하나 쓰고, 빌드 후에 github 원격 저장소에 업로드를 해주어야합니다.

또한 위 작업을 해주기 위해서 master 브랜치와 빌드 전 브랜치로 `gh-pages`를 만들어서 사용합니다.

- master: 빌드 완료 후 결과물로 실제 웹 페이지 문서들의 집합.
- gh-pages: 빌드 전, 실제로 글을 쓰거나 설정 등을 할 수 있는 공간.

2번 내용의 작업이 단순하지만은 않기 때문에, 이를 자동화 해주는 작업이 필요합니다. 일반적으로 다음과 같은 방법을 사용합니다.

1. 로컬에서 빌드 후, shell script를 이용한 배포 스크립트 작성
2. Travis CI, Circle CI 등의 툴을 이용하여 배포 자동화
3. Github Action의 workflow 작성하여 배포 자동화

1번의 경우, 배포의 자동화와는 거리가 멀고 배포 과정이 조금 짧아지는 정도일 것 같습니다. 또한 ruby, gem 등이 없는 환경에서는 배포조차 할 수가 없는 상황이 생깁니다.

2번이 오늘 소개해드릴 CI(Continuous Integration)툴을 이용하여 배포 자동화하는 방법입니다.

<hr>

### Travis CI

Travis CI는 배포 자동화 툴로 생각하시면 될 것 같습니다. 비슷한 툴로는 가장 유명한 Jenkins와 비교하시면 될 듯 합니다. 그럼 바로 Jekyll과 Travis CI를 이용하여 github pages 배포 자동화에 대해 소개를 해드리도록 하겠습니다.

{% include base/components/link.html title='Travis CI - Test and Deploy Your Code with Confidence' internal_link='https://travis-ci.org' %}

#### Personal Access Tokens in Github

![github-token1](/assets/images/github-token1.png)
![github-token2](/assets/images/github-token2.png)

Github 계정의 Settings > Developer Settings로 들어갑니다.

![github-token3](/assets/images/github-token3.png)

Developer Settings 영역은 개발자 설정을 할 수 있는 부분인데, Personal Access Tonkens > `Generate new tokens` 버튼을 클릭합니다.

이 영역에서는 외부에서 git 명령어를 쓸 수 있도록 `Access Token`을 발행할 수 있습니다.

![github-token4](/assets/images/github-token4.png)

Note에서는 이 토큰이 어디에서 사용하는지 알아볼 수 있는 내용으로 넣어주시고, `repo`를 체크합니다.

![github-token5](/assets/images/github-token5.png)

다른 설정을 추가 또는 제외할 수있지만 바로 키를 생성하겠습니다.

![github-token6](/assets/images/github-token6.png)

이후, 생성된 키는 잘 복사해둡니다. 나중에 이 영역에 들어왔을 때, 재 성생은 가능하지만 다시는 동일한 키를 얻을 수 없습니다.

#### Travis CI 설정

![travis-setting1](/assets/images/travis-setting1.png)

Travis CI에 접속한 후, 깃 아이디로 로그인을 해줍니다.

![travis-setting2](/assets/images/travis-setting2.png)

Travis CI와 github 연동에 대한 허용을 해줍니다.

![travis-setting3](/assets/images/travis-setting3.png)

이후, repository 사용에 대한 허용해주기 위해서 `ACTIVE ALL REPOSITORIES USING GITHUB APPS`를 클릭 해줍니다.

![travis-setting4](/assets/images/travis-setting4.png)

Travis CI에서 사용할 repository를 선택한 후, 승인 및 설치를 진행합니다.

![travis-setting5](/assets/images/travis-setting5.png)

이후 한 번더 Travis CI가 repository를 사용할 수 있도록 허가 해줍니다.

![travis-setting6](/assets/images/travis-setting6.png)

이후 다시 Travis CI로 돌아와서 repository 탭을 클릭한 후, 방금 설정했던 repository의 **설정** 화면으로 들어갑니다.

![travis-setting7](/assets/images/travis-setting7.png)

하단으로 내리다보면 환경 변수를 설정하는 부분이 있는데 이곳에 다음과 같은 변수를 추가해줍니다. 이 변수를 추가해주는 이유는 Jekyll가 빌드될 때 proction 모드로 빌드될 수 있도록 해주기 위해서입니다.

```yml
name: JEKYLL_ENV
value: production
```

이 것으로 Travis CI에서 설정하는 것은 끝났습니다.

#### Jeykll 설정

이제 마지막으로 Jekyll에서도 다음과 같은 설정이 필요합니다.

> Jekyll 설정
> - Ruby gem의 rake Package 설치
> - .travis.yml 생성
> - Travis Secure 변수 생성
> - Rakefile 생성
> - _config.yml 수정

##### Ruby gem의 rake Package 설치

```bash
gem install rake
```

```diff
gem "jekyll", '4.1.0'
+ gem 'rake'
```

Gemfile에 다음과 같이 rake 패키지를 등록해줍니다. 이후 `bundle update`를 실행한 후, `.lock` 파일에도 업데이트가 될 수 있도록 해줍니다.

##### .travis.yml 생성

```yml
# 루비를 이용하여 빌드.
language: ruby

# 번들러의 캐시 기능을 사용.
cache: bundler

# 빌드에 필요한 gem 파일들을 다운로드.
install:
  - bundle install

# rake를 이용하여 jekyll 실행.
script:
  - bundle exec rake site:deploy --quiet

# gh-pages 브랜치의 push 또는 pull request 이벤트에 대해서 실행.
branches:
  only:
    - gh-pages

# rvm 버전을 설정
rvm:
  - 2.6.3

# travis encrypt 'GIT_NAME="YOUR_USERNAME" GIT_EMAIL="YOUR_EMAIL" GH_TOKEN=YOUR_TOKEN'
env:
  global:
    secure: <your_secure_code>
```

`.travis.yml`파일을 프로젝트 루트 밑에 생성해줍니다.

##### Travis Secure 변수 생성

```ruby
gem install travis
```

Travis Secure 변수를 생성해주기 위해서는 ruby gem의 `travis` 패키지가 필요합니다.

```bash
travis encrypt 'GIT_NAME="YOUR_USERNAME" GIT_EMAIL="YOUR_EMAIL" GH_TOKEN=YOUR_TOKEN'

# GH_TOKEN에 들어가는 YOUR_TOKEN은 앞서 설명했던 GITHUB_ACCESS_TOKEN을 넣으시면 됩니다.
```

위 명령어를 실행해서 나오는 값(더블 쿼트 제외)을 **.travis.yml**의 `<your_secure_code>`에 대체해 줍니다.

##### Rakefile 생성

```ruby
#############################################################################
#
# Modified version of jekyllrb Rakefile
# https://github.com/jekyll/jekyll/blob/master/Rakefile
#
#############################################################################

require 'rake'
require 'date'
require 'yaml'


CONFIG = YAML.load(File.read('_config.yml'))
USERNAME = CONFIG["username"]
REPO = CONFIG["repo"]
SOURCE_BRANCH = CONFIG["branch"]
DESTINATION_BRANCH = "gh-pages"

def check_destination
  unless Dir.exist? CONFIG["destination"]
    sh "git clone https://$GIT_NAME:$GH_TOKEN@github.com/#{USERNAME}/#{REPO}.git #{CONFIG["destination"]}"
  end
end

namespace :site do
  desc "Generate the site"
  task :build do
    check_destination
    sh "bundle exec jekyll build"
  end

  desc "Generate the site and serve locally"
  task :serve do
    check_destination
    sh "bundle exec jekyll serve"
  end

  desc "Generate the site, serve locally and watch for changes"
  task :watch do
    sh "bundle exec jekyll serve --watch"
  end

  desc "Generate the site and push changes to remote origin"
  task :deploy do
    # Detect pull request
    if ENV['TRAVIS_PULL_REQUEST'].to_s.to_i > 0
      puts 'Pull request detected. Not proceeding with deploy.'
      exit
    end

    # Configure git if this is run in Travis CI
    if ENV["TRAVIS"]
      sh "git config --global user.name $GIT_NAME"
      sh "git config --global user.email $GIT_EMAIL"
      sh "git config --global push.default simple"
    end

    # Make sure destination folder exists as git repo
    check_destination

    sh "git checkout #{SOURCE_BRANCH}"
    Dir.chdir(CONFIG["destination"]) { sh "git checkout #{DESTINATION_BRANCH}" }

    # Generate the site
    sh "bundle exec jekyll build"

    # Commit and push to github
    sha = `git log`.match(/[a-z0-9]{40}/)[0]
    Dir.chdir(CONFIG["destination"]) do

      # check if there is anything to add and commit, and pushes it
      sh "if [ -n '$(git status)' ]; then
            git add --all .;
            git commit -m 'Updating to #{USERNAME}/#{REPO}@#{sha}.';
            git push --quiet origin #{DESTINATION_BRANCH};
         fi"
      puts "Pushed updated branch #{DESTINATION_BRANCH} to GitHub Pages"
    end
  end
end
```

```diff
- DESTINATION_BRANCH = "gh-pages"
+ DESTINATION_BRANCH = "master"
```

Jekyll에서 제공하는 Rakefile의 원본입니다. 코드 상단에 링크가 있으니 참고하시면 됩니다. 한 가지 고칠 부분이 있는데요. destination-branch가 `gh-pages`로 되어있기 때문에 이를 `master`로 변경해주셔야 합니다.

##### _config.yml 수정

```diff
+ username: <username>
+ repo: <username>.github.io
+ branch: gh-pages
+ destination: _site
```

Rakefile에서 사용할 설정 변수들을 추가해줍니다. 이 것으로 모든 설정이 끝났습니다. 이제 gh-pages에 push 했을 때, `Travis CI`에서 정상 작동하는지 확인만 해보면 되겠습니다.

#### Travis 확인

![travis-check1](/assets/images/travis-check1.png)

실행 시간이 약 4분 30초 정도 걸렸고, 상태는 정상인 것으로 보입니다.

![travis-check2](/assets/images/travis-check2.png)

하단에 `Job log` 탭을 보시면 위와 같이 실시간으로 작업 로그들을 볼 수 있어서 디버깅을 하실 수 있습니다.

![travis-check2-1](/assets/images/travis-check2-1.png)

또한 view Config를 통해서 현재 어떤 설정으로 Job이 실행되고 있는지 확인하실 수 있습니다.

![travis-check3](/assets/images/travis-check3.png)
![travis-check4](/assets/images/travis-check4.png)

그리고 간혹 실행이 안되는 경우가 발생할 수 있는데요. 위와 같이 `Requests`를 클릭하면 어떤 이유 때문에 잡이 실행이 되지 않았는지도 확인이 가능합니다.

## 맺음

이렇게 좀 다소 길지만, Travis CI를 통한 Github Pages 배포 자동화에 대해서 알아보았습니다. 여담이지만 저는 현재 Travis를 사용하고 있지 않습니다. 그 이유는 `Github Action`이라는 아주 간단하고 빠른 도구가 나왔기 때문인데요.

Travis에서 아무리 찾아봐도 `cache`가 잘 동작하지 않는 이슈가 있는 것 같았습니다. 그래서 속도가 너무 느리다고 생각이 되어서 `Github Action`을 사용 중입니다. 깃허브 액션에서는 캐시가 잘 동작하는 것 같아서 배포가 완료 될 때까지 약 `1m 30s` 정도 걸리는 것을 확인했습니다.

**Github Action**을 이용하여 Jekyll Github Page 배포 자동화 하는 방법에 대해서 아래 링크를 통해서 확인하실 수 있습니다.

{% include base/components/link.html title='[Jekyll] Github Action으로 Github Pages 배포 자동화 하는 방법' internal_link='/tools/git/github-pages-github-action' %}

감사합니다.
