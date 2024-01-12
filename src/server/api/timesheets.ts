import { Router as createRouter } from 'express';
import { Mutex } from 'async-mutex';
import { isObjectRecord } from '../../common/utilities/types';
import { getEmployeeIds, getEmployeeTimesheets, getIDWithToken } from '../database';
import { createTimesheet } from '../common/utilities/createTimesheet';
import logger from '../logger';

const router = createRouter();
const mutex = new Mutex();

// Utility function to format error messages
function formatErrorMessage(controller: string, detail: string): string {
  return `api/${controller}: ${detail}`;
}

// Validate request properties
function validateRequest(req: any): void {
  if (!isObjectRecord(req.body)) {
    throw new Error(formatErrorMessage('allWeeklyLogs', 'req.body is not object'));
  }
  if (!isObjectRecord(req.cookies)) {
    throw new Error(formatErrorMessage('allWeeklyLogs', 'req.cookies is not object'));
  }
  if (typeof req.cookies.authenticationToken !== 'string') {
    throw new Error(formatErrorMessage('allWeeklyLogs', 'authenticationToken not type string'));
  }
  if (typeof req.body.unixWeekStart !== 'number') {
    throw new Error(formatErrorMessage('allWeeklyLogs.post', 'unixWeekStart is not number'));
  }
  if (typeof req.body.unixWeekEnd !== 'number') {
    throw new Error(formatErrorMessage('allWeeklyLogs.post', 'unixWeekEnd is not number'));
  }
}

router.post('/', (req, res) => {
  (async(): Promise<void> => {
    validateRequest(req);

    const { authenticationToken } = req.cookies;
    const { unixWeekStart, unixWeekEnd } = req.body;

    const release = await mutex.acquire();
    try {
      const idResult = getIDWithToken(authenticationToken);
      if (typeof idResult !== 'object') {
        throw new Error(formatErrorMessage('allWeeklyLogs', 'no idResult found'));
      }

      const userIdArray = await getEmployeeIds();
      if (userIdArray === undefined) {
        throw new Error(formatErrorMessage('timesheets', 'userIdArray undefined'));
      }

      for await (const userId of userIdArray) {
        createTimesheet(userId, unixWeekStart, unixWeekEnd).catch((err) => {
          if (err instanceof Error) {
            logger.error(err.message);
          }
        });
      }

      const result = await getEmployeeTimesheets(unixWeekStart, unixWeekEnd);
      res.json({ success: true, listResult: result });
    } finally {
      release();
    }
  })().catch((e: Error) => {
    res.json({ success: false, error: e.message });
  });
});

export default router;
