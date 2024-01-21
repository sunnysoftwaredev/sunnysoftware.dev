import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import logger from './logger';
import api from './api';
import html from './html';

const PORT = 3000;

const configureCors = (): cors.CorsOptions => {
  const allowedOrigins = ['localhost:3000'];
  return {
    origin: allowedOrigins,
  };
};

const configureMiddlewares = (app: express.Application): void => {
  const clientDirectory = path.join(__dirname, './client');
  app.use(express.static(clientDirectory));
  app.use(cors(configureCors()));
  app.use(cookieParser());
  app.use(express.json());
  app.use('/api', api);
  app.get('*', html);
};

export const initializeServer = async (): Promise<void> => (
  new Promise((resolve) => {
    const app = express();
    configureMiddlewares(app);

    app.listen(PORT, () => {
      logger.info(`Server is listening on port ${PORT}`);
      resolve();
    });
  })
);
