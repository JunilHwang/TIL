<script setup>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue';
import {usePageData} from "@vuepress/client";
import {computed, watch} from "vue";

import {Footer, Comment} from "../components";

const pageData = usePageData();

const baseURL = `https://junilhwang.github.io/TIL`;

const hitUrl = computed(() => `https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=${baseURL}${pageData.value.path}&count_bg=%230099FF&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=%EC%A1%B0%ED%9A%8C%EC%88%98&edge_flat=true`)
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

</style>