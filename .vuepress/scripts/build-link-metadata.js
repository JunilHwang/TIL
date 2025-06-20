const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { parse } = require('node-html-parser');
const glob = require('glob');

// 메타데이터 추출 함수
async function fetchMetadata(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const req = protocol.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const root = parse(data);

          const getMetaContent = (property) => {
            const meta = root.querySelector(`meta[property="${property}"]`) ||
              root.querySelector(`meta[name="${property}"]`);
            return meta ? meta.getAttribute('content') : null;
          };

          const title = getMetaContent('og:title') ||
            root.querySelector('title')?.text ||
            url;

          const description = getMetaContent('og:description') ||
            getMetaContent('description') ||
            '';

          const image = getMetaContent('og:image') || '';

          const siteName = getMetaContent('og:site_name') ||
            new URL(url).hostname;

          resolve({
            title: title.trim(),
            description: description.trim(),
            image,
            siteName,
            url
          });
        } catch (error) {
          resolve({
            title: url,
            description: '',
            image: '',
            siteName: new URL(url).hostname,
            url
          });
        }
      });
    });

    req.on('error', () => {
      resolve({
        title: url,
        description: '',
        image: '',
        siteName: new URL(url).hostname,
        url
      });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        title: url,
        description: '',
        image: '',
        siteName: new URL(url).hostname,
        url
      });
    });
  });
}

// 마크다운 파일에서 링크 미리보기 URL 추출
function extractLinkPreviewUrls(content) {
  const urls = [];
  
  // 1. 컨테이너 방식: ::: link-preview URL
  const containerRegex = /::: link-preview\s+(https?:\/\/[^\s]+)/g;
  let match;
  
  while ((match = containerRegex.exec(content)) !== null) {
    urls.push(match[1]);
  }
  
  // 2. 인라인 링크 방식: [텍스트 link-preview](URL)
  const inlineLinkRegex = /\[([^\]]*link-preview[^\]]*)\]\((https?:\/\/[^)]+)\)/g;
  
  while ((match = inlineLinkRegex.exec(content)) !== null) {
    const linkText = match[1]; // [안의 텍스트]
    const url = match[2]; // (안의 URL)
    
    // "link-preview"가 포함된 링크 텍스트인 경우만 수집
    if (linkText.includes('link-preview')) {
      urls.push(url);
    }
  }
  
  return [...new Set(urls)]; // 중복 제거
}

// 메인 실행 함수
async function buildLinkMetadata() {
  console.log('🔍 링크 미리보기 메타데이터 수집 시작...');
  
  // 기존 메타데이터 로드
  const outputPath = path.join('.vuepress', 'link-metadata.json');
  let existingMetadata = {};
  
  if (fs.existsSync(outputPath)) {
    try {
      existingMetadata = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
      console.log(`📋 기존 메타데이터 ${Object.keys(existingMetadata).length}개 로드됨`);
    } catch (error) {
      console.warn('기존 메타데이터 파일을 읽을 수 없습니다:', error.message);
    }
  }
  
  // 모든 마크다운 파일 찾기
  const markdownFiles = glob.sync('**/*.md', { 
    cwd: process.cwd(),
    ignore: ['node_modules/**', '.vuepress/**']
  });
  
  const allUrls = new Set();
  
  // 각 마크다운 파일에서 링크 미리보기 URL 추출
  markdownFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const urls = extractLinkPreviewUrls(content);
    urls.forEach(url => allUrls.add(url));
  });
  
  console.log(`📊 발견된 링크: ${allUrls.size}개`);
  
  // 기존 메타데이터를 복사하여 시작
  const metadata = { ...existingMetadata };
  
  // 새로 수집해야 할 URL들만 필터링
  const newUrls = Array.from(allUrls).filter(url => !existingMetadata[url]);
  const skippedCount = allUrls.size - newUrls.length;
  
  if (skippedCount > 0) {
    console.log(`⏭️  이미 수집된 링크 ${skippedCount}개 건너뜀`);
  }
  
  if (newUrls.length === 0) {
    console.log('🎉 모든 링크의 메타데이터가 이미 수집되어 있습니다!');
    return;
  }
  
  console.log(`🆕 새로 수집할 링크: ${newUrls.length}개`);
  
  // 새로운 URL들에 대해서만 메타데이터 수집
  for (const url of newUrls) {
    try {
      console.log(`🌐 메타데이터 수집 중: ${url}`);
      const meta = await fetchMetadata(url);
      metadata[url] = meta;
      
      // 요청 간 딜레이 (서버 부하 방지)
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.warn(`❌ 메타데이터 수집 실패: ${url}`, error.message);
      metadata[url] = {
        title: url,
        description: '',
        image: '',
        siteName: new URL(url).hostname,
        url
      };
    }
  }
  
  // 메타데이터를 JSON 파일로 저장
  fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2));
  
  console.log(`✅ 메타데이터 파일 저장 완료: ${outputPath}`);
  console.log(`📦 총 ${Object.keys(metadata).length}개의 링크 (신규 ${newUrls.length}개 추가)`);
}

// 스크립트 실행
if (require.main === module) {
  buildLinkMetadata().catch(console.error);
}

module.exports = { buildLinkMetadata, fetchMetadata };