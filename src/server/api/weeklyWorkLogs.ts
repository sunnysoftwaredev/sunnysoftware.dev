import { Router as createRouter } from 'express';
import { Mutex } from 'async-mutex';
import { isObjectRecord } from '../../common/utilities/types';
import { getIDWithToken, getWeeklyWorkLogs } from '../database';
import { createTimesheet } from '../common/utilities/createTimesheet';
import logger from '../logger';

const router = createRouter();
const mutex = new Mutex();

router.post('/', async (req, res) => {
  if (!isObjectRecord(req.body)) {
    res.status(400).json({
      success: false,
      error: 'api/weeklyLogs: req.body is not object',
    });
    return;
  }

  if (!isObjectRecord(req.cookies)) {
    res.status(400).json({
      success: false,
      error: 'api/weeklyLogs: req.cookies is not object',
    });
    return;
  }

  const { authenticationToken } = req.cookies;
  if (typeof authenticationToken !== 'string') {
    res.status(400).json({
      success: false,
      error: 'api/weeklyLogs: userToken not type string',
    });
    return;
  }

  const release = await mutex.acquire();

  try {
    const idResult = getIDWithToken(authenticationToken);
    const userId = await idResult;

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
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e instanceof Error ? e.message : "An unknown error occurred",
    });
  } finally {
    release();
  }
});

export default router;
