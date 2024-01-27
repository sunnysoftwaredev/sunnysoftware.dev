import React, { useState, useCallback } from 'react';
import type { FunctionComponent, ChangeEvent, SyntheticEvent } from 'react';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import styles from './RegistrationForm.scss';

const RegistrationForm: FunctionComponent = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('client');

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleUsernameChange
  = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
      setSubmitted(false);
    },
    [setUsername],
  );

  const handleEmailChange
  = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      setSubmitted(false);
    },
    [setEmail],
  );

  const handleRoleChange
  = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setRole(e.target.value);
      setSubmitted(false);
    },
    [setRole]
  );

  const handleSubmit = useCallback(async(e: SyntheticEvent) => {
    e.preventDefault();
    if (username === '' || email === '' || role === '') {
      setError(true);
      return;
    }

    setError(false);
    setSubmitted(false);

    try {
      const response = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, role }),
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result) || typeof result.success !== 'boolean') {
        throw new Error('Server response format is invalid: RegistrationForm.tsx');
      }

      if (result.success) {
      setSubmitted(true);
      } else {
        setError(true);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
        setError(true);
      }
    }
  }, [username, email, role]);

  const successMessage = (): React.JSX.Element => (
    <div
      className="success"
      style={{
        display: submitted ? '' : 'none',
      }}
    >
      <h1>User {username} successfully registered!!</h1>
    </div>
  );

  const errorMessage = (): React.JSX.Element => (
    <div
      className="error"
      style={{
        display: error ? '' : 'none',
      }}
    >
      <h1>Please enter all the fields</h1>
    </div>
  );

  return (
    <div className={styles.registrationForm}>
      <div>
        <h1>Register User</h1>
      </div>

      <div>
        {errorMessage()}
        {successMessage()}
      </div>

      <form>
        <label className="label">Username</label>
        <input
          onChange={handleUsernameChange} className="input"
          value={username} type="text"
        />

        <label className="label">Email</label>
        <input
          onChange={handleEmailChange} className="input"
          value={email} type="email"
        />

        <div>
          <label htmlFor="clientRadio">Client</label>
          <input
            type="radio" name="radioGroup" id="clientRadio"
            value="client" onChange={handleRoleChange}
            checked={role === 'client'}
          />

          <label htmlFor="employeeRadio">Employee</label>
          <input
            type="radio" name="radioGroup" id="employeeRadio"
            value="employee" onChange={handleRoleChange}
            checked={role === 'employee'}
          />
        </div>

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

export default RegistrationForm;
