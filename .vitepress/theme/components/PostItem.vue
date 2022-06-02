<script lang="ts" setup>
import { defineProps, computed } from "vue";
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

const createdAt = computed(() => {
  return new Date(props.post.createdAt).toDateString()
})
</script>

<template>
  <a
    :href="post.path.replace('.md', '.html')"
  >
    <article>
      <h3>{{ post.title }}</h3>
      <p>{{ post.description }}</p>
      <time :datetime="createdAt">{{ createdAt }}</time>
    </article>
  </a>
</template>

<style lang="scss" scoped>
article {
  border-bottom: 1px solid var(--vp-c-divider-light);
  padding-bottom: 40px;
  margin-bottom: 40px;
}

h3 {
  color: var(--vp-c-text-1);
  font-family: "Noto Sans KR",sans-serif;
  font-size: 2rem;
  font-weight: 500;
  margin: 0.5rem 0;
  line-height: normal;
  padding: 0;
  transition: 0.3s;

  article:hover & {
    color: var(--vp-c-brand);
  }
}

p {
  margin: 16px 0;
  padding: 0;
  color: var(--vp-c-text-2);
  line-height: 1.8;
  font-family: -apple-system, Nanum Gothic, Malgun Gothic, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', serif;
}

time {
  color: var(--vp-c-text-3);
  font-weight: normal;
  font-size: 14px;
}
</style>