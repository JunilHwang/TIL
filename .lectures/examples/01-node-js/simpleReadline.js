const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('당신의 이름을 입력해주세요: ', (answer) => {
  console.log(`당신의 이름을 거꾸로 하면: ${[ ...answer ].reverse().join('')}`);
  rl.close();
});