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
  // 사용자 정의 컨테이너 추가
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
