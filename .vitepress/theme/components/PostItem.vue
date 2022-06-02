<script lang="ts" setup>
import { defineProps } from "vue";
import {useRouter} from "vitepress";

const props = defineProps<{
  post: {
    path: string;
    title: string;
    description: string;
    createdAt: number;
    thumbnail?: string;
  }
}>();

const router = useRouter();
</script>

<template>
  <a
    :href="post.path.replace('.md', '.html')"
  >
    <article>
      <h3>{{ post.title }}</h3>
      <p>{{ post.description }}</p>
      <p>{{ post.createdAt }}</p>
    </article>
  </a>
</template>

<style lang="scss" scoped>
article {
  border-bottom: 1px solid #eee;
}
</style>