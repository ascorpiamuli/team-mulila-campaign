const app = require('./app');
const connectDB = require('./config/database');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

logger.info('🔹 Starting server setup...');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error(`UNCAUGHT EXCEPTION! 💥 Shutting down...`);
  logger.error(err.name, err.message);
  logger.error(err.stack);
  process.exit(1);
});

// Connect to database with extra logs
logger.info('🔹 Attempting to connect to MongoDB...');
connectDB()
  .then(() => {
    logger.info('✅ MongoDB connection successful!');
    
    // Start server only after DB is connected
    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      logger.error(`UNHANDLED REJECTION! 💥 Shutting down...`);
      logger.error(err.name, err.message);
      logger.error(err.stack);
      server.close(() => {
        process.exit(1);
      });
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
      server.close(() => {
        logger.info('💥 Process terminated!');
      });
    });

  })
  .catch((err) => {
    logger.error('❌ Failed to connect to MongoDB!');
    logger.error(err.name, err.message);
    logger.error(err.stack);
    process.exit(1);
  });
