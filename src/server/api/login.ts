import { Router as createRouter } from 'express';
import logger from '../logger';
import { getUserByUsername, insertToken } from '../database';
import { isObjectRecord } from '../../common/utilities/types';
import { generateSalt, saltAndHash } from '../common/utilities/crypto';

const router = createRouter();

router.post('/', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.body)) {
      throw new Error('api/login: req.body is not object');
    }
    const { username, password } = req.body;

    if (typeof username !== 'string') {
      throw new Error('api/login: username not type string');
    }
    if (typeof password !== 'string') {
      throw new Error('api/login: password not type string');
    }

    const userObject = await getUserByUsername(username);

    const { id: userID, password: passwordDB, salt: saltDB }
     = userObject;

    const saltedAndHashedLoginPassword: Buffer = saltAndHash(
      password,
      Buffer.from(saltDB, 'hex')
    );
    const checkPassword = saltedAndHashedLoginPassword.toString('hex');

    if (checkPassword !== passwordDB) {
      throw new Error('Unable to authenticate with the provided username and password');
    }

    // create expiration date 10 days from creation
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 10);
    // create and send cookie to browser
    const token = (await generateSalt()).toString('hex');
    const tokenToDatabase = insertToken(userID, token, expiration);
    res.cookie('authenticationToken', token, {
      expires: expiration,
      sameSite: 'lax',
    });

    res.json({
      success: true,
      token: tokenToDatabase,
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
