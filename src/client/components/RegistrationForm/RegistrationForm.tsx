import React, { useState, useCallback } from 'react';
import type { FunctionComponent, ChangeEvent, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { isObjectRecord } from '../../common/utilities/types';

const RegistrationForm: FunctionComponent = () => {
  const navigate = useNavigate();
  // States for registration
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleUsernameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
      setSubmitted(false);
    },
    [setUsername],
  );

  // Handling the email change
  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setSubmitted(false);
  }, [setEmail],);

  // Handling the password change
  const handlePasswordChange
  = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setSubmitted(false);
  }, [setPassword]);

  // Handling the form submission
  const handleSubmit = useCallback(async(e: SyntheticEvent) => {
    try {
      e.preventDefault();
      if (username === '' || email === '' || password === '') {
        setError(true);
        return;
      }
      setSubmitted(true);
      setError(false);
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          role,
        }),
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: RegistrationForm.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('success variable not type boolean: RegistrationForm.tsx');
      }
      // store in localStorage
      if (result.success) {
        localStorage.setItem('user', JSON.stringify(result.isloggedin));
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        navigate('/contact-us');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err);
      }
    }
  }, [username, email, password, role, navigate]);

  // Showing success message
  const successMessage = (): React.JSX.Element => (
    <div
      className="success"
      style={{
        display: submitted ? '' : 'none',
      }}
    >
      <h1>
        User
        {username}
        {' '}
        successfully registered!!
      </h1>
    </div>
  );

  // Showing error message if error is true
  const errorMessage = (): React.JSX.Element => (
    <div
      className="error"
      style={{
        display: error ? '' : 'none',
      }}
    >
      <h1>Please enter all the fields</h1>
    </div>
  );

  return (
    <div className="form">
      <div>
        <h1>User Registration</h1>
      </div>

      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form>
        {/* Labels and inputs for form data */}
        <label className="label">Username</label>
        <input
          onChange={handleUsernameChange} className="input"
          value={username} type="text"
        />

        <label className="label">Email</label>
        <input
          onChange={handleEmailChange} className="input"
          value={email} type="email"
        />

        <label className="label">Password</label>
        <input
          onChange={handlePasswordChange} className="input"
          value={password} type="password"
        />

        <button
          onClick={handleSubmit} className="registerButton"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
