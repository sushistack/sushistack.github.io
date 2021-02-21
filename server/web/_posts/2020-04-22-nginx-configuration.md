---
layout: post
published: true
title: Nginx 설정
icon: nginx
description: >
  Mac nginx 설정하는 방법 및 각 설정 값들이 어떤 의미를 갖는지 알아보도록 하겠습니다.
author: deeplify
toc: true
permalink: /server/web/nginx-configuration
tags:
  - nginx
  - config
  - mac
  - ubuntu
  - centos
---

웹서버 설정 없이 설치만하면 할 수 있는 것이 너무나도 제한적일 것입니다. static한 문서만 읽을 수 있고,
도메인도 설정이 되어 있지 않아서 서버 IP로만 접근할 수 있을 것입니다. 또한 모든 설정들이 defualt 값으로
되어 있기 때문에 동작하지 않거나 제한적으로 동작하는 것들이 있을 것입니다.

## Nginx 설정

이 글에서는 간단하게 nginx 설정하는 방법과 설정하는 값들이 어떤 의미를 가지고 있는지 알아보는 시간을
갖도록 하겠습니다.

### 설정파일 위치

- macOS

```text
/usr/local/etc/nginx
```

- centOS 또는 ubuntu

```text
/etc/nginx
```

### 설정 파일

설정파일 위치로 이동하면 다음과 같이 다양한 파일들이 있습니다. 실제로 설정파일인 파일들과 `~.default`로 끝나는
백업용 파일들이 있습니다.

> Configuration files

```text
fastcgi.conf
fastcgi_params
koi-utf
koi-win
mime.types                # mime 타입 설정 파일
nginx.conf                # 웹서버 설정 파일
scgi_params
uwsgi_params
win-utf
```

> Default files for backup

```text
fastcgi.conf.default
fastcgi_params.default
mime.types.default
nginx.conf.default
scgi_params.default
uwsgi_params.default
```

### nginx.conf

`nginx.conf` 파일의 내용을 토대로 각 값들의 의미와 어떤 기능을 하는지 하나씩 알아보도록 하겠습니다.

#### **독립형 설정**

##### 1. user

```nginx
user [user] [group];
user www www;
```

`worker process`에서 사용하는 사용자 및 그룹 자격 증명을 정의합니다. group을 생략하면 이름이 user와 같은 그룹이 사용됩니다.

##### 2. worker_processes

```nginx
worker_processes Number | auto;
worker_processes 1;
```

`worker process`의 수를 정의합니다.

최적의 값은 CPU 코어 수, 데이터를 저장하는 하드 디스크 드라이브 수 및 로드 패턴을 포함하여 많은 요인에 따라 다릅니다. 확실하지 않은 경우, 사용 가능한 CPU 코어 수로 설정하는 것이 좋습니다. (`auto`로 설정하는 경우, nginx에서 자동으로 감지를 시도합니다)

##### 3. error_log

```nginx
error_log file [level];
error_log logs/error.log info;

# levels: debug, info, notice, warn, error, crit, alert, emerg
```

웹서버 실행 중 발생하는 에러에 대한 로깅을 설정합니다.

첫 번째 인자로는 파일의 위치, 두 번째 인자로는 로깅 레벨을 설정합니다. 만약 `error_log` 설정을 하지 않는다면,
기본 파일에 로그가 저장됩니다. 또한 두 번째 인자를 생략하면 level은 `error`로 설정됩니다.

##### 4. pid

```nginx
pid file;
pid logs/nginx.pid;
```

nginx의 process ID를 저장할 파일을 설정합니다.

##### 5. worker_rlimit_nofile

`worker process`에 대한 최대 열린 파일 수(RLIMIT_NOFILE)에 대한 제한을 변경합니다.
기본 프로세스를 다시 시작하지 않고 한계를 늘리는 데 사용됩니다.

<hr>

#### **events 설정**

일반적으로 worker process의 연결 수, 연결 방법에 대한 것을 설정할 때 events 영역 내부에 설정합니다.

##### 1. worker_connections

```nginx
events {
  worker_connections  number;
  # worker_connections 1024;
}
```

`worker process`에서 열 수 있는 최대 동시 연결 수를 설정합니다.

이 숫자에는 클라이언트와의 연결뿐만 아니라 모든 연결(ex. 프록시 서버와의 연결)이 포함됩니다. 또 다른 고려 사항은 실제 동시 연결 수가 최대 `open files` 개수에 대한 현재 한계를 초과 할 수 없습니다.

##### 2. use

```nginx
events {
  use [method];
  # use kqueue;
}
```

사용할 connection 처리 방법을 지정합니다. nginx는 기본적으로 가장 효율적인 방법을 사용하므로 명시 적으로 지정할 필요가 없습니다.

#### **http 설정**

Http 어플리케이션 layer와 3, 4 layer 사이에 관련한 설정을 하는 영역입니다.

##### 1. include

```nginx
http {
  include mime.types;
}
```

설정파일 외부에 있는 다른 설정파일을 포함시킬 때 사용합니다.

##### 2. default_type

```nginx
http {
  default_type application/octet-stream;
}
```

이 웹서버의 기본 `Content-Type`을 설정합니다. `octet-stream`은 바이너리 형태의 타입을 의미합니다.
일반적으로 nginx에서 해석할 수 없는 타입이라면 요청을 기본 타입으로 요청을 받도록 설정됩니다.

##### 3. log_format

```nginx
http {
  log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    '$status $body_bytes_sent "$http_referer" '
    '"$http_user_agent" "$http_x_forwarded_for"';
}
```

로그 포맷을 설정합니다.

변수와 관련한 내용은 다음 링크에서 확인 가능합니다.

{% include base/components/link.html title='Alphabetical index of variables' internal_link='http://nginx.org/en/docs/varindex.html' %}

##### 4. access_log

```nginx
http {
  access_log logs/access.log [context];
  # access_log logs/access.log main;
}
```

액세스 로그를 저장할 파일을 설정합니다.

##### 5. sendfile

```nginx
http {
  sendfile on | off;
}
```

nginx에서 정적파일을 보내도록 설정합니다.

#### 6. tcp_nopush

```nginx
http {
  tcp_nopush on | off;
}
```

클라이언트로 패킷이 전송되기 전에 버퍼가 가득 찼는지 확인하여, 다 찼으면 패킷을 전송하도록 하여
네트워크 오버헤드를 줄이도록 설정합니다.

#### 7. tcp_nodelay

```nginx
http {
  tcp_nodelay on | off;
}
```

`tcp_nodelay`를 활성화하면 소켓이 패킷 크기에 상관없이 버퍼에 데이터를 보내도록합니다.

`sendfile`, `tcp_nopush`, `tcp_nodelay`에 대해서 자세히 알고 싶다면 아래 링크를 참고하세요.
해당 글 내용에 의하면 세 가지 설정 모두 사용하는 것을 권장하는 것 같습니다.

{% include base/components/link.html title='Nginx Optimization: understanding sendfile, tcp_nodelay and tcp_nopush' internal_link='https://thoughts.t37.net/nginx-optimization-understanding-sendfile-tcp-nodelay-and-tcp-nopush-c55cdd276765' %}

##### 8. keepalive_requests

```nginx
http {
  keepalive_requests number;
  # keepalive_requests 100;
}
```

웹서버가 캐싱할 수 있는 커넥션 수를 설정합니다. 너무 많은 수를 사용하면 자원 점유에 문제가 생기니 적절하게 설정하는 것이 좋습니다.

##### 9. keepalive_timeout

```nginx
http {
  keepalive_timeout [seconds];
  # keepalive_timeout 65;
}
```

클라이언트에서 해당 서버로 `keepalive` 커넥션을 유지할 수 있는 시간을 설정합니다. 너무 길면 요청이 없는 클라이언트와의 
커넥션을 연결하고 있기 때문에 자원의 낭비가 발생한다.

##### 10. server_names_hash_bucket_size

```nginx
http {
  server_names_hash_bucket_size number;
  # server_names_hash_bucket_size 512;
}
```

호스트 네임의 해시 버킷 사이즈를 설정합니다.

자세한 설명은 아래 링크를 통해서 확인하실 수 있습니다.

{% include base/components/link.html title='Nginx server_names_hash 설정' internal_link='/server/web/nginx-server-names-hash' %}

##### 11. gzip

```nginx
http {
  gzip on | off;
}
```

웹서버에서 문서 요청에 대한 응답을 gzip 압축 전송에 대한 설정을 합니다.

<hr>

#### http > server

이 영역은 인증서, url 컨트롤, proxy 등 어플리케이션 layer 관련한 설정을 합니다.

##### 1. listen

```nginx
http {
  server {
    listen 80;
  }
}
```

서버의 리스너 포트를 설정합니다.

##### 2. server_name

```nginx
http {
  server {
    server_name [host_name];
    # server_name  www.example.com
  }
}
```

서버 이름을 설정합니다. (도메인 등록)

##### 3. location

```nginx
http {
  server {
    location [path] {
      root [root directory path]
      index [index page]
    }
    # location / {
    #   root /usr/share/nginx/www/
    #   index index.html
    #}
  }
}
```

`path`로 들어오는 요청에 대한 설정을 합니다.
root는 linux file system에서의 디렉토리 경로를 index는 해당 위치의 index 문서를 설정합니다.

##### 4. error_page

```nginx
http {
  server {
    error_page number [page.html]
    # error_page 404 /404.html;
    # error_page 500 502 503 504 /50x.html;
  }
}
```

에러페이지를 설정합니다.

<hr>

추가적으로 특정 설정에 관련된 것들은 다음과 같이 따로 정리해 놓았습니다.

{% include base/components/link.html title='Nginx SSL 설정' internal_link='/server/web/nginx-ssl' %}

{% include base/components/link.html title='Nginx proxy pass 설정' internal_link='/server/web/nginx-proxy-pass' %}

{% include base/components/link.html title='Nginx 로드밸런싱 설정' internal_link='/server/web/nginx-load-banlancing' %}

## 맺음

이렇게 nginx 설정에 대한 기본적인 설정 값에 대해서 정리해 보았습니다.
잘 못된 점이나 궁금한 점이 있으시면 댓글 부탁드리겠습니다.

감사합니다.

### Ref

{% include base/components/link.html title='Core functionality' domain ='nginx.org' internal_link='http://nginx.org/en/docs/ngx_core_module.html' %}
