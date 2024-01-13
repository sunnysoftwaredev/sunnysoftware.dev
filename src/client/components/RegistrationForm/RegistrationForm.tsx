import React, { useState, useCallback } from 'react';
import type { FunctionComponent, ChangeEvent, SyntheticEvent } from 'react';
import { useDispatch } from 'react-redux';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import Input, { InputSize } from '../Input/Input';
import Button, { ButtonSize, ButtonType } from '../Button/Button';
import { AdminPortalActions } from '../../redux/slices/adminPortal';
import PopupMessage, { PopupType } from '../PopupMessage/PopupMessage';
import styles from './RegistrationForm.scss';

const RegistrationForm: FunctionComponent = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('client');

  const dispatch = useDispatch();

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const closeSuccessPopup = useCallback(() => {
    setShowSuccessPopup(!showSuccessPopup);
  }, [showSuccessPopup]);

  const closeErrorPopup = useCallback(() => {
    setShowErrorPopup(!showErrorPopup);
  }, [showErrorPopup]);

  const handleUsernameChange
  = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
      setShowErrorPopup(false);
    },
    [setUsername],
  );

  const handleEmailChange
  = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      setShowErrorPopup(false);
    },
    [setEmail],
  );

  const handlePhoneChange
  = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPhone(e.target.value);
      setShowErrorPopup(false);
    },
    [setPhone],
  );

  const handleRoleChange
  = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setRole(e.target.value);
      setShowErrorPopup(false);
    },
    [setRole]
  );

  const toggleRegistrationForm = useCallback(
    () => {
      dispatch(AdminPortalActions.toggleShowRegistrationForm());
    },
    [dispatch]
  );

  const handleSubmit = useCallback(async(e: SyntheticEvent) => {
    try {
      e.preventDefault();
      if (username === '' || email === '' || phone === '' || role === '') {
        setShowErrorPopup(true);
        return;
      }
      setShowErrorPopup(false);
      const response = await fetch('api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          phone,
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
        setShowSuccessPopup(true);
        setTimeout(() => {
          toggleRegistrationForm();
        }, 1000);
      }
    } catch (err: unknown) {
      setShowErrorPopup(true);
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [username, email, phone, role, toggleRegistrationForm]);

  return (
    <div className={styles.container}>
      <button
        className={styles.backgroundButton}
        type="button"
        onClick={toggleRegistrationForm}
      />

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <div>
          {showSuccessPopup
        && (
          <PopupMessage
            type={PopupType.Success}
            message="User successfully registered"
            onClick={closeSuccessPopup}
          />
        )}
          {showErrorPopup
        && (
          <PopupMessage
            type={PopupType.Failure}
            message="Something went wrong, did you enter all the fields?"
            onClick={closeErrorPopup}
          />
        )}
        </div>
        <div className={styles.top}>
          <p />
          <h1>Register User</h1>
          <button type="button" onClick={toggleRegistrationForm}>X</button>
        </div>
        <label>
          Name
          <Input
            size={InputSize.Large}
            value={username}
            setValue={setUsername}
            onChange={handleUsernameChange}
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
        <label>
          Phone
          <Input
            size={InputSize.Large}
            value={phone}
            setValue={setPhone}
            onChange={handlePhoneChange}
            placeholderText="8675309"
            type="text"
          />
          {' '}
        </label>

        {/* radio buttons to choose client or employee  */}
        {/* Leaving in for now so as not to create confusion in the backend */}

        <div className={styles.roleRadio}>
          <div>

            <label htmlFor="clientRadio">Client</label>
            <input
              type="radio" name="radioGroup" id="clientRadio"
              value="client" onChange={handleRoleChange}
              checked={role === 'client'}
            />
          </div>

          <div>
            <label htmlFor="employeeRadio">Employee</label>
            <input
              type="radio" name="radioGroup" id="employeeRadio"
              value="employee" onChange={handleRoleChange}
              checked={role === 'employee'}

            />
          </div>

        </div>
        <Button type={ButtonType.Submit} size={ButtonSize.Large}>Submit</Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
