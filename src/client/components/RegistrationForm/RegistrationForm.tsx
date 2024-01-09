import React, { useState, useCallback } from 'react';
import type { FunctionComponent, ChangeEvent, SyntheticEvent } from 'react';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import Input, { InputSize } from '../Input/Input';
import Button, { ButtonSize, ButtonType } from '../Button/Button';
import styles from './RegistrationForm.scss';

const RegistrationForm: FunctionComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('client');

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleNameChange
  = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
      setSubmitted(false);
    },
    [setName],
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

  // TODO: Refactor to account for phone + other possible changes
  const handleSubmit = useCallback(async(e: SyntheticEvent) => {
    try {
      e.preventDefault();
      if (name === '' || email === '' || role === '') {
        setError(true);
        return;
      }
      setError(false);
      const response = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          role,
        }),
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: RegistrationForm.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('success variable not type boolean: RegistrationForm.tsx');
      }
      if (result.success) {
        setSubmitted(true);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [name, email, role]);

  const successMessage = (): React.JSX.Element => (
    <div
      className="success"
      style={{
        display: submitted ? '' : 'none',
      }}
    >
      <h1>
        User
        {' '}
        {name}
        {' '}
        successfully registered!!
      </h1>
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
    <div className={styles.container}>
      <div className={styles.top}>
        <p />
        <h1>Register User</h1>
        <button type="button" onClick={}>X</button>
        {/* TODO: check empty p tag for spacing, create onclick event  */}
      </div>

      <div>
        {errorMessage()}
        {successMessage()}
      </div>

      <form
        className={styles.formContainer}
        onSubmit={handleSubmit}
      >
        <label>
          Name
          <Input
            size={InputSize.Large}
            value={name}
            setValue={setName}
            onChange={handleNameChange}
            placeholderText="John Smith"
            type="text"
          />
        </label>

        <label>
          Email
          <Input
            size={InputSize.Large}
            value={email}
            setValue={setEmail}
            onChange={handleEmailChange}
            placeholderText="jsmith@gmail.com"
            type="text"
          />
          {' '}

        </label>

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

        <Button type={ButtonType.Submit} size={ButtonSize.Large}>Submit</Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
