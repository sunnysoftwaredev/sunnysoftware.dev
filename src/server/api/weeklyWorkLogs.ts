import { Router as createRouter } from 'express';
import { Mutex } from 'async-mutex';
import { isObjectRecord } from '../../common/utilities/types';
import { getIDWithToken, getWeeklyWorkLogs } from '../database';
import { createTimesheet } from '../common/utilities/createTimesheet';
import logger from '../logger';

const router = createRouter();
const mutex = new Mutex();

router.post('/', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.body)) {
      throw new Error('api/weeklyWorkLogs: req.body is not object');
    }
    if (!isObjectRecord(req.cookies)) {
      throw new Error('api/weeklyWorkLogs: req.cookies is not object');
    }

    const { authenticationToken } = req.cookies;
    if (typeof authenticationToken !== 'string') {
      throw new Error('api/weeklyWorkLogs: userToken not type string');
    }

    const release = await mutex.acquire();
    try {
      const idResult = getIDWithToken(authenticationToken);
      const userId = await idResult;

      const { unixWeekStart } = req.body;
      const { unixWeekEnd } = req.body;

      if (typeof unixWeekStart !== 'number') {
        throw new Error('api/weeklyWorkLogs.post: unixStart is not number');
      }
      if (typeof unixWeekEnd !== 'number') {
        throw new Error('api/weeklyWorkLogs.post: unixEnd is not number');
      }

      await createTimesheet(userId, unixWeekStart, unixWeekEnd).catch((err) => {
        if (err instanceof Error) {
          logger.error(err.message);
        }
      });

      const result = await getWeeklyWorkLogs(
        userId,
        unixWeekStart,
        unixWeekEnd,
      );
      res.json({
        success: true,
        listResult: result,
      });
    } finally {
      release();
    }
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
  });
});

export default router;
