import { Router as createRouter } from 'express';
import { Mutex } from 'async-mutex';
import { isObjectRecord } from '../../common/utilities/types';
import { deleteWorkLog, getIDWithToken, postWorkLog, updateWorkLog } from '../database';
import logger from '../logger';

const router = createRouter();
const mutex = new Mutex();

// Middleware to check the structure of req.body and req.cookies
const validateRequestStructure = (req, res, next) => {
  if (!isObjectRecord(req.body)) {
    return res.status(400).json({ success: false, error: 'req.body is not an object' });
  }
  if (!isObjectRecord(req.cookies)) {
    return res.status(400).json({ success: false, error: 'req.cookies is not an object' });
  }

  const { authenticationToken } = req.cookies;
  if (typeof authenticationToken !== 'string') {
    return res.status(400).json({ success: false, error: 'userToken not type string' });
  }

  next();
};

router.post('/', validateRequestStructure, (req, res) => {
  (async(): Promise<void> => {
    const release = await mutex.acquire();
    try {
      const idResult = getIDWithToken(req.cookies.authenticationToken);
      const id = await idResult;
      const { unixStart, unixEnd, projectId } = req.body;

      const result = await postWorkLog(id, unixStart, unixEnd, projectId);

      res.json({
        success: true,
        createdWorkLog: result,
      });
    } finally {
      release();
    }
    logger.debug('res.json success in workLogs.ts post');
  })().catch((e: Error) => {
    res.json({ success: false, error: e.message });
  });
});

router.put('/', validateRequestStructure, (req, res) => {
  (async(): Promise<void> => {
    const release = await mutex.acquire();
    try {
      const idResult = getIDWithToken(req.cookies.authenticationToken);
      const id = await idResult;
      const { oldUnixStart, unixStart, unixEnd, projectId } = req.body;

      const result = await updateWorkLog(id, oldUnixStart, unixStart, unixEnd, projectId);

      res.json({
        success: true,
        createdWorkLog: result,
      });
    } finally {
      release();
    }
    logger.debug('res.json success in workLogs.ts put');
  })().catch((e: Error) => {
    res.json({ success: false, error: e.message });
  });
});

router.delete('/', validateRequestStructure, (req, res) => {
  (async(): Promise<void> => {
    const idResult = getIDWithToken(req.cookies.authenticationToken);
    const id = await idResult;
    const { unixStart, unixEnd } = req.body;

    const result = await deleteWorkLog(id, unixStart, unixEnd);

    res.json({
      success: true,
      deletedWorkLog: result,
    });
    logger.debug('res.json success in workLogs.ts delete');
  })().catch((e: Error) => {
    res.json({ success: false, error: e.message });
  });
});

export default router;
