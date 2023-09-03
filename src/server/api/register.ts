import { Router as createRouter } from 'express';
import logger from '../logger';
import { isObjectRecord } from '../common/utilities/types';
import { insertUser } from '../database';

const router = createRouter();

router.post('/', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.body)) {
      throw new Error('api/register: req.body is not object');
    }
    const { username } = req.body;
    const { email } = req.body;
    // hash password here
    const { password } = req.body;
    const { role } = req.body;

    if (typeof username !== 'string') {
      throw new Error('user not type string');
    }
    if (typeof email !== 'string') {
      throw new Error('email not type string');
    }
    if (typeof password !== 'string') {
      throw new Error('password not type string');
    }
    if (typeof role !== 'string') {
      throw new Error('role not type string');
    }

    const result = await insertUser(username, email, password, role);

    res.json({
      success: true,
      userCreated: result,
    });
    logger.info('res.json success in register.ts');
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
  });
});

export default router;
