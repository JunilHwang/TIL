<script lang="ts" setup>
import {defineProps, computed} from "vue";
import {IPostItem} from "../../type";
import {withBase} from "@vuepress/client";
import {TimeIcon} from "./icons";

const props = defineProps<{
  item: IPostItem
}>();

const emit = defineEmits(['select-tag']);

const thumbnailUri = computed(() => {
  const { thumbnail } = props.item;
  if (!thumbnail) {
    const num = [1, 2, 3].sort(() => Math.random() - 0.5).pop();
    return withBase(`/assets/no-image-${num}.jpg`);
  }

  if (thumbnail.startsWith("~")) {
    return new URL(
      thumbnail.replace("~", "."),
      import.meta.url.replace(".vuepress/theme/components/PostItem.vue", "")
    ).href;
  }
  return thumbnail;
});

const tags = computed(() => {
  return props.item.tag.split(",").map(v => v.trim());
});

function fromNow(timestamp: number) {
  const ms = Date.now() - timestamp;
  const 초 = 1000;
  const 분 = 초 * 60;
  const 시 = 분 * 60;
  const 일 = 시 * 24;
  const 주 = 일 * 7;

  if (ms < 분) {
    return Math.ceil(ms / 초) + '초 전';
  }

  if (ms < 시) {
    return Math.ceil(ms / 분) + '분 전';
  }

  if (ms < 일) {
    return Math.ceil(ms / 시) + '시 전';
  }

  if (ms < 주) {
    return Math.ceil(ms / 일) + '일 전';
  }

  const date = new Date(timestamp);
  const y = date.getFullYear();
  const m = `0${date.getMonth() + 1}`.substr(-2);
  const d = `0${date.getDate()}`.substr(-2);
  const h = `0${date.getHours()}`.substr(-2);
  const i = `0${date.getMinutes()}`.substr(-2);
  return `${y}-${m}-${d} ${h}:${i}`;
}
</script>

<template>
  <article>
    <router-link :to="item.path" class="figure">
      <img :src="thumbnailUri" alt="no-image" />
    </router-link>

    <div>
      <p class="tags">
        <a
          v-for="(tag, key) in tags"
          :key="key"
          href="#"
          @click.prevent="emit('select-tag', tag)"
        >
          #{{tag}}
        </a>
      </p>

      <router-link :to="item.path" class="info">

        <h4 v-html="item.title" />

        <p v-html="item.description" />

      </router-link>

      <time>
        <TimeIcon />
        {{ fromNow(item.createdAt) }}
      </time>
    </div>
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
      border: none;
    }
  }

  > div {
    padding: 10px;
  }

  .tags {
    margin: 0 0 5px;

    a {
      color: var(--c-text-lighter);
      font-family: var(--font-family-tag);

      + a {
        margin-left: 3px;
      }

      &:hover {
        text-decoration: none;
      }
    }
  }

  .info {
    display: block;
    margin-bottom: 10px;
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
    display: flex;
    align-items: center;
    font-size: 13px;
    color: var(--c-text-quote);

    svg {
      width: 18px;
      margin-right: 3px;
    }
  }
}
</style>