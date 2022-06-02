<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  post: {
    title: string;
    description: string;
    createdAt: number;
    thumbnail?: string;
  }
}>();
</script>

<template>
  <article>
    <h3>{{ post.title }}</h3>
    <p>{{ post.description }}</p>
    <p>{{ post.createdAt }}</p>
  </article>
</template>

<style lang="scss" scoped>
article {
  border-bottom: 1px solid #eee;
}
</style>