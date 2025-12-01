const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'forsyth-bridge-demo-secret-key-2025';

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    let token = null;

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }

    if (!token && req.body && req.body.token) {
      token = req.body.token;
    }

    if (!token && req.query && req.query.token) {
      token = req.query.token;
    }

    if (!token) {
      return res.status(401).json({ 
        valid: false, 
        error: 'No token provided' 
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    return res.status(200).json({
      valid: true,
      user: {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
        organization: decoded.organization,
        role: decoded.role
      }
    });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        valid: false, 
        error: 'Token expired' 
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        valid: false, 
        error: 'Invalid token' 
      });
    }

    console.error('Verify error:', error);
    return res.status(500).json({ 
      valid: false, 
      error: 'Internal server error' 
    });
  }
};
