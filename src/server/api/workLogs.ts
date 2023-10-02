import { Router as createRouter } from 'express';
import logger from '../logger';
import { isObjectRecord } from '../../common/utilities/types';
import { deleteWorkLog, getIDWithToken, postWorkLog, updateWorkLog } from '../database';

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

router.put('/', (req, res) => {
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
    const { oldUnixStart } = req.body;
    const { unixStart } = req.body;
    const { unixEnd } = req.body;

    if (typeof oldUnixStart !== 'number') {
      throw new Error('api/workLogs.put: unixStart is not number');
    }
    if (typeof unixStart !== 'number') {
      throw new Error('api/workLogs.put: unixStart is not number');
    }
    if (typeof unixEnd !== 'number') {
      throw new Error('api/workLogs.put: unixEnd is not number');
    }

    const result = await updateWorkLog(
      id,
      oldUnixStart,
      unixStart,
      unixEnd,
    );

    res.json({
      success: true,
      createdWorkLog: result,
    });
    logger.info('res.json success in workLogs.ts put');
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
  });
});

router.delete('/', (req, res) => {
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
      throw new Error('api/workLogs.delete: unixStart is not number');
    }
    if (typeof unixEnd !== 'number') {
      throw new Error('api/workLogs.delete: unixEnd is not number');
    }

    const result = await deleteWorkLog(
      id,
      unixStart,
      unixEnd,
    );

    res.json({
      success: true,
      deletedWorkLog: result,
    });
    logger.info('res.json success in workLogs.ts delete');
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
  });
});
export default router;
