const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const os = require('os');

router.get('/', async (req, res) => {
  const healthcheck = {
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpu: os.loadavg(),
    database: {
      status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
      readyState: mongoose.connection.readyState,
      host: mongoose.connection.host,
      name: mongoose.connection.name,
    },
    system: {
      platform: os.platform(),
      arch: os.arch(),
      hostname: os.hostname(),
      cpus: os.cpus().length,
      totalMemory: `${Math.round(os.totalmem() / 1024 / 1024)} MB`,
      freeMemory: `${Math.round(os.freemem() / 1024 / 1024)} MB`,
    },
    environment: process.env.NODE_ENV,
    version: process.version,
  };

  // Check database connection
  if (mongoose.connection.readyState !== 1) {
    healthcheck.status = 'DOWN';
    healthcheck.database.status = 'disconnected';
    return res.status(503).json(healthcheck);
  }

  return res.status(200).json(healthcheck);
});

module.exports = router;