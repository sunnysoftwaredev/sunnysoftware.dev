import { Router as createRouter } from 'express';
import logger from '../logger';
import { getUserByEmail, insertToken } from '../database';
import { isObjectRecord } from '../../common/utilities/types';
import { generateSalt, saltAndHash } from '../common/utilities/crypto';

const router = createRouter();

router.post('/', (req, res) => {
  const fail = (error: Error, statusCode: number = 500) => {
    logger.error(error); // Now logging the error for better traceability
    res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  };

  (async (): Promise<void> => {
    try {
      if (!isObjectRecord(req.body)) {
        return fail(new Error('api/login: req.body must be an object'), 400);
      }
      const { email, password } = req.body;

      if (typeof email !== 'string') {
        return fail(new Error('api/login: email must be a string'), 400);
      }
      if (typeof password !== 'string') {
        return fail(new Error('api/login: password must be a string'), 400);
      }

      const userObject = await getUserByEmail(email);
      if (!userObject) {
        return fail(new Error('User not found'), 400);
      }

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
        return fail(new Error('Unable to authenticate with the provided email and password'), 401);
      }

      // create expiration date 10 days from creation
      const expiration = new Date();
      expiration.setDate(expiration.getDate() + 10);
      // create and send cookie to browser
      const token = (await generateSalt()).toString('hex');
      await insertToken(userID, token, expiration);  // Ensure async call has completed
      res.cookie('authenticationToken', token, {
        expires: expiration,
        sameSite: 'lax',
      });

      res.json({
        success: true,
        token,
        userId: userID,
        username,
        role,
      });
      logger.info('User logged in successfully.');
    } catch (e) {
      fail(e instanceof Error ? e : new Error('Unexpected error'), 500);
    }
  })();
});

export default router;
