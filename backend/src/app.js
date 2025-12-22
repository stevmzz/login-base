const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const sessionConfig = require('./config/session');
const { connectDB } = require('./config/database');
const logger = require('./config/logger');

const healthRoutes = require('./routes/health');
const authRoutes = require('./routes/auth');

const app = express(); // Initialize Express app

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionConfig);

// Connect to database
connectDB();

// Routes
app.use('/api', healthRoutes);
app.use('/api/auth', authRoutes);

// Error handler
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;