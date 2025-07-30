<script lang="ts" setup>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue';
import { usePageData } from "@vuepress/client";
import { computed } from "vue";

import { Comment, Footer, Posts } from "../components";
import { usePosts } from "../hooks";

const posts = usePosts();
const pageData = usePageData();

// const baseURL = `https://junilhwang.github.io/TIL`;
// const hitUrl = computed(() => `https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=${baseURL}${pageData.value.path}&count_bg=%230099FF&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=%EC%A1%B0%ED%9A%8C%EC%88%98&edge_flat=true`);

const relationPosts = computed(() => {
  const alwaysPost = !pageData.value.path.includes('as-requirements-change') ? posts.value.find(v => v.path.includes('as-requirements-change')) : undefined;
  const { tag: tags } = pageData.value.frontmatter;
  if (!tags) return [alwaysPost].filter(Boolean);
  const tagList = tags.split(',').map(v => v.trim());
  const lists = posts.value.filter(v => !v.path.includes('as-requirements-change') && tagList.some(tag => v.tag.includes(tag as string)));
  const current = lists.find(v => v.title === pageData.value.title);
  const index = lists.indexOf(current);
  return [ alwaysPost, ...lists.slice(Math.max(index - 5, 0), index + 5).filter(v => v !== current) ].filter(Boolean);
})
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <Comment/>

      <section class="relations" v-if="relationPosts.length > 0">
        <h2>관련글</h2>
        <Posts :items="relationPosts"/>
      </section>
    </template>
  </ParentLayout>

  <Footer/>
</template>

<style lang="scss">
@import "../../styles/mixins";

.hit {
  @include only-pc {
    right: calc(50% - 400px);
  }
  position: absolute;
  top: 80px;
  right: 10px;
}

.relations {
  @include only-pc {
    width: 800px;
    margin: 50px auto;
  }

  margin: 50px 0;

  h2 {
    margin: 0 10px;
    border: none;
    font-size: 19px;
  }
}

</style>
