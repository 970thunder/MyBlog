我已完整打通 GitHub 登录全链路。下面是一份“后端 + 前端”的详细说明文档，逐个关键点与关键代码逐行讲解，便于你或团队成员快速上手与维护。

### 一、整体流程概览

- 前端点击“GitHub 登录” → 跳转后端的 /oauth2/authorization/github

- GitHub 授权后回调到后端 /login/oauth2/code/github?code=...&state=...

- Spring Security OAuth2 Client 自动交换 token、获取用户信息（OAuth2User）

- 成功处理器保存/更新用户到数据库，并重定向回前端首页

- 前端首页调用 /api/auth/me 获取当前登录用户信息并展示

### 二、后端实现

#### 2.1 依赖与基础配置

- 增加 Spring Security + OAuth2 Client + JPA + MySQL 依赖

```xml
<dependency>

   <groupId>org.springframework.boot</groupId>

   <artifactId>spring-boot-starter-web</artifactId>

  </dependency>

  <dependency>

   <groupId>org.springframework.boot</groupId>

   <artifactId>spring-boot-starter-security</artifactId>

  </dependency>

  <dependency>

   <groupId>org.springframework.boot</groupId>

   <artifactId>spring-boot-starter-oauth2-client</artifactId>

  </dependency>

  <dependency>

   <groupId>org.springframework.boot</groupId>

   <artifactId>spring-boot-starter-data-jpa</artifactId>

  </dependency>

  <dependency>

   <groupId>com.mysql</groupId>

   <artifactId>mysql-connector-j</artifactId>

   <scope>runtime</scope>

  </dependency>
```

- application.yml 中的 OAuth2 与数据源、登录成功重定向、CORS 前端来源等配置

```yml
spring:
  application:
    name: hyperui-backend
  profiles:
    active: dev
  security:
    oauth2:
      client:
        registration:
          github:
            client-id: ${GITHUB_CLIENT_ID:}
            client-secret: ${GITHUB_CLIENT_SECRET:}
            scope: read:user, user:email
            redirect-uri: "{baseUrl}/login/oauth2/code/{registrationId}"
            client-name: GitHub
        provider:
          github:
            authorization-uri: https://github.com/login/oauth/authorize
            token-uri: https://github.com/login/oauth/access_token
            user-info-uri: https://api.github.com/user
            user-name-attribute: id
  datasource:
    url: ${DB_URL:jdbc:mysql://127.0.0.1:3306/hyperui?useUnicode=true&characterEncoding=utf8&serverTimezone=UTC}
    username: ${DB_USER:root}
    password: ${DB_PASS:root}
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: none
    open-in-view: false
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQLDialect
        jdbc.time_zone: UTC
server:
  port: 8080
logging:
  level:
    org.springframework.security: INFO
management:
  endpoints:
    web:
      exposure:
        include: health,info
app:
  oauth:
    login-success-redirect: http://localhost:5173/
```

关键点：

- redirect-uri 使用 {baseUrl}/login/oauth2/code/{registrationId}，与 GitHub OAuth App 回调地址完全一致（http://localhost:8080/login/oauth2/code/github）

- app.oauth.login-success-redirect 设置为 http://localhost:5173/，登录成功后会重定向回前端首页

- datasource 使用 utf8，避免本机出现 UnsupportedEncodingException

#### 2.2 安全配置 SecurityFilterChain

```java
package io.hyperui.config;

import io.hyperui.security.OAuth2LoginSuccessHandler;
import io.hyperui.user.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, UserService userService,
                                                   @Value("${app.oauth.login-success-redirect:http://localhost:5173/}") String successRedirect) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/ping").permitAll()
                        .requestMatchers("/oauth2/**", "/login/**").permitAll()
                        .requestMatchers("/api/**").permitAll()
                        .anyRequest().permitAll())
                .oauth2Login(oauth -> oauth.successHandler(new OAuth2LoginSuccessHandler(userService, successRedirect)))
                .logout(logout -> logout.logoutUrl("/api/auth/logout").logoutSuccessUrl("/"));
        return http.build();
    }
}
```

关键说明：

- 通过 oauth2Login(...) 开启 OAuth2 登录，且注入自定义成功处理器

- 允许 /oauth2/**、/login/** 被匿名访问，以完成 OAuth 流程

- /api/auth/logout 暴露为登出端点

#### 2.3 登录成功处理器：保存用户并重定向

```java
package io.hyperui.security;

import io.hyperui.user.UserService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;

public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final UserService userService;
    private final String successRedirect;

    public OAuth2LoginSuccessHandler(UserService userService, String successRedirect) {
        this.userService = userService;
        this.successRedirect = successRedirect;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        if (authentication.getPrincipal() instanceof OAuth2User principal) {
            userService.findOrCreateFromGithub(principal);
        }
        response.sendRedirect(successRedirect != null ? successRedirect : "/");
    }
}
```

关键说明：

- 从 Authentication 读取 OAuth2User，交给 UserService 持久化

- 完成后 response.sendRedirect(...) 重定向回前端首页（来自配置）

#### 2.4 用户实体、仓储、服务、映射器

- 实体映射到 user 表（与迁移脚本一致）

- 仓储

```java
package io.hyperui.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByGithubId(String githubId);
    Optional<User> findByUsername(String username);
}
```



- Service：若存在则更新必要资料，不存在则创建

```java
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    public UserServiceImpl(UserRepository userRepository) { this.userRepository = userRepository; }

    @Override
    @Transactional
    public User findOrCreateFromGithub(OAuth2User principal) {
        Object idAttr = principal.getAttribute("id");
        String githubId = idAttr == null ? null : idAttr.toString();
        return userRepository.findByGithubId(githubId)
                .map(existing -> {
                    UserMapper.applyGithubProfile(existing, principal);
                    return userRepository.save(existing);
                })
                .orElseGet(() -> {
                    User user = new User();
                    UserMapper.applyGithubProfile(user, principal);
                    return userRepository.save(user);
                });
    }
}
```



- 映射器：从 OAuth2User 提取字段，统一做 toString()，避免类型转换异常

UserMapper.java

```java
public class UserMapper {

  public static void applyGithubProfile(User *user*, OAuth2User *principal*) {

​    Object idAttr = principal.getAttribute("id");

​    String githubId = idAttr == null ? null : idAttr.toString();

​    Object loginAttr = principal.getAttribute("login");

​    String login = loginAttr == null ? null : loginAttr.toString();

​    Object nameAttr = principal.getAttribute("name");

​    String name = nameAttr == null ? null : nameAttr.toString();

​    Object avatarAttr = principal.getAttribute("avatar_url");

​    String avatar = avatarAttr == null ? null : avatarAttr.toString();

​    Object emailAttr = principal.getAttribute("email");

​    String email = emailAttr == null ? null : emailAttr.toString();

​    if (user.getId() == null) {

​      user.setGithubId(githubId);

​      user.setCreatedAt(Timestamp.from(Instant.now()));

​      user.setStatus("ACTIVE");

​      user.setRole("USER");

​    }

​    user.setUsername(login);

​    user.setDisplayName(name != null ? name : login);

​    user.setAvatarUrl(avatar);

​    if (email != null && !email.isBlank()) {

​      user.setEmail(email);

​    }

​    user.setUpdatedAt(Timestamp.from(Instant.now()));

  }

}
```



#### 2.5 认证信息与登出接口

- 获取当前用户信息 /api/auth/me（未登录返回 code=10001）

- 退出登录 /api/auth/logout（这里用 GET 触发 request.logout()，也可改为 POST）

AuthController.java

```java
@RestController

public class AuthController {

  *// GET /api/auth/me -> 返回当前 OAuth 登录用户信息*

  @GetMapping("/api/auth/me")

  public ApiResponse<Map<String, Object>> me(@AuthenticationPrincipal OAuth2User *principal*) {

​    if (principal == null) {

​      return ApiResponse.error(10001, "未登录");

​    }

​    Map<String, Object> user = new HashMap<>();

​    Object id = principal.getAttribute("id");

​    String login = principal.getAttribute("login");

​    String name = principal.getAttribute("name");

​    String avatar = principal.getAttribute("avatar_url");

​    String email = principal.getAttribute("email");

​    user.put("id", id);

​    user.put("username", login);

​    user.put("display_name", name != null ? name : login);

​    user.put("email", email);

​    user.put("avatar_url", avatar);

​    user.put("github_id", String.valueOf(id));

​    user.put("role", "USER");

​    user.put("status", "ACTIVE");

​    return ApiResponse.ok(user);

  }

  *// GET /api/auth/logout -> 退出并清理会话*

  @GetMapping("/api/auth/logout")

  public ApiResponse<String> logout(HttpServletRequest *request*) {

​    try { request.logout(); } catch (ServletException *e*) { }

​    return ApiResponse.ok("ok");

  }

}
```



#### 2.6 CORS 配置（允许前端域访问 API）

```java
@Configuration
public class CorsConfig {

    @Value("${app.frontend.origin:http://localhost:5173}")
    private String frontendOrigin;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(frontendOrigin));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return source;
    }
}
```

### 三、前端实现（Vue 3 + Vite）

#### 3.1 路由

```java
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', component: () => import('../views/Home.vue') },
    { path: '/login', component: () => import('../views/Login.vue') },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
```

#### 3.2 登录页：点击跳转到后端的 OAuth2 登录入口

login.vue

```vue
<template>
  <div ...>
    <div ...>
      <h2 ...>登录</h2>
      <p ...>使用 GitHub 登录以继续</p>
      <button @click="loginWithGithub" ...>
        使用 GitHub 登录
      </button>
      <div ...>后端启动于 http://localhost:8080</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const backendOrigin = (import.meta as any).env.VITE_BACKEND_ORIGIN || 'http://localhost:8080'
const loginWithGithub = () => {
  window.location.href = backendOrigin + '/oauth2/authorization/github'
}
</script>
```

关键说明：

- 不在前端域直接访问 /oauth2/authorization/github，而是跳到后端完整域名，避免卡在前端路由下

#### 3.3 首页：展示登录信息与退出操作

Home.vue

```vue
<template>
  <div style="padding:24px">
    <h1>HyperUI Web</h1>
    <p>API Base: {{ apiBase }}</p>
    <p>当前环境：{{ mode }}</p>
    <div style="margin-top:16px">
      <template v-if="loading">加载中...</template>
      <template v-else>
        <div v-if="me">
          <div>已登录用户：<strong>{{ me.display_name || me.username }}</strong></div>
          <img v-if="me.avatar_url" :src="me.avatar_url" ...>
          <div style="margin-top:12px">
            <button @click="logout" ...>退出登录</button>
          </div>
        </div>
        <div v-else>
          <router-link to="/login">去登录</router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const apiBase = (import.meta as any).env.VITE_API_BASE || 'http://localhost:8080/api'
const mode = import.meta.env.MODE

const me = ref<any>(null)
const loading = ref<boolean>(true)

onMounted(async () => {
  try {
    const res = await fetch(`${apiBase}/auth/me`, { credentials: 'include' })
    const json = await res.json()
    if (json && json.code === 0) {
      me.value = json.data
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})

async function logout() {
  try {
    await fetch(`${apiBase}/auth/logout`, { method: 'POST', credentials: 'include' })
  } catch (e) {
    console.error(e)
  } finally {
    me.value = null
    window.location.href = '/login'
  }
}
</script>
```

关键说明：

- credentials: 'include' 使浏览器带上后端会话 Cookie

- 退出后前端清空本地状态并回到 /login

#### 3.5 前端环境变量（建议）

- UI/.env.development

  text

  ```
  VITE_BACKEND_ORIGIN=http://localhost:8080
  
  VITE_API_BASE=http://localhost:8080/api
  ```

### 四、GitHub OAuth App 正确配置

- Homepage URL: http://localhost:8080（或任意说明用，不强校验）

- Authorization callback URL: http://localhost:8080/login/oauth2/code/github

- 一定保证与 application.yml 的 redirect-uri 基地址一致（不要混用 localhost/127.0.0.1/http/https/端口）

### 五、常见问题与定位

- 回调 404（Whitelabel）：说明后端把你留在了 /，设置 app.oauth.login-success-redirect 为前端首页即可

- 获取 token 超时：后端出网问题，配置 JVM 代理 -Dhttps.proxyHost/-Dhttps.proxyPort

- ClassCastException Integer -> char[]：来自对 OAuth2User 属性强转，已统一 Object -> toString()

### 六、验证步骤

1) 后端设置环境变量：GITHUB_CLIENT_ID、GITHUB_CLIENT_SECRET、DB_URL/DB_USER/DB_PASS

2) 启动后端，确保 app.oauth.login-success-redirect 指向 http://localhost:5173/

3) 启动前端（Vite 5173）

4) 访问 http://localhost:5173/login → 点击“使用 GitHub 登录”

5) 授权后回前端首页，调用 /api/auth/me 显示你的 username/display_name/avatar_url

6) 点击“退出登录”，前端转到 /login

以上就是结合当前仓库实际代码的 GitHub 登录实现与关键代码逐行说明。如需我把本说明存入 docs/ 并随版本提交，也可以继续交给我处理。