# Docker从入门到入土-学习笔记

linux安装docker

```
curl -fssL https://get.docker.com -o install-docker.sh
```

```
sudo sh install-docker.sh
```

## docker hub

docker官方仓库：[Docker Hub Container Image Library | App Containerization](https://hub.docker.com/)

直接pull，则是从官方仓库中拉取镜像

```
docker pull nginx
```

若出现网络错误则修改配置文件，终端输入

```
sudo vi /etc/docker/daemon.json
```

随后粘贴配置进文件中，按ESC键输入`:wq!`退出

```
{
	"registry-mirrors":[
		"https://docker.m.daocloud.io",
		"https://docker.1panel.live",
		"https://docker.xuanyuan.me",
		"https://hub.rat.dev"
	]
}
```

重启docker加载新配置

```
sudo service docker restart
```

## docker命令

### 安装部署

查看系统中下载的镜像 `sudo docker images`

删除ID为xxx的镜像 `sudo docker rmi IMAGE_ID`

运行镜像 `sudo docker run nginx `

`sudo docker run -d nginx`（不会阻塞当前终端控制台 ）

容器命名(唯一名字不能重复) `sudo docker run -d --name 容器名称 nginx`

只创建不运行 `sudo docker create -p 80:80 nginx`

------

查看容器进程状况 `sudo docker ps`（只能看到正在运行的容器）

查看所有的容器`sudo docker ps -a`

### 传递环境变量

使用-e参数可以传递环境变量，如下面启动数据库，则自动映射端口，并配置mongo数据库的用户名和密码

```
sudo docker run -d \
-p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=root \
-e MONGO_INITDB_ROOT_PASSWORD=123456 \
mongo
```

------

### 删除容器

删除容器 `sudo docker rm ID` /`sudo docker rm 容器名称`  若是正在运行的容器，需要强制删除 `sudo docker rm -f ID `

-it 让控制台进入容器，--rm容器运行停止后自动删除（常用于临时调试容器） `sudo docker run -it --rm nginx`

------

### 自动重启

容器自动重启 `sudo docker run -d --restart always nginx`

手动停止的容器不会自动重启，则使用 `sudo docker run -d --restart unless-stopped nginx`

::: tip

每次run都会创建一个新的容器，所以run并不是运行的意思，要想实现容器启停，看下面的命令

:::

启动ID为xxx的容器`sudo docker start ID`

停止容器 `sudo docker stop ID`

查看容器设置的参数 `sudo docker inspect ID`

------

### 日志进程

静态查看容器日志 `sudo docker logs ID`

动态查看容器日志 `sudo docker logs ID -f`

查看容器中的进程 `sudo docker exec ID ps -ef`



进入到容器内部执行linux命令，运行这行命令后，接下来所有的命令都是在容器中执行，而不是在宿主机`sudo docker exec it xxx /bin/bash`

## 端口映射

docker容器是在宿主机中隔离开，所以docker中的网络和宿主机隔离，外部正常情况下访问localhost:80是直接访问到宿主机，如果要访问容器内部网络中的内容，则要让容器和宿主机端口进行绑定

![image-20251221134916528](https://yhyper.dpdns.org/photostore/2025/12/image-20251221134916528.png)

绑定方式是先外后内，即宿主机:容器

```
sudo docker run -p 80:80
```

## 数据持久化保存

### 挂载卷 绑定挂载-宿主机目录：容器内目录

把宿主机与容器的文件目录进行绑定，容器内的文件修改会影响宿主机文件夹，内外的修改都会同步，也就是最常用的数据持久化存储（通常情况下不挂载，那么docker容器删除就会导致数据丢失）

代码与绑定端口类似

```
sudo docker run -p 80:80 -v /website/html:/usr/share/nginx/html nginx
```

这里以nginx网页的目录为例，绑定后宿主机目录会暂时覆盖掉容器的目录，此时宿主机目录为空，没有任何文件

当我们往宿主机/website/html文件夹中放入一个网页的代码，此时容器就同步加载了这个文件，主机中进入localhost:80，就能看到这个网页了

### 命名卷-创建存储空间

宿主机创建名为nginx_html的卷

```
sudo docker volume create nginx_html
```

绑定卷

```
sudo docker -p 80:80 -v nginx_html:/usr/share/nginx/html nginx
```

查看挂载卷在宿主机真实路径

```
sudo docker volume inspect 挂载卷名字
```

::: tip

与挂载卷不同的是，命名卷第一次使用时，容器内的文件会同步到卷中进行初始化，宿主机文件夹就不为空了

:::

查看命名卷 `sudo docker volume list`

删除命名卷 `sudo docker volume rm`

删除没有任何容器在使用的卷 `sudo docker volume prune -a`

## Dockerfile

### 编写文件

这是一个文件（一个模具），详细描述了镜像是如何创建的，接下来手搓一个镜像并推送到docker hub上

所有Dockerfile文件都没有后缀，并且第一行都是FROM，表示以xxx为基础镜像构建，基础镜像可以在网站上搜，需要带python或者node、java等环境，就选择对应的即可

![image-20251221144301427](https://yhyper.dpdns.org/photostore/2025/12/image-20251221144301427.png)

![image-20251221144013767](https://yhyper.dpdns.org/photostore/2025/12/image-20251221144013767.png)

`WORKDIR` 切换到镜像中的xx目录作为工作目录，后续的命令都在这个目录中运行（类似于cd）

`COPY` 两个点 ` . . ` ，第一个点表示这台电脑当前目录（Dockerfile所在的目录）第二个点表示上面WORKDIR设定的目录 `/app`

`RUN` 需要执行的命令

`EXPOSE` 声明镜像暴露服务的端口是多少，该值并不是强制，类似于一个参考的效果，实际使用还是参照 `-p` 的参数

`CMD` 容器运行时默认启动命令，一个Dockerfile只能有一行这个参数，并且数组中最好不要有空格，参考图中为nginx的启动命令，如果是python，则可以写 `CMD ["python","main.py"]`
`ENTRYPOINT` 与`CMD`类似，但优先级更高，不容易被覆盖

### 构建镜像

```
docker build -t 镜像名称 .
```

可以在名称后面冒号加版本号，最后一个点表示在当前文件夹进行构建

构建完成后可以进行运行，windows的话图形界面应该就显示了该镜像正在运行

```
docker run -d -p 80:80 镜像名称
```

![image-20251221154909424](https://yhyper.dpdns.org/photostore/2025/12/image-20251221154909424.png)

### 推送镜像

`docker login`登录后重新打包，打包时因为要推送上去，所以要添加一个自己的用户名，随后进行push即可

```
docker build -t 用户名/镜像名称 .
```

```
docker push 用户名/镜像名称
```

![image-20251221155956405](https://yhyper.dpdns.org/photostore/2025/12/image-20251221155956405.png)

## Docker网络

### 子网桥接

```
docker network create network1
```

docker可以创建子网，并让不同的容器进入到子网中，子网内的容器可以相互访问，不同子网的容器禁止访问，并且Dockers子网内部有DNS机制，子网中的各个容器可以用名称连接，无需通过IP访问

![image-20251221160154730](https://yhyper.dpdns.org/photostore/2025/12/image-20251221160154730.png)

### host模式

直接通过宿主机的IP和端口就能访问容器，直接使用内网，类似于本机部署，可以解决不少网络问题

```
sudo docker run -d --network host nginx
```

还有一种是none模式

### 相关命令

查看网络列表 `docker network list`

删除自定义子网 `docker network rm xxx`

## docker compose

容器编排技术，通过yml文件管理多个容器，列出容器间是如何创建，如何协同工作（可以理解为多个run，按特定格式列到一个文件里，可以自定义容器启动顺序），并且会为里面的容器自动创建一个子网

(创建)启动命令： `docker compose up -d`

停止命令： `docker compose stop`

启动命令： `docker compose start`

停止并删除容器： `docker compose down`

![image-20251221163543091](https://yhyper.dpdns.org/photostore/2025/12/image-20251221163543091.png)

::: tip

使用非标准名的docker-compose.yaml， `docker compose up -d`会无法识别，所以要指定文件运行需要使用 `docker compose -f /xxx/xxx/xxx.yaml up -d`

:::