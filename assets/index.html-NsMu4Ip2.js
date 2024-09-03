import{_ as s,r as n,o as r,c,a as e,b as l,d as a,e as t}from"./app-DvMpbwcb.js";const p={},o=e("h1",{id:"none-blocking-javascript-소개",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#none-blocking-javascript-소개"},[e("span",null,"None Blocking Javascript 소개")])],-1),d={class:"custom-container tip"},u=e("p",{class:"custom-container-title"},"해당 포스트는 아래의 내용을 토대로 정리한 것입니다.",-1),h={href:"https://www.youtube.com/watch?v=0NsJsBdYVHI&list=PLBNdLLaRx_rImvbuZnfO-Ecv9OpuCNoCl",target:"_blank",rel:"noopener noreferrer"},m=t('<p>Javascript 라는 언어의 특징에 대해 다루는 내용입니다.</p><h2 id="javascript-pipeline" tabindex="-1"><a class="header-anchor" href="#javascript-pipeline"><span>Javascript Pipeline</span></a></h2><p>Javascript로 만든 프로그램이 서비스되는 과정은 다음과 같다.</p><img src="https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuKfEB4fHICvFIOMmGeeIyueBCdDIYo3yWCJaxCJqpBnq2DVP4qAxf1Rav5ToSO4qAkX6PsIcfAJcnIBhHZ2Hv16cmLb8ia33dJsH-51B75BpKe0k1G00" alt="uml diagram"><p>단점 : 코드를 서비스 단계에서 디버깅 하기는 굉장히 힘들다.</p><p>장점 : 코드의 호환성은 Transpiler와 Packaging이 책임진다.</p><ul><li>Code <ul><li>ECMAScript</li><li>TypeScript</li><li>Kotlin</li><li>Dart</li></ul></li><li>Transpiler <ul><li>Step1 <ul><li>tsc</li><li>kotlinc</li></ul></li><li>Step2 <ul><li><u>babel</u></li></ul></li></ul></li><li>Packaging <ul><li>webpack</li></ul></li><li>CI</li><li>Deploy</li></ul><p>수업에서는 Code(ECMAScript2020)에 집중한다.</p><h2 id="ecmascript-standard" tabindex="-1"><a class="header-anchor" href="#ecmascript-standard"><span>ECMAScript Standard</span></a></h2><p>매년 상반기 새로운 버전츨 출시함(버전과 연도가 1차이. ES6 = ES2015)</p><p>현재 ES11(ES2020)이 최종 조정 중</p><p>ES6 이후 급격한 언어의 변화를 지양하고 점진적인 버전업을 진행</p><p>새롭게 반영될 내용은 Stage0~3까지 단계별 승격을 통해 정식 반영시 Stage4가 됨</p>',13),g={href:"https://github.com/tc39/proposals",target:"_blank",rel:"noopener noreferrer"},S=t('<div class="custom-container tip"><p class="custom-container-title">실제로는?</p><p>tc39 위원회에서 회의를 통해 결정되며 위원회는 다양한 업계와 관계자로 구성됨</p><p>실제 각 제안의 담당자(챔피온)가 구글 관련 개발자인 경우가 많음</p><p><u>Stage4 기준 보다 구글이 원하는 순서대로 크롬에 빨리 반영되는 경우가 많음</u></p><p>크롬의 업데이트 확인 : https://developers.google.com/web/updates/capabilities</p></div><h3 id="es6" tabindex="-1"><a class="header-anchor" href="#es6"><span>ES6</span></a></h3><ul><li>Class</li><li>Iterator, Generator, For of</li><li>Class Library <ul><li>Symbol, Promise, Map, Set, WeakMap, WeakSet, Proxy, Reflect</li></ul></li><li>Object Literal</li><li>Arrow (순수한 함수 지향. 가벼운 객체를 만들 수 있다)</li><li>const, let</li><li>destructuring, rest, spread</li><li>Template String</li></ul><h3 id="es7" tabindex="-1"><a class="header-anchor" href="#es7"><span>ES7</span></a></h3><ul><li>중첩된 Rest Destructure</li><li><code>const [a, ...[b, ...c]] = [1, 2, 3, 4]</code> =&gt; <code>a=1</code> <code>b=2</code> <code>c=[3,4]</code></li></ul><h3 id="es8" tabindex="-1"><a class="header-anchor" href="#es8"><span>ES8</span></a></h3><ul><li>async/await</li><li>shared memory ( thread 간에 메모리 공유 )</li><li>atomics ( mutex lock )</li></ul><h3 id="es9" tabindex="-1"><a class="header-anchor" href="#es9"><span>ES9</span></a></h3><ul><li>Object Destructure</li><li>asynchronous iterators</li></ul><h3 id="es10" tabindex="-1"><a class="header-anchor" href="#es10"><span>ES10</span></a></h3><ul><li>optional catch</li></ul><h3 id="es11-stage11" tabindex="-1"><a class="header-anchor" href="#es11-stage11"><span>ES11(Stage11)</span></a></h3><ul><li><em>Bigint</em></li><li><em>globalThis</em></li><li><em>top level await</em></li><li><em>class field</em></li><li><em>private field</em>/method</li><li>optional chaining <code>?.</code></li><li>nullish coalescing <code>??</code></li><li>WeakReference</li></ul><p><em>이미 크롬이 지원함</em></p><h2 id="program-timing" tabindex="-1"><a class="header-anchor" href="#program-timing"><span>Program &amp; Timing</span></a></h2><ul><li><p>Language code</p><ul><li>Lint, IDE</li><li>ES2020, Tyescript ...</li></ul></li><li><p>Machine language (Browser, JVM 등의 Runtime)</p><ul><li>Compiler, Transpiler</li></ul></li><li><p>File</p><ul><li>Deploy</li></ul></li><li><p>Load</p><ul><li>Browser load</li><li>Browser parsing</li></ul></li><li><p>Run</p><ul><li>Browser parsing</li><li>Runtime</li></ul></li><li><p>Terminate</p><ul><li>Browser close</li></ul></li></ul><p>개발의 목표</p><ul><li>만들어진 코드를 건드리지 않고 더 많은 기능이나 수정을 하는가.</li><li>코드가 변화하는 이유를 한 가지고 규정하는 것</li><li>변화에 대응하는 여파를 최소화 시키는 것</li></ul><p>자바스크립트는 Compile Time과 Run Time의 구분이 존재하지 않는다.</p>',19);function v(b,k){const i=n("ExternalLinkIcon");return r(),c("div",null,[o,e("div",d,[u,e("ul",null,[e("li",null,[e("a",h,[l("코드스피츠 85기 - 거침없는 자바스크립트 1회차"),a(i)])])])]),m,e("p",null,[l("현재 제안 중인 내용의 상태 확인 : "),e("a",g,[l("https://github.com/tc39/proposals"),a(i)])]),S])}const _=s(p,[["render",v],["__file","index.html.vue"]]),E=JSON.parse('{"path":"/CodeSpitz/None-Blocking-Javascript/Intro/","title":"None Blocking Javascript 소개","lang":"en-US","frontmatter":{"title":"None Blocking Javascript 소개","description":"거침없는(None Blocking) 자바스크립트의 특징들에 대해 소개합니다.","date":"2020-01-31T13:00:00.000Z","sidebarDepth":2,"tag":"코드스피츠, javascript, domain","thumbnail":"https://cphinf.pstatic.net/mooc/20171016_5/15081473670537g5Dm_PNG/title.png?type=w760"},"headers":[{"level":2,"title":"Javascript Pipeline","slug":"javascript-pipeline","link":"#javascript-pipeline","children":[]},{"level":2,"title":"ECMAScript Standard","slug":"ecmascript-standard","link":"#ecmascript-standard","children":[{"level":3,"title":"ES6","slug":"es6","link":"#es6","children":[]},{"level":3,"title":"ES7","slug":"es7","link":"#es7","children":[]},{"level":3,"title":"ES8","slug":"es8","link":"#es8","children":[]},{"level":3,"title":"ES9","slug":"es9","link":"#es9","children":[]},{"level":3,"title":"ES10","slug":"es10","link":"#es10","children":[]},{"level":3,"title":"ES11(Stage11)","slug":"es11-stage11","link":"#es11-stage11","children":[]}]},{"level":2,"title":"Program & Timing","slug":"program-timing","link":"#program-timing","children":[]}],"git":{"updatedTime":1725358975000},"filePathRelative":"CodeSpitz/None-Blocking-Javascript/Intro/README.md"}');export{_ as comp,E as data};