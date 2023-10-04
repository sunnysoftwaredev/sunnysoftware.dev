import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { isObjectRecord } from '../common/utilities/types';
import config from './config';
import logger from './logger';

const DOMAIN = 'sandbox980f491aefb7400189acac13fb51fe26.mailgun.org';
const mailgun = new Mailgun(formData);
const mailgunClient = mailgun.client({ username: 'api', key: config.mailgun.key });

export const mailgunMessage = async(
  contactName: string, messageEmail: string,
  messageSubject: string, message: string
): Promise<void> => {
  try {
    const data = {
      from: 'trevinhofmann@gmail.com',
      to: ['trevinhofmann@gmail.com', 'jraugustyn07@gmail.com'],
      subject: `Sunny Software Contact: ${messageSubject}`,
      text: `New contact from: ${contactName}
      Email: ${messageEmail}
      Message: ${message},`,
    };
    const result: unknown = await mailgunClient.messages.create(DOMAIN, data);

    if (!isObjectRecord(result) || result.status !== 200) {
      throw new Error('Unexpected result from mailgun');
    }
    // logger.info(result);
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(err.message);
    }
  }
};
