import React, { useState, useCallback } from 'react';
import type { FunctionComponent } from 'react';

const LoginForm: FunctionComponent = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleUsernameChange = useCallback((event:
  ChangeEventHandler<HTMLInputElement>):
  void => setUsername(event.value), [setUsername]);
  const handlePasswordChange = useCallback((newValue: string):
  void => setPassword(newValue), [setPassword]);

  const handleSubmit = useCallback(async() => {
    try {
      const response = await fetch('http://127.0.0.1/3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const result = await response.json();
    } catch (error) {

    }
  }, [username, password]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-outline mb-4">
        <input
          type="email" id="username" className="form-control"
          onChange={handleUsernameChange}
        />
        <label className="form-label" htmlFor="username">
          Username
        </label>
      </div>

      <div className="form-outline mb-4">
        <input
          type="password" id="passwordBox" className="form-control"
          onChange={handlePasswordChange}
        />
        <label className="form-label" htmlFor="passwordBox">
          Password
        </label>
      </div>

      <div className="row mb-4">
        <div className="col">
          <a href="#">Forgot password?</a>
        </div>
      </div>

      <button type="button" className="btn btn-primary btn-block mb-4">
        Sign in
      </button>

      <div className="text-center">
        <p>
          <a href="#!">Create an account</a>
        </p>

      </div>
    </form>
  );
};
export default LoginForm;
