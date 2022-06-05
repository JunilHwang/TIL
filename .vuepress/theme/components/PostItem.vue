<script lang="ts" setup>
import {defineProps, computed} from "vue";
import {IPostItem} from "../../type";
import {withBase} from "@vuepress/client";

const props = defineProps<{
  item: IPostItem
}>();

const thumbnailUri = computed(() => {
  if (props.item.thumbnail) {
    return withBase(props.item.thumbnail);
  }

  const num = [1, 2, 3].sort(() => Math.random() - 0.5).pop();
  return withBase(`/assets/no-image-${num}.jpg`);
});

const createdAt = computed(() => new Date(props.item.createdAt).toDateString())
</script>

<template>
  <article>
    <router-link :to="item.path" class="figure">
      <img :src="thumbnailUri" alt="no-image" />
    </router-link>

    <router-link :to="item.path" class="info">

      <h4 v-html="item.title" />

      <p v-html="item.description" />

    </router-link>

    <time v-html="createdAt" />
  </article>
</template>

<style lang="scss" scoped>
article {
  border-radius: 3px;
  overflow: hidden;
  background: var(--c-bg);
  box-shadow: 0 4px 16px 0 var(--c-bg-box-shadow);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  .figure {
    display: block;
    margin: 0;
    position: relative;
    padding-top: 60%;

    img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .info {
    display: block;
    margin: 10px;
    letter-spacing: -0.5px;
    height: 120px;

    &:hover {
      text-decoration: none;
    }
  }

  h4 {
    color: var(--c-text);
    margin: 0;
  }

  p {
    margin: 10px 0 0;
    font-size: 14px;
    line-height: 1.4;
    color: var(--c-text-lightest);
  }

  time {
    display: block;
    margin: 0 10px 10px;
    font-size: 13px;
    color: var(--c-text-quote);
  }
}
</style>