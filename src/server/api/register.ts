import { Router as createRouter } from 'express';
import logger from '../logger';

const router = createRouter();

router.post('/', (req, res) => {
  // TODO: implement this endpoint
  logger.warning('Unimplemented endpoint: /api/register');
  res.json({
    name: false,
  });
});

export default router;
