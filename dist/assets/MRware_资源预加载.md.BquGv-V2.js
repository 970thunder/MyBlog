import{_ as e,C as p,c as l,o as i,j as n,G as r,aj as t,a as c}from"./chunks/framework.CsqNip8P.js";const y=JSON.parse('{"title":"资源预加载，提升用户体验","description":"","frontmatter":{},"headers":[],"relativePath":"MRware/资源预加载.md","filePath":"MRware/资源预加载.md","lastUpdated":null}'),o={name:"MRware/资源预加载.md"};function u(b,s,d,m,_,h){const a=p("ArticleMetadata");return i(),l("div",null,[s[0]||(s[0]=n("h1",{id:"资源预加载-提升用户体验",tabindex:"-1"},[c("资源预加载，提升用户体验 "),n("a",{class:"header-anchor",href:"#资源预加载-提升用户体验","aria-label":'Permalink to "资源预加载，提升用户体验"'},"​")],-1)),r(a),s[1]||(s[1]=t(`<p>三个思路 第一个思路通过鼠标悬浮，事件监听移动到的字段列，实现预加载</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import { useQueryClient } from &quot;@tanstack/react-query&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>const queryClient = useQueryClient();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>...some tsx...</span></span>
<span class="line"><span>&lt;li onMouseEnter={() =&gt; {</span></span>
<span class="line"><span>  queryClient.prefetchQuery({</span></span>
<span class="line"><span>      queryKey: [&quot;book&quot;, id],</span></span>
<span class="line"><span>      queryFn: () =&gt; fetchBookDetail(id),</span></span>
<span class="line"><span>      staleTime: 60 * 1000, //避免过于频繁的网络请求</span></span>
<span class="line"><span>    });</span></span>
<span class="line"><span>  }}</span></span>
<span class="line"><span>&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>从缓存中获取数据</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>const useBookDetail = (id: number) =&gt; {</span></span>
<span class="line"><span>  const queryClient = useQueryClient()</span></span>
<span class="line"><span>  return useQuery({</span></span>
<span class="line"><span>    queryKey: [&#39;book&#39;, id],</span></span>
<span class="line"><span>    queryFn: () =&gt; fetchBookDetail(id),</span></span>
<span class="line"><span>    initialData: () =&gt; {</span></span>
<span class="line"><span>      const cache = queryClient.getQueryData&lt;Book&gt;([&#39;bookDetail&#39;, id])</span></span>
<span class="line"><span>      return cache</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>  })</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>第二个思路监听当前页面，预加载下一页数据</p><p>第三个渐进式渲染，先渲染已知元素，即之前页面存在的元素（首页）和跳转的页面（详情页）存在重复的部分，重复的内容可以直接渲染， 不需要等待</p>`,6))])}const k=e(o,[["render",u]]);export{y as __pageData,k as default};
