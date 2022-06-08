import{_ as a,o as t,c as e,d as l}from"./app.001653ba.js";const n={},i=l(`<h1 id="\u1111\u1173\u1105\u1169\u1100\u1173\u1105\u1162\u1106\u1175\u11BC-\u110B\u1165\u11AB\u110B\u1165\u1105\u1169\u1109\u1165\u110B\u1174-\u110C\u1161\u1107\u1161" tabindex="-1"><a class="header-anchor" href="#\u1111\u1173\u1105\u1169\u1100\u1173\u1105\u1162\u1106\u1175\u11BC-\u110B\u1165\u11AB\u110B\u1165\u1105\u1169\u1109\u1165\u110B\u1174-\u110C\u1161\u1107\u1161" aria-hidden="true">#</a> \uD504\uB85C\uADF8\uB798\uBC0D \uC5B8\uC5B4\uB85C\uC11C\uC758 \uC790\uBC14</h1><p>\uC790\uBC14\uB294 \uADFC\uBCF8\uC801\uC73C\uB85C \uD504\uB85C\uADF8\uB798\uBC0D \uC5B8\uC5B4\uB2E4. \uC790\uBC14\uAC00 \uC5B4\uB5BB\uAC8C \uC791\uB3D9\uD558\uB294\uC9C0, \uBCC0\uC218\uAC00 \uBA54\uBAA8\uB9AC\uC5D0 \uC5B4\uB5BB\uAC8C \uC800\uC7A5\uB418\uACE0 \uC0AC\uC6A9\uB418\uB294\uC9C0, \uBA54\uC11C\uB4DC\uAC00 \uC5B4\uB5BB\uAC8C \uD638\uCD9C\uB418\uACE0 \uBA54\uBAA8\uB9AC\uC5D0 \uC5B4\uB5A4 \uBCC0\uD654\uB97C \uC77C\uC73C\uD0A4\uB294\uC9C0 \uC0B4\uD3B4\uBCFC \uD544\uC694\uAC00 \uC788\uB2E4.</p><p>\uADF8\uB9AC\uACE0 \uC55E\uC11C \uC5B8\uAE09\uD55C \uBA54\uBAA8\uB9AC\uB294 JVM\uC5D0 \uC874\uC7AC\uD558\uB294 <u>\uAC00\uC0C1\uC758 \uBA54\uBAA8\uB9AC \uAD6C\uC870</u> \uC774\uB2E4.</p><h2 id="java-virtual-machine" tabindex="-1"><a class="header-anchor" href="#java-virtual-machine" aria-hidden="true">#</a> Java Virtual Machine</h2><p>\uC77C\uB2E8 java source file \uC744 \uC2E4\uD589\uD558\uAE30 \uC704\uD574\uC11C\uB294 <code>JVM(Java Virtual Machine)</code> \uC774\uB77C\uB294 \uAC83\uC774 \uD544\uC694\uD558\uB2E4.</p><table><thead><tr><th style="text-align:center;">Real World</th><th style="text-align:center;">Java Virtual World</th><th style="text-align:center;">\uB300\uC751</th></tr></thead><tbody><tr><td style="text-align:center;">\uC18C\uD504\uD2B8\uC6E8\uC5B4 \uAC1C\uBC1C \uB3C4\uAD6C</td><td style="text-align:center;">JDK(Java Develop Kit)</td><td style="text-align:center;">JVM\uC6A9 \uC18C\uD504\uD2B8\uC6E8\uC5B4 \uAC1C\uBC1C \uB3C4\uAD6C(\uC774\uD074\uB9BD\uC2A4, \uC778\uD154\uB9AC\uC81C\uC774)</td></tr><tr><td style="text-align:center;">\uC6B4\uC601\uCCB4\uC81C</td><td style="text-align:center;">JRE(Java Runtime Environment)</td><td style="text-align:center;">JVM\uC6A9 OS</td></tr><tr><td style="text-align:center;">\uD558\uB4DC\uC6E8\uC5B4(\uBA38\uC2E0)</td><td style="text-align:center;">JVM(Java Virtual Machine)</td><td style="text-align:center;">\uAC00\uC0C1\uC758 \uCEF4\uD4E8\uD130</td></tr></tbody></table><div class="custom-container tip"><p class="custom-container-title">\uC6A9\uC5B4 \uC815\uB9AC</p><ul><li><strong>JDK</strong> : Java Develop Kit. \uC790\uBC14\uB97C \uAC1C\uBC1C\uD560 \uB54C \uD544\uC694\uD55C \uB3C4\uAD6C</li><li><strong>JRE</strong> : Java Runtime Environment. \uC790\uBC14\uAC00 \uC2E4\uD589\uB418\uB294 \uD658\uACBD</li><li><strong>JVM</strong> : Java Virtual Machine. \uC790\uBC14\uAC00 \uC2E4\uD589\uB418\uB294 \uAC00\uC0C1\uC758 \uBA38\uC2E0</li></ul><p>JVM\uC5D0\uB294 \uAC00\uC0C1\uC758 \uBA54\uBAA8\uB9AC \uAD6C\uC870\uAC00 \uC788\uACE0, Java\uC5D0\uC11C \uC2E4\uD589\uB418\uB294 \uCF54\uB4DC\uB294 \uC774 JVM\uC5D0 \uC885\uC18D\uC801\uC774\uB2E4.</p></div><img src="https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuIfAJIv9p4lFILNmSl5MgEPIK40I2N85Yw28XVcYYVXa9XKb5bK2HMjHTBkabdbdba0DICxFoG7APERd5IiK92Pd9wQd5eDrr78vfEQb05q20000" alt="uml diagram"><p>C\uC5B8\uC5B4 \uAC19\uC740 \uACBD\uC6B0\uC5D0\uB294 Runtime\uC774 OS\uC9C0\uB9CC, Java\uC758 \uACBD\uC6B0 Runtime\uC774 JVM\uC774\uB2E4.<br><u>\uADF8\uB9AC\uACE0 JVM\uC774 Byte Code(*.class file)\uB97C OS\uC5D0 \uD2B9\uD654\uB41C \uCF54\uB4DC\uB85C \uBCC0\uD658\uD558\uC5EC \uC2E4\uD589\uD55C\uB2E4.</u></p><p>JVM\uC758 \uAD6C\uC870\uB294 \uB2E4\uC74C\uACFC \uAC19\uB2E4.</p><img src="https://www.plantuml.com/plantuml/svg/TP51QiCm44NtEiMWLNgBW0YkWsCCxWKczg2Ao58OoQLkwTqhkuPs0jreyURhp__CCMNaF4zUCGqPW_K4sdXC2Pg88p7qIyeqQS04Wq_mgG1-fQl61IkP2xT7LWUN7NhtWTd5eBxKdtKNcY8l3yPznk4cYExCeUDe6ISmSGwP-6bBrHcfQykEjzKslyRnnsZJjPTU29y9xmBiFq36qwTt6kOrDfo2TO4sCofmYonAbantflBAmRb-aK1Nvb0XNz5IwU9z6SIzJMNa-dDRgt_BDUxAoCjUhr7gI64in_m6" alt="uml diagram"><ul><li><p>Class Loader System</p><ul><li>*.class\uC5D0\uC11C Byte Code\uB97C \uC77D\uACE0 \uBA54\uBAA8\uB9AC\uC5D0 \uC800\uC7A5</li><li><code>Loading</code>: \uD074\uB798\uC2A4\uB97C \uC77D\uC5B4\uC624\uB294 \uACFC\uC815</li><li><code>Linking</code>: Reference\uB97C \uC5F0\uACB0\uD558\uB294 \uACFC\uC815</li><li><code>Initialization</code>: static \uAC12\uB4E4 \uCD08\uAE30\uD654 \uBC0F \uBCC0\uC218 \uD560\uB2F9</li><li>\uC77C\uC885\uC758 <strong>Static \uC601\uC5ED</strong>\uC774\uB77C\uACE0 \uD560 \uC218 \uC788\uB2E4.</li></ul></li><li><p>Memory</p><ul><li>Class \uC218\uC900\uC758 \uC815\uBCF4(Class Name, Super Class Name, Method, Variable) \uC800\uC7A5</li><li><code>Heap</code>: Object \uC800\uC7A5. \uACF5\uC720\uC790\uC6D0</li><li><code>Stack</code><ul><li>Thread \uB9C8\uB2E4 Runtime Stack\uC744 \uB9CC\uB4E4\uACE0, \uADF8 \uC548\uC5D0\uC11C Method \uD638\uCD9C\uC744 Stack Frame \uC774\uB77C\uACE0 \uBD80\uB974\uB294 Block \uC73C\uB85C \uC313\uB294\uB2E4.</li><li>Thread \uC885\uB8CC \uD6C4 Runtime Stack \uB3C4 \uC0AC\uB77C\uC9C4\uB2E4.</li></ul></li><li><code>Program Counter</code>: Thread \uB9C8\uB2E4 Thread \uB0B4 \uD604\uC7AC \uC2E4\uD589\uD560 Stack Frame \uC744 \uAC00\uB974\uD0A4\uB294 \uD3EC\uC778\uD130\uAC00 \uC0DD\uC131\uB41C\uB2E4.</li><li><code>Native Method Stack</code>: \uB9D0 \uADF8\uB300\uB85C Native Method\uC5D0 \uB300\uD55C Stack <ul><li>Native Method\uB294 \uB2E4\uB978 \uC5B8\uC5B4\uB85C \uC791\uC131\uB41C \uCF54\uB4DC\uB97C \uC790\uBC14\uC5D0\uC11C \uD638\uCD9C\uD558\uB294 \uAC83\uC744 \uC758\uBBF8\uD55C\uB2E4.</li></ul></li></ul></li><li><p>Execution Engine</p><ul><li><code>Interpreter</code>: \uBC14\uC774\uD2B8 \uCF54\uB4DC\uB97C \uD55C \uC904\uC529 \uC2E4\uD589</li><li><code>JIT Compiler</code>: \uC778\uD130\uD504\uB9AC\uD130\uC758 \uD6A8\uC728\uC744 \uB192\uC774\uAE30 \uC704\uD574 \uBC18\uBCF5\uB418\uB294 \uCF54\uB4DC\uB97C \uBC1C\uACAC\uC2DC \uBAA8\uB450 \uB124\uC774\uD2F0\uBE0C \uCF54\uB4DC\uB85C \uBCC0\uD658</li><li><code>Garbage Collector</code>: \uB354 \uC774\uC0C1 \uCC38\uC870 \uB418\uC9C0 \uC54A\uB294 \uAC1D\uCCB4\uB97C \uBAA8\uC544\uC11C \uC815\uB9AC\uD568</li></ul></li><li><p>JNI(Java Native Interface)</p><ul><li>\uC790\uBC14 \uC560\uD50C\uB9AC\uCF00\uC774\uC158\uC5D0\uC11C C, C++, Assembly \uB4F1\uC73C\uB85C \uC791\uC131\uB41C \uD568\uC218\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC788\uB294 Interface \uC81C\uACF5</li><li>Native \uD0A4\uC6CC\uB4DC\uB97C \uC0AC\uC6A9\uD55C \uBA54\uC18C\uB4DC \uD638\uCD9C</li></ul></li><li><p>Native Method Library</p><ul><li><u>C, C++ \uB4F1\uC73C\uB85C \uC791\uC131\uB41C Library</u></li></ul></li></ul><p>Java\uC5D0\uC11C \uC0AC\uC6A9\uB418\uB294 Class\uB4E4\uC744 Class Loader\uC5D0\uC11C \uAD00\uB9AC\uD558\uACE0, Class\uAC00 Object(\uD639\uC740 Instance)\uB97C \uB9CC\uB4E4\uBA74 Heap\uC5D0 \uC313\uC774\uAC8C \uB41C\uB2E4.</p><ul><li><code>Static(Class Loader System)</code><ul><li>Class\uC758 \uB180\uC774\uD130</li><li>Static Property, Method</li><li>Object\uC758 Method Address</li></ul></li><li><code>Heap</code>: Object(Instance)\uC758 \uB180\uC774\uD130</li><li><code>Stack</code>: Method\uC758 \uB180\uC774\uD130</li></ul><h2 id="main-method\u110B\u1174-stack-frame" tabindex="-1"><a class="header-anchor" href="#main-method\u110B\u1174-stack-frame" aria-hidden="true">#</a> Main Method\uC758 Stack Frame</h2><p>\uB2E4\uC74C\uACFC \uAC19\uC740 \uCF54\uB4DC\uAC00 \uC788\uC744 \uB54C JVM\uC758 \uBA54\uBAA8\uB9AC \uAD6C\uC870 \uBCC0\uD654\uB97C \uC0B4\uD3B4\uBCF4\uC790.</p><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Start</span> <span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> main <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;Hello OOP!!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>main method\uAC00 \uC2E4\uD589\uB418\uAE30 \uC804\uC5D0\uB294 \uC77C\uB2E8 java.lang\uACFC start class\uAC00 Static \uC601\uC5ED\uC5D0 \uC62C\uB77C\uC628\uB2E4.</li></ol><img src="https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuL9GA4fDBadCIyz9LGWkIIp9J5Qe1WegA4Hd9PObwkK0PMB1_EJyt8BylDIy4f2oeXAeAg1uOb6AGcvYPXwONyi5mGX3FL8J2y2AQz7jIiw6YZkavgK0tG80" alt="uml diagram"><ol start="2"><li>main method\uC758 \uC2E4\uD589\uC774 \uC2DC\uC791\uB418\uBA74, main method\uC758 \uC9C0\uC5ED\uBCC0\uC218\uC640 \uB9E4\uAC1C\uBCC0\uC218\uAC00 stack \uC601\uC5ED\uC5D0 \uC0DD\uC131\uB429\uB2C8\uB2E4.</li></ol>`,20),s=[i];function c(o,d){return t(),e("div",null,s)}var p=a(n,[["render",c],["__file","index.html.vue"]]);export{p as default};
