const session = require('express-session'); // Import express-session module
require('dotenv').config(); // Load environment variables from .env file

// Configuration for session management
const sessionConfig = session({
    secret: process.env.SESSION_SECRET || 'default_secret_key', // Secret key for signing the session ID cookie
    resave: false, // Do not save session if unmodified
    saveUninitialized: true, // Save uninitialized sessions
    
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production (HTTPS only)
        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
        sameSite: 'lax', // Mitigate CSRF attacks
        maxAge: 1000 * 60 * 60 * 24 // Cookie expiration time (1 day)
    }
});

// Export the session configuration
module.exports = sessionConfig;