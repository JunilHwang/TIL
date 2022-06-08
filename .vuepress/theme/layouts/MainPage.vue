<script lang="ts" setup>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue';
import {computed, reactive} from "vue";

import {Footer, Posts} from "../components";
import {IPostItem} from "../../type";

const PAGE_SIZE = 9;
const PAGE_KEY = '__CURRENT_PAGE__';

const state = reactive({
  posts: (window as { __GLOBAL_POSTS__ }).__GLOBAL_POSTS__ as IPostItem[],
  currentPage: Number(sessionStorage.getItem(PAGE_KEY) || 1),
  selectedTag: '전체',
})

const tagsAndCount = computed(() =>
  state.posts.reduce((acc, item) => {
    const tags = item.tag.split(",").map(v => v.trim());
    for (const tag of tags) {
      acc[tag] = (acc[tag] || 0) + 1;
    }
    return acc;
  }, {['전체']: state.posts.length} as Record<string, number>));

const selectedTagItems = computed(() => {
  const { selectedTag } = state;
  return selectedTag === '전체' ? state.posts : state.posts.filter(v => v.tag.includes(selectedTag));
})

const currentItems = computed(() => {
  const start = (state.currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  return selectedTagItems.value.slice(start, end);
});

const lastPage = computed(() => Math.ceil(selectedTagItems.value.length / PAGE_SIZE));

function selectPage(page: number) {
  state.currentPage = page;
  sessionStorage.setItem(PAGE_KEY, String(page));
}

function selectTag(tag: string) {
  state.selectedTag = tag.trim();
  selectPage(1);
}
</script>

<template>
  <ParentLayout class="main-page">
    <template #page-content-top>
      <section>
        <div class="tags">
          <a
            v-for="(count, tag) in tagsAndCount"
            :key="tag"
            href="#"
            :class="{ active: tag === state.selectedTag }"
            @click.prevent="selectTag(tag)"
          >
            #{{ tag.toUpperCase() }} <strong v-html="count" />
          </a>
        </div>

        <Posts :items="currentItems" @select-tag="selectTag" />

        <div class="pagination">
          <button
            v-for="i in lastPage"
            :key="i"
            :class="{ active: i === state.currentPage }"
            v-html="i"
            @click="selectPage(i)"
          />
        </div>
      </section>
    </template>
  </ParentLayout>

  <Footer />
</template>

<style lang="scss" scoped>
@import "../../styles/mixins";

.main-page {
  background: var(--c-bg-light);
}

section {
  padding: 0 0 40px 0;
}

.tags {
  display: flex;
  flex-flow: wrap;
  padding: 0 10px 20px;

  a {
    padding: 5px 10px;
    background: var(--c-bg);
    color: var(--c-text);
    font-size: 12px;
    text-align: right;
    border-radius: 3px;
    margin-bottom: 3px;
    margin-right: 3px;
    font-family: var(--font-family-tag);
    transition: 0.3s;

    &:hover {
      text-decoration: none;
    }

    &.active {
      background: var(--c-brand);
      color: var(--c-bg);
    }
  }

  strong {
    color: inherit;
  }
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    background: var(--c-bg);
    color: var(--c-text-quote);
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 3px;
    cursor: pointer;

    &.active {
      background: var(--c-brand);
      color: var(--c-bg);
    }

    + button {
      margin-left: 4px;
    }
  }
}
</style>