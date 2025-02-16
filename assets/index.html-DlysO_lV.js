import{_ as i,r as t,o as p,c as r,a as n,b as s,d as a,e as l}from"./app-4sWi44zn.js";const c={},d=l(`<h1 id="markdown-it-plantuml" tabindex="-1"><a class="header-anchor" href="#markdown-it-plantuml"><span>markdown-it-plantuml</span></a></h1><p>최근에 사내 입문교육에서 <code>plantuml</code>을 접했고 관심이 생겨서 정리한 내용이다.</p><h2 id="_1-plantuml-소개" tabindex="-1"><a class="header-anchor" href="#_1-plantuml-소개"><span>1. Plantuml 소개</span></a></h2><p>plantuml은 <code>markdown에서 uml을 사용</code>할 수 있게 해주는 플러그인이다.</p><p>문법 또한 어렵지 않다.</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">@startuml</span>
<span class="line">Bob-&gt;Alice : hello</span>
<span class="line">@enduml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>그리고 위의 코드는 다음과 같이 UML형태의 SVG로 변환 된다.</p><img src="https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuNBAJzArSyp9J4vLi5B8ICt9oUToICrB0Ke10000" alt="uml diagram"><p>조금 더 응용하여 웹 서비스의 구조를 표현해보도록 하자.</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">@startuml</span>
<span class="line">actor User</span>
<span class="line">interface Client</span>
<span class="line">interface Server</span>
<span class="line">database MySQL</span>
<span class="line"></span>
<span class="line">User -&gt;&gt; Client : Event</span>
<span class="line">User &lt;&lt;- Client : HTML Document</span>
<span class="line">Client -&gt;&gt; Server : Http Request</span>
<span class="line">Server -&gt;&gt; Client : Http Response</span>
<span class="line">Server &lt;&lt;- MySQL : Data</span>
<span class="line">@enduml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://www.plantuml.com/plantuml/svg/LOz13e9034NtFKKlm0KC8IHYuW8MYXvW76f20ZCuxP1uUwSuHjs-ll_RrYmcI9mdC5Pym2jJWD49XRknXFjf92S_eAUm9cCmOcw62RjdVse1D8P5LUK0xl2mQd3ZPLby-V7IjTXu6sUTPwp9TxCQ8WkUwH691JBzgyu2BzunVGnTiXsJX2PT1pMv8Vtr0W00" alt="uml diagram">`,11),u={href:"https://www.umlet.com/",target:"_blank",rel:"noopener noreferrer"},o=l(`<p><img src="https://dispatch.cdnser.be/wp-content/uploads/2018/06/20180607225725_f.jpg" alt="아련.."></p><h2 id="_2-플러그인-설치" tabindex="-1"><a class="header-anchor" href="#_2-플러그인-설치"><span>2. 플러그인 설치</span></a></h2><p>본격적으로 Vuepress에서 plantuml을 사용할 수 있도록 플러그인을 설치해보자. vuepress는 기본적으로 <code>markdown-it</code>을 사용하고 있기 때문에 <code>markdown-it-plantuml</code>을 markdown-it에 extend 하면 된다.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># yarn을 사용할 경우</span></span>
<span class="line"><span class="token function">yarn</span> <span class="token function">add</span> markdown-it-plantuml</span>
<span class="line"></span>
<span class="line"><span class="token comment"># npm을 사용할 경우</span></span>
<span class="line"><span class="token function">npm</span> <span class="token function">install</span> markdown-it-plantuml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>설치가 완료 되었다면, <strong><code>.vuepress/config.js</code>에서 markdown에 plantuml을 extend</strong> 해보자.</p><div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre><code><span class="line">module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token operator">...</span> <span class="token comment">// 앞 내용 생략</span></span>
<span class="line">  <span class="token literal-property property">markdown</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function-variable function">extendMarkdown</span><span class="token operator">:</span> <span class="token parameter">md</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span></span>
<span class="line highlighted">      md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;markdown-it-plantuml&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token operator">...</span> <span class="token comment">// 뒷 내용 생략</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>이렇게 설정한 후에 plantuml을 사용하기만 하면 된다.</p><h2 id="_3-plantuml-응용하기" tabindex="-1"><a class="header-anchor" href="#_3-plantuml-응용하기"><span>3. plantuml 응용하기</span></a></h2><p>오늘(2020-01-06) 회사에서 진행중인 파일럿 프로젝트 문서에 사용한 plantuml의 일부다.</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">@startuml</span>
<span class="line">node &quot;Client&quot; {</span>
<span class="line">    agent Browser</span>
<span class="line">    node &quot;VueFramework&quot; {</span>
<span class="line">        (VueRouter)</span>
<span class="line">        [Components]</span>
<span class="line">        node &quot;VueStore&quot; {</span>
<span class="line">            [State]</span>
<span class="line">            [Mutations]</span>
<span class="line">            [Actions]</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line">Browser --&gt; VueRouter : URI</span>
<span class="line">Browser -&gt; Components : Event</span>
<span class="line">VueRouter --&gt; Components</span>
<span class="line">VueStore --&gt; Components</span>
<span class="line">State &lt;- Mutations</span>
<span class="line">State &lt;-- Actions</span>
<span class="line">Mutations &lt;- Actions</span>
<span class="line">@enduml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://www.plantuml.com/plantuml/svg/NP3B2i8m44Nt-OgXArta1qHAjIYuSDEY6-cYs46ADYDvs8Nqtvs-KjiiGdBkpN18P6okhQjUGb614CIl4fKDu2k0L_xW2-mrrGPrH_hMrU5HvnNMf9zZjrqh3X9o5lNQirjCrPiK3pAPXtvCQadZ_uZkIMfpYzcSdHt3afHPyDrzGHlHxuqOn47A4BmPRE2IdAOiX4cGiyE73s9gorb1ZCfBtXd3LeBNz4Z2e2XyrXP76A4g-Fz_" alt="uml diagram"><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">@startuml</span>
<span class="line">node &quot;Server&quot; {</span>
<span class="line">    node Helper {</span>
<span class="line">        package &quot;CrawlerPacakge&quot; {</span>
<span class="line">            node &quot;MusicCrawler&quot;</span>
<span class="line">            node &quot;NewsCrawler&quot;</span>
<span class="line">            node &quot;Crawler&quot; </span>
<span class="line">        }</span>
<span class="line">        node &quot;Youtube Search API&quot; as YSA</span>
<span class="line">    }</span>
<span class="line">    node &quot;REST API&quot; as REST {</span>
<span class="line">        node Service</span>
<span class="line">        node Repository</span>
<span class="line">        node RestController</span>
<span class="line">    }</span>
<span class="line">    database H2</span>
<span class="line">}</span>
<span class="line">RestController &lt;-- Service</span>
<span class="line">Service &lt;-- Repository</span>
<span class="line">Service &lt;- Helper</span>
<span class="line">Repository &lt;-&gt; H2</span>
<span class="line">Crawler &lt;|-- MusicCrawler</span>
<span class="line">Crawler &lt;|-- NewsCrawler</span>
<span class="line">@enduml</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://www.plantuml.com/plantuml/svg/VP4n3u8m48Nt_efBTnPdOY0kEcY8J8ndkIWHARaMYL7_kuLKA8dnbYRVUtUNUqsCHRRThHQDBWbaJdmdbl0Ku6faMwfROa-6Qb5TyUpC6yQ-9ivGuVLCCh1CpNBVcKfve_oX7wWtV-Il19Fs5aj7eJlRdGXoGbONIBET13HGvAcOxQDrkArID8CZjTfKLlCZPCPkT6DPrsxlo4kqU4BZabY9jrWQ88wYQR1_HnRCdh7FKioYW-jXhhyJufVh3JDRAa5Q8g6cT1_t0G00" alt="uml diagram"><p>plantuml만 있으면 설계문서는 매우 쉽게 작성할 수 있다.</p><h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference"><span>Reference</span></a></h2>`,15),m={href:"https://vuepress.vuejs.org/config/#markdown-extendmarkdown",target:"_blank",rel:"noopener noreferrer"},v={href:"https://plantuml.com/ko/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.npmjs.com/package/markdown-it-plantuml",target:"_blank",rel:"noopener noreferrer"};function h(k,g){const e=t("ExternalLinkIcon");return p(),r("div",null,[d,n("p",null,[s("이렇게 작성하고 보니 학부시절 "),n("a",u,[s("umlet"),a(e)]),s("으로 모든 도형을 하나하나 마우스로 그리고 배치하던게 주마등처럼 스쳐간다..")]),o,n("ul",null,[n("li",null,[n("a",m,[s("Markdown Extention 공식문서"),a(e)])]),n("li",null,[n("a",v,[s("Plantuml 공식 문서"),a(e)])]),n("li",null,[n("a",b,[s("markdown-it-plantuml"),a(e)])])])])}const _=i(c,[["render",h],["__file","index.html.vue"]]),f=JSON.parse('{"path":"/vuepress/Plantuml/","title":"markdown-it-plantuml","lang":"en-US","frontmatter":{"title":"markdown-it-plantuml","description":"plantuml은 markdown에서 uml을 사용할 수 있게 해주는 플러그인이다.","sidebarDepth":2,"date":"2020-01-07T00:00:00.000Z","tag":"vuepress"},"headers":[{"level":2,"title":"1. Plantuml 소개","slug":"_1-plantuml-소개","link":"#_1-plantuml-소개","children":[]},{"level":2,"title":"2. 플러그인 설치","slug":"_2-플러그인-설치","link":"#_2-플러그인-설치","children":[]},{"level":2,"title":"3. plantuml 응용하기","slug":"_3-plantuml-응용하기","link":"#_3-plantuml-응용하기","children":[]},{"level":2,"title":"Reference","slug":"reference","link":"#reference","children":[]}],"git":{"updatedTime":1739734884000},"filePathRelative":"vuepress/Plantuml/README.md"}');export{_ as comp,f as data};
