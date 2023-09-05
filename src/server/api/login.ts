import { Router as createRouter } from 'express';
import logger from '../logger';
import { getUserByUsername } from '../database';
import { isObjectRecord } from '../common/utilities/types';
import { saltAndHash } from '../common/utilities/crypto';

const router = createRouter();

router.post('/', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.body)) {
      throw new Error('api/login: req.body is not object');
    }
    const { username, password } = req.body;

    if (typeof username !== 'string') {
      throw new Error('api/login: user not type string');
    }
    if (typeof password !== 'string') {
      throw new Error('api/login: password not type string');
    }

    const userObject = await getUserByUsername(username);

    const { password: passwordDB, salt: saltDB }
     = userObject;

    const saltedAndHashedLoginPassword: Buffer = saltAndHash(
      password,
      Buffer.from(saltDB, 'hex')
    );
    const checkPassword = saltedAndHashedLoginPassword.toString('hex');

    if (checkPassword === passwordDB) {
      logger.info('Check: passwords are the same!');
      // const tokenHashing = crypt.hmac('sha256', key);
      // tokenValue = encodeToken();
      // localStorage.setItem('token', JSON.stringify(token));
    } else {
      logger.info('FAILURE: Passwords not the same');
    }

    res.json({
      success: true,
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
