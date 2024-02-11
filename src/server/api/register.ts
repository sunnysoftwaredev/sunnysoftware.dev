import { Router as createRouter } from 'express';
import { Mutex } from 'async-mutex';
import logger from '../logger';
import { isObjectRecord } from '../../common/utilities/types';
import { insertUser } from '../database';
import { generatePassword, generateSalt, saltAndHash } from '../common/utilities/crypto';
import { mailgunRegister } from '../mail';

const router = createRouter();
const mutex = new Mutex();

const registerUser = async (username: string, email: string, role: string): Promise<void> => {
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
}

router.post('/', async (req, res) => {
  if (!isObjectRecord(req.body)) {
    return res.status(400).json({
      success: false,
      error: 'api/register: req.body is not object',
    });
  }
  const { username, email, role } = req.body;

  try {
    if (typeof username !== 'string' || typeof email !== 'string' || typeof role !== 'string') {
        return res.status(400).json({
          success: false,
          error: 'username, email, and role must be of type string',
        });
    }
    
    await registerUser(username, email, role);
    
    res.json({ success: true });
    logger.info('User registration successful in register.ts');
  } catch (e) {
    logger.error(`User registration failed in register.ts: ${e}`);
    res.status(500).json({ success: false, error: e.message });
  }
});

export default router;
