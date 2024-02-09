import { Router as createRouter, Request, Response } from 'express';
import { Mutex } from 'async-mutex';
import { isObjectRecord } from '../../common/utilities/types';
import { getIDWithToken, getWeeklyWorkLogs } from '../database';
import { createTimesheet } from '../common/utilities/createTimesheet';
import logger from '../logger';

const router = createRouter();
const mutex = new Mutex();

// Extracted async handler function
async function handleWeeklyLogsPost(req: Request, res: Response): Promise<void> {
  if (!isObjectRecord(req.body)) {
    throw new Error('api/weeklyLogs: req.body is not object');
  }
  if (!isObjectRecord(req.cookies)) {
    throw new Error('api/weeklyLogs: req.cookies is not object');
  }

  const { authenticationToken } = req.cookies;
  if (typeof authenticationToken !== 'string') {
    throw new Error('api/weeklyLogs: userToken not type string');
  }

  const release = await mutex.acquire();
  try {
    const userId = await getIDWithToken(authenticationToken);

    const { unixWeekStart, unixWeekEnd } = req.body;

    if (typeof unixWeekStart !== 'number') {
      throw new Error('api/weeklyLogs.post: unixStart is not number');
    }
    if (typeof unixWeekEnd !== 'number') {
      throw new Error('api/weeklyLogs.post: unixEnd is not number');
    }

    await createTimesheet(userId, unixWeekStart, unixWeekEnd).catch((err) => {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    });

    const result = await getWeeklyWorkLogs(userId, unixWeekStart, unixWeekEnd);
    res.json({
      success: true,
      listResult: result,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  } finally {
    release();
  }
}

// Refactored route definition to use the extracted handler function
router.post('/', (req, res) => {
  handleWeeklyLogsPost(req, res).catch((error) => {
    res.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  });
});

export default router;
