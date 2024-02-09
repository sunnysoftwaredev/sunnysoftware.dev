import { Router as createRouter, Request, Response, NextFunction } from 'express';
import { Mutex } from 'async-mutex';
import logger from '../logger';
import { isObjectRecord } from '../../common/utilities/types';
import { mailgunPasswordReset } from '../mail';
import { generateResetToken, generateSalt, saltAndHash } from '../common/utilities/crypto';
import {
  checkResetTokenActive,
  getIdFromResetToken,
  getUserIdByEmail,
  insertPasswordResetToken,
  updateUserPassword,
} from '../database';

const router = createRouter();
const mutex = new Mutex();

const validateRequestBodyIsObject = (req: Request, _res: Response, next: NextFunction) => {
  if (!isObjectRecord(req.body)) {
    throw new Error('Expected request body to be an object');
  }
  next();
};

const validateEmailInBody = (req: Request, _res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (typeof email !== 'string') {
    throw new Error('email must be a string');
  }
  next();
};

const validateResetFieldsInBody = (req: Request, _res: Response, next: NextFunction) => {
  const { newPassword, resetToken } = req.body;
  if (typeof newPassword !== 'string') {
    throw new Error('newPassword must be a string');
  }
  if (typeof resetToken !== 'string') {
    throw new Error('resetToken must be a string');
  }
  next();
};

const handleError = (error: Error, res: Response) => {
  res.json({
    success: false,
    error: error.message,
  });
};

router.post(
  '/',
  validateRequestBodyIsObject,
  validateEmailInBody,
  async (req: Request, res: Response) => {
    const { email } = req.body;
    const release = await mutex.acquire();
    try {
      const userId = await getUserIdByEmail(email);
      const resetToken = generateResetToken();

      await insertPasswordResetToken(userId, resetToken);
      await mailgunPasswordReset(email, resetToken);
      res.json({
        success: true,
      });
      logger.info('Password reset email sent successfully');
    } catch (e) {
      handleError(e, res);
    } finally {
      release();
    }
  }
);

router.post(
  '/reset',
  validateRequestBodyIsObject,
  validateResetFieldsInBody,
  async (req: Request, res: Response) => {
    const { newPassword, resetToken } = req.body;
    const release = await mutex.acquire();
    try {
      const tokenActive = await checkResetTokenActive(resetToken);
      if (!tokenActive) {
        throw new Error('No active reset token found');
      }
      const userId = await getIdFromResetToken(resetToken);
      const salt = await generateSalt();
      const saltedAndHashedPassword = saltAndHash(newPassword, salt);
      const finalPasswordString = saltedAndHashedPassword.toString('hex');
      const saltString = salt.toString('hex');

      await updateUserPassword(userId, finalPasswordString, saltString);
      res.json({
        success: true,
      });
      logger.info('Password reset successfully');
    } catch (e) {
      handleError(e, res);
    } finally {
      release();
    }
  }
);

export default router;
