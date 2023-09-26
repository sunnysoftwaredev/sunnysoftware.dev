import { Router as createRouter } from 'express';
import logger from '../logger';
import { isObjectRecord } from '../../common/utilities/types';
import { getIDWithToken, postWorkLog } from '../database';

const router = createRouter();

router.post('/', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.body)) {
      throw new Error('api/workLogs: req.body is not object');
    }
    if (!isObjectRecord(req.cookies)) {
      throw new Error('api/workLogs: req.cookies is not object');
    }

    const { authenticationToken } = req.cookies;
    if (typeof authenticationToken !== 'string') {
      throw new Error('api/workLogs: userToken not type string');
    }

    const idResult = getIDWithToken(authenticationToken);
    const id = await idResult;
    const { unixStart } = req.body;
    const { unixEnd } = req.body;

    if (typeof unixStart !== 'number') {
      throw new Error('api/workLogs.post: unixStart is not number');
    }
    if (typeof unixEnd !== 'number') {
      throw new Error('api/workLogs.post: unixEnd is not number');
    }

    console.log('unixStart workLogs: ', unixStart);
    const result = await postWorkLog(
      id,
      unixStart,
      unixEnd,
    );

    res.json({
      success: true,
      createdWorkLog: result,
    });
    logger.info('res.json success in workLogs.ts post');
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
  });
});

export default router;
