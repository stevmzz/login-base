const { createUser, findUserByUsername } = require('../models/user');
const logger = require('../config/logger');
const argon2 = require('argon2');

// Register a new user
async function register(req, res, next) {
  try {
    const { username, password, email } = req.body;

    // Validate input
    if (!username || !password || !email) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    // Check if user exists
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    // Hash password with argon2
    const password_hash = await argon2.hash(password);

    // Create user
    await createUser({ username, email, password_hash });

    logger.info(`User registered: ${username}`);
    res.status(201).json({ success: true, message: 'User registered successfully' });

  } catch (err) {
    next(err);
  }
}

// Login user
async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    // Find user
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Create session
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.role = user.role;

    logger.info(`User logged in: ${username}`);
    res.json({ success: true, message: 'Logged in successfully', user: { id: user.id, username: user.username, role: user.role } });

  } catch (err) {
    next(err);
  }
}

// Logout user
async function logout(req, res, next) {
  try {
    req.session.destroy();
    logger.info('User logged out');
    res.json({ success: true, message: 'Logged out successfully' });

  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, logout };