const 초성매칭 = {
  "ㄱ": ['가'.charCodeAt(0), '깋'.charCodeAt(0)],
  "ㄲ": ['까'.charCodeAt(0), '낗'.charCodeAt(0)],
  "ㄴ": ['나'.charCodeAt(0), '닣'.charCodeAt(0)],
  "ㄷ": ['다'.charCodeAt(0), '딯'.charCodeAt(0)],
  "ㄸ": ['따'.charCodeAt(0), '띻'.charCodeAt(0)],
  "ㄹ": ['라'.charCodeAt(0), '맇'.charCodeAt(0)],
  "ㅁ": ['마'.charCodeAt(0), '밓'.charCodeAt(0)],
  "ㅂ": ['바'.charCodeAt(0), '빟'.charCodeAt(0)],
  "ㅃ": ['빠'.charCodeAt(0), '삫'.charCodeAt(0)],
  "ㅅ": ['사'.charCodeAt(0), '싷'.charCodeAt(0)],
  "ㅆ": ['싸'.charCodeAt(0), '앃'.charCodeAt(0)],
  "ㅇ": ['아'.charCodeAt(0), '잏'.charCodeAt(0)],
  "ㅈ": ['자'.charCodeAt(0), '짛'.charCodeAt(0)],
  "ㅉ": ['짜'.charCodeAt(0), '찧'.charCodeAt(0)],
  "ㅊ": ['차'.charCodeAt(0), '칳'.charCodeAt(0)],
  "ㅋ": ['카'.charCodeAt(0), '킿'.charCodeAt(0)],
  "ㅌ": ['타'.charCodeAt(0), '팋'.charCodeAt(0)],
  "ㅍ": ['파'.charCodeAt(0), '핗'.charCodeAt(0)],
  "ㅎ": ['하'.charCodeAt(0), '힣'.charCodeAt(0)],
}

const 초성들 = Object.keys(초성매칭);

function searchWord(word, searchKey) {
  if (word === searchKey) return true;
  if (초성들.includes(searchKey)) {
    const [start, end] = 초성매칭[searchKey];
    const unicode = word.charCodeAt(0);
    return start <= unicode && unicode <= end;
  }
  return false;
}


const keywords = [
  '안녕하세요',
  '감사합니다',
  '안ㄴ하ㅅ요',
];

function search(검색어) {
  return keywords.filter(words => {
    const size = 검색어.length;
    const startIndex = [...words].findIndex(word => searchWord(word, 검색어[0]));
    if (startIndex === -1) return false;
    const range = [ ...words.slice(startIndex, startIndex + size) ];
    if (range.length !== size) return false;
    return range.filter((word, index) => searchWord(word, 검색어[index])).length === size;
  })
}

console.log(
  search('안녕하세요'),
  search('ㅇㄴ하세요'),
  search('안ㄴ하'),
  search('ㄱㅅ'),
);