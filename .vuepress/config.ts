import { defaultTheme, DefaultThemeOptions, defineUserConfig, Theme, viteBundler } from 'vuepress-vite';
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';
import { feed } from 'vuepress-plugin-feed2';
import { sitemap } from 'vuepress-plugin-sitemap2';
import { searchPlugin } from "@vuepress/plugin-search";
import MarkdownItPlantuml from 'markdown-it-plantuml';
import MarkdownItUnderline from 'markdown-it-underline';
import MarkdownItTaskLists from 'markdown-it-task-lists';
import linkPreviewPlugin from './plugins/markdown-it-link-preview';

import * as path from "path";
import * as glob from "glob";
import * as fs from "fs";

const localTheme = (options: DefaultThemeOptions): Theme => ({
  name: 'vuepress-theme-junilhwang',
  extends: defaultTheme(options),
  layouts: {
    Layout: path.resolve(__dirname, 'theme/layouts/Layout.vue'),
  },
})


const getProperty = (data, property) => {
  const reg = new RegExp(`${property}:(.*)`);
  return data.match(reg)?.[1].trim();
}

const posts = glob.sync('!(node_modules)/**/*.md')
  .filter(path => !path.includes('writing/'))
  .map(path => {
    const data = fs.readFileSync(path, "utf8");
    if (Boolean(getProperty(data, 'disabledPost'))) return;

    return {
      path: '/' + path.replace('README.md', ''),
      title: getProperty(data, 'title'),
      tag: getProperty(data, 'tag'),
      description: getProperty(data, 'description'),
      thumbnail: getProperty(data, 'thumbnail'),
      createdAt: new Date(getProperty(data, 'date') || fs.statSync(path).birthtime).getTime(),
    }
  })
  .filter(v => Boolean(v?.title))
  .sort((a, b) => b.createdAt - a.createdAt);

fs.writeFileSync(path.join(__dirname, "/public/posts.json"), JSON.stringify(posts));

export default defineUserConfig({
  title: '개발자 황준일',
  description: 'Today I leanred',
  theme: localTheme({
    logo: 'https://avatars1.githubusercontent.com/u/18749057?s=460&v=4',
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/About/' },
    ],
    sidebar: 'auto',
    lastUpdated: true,
    contributors: false,
  }),
  bundler: viteBundler(),
  base: '/TIL/',
  head: [
    ['meta', { name: "google-site-verification", content: "sHfBWIoCUOYFXJ3b0ulN8jp9jpD8SEW5Wpxvlk-UABA" }],
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/TIL/assets/favicons/apple-touch-icon.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/TIL/assets/favicons/favicon-32x32.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/TIL/assets/favicons/favicon-16x16.png" }],
    ['link', { rel: "manifest", href: "/TIL/manifest.webmanifest" }],
    ['link', { rel: "mask-icon", href: "/TIL/assets/favicons/safari-pinned-tab.svg", color: "#3a0839" }],
    ['link', { rel: "shortcut icon", href: "/TIL/assets/favicons/favicon.ico" }],
    ['link', { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Noto+Serif+KR&display=swap" }],
    ['meta', { name: "msapplication-TileColor", content: "#3a0839" }],
    ['meta', { name: "msapplication-config", content: "/TIL/browserconfig.xml" }],
    ['meta', { name: "theme-color", content: "#ffffff" }],
  ],
  extendsMarkdown: md => {
    md.use(MarkdownItPlantuml);
    md.use(MarkdownItUnderline);
    md.use(MarkdownItTaskLists);
    md.use(linkPreviewPlugin);
  },
  extendsPage: (page) => {
    // README.md (홈페이지)에 posts 데이터 주입
    if (page.filePath?.endsWith('README.md') && page.filePathRelative === 'README.md') {
      page.data.posts = posts;
    }

    // 각 페이지에 대한 OG 메타태그 설정
    const post = posts.find(post => post.path === page.path);
    if (post) {
      page.frontmatter.head = page.frontmatter.head || [];

      // og:title
      if (post.title) {
        page.frontmatter.head.push(['meta', { property: 'og:title', content: post.title }]);
      }

      // og:description
      if (post.description) {
        page.frontmatter.head.push(['meta', { property: 'og:description', content: post.description }]);
      }

      // og:image (thumbnail)
      if (post.thumbnail) {
        const thumbnailUrl = post.thumbnail.startsWith('http')
          ? post.thumbnail
          : `https://junilhwang.github.io/TIL/${post.thumbnail}`;
        page.frontmatter.head.push(['meta', { property: 'og:image', content: thumbnailUrl }]);
      }

      // og:url
      page.frontmatter.head.push(['meta', { property: 'og:url', content: `https://junilhwang.github.io/TIL${post.path}` }]);

      // og:type
      page.frontmatter.head.push(['meta', { property: 'og:type', content: 'article' }]);

      // Twitter Card
      page.frontmatter.head.push(['meta', { name: 'twitter:card', content: 'summary_large_image' }]);
      page.frontmatter.head.push(['meta', { name: 'twitter:title', content: post.title || '개발자 황준일' }]);
      if (post.description) {
        page.frontmatter.head.push(['meta', { name: 'twitter:description', content: post.description }]);
      }
      if (post.thumbnail) {
        const thumbnailUrl = post.thumbnail.startsWith('http')
          ? post.thumbnail
          : `https://junilhwang.github.io/TIL/${post.thumbnail}`;
        page.frontmatter.head.push(['meta', { name: 'twitter:image', content: thumbnailUrl }]);
      }
    }
  },
  plugins: [
    feed({
      hostname: 'https://junilhwang.github.io/TIL/',
      rss: true,
      atom: true,
      json: true,
    }),
    googleAnalyticsPlugin({
      id: 'UA-113171398-2'
    }),
    sitemap({ hostname: 'https://junilhwang.github.io/TIL' }),
    searchPlugin({}),
    // demoBlock({}),
  ],
});
