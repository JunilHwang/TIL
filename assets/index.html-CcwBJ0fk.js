import{_ as e,r as p,o as l,c as o,a as s,b as n,d as t,e as c}from"./app-DvMpbwcb.js";const i="/TIL/assets/8-D2Xo-sOp.jpg",u={},r=s("h1",{id:"vuepress-utterances",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#vuepress-utterances"},[s("span",null,"Vuepress + Utterances")])],-1),d=s("p",null,"Vuepress에 Utterances(GitHub Issue를 이용한 댓글)를 적용하는 방법에 대해 기술합니다.",-1),k=s("h2",{id:"_1-utterances-install",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_1-utterances-install"},[s("span",null,"1. Utterances Install")])],-1),m={href:"https://utteranc.es/",target:"_blank",rel:"noopener noreferrer"},g=s("strong",null,"GitHub Issue 기반",-1),v=s("p",null,[n("기존에 워드프레스로 만든 나의 개인 사이트는 "),s("code",null,"Disqus"),n("를 이용하여 댓글을 관리하고 있는데, 개인적으로 Disqus보단 Utterances가 더 좋은 것 같다.")],-1),h=s("p",null,"Utterances를 사용하는 방법은 매우 간단하다. 사실 공식 사이트에 있는 내용을 그대로 따라하면 된다.",-1),b=s("h3",{id:"repository",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#repository"},[s("span",null,"Repository")])],-1),_={href:"https://github.com/JunilHwang/blog-comment",target:"_blank",rel:"noopener noreferrer"},f=s("code",null,"Utterances App",-1),q={href:"https://github.com/apps/utterances",target:"_blank",rel:"noopener noreferrer"},y=c(`<p>그 다음에 이 <code>script tag</code>를 적용할 page에 붙이면 된다.</p><div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span></span>
<span class="line">  <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>https://utteranc.es/client.js<span class="token punctuation">&quot;</span></span></span>
<span class="line highlighted">  <span class="token attr-name">repo</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>junilhwang/blog-comment<span class="token punctuation">&quot;</span></span> <span class="token attr-name">&lt;!--</span> <span class="token attr-name">댓글(Comment)로</span> <span class="token attr-name">사용할</span> <span class="token attr-name">Repository</span> <span class="token attr-name">--</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line">  <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span></span>
<span class="line highlighted">    댓글 등록시 Issue가 등록되는데<span class="token punctuation">,</span> 이 때 등록될 Issue의 title 형태</span>
<span class="line highlighted">    pathname<span class="token operator">|</span>title<span class="token operator">|</span>og<span class="token operator">:</span>title<span class="token operator">|</span>url 중 택 <span class="token number">1</span></span>
<span class="line">  <span class="token operator">--</span><span class="token operator">&gt;</span></span>
<span class="line">  issue<span class="token operator">-</span>term<span class="token operator">=</span><span class="token string">&quot;pathname&quot;</span></span>
<span class="line">  theme<span class="token operator">=</span><span class="token string">&quot;github-light&quot;</span> <span class="token operator">&lt;</span><span class="token operator">!</span><span class="token operator">--</span> 적용할 테마 <span class="token operator">--</span><span class="token operator">&gt;</span></span>
<span class="line">  crossorigin<span class="token operator">=</span><span class="token string">&quot;anonymous&quot;</span></span>
<span class="line">  async<span class="token operator">&gt;</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>그런데 문제는 Vuepress Post에 직접적으로 script tag를 추가할 수 없다는 것이다</strong></p><h2 id="_2-vuepress에-적용하기" tabindex="-1"><a class="header-anchor" href="#_2-vuepress에-적용하기"><span>2. VuePress에 적용하기</span></a></h2><p><code>global-components</code>를 이용하면 VuePress에 Utterances를 적용할 수 있다.</p><p>일단 <code>.vuepress/theme/Comment.vue</code> 파일을 만들고, 다음과 같이 입력하자.</p><div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>comment<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// script tag 생성</span></span>
<span class="line">    <span class="token keyword">const</span> utterances <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">&#39;script&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    utterances<span class="token punctuation">.</span>type <span class="token operator">=</span> <span class="token string">&#39;text/javascript&#39;</span><span class="token punctuation">;</span></span>
<span class="line">    utterances<span class="token punctuation">.</span>async <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span></span>
<span class="line">    utterances<span class="token punctuation">.</span>crossorigin <span class="token operator">=</span> <span class="token string">&#39;anonymous&#39;</span><span class="token punctuation">;</span></span>
<span class="line">    utterances<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">&#39;https://utteranc.es/client.js&#39;</span><span class="token punctuation">;</span></span>
<span class="line">    </span>
<span class="line highlighted">    utterances<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;issue-term&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;pathname&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// pathname|url|title|og:title 중 택 1</span></span>
<span class="line highlighted">    utterances<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;theme&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;github-light&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// theme 설정</span></span>
<span class="line highlighted">    utterances<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span><span class="token string">&#39;repo&#39;</span><span class="token punctuation">,</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">junilhwang/blog-comment</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 사용할 repository</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// script tag 삽입</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>$refs<span class="token punctuation">.</span>comment<span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>utterances<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>그런데 <code>global-components</code>는 <strong>theme에서 사용하는 기능</strong>이기 때문에 theme에 따라 적용 방법이 다르다.</p><h3 id="현재-theme에-extend하여-적용하기" tabindex="-1"><a class="header-anchor" href="#현재-theme에-extend하여-적용하기"><span>현재 Theme에 Extend하여 적용하기</span></a></h3><p>theme를 custom 하지 않았다면, 즉, default theme를 그대로 사용중이라면 default theme를 extend 해서 적용하면 된다.</p><p>먼저 <code>.vuepress/theme/index.js</code> 파일을 만들어야 한다.</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line"><span class="token comment">// .vuepress/theme/index.js</span></span>
<span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">extend</span><span class="token operator">:</span> <span class="token string">&#39;@vuepress/theme-default&#39;</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">globalLayout</span><span class="token operator">:</span> <span class="token string">&#39;/layouts/GlobalLayout&#39;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>그리고 <code>.vuepress/layouts/GlobalLayout.vue</code> 에 다음과 같이 입력하면 된다.</p><div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>global-layout<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>$page.path ? &#39;Layout&#39; : &#39;NotFound&#39;<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Comment</span> <span class="token punctuation">/&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>여기서 <code>&lt;Comment /&gt;</code>는 <code>global-components</code> 에서 저절로 가져와진다.</p><p>그러면 이런식으로 적용된다.</p><p><img src="`+i+`" alt="Utterances"></p><h3 id="직접-만든-theme에-적용하기" tabindex="-1"><a class="header-anchor" href="#직접-만든-theme에-적용하기"><span>직접 만든 Theme에 적용하기</span></a></h3><p>Theme를 직접 만들었다면 <code>.vuepress/theme/layouts/Layout.vue</code>에서 원하는 부분에 <code>&lt;Comment /&gt;</code>를 삽입하면 된다.</p><p>필자의 경우엔 다음과 같이 했다.</p><div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">...</span><span class="token punctuation">&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Home</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>$page.frontmatter.home<span class="token punctuation">&quot;</span></span><span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Page</span> <span class="token attr-name">v-else</span> <span class="token attr-name">:sidebar-items</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>sidebarItems<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span></span>
<span class="line highlighted">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Comment</span> <span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Navbar</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>shouldShowNavbar<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@toggle-sidebar</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>toggleSidebar<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>sidebar-mask<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>toggleSidebar(false)<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Sidebar</span> <span class="token attr-name">...</span> <span class="token punctuation">/&gt;</span></span></span>
<span class="line">    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Footer</span> <span class="token punctuation">/&gt;</span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript"></span>
<span class="line"><span class="token comment">// 생략</span></span>
<span class="line"></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>이렇게 말 그대로 <strong>원하는 위치</strong>에 <code>&lt;Comment /&gt;</code>를 넣어주기만 하면 된다.</p><h3 id="md-파일에-직접-넣기" tabindex="-1"><a class="header-anchor" href="#md-파일에-직접-넣기"><span>md 파일에 직접 넣기</span></a></h3><p>VuePress에서는 <code>*.md</code> 파일에 있는 <code>VueComponent</code>를 <strong>html로 변환</strong>하여 출력한다.</p><p>그래서 그냥 markdown에 <code>&lt;Comment /&gt;</code>를 그대로 사용해도 된다.</p><div class="language-markdown line-numbers-mode" data-highlighter="prismjs" data-ext="md" data-title="md"><pre><code><span class="line"><span class="token title important"><span class="token punctuation">#</span> Utterances</span></span>
<span class="line"></span>
<span class="line">github issue를 comment로 사용하기</span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>Comment</span> <span class="token punctuation">/&gt;</span></span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference"><span>Reference</span></a></h2>`,27),x={href:"https://utteranc.es/",target:"_blank",rel:"noopener noreferrer"},j={href:"https://vuepress.vuejs.org/guide/using-vue.html",target:"_blank",rel:"noopener noreferrer"},U={href:"https://vuepress.vuejs.org/theme/writing-a-theme.html#directory-structure",target:"_blank",rel:"noopener noreferrer"},V={href:"https://vuepress.vuejs.org/theme/option-api.html#globallayout",target:"_blank",rel:"noopener noreferrer"};function C(w,I){const a=p("ExternalLinkIcon");return l(),o("div",null,[r,d,k,s("p",null,[s("a",m,[n("Utterances"),t(a)]),n("는 "),g,n("으로 댓글(Comment)를 작성할 수 있게 해주는 플러그인이다.")]),v,h,b,s("p",null,[n("먼저 GitHub에 Public Repository를 만들어야 한다. 필자는 "),s("a",_,[n("blog-comment"),t(a)]),n(" 라는 이름으로 만들었다.")]),s("p",null,[n("그리고 해당 Repository에 "),f,n("을 설치해야한다. "),s("a",q,[n("이 링크"),t(a)]),n("에서 설치하면 된다.")]),y,s("ul",null,[s("li",null,[s("a",x,[n("Utterances 공식문서"),t(a)])]),s("li",null,[s("a",j,[n("Using Vue in Markdown"),t(a)])]),s("li",null,[s("a",U,[n("Vuepress Theme Write"),t(a)])]),s("li",null,[s("a",V,[n("Vuepress Global Layouts"),t(a)])])])])}const L=e(u,[["render",C],["__file","index.html.vue"]]),R=JSON.parse('{"path":"/vuepress/Utterances/","title":"Vuepress + Utterances","lang":"en-US","frontmatter":{"title":"Vuepress + Utterances","description":"Vuepress에 Utterances(GitHub Issue를 이용한 댓글)를 적용하는 방법에 대해 기술합니다.","sidebarDepth":2,"date":"2020-01-07T00:00:00.000Z","tag":"vuepress"},"headers":[{"level":2,"title":"1. Utterances Install","slug":"_1-utterances-install","link":"#_1-utterances-install","children":[{"level":3,"title":"Repository","slug":"repository","link":"#repository","children":[]}]},{"level":2,"title":"2. VuePress에 적용하기","slug":"_2-vuepress에-적용하기","link":"#_2-vuepress에-적용하기","children":[{"level":3,"title":"현재 Theme에 Extend하여 적용하기","slug":"현재-theme에-extend하여-적용하기","link":"#현재-theme에-extend하여-적용하기","children":[]},{"level":3,"title":"직접 만든 Theme에 적용하기","slug":"직접-만든-theme에-적용하기","link":"#직접-만든-theme에-적용하기","children":[]},{"level":3,"title":"md 파일에 직접 넣기","slug":"md-파일에-직접-넣기","link":"#md-파일에-직접-넣기","children":[]}]},{"level":2,"title":"Reference","slug":"reference","link":"#reference","children":[]}],"git":{"updatedTime":1725358975000},"filePathRelative":"vuepress/Utterances/README.md"}');export{L as comp,R as data};