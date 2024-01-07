import { checkTimesheet, insertTimesheet } from '../../database';
import logger from '../../logger';

export const createTimesheet = async (
  userId: number, weekStart: number,
  weekEnd: number
): Promise<void> => {
  try {
    const recordExists = await checkTimesheet(userId, weekStart, weekEnd);
    if (!recordExists) {
      await insertTimesheet(userId, weekStart, weekEnd);
    }
  } catch (err) {
    if (err instanceof Error) {
      logger.error(`Error in createTimesheet for User ID ${userId}: ${err.message}`);
    } else {
      logger.error(`Unknown error in createTimesheet for User ID ${userId}`);
    }
  }
};
