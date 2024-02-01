import { Router as createRouter } from 'express';
import logger from '../logger';
import { getUserByEmail, insertToken } from '../database';
import { isObjectRecord } from '../../common/utilities/types';
import { generateSalt, saltAndHash } from '../common/utilities/crypto';

const router = createRouter();

router.post('/', (req, res) => {
  (async (): Promise<void> => {
    let errorMessage = '';
    
    if (!isObjectRecord(req.body)) {
      errorMessage = 'api/login: req.body is not an object';
      res.status(400).json({
        success: false,
        error: errorMessage,
      });
      return;
    }

    const { email, password } = req.body;
    
    if (typeof email !== 'string') {
      errorMessage = 'api/login: email not type string';
    } else if (typeof password !== 'string') {
      errorMessage = 'api/login: password not type string';
    }
    
    if (errorMessage) {
      res.status(400).json({
        success: false,
        error: errorMessage,
      });
      return;
    }

    try {
      const userObject = await getUserByEmail(email);
      const {
        id: userID,
        username,
        role,
        password: passwordDB,
        salt: saltDB,
      } = userObject;

      if (!userObject) {
        throw new Error('User not found');
      }

      const saltedAndHashedLoginPassword: Buffer = saltAndHash(
        password,
        Buffer.from(saltDB, 'hex')
      );
      const checkPassword = saltedAndHashedLoginPassword.toString('hex');

      if (checkPassword !== passwordDB) {
        throw new Error('Unable to authenticate with the provided email and password');
      }

      // Create expiration date 10 days from creation
      const expiration = new Date();
      expiration.setDate(expiration.getDate() + 10);

      // Create and send cookie to browser
      const token = (await generateSalt()).toString('hex');
      await insertToken(userID, token, expiration);
      
      res.cookie('authenticationToken', token, {
        expires: expiration,
        sameSite: 'lax'
      });

      res.json({
        success: true,
        token,
        userId: userID,
        username,
        role,
      });
      logger.info('User logged in successfully');
    } catch (error) {
      res.status(401).json({
        success: false,
        error: error.message || 'Authentication failed',
      });
    }
  })();
});

export default router;
