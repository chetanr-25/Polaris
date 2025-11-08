require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const NodeCache = require('node-cache');

const apiRoutes = require('./routes/api');
const requestLogger = require('./middleware/requestLogger');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize cache
const cache = new NodeCache({
  stdTTL: parseInt(process.env.CACHE_TTL_SECONDS) || 7200,
  checkperiod: parseInt(process.env.CACHE_CHECK_PERIOD) || 600
});

// Make cache available globally
global.appCache = cache;

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',') 
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests',
      details: 'Please try again later'
    }
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(requestLogger);
app.use(limiter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'AccessAI API - AI-powered accessibility communication platform',
    version: '1.0.0',
    documentation: 'https://github.com/your-repo/accessai-backend',
    endpoints: {
      health: 'GET /api/health',
      processInput: 'POST /api/process-input',
      textToSpeech: 'POST /api/text-to-speech',
      translate: 'POST /api/translate',
      sampleQueries: 'GET /api/sample-queries',
      vocabulary: 'GET /api/sign-language/vocabulary',
      dyslexiaFormat: 'POST /api/dyslexia/format',
      languages: 'GET /api/languages',
      accessibilityStatement: 'GET /api/accessibility-statement'
    }
  });
});

// API routes
app.use('/api', apiRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log('🚀 AccessAI API Server');
  console.log('='.repeat(60));
  console.log(`📡 Server running on: http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`💾 Cache TTL: ${cache.options.stdTTL} seconds`);
  console.log(`🔒 Rate limit: ${limiter.max || 100} requests per ${(limiter.windowMs || 60000) / 1000}s`);
  console.log('='.repeat(60));
  console.log('📚 Available endpoints:');
  console.log('   GET  /api/health');
  console.log('   POST /api/process-input');
  console.log('   POST /api/text-to-speech');
  console.log('   POST /api/translate');
  console.log('   GET  /api/sample-queries');
  console.log('   GET  /api/sign-language/vocabulary');
  console.log('   POST /api/dyslexia/format');
  console.log('   GET  /api/languages');
  console.log('   GET  /api/accessibility-statement');
  console.log('='.repeat(60));
  console.log('✅ Server ready to accept requests');
  console.log('='.repeat(60));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    cache.close();
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    cache.close();
    process.exit(0);
  });
});

module.exports = app;
