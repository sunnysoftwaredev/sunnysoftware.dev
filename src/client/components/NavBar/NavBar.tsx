import React, { useCallback, useRef } from 'react';
import type { FunctionComponent } from 'react';
import { redirect } from 'react-router-dom';
import styles from './NavBar.scss';

const Navbar: FunctionComponent = () => {
  // check if user logged in already
  const user = localStorage.getItem('user');
  const loggedIn = useRef(false);
  if (user !== null) {
    loggedIn.current = true;
  }

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>):
  void => {
    e.preventDefault();
    if (loggedIn.current) {
      localStorage.removeItem('user');
      loggedIn.current = false;
    } else {
      redirect('http://localhost:3000/login');
    }
  }, []);

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
        {loggedIn.current
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
