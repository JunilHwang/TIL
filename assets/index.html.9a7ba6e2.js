import{_ as r,r as s,o,c,a as e,b as a,e as i,d as t}from"./app.001653ba.js";const n={},p=e("h1",{id:"none-blocking-javascript-\u1109\u1169\u1100\u1162",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#none-blocking-javascript-\u1109\u1169\u1100\u1162","aria-hidden":"true"},"#"),i(" None Blocking Javascript \uC18C\uAC1C")],-1),d={class:"custom-container tip"},u=e("p",{class:"custom-container-title"},"\uD574\uB2F9 \uD3EC\uC2A4\uD2B8\uB294 \uC544\uB798\uC758 \uB0B4\uC6A9\uC744 \uD1A0\uB300\uB85C \uC815\uB9AC\uD55C \uAC83\uC785\uB2C8\uB2E4.",-1),h={href:"https://www.youtube.com/watch?v=0NsJsBdYVHI&list=PLBNdLLaRx_rImvbuZnfO-Ecv9OpuCNoCl",target:"_blank",rel:"noopener noreferrer"},m=i("\uCF54\uB4DC\uC2A4\uD53C\uCE20 85\uAE30 - \uAC70\uCE68\uC5C6\uB294 \uC790\uBC14\uC2A4\uD06C\uB9BD\uD2B8 1\uD68C\uCC28"),g=t('<p>Javascript \uB77C\uB294 \uC5B8\uC5B4\uC758 \uD2B9\uC9D5\uC5D0 \uB300\uD574 \uB2E4\uB8E8\uB294 \uB0B4\uC6A9\uC785\uB2C8\uB2E4.</p><h2 id="javascript-pipeline" tabindex="-1"><a class="header-anchor" href="#javascript-pipeline" aria-hidden="true">#</a> Javascript Pipeline</h2><p>Javascript\uB85C \uB9CC\uB4E0 \uD504\uB85C\uADF8\uB7A8\uC774 \uC11C\uBE44\uC2A4\uB418\uB294 \uACFC\uC815\uC740 \uB2E4\uC74C\uACFC \uAC19\uB2E4.</p><img src="https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuKfEB4fHICvFIOMmGeeIyueBCdDIYo3yWCJaxCJqpBnq2DVP4qAxf1Rav5ToSO4qAkX6PsIcfAJcnIBhHZ2Hv16cmLb8ia33dJsH-51B75BpKe0k1G00" alt="uml diagram"><p>\uB2E8\uC810 : \uCF54\uB4DC\uB97C \uC11C\uBE44\uC2A4 \uB2E8\uACC4\uC5D0\uC11C \uB514\uBC84\uAE45 \uD558\uAE30\uB294 \uAD49\uC7A5\uD788 \uD798\uB4E4\uB2E4.</p><p>\uC7A5\uC810 : \uCF54\uB4DC\uC758 \uD638\uD658\uC131\uC740 Transpiler\uC640 Packaging\uC774 \uCC45\uC784\uC9C4\uB2E4.</p><ul><li>Code <ul><li>ECMAScript</li><li>TypeScript</li><li>Kotlin</li><li>Dart</li></ul></li><li>Transpiler <ul><li>Step1 <ul><li>tsc</li><li>kotlinc</li></ul></li><li>Step2 <ul><li><u>babel</u></li></ul></li></ul></li><li>Packaging <ul><li>webpack</li></ul></li><li>CI</li><li>Deploy</li></ul><p>\uC218\uC5C5\uC5D0\uC11C\uB294 Code(ECMAScript2020)\uC5D0 \uC9D1\uC911\uD55C\uB2E4.</p><h2 id="ecmascript-standard" tabindex="-1"><a class="header-anchor" href="#ecmascript-standard" aria-hidden="true">#</a> ECMAScript Standard</h2><p>\uB9E4\uB144 \uC0C1\uBC18\uAE30 \uC0C8\uB85C\uC6B4 \uBC84\uC804\uCE28 \uCD9C\uC2DC\uD568(\uBC84\uC804\uACFC \uC5F0\uB3C4\uAC00 1\uCC28\uC774. ES6 = ES2015)</p><p>\uD604\uC7AC ES11(ES2020)\uC774 \uCD5C\uC885 \uC870\uC815 \uC911</p><p>ES6 \uC774\uD6C4 \uAE09\uACA9\uD55C \uC5B8\uC5B4\uC758 \uBCC0\uD654\uB97C \uC9C0\uC591\uD558\uACE0 \uC810\uC9C4\uC801\uC778 \uBC84\uC804\uC5C5\uC744 \uC9C4\uD589</p><p>\uC0C8\uB86D\uAC8C \uBC18\uC601\uB420 \uB0B4\uC6A9\uC740 Stage0~3\uAE4C\uC9C0 \uB2E8\uACC4\uBCC4 \uC2B9\uACA9\uC744 \uD1B5\uD574 \uC815\uC2DD \uBC18\uC601\uC2DC Stage4\uAC00 \uB428</p>',13),_=i("\uD604\uC7AC \uC81C\uC548 \uC911\uC778 \uB0B4\uC6A9\uC758 \uC0C1\uD0DC \uD655\uC778 : "),b={href:"https://github.com/tc39/proposals",target:"_blank",rel:"noopener noreferrer"},f=i("https://github.com/tc39/proposals"),S=t('<div class="custom-container tip"><p class="custom-container-title">\uC2E4\uC81C\uB85C\uB294?</p><p>tc39 \uC704\uC6D0\uD68C\uC5D0\uC11C \uD68C\uC758\uB97C \uD1B5\uD574 \uACB0\uC815\uB418\uBA70 \uC704\uC6D0\uD68C\uB294 \uB2E4\uC591\uD55C \uC5C5\uACC4\uC640 \uAD00\uACC4\uC790\uB85C \uAD6C\uC131\uB428</p><p>\uC2E4\uC81C \uAC01 \uC81C\uC548\uC758 \uB2F4\uB2F9\uC790(\uCC54\uD53C\uC628)\uAC00 \uAD6C\uAE00 \uAD00\uB828 \uAC1C\uBC1C\uC790\uC778 \uACBD\uC6B0\uAC00 \uB9CE\uC74C</p><p><u>Stage4 \uAE30\uC900 \uBCF4\uB2E4 \uAD6C\uAE00\uC774 \uC6D0\uD558\uB294 \uC21C\uC11C\uB300\uB85C \uD06C\uB86C\uC5D0 \uBE68\uB9AC \uBC18\uC601\uB418\uB294 \uACBD\uC6B0\uAC00 \uB9CE\uC74C</u></p><p>\uD06C\uB86C\uC758 \uC5C5\uB370\uC774\uD2B8 \uD655\uC778 : https://developers.google.com/web/updates/capabilities</p></div><h3 id="es6" tabindex="-1"><a class="header-anchor" href="#es6" aria-hidden="true">#</a> ES6</h3><ul><li>Class</li><li>Iterator, Generator, For of</li><li>Class Library <ul><li>Symbol, Promise, Map, Set, WeakMap, WeakSet, Proxy, Reflect</li></ul></li><li>Object Literal</li><li>Arrow (\uC21C\uC218\uD55C \uD568\uC218 \uC9C0\uD5A5. \uAC00\uBCBC\uC6B4 \uAC1D\uCCB4\uB97C \uB9CC\uB4E4 \uC218 \uC788\uB2E4)</li><li>const, let</li><li>destructuring, rest, spread</li><li>Template String</li></ul><h3 id="es7" tabindex="-1"><a class="header-anchor" href="#es7" aria-hidden="true">#</a> ES7</h3><ul><li>\uC911\uCCA9\uB41C Rest Destructure</li><li><code>const [a, ...[b, ...c]] = [1, 2, 3, 4]</code> =&gt; <code>a=1</code> <code>b=2</code> <code>c=[3,4]</code></li></ul><h3 id="es8" tabindex="-1"><a class="header-anchor" href="#es8" aria-hidden="true">#</a> ES8</h3><ul><li>async/await</li><li>shared memory ( thread \uAC04\uC5D0 \uBA54\uBAA8\uB9AC \uACF5\uC720 )</li><li>atomics ( mutex lock )</li></ul><h3 id="es9" tabindex="-1"><a class="header-anchor" href="#es9" aria-hidden="true">#</a> ES9</h3><ul><li>Object Destructure</li><li>asynchronous iterators</li></ul><h3 id="es10" tabindex="-1"><a class="header-anchor" href="#es10" aria-hidden="true">#</a> ES10</h3><ul><li>optional catch</li></ul><h3 id="es11-stage11" tabindex="-1"><a class="header-anchor" href="#es11-stage11" aria-hidden="true">#</a> ES11(Stage11)</h3><ul><li><em>Bigint</em></li><li><em>globalThis</em></li><li><em>top level await</em></li><li><em>class field</em></li><li><em>private field</em>/method</li><li>optional chaining <code>?.</code></li><li>nullish coalescing <code>??</code></li><li>WeakReference</li></ul><p><em>\uC774\uBBF8 \uD06C\uB86C\uC774 \uC9C0\uC6D0\uD568</em></p><h2 id="program-timing" tabindex="-1"><a class="header-anchor" href="#program-timing" aria-hidden="true">#</a> Program &amp; Timing</h2><ul><li><p>Language code</p><ul><li>Lint, IDE</li><li>ES2020, Tyescript ...</li></ul></li><li><p>Machine language (Browser, JVM \uB4F1\uC758 Runtime)</p><ul><li>Compiler, Transpiler</li></ul></li><li><p>File</p><ul><li>Deploy</li></ul></li><li><p>Load</p><ul><li>Browser load</li><li>Browser parsing</li></ul></li><li><p>Run</p><ul><li>Browser parsing</li><li>Runtime</li></ul></li><li><p>Terminate</p><ul><li>Browser close</li></ul></li></ul><p>\uAC1C\uBC1C\uC758 \uBAA9\uD45C</p><ul><li>\uB9CC\uB4E4\uC5B4\uC9C4 \uCF54\uB4DC\uB97C \uAC74\uB4DC\uB9AC\uC9C0 \uC54A\uACE0 \uB354 \uB9CE\uC740 \uAE30\uB2A5\uC774\uB098 \uC218\uC815\uC744 \uD558\uB294\uAC00.</li><li>\uCF54\uB4DC\uAC00 \uBCC0\uD654\uD558\uB294 \uC774\uC720\uB97C \uD55C \uAC00\uC9C0\uACE0 \uADDC\uC815\uD558\uB294 \uAC83</li><li>\uBCC0\uD654\uC5D0 \uB300\uC751\uD558\uB294 \uC5EC\uD30C\uB97C \uCD5C\uC18C\uD654 \uC2DC\uD0A4\uB294 \uAC83</li></ul><p>\uC790\uBC14\uC2A4\uD06C\uB9BD\uD2B8\uB294 Compile Time\uACFC Run Time\uC758 \uAD6C\uBD84\uC774 \uC874\uC7AC\uD558\uC9C0 \uC54A\uB294\uB2E4.</p>',19);function v(x,E){const l=s("ExternalLinkIcon");return o(),c("div",null,[p,e("div",d,[u,e("ul",null,[e("li",null,[e("a",h,[m,a(l)])])])]),g,e("p",null,[_,e("a",b,[f,a(l)])]),S])}var B=r(n,[["render",v],["__file","index.html.vue"]]);export{B as default};
