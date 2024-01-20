import { Router as createRouter, Request, Response, NextFunction } from 'express';
import { Mutex } from 'async-mutex';
import { isObjectRecord } from '../../common/utilities/types';
import { deleteWorkLog, getIDWithToken, postWorkLog, updateWorkLog } from '../database';
import logger from '../logger';

const router = createRouter();
const mutex = new Mutex();

// Middleware for request validation
const validateWorkLogsRequest = (req: Request, res: Response, next: NextFunction): void => {
  if (!isObjectRecord(req.body) || !isObjectRecord(req.cookies)) {
    return next(new Error('Request body or cookies are not an object'));
  }

  const { authenticationToken } = req.cookies;
  const { unixStart, unixEnd, projectId, oldUnixStart } = req.body;
  if (typeof authenticationToken !== 'string' ||
      typeof unixStart !== 'number' ||
      typeof unixEnd !== 'number' ||
      (req.method === "PUT" && typeof oldUnixStart !== 'number') ||
      typeof projectId !== 'number') {
    return next(new Error('Invalid request parameters'));
  }
  next();
};

router.post('/', validateWorkLogsRequest, async (req: Request, res: Response) => {
  const { authenticationToken } = req.cookies;
  const { unixStart, unixEnd, projectId } = req.body;

  const release = await mutex.acquire();
  try {
    const id = await getIDWithToken(authenticationToken);

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
}, (error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    success: false,
    error: error.message,
  });
});

router.put('/', validateWorkLogsRequest, async (req: Request, res: Response) => {
  const { authenticationToken } = req.cookies;
  const { oldUnixStart, unixStart, unixEnd, projectId } = req.body;

  const release = await mutex.acquire();
  try {
    const id = await getIDWithToken(authenticationToken);

    const result = await updateWorkLog(
      id,
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
}, (error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    success: false,
    error: error.message,
  });
});

router.delete('/', validateWorkLogsRequest, async (req: Request, res: Response) => {
  const { authenticationToken } = req.cookies;
  const { unixStart, unixEnd } = req.body;

  const id = await getIDWithToken(authenticationToken);

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
}, (error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    success: false,
    error: error.message,
  });
});

export default router;
