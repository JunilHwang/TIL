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
  const regex = /::: link-preview\s+(https?:\/\/[^\s]+)/g;
  const urls = [];
  let match;
  
  while ((match = regex.exec(content)) !== null) {
    urls.push(match[1]);
  }
  
  return urls;
}

// 메인 실행 함수
async function buildLinkMetadata() {
  console.log('🔍 링크 미리보기 메타데이터 수집 시작...');
  
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
  
  const metadata = {};
  
  // 각 URL에 대해 메타데이터 수집
  for (const url of allUrls) {
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
  const outputPath = path.join('.vuepress', 'link-metadata.json');
  fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2));
  
  console.log(`✅ 메타데이터 파일 저장 완료: ${outputPath}`);
  console.log(`📦 총 ${Object.keys(metadata).length}개의 링크 처리됨`);
}

// 스크립트 실행
if (require.main === module) {
  buildLinkMetadata().catch(console.error);
}

module.exports = { buildLinkMetadata, fetchMetadata };