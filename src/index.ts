import https from 'https';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { certOptions, helmetOptions, limiter } from './config/appConfig';
import { logger } from './config/logger';
import { API_PORT, BASE_API } from './config/env';
import router from './routes';
import userRouter from './routes/userRoutes';
import { catchErrors } from './middleware/errorMiddleware';
import { protectRoutes } from './middleware/authMiddleware';

const app = express();

app.use(helmet(helmetOptions));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms', {
    stream: {
      // Configure Morgan to use custom logger with winston
      write: (message) => logger.http(message.trim()),
    },
  })
);

app.get('/', (_req, res) => {
  res.send('Health check');
});

// Public route -> for authentication
app.use(BASE_API, userRouter);

// Private routes
app.use(protectRoutes);
app.use(BASE_API, router);

// Middleware for catching errors
app.use(catchErrors);

app.get('*', (_req, res) => {
  res.status(404).json('Not found');
});

// Create HTTPS Server
https.createServer(certOptions, app).listen(API_PORT, () => {
  logger.info(`Server is running on port ${API_PORT}`);
});
