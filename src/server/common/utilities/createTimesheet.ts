import { checkTimesheet, insertTimesheet } from '../../database';
import logger from '../../logger';

export const createTimesheet = async(
  userId: number, weekStart: number,
  weekEnd: number
): Promise<void> => {
  const recordExists = await checkTimesheet(userId, weekStart, weekEnd);
  console.log('recordExists: ', recordExists);
  if (!recordExists) {
    await insertTimesheet(userId, weekStart, weekEnd).catch((err) => {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    });
  }
};

