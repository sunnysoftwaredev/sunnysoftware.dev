import { Router as createRouter } from 'express';
import { Mutex } from 'async-mutex';
import { isObjectRecord } from '../../common/utilities/types';
import logger from '../logger';
import { createProjectWeek } from '../common/utilities/createProjectWeek';
import { getProjectWeek } from '../database';

const router = createRouter();
const mutex = new Mutex();

router.post('/', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.body)) {
      throw new Error('api/projectWeek: req.body is not object');
    }
    if (!isObjectRecord(req.cookies)) {
      throw new Error('api/projectWeek: req.cookies is not object');
    }

    const { authenticationToken } = req.cookies;
    if (typeof authenticationToken !== 'string') {
      throw new Error('api/projectWeek: userToken not type string');
    }

    const release = await mutex.acquire();
    try {
      const { numberId, unixWeekStart, unixWeekEnd } = req.body;

      if (typeof numberId !== 'number') {
        throw new Error('api/projectWeek.post: unixWeekStart is not number');
      }
      if (typeof unixWeekStart !== 'number') {
        throw new Error('api/projectWeek.post: UnixWeekEnd is not number');
      }
      if (typeof unixWeekEnd !== 'number') {
        throw new Error('api/projectWeek.post: unixEnd is not number');
      }

      await createProjectWeek(
        numberId,
        unixWeekStart,
        unixWeekEnd
      ).catch((err) => {
        if (err instanceof Error) {
          logger.error(err.message);
        }
      });

      const result = await getProjectWeek(
        numberId,
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
