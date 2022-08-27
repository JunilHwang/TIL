const https = require('https');

const options = {
  hostname: 'github.com',
  port: 443,
  path: '/',
  method: 'GET'
};

function request() {
  let results = '';
  const req = https.request(options, (res) => {
    res.on('data', (d) => {
      results += d.toString();
    });
  });

  req.on('error', (e) => {
    console.error(e);
  });

  req.on('close', () => {
    console.log('results.length: ' + results.length);
  });

  req.end();
}