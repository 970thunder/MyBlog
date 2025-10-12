# 论-后端返回前端框架代码后被错误DOM解析

## 前言

前端开发得及其失败，尝试了各种AI后得出的解决方案...

这一切就要从搭建前端组件UI网站说起：[思路来源于一个国外很大的UI社区-UIverse | Hyper的伊甸花园](https://blog.hyper99.top/Pward/前端的代码仓库.html)

## 问题来源

一个UI网站，肯定是得让别人复制你的代码，所见即所得，后端存储了HTML、CSS、Vue3、react、Svelte的代码，刚开始HTML和CSS一切正常。。。

![image-20251012185330102](https://yhyper.dpdns.org/photostore/2025/10/image-20251012185330102.png)

然后当我打开Vue等框架代码

迎面向我走来的是，一堆span标签（我擦，什么玩意就蹦出来了 (＃°Д°)  ）

![image-20251012185641689](https://yhyper.dpdns.org/photostore/2025/10/image-20251012185641689.png)

首先排除接口问题，因为接口已经正确返回了需要的数据，可以看到template之类的标签都很正常，而且，在获取数据时，点击copy复制，此时剪切板上，就是后端的框架代码，那就是前端解析出问题了

![image-20251012185730876](https://yhyper.dpdns.org/photostore/2025/10/image-20251012185730876.png)

我原本以为，是哪个函数获取错响应数据了，还做了乱七八糟的转义，以及一些正则的增强之类的无用功

```js
function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')    // & → &amp;
    .replace(/</g, '&lt;')     // < → &lt;
    .replace(/>/g, '&gt;');    // > → &gt;
}
```

后面经过我的专业团队Claude、GPT、Grok的大力协助下，还是直接用原有的方案，都是字符串，读就完了，纯文本显示，**零bug**

```vue
<transition name="code-modal">
  <div v-if="codeModalOpen" class="code-modal-overlay" @click.self="closeCodeModal">
    <div class="code-modal">
      <div class="code-modal-header">
        <div class="code-modal-title">
          <span class="fw-icon" v-html="frameworkIcon"></span>
          <span>{{ frameworkLabel }} Code</span>
        </div>
        <div class="code-modal-actions">
          <button class="btn small" @click="copyFrameworkCode">Copy</button>
          <button class="btn small outline" @click="closeCodeModal">Close</button>
        </div>
      </div>
      <!-- 原有的代码： --> // [!code --]
      <pre class="modal-code" v-html="highlightedFramework"></pre> // [!code --]
      <!-- 关键修改：用 {{ }} 纯文本显示，自动转义 < >，保留 \n 换行 --> // [!code ++]
      <pre class="modal-code">{{ frameworkCode }}</pre> // [!code ++]
    </div>
  </div>
</transition>
```

## 原理

```
Vue 的 {{ frameworkCode }} 自动转义 < → &lt;，> → &gt;，防止浏览器解析为 DOM（显示为 <template> 而非实际标签）。
<pre> 保留空格、换行、缩进 – 代码格式完美（如你的 vue_code 中的 \n 变成真实行）。
无 v-html、无高亮 – 直接显示后端字符串，简单可靠。
复制不受影响（仍用原始字符串）。
```

这样子就不会再出现span乱码，并且后续需要高光代码，贴上不同的标签颜色，直接引入集成库，替换highlightFramework的功能即可
OK一切正常。

![image-20251012192026436](https://yhyper.dpdns.org/photostore/2025/10/image-20251012192026436.png)

------

又又又是改bug的一天 (￣、￣)

距离UI网站上线倒计时3天