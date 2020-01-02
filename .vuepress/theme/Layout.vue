<template>
  <div class="themeContainer">
    <header class="siteHeader">
      <div class="container">
        <router-link to="/" class="siteLogo">
          <figure>
            <img src="https://avatars1.githubusercontent.com/u/18749057?s=460&amp;v=4" alt="개발자 황준일">
          </figure>
          <div>
            <strong>개발자 황준일</strong>
            <em>Today I Learned</em>
          </div>
        </router-link>
      </div>
    </header>
    <main class="content container">
      <Content />
    </main>
    <footer class="siteFooter">
      <div class="container">
        <p class="siteFooterCopyright">
          Copyright &copy; 2019 All Right <em>개발자 황준일</em>
        </p>
        <p class="siteFooterContact">
          tjsdlf4261@gmail.com .
          +82-10-5764-4483 .
          <a href="https://github.com/junilhwang" target="_blank">GitHub</a> .
          <a href="http://junil-hwang.com" target="_blank">Blog</a>
        </p>
      </div>
    </footer>
  </div>
</template>