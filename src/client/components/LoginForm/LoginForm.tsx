import React, { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FunctionComponent, ChangeEvent } from 'react';
import { isObjectRecord } from '../../../common/utilities/types';
import AuthContext from '../../context/AuthContext';
import logger from '../../../server/logger';
import Input, { InputSize } from '../Input/Input';
import Button, { ButtonSize, ButtonType } from '../Button/Button';
import styles from './LoginForm.scss';

const LoginForm: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { active }
  = useContext(AuthContext) ?? { active: false };

  if (active) {
    navigate('/');
  }

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

  const handleSubmit = useCallback(async() => {
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
  }, [email, password, navigate]);

  // potential check for hitting 'enter'
  // useEffect(() => {
  //   const keyDownHandler = event => {
  //     console.log('User pressed: ', event.key);

  //     if (event.key === 'Enter') {
  //       event.preventDefault();

  //       // 👇️ call submit function here
  //       handleSubmit();
  //     }
  //   };

  //   document.addEventListener('keydown', keyDownHandler);

  //   return () => {
  //     document.removeEventListener('keydown', keyDownHandler);
  //   };
  // }, []);

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h2>Login</h2>
        <p>Welcome back</p>
      </div>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div>
          <label>
            Email:
            <Input size={InputSize.Large} value={email} setValue={setEmail} onChange={handleUsernameChange} placeholderText="example@gmail.com" />
          </label>
        </div>
        <div>
          <label>
            Password
            <Input size={InputSize.Large} value={password} setValue={setPassword} onChange={handlePasswordChange} placeholderText="*********" />
          </label>
        </div>
        <div className={styles.buttons}>
          <Button
            size={ButtonSize.Large} onClick={handleSubmit}
            type={ButtonType.Submit}
          >
            Login
          </Button>
          <a href="#">Forgot password?</a>
        </div>

      </form>
    </div>
  );
};
export default LoginForm;
