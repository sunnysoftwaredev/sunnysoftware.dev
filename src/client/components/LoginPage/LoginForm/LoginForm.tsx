import React, { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FunctionComponent, ChangeEvent } from 'react';
import { isObjectRecord } from '../../../../common/utilities/types';
import AuthContext from '../../../context/AuthContext';
import logger from '../../../../server/logger';
import Input, { InputSize } from '../../Input/Input';
import Button, { ButtonSize, ButtonType } from '../../Button/Button';
import PopupMessage, { PopupType } from '../../PopupMessage/PopupMessage';
import styles from './LoginForm.scss';

const LoginForm: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const navigate = useNavigate();

  const { active }
  = useContext(AuthContext) ?? { active: false };

  if (active) {
    navigate('/');
  }

  const closeErrorPopup = useCallback(() => {
    setShowErrorPopup(!showErrorPopup);
  }, [showErrorPopup]);

  const handleUsernameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [setEmail],
  );

  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    [setPassword],
  );

  const handleShowPasswordChange = useCallback(
    () => {
      setShowPassword(!showPassword);
    },
    [setShowPassword, showPassword],
  );

  const handleSubmit = useCallback(async(e: Event) => {
    e.preventDefault();
    try {
      const response = await fetch('api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: LoginForm.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('success variable not type boolean: LoginForm.tsx');
      }

      if (typeof result.success !== 'boolean') {
        throw new Error('success variable not type boolean: LoginForm.tsx');
      }
      if (result.success) {
        setShowSuccessPopup(true);
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 2000);
      } else {
        setShowErrorPopup(true);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [email, password, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h2>Login</h2>
        <p>Welcome back</p>
      </div>
      {showSuccessPopup && (
        <PopupMessage
          type={PopupType.Success}
          message="Success! You are being redirected to the home page..."
          onClick={closeErrorPopup}
        />
      )}
      {showErrorPopup && (
        <PopupMessage
          type={PopupType.Failure}
          message="Incorrect credentials, please try again or contact us for help"
          onClick={closeErrorPopup}
        />
      )}
      <form className={styles.loginForm}>
        <div>
          <label>
            Email:
            <Input size={InputSize.Large} value={email} setValue={setEmail} onChange={handleUsernameChange} placeholderText="example@gmail.com" />
          </label>
        </div>
        <div>
          <label>
            Password
            <Input
              size={InputSize.Large}
              value={password}
              setValue={setPassword}
              onChange={handlePasswordChange}
              placeholderText="*********"
              type={showPassword ? 'text' : 'password'}
            />
          </label>
          <label
            htmlFor="check"
            className={styles.passwordCheck}
          >
            Show Password
            {' '}
            <input
              id="check"
              type="checkbox"
              onChange={handleShowPasswordChange}
            />

          </label>

        </div>
        <div className={styles.buttons}>
          <Button
            size={ButtonSize.Large} onClick={handleSubmit}
            type={ButtonType.Submit}
          >
            Login
          </Button>
          <a href="/login/forgot-password">Forgot password?</a>
        </div>

      </form>
    </div>
  );
};
export default LoginForm;
