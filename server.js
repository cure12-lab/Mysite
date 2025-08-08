const http = require('http');
const fs = require('fs');
let logs = [];

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/data') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(logs));
    return;
  }

  if (req.method === 'POST' && req.url === '/log') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        logs.push(JSON.parse(body));
      } catch (e) {}
      res.end('OK');
    });
    return;
  }

  const fileMap = {
    '/': 'index.html',
    '/style.css': 'style.css',
    '/script.js': 'script.js',
    '/admin.html': 'admin.html'
  };

  const path = fileMap[req.url] || req.url.slice(1);
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
    } else {
      res.end(data);
    }
  });
});

server.listen(8000, () => {
  console.log('Running on http://localhost:8000');
});
