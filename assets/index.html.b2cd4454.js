import{_ as l,r as t,o,c,a as s,b as i,d as n,e as a}from"./app.c46c2507.js";const d={},r=s("h1",{id:"github-page\u110B\u1166-\u1107\u1162\u1111\u1169\u1112\u1161\u1100\u1175",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#github-page\u110B\u1166-\u1107\u1162\u1111\u1169\u1112\u1161\u1100\u1175","aria-hidden":"true"},"#"),n(" github page\uC5D0 \uBC30\uD3EC\uD558\uAE30")],-1),p=s("p",null,"Vuepress\uB85C \uB9CC\uB4E0 \uBB38\uC11C\uB97C github page\uC5D0 \uBC30\uD3EC\uD558\uB294 \uBC29\uBC95\uC5D0 \uB300\uD574 \uAE30\uB85D\uD55C \uBB38\uC11C\uC774\uB2E4.",-1),u=s("h2",{id:"_1-\u1107\u1162\u1111\u1169-\u1100\u116A\u110C\u1165\u11BC-\u110B\u1175\u1112\u1162\u1112\u1161\u1100\u1175",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#_1-\u1107\u1162\u1111\u1169-\u1100\u116A\u110C\u1165\u11BC-\u110B\u1175\u1112\u1162\u1112\u1161\u1100\u1175","aria-hidden":"true"},"#"),n(" 1. \uBC30\uD3EC \uACFC\uC815 \uC774\uD574\uD558\uAE30")],-1),v=s("p",null,[n("\uBA3C\uC800 "),s("code",null,"deploy.sh"),n(" \uB97C \uC791\uC131\uD574\uC57C \uD55C\uB2E4. \uC774 \uC2A4\uD06C\uB9BD\uD2B8\uAC00 \uD558\uB294 \uC77C\uC740 \uB2E4\uC74C\uACFC \uAC19\uB2E4.")],-1),m=s("li",null,"\uBB38\uC11C \uBE4C\uB4DC",-1),b=s("li",null,"\uBE4C\uB4DC\uB41C \uBB38\uC11C\uB97C git init -> add -> commit",-1),h=n("github\uC5D0 push "),g=a("<li><code>https://&lt;user&gt;.github.com/</code> \uC5D0 \uBC30\uD3EC\uD558\uACE0 \uC2F6\uB2E4\uBA74, <ul><li>repository: <code>&lt;user&gt;.github.com</code></li><li>branch: <code>master</code></li></ul></li><li><code>https://&lt;user&gt;.github.com/&lt;repo&gt;</code> \uC5D0 \uBC30\uD3EC\uD558\uACE0 \uC2F6\uB2E4\uBA74, <ul><li>repository: <code>&lt;repo&gt;</code></li><li>branch: <code>gh-pages</code></li></ul></li>",2),k=n("\uCC38\uACE0\uB9C1\uD06C : "),_={href:"http://dogfeet.github.io/articles/2012/github-pages.html",target:"_blank",rel:"noopener noreferrer"},f=n("Github Pages \uAE30\uB2A5 \uC774\uC6A9\uD558\uAE30"),E=a(`<p>\uC774 \uB54C <code>package.json\uC758 npm script</code>\uC640 <code>deploy.sh\uC758 \uC704\uCE58</code>\uAC00 \uC911\uC694\uD558\uAE30 \uB54C\uBB38\uC5D0 \uD504\uB85C\uC81D\uD2B8 \uD3F4\uB354 \uAD6C\uC870\uC5D0 \uB530\uB77C \uC791\uC131\uD558\uB294 \uBC29\uBC95\uC774 \uB2E4\uB974\uB2E4.</p><h2 id="_2-\u1111\u1173\u1105\u1169\u110C\u1166\u11A8\u1110\u1173\u1100\u1161-root-\u1100\u1175\u110C\u116E\u11AB\u110B\u1175\u11AF-\u1104\u1162" tabindex="-1"><a class="header-anchor" href="#_2-\u1111\u1173\u1105\u1169\u110C\u1166\u11A8\u1110\u1173\u1100\u1161-root-\u1100\u1175\u110C\u116E\u11AB\u110B\u1175\u11AF-\u1104\u1162" aria-hidden="true">#</a> 2. \uD504\uB85C\uC81D\uD2B8\uAC00 root \uAE30\uC900\uC77C \uB54C</h2><p>\uD3F4\uB354 \uAD6C\uC870\uAC00 \uB2E4\uC74C\uACFC \uAC19\uB2E4\uBA74</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>.(VuepressProject)
\u251C\u2500 node_modules
\u251C\u2500 package.json
\u251C\u2500 .vuepress
\u2514\u2500 deploy.sh 
</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line">\xA0</div><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\uC77C\uB2E8 <code>package.json</code>\uC758 <code>npm scripts</code>\uB294 \uC544\uB798 \uCC98\uB7FC \uC791\uC131\uD574\uC57C \uD55C\uB2E4.</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
  ... <span class="token comment">// \uC55E \uB0B4\uC6A9 \uC0DD\uB7B5</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;docs:dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress dev&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;docs:build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress build&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  ... <span class="token comment">// \uB4B7 \uB0B4\uC6A9 \uC0DD\uB7B5</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>deploy.sh</code>\uB294 \uC774\uB807\uAC8C \uC791\uC131\uD574\uC57C \uD55C\uB2E4.</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env sh</span>

<span class="token comment"># \uC624\uB958 \uBC1C\uC0DD\uC2DC \uC911\uB2E8\uD55C\uB2E4.</span>
<span class="token builtin class-name">set</span> -e

<span class="token comment"># \uBB38\uC11C(md)\uB97C build\uD558\uC5EC html\uB85C \uB9CC\uB4E0\uB2E4. </span>
<span class="token function">yarn</span> docs:build

<span class="token comment"># build\uAC00 output\uB41C \uD3F4\uB354\uB85C \uC774\uB3D9\uD55C\uB2E4. </span>
<span class="token builtin class-name">cd</span> .vuepress/dist

<span class="token comment"># init + add + commit\uC744 \uD574\uC900 \uB2E4\uC74C</span>
<span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> -A
<span class="token function">git</span> commit -m <span class="token string">&#39;deploy&#39;</span>

<span class="token comment"># https://&lt;USERNAME&gt;.github.io \uC5D0 \uBC30\uD3EC\uD558\uB294 \uACBD\uC6B0</span>
<span class="token comment"># git push -f https://github.com/&lt;USERNAME&gt;/&lt;USERNAME&gt;.github.io.git master</span>

<span class="token comment"># https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt; \uC5D0 \uBC30\uD3EC\uD558\uB294 \uACBD\uC6B0</span>
<span class="token comment"># git push -f https://github.com/&lt;USERNAME&gt;/&lt;REPO&gt;.git master:gh-pages</span>

<span class="token comment"># \uD544\uC790\uC758 \uACBD\uC6B0 TIL repository\uC5D0 \uBC30\uD3EC\uD558\uAE30 \uB54C\uBB38\uC5D0 \uC544\uB798\uC640 \uAC19\uC774 \uC791\uC131\uD588\uB2E4.</span>
<span class="token function">git</span> push -f https://github.com/JunilHwang/TIL.git master:gh-pages

<span class="token builtin class-name">cd</span> -
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><div class="highlight-line">\xA0</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-vuepress\u1100\u1161-root-docs-\u1100\u1175\u110C\u116E\u11AB\u110B\u1175\u11AF-\u1104\u1162" tabindex="-1"><a class="header-anchor" href="#_3-vuepress\u1100\u1161-root-docs-\u1100\u1175\u110C\u116E\u11AB\u110B\u1175\u11AF-\u1104\u1162" aria-hidden="true">#</a> 3. vuepress\uAC00 root/docs \uAE30\uC900\uC77C \uB54C</h2><p>\uD3F4\uB354 \uAD6C\uC870\uAC00 \uB2E4\uC74C\uACFC \uAC19\uB2E4\uBA74</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>.(VuepressProject)
\u251C\u2500 node_modules
\u251C\u2500 package.json
\u251C\u2500 docs
\u2502   \u2514\u2500 .vuepress
\u2514\u2500 deploy.sh 
</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>package.json\uC5D0\uC11C <code>vuepress cli</code>\uC5D0 <code>docs</code>\uB97C \uBD99\uC5EC\uC57C\uD55C\uB2E4.</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
  ... <span class="token comment">// \uC55E \uB0B4\uC6A9 \uC0DD\uB7B5</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;docs:dev&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress dev docs&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;docs:build&quot;</span><span class="token operator">:</span> <span class="token string">&quot;vuepress build docs&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  ... <span class="token comment">// \uB4B7 \uB0B4\uC6A9 \uC0DD\uB7B5</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>deploy.sh</code>\uB294 \uC774\uB807\uAC8C \uC791\uC131\uD574\uC57C \uD55C\uB2E4.</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env sh</span>

<span class="token comment"># \uC624\uB958 \uBC1C\uC0DD\uC2DC \uC911\uB2E8\uD55C\uB2E4.</span>
<span class="token builtin class-name">set</span> -e

<span class="token comment"># \uBB38\uC11C(md)\uB97C build\uD558\uC5EC html\uB85C \uB9CC\uB4E0\uB2E4. </span>
<span class="token function">yarn</span> docs:build

<span class="token comment"># build\uAC00 output\uB41C \uD3F4\uB354\uB85C \uC774\uB3D9\uD55C\uB2E4. </span>
<span class="token builtin class-name">cd</span> docs/.vuepress/dist

<span class="token comment"># init + add + commit\uC744 \uD574\uC900 \uB2E4\uC74C</span>
<span class="token function">git</span> init
<span class="token function">git</span> <span class="token function">add</span> -A
<span class="token function">git</span> commit -m <span class="token string">&#39;deploy&#39;</span>

<span class="token comment"># https://&lt;USERNAME&gt;.github.io \uC5D0 \uBC30\uD3EC\uD558\uB294 \uACBD\uC6B0</span>
<span class="token comment"># git push -f https://github.com/&lt;USERNAME&gt;/&lt;USERNAME&gt;.github.io.git master</span>

<span class="token comment"># https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt; \uC5D0 \uBC30\uD3EC\uD558\uB294 \uACBD\uC6B0</span>
<span class="token comment"># git push -f https://github.com/&lt;USERNAME&gt;/&lt;REPO&gt;.git master:gh-pages</span>

<span class="token comment"># \uD544\uC790\uC758 \uACBD\uC6B0 TIL repository\uC5D0 \uBC30\uD3EC\uD558\uAE30 \uB54C\uBB38\uC5D0 \uC544\uB798\uC640 \uAC19\uC774 \uC791\uC131\uD588\uB2E4.</span>
<span class="token function">git</span> push -f https://github.com/JunilHwang/TIL.git master:gh-pages

<span class="token builtin class-name">cd</span> -
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><div class="highlight-line">\xA0</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\uBB3C\uB860 \uC704\uC758 \uB450 \uAC00\uC9C0 \uACBD\uC6B0 \uB9D0\uACE0\uB3C4 \uB2E4\uC591\uD55C \uD504\uB85C\uC81D\uD2B8 \uAD6C\uC870\uAC00 \uC788\uC744 \uC218 \uC788\uB2E4.</p><p>\uC911\uC694\uD55C \uAC83\uC740 <strong>deploy.sh\uAC00 \uC815\uD655\uD558\uAC8C build\uB41C \uD3F4\uB354\uB85C \uC774\uB3D9\uD558\uC5EC github\uC5D0 push\uD560 \uC218 \uC788\uC5B4\uC57C \uD55C\uB2E4\uB294 \uC810</strong>\uC774\uB2E4.</p><h2 id="_4-shell-script-\u1109\u1175\u11AF\u1112\u1162\u11BC\u1112\u1161\u1100\u1175" tabindex="-1"><a class="header-anchor" href="#_4-shell-script-\u1109\u1175\u11AF\u1112\u1162\u11BC\u1112\u1161\u1100\u1175" aria-hidden="true">#</a> 4. Shell Script \uC2E4\uD589\uD558\uAE30</h2><p>\uCC98\uC74C vuepress\uB97C github pages\uC5D0 \uBC30\uD3EC\uD560 \uB54C push\uB9CC \uD558\uBA74 deploy.sh\uB97C \uC790\uB3D9\uC73C\uB85C \uC2E4\uD589\uD558\uB294 \uC904 \uC54C\uC558\uB2E4(?)</p><p>\uADF8\uAC74 \uB098\uC758 \uD76C\uB9DD\uC0AC\uD56D \uC774\uC600\uACE0, <code>deploy.sh\uB294 \uC9C1\uC811 \uC2E4\uD589</code>\uD574\uC57C \uD55C\uB2E4.</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sh</span> deploy.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><strong>window</strong> : <code>git bash</code> \uB97C \uD1B5\uD574\uC11C \uC2E4\uD589\uD558\uBA74 \uB41C\uB2E4.</li><li><strong>mac</strong> : <code>terminal</code> \uC5D0\uC11C \uC2E4\uD589\uD558\uBA74 \uB41C\uB2E4.</li></ul><h2 id="_5-\u110C\u1161\u1103\u1169\u11BC\u110B\u1173\u1105\u1169-\u1107\u1162\u1111\u1169\u1112\u1161\u1100\u1175" tabindex="-1"><a class="header-anchor" href="#_5-\u110C\u1161\u1103\u1169\u11BC\u110B\u1173\u1105\u1169-\u1107\u1162\u1111\u1169\u1112\u1161\u1100\u1175" aria-hidden="true">#</a> 5. \uC790\uB3D9\uC73C\uB85C \uBC30\uD3EC\uD558\uAE30</h2><p>\uC790\uB3D9\uC73C\uB85C \uBC30\uD3EC\uD558\uB294 \uBC29\uBC95\uC740 \uB2E4\uC591\uD558\uB2E4. <s>\uD558\uC9C0\uB9CC \uB09C \uC218\uB3D9\uC73C\uB85C \uD560\uB798!</s></p>`,24),y={href:"https://docs.travis-ci.com/user/deployment/pages/",target:"_blank",rel:"noopener noreferrer"},x=n("Travis CI"),q={href:"https://netlify.com/",target:"_blank",rel:"noopener noreferrer"},R=n("Netlify"),A={href:"https://www.npmjs.com/package/firebase-tools",target:"_blank",rel:"noopener noreferrer"},N=n("Google Firebase"),S={href:"https://www.npmjs.com/package/surge",target:"_blank",rel:"noopener noreferrer"},j=n("Surge"),M={href:"https://devcenter.heroku.com/articles/heroku-cli",target:"_blank",rel:"noopener noreferrer"},U=n("Heroku CLI"),P={href:"https://zeit.co/examples/vuepress/",target:"_blank",rel:"noopener noreferrer"},w=n("Now"),B=n("\uC774 \uBD80\uBD84\uC740 "),I={href:"https://vuepress.vuejs.org/guide/deploy.html",target:"_blank",rel:"noopener noreferrer"},C=n("\uACF5\uC2DD\uBB38\uC11C"),L=n("\uB97C \uCC38\uACE0\uD558\uB294\uAC78\uB85C.."),O=a(`<h2 id="_6-gh-pages-branch-\u110B\u1166-commit-\u1100\u1175\u1105\u1169\u11A8-\u1102\u1161\u11B7\u1100\u1175\u1100\u1175" tabindex="-1"><a class="header-anchor" href="#_6-gh-pages-branch-\u110B\u1166-commit-\u1100\u1175\u1105\u1169\u11A8-\u1102\u1161\u11B7\u1100\u1175\u1100\u1175" aria-hidden="true">#</a> 6. gh-pages branch \uC5D0 commit \uAE30\uB85D \uB0A8\uAE30\uAE30</h2><p>\uBC30\uD3EC\uB97C \uC131\uACF5\uD558\uB294 \uAC83 \uAE4C\uC9C4 \uC88B\uC558\uB2E4. \uADF8\uB7F0\uB370 gh-pages\uC5D0\uB294 \uD56D\uC0C1 commit \uAE30\uB85D\uC774 1\uAC1C\uB9CC \uB0A8\uC544\uC788\uB294 \uC0C1\uD0DC\uAC00 \uC720\uC9C0\uB41C\uB2E4. \uC774 \uB54C <code>deploy.sh</code>\uC758 \uB0B4\uC6A9\uC744 \uC870\uAE08 \uC190\uBCF4\uBA74 \uB41C\uB2E4.</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env sh</span>

<span class="token comment"># \uC624\uB958 \uBC1C\uC0DD\uC2DC \uC911\uB2E8\uD55C\uB2E4.</span>
<span class="token builtin class-name">set</span> -e

<span class="token comment"># \uBB38\uC11C(md)\uB97C build\uD558\uC5EC html\uB85C \uB9CC\uB4E0\uB2E4. </span>
<span class="token function">yarn</span> docs:build

<span class="token comment"># build\uAC00 output\uB41C \uD3F4\uB354\uB85C \uC774\uB3D9\uD55C\uB2E4. </span>
<span class="token builtin class-name">cd</span> docs/.vuepress/dist

<span class="token comment"># https://&lt;USERNAME&gt;.github.io \uC5D0 \uBC30\uD3EC\uD558\uB294 \uACBD\uC6B0</span>
<span class="token comment"># git clone https://github.com/&lt;USERNAME&gt;/&lt;USERNAME&gt;.github.io/</span>

<span class="token comment"># https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt; \uC5D0 \uBC30\uD3EC\uD558\uB294 \uACBD\uC6B0</span>
<span class="token comment"># \uD544\uC790\uB294 \uC774 \uACBD\uC6B0\uC5D0 \uD574\uB2F9\uD55C\uB2E4.</span>
<span class="token function">git</span> clone -b gh-pages https://github.com/<span class="token operator">&lt;</span>USERNAME<span class="token operator">&gt;</span>/<span class="token operator">&lt;</span>REPO<span class="token operator">&gt;</span>/

<span class="token comment"># .git\uC758 \uB0B4\uC6A9\uC744 \uBCF5\uC0AC\uD55C \uD6C4 clone\uC740 \uC0AD\uC81C\uD55C\uB2E4.</span>
<span class="token function">cp</span> -rf TIL/.git ./.git
<span class="token function">rm</span> -rf TIL

<span class="token comment"># \uC774\uC81C add + commit + push\uB97C \uCC28\uB840\uB300\uB85C \uC2E4\uD589\uD574\uC8FC\uBA74 \uB05D</span>
<span class="token comment"># $1\uC740 \uBB38\uC790\uC5F4 \uC778\uC790</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit -m <span class="token string">&#39;$1&#39;</span>

<span class="token comment"># https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt; \uC5D0 \uBC30\uD3EC\uD558\uB294 \uACBD\uC6B0</span>
<span class="token comment"># git push origin master</span>

<span class="token comment"># https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt; \uC5D0 \uBC30\uD3EC\uD558\uB294 \uACBD\uC6B0</span>
<span class="token comment"># \uD544\uC790\uB294 \uC774 \uACBD\uC6B0\uC5D0 \uD574\uB2F9\uD55C\uB2E4.</span>
<span class="token function">git</span> push origin gh-pages

<span class="token builtin class-name">cd</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\uC774\uB807\uAC8C \uC791\uC131\uB41C <code>deploy.sh</code>\uC740 \uB2E4\uC74C\uACFC \uAC19\uC774 \uC0AC\uC6A9\uD558\uBA74 \uB41C\uB2E4.</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sh</span> deploy.sh <span class="token string">&quot;\uCEE4\uBC0B \uBA54\uC138\uC9C0&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>\uBB38\uC11C commit + deploy\uAE4C\uC9C0 \uAC19\uC774 \uC790\uB3D9\uD654</code> \uD558\uACE0 \uC2F6\uB2E4\uBA74 \uB610 \uC0C8\uB85C\uC6B4 shell scripts\uB97C \uC791\uC131\uD558\uBA74 \uB41C\uB2E4.</p><p>\uD30C\uC77C\uBA85\uC740 \uB300\uCDA9 <code>commit.sh</code> \uC774\uB77C\uACE0 \uC9C0\uC5C8\uB2E4.</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env sh</span>

<span class="token comment"># abort on errors</span>
<span class="token builtin class-name">set</span> -e

<span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
<span class="token function">git</span> commit -m <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span>
<span class="token function">git</span> push origin master

<span class="token function">sh</span> deploy.sh <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\uC0AC\uC6A9 \uBC29\uBC95\uC740 \uB2E4\uC74C\uACFC \uAC19\uB2E4.</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sh</span> commit.sh <span class="token string">&quot;\uCEE4\uBC0B \uBA54\uC138\uC9C0&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\uC774\uB7EC\uBA74 \uBB38\uC11C\uB3C4 commit\uD574\uC8FC\uACE0 \uAC19\uC740 commit message\uB85C \uBC30\uD3EC\uAE4C\uC9C0 \uC644\uB8CC\uD574\uC900\uB2E4.</p><h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference" aria-hidden="true">#</a> Reference</h2>`,12),T={href:"http://dogfeet.github.io/articles/2012/github-pages.html",target:"_blank",rel:"noopener noreferrer"},V=n("Github Pages \uAE30\uB2A5 \uC774\uC6A9\uD558\uAE30"),D={href:"https://vuepress.vuejs.org/guide/deploy.html",target:"_blank",rel:"noopener noreferrer"},$=n("\uACF5\uC2DD\uBB38\uC11C"),G={href:"https://joshua1988.github.io/vue-camp/vuepress/learning-note.html#%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%B0%B0%ED%8F%AC-%ED%95%98%EA%B8%B0-%EC%A0%88%EC%B0%A8",target:"_blank",rel:"noopener noreferrer"},H=n("Vuepress \uC0AC\uC774\uD2B8 \uBC30\uD3EC\uD558\uAE30 \uC808\uCC28");function F(J,z){const e=t("ExternalLinkIcon");return o(),c("div",null,[r,p,u,v,s("ol",null,[m,b,s("li",null,[h,s("ul",null,[g,s("li",null,[k,s("a",_,[f,i(e)])])])])]),E,s("ul",null,[s("li",null,[s("a",y,[x,i(e)])]),s("li",null,[s("a",q,[R,i(e)])]),s("li",null,[s("a",A,[N,i(e)])]),s("li",null,[s("a",S,[j,i(e)])]),s("li",null,[s("a",M,[U,i(e)])]),s("li",null,[s("a",P,[w,i(e)])])]),s("p",null,[B,s("a",I,[C,i(e)]),L]),O,s("ul",null,[s("li",null,[s("a",T,[V,i(e)])]),s("li",null,[s("a",D,[$,i(e)])]),s("li",null,[s("a",G,[H,i(e)])])])])}var Q=l(d,[["render",F],["__file","index.html.vue"]]);export{Q as default};
