<script setup>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue';

import { Footer, Comment } from "../components";
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <Comment />
    </template>
  </ParentLayout>

  <Footer />
</template>

<style lang="css">
</style>