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

  return `<a href="url">${title}</a>`;
}


module.exports = function linkPreviewPlugin(md) {
  // [link-preview: <url>] 형식 파싱을 위한 인라인 룰 추가
  function linkPreviewInline(state, silent) {
    const start = state.pos;
    const max = state.posMax;

    // [link-preview: 로 시작하는지 확인
    if (start + 15 >= max) return false;

    const marker = state.src.slice(start, start + 15);
    if (marker !== '[link-preview: ') return false;

    // 닫는 ] 찾기
    let pos = start + 15;
    while (pos < max) {
      if (state.src.charAt(pos) === ']') {
        break;
      }
      pos++;
    }

    if (pos >= max) return false;

    // URL 추출
    const url = state.src.slice(start + 15, pos).trim();

    if (silent) return true;

    // 메타데이터 가져오기
    let siteName = '';
    try {
      siteName = new URL(url).hostname;
    } catch {
      siteName = url;
    }

    const metadata = linkMetadata[url] || {
      title: url,
      description: '',
      image: '',
      siteName: siteName,
      url: url
    };

    // HTML 토큰 생성
    const token = state.push('html_inline', '', 0);
    token.content = generatePreviewHTML(metadata);

    state.pos = pos + 1; // ']' 길이만큼 이동
    return true;
  }

  // 인라인 룰 등록
  md.inline.ruler.before('link', 'link_preview_inline', linkPreviewInline);

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
        } catch {
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
