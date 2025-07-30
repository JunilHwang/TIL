const generateOgMetaPlugin = () => {
  return {
    name: 'og-meta-plugin',

    onInitialized(app) {
      // posts 데이터를 읽어오기 (posts.json 대신 직접 계산)
      const posts = app.pages
        .map(page => {
          if (!page.frontmatter.title) return null;

          return {
            path: page.path,
            title: page.frontmatter.title,
            description: page.frontmatter.description,
            thumbnail: page.frontmatter.thumbnail,
            tag: page.frontmatter.tag,
          };
        })
        .filter(post => post !== null);

      // 각 페이지에 대해 OpenGraph 메타태그 추가
      app.pages.forEach(page => {
        const post = posts.find(post => post.path === page.path);

        if (post && post.title) {
          // 기존 head 배열이 없으면 생성
          if (!page.frontmatter.head) {
            page.frontmatter.head = [];
          }

          // og:title
          page.frontmatter.head.push(['meta', { property: 'og:title', content: post.title }]);

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
          page.frontmatter.head.push(['meta', {
            property: 'og:url',
            content: `https://junilhwang.github.io/TIL${post.path}`
          }]);

          // og:type
          page.frontmatter.head.push(['meta', { property: 'og:type', content: 'article' }]);

          // og:site_name
          page.frontmatter.head.push(['meta', { property: 'og:site_name', content: '개발자 황준일' }]);

          // Twitter Card
          page.frontmatter.head.push(['meta', { name: 'twitter:card', content: 'summary_large_image' }]);
          page.frontmatter.head.push(['meta', { name: 'twitter:title', content: post.title }]);

          if (post.description) {
            page.frontmatter.head.push(['meta', { name: 'twitter:description', content: post.description }]);
          }

          if (post.thumbnail) {
            const thumbnailUrl = post.thumbnail.startsWith('http')
              ? post.thumbnail
              : `https://junilhwang.github.io/TIL/${post.thumbnail}`;
            page.frontmatter.head.push(['meta', { name: 'twitter:image', content: thumbnailUrl }]);
          }

          console.log(`OpenGraph 메타태그 추가됨: ${page.path}`);
        }
      });
    }
  };
};

module.exports = generateOgMetaPlugin;
