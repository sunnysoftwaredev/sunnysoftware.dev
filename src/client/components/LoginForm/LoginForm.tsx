import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FunctionComponent, ChangeEvent, SyntheticEvent } from 'react';
import { isObjectRecord } from '../../../common/utilities/types';
import AuthContext from '../../context/AuthContext';

const LoginForm: FunctionComponent = () => {
  const [inputName, setInputName] = useState('');
  const [password, setPassword] = useState('');
  // const [username, setUsername] = useState('');
  // const [role, setRole] = useState('');
  // const [active, setActive] = useState(false);

  const { username, role, active }
  = useContext(AuthContext) ?? { username: '', role: '', active: false };

  // useEffect(() => {
  //   setUsername(rawContext.username);
  //   setRole(rawContext.role);
  //   setActive(rawContext.active);
  // }, [rawContext.username, rawContext.role, rawContext.active]);

  const navigate = useNavigate();

  // const contextObject: nameRoleToken = {
  //   username: '',
  //   role: '',
  //   active: false,
  // };

  // console.log(contextObject);

  // ({username, role, active} = contextObject);
  // check if user logged in already

  // doesn't work have to retrieve cookie if even needed
  // const user = localStorage.getItem('authenticationToken');
  // if (user !== null) {
  //   navigate('/');
  // }

  // const [error, setError] = useState<string | undefined>(undefined);
  // const [token, getToken] = useState('');

  // useEffect(() => {
  //   const rawContext = useContext(AuthContext);
  //   if (typeof rawContext !== 'undefined') {
  //     ({ username, role, active }) = rawContext;
  //   }
  // }, [username, role, active]);

  const handleUsernameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setInputName(e.target.value);
    },
    [setInputName],
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
          inputName,
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
  }, [inputName, password, navigate]);

  // Alt display if logged in
  // if (username !== '') {
  //   return (
  //     <div>
  //       {username}
  //       {' '}
  //       is logged in
  //     </div>
  //   );
  // }

  return (
    <form onSubmit={handleSubmit}>
      {/* <div>
        Cookie is
        {' '}
        {token}
      </div> */}
      {/* <div>
        context object is
        {' '}
        {active}
      </div> */}
      <div>
        Username is
        {' '}
        {username}
        , role is
        {' '}
        {role}
        {' '}
        and active is
        {' '}
        {active}
      </div>
      {active ? <div>true</div> : <div>false</div>}
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
