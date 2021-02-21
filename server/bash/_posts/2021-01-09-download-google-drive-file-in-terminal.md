---
layout: post
published: true
title: wget/curl로 구글 드라이브 파일 다운로드
icon: bash
description: >
  터미널에서 구글 드라이브에 있는 파일을 다운로드하는 방법에 대해서 알아보도록 하겠습니다.
author: deeplify
toc: true
permalink: /server/bash/download-google-drive-file-in-terminal
tags:
  - wget
  - curl
  - google drive
  - download google drive
---

서버 측에서 외부 리소스를 다운받아야하는 경우가 있습니다. CLI 환경에서 외부 리소스를 다운 받는 방법에는 대표적으로 **wget**과 **curl** 이렇게 두 가지가 있습니다.

## wget/curl로 구글 드라이브 파일 다운로드

과거에는 wget과 curl을 이용하여 구글 드라이브에 있는 파일을 다운로드 받을 수 있었지만 구글 드라이브의 보안이 강화되면서 wget/curl을 이용해서 모두 다운로드를 할 수 없어졌습니다.

방법에 대한 소개는 다음과 같은 순으로 진행하겠습니다.

> 구글 드라이브 wget/curl 다운로드 방법
> - 드라이브 공유 링크 얻기
> - wget으로 드라이브 파일 다운로드
> - gdown.pl으로 드라이브 파일 다운로드
> - curl로 드라이브 파일 다운로드

{% include base/components/hint-box.html type='info' text='보안적인 이슈로 공유링크를 통해서 바로 받을 수 없고, "docs.google.com" 도메인으로 우회해서 다운로드 해야합니다.' %}

### 공유 링크 얻는 방법

![gdown1](/assets/images/gdown1.png)

구글 드라이브 (google drive)에 들어가서 다운로드 받으려는 파일을 마우스 오른쪽 버튼을 클릭합니다.

![gdown2](/assets/images/gdown2.png)

오른쪽 버튼을 클릭 후, **공유 가능한 링크 가져오기**를 클릭합니다.

![gdown3](/assets/images/gdown3.png)

복사 버튼을 클릭하여 링크를 얻을 수 있습니다. 제가 얻은 링크는 다음과 같고, 이 링크에서 `d/`와 `/view` 사이에 있는 값이 파일 아이디(FILEID)입니다.

만약 하단에 `제한됨`으로 되어있다면, `링크가 있는 모든 사용자에게 공개`로 변경해주셔야합니다.

```text
https://drive.google.com/file/d/1bSRm2hCjrdJfdjNKyo6PG4jUrMf0pJY7/view?usp=sharing

# FILEID: 1bSRm2hCjrdJfdjNKyo6PG4jUrMf0pJY7
```

### wget으로 드라이브 파일 다운로드

과거 wget으로 google drive 내의 파일을 다운로드 받는 명령어는 다음과 같습니다.

```bash
wget --no-check-certificate 'https://docs.google.com/uc?export=download&id={FILEID}' -O {FILENAME}
```

{% include base/components/hint-box.html type='danger' text='현재 위 방법으로는 다운로드 되지 않습니다.' %}

초기에는 위와 같은 명령어로 다운로드를 할 수 있었지만, 보안이 한 층더 강화되면서 동작하지 않게 되었습니다.

하지만 wget 옵션에 쿠키를 설정해서 다운로드 할 수 있는 방법이 나오게 되었습니다.

```bash
wget --load-cookies ~/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies ~/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id={FILEID}' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id={FILEID}" -O {FILENAME} && rm -rf ~/cookies.txt
```

위 명령어의 `{FILEID}`에 상단에서 얻었던 실제 FILEID를 대치하고, `{FILENAME}`에는 원하는 파일 이름을 넣어주시면 됩니다.

예제를 통해서 한번 알아보겠습니다.

#### wget 구글 드라이브 파일 다운로드 예제

간단하게 txt 파일을 만들어서 드라이브에 업로드 한 후에 다운로드하는 예제를 보여드리겠습니다.

##### 다운로드 전에 텍스트 파일이 있는지 확인

![gdown-wget1](/assets/images/gdown-wget1.png)

```bash
ls | grep gdown.txt
```

이름이 `gdown.txt`라는 문자열을 포함하는 파일이 없는지 확인해주었습니다.

##### wget 구글 드라이브 다운로드 명령어 실행

![gdown-wget2](/assets/images/gdown-wget2.png)

```bash
wget --load-cookies ~/cookies.txt "https://docs.google.com/uc?export=download&confirm=$(wget --quiet --save-cookies ~/cookies.txt --keep-session-cookies --no-check-certificate 'https://docs.google.com/uc?export=download&id=1bSRm2hCjrdJfdjNKyo6PG4jUrMf0pJY7' -O- | sed -rn 's/.*confirm=([0-9A-Za-z_]+).*/\1\n/p')&id=1bSRm2hCjrdJfdjNKyo6PG4jUrMf0pJY7" -O gdown.txt && rm -rf ~/cookies.txt
```

`{FILEID}`에 실제 파일 아이디를 대치하고, `FILENAME`에는 `gdown.txt`로 대치하여 명령어를 실행하였습니다.

##### wget 다운로드 확인

![gdown-wget3](/assets/images/gdown-wget3.png)

구글 드라이브에 있는 `gdown.txt` 파일이 다운로드가 완료된 것을 확인하실 수 있습니다.

##### 디렉토리에 다운로드 받은 파일이 있는지 확인

![gdown-wget4](/assets/images/gdown-wget4.png)

```bash
ls | grep gdown.txt
```

다시 파일을 찾아보면 `gdown.txt`가 생긴 것을 확인할 수 있습니다.

### gdown.pl으로 드라이브 파일 다운로드

{% include base/components/link.html title='circulosmeos/gdown.pl: Google Drive direct download of big files' internal_link='https://github.com/circulosmeos/gdown.pl' %}

구글 드라이브 다운로드를 위해서 개발자가 만드 `gdown.pl`이라는 프로젝트가 있습니다. 이 것을 이용해서도 다운로드를 할 수 있습니다.

내용을 보면 기본적으로 `wget`을 이용하지만 대용량의 파일을 다운 받을 수 있습니다.

```bash
wget https://raw.github.com/circulosmeos/gdown.pl/master/gdown.pl
```

```bash
chmod u+x gdown.pl
```

```bash
./gdown.pl 'https://docs.google.com/uc?export=download&id={FILEID}' {FILENAME}
```

간단하게 위 3가지 명령어를 통해서 `gdown.pl` 스크립트를 이용하여 구글 드라이브 파일 다운로드를 하실 수 있습니다.

예제를 통해서 알아보겠습니다.

#### gdown.pl으로 드라이브 파일 다운로드 예제

`gdown.pl` 스크립트를 사용하여 드라이브 파일을 다운로드 하는 예제를 순서대로 진행해보겠습니다.

##### gdown.pl 스크립트 다운로드

![gdown.pl 스크립트 다운로드](/assets/images/gdown-pl1.png)

![gdown.pl 스크립트 다운로드](/assets/images/gdown-pl2.png)

```bash
wget https://raw.github.com/circulosmeos/gdown.pl/master/gdown.pl
```

wget으로 gdown.pl 스크립트를 다운로드 해주시고, 정상적으로 다운로드가 되었는지 확인까지 해보았습니다.

##### gdown.pl으로 다운로드 전에 텍스트 파일이 있는지 확인

![gdown.pl 스크립트 다운로드](/assets/images/gdown-pl3.png)

```bash
ls | grep gdown.txt
```

다운로드를 진행하기 전에 파일이 없는지 확인해 보았습니다.

##### gdown.pl 스크립트 파일 실행 권한 변경

![gdown.pl 스크립트 다운로드](/assets/images/gdown-pl4.png)

```bash
chmod u+x gdown.pl
```

스크립트를 실행할 수 있도록 하기위해 위 명령어를 통해서 실행 권한을 변경해줍니다.

##### gdown.pl 명령어 실행

![gdown.pl 스크립트 다운로드](/assets/images/gdown-pl5.png)

```bash
./gdown.pl 'https://docs.google.com/uc?export=download&id=1bSRm2hCjrdJfdjNKyo6PG4jUrMf0pJY7' gdown.txt
```

위 명령어에서 `{FILEID}`와 `{FILENAME}`을 적절하게 대치한 후 명령어를 실행 했습니다.

##### 디렉토리 파일 확인

![gdown.pl 스크립트 다운로드](/assets/images/gdown-pl6.png)

```bash
ls | grep gdown.txt
```

정상적으로 다운로드가 되었는지 확인해주었습니다.

### curl로 드라이브 파일 다운로드

```bash
#!/bin/bash

FILEID=$1
FILENAME=$2

curl -sc ~/cookie.txt "https://drive.google.com/uc?export=download&id=${FILEID}" > /dev/null

curl -Lb ~/cookie.txt "https://drive.google.com/uc?export=download&confirm=`awk '/_warning_/ {print $NF}' ~/cookie.txt`&id=${FILEID}" -o ${FILENAME}

```

`curl` 명령어도 wget과 비슷하게 쿠키 설정을 조작하여 다운로드 받으실 수 있습니다.

```bash
chmod u+x gdown.sh
```

```bash
./gdown.sh {FILEID} {FILENAME}
```

먼저 위의 curl 스크립트를 복사하여 실행파일을 하나 만들고, 실행권한 변경한 후 스크립트를 실행해주시면 됩니다.

예제를 통해서 알아보겠습니다.

#### curl로 드라이브 파일 다운로드 예제

curl로 구글 드라이브 파일 다운로드 하는 방법을 소개해드리도록 하겠습니다.

##### curl 스크립트 작성

![gcurl](/assets/images/gdown-curl1.png)

상단에 소개했던 curl 스크립트를 복사하여 파일을 생성했습니다.

##### curl 스크립트 실행 권한 변경

![gcurl](/assets/images/gdown-curl2.png)

```bash
chmod u+x gdown.sh
```

스크립트의 실행 권한을 변경해주었습니다.

##### curl 스크립트로 다운로드 전에 텍스트 파일이 있는지 확인

![gcurl](/assets/images/gdown-curl3.png)

```bash
ls | grep gdown.txt
```

스크립트로 파일을 다운로드하기 전에 텍스트 파일이 있는지 확인해주었습니다.

##### curl 스크립트 실행 및 확인

![gcurl](/assets/images/gdown-curl4.png)

스크립트를 실행하여 구글 드라이브에 있는 파일을 다운로드 해주고, 다운로드 받은 파일이 있는지까지 확인했습니다.

## 맺음

이렇게 해서 **wget**, **curl**, **gdown.pl** 세 가지 방법으로 구글 드라이브에 있는 파일을 다운로드 받는 방법에 대해서 알아보았습니다.

혹시나 궁금한 점이나 이상한 부분이 있으면 댓글 부탁드리겠습니다.

감사합니다.
