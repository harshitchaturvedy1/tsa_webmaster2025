const http = require('http');
const url = require('url');

const loginHandler = require('./api/login');
const signupHandler = require('./api/signup');
const verifyHandler = require('./api/verify');
const logoutHandler = require('./api/logout');

const PORT = 3001;

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
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
      body: null,
      setHeader: function(key, value) {
        this.headers[key] = value;
      },
      status: function(code) {
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        this.body = JSON.stringify(data);
        res.writeHead(this.statusCode, { 
          'Content-Type': 'application/json',
          ...this.headers 
        });
        res.end(this.body);
      },
      end: function() {
        res.writeHead(this.statusCode, this.headers);
        res.end();
      }
    };
    
    try {
      if (path === '/api/login') {
        await loginHandler(req, mockRes);
      } else if (path === '/api/signup') {
        await signupHandler(req, mockRes);
      } else if (path === '/api/verify') {
        await verifyHandler(req, mockRes);
      } else if (path === '/api/logout') {
        await logoutHandler(req, mockRes);
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
      }
    } catch (error) {
      console.error('Server error:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`API server running at http://0.0.0.0:${PORT}/`);
});
