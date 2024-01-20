import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FunctionComponent, ChangeEvent, FormEvent } from 'react';
import { useSelector } from 'react-redux';
import { isObjectRecord } from '../../../../common/utilities/types';
import logger from '../../../../server/logger';
import Input, { InputSize } from '../../Input/Input';
import Button, { ButtonSize, ButtonType } from '../../Button/Button';
import PopupMessage, { PopupType } from '../../PopupMessage/PopupMessage';
import { getLoggedIn } from '../../../redux/selectors/account';
import styles from './ForgotPassword.scss';

const ForgotPassword: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const showSuccessPopupFunction = useCallback(() => {
    setShowSuccessPopup(!showSuccessPopup);
  }, [showSuccessPopup]);

  const showErrorPopupFunction = useCallback(() => {
    setShowErrorPopup(!showErrorPopup);
  }, [showErrorPopup]);

  const navigate = useNavigate();
  const loggedIn = useSelector(getLoggedIn);

  if (loggedIn) {
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
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        switch (response.status) {
          case 400:
            setErrorMessage("Bad Request: Please verify the email and try again.");
            break;
          case 404:
            setErrorMessage("Not Found: The requested resource was not found.");
            break;
          case 500:
            setErrorMessage("Internal Server Error: Please try again later.");
            break;
          default:
            setErrorMessage("An error occurred: Please try again or contact support.");
        }
        setShowErrorPopup(true);
        return;
      }

      const result: unknown = await response.json();

      if (!isObjectRecord(result) || typeof result.success !== 'boolean') {
        throw new Error(`Invalid response structure or type: ${JSON.stringify(result)}`);
      }

      if (result.success) {
        setShowSuccessPopup(true);
      } else {
        setErrorMessage("Failed to send reset link: Please verify your email or try again later.");
        setShowErrorPopup(true);
      }
    } catch (err: unknown) {
      let message = 'An error occurred during the reset password process.';
      if (err instanceof Error) {
        message += ` Error: ${err.message}`;
      }
      logger.error(message);
      setErrorMessage(message);
      setShowErrorPopup(true);
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
      )}
      {showErrorPopup && (
        <PopupMessage
          type={PopupType.Failure}
          message={errorMessage}
          onClick={showErrorPopupFunction}
        />
      )}
      <form
        className={styles.forgotPassword}
        onClick={handleSubmit}
      >
        <div>
          <label className={styles.boxAndLabel}>
            Email
            <Input
              size={InputSize.Large}
              value={email}
              setValue={setEmail}
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
