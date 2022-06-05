import {defaultTheme, defineUserConfig, viteBundler, DefaultThemeOptions, Theme} from 'vuepress-vite';
import {pwaPlugin} from '@vuepress/plugin-pwa';
import {googleAnalyticsPlugin} from '@vuepress/plugin-google-analytics';
import {feed} from 'vuepress-plugin-feed2';
// import demoBlock from 'vuepress-plugin-demo-block';
import {sitemap} from 'vuepress-plugin-sitemap2';
import {searchPlugin} from "@vuepress/plugin-search";
import MarkdownItPlantuml from 'markdown-it-plantuml';
import MarkdownItUnderline from 'markdown-it-underline';
import MarkdownItTaskLists from 'markdown-it-task-lists';
import * as path from "path";

import {sidebar} from "./sidebar";

const localTheme = (options: DefaultThemeOptions): Theme => ({
  name: 'vuepress-theme-junilhwang',
  extends: defaultTheme(options),
  layouts: {
    Layout: path.resolve(__dirname, 'theme/layouts/Layout.vue'),
  },
})

export default defineUserConfig({
  title: '개발자 황준일',
  description: 'Today I leanred',
  theme: localTheme({
    logo: 'https://avatars1.githubusercontent.com/u/18749057?s=460&v=4',
    navbar: [
      {text: 'Home', link: '/'},
    ],
    sidebar,
    lastUpdated: true,
    contributors: false,
  }),
  bundler: viteBundler(),
  base: '/TIL/',
  head: [
    ['meta', {name: "google-site-verification", content: "sHfBWIoCUOYFXJ3b0ulN8jp9jpD8SEW5Wpxvlk-UABA"}],
    ['link', {rel: "apple-touch-icon", sizes: "180x180", href: "/assets/favicons/apple-touch-icon.png"}],
    ['link', {rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/favicons/favicon-32x32.png"}],
    ['link', {rel: "icon", type: "image/png", sizes: "16x16", href: "/assets/favicons/favicon-16x16.png"}],
    ['link', {rel: "manifest", href: "/assets/favicons/site.webmanifest"}],
    ['link', {rel: "mask-icon", href: "/assets/favicons/safari-pinned-tab.svg", color: "#3a0839"}],
    ['link', {rel: "shortcut icon", href: "/assets/favicons/favicon.ico"}],
    ['meta', {name: "msapplication-TileColor", content: "#3a0839"}],
    ['meta', {name: "msapplication-config", content: "/assets/favicons/browserconfig.xml"}],
    ['meta', {name: "theme-color", content: "#ffffff"}],
  ],
  extendsMarkdown: md => {
    md.use(MarkdownItPlantuml);
    md.use(MarkdownItUnderline);
    md.use(MarkdownItTaskLists);
  },
  plugins: [
    pwaPlugin({
      serviceWorker: true,
      updatePopup: true
    }),
    feed({
      hostname: 'https://junilhwang.github.io/TIL/',
    }),
    googleAnalyticsPlugin({
      id: 'UA-113171398-2'
    }),
    sitemap({hostname: 'https://junilhwang.github.io/TIL'}),
    searchPlugin({}),
    // demoBlock({}),
  ]
});
