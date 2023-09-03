import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import type { FunctionComponent } from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

const RegisterPage: FunctionComponent = () => {
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
        <title>Register-Sunny Software</title>
        <link rel="canonical" href="https://sunnysoftware.dev/register" />
        <meta name="description" content="The registration page" />
      </Helmet>
      <RegistrationForm />

    </div>
  );
};

export default RegisterPage;
