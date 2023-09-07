import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FunctionComponent, ChangeEvent, SyntheticEvent } from 'react';
import { isObjectRecord } from '../../../common/utilities/types';
import { getLocalCookieValue } from '../../../common/utilities/functions';

const LoginForm: FunctionComponent = () => {
  const navigate = useNavigate();
  // check if user logged in already
  const user = localStorage.getItem('user');
  if (user !== null) {
    navigate('/');
  }

  // const [error, setError] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, getToken] = useState('');

  useEffect(() => {
    const t = getLocalCookieValue();
    if (typeof t === 'undefined') {
      getToken('');
    } else {
      getToken(t);
    }
  }, []);

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

  const handleSubmit = useCallback(async(e: SyntheticEvent) => {
    try {
      e.preventDefault();
      const response = await fetch('http://localhost:3000/api/login', {
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
      console.log(result);

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: LoginForm.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('success variable not type boolean: LoginForm.tsx');
      }
      if (typeof result.isloggedin !== 'boolean') {
        throw new Error('isloggedin variable not type boolean: LoginForm.tsx');
      }
      // store in localStorage
      if (result.success) {
        if (result.isloggedin) {
          localStorage.setItem('user', JSON.stringify(result.isloggedin));
          navigate('/');
        } else {
          navigate('/contact-us');
        }
      } else {
        // something else in future
        console.log('Login not successful');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err);
      }
    }
  }, [username, password, navigate]);

  // Alt display if logged in
  if (user !== null) {
    return (
      <div>
        {user}
        {' '}
        is logged in
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        Cookie is
        {' '}
        {token}
      </div>
      <div className="usernameBox">
        <input
          type="text" id="username" className="usernameBox"
          onChange={handleUsernameChange}
        />
        <label className="usernameLabel" htmlFor="username">
          Username
        </label>
      </div>

      <div className="passwordBox">
        <input
          type="password" id="passwordBox" className="passwordBox"
          onChange={handlePasswordChange}
        />
        <label className="passwordLabel" htmlFor="passwordBox">
          Password
        </label>
      </div>

      <button type="submit" className="loginButton">
        Sign in
      </button>

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
