const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');

// Apply auth middleware to all routes
router.use(authMiddleware.protect);

// @route   GET /api/users
// @desc    Get all users
// @access  Private/Admin
router.get(
  '/',
  authMiddleware.authorize('admin'),
  validationMiddleware.validate(validationMiddleware.validatePagination),
  userController.getAllUsers
);

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private/Admin
router.get(
  '/:id',
  authMiddleware.authorize('admin'),
  userController.getUserById
);

// @route   PUT /api/users/:id
// @desc    Update user
// @access  Private/Admin or Self
router.put(
  '/:id',
  validationMiddleware.validate(validationMiddleware.validateUpdateUser),
  userController.updateUser
);

// @route   DELETE /api/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete(
  '/:id',
  authMiddleware.authorize('admin'),
  userController.deleteUser
);

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put(
  '/profile',
  validationMiddleware.validate(validationMiddleware.validateUpdateUser),
  userController.updateProfile
);

module.exports = router;