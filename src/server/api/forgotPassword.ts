import { Router as createRouter } from 'express';
import { Mutex } from 'async-mutex';
import logger from '../logger';
import { isObjectRecord } from '../../common/utilities/types';
import { mailgunPasswordReset } from '../mail';
import { generateResetToken, generateSalt, saltAndHash } from '../common/utilities/crypto';
import { checkResetTokenActive, getIdFromResetToken, getUserIdByEmail, insertPasswordResetToken, updateUserPassword } from '../database';

const router = createRouter();
const mutex = new Mutex();

function validateRequestBody(body: unknown, fields: string[]): asserts body is Record<string, unknown> {
  if (!isObjectRecord(body)) {
    throw new Error('api/forgotPassword: req.body is not object');
  }

  fields.forEach(field => {
    if (typeof body[field] !== 'string') {
      throw new Error(`api/forgotPassword: ${field} not type string`);
    }
  });
}

router.post('/', (req, res) => {
  (async (): Promise<void> => {
    validateRequestBody(req.body, ['email']);
    const { email } = req.body;

    const release = await mutex.acquire();

    try {
      const userId = await getUserIdByEmail(email);
      const resetToken = generateResetToken();

      await insertPasswordResetToken(userId, resetToken);
      await mailgunPasswordReset(email, resetToken);
    } finally {
      release();
    }

    res.json({
      success: true,
    });
    logger.info('res.json success in forgotPassword.ts');
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
  });
});

router.post('/reset', (req, res) => {
  (async (): Promise<void> => {
    validateRequestBody(req.body, ['newPassword', 'resetToken']);
    const { newPassword, resetToken } = req.body;

    const release = await mutex.acquire();

    try {
      const tokenActive = await checkResetTokenActive(resetToken);
      if (!tokenActive) {
        throw new Error('api/forgotPassword/reset: no active resetToken found');
      }
      const userId = await getIdFromResetToken(resetToken);

      const salt = await generateSalt();
      const saltedAndHashedPassword = saltAndHash(newPassword, salt);
      const finalPasswordString = saltedAndHashedPassword.toString('hex');
      const saltString = salt.toString('hex');

      await updateUserPassword(userId, finalPasswordString, saltString);
    } finally {
      release();
    }

    res.json({
      success: true,
    });
    logger.info('res.json success in forgotPassword/reset.ts');
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
  });
});

export default router;
