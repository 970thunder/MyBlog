## 样式优化

```
. 📂 .vitepress
└── 📂 configs/
│  ├── 📄 index.ts
│  ├── 📄 nav.ts	<--顶部菜单栏导航重写
└── 📂 theme/
│  ├── 📄 index.ts
│  └── 📂 style/
│   ├── 📄 blockquote.css	<--引用颜色
│   ├── 📄 blur.css		<--导航栏毛玻璃
│   ├── 📄 custom-block.css		<--容器颜色
│   ├── 📄 hidden.css	<--隐藏横条
│   ├── 📄 index.css	<--样式代码引用入口
│   ├── 📄 link.css		<--链接添加图片
│   ├── 📄 marker.css	<--记号笔颜色
│   ├── 📄 sidebarIcon.css.css		<--侧边栏样式美化
│   ├── 📄 var.css		<--首页主题色
│   ├── 📄 vp-code-group.css	<--代码组改成Mac风格
│   └── 📄 vp-code.css		<--代码组改成Mac风格
```

## 主题命名

|  **实际功能**  |      命名      |
| :------------: | :------------: |
|    个人中心    |    院长档案Deanfile    |
|    运维教程    | 核心崩溃分析室CCAR |
|    日常随笔    |   零碎疗养区FRA   |
|    算法教程    |    高危日志HRlog    |
|    文章中心    |    病历仓库MRware    |
|   新奇的想法   |   妄想症病房Pward   |
|    软件分享    |  software药房SP  |
|    博客公告    |    系统广播Broadcasting    |
| 首页（已完成） | 参观(index.md) |

## 徽标生成

> 官网：https://shields.io/
>
> https://badgen.net/
>
> https://forthebadge.com/
>
> https://badge.fury.io/

#### 1.后端技术栈

<p>
  <img src="https://img.shields.io/badge/-Spring-6DB33F?logo=Spring&logoColor=FFF" alt="Spring" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Spring%20Boot-6DB33F?logo=Spring-Boot&logoColor=FFF" alt="Spring Boot" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-MySQL-4479A1?logo=MySQL&logoColor=FFF" alt="MySQL" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-MariaDB-A9A9A9?logo=MariaDB&logoColor=003545" alt="MariaDB" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-PostgreSQL-C0C0C0?logo=PostgreSQL&logoColor=4169E1" alt="PostgreSQL" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Oracle-C0C0C0?logo=Oracle&logoColor=F80000" alt="Oracle" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Microsoft%20SQL%20Server-D3D3D3?logo=Microsoft-SQL-Server&logoColor=CC2927" alt="Microsoft SQL Server" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Redis-DC382D?logo=Redis&logoColor=FFF" alt="Redis" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-MongoDB-47A248?logo=MongoDB&logoColor=FFF" alt="MongoDB" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-RabbitMQ-FF6600?logo=RabbitMQ&logoColor=FFF" alt="RabbitMQ" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Solr-D9411E?logo=Apache-Solr&logoColor=FFF" alt="Solr" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-ElasticSearch-005571?logo=ElasticSearch&logoColor=FFF" alt="ElasticSearch" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Logstash-A9A9A9?logo=Logstash&logoColor=005571" alt="Logstash" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Kibana-A9A9A9?logo=Kibana&logoColor=005571" alt="Kibana" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Kafka-C0C0C0?logo=Apache-Kafka&logoColor=231F20" alt="Kafka" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Consul-F24C53?logo=Consul&logoColor=FFF" alt="Consul" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Tomcat-F8DC75?logo=Apache-Tomcat&logoColor=000" alt="Tomcat" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-JUnit5-25A162?logo=JUnit5&logoColor=FFF" alt="JUnit5" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Liquibase-2962FF?logo=Liquibase&logoColor=FFF" alt="Liquibase" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Maven-C71A36?logo=Apache-Maven&logoColor=FFF" alt="Maven" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Gradle-D3D3D3?logo=Gradle&logoColor=02303A" alt="Gradle" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Spring%20Security-6DB33F?logo=Spring-Security&logoColor=FFF" alt="Spring Security" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Hibernate-59666C?logo=Hibernate&logoColor=FFF" alt="Hibernate" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-JSON-000?logo=JSON&logoColor=FFF" alt="JSON" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-JWT-000?logo=JSON-Web-Tokens&logoColor=FFF" alt="JWT" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Java-F78C40?logo=OpenJDK&logoColor=FFF" alt="Java" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Python-A9A9A9?logo=Python&logoColor=3776AB" alt="Python" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Android-C0C0C0?logo=Android&logoColor=3DDC84" alt="Android" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Go-DCDCDC?logo=Go&logoColor=00ADD8" alt="Go" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-GraphQL-FFF?logo=GraphQL&logoColor=E10098" alt="GraphQL" style="display: inline-block;" /> 
</p>

#### 2.前端技术栈

<p>
  <img src="https://img.shields.io/badge/-Vue3-C0C0C0?logo=Vue.js&logoColor=4FC08D" alt="Vue3" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-TypeScript-C0C0C0?logo=TypeScript&logoColor=3178C6" alt="TypeScript" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Ant%20Design-C0C0C0?logo=Ant-Design&logoColor=0170FE" alt="Ant Design" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Node.js-D3D3D3?logo=Node.js&logoColor=339933" alt="Node.js" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Vite-D3D3D3?logo=Vite&logoColor=646CFF" alt="Vite" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Webpack-D3D3D3?logo=Webpack&logoColor=8DD6F9" alt="Webpack" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-NPM-C0C0C0?logo=npm&logoColor=CB3837" alt="NPM" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Axios-C0C0C0?logo=Axios&logoColor=5A29E4" alt="Axios" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-ESLint-C0C0C0?logo=ESLint&logoColor=4B32C3" alt="ESLint" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-jQuery-0769AD?logo=jQuery&logoColor=FFF" alt="jQuery" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Bootstrap-7952B3?logo=Bootstrap&logoColor=FFF" alt="BootStrap" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-ECharts-C0C0C0?logo=Apache-ECharts&logoColor=AA344D" alt="ECharts" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-JavaScript-A9A9A9?logo=JavaScript&logoColor=F7DF1E" alt="JavaScript" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-HTML5-A9A9A9?logo=HTML5&logoColor=E34F26" alt="HTML5" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-CSS3-A9A9A9?logo=CSS3&logoColor=1572B6" alt="CSS3" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Tailwind%20CSS-FFF?logo=Tailwind-CSS&logoColor=06B6D4" alt="Tailwind CSS" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Less-D3D3D3?logo=Less&logoColor=1D365D" alt="Less" style="display: inline-block;" /> 
</p>

#### 3.DevOps

<p>
  <img src="https://img.shields.io/badge/-Git-F05032?logo=Git&logoColor=FFF" alt="Git" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-GitHub-181717?logo=GitHub&logoColor=FFF" alt="GitHub" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Gitee-C71D23?logo=Gitee&logoColor=FFF" alt="Gitee" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-GitLab-FC6D26?logo=GitLab&logoColor=FFF" alt="gitlab" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-GitHub%20Actions-2088FF?logo=GitHub-Actions&logoColor=FFF" alt="GitHub Actions" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Jenkins-D24939?logo=Jenkins&logoColor=000" alt="Jenkins" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-SonarQube-A9A9A9?logo=SonarQube&logoColor=4E9BCD" alt="SonarQube" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Docker-2496ED?logo=Docker&logoColor=FFF" alt="Docker" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Harbor-FFF?logo=Harbor&logoColor=60B932" alt="Harbor" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Kubernetes-326CE5?logo=Kubernetes&logoColor=FFF" alt="Kubernetes" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-CentOS-262577?logo=CentOS&logoColor=FFF" alt="CentOS" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Ubuntu-E95420?logo=Ubuntu&logoColor=FFF" alt="Ubuntu" style="display: inline-block;" /> 
</p>

#### 4.运维技术栈

<p>
  <img src="https://img.shields.io/badge/-阿里云-FF6A00?logo=Alibaba-Cloud&logoColor=FFF" alt="阿里云" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Nginx-009639?logo=Nginx&logoColor=FFF" alt="Nginx" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-VMware-607078?logo=VMware&logoColor=FFF" alt="VMware" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Prometheus-C0C0C0?logo=Prometheus&logoColor=E6522C" alt="Prometheus" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Grafana-DCDCDC?logo=Grafana&logoColor=F46800" alt="Grafana" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Ansible-FFF?logo=Ansible&logoColor=EE0000" alt="Ansible" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Lua-FFF?&logo=Lua&logoColor=2C2D72" alt="Lua" style="display: inline-block;" /> 
</p>

#### 5.测试技术栈

<p>
  <img src="https://img.shields.io/badge/-Postman-FF6C37?logo=Postman&logoColor=FFF" alt="Postman" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-JMeter-D3D3D3?logo=Apache-JMeter&logoColor=D22128" alt="JMeter" style="display: inline-block;" /> 
</p>

#### 6.开发工具

<p>
  <img src="https://img.shields.io/badge/-Intellij%20IDEA-000?logo=Intellij-IDEA&logoColor=FFF" alt="Intellij IDEA" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Eclipse-2C2255?logo=Eclipse&logoColor=FFF" alt="Eclipse" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-WebStorm-000?logo=WebStorm&logoColor=FFF" alt="WebStorm" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-PyCharm-C0C0C0?logo=PyCharm&logoColor=000" alt="PyCharm" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Android%20Studio-C0C0C0?logo=Android-Studio&logoColor=3DDC84" alt="Android Studio" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-VSCode-C0C0C0?logo=Visual-Studio-Code&logoColor=007ACC" alt="VSCode" style="display: inline-block;" /> 
</p>

#### 7.其他

<p>
  <img src="https://img.shields.io/badge/-Markdown-000?logo=Markdown&logoColor=FFF" alt="Markdown" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-WordPress-21759B?logo=WordPress&logoColor=FFF" alt="WordPress" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-GitHub%20Pages-222?logo=GitHub-Pages&logoColor=FFF" alt="GitHub Pages" style="display: inline-block;" /> 
  <img src="https://img.shields.io/badge/-Adobe%20Photoshop-A9A9A9?logo=Adobe-Photoshop&logoColor=31A8FF" alt="Adobe Photoshop" style="display: inline-block;" /> 
</p>