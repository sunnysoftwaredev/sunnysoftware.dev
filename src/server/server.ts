import path from 'path';
import express from 'express';
import logger from './logger';
import api from './api';

export const initializeServer = async(): Promise<void> => (
  new Promise((resolve) => {
    const PORT = 3000;

    const app = express();

    const clientDirectory = path.join(__dirname, './client');
    const indexPage = path.join(clientDirectory, 'index.html');

    app.use(express.static(clientDirectory));

    app.use(express.json());

    app.use('/api', api);

    app.get('*', (req, res) => {
      res.sendFile(indexPage);
    });

    app.listen(PORT, () => {
      logger.info(`Server is listening on port ${PORT}`);
      resolve();
    });
  })
);
