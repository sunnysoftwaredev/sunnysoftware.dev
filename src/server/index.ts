import logger from './logger';
import { initializeDatabase } from './database';
import { initializeServer } from './server';

const main = async (): Promise<void> => {
  try {
    await initializeDatabase();
    await initializeServer();
  } catch (e) {
    if (e instanceof Error) {
      logger.fatal(`Error during server startup: ${e.message}`);
      logger.debug(e.stack);
    } else {
      logger.fatal('An unknown error occurred during server startup.');
    }
  }
};

main().catch((e) => {
  logger.fatal('Unhandled error caught in main execution.');
  if (e instanceof Error) {
    logger.error(e.message);
    logger.debug(e.stack);
  }
});
