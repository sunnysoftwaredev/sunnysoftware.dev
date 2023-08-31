import React, { useState, useCallback } from 'react';
import { redirect } from 'react-router-dom';
import type { FunctionComponent, ChangeEvent, SyntheticEvent } from 'react';
import { isObjectRecord } from '../../../server/common/utilities/types';

const LoginForm: FunctionComponent = () => {
  // check if user logged in already
  const user = localStorage.getItem('user');
  if (user !== null) {
    redirect('http://127.0.0.1/3000/');
  }

  // const [error, setError] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
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
      console.log('trying fetch in tsx file...');
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
      console.log('tsx file made it here, result type is: ', typeof (result));
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
      // store string in localStorage
      // if (typeof result.username !== 'string') {
      //   throw new Error('username variable not type string: LoginForm.tsx');
      // }
      if (result.success) {
        if (result.isloggedin) {
          localStorage.setItem('user', JSON.stringify(result.isloggedin));
          redirect('/http://127.0.0.1/3000/');
        } else {
          redirect('/http://127.0.0.1/3000/contact-us');
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err);
      }
    }
  }, [username, password]);

  return (
    <form onSubmit={handleSubmit}>
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
        <a href="#!">Create an account</a>
      </div>
    </form>
  );
};
export default LoginForm;
