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

    const { contactName, email, subject, message } = req.body;

    const checkString = [contactName, email, subject, message];

    checkString.forEach(field => {
      if (typeof field !== 'string') {
        throw new Error(`api/contacts: ${field} not type string`);
      }
    });

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
  });
});

export default router;