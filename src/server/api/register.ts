import { Router as createRouter } from 'express';
import { Mutex } from 'async-mutex';
import logger from '../logger';
import { isObjectRecord } from '../../common/utilities/types';
import { insertUser } from '../database';
import { generatePassword, generateSalt, saltAndHash } from '../common/utilities/crypto';
import { mailgunRegister } from '../mail';

const router = createRouter();
const mutex = new Mutex();

// This function will validate the user data object
function validateUserData(userData: Record<string, unknown>): { username: string; email: string; role: string } {
  if (!isObjectRecord(userData)) {
    throw new Error('api/register: req.body is not object');
  }
  const { username, email, role } = userData;

  if (typeof username !== 'string') {
    throw new Error('username not type string');
  }
  if (typeof email !== 'string') {
    throw new Error('email not type string');
  }
  if (typeof role !== 'string') {
    throw new Error('role not type string');
  }

  return { username, email, role };
}

router.post('/', (req, res) => {
  (async(): Promise<void> => {
    const { username, email, role } = validateUserData(req.body);

    const release = await mutex.acquire();

    try {
      const password = generatePassword();
      const salt = await generateSalt();
      const saltedAndHashedPassword = saltAndHash(password, salt);
      const finalPasswordString = saltedAndHashedPassword.toString('hex');
      const saltString = salt.toString('hex');

      await insertUser(
        username,
        email,
        finalPasswordString,
        role,
        saltString
      );

      await mailgunRegister(email, username, password);
    } finally {
      release();
    }

    res.json({
      success: true,
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
