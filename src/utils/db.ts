import mongoose from 'mongoose';

import { MONGO_URL } from '../config/env';
import { errorLogger, logger } from '../config/logger';

mongoose.connect(MONGO_URL);

// Listen for connection success or failure
mongoose.connection.on('connected', () => {
  logger.info('Connected to MongoDB using mongoose');
});

mongoose.connection.on('error', (error) => {
  errorLogger.error('MongoDB connection error', error);
});

export default mongoose;
