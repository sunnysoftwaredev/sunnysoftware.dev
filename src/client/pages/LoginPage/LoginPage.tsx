import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import type { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../../components/LoginPage/LoginForm/LoginForm';
import logo from '../../static/images/Logo.png';
import loginPhoto from '../../static/images/LoginPhoto.png';
import { getLoggedIn } from '../../redux/selectors/account';
import styles from './LoginPage.scss';

const LoginPage: FunctionComponent = () => {
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
        <link rel="canonical" href="https://sunnysoftware.dev/login" />
        <meta name="description" content="The login page" />
      </Helmet>
      <div className={styles.loginContainer}>
        <a href="/">
          <img src={logo} alt="Sunny Software Logo" />
        </a>

        <LoginForm />
      </div>
      <div className={styles.loginPhoto}>
        <img src={loginPhoto} alt="Employees at planning meeting" />
      </div>
    </div>
  );
};

export default LoginPage;
