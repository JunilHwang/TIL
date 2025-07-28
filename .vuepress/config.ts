import { defaultTheme, DefaultThemeOptions, defineUserConfig, Theme, viteBundler } from 'vuepress-vite';
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
  const result = data.match(reg)?.[1].trim();
  try {
    return JSON.parse(result);
  } catch {
    return result;
  }
}

const posts = glob.sync('!(node_modules)/**/*.md')
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

// sitemap.xml 생성
const generateSitemap = () => {
  const baseUrl = 'https://junilhwang.github.io/TIL';
  const currentDate = new Date().toISOString();

  const urls = [
    `  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`,
    `  <url>
    <loc>${baseUrl}/About/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
    ...posts.map(post => `  <url>
    <loc>${baseUrl}${post.path}</loc>
    <lastmod>${new Date(post.createdAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`)
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(__dirname, "/public/sitemap.xml"), sitemap);
};

generateSitemap();

// RSS feed 생성
const generateRSS = () => {
  const baseUrl = 'https://junilhwang.github.io/TIL';
  const currentDate = new Date().toISOString();
  const recentPosts = posts.slice(0, 20); // 최근 20개 포스트만

  const items = recentPosts.map(post => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}${post.path}</link>
      <guid>${baseUrl}${post.path}</guid>
      <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
      ${post.description ? `<description><![CDATA[${post.description}]]></description>` : ''}
      ${post.tag ? `<category>${post.tag}</category>` : ''}
    </item>`).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>개발자 황준일</title>
    <link>${baseUrl}</link>
    <description>Today I learned</description>
    <language>ko-KR</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <pubDate>${currentDate}</pubDate>
    <ttl>60</ttl>
${items}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(__dirname, "/public/rss.xml"), rss);
};

generateRSS();

const GAScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-CJPZ4K06KP');

// 링크 클릭 이벤트 추적
document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.href) {
      const isExternal = link.hostname !== window.location.hostname;
      gtag('event', 'click', {
        event_category: 'link',
        event_label: link.href,
        value: isExternal ? 'external' : 'internal'
      });
    }
  });
});
`

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
    ['script', { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-CJPZ4K06KP' }],
    ['script', {}, GAScript],
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
    searchPlugin({}),
    // demoBlock({}),
  ],
});
