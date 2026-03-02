const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async (retries = 5) => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) throw new Error('MONGODB_URI is not defined in environment variables');

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      logger.info(`🔹 Attempting MongoDB connection (Attempt ${attempt}/${retries})...`);
      await mongoose.connect(mongoUri, options);

      const conn = mongoose.connection;

      // Connection events
      conn.on('connected', () => logger.info(`✅ MongoDB Connected: ${conn.host}`));
      conn.on('error', (err) => logger.error(`❌ MongoDB connection error: ${err.message}`));
      conn.on('disconnected', () => logger.warn('⚠️ MongoDB disconnected'));

      // Graceful shutdown
      process.on('SIGINT', async () => {
        await conn.close();
        logger.info('👋 MongoDB connection closed through app termination');
        process.exit(0);
      });

      logger.info('🚀 MongoDB connection established successfully!');
      return; // exit loop once connected

    } catch (error) {
      logger.error(`❌ MongoDB connection attempt ${attempt} failed: ${error.message}`);
      if (attempt < retries) {
        logger.info('⏳ Retrying in 5 seconds...');
        await new Promise(res => setTimeout(res, 5000));
      } else {
        logger.error('💥 Could not connect to MongoDB after multiple attempts!');
        if (process.env.NODE_ENV !== 'development') process.exit(1);
        else logger.warn('⚠️ Continuing without DB in development mode');
      }
    }
  }
};

module.exports = connectDB;
