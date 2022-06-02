<script lang="ts" setup>
import {useData} from "vitepress";
import {computed, reactive} from "vue";

import PostItem from "./PostItem.vue";

const {theme} = useData();

const state = reactive({
  currentPage: 1,
});

const size = 10;

const posts = computed(() => theme.value?.posts || []);

const lastPage = computed(() => Math.ceil(posts.value.length / size))

const nextPage = computed(() => Math.min(state.currentPage + 1, lastPage.value));

const prevPage = computed(() => Math.max(state.currentPage - 1, 1));

const currentItems = computed(() =>
  posts.value.slice(
    (state.currentPage - 1) * size,
    state.currentPage * size
  ));
</script>

<template>
  <main>
    <post-item v-for="post in currentItems" :post="post"/>

    <div>
      <button v-for="i in lastPage" v-html="i" />
    </div>
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