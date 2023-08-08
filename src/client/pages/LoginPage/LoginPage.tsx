import React from 'react';
import type { FunctionComponent } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage: FunctionComponent = () => (
  <div>
    <h1 className="LoginPage">LoginPage</h1>
    <p>Login to Sunny Software</p>
    <LoginForm />
  </div>
);

export default LoginPage;
