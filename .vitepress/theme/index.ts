import DefaultTheme from 'vitepress/theme';
import Posts from './components/Posts.vue';
import './styles/index.scss';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Nanum Gothic', 'Noto Sans KR', 'Nanum Gothic Coding', 'Nanum Myeongjo']
  },
});

export default {
  ...DefaultTheme,
  enhanceApp({app}) {
    // register global components
    app.component('Posts', Posts)
  }
}