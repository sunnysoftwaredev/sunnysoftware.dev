import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { isObjectRecord } from '../common/utilities/types';
import config from './config';
import logger from './logger';

const DOMAIN = 'sandbox980f491aefb7400189acac13fb51fe26.mailgun.org';
const mailgun = new Mailgun(formData);
const mailgunClient = mailgun.client({ username: 'api', key: config.mailgun.key });
// CHANGE TO EMAIL IN 2ND FUNCTION
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
  } catch (err: unknown) {
    if (err instanceof Error) {
      logger.error(err.message);
    }
  }
};

export const mailgunRegister
 = async(email: string, username: string, password: string): Promise<void> => {
   try {
     const data = {
       from: 'trevinhofmann@gmail.com',
       to: ['jraugustyn07@gmail.com'], // set email here
       subject: 'Your Sunny Software Regisation:',
       text: `An account has been created for you at Sunny Software. You may log in with the following credentials:

      Username: ${username}
      Password: ${password}

      Please change your password after login.

      Thank you,

      Trevin`,
     };
     const result: unknown = await mailgunClient.messages.create(DOMAIN, data);

     if (!isObjectRecord(result) || result.status !== 200) {
       throw new Error('Unexpected result from mailgun');
     }
   } catch (err: unknown) {
     if (err instanceof Error) {
       logger.error(err.message);
     }
   }
 };

export const mailgunPasswordReset
 = async(email: string, token: string): Promise<void> => {
   try {
     const data = {
       from: 'trevinhofmann@gmail.com',
       to: ['jraugustyn07@gmail.com'], // set email here ${email}
       subject: 'Your Sunny Software Password Reset:',
       text: `A reset of your password was requested. Clicking the link below will take you
       to a password reset page. This will remain active for ten minutes.

       http://localhost:3000/login/reset-password?token=${token}

      Thank you,

      Trevin`,
     };
     const result: unknown = await mailgunClient.messages.create(DOMAIN, data);

     if (!isObjectRecord(result) || result.status !== 200) {
       throw new Error('Unexpected result from mailgun');
     }
   } catch (err: unknown) {
     if (err instanceof Error) {
       logger.error(err.message);
     }
   }
 };
