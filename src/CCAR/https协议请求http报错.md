# 网站https协议请求http报错

## 报错原文

> Mixed Content: The page at 'https://www.hyper99.shop/login' was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint 'http://47.122.119.35:9090/api/auth/login'. This request has been blocked; the content must be served over HTTPS.

报错原因：最开始前后端代码都是使用http的不安全请求，为了保护用户和数据，我将代码部署到宝塔申请了SSL证书，并且域名托管cloudflare，导致前端https请求后端http代码时触发了浏览器安全策略，请求遭到拦截

## 关键词

1. **混合内容（Mixed Content）**
   - 当 HTTPS 页面通过 HTTP 协议加载子资源（脚本、AJAX、图片等）时触发。
   - 分类：
     - **被动型混合内容**（如图像）：浏览器可能允许加载但会警告。
     - **主动型混合内容**（如脚本、AJAX）：浏览器**强制阻塞**（本例即属此类）。
2. **同源策略（Same-Origin Policy）与内容安全策略（CSP）**
   - 浏览器要求动态资源（如 `XMLHttpRequest`）必须与主页面协议一致（HTTPS → HTTPS）。
3. **TLS/SSL 加密（Transport Layer Security）**
   - HTTP 请求未加密，可能被中间人攻击（Man-in-the-Middle）窃取敏感数据（如登录凭证）。
   - **SSL（Secure Sockets Layer）** 是一种用于保护互联网通信的加密协议，后续版本为 **TLS（Transport Layer Security）**。它通过结合对称加密和非对称加密，确保数据的机密性、完整性和身份验证。

## 解决方案

前端修改代码，将生产环境请求api的url改为https，并重新打包上传，替换原有文件

```js
const ENV = {
    development: {
        API_BASE_URL: 'http://localhost:9090/api',
        ALLOWED_ORIGINS: ['http://localhost:5173', 'http://localhost:8080']
    },
    production: {
        API_BASE_URL: '/api',
        ALLOWED_ORIGINS: ['https://www.hyper99.shop']
    }
};
```

在网站设置中添加反向代理

原理：让主网站服务器（www.hyper99.shop）接收所有的浏览器请求。

- 如果请求的是网页、图片等前端资源，服务器就直接返回这些文件。

- 如果请求的是 API（路径以 /api 开头），服务器就将这个请求转发给您真正的后端 API 服务器（http://47.122.119.35:9090），然后将后端返回的结果再传回给浏览器。

对于浏览器来说，它始终只在和 https://www.hyper99.shop 通信，完全不知道后端的存在。这样既安全，又解决了跨域和混合内容的问题。

::: danger

注意不要打开缓存按钮，对于 API 服务来说，它会缓存用户的登录请求、注册请求等敏感操作的结果。（严重的安全问题：比如一个用户可能会看到上一个用户的数据），还会因为缓存了错误的状态（比如缓存了某个 403 或 404 响应）而导致后续所有请求都失败。

:::

![image-20250711225731050](https://yhyper.dpdns.org/photostore/2025/07/image-20250711225731050.png)

**配置代码如下**

添加了：proxy_set_header X-Forwarded-Proto $scheme;请求头，告诉后端原始请求是https的，这对于Spring Security等框架至关重要。

```js
#PROXY-START/api

location /api/ {
    proxy_pass http://47.122.119.35:9090;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}

#PROXY-END/api
```

::: tip

如果使用的是其他 web 服务器（如 Apache），配置方式会所不同，但核心思想是一样的。

:::

设置好前端后，后端对于CORS也要进行配置，“访客白名单”上别忘记贴上自家门牌号

```java
.allowedOrigins("https://www.hyper99.shop")
```

## 网络上的其他方案

### 方案 1：升级后端服务至 HTTPS

使用 Let's Encrypt 免费证书或购买商业证书。

示例（Nginx 配置）：

```
server {
    listen 443 ssl;
    server_name api.hyper99.shop;  # 绑定域名
    ssl_certificate /etc/letsencrypt/live/api.hyper99.shop/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.hyper99.shop/privkey.pem;
    location /api/ {
        proxy_pass http://localhost:9090;  # 反向代理到后端
    }
}
```

前端修改请求为 HTTPS

```
// 正确示例
axios.post("https://api.hyper99.shop/api/auth/login", data);
```

### 方案 2：使用相对协议

```
// 自动继承页面协议 (HTTPS → HTTPS, HTTP → HTTP)

axios.post("//api.hyper99.shop/api/auth/login", data);
```

### 方案 3：启用 HSTS（强制 HTTPS）

在响应头添加：

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

浏览器自动将 HTTP 升级为 HTTPS（需首次访问通过 HTTPS）。