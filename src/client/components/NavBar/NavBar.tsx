import React, { useCallback, useContext } from 'react';
import type { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Button, { ButtonSize } from '../Button/Button';
import logger from '../../../server/logger';
import Logo from '../../SCSS/Assets/Logo.png';
import styles from './NavBar.scss';

const Navbar: FunctionComponent = () => {
  const navigate = useNavigate();
  const { active, role } = useContext(AuthContext) ?? { active: false, role: '' };

  const handleSubmit = useCallback(async(): Promise<void> => {
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

  const handleLetsTalk = useCallback((): void => {
    try {
      // setTimeout(() => console.log('timeout'), 3000);
      navigate('/contact-us');
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [navigate]);
  return (
    <nav>
      <img src={Logo} alt="Sunny Software Logo" />
      <ul className={styles.menu}>
        <li className={styles.navItem}>
          <a className="nav-link active" href="/">
            Home
          </a>
        </li>
        <li className={styles.navItem}>
          <a className="nav-link active" href="/about-us">
            About Us
          </a>
        </li>
        <li className={styles.navItem}>
          <a className="nav-link active" href="/services">
            Services
          </a>
        </li>
        <li className={styles.navItem}>
          <a className="nav-link active" href="/portfolio">
            Portfolio
          </a>
        </li>
        <li className={styles.navItem}>
          <a className="nav-link active" href="/team">
            Team
          </a>
        </li>
        <li className={styles.navItem}>
          <a className="nav-link active" href="/methodology">
            Methodology
          </a>
        </li>
        <li className={styles.navItem}>
          <a className="nav-link active" href="/contact-us">
            Contact
          </a>
        </li>
        {role === 'client' && (
          <li className={styles.navItem}>
            <a className="nav-link active" href="/portal">
              Client Portal
            </a>
          </li>
        )}
        {role === 'admin' && (
          <li className={styles.navItem}>
            <a className="nav-link active" href="/admin-portal">
              Admin Portal
            </a>
          </li>
        )}
        {role === 'employee' && (
          <li className={styles.navItem}>
            <a className="nav-link active" href="/work-portal">
              Work Portal
            </a>
          </li>
        )}
      </ul>
      <div className={styles.buttons}>
        {active
          ? (
            <Button size={ButtonSize.Large} onClick={handleSubmit} variant="outlined">Log Out</Button>
          )
          : (
            <Button size={ButtonSize.Large} variant="outlined" onClick={handleSubmit}>Log In</Button>
          )}
        <Button
          size={ButtonSize.Large}
          onClick={handleLetsTalk}
        >
          Let's Talk
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
