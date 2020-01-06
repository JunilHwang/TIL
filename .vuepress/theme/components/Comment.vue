<template>
  <div id="comment"></div>
</template>
<script>
export default {
  mounted() {
    const utterances = document.createElement('script');
    utterances.setAttribute('issue-term', 'pathname');
    utterances.setAttribute('theme','github-light');
    utterances.setAttribute('repo',`junilhwang/blog-comment`);
    utterances.type = 'text/javascript';
    utterances.async = true;
    utterances.crossorigin = 'anonymous';
    utterances.src = 'https://utteranc.es/client.js';
    window.document.getElementById('comment').appendChild(utterances);
  }
}
</script>
