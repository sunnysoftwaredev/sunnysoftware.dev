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
    try {
      if (!isObjectRecord(req.body)) {
        return res.status(400).json({ success: false, error: 'api/weeklyLogs: req.body is not object' });
      }
      if (!isObjectRecord(req.cookies)) {
        return res.status(400).json({ success: false, error: 'api/weeklyLogs: req.cookies is not object' });
      }

      const { authenticationToken } = req.cookies;
      if (typeof authenticationToken !== 'string') {
        return res.status(400).json({ success: false, error: 'api/weeklyLogs: authenticationToken not type string' });
      }

      const release = await mutex.acquire();
      try {
        const userId = await getIDWithToken(authenticationToken);

        const { unixWeekStart, unixWeekEnd } = req.body;

        if (typeof unixWeekStart !== 'number' || typeof unixWeekEnd !== 'number') {
          throw new Error('api/weeklyLogs.post: unixWeekStart and unixWeekEnd must be numbers');
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
      } finally {
        release();
      }
    } catch (e) {
      logger.error(`error in weeklyLogs post: ${e.message}`);
      res.status(500).json({
        success: false,
        error: `Internal server error: ${e.message}`,
      });
    }
  })();
});

export default router;
