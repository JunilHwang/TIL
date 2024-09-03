import { defineClientConfig } from '@vuepress/client';
import MainPage from './theme/layouts/MainPage.vue';
import Layout from './theme/layouts/Layout.vue';

export default defineClientConfig({
  layouts: {
    MainPage,
    Layout,
  },
})
