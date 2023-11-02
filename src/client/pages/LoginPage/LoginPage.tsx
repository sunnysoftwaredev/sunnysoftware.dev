import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import type { FunctionComponent } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate();
  // check if user logged in already
  const user = localStorage.getItem('user');
  if (user !== null) {
    navigate('/');
  }
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login-Sunny Software</title>
        <link rel="canonical" href="https://sunnysoftware.dev/login" />
        <meta name="description" content="The login page" />
      </Helmet>
      <h1 className="loginPage">Login Page</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
