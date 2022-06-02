import DefaultTheme from 'vitepress/theme';
import Posts from './components/Posts.vue';
import './styles/index.scss';

export default {
  ...DefaultTheme,
  enhanceApp({app}) {
    // register global components
    app.component('Posts', Posts)
  }
}