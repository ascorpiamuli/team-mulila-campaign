const { validationResult } = require('express-validator');
const validators = require('../utils/validators');
const ResponseHandler = require('../utils/responseHandler');

const validationMiddleware = {
  // Express-validator result handler
  handleValidation: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return ResponseHandler.validationError(res, errors.array());
    }
    next();
  },

  // Joi validation wrapper
  validate: (schema) => {
    return (req, res, next) => {
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (error) {
        const errors = error.details.map((detail) => ({
          field: detail.path.join('.'),
          message: detail.message,
        }));
        return ResponseHandler.validationError(res, errors);
      }

      // Replace request body with validated values
      req.body = value;
      next();
    };
  },

  // Specific validators
  validateUserRegistration: validators.registerUser,
  validateUserLogin: validators.loginUser,
  validateUpdateUser: validators.updateUser,
  validatePagination: validators.pagination,
};

module.exports = validationMiddleware;