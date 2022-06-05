<script setup>
import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue';

import { Footer } from "../components";
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <Footer />
    </template>
  </ParentLayout>
</template>

<style lang="css">
</style>