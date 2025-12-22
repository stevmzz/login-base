const logger = require('../config/logger'); // Import Winston logger

/**
 * Middleware to authenticate user session
 * Verifies that user is logged in by checking session.userId
 * If not authenticated, returns 401 Unauthorized response
 * 
 * @function authenticate
 * @param {Object} req - Express request object containing session
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void} Calls next() if authenticated, sends error response otherwise
 */
function authenticate(req, res, next) {
  try {
    // Check if session exists and contains userId
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    // User is authenticated, log the action and proceed to next middleware/route
    logger.info(`Authenticated user: ${req.session.username}`);
    next();

  } catch (err) {
    logger.error(`Authentication error: ${err.message}`);
    res.status(500).json({ success: false, message: 'Authentication error' });
  }
}

// Export authentication middleware for use in protected routes
module.exports = authenticate;