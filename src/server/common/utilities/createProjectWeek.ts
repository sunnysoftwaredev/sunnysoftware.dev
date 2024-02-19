import { checkProjectWeek, insertProjectWeek } from '../../database';
import logger from '../../logger';

export const createProjectWeek = async(
  projectId: number, weekStart: number,
  weekEnd: number
): Promise<void> => {
  const recordExists = await checkProjectWeek(projectId, weekStart, weekEnd);
  if (!recordExists) {
    await insertProjectWeek(projectId, weekStart, weekEnd).catch((err) => {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    });
  }
};

