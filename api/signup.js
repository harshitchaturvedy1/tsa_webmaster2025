const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'forsyth-bridge-demo-secret-key-2025';

const users = [];
let nextId = 3;

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
    const { username, email, password, organization } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const newUser = {
      id: nextId++,
      username,
      email,
      password,
      organization: organization || 'New Organization',
      role: 'partner'
    };

    users.push(newUser);

    const token = jwt.sign(
      { 
        id: newUser.id, 
        username: newUser.username, 
        email: newUser.email,
        organization: newUser.organization,
        role: newUser.role 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        organization: newUser.organization,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
