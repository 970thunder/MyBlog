# Vue组件通信方式

- 父子组件之间的通信
- 兄弟组件之间的通信
- 祖孙与后代组件之间的通信
- 非关系组件间之间的通信

## props传递数据

通常用于父组件传递数据给子组件，子组件设置props属性，定义父组件可以传递过来的参数，父组件使用子组件标签中，通过字面量来传递值

`Chilfen.vue`

```js
props:{  
    // 字符串形式  
 name:String // 接收的类型参数  
    // 对象形式  
    age:{    
        type:Number, // 接收的类型为数值  
        defaule:18,  // 默认值为18  
       require:true // age属性必须传递  
    }  
}  
```

`Father.vue`

```
<Children name="jack" age=18 />  
```

##  $emit 触发自定义事件

使用场景：子组件传递数据给父组件

子组件通过$emit触发自定义事件，父组件通过绑定监听器获取传递过来的参数

`Chilfen.vue`

```js
this.$emit('add', good)  
```

`Father.vue`

```js
<Children @add="cartAdd($event)" />  
```

## ref

父组件在使用子组件时设置

```
<Children ref="foo" />  
  
this.$refs.foo  // 获取子组件实例，通过子组件实例我们就能拿到对应的数据  
```

此外还有很多方法：

##  EventBus

- 使用场景：兄弟组件传值
- 创建一个中央事件总线`EventBus`
- 兄弟组件通过`$emit`触发自定义事件，`$emit`第二个参数为传递的数值
- 另一个兄弟组件通过`$on`监听自定义事件

## `$parent` 或 `$root`

- 通过共同祖辈`$parent`或者`$root`搭建通信桥连

兄弟组件

```
this.$parent.on('add',this.add)
```

另一个兄弟组件

```
this.$parent.emit('add')
```

## `$attrs` 与`$listeners`

- 适用场景：祖先传递数据给子孙
- 设置批量向下传属性`$attrs`和 `$listeners`
- 包含了父级作用域中不作为 `prop` 被识别 (且获取) 的特性绑定 ( class 和 style 除外)。
- 可以通过 `v-bind="$attrs"` 传⼊内部组件

## provide 与 inject

- 在祖先组件定义`provide`属性，返回传递的值
- 在后代组件通过`inject`接收组件传递过来的值