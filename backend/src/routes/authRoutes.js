const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post(
  '/register',
  validationMiddleware.validate(validationMiddleware.validateUserRegistration),
  authController.register
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  validationMiddleware.validate(validationMiddleware.validateUserLogin),
  authController.login
);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post(
  '/logout',
  authMiddleware.protect,
  authController.logout
);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get(
  '/me',
  authMiddleware.protect,
  authController.getMe
);

module.exports = router;