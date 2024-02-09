import type { ChangeEvent, FunctionComponent } from 'react';
import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import Button, { ButtonSize, ButtonType } from '../Button/Button';
import Input, { InputSize } from '../Input/Input';
import styles from './ContactForm.scss';

const ContactForm: FunctionComponent = () => {
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setter(e.target.value);
    setSubmitted(false);
  }, [setter]);

  const areInputsValid = () => {
    return contactName && email && subject && message;
  };

  const handleSubmit = useCallback(async () => {
    if (!areInputsValid()) {
      setError(true);
      return;
    }
    setError(false);
    try {
      const response = await fetch('api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactName,
          email,
          subject,
          message,
        }),
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: ContactForm.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('success variable not type boolean: ContactForm.tsx');
      }
      if (result.success) {
        setSubmitted(true);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
        setError(true);
      }
    }
  }, [contactName, email, subject, message]);

  const successMessage = (): React.JSX.Element => (
    <div className={classNames({ [styles.hidden]: !submitted })}>
      <h1>Message Sent!</h1>
      <h3>Someone will be in contact with you shortly</h3>
    </div>
  );

  const errorMessage = (): React.JSX.Element => (
    <div className={classNames({ [styles.hidden]: !error })}>
      <h1>Please enter all the fields</h1>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={classNames(styles.formHeader, { [styles.hidden]: submitted || error })}>
        <h1>Send us a message!</h1>
      </div>

      <div className={styles.popUpMessages}>
        {errorMessage()}
        {successMessage()}
      </div>

      <form className={styles.formContainer}>
        <Input
          size={InputSize.Large}
          onChange={handleInputChange(setContactName)}
          setValue={setContactName}
          placeholderText="Name"
          value={contactName}
        />
        <Input
          size={InputSize.Large}
          onChange={handleInputChange(setEmail)}
          setValue={setEmail}
          placeholderText="Email"
          value={email}
        />
        <Input
          size={InputSize.Large}
          onChange={handleInputChange(setSubject)}
          setValue={setSubject}
          placeholderText="Subject"
          value={subject}
        />
        <textarea
          onChange={handleInputChange(setMessage)}
          className={styles.message}
          value={message}
          placeholder="Your message here..."
        />
        <Button
          size={ButtonSize.Large}
          type={ButtonType.Submit}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
