---
layout: post
published: false
title: "[Java/자바] 실행 옵션과 클래스 로딩"
icon: java
description: >
  Java 클래스로딩에 대해서 소개해보도록 하겠습니다.
author: deeplify
toc: true
permalink: /back-end/java/class-loading
tags:
  - java
  - class loading
  - 클래스 로딩
---

오늘 할일은 Java 실행 옵션을 통해서 어떤식으로 클래스들이 로딩되고, 실행되는지 코드를 통해 실험해 볼 예정입니다.
시나리오는 다음과 같습니다.

1. main method가 비어 있는 클래스를 하나 만들고, compile 후 "-verbose:class" 옵션을 준 후, 실행한다. (단, 클래스 변수로 StringTonkenizer를 선언하고, inner static class도 작성해 놓음.)
2. main method에서 inner static class와 java. package에 들어있는 StringTokenizer class를 사용하도록 하고 실행한다.
3. main method에서 forClassName method를 통해서 run-time에 클래스를 알 수 있도록 해보자.
4. 셋의 차이를 비교해보고, 알아 볼 수 있는 점을 체크한다.

## 실행 명령어

```bash
javac ClassLoadingTest.java
# 명령어 실행 후, ClassLoadingTest.class 파일과 ClassLoadingTest$StaticClass.class가 생성됩니다.
java -verbose:class ClassLoading
# 옵션을 주고 class 파일을 실행합니다.
```

### empty main

```java
import java.util.StringTokenizer;

public class ClassLoadingTest {
    static StringTokenizer st;

    public static void main(String[] args) {
        // main method는 비워 둔다.
    }

    private static class StaticClass {
        static String staticClassInfo;

        static {
            System.out.println("static property is initialized in here!!!");
            staticClassInfo = "I'm static property of static class that is [" + StaticClass.class.getSimpleName() + "]";
        }

        String instanceClassInfo;

        {
            System.out.println("instance property is initialized in here!!!");
            instanceClassInfo = "I'm instance property";
        }

        public static String getStaticClassInfo() {
            return staticClassInfo;
        }

        public String getInstanceClassInfo() {
            return this.instanceClassInfo;
        }
    }
}

```

```text
[0.015s][info][class,load] opened: /Library/Java/JavaVirtualMachines/jdk-version/Contents/Home/lib/modules
[0.027s][info][class,load] java.lang.Object source: jrt:/java.base              ----  Object Class loading

...

[0.027s][info][class,load] java.lang.String source: jrt:/java.base              ----  String Class loading
...

[0.029s][info][class,load] java.lang.ClassLoader source: jrt:/java.base         ----  ClassLoader Class loading
[0.029s][info][class,load] java.lang.System source: jrt:/java.base

...

[0.034s][info][class,load] jdk.internal.loader.BuiltinClassLoader source: jrt:/java.base
[0.034s][info][class,load] jdk.internal.loader.ClassLoaders$AppClassLoader source: jrt:/java.base
[0.034s][info][class,load] jdk.internal.loader.ClassLoaders$PlatformClassLoader source: jrt:/java.base

...

[0.285s][info][class,load] ClassLoadingTest source: file:/Users/~~~~/Documents/testtest/src/

...

```

### not empty main

```java

import java.util.StringTokenizer;

public class ClassLoadingTest {
    static StringTokenizer st;

    public static void main(String[] args) {
        st = new StringTokenizer("test", "");
        st.nextToken();
        System.out.println(StaticClass.getStaticClassInfo());
    }

    private static class StaticClass {
        static String staticClassInfo;

        static {
            System.out.println("static property is initialized in here!!!");
            staticClassInfo = "I'm static property of static class that is [" + StaticClass.class.getSimpleName() + "]";
        }

        String instanceClassInfo;

        {
            System.out.println("instance property is initialized in here!!!");
            instanceClassInfo = "I'm instance property";
        }


        public static String getStaticClassInfo() {
            return staticClassInfo;
        }

        public String getInstanceClassInfo() {
            return this.instanceClassInfo;
        }
    }
}

```

```text
[0.009s][info][class,load] opened: /Library/Java/JavaVirtualMachines/jdk-9.0.1.jdk/Contents/Home/lib/modules
[0.019s][info][class,load] java.lang.Object source: jrt:/java.base

...

[0.020s][info][class,load] java.lang.String source: jrt:/java.base
...

[0.021s][info][class,load] java.lang.ClassLoader source: jrt:/java.base
[0.021s][info][class,load] java.lang.System source: jrt:/java.base

...

[0.034s][info][class,load] jdk.internal.loader.BuiltinClassLoader source: jrt:/java.base
[0.034s][info][class,load] jdk.internal.loader.ClassLoaders$AppClassLoader source: jrt:/java.base
[0.034s][info][class,load] jdk.internal.loader.ClassLoaders$PlatformClassLoader source: jrt:/java.base
...

[0.230s][info][class,load] ClassLoadingTest source: file:/Users/alreadyj/Documents/testtest/src/
[0.230s][info][class,load] java.lang.NamedPackage source: jrt:/java.base
[0.230s][info][class,load] java.lang.PublicMethods$MethodList source: jrt:/java.base
[0.231s][info][class,load] java.lang.PublicMethods$Key source: jrt:/java.base
[0.231s][info][class,load] java.lang.Void source: jrt:/java.base
Main method is started now
[0.235s][info][class,load] java.util.Enumeration source: jrt:/java.base
[0.236s][info][class,load] java.util.StringTokenizer source: jrt:/java.base
[0.239s][info][class,load] ClassLoadingTest$StaticClass source: file:/Users/~~~~/Documents/testtest/src/
static property is initialized in here!!!


----  바로 위에 StringTokenizer와 StaticClass가 로딩 되었음을 알 수 있다.
----  또한 static 블록으로 클래스 변수를 초기화하는 구문이 바로 실행되는 것을 확인할 수 있다.
...

I'm static property of static class that is [StaticClass]
[0.332s][info][class,load] java.lang.Shutdown source: jrt:/java.base
[0.332s][info][class,load] java.lang.Shutdown$Lock source: jrt:/java.base

```

### main with forClassName

```java
import java.util.StringTokenizer;

public class ClassLoadingTest {
    static StringTokenizer st;

    public static void main(String[] args) throws ClassNotFoundException, IllegalAccessException, InstantiationException {

        Class c = Class.forName("ClassLoadingTest$StaticClass");
        Object obj = c.newInstance();
        System.out.println("args: ClassLoadingTest$StaticClass");
        System.out.println("className: " + obj.getClass().getTypeName());
    }

    public static class StaticClass {
        static String staticClassInfo;

        static {
            System.out.println("static property is initialized in here!!!");
            staticClassInfo = "I'm static property of static class that is [" + StaticClass.class.getSimpleName() + "]";
        }

        String instanceClassInfo;

        {
            System.out.println("instance property is initialized in here!!!");
            instanceClassInfo = "I'm instance property";
        }


        public static String getStaticClassInfo() {
            return staticClassInfo;
        }

        public String getInstanceClassInfo() {
            return this.instanceClassInfo;
        }
    }
}

```

```text
[0.008s][info][class,load] opened: /Library/Java/JavaVirtualMachines/jdk-9.0.1.jdk/Contents/Home/lib/modules
[0.020s][info][class,load] java.lang.Object source: jrt:/java.base

...

[0.025s][info][class,load] java.lang.ClassLoader source: jrt:/java.base
[0.026s][info][class,load] java.lang.System source: jrt:/java.base

...

[0.041s][info][class,load] jdk.internal.loader.BuiltinClassLoader source: jrt:/java.base
[0.041s][info][class,load] jdk.internal.loader.ClassLoaders$AppClassLoader source: jrt:/java.base
[0.041s][info][class,load] jdk.internal.loader.ClassLoaders$PlatformClassLoader source: jrt:/java.base

...

[0.241s][info][class,load] ClassLoadingTest source: file:/Users/~~~~/Documents/testtest/src/

...

Main method is started now
[0.242s][info][class,load] ClassLoadingTest$StaticClass source: file:/Users/~~~~/Documents/testtest/src/
static property is initialized in here!!!

...

className: ClassLoadingTest$StaticClass

```

여기서 몇 가지 알 수 있는 점이 있다.

1. 가장 처음에 로딩되는 클래스는 Object 클래스입니다, 이후 String, ClassLoader, System 클래스들이 로딩되는 것을 확인할 수 있습니다.
2. 일부러 StaticClass라는 inner class를 만들어 두고, StringTokenizer 변수를 `클래스 변수`로 선언해 놓았습니다.

- "empty main"의 실행 결과를 보면 눈을 씻고 찾아봐도 StaticClass 클래스와 StringTonkenizer 클래스를 로딩했다는 정보는 없는 것을 확인할 수 있습니다. 즉, 이는 클래스로더가 실행중에 사용되지 않는 클래스는 로딩하지 않는다는 이야기입니다.
- "not empty main"의 실행결과를 보면, StaticClass 클래스와 StringTonkenizer 클래스가 ClassLoadingTest 클래스 로딩 된 후에 바로 로딩이 되었습니다.

3. "empty main", "main with forClassName"을 보면 결과의 차이가 없음을 알 수 있습니다.

```text
 일부 블로그에서는 둘의 차이를 언급하며 로드타임 동적로딩, 런타임 동적로딩으로 구분하고 있습니다. 하지만 다른점이 없어보입니다.
그 이유는 클래스 로더는 성능상의 이유로 Lazy loading 을 하기 때문이라고 생각합니다. Instance가 생성된다던가, static 변수를 사용해야 한다던가하는 class의 사용 유무에 따라 런타임에 로딩됩니다.

또 한가지 더 설명 드리자면,

public class Test {
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}

위와 같은 예를 들면서 Test 클래스에서 Object, System, String을 참조하고 있기 때문에 Test 클래스의 로드를 멈추고 필요한 클래스
들을 로딩한다고 설명하고 있지만,
이들은 Java.base package에 포함되어 있는 클래스들로 Bootstrap class loader가 처음에 무조건 로딩하는 클래스들입니다.
만약 설명이 맞다면, <empty main> 예에서 String과 System은 로딩되는 것이 맞습니다.

```
