import { Router as createRouter } from 'express';
import logger from '../logger';
import { isObjectRecord } from '../../common/utilities/types';
import { insertContact } from '../database';
import { mailgunMessage } from '../mail';

const router = createRouter();

router.post('/', (req, res) => {
  (async(): Promise<void> => {
    if (!isObjectRecord(req.body)) {
      throw new Error('api/contacts: req.body is not object');
    }
    const { contactName } = req.body;
    const { email } = req.body;
    const { subject } = req.body;
    const { message } = req.body;

    if (typeof contactName !== 'string') {
      throw new Error('api/contacts: contactName not type string');
    }
    if (typeof email !== 'string') {
      throw new Error('api/contacts: email not type string');
    }
    if (typeof subject !== 'string') {
      throw new Error('api/contacts: subject not type string');
    }
    if (typeof message !== 'string') {
      throw new Error('api/contacts:message not type string');
    }

    const result = await insertContact(
      contactName,
      email,
      subject,
      message,
    );

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
  });
});

export default router;
