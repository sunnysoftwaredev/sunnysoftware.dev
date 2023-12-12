import React, { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FunctionComponent, ChangeEvent } from 'react';
import { isObjectRecord } from '../../../../common/utilities/types';
import AuthContext from '../../../context/AuthContext';
import logger from '../../../../server/logger';
import Input, { InputSize } from '../../Input/Input';
import Button, { ButtonSize, ButtonType } from '../../Button/Button';
import styles from './ForgotPassword.scss';

const ForgotPassword: FunctionComponent = () => {
  const [email, setEmail] = useState('');

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

  // TODO: Update api for ForgotPassword
  const handleSubmit = useCallback(async() => {
    try {
      const response = await fetch('api/login', {
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
        navigate('/');
        window.location.reload();
      } else {
        navigate('/contact-us');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [email, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h2>Forgot password?</h2>
        <p>Welcome back</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.forgotPassword}>
        <div>
          <label>
            Email:
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
            size={ButtonSize.Large} onClick={handleSubmit}
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
