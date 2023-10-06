import { Router as createRouter } from 'express';
import { isObjectRecord } from '../../common/utilities/types';
import { getAllWeeklyLogs, getIDWithToken } from '../database';

const router = createRouter();

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

    const idResult = getIDWithToken(authenticationToken);
    if (typeof idResult !== 'object') {
      throw new Error('api/allWeeklyLogs: no idResult found');
    }

    const { unixWeekStart } = req.body;
    const { unixWeekEnd } = req.body;

    if (typeof unixWeekStart !== 'number') {
      throw new Error('api/allWeeklyLogs.post: unixStart is not number');
    }
    if (typeof unixWeekEnd !== 'number') {
      throw new Error('api/allWeeklyLogs.post: unixEnd is not number');
    }

    const result = await getAllWeeklyLogs(
      unixWeekStart,
      unixWeekEnd,
    );

    res.json({
      success: true,
      listResult: result,
    });

    // logger.info('res.json success in weeklyLogs.ts post');
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
  });
});

export default router;
