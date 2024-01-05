import { Router as createRouter } from 'express';
import { Mutex } from 'async-mutex';
import { isObjectRecord } from '../../common/utilities/types';
import { getIDWithToken, getWeeklyWorkLogs } from '../database';
import { createTimesheet } from '../common/utilities/createTimesheet';
import logger from '../logger';

const router = createRouter();
const mutex = new Mutex();

const authenticateUser = async (cookies, body) => {
  if (!isObjectRecord(cookies)) {
    throw new Error('Cookies must be an object');
  }
  const { authenticationToken } = cookies;
  if (typeof authenticationToken !== 'string') {
    throw new Error('Authentication token must be a string');
  }
  const userId = await getIDWithToken(authenticationToken);
  return userId;
};

const validateRequestBody = (body) => {
  if (!isObjectRecord(body)) {
    throw new Error('Request body must be an object');
  }
  const { unixWeekStart, unixWeekEnd } = body;
  if (typeof unixWeekStart !== 'number') {
    throw new Error('UNIX Week Start must be a number');
  }
  if (typeof unixWeekEnd !== 'number') {
    throw new Error('UNIX Week End must be a number');
  }
  return { unixWeekStart, unixWeekEnd };
};

router.post('/', async (req, res) => {
  const release = await mutex.acquire();
  try {
    const userId = await authenticateUser(req.cookies, req.body);
    const { unixWeekStart, unixWeekEnd } = validateRequestBody(req.body);
    
    await createTimesheet(userId, unixWeekStart, unixWeekEnd).catch((err) => {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    });

    const result = await getWeeklyWorkLogs(
      userId,
      unixWeekStart,
      unixWeekEnd,
    );
    res.json({
      success: true,
      listResult: result,
    });
  } catch (e) {
    res.json({
      success: false,
      error: e.message,
    });
  } finally {
    release();
  }
});

export default router;