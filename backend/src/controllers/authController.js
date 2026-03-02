const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ResponseHandler = require('../utils/responseHandler');
const logger = require('../utils/logger');

const authController = {
  // @desc    Register user
  // @route   POST /api/auth/register
  // @access  Public
  register: async (req, res, next) => {
    try {
      const { name, email, password, role } = req.body;

      // Check if user exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return ResponseHandler.error(res, 'User already exists', 400);
      }

      // Create user
      const user = await User.create({
        name,
        email,
        password,
        role: role || 'user',
      });

      // Generate token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
      );

      // Remove password from response
      user.password = undefined;

      logger.info(`New user registered: ${email}`);

      ResponseHandler.success(res, {
        user,
        token,
      }, 'User registered successfully', 201);
    } catch (error) {
      next(error);
    }
  },

  // @desc    Login user
  // @route   POST /api/auth/login
  // @access  Public
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return ResponseHandler.unauthorized(res, 'Invalid credentials');
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return ResponseHandler.unauthorized(res, 'Invalid credentials');
      }

      // Generate token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
      );

      // Remove password from response
      user.password = undefined;

      logger.info(`User logged in: ${email}`);

      ResponseHandler.success(res, {
        user,
        token,
      }, 'Login successful');
    } catch (error) {
      next(error);
    }
  },

  // @desc    Logout user
  // @route   POST /api/auth/logout
  // @access  Private
  logout: async (req, res, next) => {
    try {
      // In a real application, you might want to:
      // 1. Add token to blacklist
      // 2. Clear cookies
      // 3. Update user status

      logger.info(`User logged out: ${req.user.id}`);

      ResponseHandler.success(res, null, 'Logout successful');
    } catch (error) {
      next(error);
    }
  },

  // @desc    Get current user
  // @route   GET /api/auth/me
  // @access  Private
  getMe: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return ResponseHandler.notFound(res, 'User');
      }

      ResponseHandler.success(res, { user }, 'User retrieved successfully');
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;