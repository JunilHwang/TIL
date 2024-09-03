import{_ as i,r as t,o as p,c,a as s,b as n,d as e,e as l}from"./app-DvMpbwcb.js";const o={},r=s("h1",{id:"github-page에-배포하기",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#github-page에-배포하기"},[s("span",null,"github page에 배포하기")])],-1),d=s("p",null,"Vuepress로 만든 문서를 github page에 배포하는 방법에 대해 기록한 문서이다.",-1),u=s("h2",{id:"_1-배포-과정-이해하기",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_1-배포-과정-이해하기"},[s("span",null,"1. 배포 과정 이해하기")])],-1),m=s("p",null,[n("먼저 "),s("code",null,"deploy.sh"),n(" 를 작성해야 한다. 이 스크립트가 하는 일은 다음과 같다.")],-1),v=s("li",null,"문서 빌드",-1),h=s("li",null,"빌드된 문서를 git init -> add -> commit",-1),b=l("<li><code>https://&lt;user&gt;.github.com/</code> 에 배포하고 싶다면, <ul><li>repository: <code>&lt;user&gt;.github.com</code></li><li>branch: <code>master</code></li></ul></li><li><code>https://&lt;user&gt;.github.com/&lt;repo&gt;</code> 에 배포하고 싶다면, <ul><li>repository: <code>&lt;repo&gt;</code></li><li>branch: <code>gh-pages</code></li></ul></li>",2),g={href:"http://dogfeet.github.io/articles/2012/github-pages.html",target:"_blank",rel:"noopener noreferrer"},k=l(`<p>이 때 <code>package.json의 npm script</code>와 <code>deploy.sh의 위치</code>가 중요하기 때문에 프로젝트 폴더 구조에 따라 작성하는 방법이 다르다.</p><h2 id="_2-프로젝트가-root-기준일-때" tabindex="-1"><a class="header-anchor" href="#_2-프로젝트가-root-기준일-때"><span>2. 프로젝트가 root 기준일 때</span></a></h2><p>폴더 구조가 다음과 같다면</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">.(VuepressProject)</span>
<span class="line">├─ node_modules</span>
<span class="line">├─ package.json</span>
<span class="line highlighted">├─ .vuepress</span>
<span class="line">└─ deploy.sh </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>일단 <code>package.json</code>의 <code>npm scripts</code>는 아래 처럼 작성해야 한다.</p><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  ... <span class="token comment">// 앞 내용 생략</span></span>
<span class="line">  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line highlighted">    <span class="token property">&quot;docs:dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress dev&quot;</span><span class="token punctuation">,</span></span>
<span class="line highlighted">    <span class="token property">&quot;docs:build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress build&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  ... <span class="token comment">// 뒷 내용 생략</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>deploy.sh</code>는 이렇게 작성해야 한다.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token shebang important">#!/usr/bin/env sh</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 오류 발생시 중단한다.</span></span>
<span class="line"><span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 문서(md)를 build하여 html로 만든다. </span></span>
<span class="line"><span class="token function">yarn</span> docs:build</span>
<span class="line"></span>
<span class="line"><span class="token comment"># build가 output된 폴더로 이동한다. </span></span>
<span class="line highlighted"><span class="token builtin class-name">cd</span> .vuepress/dist</span>
<span class="line"></span>
<span class="line"><span class="token comment"># init + add + commit을 해준 다음</span></span>
<span class="line"><span class="token function">git</span> init</span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&#39;deploy&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># https://&lt;USERNAME&gt;.github.io 에 배포하는 경우</span></span>
<span class="line"><span class="token comment"># git push -f https://github.com/&lt;USERNAME&gt;/&lt;USERNAME&gt;.github.io.git master</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt; 에 배포하는 경우</span></span>
<span class="line"><span class="token comment"># git push -f https://github.com/&lt;USERNAME&gt;/&lt;REPO&gt;.git master:gh-pages</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 필자의 경우 TIL repository에 배포하기 때문에 아래와 같이 작성했다.</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-f</span> https://github.com/JunilHwang/TIL.git master:gh-pages</span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">cd</span> -</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-vuepress가-root-docs-기준일-때" tabindex="-1"><a class="header-anchor" href="#_3-vuepress가-root-docs-기준일-때"><span>3. vuepress가 root/docs 기준일 때</span></a></h2><p>폴더 구조가 다음과 같다면</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">.(VuepressProject)</span>
<span class="line">├─ node_modules</span>
<span class="line">├─ package.json</span>
<span class="line highlighted">├─ docs</span>
<span class="line highlighted">│   └─ .vuepress</span>
<span class="line">└─ deploy.sh </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>package.json에서 <code>vuepress cli</code>에 <code>docs</code>를 붙여야한다.</p><div class="language-json line-numbers-mode" data-highlighter="prismjs" data-ext="json" data-title="json"><pre><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  ... <span class="token comment">// 앞 내용 생략</span></span>
<span class="line">  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line highlighted">    <span class="token property">&quot;docs:dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress dev docs&quot;</span><span class="token punctuation">,</span></span>
<span class="line highlighted">    <span class="token property">&quot;docs:build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress build docs&quot;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">,</span></span>
<span class="line">  ... <span class="token comment">// 뒷 내용 생략</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>deploy.sh</code>는 이렇게 작성해야 한다.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token shebang important">#!/usr/bin/env sh</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 오류 발생시 중단한다.</span></span>
<span class="line"><span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 문서(md)를 build하여 html로 만든다. </span></span>
<span class="line"><span class="token function">yarn</span> docs:build</span>
<span class="line"></span>
<span class="line"><span class="token comment"># build가 output된 폴더로 이동한다. </span></span>
<span class="line highlighted"><span class="token builtin class-name">cd</span> docs/.vuepress/dist</span>
<span class="line"></span>
<span class="line"><span class="token comment"># init + add + commit을 해준 다음</span></span>
<span class="line"><span class="token function">git</span> init</span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&#39;deploy&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># https://&lt;USERNAME&gt;.github.io 에 배포하는 경우</span></span>
<span class="line"><span class="token comment"># git push -f https://github.com/&lt;USERNAME&gt;/&lt;USERNAME&gt;.github.io.git master</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt; 에 배포하는 경우</span></span>
<span class="line"><span class="token comment"># git push -f https://github.com/&lt;USERNAME&gt;/&lt;REPO&gt;.git master:gh-pages</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 필자의 경우 TIL repository에 배포하기 때문에 아래와 같이 작성했다.</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-f</span> https://github.com/JunilHwang/TIL.git master:gh-pages</span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">cd</span> -</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>물론 위의 두 가지 경우 말고도 다양한 프로젝트 구조가 있을 수 있다.</p><p>중요한 것은 <strong>deploy.sh가 정확하게 build된 폴더로 이동하여 github에 push할 수 있어야 한다는 점</strong>이다.</p><h2 id="_4-shell-script-실행하기" tabindex="-1"><a class="header-anchor" href="#_4-shell-script-실행하기"><span>4. Shell Script 실행하기</span></a></h2><p>처음 vuepress를 github pages에 배포할 때 push만 하면 deploy.sh를 자동으로 실행하는 줄 알았다(?)</p><p>그건 나의 희망사항 이였고, <code>deploy.sh는 직접 실행</code>해야 한다.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">sh</span> deploy.sh</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><ul><li><strong>window</strong> : <code>git bash</code> 를 통해서 실행하면 된다.</li><li><strong>mac</strong> : <code>terminal</code> 에서 실행하면 된다.</li></ul><h2 id="_5-자동으로-배포하기" tabindex="-1"><a class="header-anchor" href="#_5-자동으로-배포하기"><span>5. 자동으로 배포하기</span></a></h2><p>자동으로 배포하는 방법은 다양하다. <s>하지만 난 수동으로 할래!</s></p>`,24),_={href:"https://docs.travis-ci.com/user/deployment/pages/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://netlify.com/",target:"_blank",rel:"noopener noreferrer"},E={href:"https://www.npmjs.com/package/firebase-tools",target:"_blank",rel:"noopener noreferrer"},y={href:"https://www.npmjs.com/package/surge",target:"_blank",rel:"noopener noreferrer"},x={href:"https://devcenter.heroku.com/articles/heroku-cli",target:"_blank",rel:"noopener noreferrer"},j={href:"https://zeit.co/examples/vuepress/",target:"_blank",rel:"noopener noreferrer"},R={href:"https://vuepress.vuejs.org/guide/deploy.html",target:"_blank",rel:"noopener noreferrer"},q=l(`<h2 id="_6-gh-pages-branch-에-commit-기록-남기기" tabindex="-1"><a class="header-anchor" href="#_6-gh-pages-branch-에-commit-기록-남기기"><span>6. gh-pages branch 에 commit 기록 남기기</span></a></h2><p>배포를 성공하는 것 까진 좋았다. 그런데 gh-pages에는 항상 commit 기록이 1개만 남아있는 상태가 유지된다. 이 때 <code>deploy.sh</code>의 내용을 조금 손보면 된다.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token shebang important">#!/usr/bin/env sh</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 오류 발생시 중단한다.</span></span>
<span class="line"><span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 문서(md)를 build하여 html로 만든다. </span></span>
<span class="line"><span class="token function">yarn</span> docs:build</span>
<span class="line"></span>
<span class="line"><span class="token comment"># build가 output된 폴더로 이동한다. </span></span>
<span class="line"><span class="token builtin class-name">cd</span> docs/.vuepress/dist</span>
<span class="line"></span>
<span class="line"><span class="token comment"># https://&lt;USERNAME&gt;.github.io 에 배포하는 경우</span></span>
<span class="line"><span class="token comment"># git clone https://github.com/&lt;USERNAME&gt;/&lt;USERNAME&gt;.github.io/</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt; 에 배포하는 경우</span></span>
<span class="line"><span class="token comment"># 필자는 이 경우에 해당한다.</span></span>
<span class="line"><span class="token function">git</span> clone <span class="token parameter variable">-b</span> gh-pages https://github.com/<span class="token operator">&lt;</span>USERNAME<span class="token operator">&gt;</span>/<span class="token operator">&lt;</span>REPO<span class="token operator">&gt;</span>/</span>
<span class="line"></span>
<span class="line"><span class="token comment"># .git의 내용을 복사한 후 clone은 삭제한다.</span></span>
<span class="line"><span class="token function">cp</span> <span class="token parameter variable">-rf</span> TIL/.git ./.git</span>
<span class="line"><span class="token function">rm</span> <span class="token parameter variable">-rf</span> TIL</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 이제 add + commit + push를 차례대로 실행해주면 끝</span></span>
<span class="line"><span class="token comment"># $1은 문자열 인자</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&#39;$1&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt; 에 배포하는 경우</span></span>
<span class="line"><span class="token comment"># git push origin master</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt; 에 배포하는 경우</span></span>
<span class="line"><span class="token comment"># 필자는 이 경우에 해당한다.</span></span>
<span class="line"><span class="token function">git</span> push origin gh-pages</span>
<span class="line"></span>
<span class="line"><span class="token builtin class-name">cd</span> -</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>이렇게 작성된 <code>deploy.sh</code>은 다음과 같이 사용하면 된다.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">sh</span> deploy.sh <span class="token string">&quot;커밋 메세지&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p><code>문서 commit + deploy까지 같이 자동화</code> 하고 싶다면 또 새로운 shell scripts를 작성하면 된다.</p><p>파일명은 대충 <code>commit.sh</code> 이라고 지었다.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token shebang important">#!/usr/bin/env sh</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># abort on errors</span></span>
<span class="line"><span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span></span>
<span class="line"></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span></span>
<span class="line"><span class="token function">git</span> push origin master</span>
<span class="line"></span>
<span class="line"><span class="token function">sh</span> deploy.sh <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>사용 방법은 다음과 같다.</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token function">sh</span> commit.sh <span class="token string">&quot;커밋 메세지&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>이러면 문서도 commit해주고 같은 commit message로 배포까지 완료해준다.</p><h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference"><span>Reference</span></a></h2>`,12),A={href:"http://dogfeet.github.io/articles/2012/github-pages.html",target:"_blank",rel:"noopener noreferrer"},S={href:"https://vuepress.vuejs.org/guide/deploy.html",target:"_blank",rel:"noopener noreferrer"},N={href:"https://joshua1988.github.io/vue-camp/vuepress/learning-note.html#%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%B0%B0%ED%8F%AC-%ED%95%98%EA%B8%B0-%EC%A0%88%EC%B0%A8",target:"_blank",rel:"noopener noreferrer"};function M(U,P){const a=t("ExternalLinkIcon");return p(),c("div",null,[r,d,u,m,s("ol",null,[v,h,s("li",null,[n("github에 push "),s("ul",null,[b,s("li",null,[n("참고링크 : "),s("a",g,[n("Github Pages 기능 이용하기"),e(a)])])])])]),k,s("ul",null,[s("li",null,[s("a",_,[n("Travis CI"),e(a)])]),s("li",null,[s("a",f,[n("Netlify"),e(a)])]),s("li",null,[s("a",E,[n("Google Firebase"),e(a)])]),s("li",null,[s("a",y,[n("Surge"),e(a)])]),s("li",null,[s("a",x,[n("Heroku CLI"),e(a)])]),s("li",null,[s("a",j,[n("Now"),e(a)])])]),s("p",null,[n("이 부분은 "),s("a",R,[n("공식문서"),e(a)]),n("를 참고하는걸로..")]),q,s("ul",null,[s("li",null,[s("a",A,[n("Github Pages 기능 이용하기"),e(a)])]),s("li",null,[s("a",S,[n("공식문서"),e(a)])]),s("li",null,[s("a",N,[n("Vuepress 사이트 배포하기 절차"),e(a)])])])])}const B=i(o,[["render",M],["__file","index.html.vue"]]),I=JSON.parse('{"path":"/vuepress/Deploy/","title":"github page에 배포하기","lang":"en-US","frontmatter":{"title":"github page에 배포하기","description":"Vuepress로 만든 문서를 github page에 배포하는 방법에 대해 기록한 문서이다.","sidebarDepth":2,"date":"2020-01-06T00:00:00.000Z","tag":"vuepress"},"headers":[{"level":2,"title":"1. 배포 과정 이해하기","slug":"_1-배포-과정-이해하기","link":"#_1-배포-과정-이해하기","children":[]},{"level":2,"title":"2. 프로젝트가 root 기준일 때","slug":"_2-프로젝트가-root-기준일-때","link":"#_2-프로젝트가-root-기준일-때","children":[]},{"level":2,"title":"3. vuepress가 root/docs 기준일 때","slug":"_3-vuepress가-root-docs-기준일-때","link":"#_3-vuepress가-root-docs-기준일-때","children":[]},{"level":2,"title":"4. Shell Script 실행하기","slug":"_4-shell-script-실행하기","link":"#_4-shell-script-실행하기","children":[]},{"level":2,"title":"5. 자동으로 배포하기","slug":"_5-자동으로-배포하기","link":"#_5-자동으로-배포하기","children":[]},{"level":2,"title":"6. gh-pages branch 에 commit 기록 남기기","slug":"_6-gh-pages-branch-에-commit-기록-남기기","link":"#_6-gh-pages-branch-에-commit-기록-남기기","children":[]},{"level":2,"title":"Reference","slug":"reference","link":"#reference","children":[]}],"git":{"updatedTime":1725358975000},"filePathRelative":"vuepress/Deploy/README.md"}');export{B as comp,I as data};
