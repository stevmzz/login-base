const sql = require('mssql'); // Import library for SQL Server connection
require('dotenv').config(); // Load environment variables from .env file

// Configuration for SQL Server connection
const config = {
    server: process.env.DB_SERVER || 'localhost', // Server address
    database: process.env.DB_NAME || 'database', // Database name
    
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USER || 'sa', // Username
            password: process.env.DB_PASSWORD || '' // Password
        }
    },
    
    options: {
        encrypt: true, // Use encryption
        trustServerCertificate: true, // Trust server certificate
        port: parseInt(process.env.DB_PORT) || 1433 // Port number
    }
};

let pool; // Variable to hold the connection pool

/**
 * Establishes a connection to the SQL Server database using a connection pool.
 * Logs an error and retries automatically after 5 seconds if the connection fails.
 * 
 * @async
 * @function connectDB
 * @returns {Promise<sql.ConnectionPool|undefined>} The SQL Server connection pool if successful; otherwise undefined.
 */
async function connectDB() {
    try {
        pool = new sql.ConnectionPool(config); // Establish connection
        await pool.connect(); // Ensure the pool is connected
        console.log('Connected to SQL Server');
        return pool; // Return the connection pool
    }

    catch (e) {
        console.error('Database connection failed:', e);
        setTimeout(connectDB, 5000); // Retry connection after 5 seconds
    }
}

/**
 * Retrieves the current SQL Server connection pool.
 * 
 * @function getPool
 * @returns {sql.ConnectionPool} The current SQL Server connection pool.
 */
function getPool() {
    return pool;
}

/**
 * Closes the SQL Server connection pool.
 * 
 * @async
 * @function closeDB
 */
async function closeDB() {
    if (pool) {
        await pool.close();
        console.log('Database connection closed');
    }
}

// Export the functions for external use
module.exports = { connectDB, getPool, closeDB };