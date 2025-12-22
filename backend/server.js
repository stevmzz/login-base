const app = require('./src/app');
const { closeDB } = require('./src/config/database');
const logger = require('./src/config/logger');

// Start the server
const PORT = process.env.PORT || 5000;

// Listen on the specified port
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('Shutting down server...');
  await closeDB();
  process.exit(0);
});