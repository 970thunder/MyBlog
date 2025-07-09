import{_ as t,C as l,c as h,o as e,j as p,G as n,ai as i,a as k}from"./chunks/framework.AcfKvvsR.js";const u=JSON.parse('{"title":"快排","description":"","frontmatter":{},"headers":[],"relativePath":"HRlog/algorithm.md","filePath":"HRlog/algorithm.md","lastUpdated":null}'),E={name:"HRlog/algorithm.md"};function d(r,s,c,g,y,o){const a=l("ArticleMetadata");return e(),h("div",null,[s[0]||(s[0]=p("h1",{id:"快排",tabindex:"-1"},[k("快排 "),p("a",{class:"header-anchor",href:"#快排","aria-label":'Permalink to "快排"'},"​")],-1)),n(a),s[1]||(s[1]=i(`<div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Partition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">[]</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,s,t){</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">s,j</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">t;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tmp </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[s];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	while</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">j){</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">		while</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(j</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;&amp;</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[j]</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tmp){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">			j</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">--</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		}</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">		a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[i] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[j];</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">		while</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">j</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">tmp){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">			i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">++</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		}</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">		a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[j] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[i];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	}</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">	a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[i] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> tmp;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">void</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Quick</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;"> a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">[]</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,s,t){</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	 if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(s</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">t){</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	 	int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Partition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(a,s,t);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	 	Quick</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(a,i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,t);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	 	Quick</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(a,s,i</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	 }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(){</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	int</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> n </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 9</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">[]</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">9</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">8</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	Quick</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(a,</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,n</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h1 id="最大子序列和" tabindex="-1">最大子序列和 <a class="header-anchor" href="#最大子序列和" aria-label="Permalink to &quot;最大子序列和&quot;">​</a></h1>`,2)),n(a),s[2]||(s[2]=i(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int MaxSum(int a[],int n){</span></span>
<span class="line"><span>	int i,j,k;</span></span>
<span class="line"><span>	int maxSum = 0,thisSum = 0;</span></span>
<span class="line"><span>	for(i=0;i&lt;n;i++){</span></span>
<span class="line"><span>		for(j=0;j&lt;n;j++){</span></span>
<span class="line"><span>			thisSum = 0;</span></span>
<span class="line"><span>			for(k=i,i&lt;=j,k++)</span></span>
<span class="line"><span>				thisSum+=a[k];</span></span>
<span class="line"><span>			if(thisSum&gt;=maxSum)</span></span>
<span class="line"><span>				maxSum = thisSum;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return maxSum;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void main(){</span></span>
<span class="line"><span>	int a[];</span></span>
<span class="line"><span>	n = sizeof(a)/sizeof(a[0]);</span></span>
<span class="line"><span>	MaxSum(a,n);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="最长公共子序列" tabindex="-1">最长公共子序列 <a class="header-anchor" href="#最长公共子序列" aria-label="Permalink to &quot;最长公共子序列&quot;">​</a></h1>`,2)),n(a),s[3]||(s[3]=i(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int m,n;</span></span>
<span class="line"><span>string a,b;</span></span>
<span class="line"><span>int dp[100][100];</span></span>
<span class="line"><span>char subs[];</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void LCS(){</span></span>
<span class="line"><span>	int i,j;</span></span>
<span class="line"><span>	for(i=0;i&lt;m;i++)</span></span>
<span class="line"><span>		dp[i][0] = 0;</span></span>
<span class="line"><span>	for(j=0;j&lt;n;j++)</span></span>
<span class="line"><span>		dp[0][j] = 0;</span></span>
<span class="line"><span>	for(i=1;i&lt;m;i++){</span></span>
<span class="line"><span>		for(j=1;j&lt;n;j++){</span></span>
<span class="line"><span>			if(a[i-1]==a[j-1]){</span></span>
<span class="line"><span>				dp[i][j] = dp[i-1][j-1]+1;</span></span>
<span class="line"><span>			}else{</span></span>
<span class="line"><span>				dp[i][j] = MAX(dp[i-1][j],dp[i][j-1]);</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void Buildsubs(){</span></span>
<span class="line"><span>	int i=m,j=n;</span></span>
<span class="line"><span>	int k=dp[i][j];</span></span>
<span class="line"><span>	while(k&gt;0){</span></span>
<span class="line"><span>		if(dp[i][j]==dp[i][j-1]){</span></span>
<span class="line"><span>			j--;</span></span>
<span class="line"><span>		}else if(dp[i][j]==dp[i-1][j]){</span></span>
<span class="line"><span>			i--;</span></span>
<span class="line"><span>		}else{</span></span>
<span class="line"><span>			subs = a[i-1]</span></span>
<span class="line"><span>			i--,j--,k--;</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int main(){</span></span>
<span class="line"><span>	a=&#39;abcbdb&#39;;</span></span>
<span class="line"><span>	b=&#39;acbbabdbb&#39;;</span></span>
<span class="line"><span>	n = sizeof(a)/sizeof(a[0]);</span></span>
<span class="line"><span>	m = sizeof(b)/sizeof(b[0]);</span></span>
<span class="line"><span>	LCS();</span></span>
<span class="line"><span>	Buildsubs();</span></span>
<span class="line"><span>	printf(&quot;%s&quot;,subs);</span></span>
<span class="line"><span>}</span></span></code></pre></div><h1 id="n皇后" tabindex="-1">n皇后 <a class="header-anchor" href="#n皇后" aria-label="Permalink to &quot;n皇后&quot;">​</a></h1>`,2)),n(a),s[4]||(s[4]=i(`<div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>棋子不能在同一行同一列同一对角线</span></span>
<span class="line"><span></span></span>
<span class="line"><span>bool place(int i){</span></span>
<span class="line"><span>	int j = 1;</span></span>
<span class="line"><span>	if(i==1) return true;	//若为第一个皇后，直接返回</span></span>
<span class="line"><span>	while(j&lt;i){</span></span>
<span class="line"><span>		//判断是否同列、通对角线</span></span>
<span class="line"><span>		if((q[j]==q[i])|| (abs(q[j]-q[i])==abs(j-i)))</span></span>
<span class="line"><span>			return false;</span></span>
<span class="line"><span>		j++;</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	return true;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void Queens(int n){</span></span>
<span class="line"><span>	int i=1;	//第1行开始，放第1个皇后</span></span>
<span class="line"><span>	q[i]=0;		//初始都从第0列开始放皇后</span></span>
<span class="line"><span>	while(i&gt;=1){	//当未回溯到第一个皇后时</span></span>
<span class="line"><span>		q[i]++;		//开始往后一列放置皇后</span></span>
<span class="line"><span>		//如果该未遍历超出棋盘，切位置不能放置</span></span>
<span class="line"><span>		while(q[i]&lt;=n &amp;&amp; !place(i))</span></span>
<span class="line"><span>			q[i]++；	//继续后移</span></span>
<span class="line"><span>		//如果能放置</span></span>
<span class="line"><span>		if(q[i]&lt;=n){</span></span>
<span class="line"><span>			if(i==n){	//如果遍历完最后一行，则输出当前能放入最多皇后的结果</span></span>
<span class="line"><span>				dispasolution（n）;</span></span>
<span class="line"><span>			}else{</span></span>
<span class="line"><span>				i++;</span></span>
<span class="line"><span>				q[i]=0;	//每个新皇后再次从0列开始</span></span>
<span class="line"><span>			}</span></span>
<span class="line"><span>		else i--;	//如果当前皇后找不到，回溯到上一个重新移动寻找位置</span></span>
<span class="line"><span>				</span></span>
<span class="line"><span>		}</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>void main(){</span></span>
<span class="line"><span>	int n;</span></span>
<span class="line"><span>	scanf(&quot;%d&quot;,&amp;n);</span></span>
<span class="line"><span>	Queens(n);</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,1))])}const A=t(E,[["render",d]]);export{u as __pageData,A as default};
