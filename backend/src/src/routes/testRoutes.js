const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Backend API is working!',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: 'GET /health',
      test: 'GET /api/test',
    },
  });
});

module.exports = router;
