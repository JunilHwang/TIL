<script lang="ts" setup>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue';
import {reactive} from "vue";

import {Footer} from "../components";
import Posts from "../components/Posts.vue";
import {IPostItem} from "../../type";

interface Window {
  __GLOBAL_POSTS__: IPostItem[];
}

const state = reactive({
  posts: window.__GLOBAL_POSTS__,
})
</script>

<template>
  <ParentLayout class="main-page">
    <template #page-content-top>
      <Posts :items="state.posts" />
    </template>
  </ParentLayout>

  <Footer />
</template>

<style lang="scss" scoped>
.main-page {
  background: var(--c-bg-light);
}
</style>