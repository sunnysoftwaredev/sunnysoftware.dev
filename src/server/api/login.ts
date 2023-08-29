import { Router as createRouter } from 'express';
import logger from '../logger';
import { userExists } from '../database';
import { isObjectRecord } from '../common/utilities/types';

const router = createRouter();

router.post('/', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.body)) {
      console.log('req.body is of type', typeof (req.body));
      throw new Error('api/login: req.body is not object');
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
    logger.info('res.json success in login.ts');
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
  });
});

export default router;
