const express = require('express');
const router = express.Router();

// @route   GET /api
// @desc    Welcome route
// @access  Public
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Ascorpi API',
    version: '1.0.0',
    documentation: '/api/docs',
    status: 'operational',
    timestamp: new Date().toISOString(),
  });
});

// @route   GET /api/docs
// @desc    API documentation
// @access  Public
router.get('/docs', (req, res) => {
  res.json({
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        logout: 'POST /api/auth/logout',
        me: 'GET /api/auth/me',
      },
      users: {
        getAll: 'GET /api/users',
        getOne: 'GET /api/users/:id',
        update: 'PUT /api/users/:id',
        delete: 'DELETE /api/users/:id',
        profile: 'PUT /api/users/profile',
      },
      system: {
        health: 'GET /health',
        api: 'GET /api',
        docs: 'GET /api/docs',
      },
    },
    authentication: 'Bearer token required for protected routes',
    rate_limiting: '100 requests per 15 minutes per IP',
  });
});

module.exports = router;