import { Router as createRouter } from 'express';
import logger from '../logger';
import { deleteToken } from '../database';
import { isObjectRecord } from '../../common/utilities/types';

const router = createRouter();

router.post('/', (req, res) => {
  if (!isObjectRecord(req.body)) {
    throw new Error('api/login: req.body is not object');
  }
  const { authenticationToken } = req.body;
  if (typeof authenticationToken !== 'string') {
    throw new Error('api/logout: authenticationToken not type string');
  }
  const result = deleteToken(authenticationToken);
  // clear cookie locally
  res.clearCookie('authenticationToken');
  logger.warning('Unimplemented endpoint: /api/logout');
  res.json({
    success: result,
  });
});

export default router;
