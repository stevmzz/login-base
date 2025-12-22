const { createUser, findUserByUsername } = require('../models/user'); // Import user model functions
const logger = require('../config/logger'); // Import Winston logger
const argon2 = require('argon2'); // Import Argon2 for password hashing

/**
 * Register a new user account
 * Validates input, checks for duplicate username, hashes password, and creates user in database
 * 
 * @async
 * @function register
 * @param {Object} req - Express request object containing username, password, email in body
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function for error handling
 * @returns {Object} Success message with 201 status or error response
 * @returns {400} If required fields are missing
 * @returns {409} If username already exists
 * @returns {500} If server error occurs
 */
async function register(req, res, next) {
  try {
    const { username, password, email } = req.body; // Extract user input from request

    // Validate that all required fields are provided
    if (!username || !password || !email) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    // Check if username already exists in database
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }

    // Hash password using Argon2 for security
    const password_hash = await argon2.hash(password);

    // Create new user in database
    await createUser({ username, email, password_hash });

    logger.info(`User registered: ${username}`);
    res.status(201).json({ success: true, message: 'User registered successfully' });

  } catch (err) {
    // Pass error to error handling middleware
    next(err);
  }
}

/**
 * Authenticate user and create session
 * Validates credentials, verifies password hash, and establishes user session
 * 
 * @async
 * @function login
 * @param {Object} req - Express request object containing username, password in body and session
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function for error handling
 * @returns {Object} User data and success message or error response
 * @returns {400} If required fields are missing
 * @returns {401} If credentials are invalid
 * @returns {500} If server error occurs
 */
async function login(req, res, next) {
  try {
    const { username, password } = req.body; // Extract login credentials from request

    // Validate that all required fields are provided
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    // Search for user in database
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Verify provided password against stored password hash
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Create session with user data for future authenticated requests
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.role = user.role;

    logger.info(`User logged in: ${username}`);
    res.json({ success: true, message: 'Logged in successfully', user: { id: user.id, username: user.username, role: user.role } });

  } catch (err) {
    // Pass error to error handling middleware
    next(err);
  }
}

/**
 * Logout user and destroy session
 * Clears user session data
 * 
 * @async
 * @function logout
 * @param {Object} req - Express request object containing session
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function for error handling
 * @returns {Object} Success message
 * @returns {500} If server error occurs
 */
async function logout(req, res, next) {
  try {
    // Destroy session to clear user authentication
    req.session.destroy();
    logger.info('User logged out');
    res.json({ success: true, message: 'Logged out successfully' });

  } catch (err) {
    // Pass error to error handling middleware
    next(err);
  }
}

// Export controller functions for use in routes
module.exports = { register, login, logout };