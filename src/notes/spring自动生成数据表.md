# spring自动生成数据表

```yaml
jpa:
  hibernate:
    ddl-auto: update
```

正常开发时可以设为update

开启后每次运行后端，都会先检测一遍实体类是否在数据库中存在，不存在的就直接创建新表，若是表存在，字段不存在，则自动新增字段，不会影响之前的数据

上线后把update改为none即可