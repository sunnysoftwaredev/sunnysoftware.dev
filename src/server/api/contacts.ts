import { Router as createRouter } from 'express';
import logger from '../logger';
import { isObjectRecord } from '../../common/utilities/types';
import { insertContact } from '../database';
import { mailgunMessage } from '../mail';

const router = createRouter();

const validateStringProperty = (propertyValue: unknown, propertyName: string): string => {
  if (typeof propertyValue !== 'string') {
    throw new Error(`api/contacts: ${propertyName} not type string`);
  }
  return propertyValue;
};

router.post('/', (req, res) => {
  (async (): Promise<void> => {
      try {
          if (!isObjectRecord(req.body)) {
            res.status(400).json({ success: false, error: 'req.body is not an object' });
            return;
          }
          
          const { contactName, email, subject, message } = req.body;

          const validatedContactName = validateStringProperty(contactName, 'contactName');
          const validatedEmail = validateStringProperty(email, 'email');
          const validatedSubject = validateStringProperty(subject, 'subject');
          const validatedMessage = validateStringProperty(message, 'message');

          const result = await insertContact(
            validatedContactName,
            validatedEmail,
            validatedSubject,
            validatedMessage,
          );

          await mailgunMessage(validatedContactName, validatedEmail, validatedSubject, validatedMessage);

          res.json({ success: true, result });
          logger.info('res.json success in contacts.ts');
        } catch (e) {
          logger.error(`Failed in contacts.ts: ${e}`);
          const statusCode = e.message.startsWith('api/contacts') ? 400 : 500;
          res.status(statusCode).json({ success: false, error: e.message });
        }
  })();
});

export default router;
