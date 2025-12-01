const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'forsyth-bridge-demo-secret-key-2025';

const users = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@forsythbridge.org',
    password: 'password123',
    organization: 'Community Health Center',
    role: 'admin'
  },
  {
    id: 2,
    username: 'partner',
    email: 'partner@example.org',
    password: 'partner123',
    organization: 'Local Food Bank',
    role: 'partner'
  }
];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, password, email } = req.body;

    const identifier = username || email;
    
    if (!identifier || !password) {
      return res.status(400).json({ error: 'Username/email and password are required' });
    }

    const user = users.find(u => 
      (u.username === identifier || u.email === identifier) && u.password === password
    );

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username, 
        email: user.email,
        organization: user.organization,
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        organization: user.organization,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
