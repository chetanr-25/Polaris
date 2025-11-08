const { ERROR_CODES } = require('../config/constants');
const { formatErrorResponse } = require('../utils/helpers');

/**
 * Global error handler middleware
 * Catches all errors and formats them consistently
 */
function errorHandler(err, req, res, next) {
  console.error('[ERROR]', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Default error values
  let statusCode = err.statusCode || 500;
  let errorCode = err.code || ERROR_CODES.INTERNAL_ERROR;
  let message = err.message || 'An unexpected error occurred';
  let details = err.details || '';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    errorCode = ERROR_CODES.VALIDATION_ERROR;
  }

  if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    errorCode = 'UNAUTHORIZED';
  }

  // Don't expose internal details in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Internal server error';
    details = '';
  }

  res.status(statusCode).json(formatErrorResponse(errorCode, message, details));
}

/**
 * 404 handler for unknown routes
 */
function notFoundHandler(req, res) {
  res.status(404).json(
    formatErrorResponse(
      ERROR_CODES.NOT_FOUND,
      'Route not found',
      `The requested endpoint ${req.method} ${req.url} does not exist`
    )
  );
}

/**
 * Async handler wrapper to catch promise rejections
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

module.exports = {
  errorHandler,
  notFoundHandler,
  asyncHandler
};
