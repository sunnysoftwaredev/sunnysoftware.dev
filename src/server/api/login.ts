import { Router as createRouter } from 'express';
import logger from '../logger';
import { isObjectRecord, userExists } from '../database';

const router = createRouter();
// for route: '/api/login'

router.post('/', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.body)) {
      throw new Error('Unexpected body type');
    }
    const user = req.body.username;
    const { password } = req.body; // automatic destructuring?

    logger.info('Post request running...');

    if (typeof user !== 'string') {
      throw new Error('user not type string');
    }
    if (typeof password !== 'string') {
      throw new Error('password not type string');
    }

    const result = await userExists(user, password);

    res.json({
      success: true,
      isloggedin: result,
    });
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
  });
});

export default router;
