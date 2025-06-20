import{_ as l,r as t,o as r,c as d,a as n,b as a,e as i,d as e}from"./app.c549b059.js";const o={},c=i(`<h1 id="markdown-it-plantuml" tabindex="-1"><a class="header-anchor" href="#markdown-it-plantuml" aria-hidden="true">#</a> markdown-it-plantuml</h1><p>\uCD5C\uADFC\uC5D0 \uC0AC\uB0B4 \uC785\uBB38\uAD50\uC721\uC5D0\uC11C <code>plantuml</code>\uC744 \uC811\uD588\uACE0 \uAD00\uC2EC\uC774 \uC0DD\uACA8\uC11C \uC815\uB9AC\uD55C \uB0B4\uC6A9\uC774\uB2E4.</p><h2 id="_1-plantuml-\u1109\u1169\u1100\u1162" tabindex="-1"><a class="header-anchor" href="#_1-plantuml-\u1109\u1169\u1100\u1162" aria-hidden="true">#</a> 1. Plantuml \uC18C\uAC1C</h2><p>plantuml\uC740 <code>markdown\uC5D0\uC11C uml\uC744 \uC0AC\uC6A9</code>\uD560 \uC218 \uC788\uAC8C \uD574\uC8FC\uB294 \uD50C\uB7EC\uADF8\uC778\uC774\uB2E4.</p><p>\uBB38\uBC95 \uB610\uD55C \uC5B4\uB835\uC9C0 \uC54A\uB2E4.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@startuml
Bob-&gt;Alice : hello
@enduml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\uADF8\uB9AC\uACE0 \uC704\uC758 \uCF54\uB4DC\uB294 \uB2E4\uC74C\uACFC \uAC19\uC774 UML\uD615\uD0DC\uC758 SVG\uB85C \uBCC0\uD658 \uB41C\uB2E4.</p><img src="https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuNBAJzArSyp9J4vLi5B8ICt9oUToICrB0Ke10000" alt="uml diagram"><p>\uC870\uAE08 \uB354 \uC751\uC6A9\uD558\uC5EC \uC6F9 \uC11C\uBE44\uC2A4\uC758 \uAD6C\uC870\uB97C \uD45C\uD604\uD574\uBCF4\uB3C4\uB85D \uD558\uC790.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@startuml
actor User
interface Client
interface Server
database MySQL

User -&gt;&gt; Client : Event
User &lt;&lt;- Client : HTML Document
Client -&gt;&gt; Server : Http Request
Server -&gt;&gt; Client : Http Response
Server &lt;&lt;- MySQL : Data
@enduml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://www.plantuml.com/plantuml/svg/LOz13e9034NtFKKlm0KC8IHYuW8MYXvW76f20ZCuxP1uUwSuHjs-ll_RrYmcI9mdC5Pym2jJWD49XRknXFjf92S_eAUm9cCmOcw62RjdVse1D8P5LUK0xl2mQd3ZPLby-V7IjTXu6sUTPwp9TxCQ8WkUwH691JBzgyu2BzunVGnTiXsJX2PT1pMv8Vtr0W00" alt="uml diagram">`,11),u=e("\uC774\uB807\uAC8C \uC791\uC131\uD558\uACE0 \uBCF4\uB2C8 \uD559\uBD80\uC2DC\uC808 "),m={href:"https://www.umlet.com/",target:"_blank",rel:"noopener noreferrer"},v=e("umlet"),p=e("\uC73C\uB85C \uBAA8\uB4E0 \uB3C4\uD615\uC744 \uD558\uB098\uD558\uB098 \uB9C8\uC6B0\uC2A4\uB85C \uADF8\uB9AC\uACE0 \uBC30\uCE58\uD558\uB358\uAC8C \uC8FC\uB9C8\uB4F1\uCC98\uB7FC \uC2A4\uCCD0\uAC04\uB2E4.."),b=i(`<p><img src="https://dispatch.cdnser.be/wp-content/uploads/2018/06/20180607225725_f.jpg" alt="\uC544\uB828.."></p><h2 id="_2-\u1111\u1173\u11AF\u1105\u1165\u1100\u1173\u110B\u1175\u11AB-\u1109\u1165\u11AF\u110E\u1175" tabindex="-1"><a class="header-anchor" href="#_2-\u1111\u1173\u11AF\u1105\u1165\u1100\u1173\u110B\u1175\u11AB-\u1109\u1165\u11AF\u110E\u1175" aria-hidden="true">#</a> 2. \uD50C\uB7EC\uADF8\uC778 \uC124\uCE58</h2><p>\uBCF8\uACA9\uC801\uC73C\uB85C Vuepress\uC5D0\uC11C plantuml\uC744 \uC0AC\uC6A9\uD560 \uC218 \uC788\uB3C4\uB85D \uD50C\uB7EC\uADF8\uC778\uC744 \uC124\uCE58\uD574\uBCF4\uC790. vuepress\uB294 \uAE30\uBCF8\uC801\uC73C\uB85C <code>markdown-it</code>\uC744 \uC0AC\uC6A9\uD558\uACE0 \uC788\uAE30 \uB54C\uBB38\uC5D0 <code>markdown-it-plantuml</code>\uC744 markdown-it\uC5D0 extend \uD558\uBA74 \uB41C\uB2E4.</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># yarn\uC744 \uC0AC\uC6A9\uD560 \uACBD\uC6B0</span>
<span class="token function">yarn</span> <span class="token function">add</span> markdown-it-plantuml

<span class="token comment"># npm\uC744 \uC0AC\uC6A9\uD560 \uACBD\uC6B0</span>
<span class="token function">npm</span> <span class="token function">install</span> markdown-it-plantuml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\uC124\uCE58\uAC00 \uC644\uB8CC \uB418\uC5C8\uB2E4\uBA74, <strong><code>.vuepress/config.js</code>\uC5D0\uC11C markdown\uC5D0 plantuml\uC744 extend</strong> \uD574\uBCF4\uC790.</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span> <span class="token comment">// \uC55E \uB0B4\uC6A9 \uC0DD\uB7B5</span>
  <span class="token literal-property property">markdown</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">extendMarkdown</span><span class="token operator">:</span> <span class="token parameter">md</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      md<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;markdown-it-plantuml&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token operator">...</span> <span class="token comment">// \uB4B7 \uB0B4\uC6A9 \uC0DD\uB7B5</span>
<span class="token punctuation">}</span>
</code></pre><div class="highlight-lines"><br><br><br><br><div class="highlight-line">\xA0</div><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\uC774\uB807\uAC8C \uC124\uC815\uD55C \uD6C4\uC5D0 plantuml\uC744 \uC0AC\uC6A9\uD558\uAE30\uB9CC \uD558\uBA74 \uB41C\uB2E4.</p><h2 id="_3-plantuml-\u110B\u1173\u11BC\u110B\u116D\u11BC\u1112\u1161\u1100\u1175" tabindex="-1"><a class="header-anchor" href="#_3-plantuml-\u110B\u1173\u11BC\u110B\u116D\u11BC\u1112\u1161\u1100\u1175" aria-hidden="true">#</a> 3. plantuml \uC751\uC6A9\uD558\uAE30</h2><p>\uC624\uB298(2020-01-06) \uD68C\uC0AC\uC5D0\uC11C \uC9C4\uD589\uC911\uC778 \uD30C\uC77C\uB7FF \uD504\uB85C\uC81D\uD2B8 \uBB38\uC11C\uC5D0 \uC0AC\uC6A9\uD55C plantuml\uC758 \uC77C\uBD80\uB2E4.</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@startuml
node &quot;Client&quot; {
    agent Browser
    node &quot;VueFramework&quot; {
        (VueRouter)
        [Components]
        node &quot;VueStore&quot; {
            [State]
            [Mutations]
            [Actions]
        }
    }
}
Browser --&gt; VueRouter : URI
Browser -&gt; Components : Event
VueRouter --&gt; Components
VueStore --&gt; Components
State &lt;- Mutations
State &lt;-- Actions
Mutations &lt;- Actions
@enduml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://www.plantuml.com/plantuml/svg/NP3B2i8m44Nt-OgXArta1qHAjIYuSDEY6-cYs46ADYDvs8Nqtvs-KjiiGdBkpN18P6okhQjUGb614CIl4fKDu2k0L_xW2-mrrGPrH_hMrU5HvnNMf9zZjrqh3X9o5lNQirjCrPiK3pAPXtvCQadZ_uZkIMfpYzcSdHt3afHPyDrzGHlHxuqOn47A4BmPRE2IdAOiX4cGiyE73s9gorb1ZCfBtXd3LeBNz4Z2e2XyrXP76A4g-Fz_" alt="uml diagram"><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>@startuml
node &quot;Server&quot; {
    node Helper {
        package &quot;CrawlerPacakge&quot; {
            node &quot;MusicCrawler&quot;
            node &quot;NewsCrawler&quot;
            node &quot;Crawler&quot; 
        }
        node &quot;Youtube Search API&quot; as YSA
    }
    node &quot;REST API&quot; as REST {
        node Service
        node Repository
        node RestController
    }
    database H2
}
RestController &lt;-- Service
Service &lt;-- Repository
Service &lt;- Helper
Repository &lt;-&gt; H2
Crawler &lt;|-- MusicCrawler
Crawler &lt;|-- NewsCrawler
@enduml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><img src="https://www.plantuml.com/plantuml/svg/VP4n3u8m48Nt_efBTnPdOY0kEcY8J8ndkIWHARaMYL7_kuLKA8dnbYRVUtUNUqsCHRRThHQDBWbaJdmdbl0Ku6faMwfROa-6Qb5TyUpC6yQ-9ivGuVLCCh1CpNBVcKfve_oX7wWtV-Il19Fs5aj7eJlRdGXoGbONIBET13HGvAcOxQDrkArID8CZjTfKLlCZPCPkT6DPrsxlo4kqU4BZabY9jrWQ88wYQR1_HnRCdh7FKioYW-jXhhyJufVh3JDRAa5Q8g6cT1_t0G00" alt="uml diagram"><p>plantuml\uB9CC \uC788\uC73C\uBA74 \uC124\uACC4\uBB38\uC11C\uB294 \uB9E4\uC6B0 \uC27D\uAC8C \uC791\uC131\uD560 \uC218 \uC788\uB2E4.</p><h2 id="reference" tabindex="-1"><a class="header-anchor" href="#reference" aria-hidden="true">#</a> Reference</h2>`,15),h={href:"https://vuepress.vuejs.org/config/#markdown-extendmarkdown",target:"_blank",rel:"noopener noreferrer"},k=e("Markdown Extention \uACF5\uC2DD\uBB38\uC11C"),g={href:"https://plantuml.com/ko/",target:"_blank",rel:"noopener noreferrer"},_=e("Plantuml \uACF5\uC2DD \uBB38\uC11C"),w={href:"https://www.npmjs.com/package/markdown-it-plantuml",target:"_blank",rel:"noopener noreferrer"},f=e("markdown-it-plantuml");function x(C,S){const s=t("ExternalLinkIcon");return r(),d("div",null,[c,n("p",null,[u,n("a",m,[v,a(s)]),p]),b,n("ul",null,[n("li",null,[n("a",h,[k,a(s)])]),n("li",null,[n("a",g,[_,a(s)])]),n("li",null,[n("a",w,[f,a(s)])])])])}var R=l(o,[["render",x],["__file","index.html.vue"]]);export{R as default};
