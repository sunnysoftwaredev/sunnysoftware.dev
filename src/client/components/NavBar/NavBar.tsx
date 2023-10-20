import React, { useCallback, useContext } from 'react';
import type { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import styles from './NavBar.scss';

const Navbar: FunctionComponent = () => {
  const navigate = useNavigate();
  const { active, role } = useContext(AuthContext) ?? { active: false, role: '' };

  const handleSubmit = useCallback(async(e: React.FormEvent<HTMLFormElement>):
  Promise<void> => {
    e.preventDefault();
    if (active) {
      await fetch('api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      });
      navigate('/');
      window.location.reload();
    } else {
      navigate('/login');
      window.location.reload();
    }
  }, [navigate, active]);

  return (
    <nav>
      <ul className={styles.navbarUL}>
        <li className="nav-item">
          <a className="nav-link active" href="/">
            Home
          </a>
        </li>
        {!active && (
          <li className="nav-item">
            <a className="nav-link active" href="/login">
              Login
            </a>
          </li>
        )}
        {!active && (
          <li className="nav-item">
            <a className="nav-link active" href="/register">
              Register
            </a>
          </li>
        )}
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
        {role === 'client' && (
          <li className="nav-item">
            <a className="nav-link active" href="/portal">
              Client Portal
            </a>
          </li>
        )}
        {role === 'admin' && (
          <li className="nav-item">
            <a className="nav-link active" href="/admin-portal">
              Admin Portal
            </a>
          </li>
        )}
        {role === 'employee' && (
          <li className="nav-item">
            <a className="nav-link active" href="/work-portal">
              Work Portal
            </a>
          </li>
        )}
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
        {role === 'employee' && (
          <li className="nav-item">
            <a className="nav-link active" href="/portfolio">
              Portfolio
            </a>
          </li>
        )}
        {active
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
