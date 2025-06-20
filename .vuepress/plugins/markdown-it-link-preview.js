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

// 링크 미리보기 HTML 생성 (hydration 안전)
function generatePreviewHTML(metadata) {
  const { title, description, image, siteName, url } = metadata;
  
  // HTML 특수문자 이스케이프
  const escapeHtml = (text) => {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  const escapedTitle = escapeHtml(title);
  const escapedDescription = escapeHtml(description);
  const escapedUrl = escapeHtml(url);
  const escapedImage = escapeHtml(image);
  const escapedSiteName = escapeHtml(siteName);

  return `<div class="link-preview"><a href="${escapedUrl}" target="_blank" rel="noopener noreferrer">${escapedImage ? `<div class="link-preview-image"><img src="${escapedImage}" alt="${escapedTitle}" /></div>` : ''}<div class="link-preview-content"><div class="link-preview-title">${escapedTitle}</div>${escapedDescription ? `<div class="link-preview-description">${escapedDescription}</div>` : ''}<div class="link-preview-url">${escapedSiteName}</div></div></a></div>`;
}


module.exports = function linkPreviewPlugin(md) {
  // 원본 링크 렌더링 함수 저장
  const defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, renderer) {
    return renderer.renderToken(tokens, idx, options);
  };

  const defaultLinkCloseRender = md.renderer.rules.link_close || function (tokens, idx, options, env, renderer) {
    return renderer.renderToken(tokens, idx, options);
  };

  // 링크 렌더링 규칙 오버라이드
  md.renderer.rules.link_open = function (tokens, idx, options, env, renderer) {
    const token = tokens[idx];
    const hrefIndex = token.attrIndex('href');

    if (hrefIndex >= 0) {
      const href = token.attrs[hrefIndex][1];

      // 이미지 링크인지 확인 (이전 토큰이 image인 경우)
      const prevToken = tokens[idx - 1];
      if (prevToken && prevToken.type === 'image') {
        return defaultRender(tokens, idx, options, env, renderer);
      }

      // 외부 링크이고 HTTP/HTTPS로 시작하는 경우만 처리
      if (href.startsWith('http://') || href.startsWith('https://')) {
        const nextToken = tokens[idx + 1];
        const closeToken = tokens[idx + 2];

        // link-preview 처리 조건을 확인
        const isLinkPreview = nextToken && nextToken.type === 'text' &&
          closeToken && closeToken.type === 'link_close' &&
          nextToken.content && nextToken.content.includes('link-preview');

        if (isLinkPreview && idx + 2 < tokens.length) {
          // 링크 미리보기로 변환
          let siteName = '';
          try {
            siteName = new URL(href).hostname;
          } catch (e) {
            siteName = href;
          }
          
          const metadata = linkMetadata[href] || {
            title: href,
            description: '',
            image: '',
            siteName: siteName,
            url: href
          };

          // 미리보기 HTML로 대체
          nextToken.content = generatePreviewHTML(metadata);
          nextToken.type = 'html_inline';
          
          // close 토큰에 표시를 남겨둠
          closeToken.linkPreviewProcessed = true;
          
          // link_open 토큰을 무효화
          return '';
        }
      }
    }

    return defaultRender(tokens, idx, options, env, renderer);
  };

  // link_close도 처리
  md.renderer.rules.link_close = function (tokens, idx, options, env, renderer) {
    const token = tokens[idx];
    
    // link-preview로 처리된 토큰인지 확인
    if (token.linkPreviewProcessed) {
      return '';  // 미리보기로 변환된 경우 닫는 태그도 무효화
    }

    // 기본 렌더링 사용 (내부 링크 등)
    return defaultLinkCloseRender(tokens, idx, options, env, renderer);
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
        let siteName = '';
        try {
          siteName = new URL(url).hostname;
        } catch (e) {
          siteName = url;
        }
        
        const metadata = linkMetadata[url] || {
          title: url,
          description: '',
          image: '',
          siteName: siteName,
          url
        };

        return generatePreviewHTML(metadata);
      } else {
        return '';
      }
    }
  });
};
