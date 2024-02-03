import { Router as createRouter } from 'express';
import { Mutex } from 'async-mutex';
import { isObjectRecord } from '../../common/utilities/types';
import { getIDWithToken, getWeeklyWorkLogs } from '../database';
import { createTimesheet } from '../common/utilities/createTimesheet';
import logger from '../logger';

const router = createRouter();
const mutex = new Mutex();

const handlePostError = (res, error: Error) => {
  logger.error(error.message);
  res.status(400).json({
    success: false,
    error: error.message,
  });
};

router.post('/', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.body) || !isObjectRecord(req.cookies)) {
      return handlePostError(res, new Error('api/weeklyLogs: Invalid request format'));
    }

    const { authenticationToken } = req.cookies;
    if (typeof authenticationToken !== 'string') {
      return handlePostError(res, new Error('api/weeklyLogs: authenticationToken is not a string'));
    }

    const release = await mutex.acquire();
    try {
      const userId = await getIDWithToken(authenticationToken);
      const { unixWeekStart, unixWeekEnd } = req.body;

      if (typeof unixWeekStart !== 'number' || typeof unixWeekEnd !== 'number') {
        return handlePostError(res, new Error('api/weeklyLogs.post: unixWeekStart and unixWeekEnd must be numbers'));
      }

      await createTimesheet(userId, unixWeekStart, unixWeekEnd).catch(err => {
        return handlePostError(res, err);
      });

      const result = await getWeeklyWorkLogs(userId, unixWeekStart, unixWeekEnd);
      res.json({
        success: true,
        listResult: result,
      });
    } finally {
      release();
    }
  })().catch(e => handlePostError(res, e));
});

export default router;
