import { Router as createRouter } from 'express';
import { Mutex } from 'async-mutex';
import { isObjectRecord } from '../../common/utilities/types';
import { getEmployeeIds, getEmployeeTimesheets, getIDWithToken } from '../database';
import { createTimesheet } from '../common/utilities/createTimesheet';
import logger from '../logger';

const router = createRouter();
const mutex = new Mutex();

function validateUnixTimestamp(variable: any, variableName: string): number {
  if (typeof variable !== 'number' || isNaN(variable)) {
    logger.error(`api/allWeeklyLogs.post: ${variableName} is not a valid number`);
    throw new Error(`api/allWeeklyLogs.post: ${variableName} is not a valid number`);
  }
  return variable;
}

router.post('/', async (req, res) => {
  try {
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
    
    const unixWeekStart = validateUnixTimestamp(req.body.unixWeekStart, 'unixWeekStart');
    const unixWeekEnd = validateUnixTimestamp(req.body.unixWeekEnd, 'unixWeekEnd');

    const release = await mutex.acquire();
    try {
      const idResult = getIDWithToken(authenticationToken);
      if (typeof idResult !== 'object') {
        throw new Error('api/allWeeklyLogs: no idResult found');
      }

      const userIdArray = await getEmployeeIds();
      if (userIdArray === undefined) {
        throw new Error('api/timesheets: userIdArray undefined');
      }

      for await (const userId of userIdArray) {
        createTimesheet(userId, unixWeekStart, unixWeekEnd).catch((err) => {
          if (err instanceof Error) {
            logger.error(err.message);
          }
        });
      }

      const result = await getEmployeeTimesheets(unixWeekStart, unixWeekEnd);
      res.json({
        success: true,
        listResult: result,
      });
    } finally {
      release();
    }
  } catch (error) {
    logger.error(error.message);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;
