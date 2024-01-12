import { Router as createRouter } from 'express';
import logger from '../logger';
import { isObjectRecord } from '../../common/utilities/types';
import { insertContact } from '../database';
import { mailgunMessage } from '../mail';

const router = createRouter();

router.post('/', (req, res) => {
  (async (): Promise<void> => {
    if (!isObjectRecord(req.body)) {
      return res.status(400).json({ success: false, error: 'req.body is not an object.' });
    }

    const { contactName, email, subject, message } = req.body;

    if (
      typeof contactName !== 'string' ||
      typeof email !== 'string' ||
      typeof subject !== 'string' ||
      typeof message !== 'string'
    ) {
      return res.status(400).json({
        success: false,
        error: 'contactName, email, subject, and message must be strings.',
      });
    }

    try {
      const result = await insertContact(contactName, email, subject, message);
      await mailgunMessage(contactName, email, subject, message);

      res.json({
        success: true,
        result,
      });
      logger.info('res.json success in contacts.ts');
    } catch (e) {
      res.status(500).json({
        success: false,
        error: e instanceof Error ? e.message : 'Unknown error',
      });
    }
  })();
});

export default router;
