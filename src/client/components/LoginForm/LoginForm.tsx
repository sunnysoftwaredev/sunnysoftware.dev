import React, { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FunctionComponent, ChangeEvent } from 'react';
import { isObjectRecord } from '../../../common/utilities/types';
import AuthContext from '../../context/AuthContext';
import logger from '../../../server/logger';
import Input, { InputSize } from '../Input/Input';
import Button, { ButtonSize } from '../Button/Button';

const LoginForm: FunctionComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { active }
  = useContext(AuthContext) ?? { active: false };

  if (active) {
    navigate('/');
  }

  const handleUsernameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
    },
    [setUsername],
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
          username,
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
  }, [username, password, navigate]);

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <Input icon size={InputSize.Medium} value={username} setValue={setUsername} onChange={handleUsernameChange} placeholderText="Your username" />
        </label>
      </div>
      <div>
        <label>
          Password
          <Input icon size={InputSize.Medium} value={password} setValue={setPassword} onChange={handlePasswordChange} placeholderText="Your password" />
        </label>
      </div>
      <Button size={ButtonSize.Large} onClick={handleSubmit}>Sign in </Button>
      <div className="forgotPassword">
        <a href="#">Forgot password?</a>
      </div>

      <div className="createAccount">
        <a href="/register">Create an account</a>
      </div>
    </form>
  );
};
export default LoginForm;
