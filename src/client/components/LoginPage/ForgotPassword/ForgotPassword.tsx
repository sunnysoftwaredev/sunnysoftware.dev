import React, { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FunctionComponent, ChangeEvent, FormEvent } from 'react';
import { isObjectRecord } from '../../../../common/utilities/types';
import AuthContext from '../../../context/AuthContext';
import logger from '../../../../server/logger';
import Input, { InputSize } from '../../Input/Input';
import Button, { ButtonSize, ButtonType } from '../../Button/Button';
import PopupMessage, { PopupType } from '../../PopupMessage/PopupMessage';
import styles from './ForgotPassword.scss';

const ForgotPassword: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const showSuccessPopupFunction = useCallback(() => {
    setShowSuccessPopup(!showSuccessPopup);
  }, [showSuccessPopup]);

  const showErrorPopupFunction = useCallback(() => {
    setShowErrorPopup(!showErrorPopup);
  }, [showErrorPopup]);

  const navigate = useNavigate();

  const { active }
  = useContext(AuthContext) ?? { active: false };

  if (active) {
    navigate('/');
  }

  const handleEmailChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [setEmail],
  );

  const handleSubmit = useCallback(async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: ForgotPassword.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('success variable not type boolean: ForgotPassword.tsx');
      }

      if (typeof result.success !== 'boolean') {
        throw new Error('success variable not type boolean: ForgotPassword.tsx');
      }
      if (result.success) {
        setShowSuccessPopup(true);
      } else {
        setShowErrorPopup(true);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [email]);

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h2>Forgot password?</h2>
        <p>Welcome back</p>
      </div>
      {showSuccessPopup && (
        <PopupMessage
          type={PopupType.Success}
          message="If you have an account we have sent a reset password link"
          onClick={showSuccessPopupFunction}
        />
      ) }
      {showErrorPopup && (
        <PopupMessage
          type={PopupType.Failure}
          message="Something went wrong, please reach out to us on the contact page"
          onClick={showErrorPopupFunction}
        />
      ) }
      <form
        className={styles.forgotPassword}
        onClick={handleSubmit}
      >
        <div>
          <label className={styles.boxAndLabel}>
            Email
            <Input
              size={InputSize.Large}
              value={email} setValue={setEmail}
              onChange={handleEmailChange}
              placeholderText="example@gmail.com"
            />
          </label>
        </div>
        <div />
        <div className={styles.buttons}>
          <Button
            size={ButtonSize.Large}
            type={ButtonType.Submit}
          >
            Reset password
          </Button>
          <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
};
export default ForgotPassword;
