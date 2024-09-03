import{_ as s,r as l,o,c as i,a as e,b as n,d as t,e as r}from"./app-DvMpbwcb.js";const p={},c=e("h1",{id:"책-소개",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#책-소개"},[e("span",null,"책 소개")])],-1),d={href:"https://wikibook.co.kr/java-oop-for-spring/",target:"_blank",rel:"noopener noreferrer"},u=e("h2",{id:"책을-구매하게-된-계기",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#책을-구매하게-된-계기"},[e("span",null,"책을 구매하게 된 계기")])],-1),h={href:"https://expert0226.tistory.com/category/%EA%B0%95%EC%A2%8C/Spring%203.0",target:"_blank",rel:"noopener noreferrer"},m=e("p",null,"그 당시에는 두루뭉실하게 와닿았던 개념들이었는데, 이제 읽어보니 굉장히 이해하기 쉽게 작성된 포스트였다. 그리고 그 블로그의 저자가 출간한 책이 있다는 것을 알았고, 바로 구매했다. 책의 내용과 구성은 기대를 저버리지 않았다. OOP의 개념을 더욱 확고하게 정립할 수 있었고 Spring을 사용하는 목적과 Spring이 지향하는 방향에 대해 이해할 수 있었다.",-1),v=e("h2",{id:"저자-소개",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#저자-소개"},[e("span",null,"저자 소개")])],-1),g=e("p",null,"저자에 대한 정보는 아래의 페이지들에서 자세하게 알 수 있다.",-1),k={href:"https://expert0226.tistory.com/",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/expert0226",target:"_blank",rel:"noopener noreferrer"},_={href:"https://kr.linkedin.com/in/%EC%A2%85%EB%AF%BC-%EA%B9%80-911410100",target:"_blank",rel:"noopener noreferrer"},b={href:"https://www.facebook.com/NoviceRambo",target:"_blank",rel:"noopener noreferrer"},w={href:"https://www.youtube.com/channel/UCvQOwKeXLw2jwecuL3bcw0w/videos",target:"_blank",rel:"noopener noreferrer"},x=r(`<h2 id="책을-읽으면서-인상-깊었던-점" tabindex="-1"><a class="header-anchor" href="#책을-읽으면서-인상-깊었던-점"><span>책을 읽으면서 인상 깊었던 점</span></a></h2><h3 id="이해하기-쉽도록-전달" tabindex="-1"><a class="header-anchor" href="#이해하기-쉽도록-전달"><span>이해하기 쉽도록 전달</span></a></h3><p>기존에 알려진 지식을 그대로 전달하는 것이 아닌 저자 나름대로의 해석을 통해 독자가 이해하기 쉽도록 전달하는 게 좋았다. 예를 들면 다음과 같다.</p><div class="custom-container tip"><p class="custom-container-title">Define of Spring Framework</p><p>Spring Framework를 설명하는 공식적인 정의는 <u>자바 엔터프라이즈 개발을 편하게 해주는 오픈소스 경량급 어플리케이션 프레임워크</u> 이다.</p><p>그런데 저자는 다음과 같이 정의한다.</p><p><u>&quot;객체지향 프로그래밍을 위한 프레임워크&quot;</u> <u>&quot;OOP Framework&quot;</u></p></div><div class="custom-container tip"><p class="custom-container-title">Define of DIP(의존 역전 원칙)</p><p>로버트 C.마틴이 말하는 DIP(Dependency Inversion Principle)는 다음과 같다.</p><ul><li>&quot;고차원 모듈은 저차원 모듈에 의존하면 안 된다. 이 두 모듈 모두 다른 추상화 된 것에 의존해야 한다.&quot;</li><li>&quot;추상화된 것은 구체적인 것에 의존하면 안 된다. 구체적인 것이 추상화 된 것에 의존해야 한다.&quot;</li><li>&quot;자주 변경되는 구체(Concrete) 클래스에 의존하지 마라.&quot;</li></ul><p>그리고 저자가 이를 직관적으로 해석한 내용은 다음과 같다.</p><ul><li>&quot;자신보다 변하기 쉬운 것에 의존하지 마라.&quot;</li></ul></div><h3 id="잘못된-개념-바로잡기" tabindex="-1"><a class="header-anchor" href="#잘못된-개념-바로잡기"><span>잘못된 개념 바로잡기</span></a></h3><p>그리고 잘못된 개념을 바로 잡는 것들도 인상적이었다.</p><p>객체지향에서는 <code>상속(inherit)</code>이라는 단어를 많이 사용한다. 그런데 사실 이 단어는 잘못 된 것이고 <code>확장(extend)</code>가 맞다.</p><p>또한 클래스 상속 <u>코드를 작성할 때도 inherit이 아니라 extend를 사용한다.</u></p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">Human</span> <span class="token keyword">extends</span> <span class="token class-name">Animal</span> <span class="token punctuation">{</span> <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>상속은 일종 <code>가계도</code>라고 생각하면 된다.</p><img src="https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuKfEB4fHK7exTS6RgIslDxMyMTwWf91Oh908bK0LJK8IdRm4B9GC5NezPGUOdyB5bQYWgsi7L9i4ffEXT0fNie9kT4PcIafgNYoGvv2Qbm9q0000" alt="uml diagram"><p>그리고 여기서 만들어지는 코드는 이렇다.</p><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">할아버지 father <span class="token operator">=</span> <span class="token keyword">new</span> 아버지<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>위의 코드가 어색하다면 객체지향을 잘 이해하고 있는 것이다.</p><p>객체지향은 <code>다형성(Polymorphism)</code>이 지켜져야 하고, 다형성에는 <code>대체가능성</code> 이라는 개념이 있다.</p><div class="custom-container tip"><p class="custom-container-title">대체가능성</p><p>확장(extends)된 객체는 원본으로 대체 가능하다.</p></div><p>일단 <u>&quot;아버지는 할아버지인가?&quot;</u> 에 대해서도 &quot;그렇다&quot; 라고 할 수 없으며,<br> 더불어 &quot;<u>아버지가 할아버지를 대체할 수 있는가?</u>&quot; 에 대해 &quot;그렇다&quot; 라고 답할 수도 없다.</p><p>그렇기 때문에 <em>&quot;상속&quot; 이라는 단어와 개념은 잘못 된 것</em>이다.</p><p>그럼 다음의 경우에는 어떨까?</p><img src="https://www.plantuml.com/plantuml/svg/SoWkIImgAStDuKfEB4fHK7hTF_FrcZrA2ed52ebGeRVzQzxCMV1wwGomQ19KzCti2MywrhwPkmKicWnJsxVsrVOMi50ALEZLvWMlvq7qfd9n9Ihewje13Ka2qybGEWLAft8bA-X6PsIcfAJcnG95Kv1ugLmEgNafG9S20000" alt="uml diagram"><div class="language-java line-numbers-mode" data-highlighter="prismjs" data-ext="java" data-title="java"><pre><code><span class="line">동물 뽀로로 <span class="token operator">=</span> <span class="token keyword">new</span> 펭귄<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>뽀로로는 펭귄이면서 동물이다. 그러므로 대체가능성이 성립한다.</p><div class="custom-container tip"><p class="custom-container-title">Define of Class(클래스)</p><p>클래스는 사전적인 의미로 <code>집합</code> <code>종류</code> <code>속하다</code> <code>분류하다</code> 등이 있다. 그렇기 때문에 <u>&quot;클래스를 상속하다&quot;는 것은 잘못된 표현이다.</u></p><ul><li><s>클래스를 상속하다</s></li><li><strong>클래스를 확장하다</strong></li></ul></div><p>이렇듯 저자는 객체지향에서 통용되고 있는 잘못된 지식을 이해하기 쉽게 바로 잡도록 도와준다.</p><h3 id="인간지향적인-객체지향" tabindex="-1"><a class="header-anchor" href="#인간지향적인-객체지향"><span>인간지향적인 객체지향</span></a></h3><p>흔히들 객체지향은 인간 세상을 코드에 반영한 것이라고 한다.</p><p>그리고 저자는 이를 예제에 적절하게 반영하여 어째서 객체지향이 인간 중심적인지를 보여준다.</p><h2 id="결론" tabindex="-1"><a class="header-anchor" href="#결론"><span>결론</span></a></h2><p>이 책은 자바와 스프링을 전문적으로 다루는 책이 아니다. 말 그대로 나처럼 객체 지향의 개념을 이해하고자 하는 사람들에게 필요한 책이다. 저자는 다음 조건에 충족하는 사람들이 이 책을 접했을 때 좋다고 말한다.</p><ul><li>객체 지향의 특성과 설계 원리를 이해하고자 하는 개발자</li><li>스프링 프레임워크에 입문하는 데 기초 지식이 부족하다고 느끼는 개발자</li></ul><p>그리고 나 또한 그렇게 생각한다. <u>여태 까지 내가 읽어본 책 중에서 제일 명료하고 이해하기 쉬운 책이다.</u></p>`,32);function q(y,j){const a=l("ExternalLinkIcon");return o(),i("div",null,[c,e("p",null,[n("본 포스트는 "),e("a",d,[n("스프링 입문을 위한 자바 객체지향의 원리와 이해"),t(a)]),n("라는 책에 대한 소개입니다.")]),u,e("p",null,[n("최근에 Spring과 OOP 공부를 하면서 2년전에 참고했던 "),e("a",h,[n("여름나라 겨울이야기"),t(a)]),n(" 라는 블로그의 글이 생각나서 다시 정독했다.")]),m,v,g,e("ul",null,[e("li",null,[e("a",k,[n('블로그 - "여름나라 겨울이야기"'),t(a)])]),e("li",null,[e("a",f,[n("GitHub"),t(a)])]),e("li",null,[e("a",_,[n("링크드인"),t(a)])]),e("li",null,[e("a",b,[n("페이스북"),t(a)])]),e("li",null,[e("a",w,[n('유튜브 - "초보람보"'),t(a)])])]),x])}const I=s(p,[["render",q],["__file","index.html.vue"]]),P=JSON.parse('{"path":"/Book/OOP-Principle/00-Intro/","title":"00 책 소개 | 객체지향의 원리와 이해","lang":"en-US","frontmatter":{"title":"00 책 소개 | 객체지향의 원리와 이해","description":"김종민님이 저술한 \\"스프링 입문을 위한 (자바) 객체지향의 원리와 이해\\"에 대한 소개입니다.","sidebarDepth":2,"date":"2020-02-17T13:00:00.000Z","tag":"책","thumbnail":"http://image.kyobobook.co.kr/images/book/xlarge/940/x9788998139940.jpg"},"headers":[{"level":2,"title":"책을 구매하게 된 계기","slug":"책을-구매하게-된-계기","link":"#책을-구매하게-된-계기","children":[]},{"level":2,"title":"저자 소개","slug":"저자-소개","link":"#저자-소개","children":[]},{"level":2,"title":"책을 읽으면서 인상 깊었던 점","slug":"책을-읽으면서-인상-깊었던-점","link":"#책을-읽으면서-인상-깊었던-점","children":[{"level":3,"title":"이해하기 쉽도록 전달","slug":"이해하기-쉽도록-전달","link":"#이해하기-쉽도록-전달","children":[]},{"level":3,"title":"잘못된 개념 바로잡기","slug":"잘못된-개념-바로잡기","link":"#잘못된-개념-바로잡기","children":[]},{"level":3,"title":"인간지향적인 객체지향","slug":"인간지향적인-객체지향","link":"#인간지향적인-객체지향","children":[]}]},{"level":2,"title":"결론","slug":"결론","link":"#결론","children":[]}],"git":{"updatedTime":1725358975000},"filePathRelative":"Book/OOP-Principle/00-Intro/README.md"}');export{I as comp,P as data};