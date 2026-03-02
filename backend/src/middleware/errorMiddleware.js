const logger = require('../utils/logger');
const ResponseHandler = require('../utils/responseHandler');

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log error
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
  });

  // Development error response
  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  }

  // Production error response (hide sensitive info)
  if (err.isOperational) {
    return ResponseHandler.error(res, err.message, err.statusCode);
  }

  // Unknown errors in production
  logger.error('UNKNOWN ERROR:', err);
  return ResponseHandler.error(res, 'Something went wrong!');
};

module.exports = errorMiddleware;