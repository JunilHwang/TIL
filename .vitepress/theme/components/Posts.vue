<script lang="ts" setup>
import { useData } from "vitepress";

import PostItem from "./PostItem.vue";

const { theme  } = useData();
</script>

<template>
  <main>
    <post-item v-for="post in theme.posts" :post="post" />
  </main>
</template>

<style lang="scss" scoped>
main {
  display: block;
  margin: 50px auto;
  max-width: 800px;
  width: 100%;
}
</style>