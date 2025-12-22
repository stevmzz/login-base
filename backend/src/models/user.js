const { getPool } = require('../config/database'); // Import database connection pool
const logger = require('../config/logger'); // Import Winston logger

/**
 * Creates a new user in the database with hashed password
 * 
 * @async
 * @function createUser
 * @param {Object} user - User object containing username, email, password_hash
 * @param {string} user.username - Unique username
 * @param {string} user.email - User email address
 * @param {string} user.password_hash - Hashed password using Argon2
 * @returns {Promise<Object>} Database query result
 * @throws {Error} If user creation fails
 */
async function createUser({ username, email, password_hash }) {
  try {
    const pool = getPool(); // Get database connection pool
    const query = `
      INSERT INTO users (username, password, role)
      VALUES (@username, @password, @role)
    `;
    
    const request = pool.request(); // Create SQL request
    request.input('username', username); // Bind username parameter
    request.input('password', password_hash); // Bind hashed password parameter
    request.input('role', 'User'); // Set default role to 'User'
    
    const result = await request.query(query); // Execute INSERT query
    logger.info(`User created: ${username}`);
    return result;
    
  } catch (err) {
    logger.error(`Error creating user: ${err.message}`);
    throw err;
  }
}

/**
 * Finds a user by username in the database
 * 
 * @async
 * @function findUserByUsername
 * @param {string} username - Username to search for
 * @returns {Promise<Object|undefined>} User object if found, undefined otherwise
 * @throws {Error} If database query fails
 */
async function findUserByUsername(username) {
  try {
    const pool = getPool(); // Get database connection pool
    const query = 'SELECT * FROM users WHERE username = @username'; // SQL SELECT query
    
    const request = pool.request(); // Create SQL request
    request.input('username', username); // Bind username parameter
    
    const result = await request.query(query); // Execute SELECT query
    return result.recordset[0]; // Return first user record or undefined
    
  } catch (err) {
    logger.error(`Error finding user: ${err.message}`);
    throw err;
  }
}

// Export model functions for use in controllers
module.exports = { createUser, findUserByUsername };