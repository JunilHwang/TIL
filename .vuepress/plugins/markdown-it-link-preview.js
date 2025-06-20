const fs = require('fs');
const path = require('path');

// 메타데이터 캐시 로드
let linkMetadata = {};
try {
  const metadataPath = path.join(__dirname, '..', 'link-metadata.json');
  if (fs.existsSync(metadataPath)) {
    linkMetadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
  }
} catch (error) {
  console.warn('링크 메타데이터 파일을 로드할 수 없습니다:', error.message);
}

// 링크 미리보기 HTML 생성
function generatePreviewHTML(metadata) {
  const { title, description, image, siteName, url } = metadata;

  return `
    <div class="link-preview">
      <a href="${url}" target="_blank" rel="noopener noreferrer">
        ${image ? `<div class="link-preview-image">
          <img src="${image}" alt="${title}" />
        </div>` : ''}
        <div class="link-preview-content">
          <div class="link-preview-title">${title}</div>
          ${description ? `<div class="link-preview-description">${description}</div>` : ''}
          <div class="link-preview-url">${siteName}</div>
        </div>
      </a>
    </div>
  `;
}


module.exports = function linkPreviewPlugin(md) {
  // 원본 링크 렌더링 함수 저장
  const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, renderer) {
    return renderer.renderToken(tokens, idx, options);
  };

  // 링크 렌더링 규칙 오버라이드
  md.renderer.rules.link_open = function (tokens, idx, options, env, renderer) {
    const token = tokens[idx];
    const hrefIndex = token.attrIndex('href');

    if (hrefIndex >= 0) {
      const href = token.attrs[hrefIndex][1];

      // 외부 링크이고 HTTP/HTTPS로 시작하는 경우만 처리
      if (href.startsWith('http://') || href.startsWith('https://')) {
        const nextToken = tokens[idx + 1];
        const closeToken = tokens[idx + 2];

        // 텍스트 토큰이 있고 "link-preview"가 포함된 경우
        if (nextToken && nextToken.type === 'text' &&
          closeToken && closeToken.type === 'link_close' &&
          nextToken.content.includes('link-preview')) {

          // 링크 미리보기로 변환
          const metadata = linkMetadata[href] || {
            title: href,
            description: '',
            image: '',
            siteName: new URL(href).hostname,
            url: href
          };

          // 미리보기 HTML로 대체
          nextToken.content = generatePreviewHTML(metadata);
          nextToken.type = 'html_inline';
          
          // link_open과 link_close 토큰을 빈 문자열로 만들어서 무효화
          return '';
        }
      }
    }

    return defaultRender(tokens, idx, options, env, renderer);
  };

  // link_close도 처리
  md.renderer.rules.link_close = function (tokens, idx, options, env, renderer) {
    const openToken = tokens[idx - 2];
    if (openToken && openToken.attrGet && openToken.attrGet('href')) {
      const href = openToken.attrGet('href');
      if ((href.startsWith('http://') || href.startsWith('https://')) && 
          tokens[idx - 1] && tokens[idx - 1].type === 'html_inline') {
        return '';  // 미리보기로 변환된 경우 닫는 태그도 무효화
      }
    }
    return '</a>';
  };

  // 사용자 정의 컨테이너도 유지 (기존 사용법 호환성)
  md.use(require('markdown-it-container'), 'link-preview', {
    validate: function (params) {
      return params.trim().match(/^link-preview\s+(.*)$/);
    },

    render: function (tokens, idx) {
      const m = tokens[idx].info.trim().match(/^link-preview\s+(.*)$/);

      if (tokens[idx].nesting === 1) {
        const url = m[1];

        // 파일에서 메타데이터 가져오기
        const metadata = linkMetadata[url] || {
          title: url,
          description: '',
          image: '',
          siteName: new URL(url).hostname,
          url
        };

        return generatePreviewHTML(metadata);
      } else {
        return '';
      }
    }
  });
};
