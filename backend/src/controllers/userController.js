const User = require('../models/User');
const ResponseHandler = require('../utils/responseHandler');
const logger = require('../utils/logger');

const userController = {
  // @desc    Get all users
  // @route   GET /api/users
  // @access  Private/Admin
  getAllUsers: async (req, res, next) => {
    try {
      const { page = 1, limit = 10, search, role } = req.query;
      
      const filter = {};
      
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ];
      }
      
      if (role) {
        filter.role = role;
      }

      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdAt: -1 },
        select: '-password',
      };

      const users = await User.paginate(filter, options);

      logger.info(`Retrieved ${users.docs.length} users`);

      ResponseHandler.success(res, users, 'Users retrieved successfully');
    } catch (error) {
      next(error);
    }
  },

  // @desc    Get user by ID
  // @route   GET /api/users/:id
  // @access  Private/Admin
  getUserById: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id).select('-password');

      if (!user) {
        return ResponseHandler.notFound(res, 'User');
      }

      ResponseHandler.success(res, { user }, 'User retrieved successfully');
    } catch (error) {
      next(error);
    }
  },

  // @desc    Update user
  // @route   PUT /api/users/:id
  // @access  Private/Admin or Self
  updateUser: async (req, res, next) => {
    try {
      // Check permissions
      if (req.user.id !== req.params.id && req.user.role !== 'admin') {
        return ResponseHandler.forbidden(res, 'Not authorized to update this user');
      }

      const updates = req.body;
      
      // Remove restricted fields unless admin
      if (req.user.role !== 'admin') {
        delete updates.role;
        delete updates.status;
      }

      const user = await User.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
      ).select('-password');

      if (!user) {
        return ResponseHandler.notFound(res, 'User');
      }

      logger.info(`User updated: ${user.email}`);

      ResponseHandler.success(res, { user }, 'User updated successfully');
    } catch (error) {
      next(error);
    }
  },

  // @desc    Delete user
  // @route   DELETE /api/users/:id
  // @access  Private/Admin
  deleteUser: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return ResponseHandler.notFound(res, 'User');
      }

      // Prevent self-deletion for admin
      if (req.user.id === user.id && req.user.role === 'admin') {
        return ResponseHandler.error(res, 'Admin cannot delete themselves', 400);
      }

      await user.deleteOne();

      logger.info(`User deleted: ${user.email}`);

      ResponseHandler.success(res, null, 'User deleted successfully');
    } catch (error) {
      next(error);
    }
  },

  // @desc    Update user profile (for current user)
  // @route   PUT /api/users/profile
  // @access  Private
  updateProfile: async (req, res, next) => {
    try {
      const updates = req.body;
      
      // Remove restricted fields
      delete updates.role;
      delete updates.status;

      const user = await User.findByIdAndUpdate(
        req.user.id,
        updates,
        { new: true, runValidators: true }
      ).select('-password');

      logger.info(`Profile updated: ${user.email}`);

      ResponseHandler.success(res, { user }, 'Profile updated successfully');
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;