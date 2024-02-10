import React, { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import logo from '../../static/images/Logo.png';
import loginPhoto from '../../static/images/LoginPhoto.png';
import ForgotPassword from '../../components/LoginPage/ForgotPassword/ForgotPassword';
import { getLoggedIn } from '../../redux/selectors/account';
import styles from './ForgotPasswordPage.scss';

const ForgotPasswordPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const loggedIn = useSelector(getLoggedIn);

  useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn, navigate]);

  return (
    <div className={styles.pageContainer}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login-Sunny Software</title>
        <link rel="canonical" href="https://sunnysoftware.dev/login/forgot-password" />
        <meta name="description" content="The forgot password page" />
      </Helmet>
      <div className={styles.loginContainer}>
        <a href="/">
          <img src={logo} alt="Sunny Software Logo" />
        </a>
        <ForgotPassword />
      </div>
      <div className={styles.loginPhoto}>
        <img src={loginPhoto} alt="Employees at planning meeting" />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
