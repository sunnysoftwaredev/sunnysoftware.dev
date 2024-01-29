import { Router as createRouter } from 'express';
import logger from '../logger';
import { getUserByEmail, insertToken } from '../database';
import { isObjectRecord } from '../../common/utilities/types';
import { generateSalt, saltAndHash } from '../common/utilities/crypto';

const router = createRouter();

router.post('/', async (req, res) => {
  try {
    if (!isObjectRecord(req.body)) {
      res.status(400).json({ success: false, message: 'Request body must be an object.' });
      return;
    }
  
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string') {
      res.status(400).json({ success: false, message: 'Email and password must be strings.' });
      return;
    }

    const userObject = await getUserByEmail(email);

    if (!userObject) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
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
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 10);

    const token = (await generateSalt()).toString('hex');
    await insertToken(userID, token, expiration);

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

    logger.info('User logged in successfully.', { userId: userID });
  } catch (error) {
    logger.error('Login failed.', { error: error instanceof Error ? error.message : error });
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred during login.',
    });
  }
});

export default router;
