import React, { useCallback, useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalCookieValue } from '../../../common/utilities/functions';
import styles from './NavBar.scss';

const Navbar: FunctionComponent = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  // const authData = useCallback(async() => {
  //   const response = await fetch('http://localhost:3000/api/authenticate');
  // });

  // useEffect(() => {
  //   const authData = async () => {
  //     const fetchData = async () => {
  //       const data = await fetch('http://localhost:3000/api/authenticate');
  //       // convert the data to json
  //       const json = Response.json;
  //   };

  //   const userCookie = getLocalCookieValue();
  //   if (userCookie !== undefined) {
  //     setLoggedIn(true);
  //   }
  // }, [loggedIn]);

  const handleSubmit = useCallback(async(e: React.FormEvent<HTMLFormElement>):
  Promise<void> => {
    e.preventDefault();
    if (loggedIn) {
      window.location.reload();
      const response = await fetch('http://localhost:3000/api/logout');
      console.log('response returned in logout', response);
      navigate('/portal');
    } else {
      navigate('/login');
      window.location.reload();
    }
  }, [navigate, loggedIn]);

  return (
    <nav>
      <ul className={styles.navbarUL}>
        <li className="nav-item">
          <a className="nav-link active" href="/">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/login">
            Login
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/contact-us">
            Contact Us
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/get-started">
            Get Started
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/portal">
            Client Portal
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/work-portal">
            Work Portal
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/about-us">
            About Us
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/services">
            Services
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/portfolio">
            Portfolio
          </a>
        </li>
        {loggedIn
          ? (
            <form onSubmit={handleSubmit}>
              <button type="submit" className="loginButton">
                Log Out
              </button>

            </form>

          )
          : (
            <form onSubmit={handleSubmit}>
              <button type="submit" className="loginButton">
                Log In
              </button>

            </form>
          )}
      </ul>
    </nav>
  );
};

export default Navbar;
