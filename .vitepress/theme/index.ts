import DefaultTheme from 'vitepress/theme';
import Posts from './components/Posts.vue';

export default {
  ...DefaultTheme,
  enhanceApp({app}) {
    // register global components
    app.component('Posts', Posts)
  }
}