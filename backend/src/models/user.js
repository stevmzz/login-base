const { getPool } = require('../config/database');
const logger = require('../config/logger');

// Create a new user
async function createUser({ username, email, password_hash }) {
  try {
    const pool = getPool();
    const query = `
      INSERT INTO users (username, password, role)
      VALUES (@username, @password, @role)
    `;
    
    const request = pool.request();
    request.input('username', username);
    request.input('password', password_hash);
    request.input('role', 'User'); // Default role
    
    const result = await request.query(query);
    logger.info(`User created: ${username}`);
    return result;
    
  } catch (err) {
    logger.error(`Error creating user: ${err.message}`);
    throw err;
  }
}

// Find user by username
async function findUserByUsername(username) {
  try {
    const pool = getPool();
    const query = 'SELECT * FROM users WHERE username = @username';
    
    const request = pool.request();
    request.input('username', username);
    
    const result = await request.query(query);
    return result.recordset[0];
    
  } catch (err) {
    logger.error(`Error finding user: ${err.message}`);
    throw err;
  }
}

// Export model functions
module.exports = { createUser, findUserByUsername };