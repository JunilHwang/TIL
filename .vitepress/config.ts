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
    ]
  },
  base: '/TIL/',
});


const posts = glob.sync('!(node_modules)/**/*.md')
  .map(f => {
    const data = fs.readFileSync(f, "utf8");
    if (data.match(/disabledPost: true/)?.[1].trim()) return;
    return {
      title: data.match(/title:(.*)/)?.[1].trim(),
      description: data.match(/description:(.*)/)?.[1].trim(),
      createdAt: new Date(data.match(/date:(.*)/)?.[1].trim() || fs.statSync(f).birthtime).getTime(),
    }
  })
  .filter(v => Boolean(v?.title))
  .sort((a, b) => b.createdAt - a.createdAt);

(config.themeConfig as any).posts = posts;


export default config;