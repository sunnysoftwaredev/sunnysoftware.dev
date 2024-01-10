import { Router as createRouter } from 'express';
import logger from '../logger';
import { getUserByEmail, insertToken } from '../database';
import { isObjectRecord } from '../../common/utilities/types';
import { generateSalt, saltAndHash } from '../common/utilities/crypto';

const router = createRouter();

router.post('/', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.body)) {
      throw new Error('api/login: req.body is not object');
    }
    const { email, password } = req.body;

    if (typeof email !== 'string') {
      throw new Error('api/login: email not type string');
    }
    if (typeof password !== 'string') {
      throw new Error('api/login: password not type string');
    }

    const userObject = await getUserByEmail(email);

    const {
      id: userID,
      username,
      role,
      password: passwordDB,
      salt: saltDB,
    } = userObject;

    const saltedAndHashedLoginPassword: Buffer = saltAndHash(
      password,
      Buffer.from(saltDB, 'hex')
    );
    const checkPassword = saltedAndHashedLoginPassword.toString('hex');

    if (checkPassword !== passwordDB) {
      throw new Error('Unable to authenticate with the provided email and password');
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
      userId: userID,
      username,
      role,
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
