import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from './logger';
import api from './api';
import html from './html';

interface CorsOptions {
  allowOriginErrors: boolean;
}

const determineOriginValidity = (allowedOrigins: string[], allowOriginErrors: boolean) => (
  (origin: unknown, callback: (err: Error | null, allow?: boolean) => void) => {
    if (typeof origin === 'string' && allowedOrigins.indexOf(new URL(origin).hostname) !== -1) {
      callback(null, true);
    } else {
      const message = allowOriginErrors
        ? `The CORS policy for this site does not allow access from the specified origin: ${origin}`
        : 'Not allowed by CORS';
      callback(new Error(message), false);
    }
  }
);

export const initializeServer = async(options: CorsOptions = { allowOriginErrors: true }): Promise<void> => (
  new Promise((resolve) => {
    const PORT = 3000;

    const app = express();

    const clientDirectory = path.join(__dirname, './client');

    app.use(express.static(clientDirectory));

    // CORS options
    const allowedOrigins = ['localhost', 'example.com'];
    app.use(cors({
      origin: determineOriginValidity(allowedOrigins, options.allowOriginErrors),
    }));

    app.use(cookieParser());

    app.use(express.json());

    app.use('/api', api);

    app.get('*', html);

    app.listen(PORT, () => {
      logger.info(`Server is listening on port ${PORT}`);
      resolve();
    });
  })
);
