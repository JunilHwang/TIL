<script lang="ts" setup>
import { watch, ref, onMounted } from "vue";
import { usePageData } from "@vuepress/client";

const pageData = usePageData();

const $root = ref<HTMLDivElement>();

function init() {
  $root.value.innerHTML = '';
  const $script = document.createElement('script');
  $script.setAttribute('issue-term', 'pathname');
  $script.setAttribute('theme', 'github-light');
  $script.setAttribute('repo', `junilhwang/blog-comment`);
  $script.type = 'text/javascript';
  $script.async = true;
  $script.crossOrigin = 'anonymous';
  $script.src = 'https://utteranc.es/client.js';
  $root.value.appendChild($script);
}

onMounted(init);

watch(() => pageData.value.path, init);
</script>

<template>
  <div ref="$root"></div>
</template>
