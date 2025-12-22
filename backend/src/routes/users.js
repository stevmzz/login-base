const express = require('express'); // Import Express framework
const authenticate = require('../middleware/authenticate'); // Import authentication middleware
const { findUserByUsername } = require('../models/user'); // Import user model function
const logger = require('../config/logger'); // Import Winston logger

const router = express.Router(); // Create Express router

/**
 * GET /api/users/profile
 * Protected route - requires user authentication
 * Returns the authenticated user's profile data (without password)
 * 
 * @route GET /api/users/profile
 * @middleware authenticate - Verifies user is logged in
 * @returns {Object} User profile object with success flag
 * @returns {401} If user is not authenticated
 * @returns {404} If user not found in database
 * @returns {500} If server error occurs
 */
router.get('/profile', authenticate, async (req, res, next) => {
  try {
    // Fetch user data from database using username from session
    const user = await findUserByUsername(req.session.username);
    
    // Handle case where user was deleted or session is stale
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Exclude password hash from response for security
    const { password, ...userWithoutPassword } = user;

    logger.info(`Profile requested by: ${req.session.username}`);
    res.json({ success: true, user: userWithoutPassword });

  } catch (err) {
    // Pass error to error handling middleware
    next(err);
  }
});

// Export router for use in main app.js
module.exports = router;