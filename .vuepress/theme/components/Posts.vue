<script lang="ts" setup>
import { defineProps } from "vue";
import {IPostItem} from "../../type";
import PostItem from "./PostItem.vue";

const props = defineProps<{
  items: IPostItem[]
}>();
</script>

<template>
  <ul>
    <li v-for="(item, key) in items" :key="key">
      <PostItem :item="item" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
}

ul {
  display: flex;
  flex-flow: wrap;
  padding: 40px 0;
}

li {
  width: calc(100% / 3);
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
</style>