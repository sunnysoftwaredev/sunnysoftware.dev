import { Router as createRouter } from 'express';
import logger from '../logger';
import { isObjectRecord } from '../../common/utilities/types';
import { insertContact } from '../database';
import { mailgunMessage } from '../mail';

const router = createRouter();

type ContactRequestBody = {
  contactName: string;
  email: string;
  subject: string;
  message: string;
};

const validateRequestBody = (body: any): ContactRequestBody => {
  if (!isObjectRecord(body)) {
    throw new Error('api/contacts: req.body is not an object');
  }
  const { contactName, email, subject, message } = body;
  if (typeof contactName !== 'string' ||
      typeof email !== 'string' ||
      typeof subject !== 'string' ||
      typeof message !== 'string') {
    throw new Error('api/contacts: Invalid type');
  }
  return { contactName, email, subject, message };
};

router.post('/', (req, res) => {
  (async(): Promise<void> => {
    const { contactName, email, subject, message } = validateRequestBody(req.body);

    const result = await insertContact(contactName, email, subject, message);

    await mailgunMessage(contactName, email, subject, message);

    res.json({
      success: true,
      result,
    });
    logger.info('res.json success in contacts.ts');
  })().catch((e: Error) => {
    res.json({
      success: false,
      error: e.message,
    });
    logger.error('Error in POST /contacts', e);
  });
});

export default router;
