import {defineConfig} from 'vitepress'
import {glob} from "glob";
import * as fs from "fs";


const config = defineConfig({
  title: '개발자 황준일',
  description: 'Today I leanred',
  lang: 'ko',
  themeConfig: {
    logo: 'https://avatars1.githubusercontent.com/u/18749057?s=460&v=4',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/About/' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/JunilHwang' },
      { icon: 'facebook', link: 'https://www.facebook.com/profile.php?id=100013271537671' },
      { icon: 'instagram', link: 'https://www.instagram.com/hwang_junil/' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/%EC%A4%80%EC%9D%BC-%ED%99%A9-3053911ba/' },
    ]
  },
  base: '/TIL/',
  head: [
    ['script', { src: "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js" }],
    ['script', {}, `
      WebFont.load({
        google: {
          families: ['Nanum Gothic', 'Noto Sans KR', 'Nanum Gothic Coding', 'Nanum Myeongjo']
        },
        active() {
          var tid = setInterval(function() {
            if (document.body) {
              document.body.classList.remove("hidden");
              clearInterval(tid);
            }
          }, 500);
        }
      });
  `.trim()]
  ]
});

const getProperty = (data, property) => {
  const reg = new RegExp(`${property}:(.*)`);
  return data.match(reg)?.[1].trim();
}

const posts = glob.sync('!(node_modules)/**/*.md')
  .map(path => {
    const data = fs.readFileSync(path, "utf8");
    if (data.match(/disabledPost: true/)?.[1].trim()) return;
    return {
      path: `/TIL/${path}`,
      title: getProperty(data, 'title'),
      description: getProperty(data, 'description'),
      createdAt: new Date(getProperty(data, 'date') || fs.statSync(path).birthtime).getTime(),
    }
  })
  .filter(v => Boolean(v?.title))
  .sort((a, b) => b.createdAt - a.createdAt);

(config.themeConfig as any).posts = posts;


export default config;