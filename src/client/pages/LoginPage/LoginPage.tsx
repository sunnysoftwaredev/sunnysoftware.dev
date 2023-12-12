import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import type { FunctionComponent } from 'react';
import LoginForm from '../../components/LoginPage/LoginForm/LoginForm';
import logo from '../../static/images/Logo.png';
import loginPhoto from '../../static/images/LoginPhoto.png';
import ForgotPassword from '../../components/LoginPage/ForgotPassword/ForgotPassword';
import NewPassword from '../../components/LoginPage/NewPassword/NewPassword';
import PopupMessage, { PopupType } from '../../components/PopupMessage/PopupMessage';
import styles from './LoginPage.scss';

const LoginPage: FunctionComponent = () => {
  // check if user logged in already
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  if (user !== null) {
    navigate('/');
  }
  const [showLogin, setShowLogin] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const locationPath = useLocation();
  const [showPopup, setShowPopup] = useState(true);

  // useEffect(() => {
  //   console.log('pathname', locationPath.pathname);
  //   console.log('hash', locationPath.hash);
  //   console.log('key', locationPath.key);
  //   if (locationPath.pathname === '/login?') {
  //     // show error box
  //   } else if (locationPath.pathname === '/login#') {
  //     setShowLogin(false);
  //     setShowForgotPassword(true);
  //   } else {
  //     setShowLogin(false);
  //   }
  // }, [locationPath]);

  const popup = useCallback(() => {
    setShowPopup(!showPopup);
  }, [showPopup]);
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
        {showPopup && (
          <PopupMessage
            type={PopupType.Failure}
            message="This is a test"
            onClick={popup}
          />
        )}
        {showLogin && <LoginForm />}
        {showForgotPassword && <ForgotPassword />}
        {showNewPassword && <NewPassword />}
      </div>
      <div className={styles.loginPhoto}>
        <img src={loginPhoto} alt="Employees at planning meeting" />
      </div>
    </div>
  );
};

export default LoginPage;
