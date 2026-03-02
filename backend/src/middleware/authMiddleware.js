const jwt = require('jsonwebtoken');
const ResponseHandler = require('../utils/responseHandler');

const authMiddleware = {
  // Protect routes - require authentication
  protect: (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return ResponseHandler.unauthorized(res, 'Not authorized to access this route');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return ResponseHandler.unauthorized(res, 'Invalid or expired token');
    }
  },

  // Role-based authorization
  authorize: (...roles) => {
    return (req, res, next) => {
      if (!req.user) {
        return ResponseHandler.unauthorized(res, 'User not authenticated');
      }

      if (!roles.includes(req.user.role)) {
        return ResponseHandler.forbidden(res, 'User role not authorized');
      }

      next();
    };
  },
};

module.exports = authMiddleware;