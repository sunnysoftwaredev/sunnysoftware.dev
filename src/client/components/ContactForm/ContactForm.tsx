import type { ChangeEvent, FunctionComponent, SyntheticEvent } from 'react';
import React, { useState, useCallback } from 'react';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import styles from './ContactForm.scss';

const ContactForm: FunctionComponent = () => {
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setContactName(e.target.value);
      setSubmitted(false);
    },
    [setContactName],
  );

  // Handling the email change
  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setSubmitted(false);
  }, [setEmail],);

  // Handling the password change
  const handleSubjectChange
  = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
    setSubmitted(false);
  }, [setSubject]);

  const handleMessageChange
  = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setSubmitted(false);
  }, [setMessage]);

  // Handling the form submission
  const handleSubmit = useCallback(async(e: SyntheticEvent) => {
    try {
      e.preventDefault();
      if (contactName === '' || email === '' || subject === '' || message === '') {
        setError(true);
        return;
      }
      setError(false);
      const response = await fetch('http://localhost:3000/api/contacts', {
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
      }
    }
  }, [contactName, email, subject, message]);

  // Showing success message
  const successMessage = (): React.JSX.Element => (
    <div
      className="success"
      style={{
        display: submitted ? '' : 'none',
      }}
    >
      <h1>
        Message Sent!
      </h1>
      <h3>Someone will be in contact with you shortly</h3>
    </div>
  );

  // Showing error message if error is true
  const errorMessage = (): React.JSX.Element => (
    <div
      style={{
        display: error ? '' : 'none',
      }}
    >
      <h1>Please enter all the fields</h1>
    </div>
  );

  return (
    <div >
      <div
        className={styles.formHeader} style={{
          display: error ? 'none' : '',
        }}
      >
        <h1>Send us a message!</h1>
      </div>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form className={styles.formContainer}>
        <label className="label">Name</label>
        <input
          onChange={handleNameChange} className="input"
          value={contactName} type="name"
        />

        <label className="label">Email</label>
        <input
          onChange={handleEmailChange} className="input"
          value={email} type="email"
        />

        <label className="label">Subject</label>
        <input
          onChange={handleSubjectChange} className="input"
          value={subject} type="subject"
        />
        <textarea
          onChange={handleMessageChange} className={styles.message}
          value={message}
          placeholder="Your message here..."
        />

        <button
          onClick={handleSubmit} className="registerButton"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
