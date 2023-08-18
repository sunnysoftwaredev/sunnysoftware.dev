import logger from './logger';
import { initializeDatabase } from './database';
import { initializeServer } from './server';

const main = async(): Promise<void> => {
  await initializeDatabase();
  await initializeServer();
};

main()
  .catch((e) => {
    logger.fatal('Error during server startup.');
    logger.info(e);
  });
