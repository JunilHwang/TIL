<script lang="ts" setup>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue';
import {usePageData} from "@vuepress/client";
import {computed} from "vue";

import {Comment, Footer, Posts} from "../components";
import {usePosts} from "../hooks";

const posts = usePosts();
const pageData = usePageData();

const baseURL = `https://junilhwang.github.io/TIL`;

const hitUrl = computed(() => `https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=${baseURL}${pageData.value.path}&count_bg=%230099FF&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=%EC%A1%B0%ED%9A%8C%EC%88%98&edge_flat=true`);

const relationPosts = computed(() => {
  const { tag } = pageData.value.frontmatter;
  if (!tag) return [];
  const lists = posts.value.filter(v => v.tag.includes(tag as string));
  const current = lists.find(v => v.path === pageData.value.path);
  const index = lists.indexOf(current);
  return lists.slice(Math.max(index - 3, 0), index + 3).filter(v => v !== current);
})
</script>

<template>
  <ParentLayout>
    <template #page-content-top>
      <div class="hit">
        <img :src="hitUrl" alt="Hits bn" />
      </div>
    </template>
    <template #page-bottom>
      <Comment/>

      <section class="relations" v-if="relationPosts.length > 0">
        <h2>관련글</h2>
        <Posts :items="relationPosts" />
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