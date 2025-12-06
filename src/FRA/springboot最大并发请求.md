# SpringBoot最大并发请求

SpringBoot中关于Tomcat工作线程池的参数可以在`spring-boot-autoconfigure`依赖包中的`spring-configuration-metadata.json`中找到。以下四个参数控制Tomcat的工作线程池和连接处理能力。

## 核心计算公式

:::info
**最大并发同时请求 = 最大连接数（max-connections）+ 最大等待数（accept-count）**

默认情况下：**8192 + 100 = 8292** 个并发请求
:::

## 参数说明

SpringBoot通过以下四个参数控制Tomcat的并发处理能力：

### 1. server.tomcat.threads.max

**默认值：** 200

**作用：** 最大工作线程数，控制Tomcat可以同时处理请求的线程数量。

**说明：** 这是真正处理请求的工作线程池大小。当所有线程都在忙碌时，新请求会被放入等待队列。

### 2. server.tomcat.threads.min-spare

**默认值：** 10

**作用：** 最小空闲线程数，工作线程池中保持的最小空闲线程数量。

**说明：** 为了避免频繁创建和销毁线程的开销，Tomcat会保持一定数量的空闲线程待命。

### 3. server.tomcat.max-connections

**默认值：** 8192

**作用：** 最大连接数，服务器在同一时间可以接受和处理的最大连接数。

**说明：** 一旦达到此限制，操作系统可能仍会根据`accept-count`属性接受连接，但这些连接会被放入等待队列。

### 4. server.tomcat.accept-count

**默认值：** 100

**作用：** 等待队列长度，当所有工作线程都在忙碌时，可以放入等待队列的最大请求数。

**说明：** 当连接数达到`max-connections`且所有线程都忙碌时，新的连接请求会被放入此队列等待处理。

## 参数配置元数据

这些参数的元数据定义如下：

```json 
[
  {
    "name": "server.tomcat.threads.max",
    "type": "java.lang.Integer",
    "description": "Maximum amount of worker threads.",
    "sourceType": "org.springframework.boot.autoconfigure.web.ServerProperties$Tomcat$Threads",
    "defaultValue": 200
  },
  {
    "name": "server.tomcat.threads.min-spare",
    "type": "java.lang.Integer",
    "description": "Minimum amount of worker threads.",
    "sourceType": "org.springframework.boot.autoconfigure.web.ServerProperties$Tomcat$Threads",
    "defaultValue": 10
  },
  {
    "name": "server.tomcat.max-connections",
    "type": "java.lang.Integer",
    "description": "Maximum number of connections that the server accepts and processes at any given time. Once the limit has been reached, the operating system may still accept connections based on the \"acceptCount\" property.",
    "sourceType": "org.springframework.boot.autoconfigure.web.ServerProperties$Tomcat",
    "defaultValue": 8192
  },
  {
    "name": "server.tomcat.accept-count",
    "type": "java.lang.Integer",
    "description": "Maximum queue length for incoming connection requests when all possible request processing threads are in use.",
    "sourceType": "org.springframework.boot.autoconfigure.web.ServerProperties$Tomcat",
    "defaultValue": 100
  }
]
```

## 实际配置示例

### application.yml 配置

```yaml
server:
  tomcat:
    threads:
      max: 200          # 最大工作线程数
      min-spare: 10     # 最小空闲线程数
    max-connections: 8192  # 最大连接数
    accept-count: 100      # 等待队列长度
```

### application.properties 配置

```properties
# Tomcat线程池配置
server.tomcat.threads.max=200
server.tomcat.threads.min-spare=10

# Tomcat连接配置
server.tomcat.max-connections=8192
server.tomcat.accept-count=100
```

## 工作流程说明

1. **接收连接**：服务器接受新连接，直到达到`max-connections`限制
2. **线程分配**：连接由工作线程处理，最多有`threads.max`个线程同时工作
3. **队列等待**：当所有线程忙碌且连接数未达上限时，新连接可以继续接受并等待处理
4. **队列满载**：当连接数达到`max-connections`且等待队列达到`accept-count`时，新连接将被拒绝

## 调优建议

### 高并发场景配置

```yaml
server:
  tomcat:
    threads:
      max: 500          # 增加工作线程数，提高并发处理能力
      min-spare: 50     # 增加最小空闲线程，快速响应突发请求
    max-connections: 10000  # 增加最大连接数
    accept-count: 500       # 增加等待队列，减少连接拒绝
```

### IO密集型应用

对于IO密集型应用（如数据库查询、外部API调用），可以适当增加线程数：

```yaml
server:
  tomcat:
    threads:
      max: 800          # IO等待时间长，可以增加线程数
      min-spare: 100
```

### CPU密集型应用

对于CPU密集型应用，线程数不宜过多（建议接近CPU核心数）：

```yaml
server:
  tomcat:
    threads:
      max: 50           # CPU密集型，线程数接近CPU核心数
      min-spare: 10
```

### 资源受限环境

在资源受限的环境中，需要降低这些参数：

```yaml
server:
  tomcat:
    threads:
      max: 50
      min-spare: 5
    max-connections: 1000
    accept-count: 50
```

## 注意事项

1. **内存消耗**：增加**线程数**和**连接数**会增加内存消耗，每个线程和连接都需要一定的内存空间
2. **线程切换开销**：线程数过多会导致频繁的上下文切换，反而降低性能
3. **操作系统限制**：需要注意操作系统的文件描述符限制（`ulimit -n`），确保系统支持足够的并发连接
4. **监控指标**：建议监控线程池使用率、连接数、队列长度等指标，根据实际情况调整参数
5. **测试验证**：任何参数调整都应该在测试环境中进行压力测试，验证性能提升效果
