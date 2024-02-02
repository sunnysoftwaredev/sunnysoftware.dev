import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from './logger';
import api from './api';
import html from './html';

export const initializeServer = async (): Promise<void> => {
  try {
    const PORT = 3000;
    const app = express();
    const clientDirectory = path.join(__dirname, './client');

    app.use(express.static(clientDirectory));

    // CORS options
    const allowedOrigins = ['localhost:3000'];
    const options: cors.CorsOptions = {
      origin: allowedOrigins,
    };

    app.use(cors(options));

    app.use(cookieParser());

    app.use(express.json());

    app.use('/api', api);

    app.get('*', html);

    await new Promise<void>((resolve, reject) => {
      app.listen(PORT, () => {
        logger.info(`Server is listening on port ${PORT}`);
        resolve();
      }).on('error', reject);
    });
  } catch (error) {
    logger.error('Failed to initialize the server:', error);
  }
};
