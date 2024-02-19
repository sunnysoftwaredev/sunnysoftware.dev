import { Router as createRouter } from 'express';
import { Mutex } from 'async-mutex';
import { isObjectRecord } from '../../common/utilities/types';
import { deleteWorkLog, getIDWithToken, getWorkLogsForProjectWeek, postWorkLog, updateWorkLog } from '../database';
import logger from '../logger';

const router = createRouter();
const mutex = new Mutex();

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

    const release = await mutex.acquire();
    try {
      const idResult = getIDWithToken(authenticationToken);
      const id = await idResult;
      const { unixStart, unixEnd, projectId } = req.body;

      if (typeof unixStart !== 'number') {
        throw new Error('api/workLogs.post: unixStart is not number');
      }
      if (typeof unixEnd !== 'number') {
        throw new Error('api/workLogs.post: unixEnd is not number');
      }
      if (typeof projectId !== 'number') {
        throw new Error('api/workLogs.post: projectId is not number');
      }

      const result = await postWorkLog(
        id,
        unixStart,
        unixEnd,
        projectId,
      );
      res.json({
        success: true,
        createdWorkLog: result,
      });
    } finally {
      release();
    }
    logger.debug('res.json success in workLogs.ts post');
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

    const release = await mutex.acquire();
    try {
      const idResult = getIDWithToken(authenticationToken);
      const id = await idResult;
      const { oldUnixStart, unixStart, unixEnd, projectId } = req.body;

      if (typeof oldUnixStart !== 'number') {
        throw new Error('api/workLogs.put: unixStart is not number');
      }
      if (typeof unixStart !== 'number') {
        throw new Error('api/workLogs.put: unixStart is not number');
      }
      if (typeof unixEnd !== 'number') {
        throw new Error('api/workLogs.put: unixEnd is not number');
      }
      if (typeof projectId !== 'number') {
        throw new Error('api/workLogs.post: projectId is not number');
      }

      const result = await updateWorkLog(
        id,
        oldUnixStart,
        unixStart,
        unixEnd,
        projectId,
      );

      res.json({
        success: true,
        createdWorkLog: result,
      });
    } finally {
      release();
    }
    logger.debug('res.json success in workLogs.ts put');
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
    logger.debug('res.json success in workLogs.ts delete');
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
  });
});

router.post('/withEmployee', (req, res) => {
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

    const release = await mutex.acquire();
    try {
      const { numberId, unixWeekStart, unixWeekEnd } = req.body;

      if (typeof numberId !== 'number') {
        throw new Error('api/workLogs/withEmployee: projectId is not number');
      }
      if (typeof unixWeekStart !== 'number') {
        throw new Error('api/workLogs/withEmployee: unixWeekStart is not number');
      }
      if (typeof unixWeekEnd !== 'number') {
        throw new Error('api/workLogs/withEmployee: unixWeekEnd is not number');
      }

      console.log('unixWeekStart: ', unixWeekStart);
      console.log('unixWeekEnnd: ', unixWeekEnd);

      const result = await getWorkLogsForProjectWeek(
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
    logger.debug('res.json success in workLogs/withEmployees');
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
  });
});

export default router;

