const express = require('express'); // Import Express
const router = express.Router(); // Create a router

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Export the router
module.exports = router;