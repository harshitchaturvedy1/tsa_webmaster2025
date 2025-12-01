const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const loginHandler = require('./api/login');
const signupHandler = require('./api/signup');
const verifyHandler = require('./api/verify');
const logoutHandler = require('./api/logout');

const PORT = 5000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function serveStaticFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1>');
      return;
    }
    
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    res.writeHead(200, { 
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });
    res.end(data);
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  if (pathname.startsWith('/api/')) {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      try {
        req.body = body ? JSON.parse(body) : {};
      } catch (e) {
        req.body = {};
      }
      req.query = parsedUrl.query;
      
      const mockRes = {
        statusCode: 200,
        headers: {},
        setHeader: function(key, value) {
          this.headers[key] = value;
        },
        status: function(code) {
          this.statusCode = code;
          return this;
        },
        json: function(data) {
          res.writeHead(this.statusCode, { 
            'Content-Type': 'application/json',
            ...this.headers 
          });
          res.end(JSON.stringify(data));
        },
        end: function() {
          res.writeHead(this.statusCode, this.headers);
          res.end();
        }
      };
      
      try {
        if (pathname === '/api/login') {
          await loginHandler(req, mockRes);
        } else if (pathname === '/api/signup') {
          await signupHandler(req, mockRes);
        } else if (pathname === '/api/verify') {
          await verifyHandler(req, mockRes);
        } else if (pathname === '/api/logout') {
          await logoutHandler(req, mockRes);
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'API endpoint not found' }));
        }
      } catch (error) {
        console.error('API error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    });
    return;
  }
  
  if (pathname === '/') {
    pathname = '/index.html';
  }
  
  const filePath = path.join(__dirname, pathname);
  
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    const indexPath = path.join(filePath, 'index.html');
    if (fs.existsSync(indexPath)) {
      serveStaticFile(indexPath, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Not Found</h1>');
    }
  } else if (fs.existsSync(filePath)) {
    serveStaticFile(filePath, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Development server running at http://0.0.0.0:${PORT}/`);
  console.log('API endpoints available at /api/login, /api/signup, /api/verify, /api/logout');
});
