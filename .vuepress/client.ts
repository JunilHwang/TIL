import { defineClientConfig } from '@vuepress/client';
import MainPage from './theme/layouts/MainPage.vue';

export default defineClientConfig({
  enhance({ app }) {
    app.component('MainPage', MainPage)
  },
})