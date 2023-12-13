import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import type { FunctionComponent } from 'react';
import logo from '../../static/images/Logo.png';
import loginPhoto from '../../static/images/LoginPhoto.png';
import NewPassword from '../../components/LoginPage/ResetPassword/ResetPassword';
import styles from './ResetPasswordPage.scss';

const ResetPasswordPage: FunctionComponent = () => {
  // check if user logged in already
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  if (user !== null) {
    navigate('/');
  }

  return (
    <div className={styles.pageContainer}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login-Sunny Software</title>
        <link rel="canonical" href="https://sunnysoftware.dev/login/reset-password" />
        <meta name="description" content="The reset password page" />
      </Helmet>
      <div className={styles.loginContainer}>
        <a href="/">
          <img src={logo} alt="Sunny Software Logo" />
        </a>
        <NewPassword />
      </div>
      <div className={styles.loginPhoto}>
        <img src={loginPhoto} alt="Employees at planning meeting" />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
