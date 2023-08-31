import React from 'react';
import { redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import type { FunctionComponent } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';

const LoginPage: FunctionComponent = () => {
  // check if user logged in already
  const user = localStorage.getItem('user');
  if (user !== null) {
    redirect('http://127.0.0.1/3000/');
  }
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login-Sunny Software</title>
        <link rel="canonical" href="https://sunnysoftware.dev/login" />
        <meta name="description" content="The login page" />
      </Helmet>
      <h1 className="LoginPage">LoginPage</h1>
      <p>Login to Sunny Software</p>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
