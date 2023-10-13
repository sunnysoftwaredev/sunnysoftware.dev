import { Router as createRouter } from 'express';
import { Mutex } from 'async-mutex';
import { isObjectRecord } from '../../common/utilities/types';
import { getEmployeeIds, getEmployeeTimesheets, getIDWithToken } from '../database';
import { createTimesheet } from '../common/utilities/createTimesheet';
import logger from '../logger';

const router = createRouter();
const mutex = new Mutex();

router.post('/', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.body)) {
      throw new Error('api/allWeeklyLogs: req.body is not object');
    }
    if (!isObjectRecord(req.cookies)) {
      throw new Error('api/allWeeklyLogs: req.cookies is not object');
    }

    const { authenticationToken } = req.cookies;
    if (typeof authenticationToken !== 'string') {
      throw new Error('api/allWeeklyLogs: userToken not type string');
    }
    const { unixWeekStart } = req.body;
    const { unixWeekEnd } = req.body;

    if (typeof unixWeekStart !== 'number') {
      throw new Error('api/allWeeklyLogs.post: unixStart is not number');
    }
    if (typeof unixWeekEnd !== 'number') {
      throw new Error('api/allWeeklyLogs.post: unixEnd is not number');
    }

    const release = await mutex.acquire();
    try {
      const idResult = getIDWithToken(authenticationToken);
      if (typeof idResult !== 'object') {
        throw new Error('api/allWeeklyLogs: no idResult found');
      }

      const userIdArray = await getEmployeeIds();

      if (userIdArray === undefined) {
        throw new Error('api/timesheets: userIdArray undefined');
      }

      for await (const userId of userIdArray) {
        createTimesheet(userId, unixWeekStart, unixWeekEnd).catch((err) => {
          if (err instanceof Error) {
            logger.error(err.message);
          }
        });
      }

      const result = await getEmployeeTimesheets(
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

    // logger.info('res.json success in weeklyLogs.ts post');
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
  });
});

export default router;
