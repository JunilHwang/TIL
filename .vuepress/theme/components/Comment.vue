<template>
  <div>
    <div id="comment"></div>
  </div>
</template>
<script>
export default {
  watch: {
    '$route.path': function () {
      this.$el.innerHTML = '<div id="comment"></div>';
      this.init();
    }
  },
  methods: {
    init() {
      const utterances = document.createElement('script');
      utterances.setAttribute('issue-term', 'pathname');
      utterances.setAttribute('theme', 'github-light');
      utterances.setAttribute('repo', `junilhwang/blog-comment`);
      utterances.type = 'text/javascript';
      utterances.async = true;
      utterances.crossorigin = 'anonymous';
      utterances.src = 'https://utteranc.es/client.js';
      window.document.getElementById('comment').appendChild(utterances);
    }
  },
  mounted() {
    this.init();
  }
}
</script>
