const express = require('express'); // Import Express framework
const { register, login, logout } = require('../controllers/authController'); // Import authentication controller functions

const router = express.Router(); // Create Express router instance

/**
 * POST /api/auth/register
 * User registration endpoint
 * Creates new user account with username, email, and password
 */
router.post('/register', register);

/**
 * POST /api/auth/login
 * User login endpoint
 * Authenticates user and creates session
 */
router.post('/login', login);

/**
 * POST /api/auth/logout
 * User logout endpoint
 * Destroys user session
 */
router.post('/logout', logout);

// Export router for use in main app.js
module.exports = router;