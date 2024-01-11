import { Router as createRouter } from 'express';
import { Mutex } from 'async-mutex';
import { isObjectRecord } from '../../common/utilities/types';
import { deleteWorkLog, getIDWithToken, postWorkLog, updateWorkLog } from '../database';
import logger from '../logger';

const router = createRouter();
const mutex = new Mutex();

function validateRequest(req: any): { id: string, body: any, cookies: any } {
  if (!isObjectRecord(req.body)) {
    throw new Error('api/workLogs: req.body is not an object');
  }
  if (!isObjectRecord(req.cookies)) {
    throw new Error('api/workLogs: req.cookies is not an object');
  }

  const { authenticationToken } = req.cookies;
  if (typeof authenticationToken !== 'string') {
    throw new Error('api/workLogs: authenticationToken is not of type string');
  }
  
  const id = getIDWithToken(authenticationToken);
  return { id, body: req.body, cookies: req.cookies };
}

function validateWorkLogPayload({ unixStart, unixEnd, projectId, oldUnixStart }: any): void {
  const fields = { oldUnixStart, unixStart, unixEnd, projectId };
  for (const [key, value] of Object.entries(fields)) {
    if (key !== "oldUnixStart" && typeof value !== 'number') {
      throw new Error(`api/workLogs: ${key} is not of type number`);
    }
  }
}

router.post('/', (req, res) => {
  (async(): Promise<void> => {
    const { id, body } = validateRequest(req);
    const { unixStart, unixEnd, projectId } = body;
    validateWorkLogPayload({ unixStart, unixEnd, projectId });

    const release = await mutex.acquire();
    try {
      const result = await postWorkLog(
        await id,
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
    const { id, body } = validateRequest(req);
    const { oldUnixStart, unixStart, unixEnd, projectId } = body;
    validateWorkLogPayload({ oldUnixStart, unixStart, unixEnd, projectId });

    const release = await mutex.acquire();
    try {
      const result = await updateWorkLog(
        await id,
        oldUnixStart,
        unixStart,
        unixEnd,
        projectId,
      );
      res.json({
        success: true,
        updatedWorkLog: result,
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
    const { id, body } = validateRequest(req);
    const { unixStart, unixEnd } = body;
    validateWorkLogPayload({ unixStart, unixEnd });

    const result = await deleteWorkLog(
      await id,
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
export default router;
