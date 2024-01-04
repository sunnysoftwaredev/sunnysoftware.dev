import React, { useEffect, useState, useContext } from 'react';
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
  const [popupMessageState, setPopupMessageState] = useState({status: false, type: null});

  const navigate = useNavigate();

  const { active } = useContext(AuthContext) ?? { active: false };

  useEffect(() => {
    if (active) {
      navigate('/');
    }
  },[active, navigate]);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch('/api/forgotPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: ForgotPassword.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('success variable not type boolean: ForgotPassword.tsx');
      }

      setPopupMessageState({
        status: true,
        type: result.success ? PopupType.Success : PopupType.Failure,
      });

    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  };

  const handlePopupMessageClick = (): void => {
    setPopupMessageState({status: false, type: null});
  };

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h2>Forgot password?</h2>
        <p>Welcome back</p>
      </div>
      {popupMessageState.status && (
        <PopupMessage
          type={popupMessageState.type}
          message={
            popupMessageState.type === PopupType.Success
              ? "If you have an account we have sent a reset password link"
              : "Something went wrong, please reach out to us on the contact page"
          }
          onClick={handlePopupMessageClick}
        />
      )}
      <form className={styles.forgotPassword} onSubmit={handleSubmit}>
        <div>
          <label className={styles.boxAndLabel}>
            Email
            <Input
              size={InputSize.Large}
              value={email}
              onChange={handleEmailChange}
              placeholderText="example@gmail.com"
            />
          </label>
        </div>
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