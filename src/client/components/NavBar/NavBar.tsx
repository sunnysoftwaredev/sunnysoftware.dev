import React, { useCallback, useContext, useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import AuthContext from '../../context/AuthContext';
import Button, { ButtonSize, ButtonVariant } from '../Button/Button';
import logger from '../../../server/logger';
import Logo from '../../SCSS/Assets/Logo.png';
import useIsMobileWidth from '../../hooks/useIsMobileWidth';
import styles from './NavBar.scss';

const Navbar: FunctionComponent = () => {
  const navigate = useNavigate();
  const { active, role } = useContext(AuthContext) ?? { active: false, role: '' };
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const isMobileWidth = useIsMobileWidth();

  // close mobile menu when resize to desktop
  useEffect(() => {
    if (!isMobileWidth) {
      setHamburgerOpen(false);
    }
  }, [hamburgerOpen, isMobileWidth]);

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
      navigate('/contact-us');
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [navigate]);

  const toggleHamburger = useCallback(() => {
    setHamburgerOpen(!hamburgerOpen);
  }, [hamburgerOpen]);

  return (
    <nav>
      <img src={Logo} alt="Sunny Software Logo" />
      <ul className={classNames(styles.menu, {
        [styles.hidden]: !hamburgerOpen && isMobileWidth,
        [styles.mobileMenu]: hamburgerOpen,
      })}
      >
        <li>
          <a className={styles.navItem} href="/">
            Home
          </a>
        </li>
        <li>
          <a className={styles.navItem} href="/about-us">
            About Us
          </a>
        </li>
        <li>
          <a className={styles.navItem} href="/services">
            Services
          </a>
        </li>
        <li>
          <a className={styles.navItem} href="/portfolio">
            Portfolio
          </a>
        </li>
        <li>
          <a className={styles.navItem} href="/team">
            Team
          </a>
        </li>
        <li>
          <a className={styles.navItem} href="/methodology">
            Methodology
          </a>
        </li>
        <li>
          <a className={styles.navItem} href="/contact-us">
            Contact
          </a>
        </li>
        {role === 'client' && (
          <li>
            <a className={styles.navItem} href="/portal">
              Client Portal
            </a>
          </li>
        )}
        {role === 'admin' && (
          <li>
            <a className={styles.navItem} href="/admin-portal">
              Admin Portal
            </a>
          </li>
        )}
        {role === 'employee' && (
          <li>
            <a className={styles.navItem} href="/work-portal">
              Work Portal
            </a>
          </li>
        )}
        {(isMobileWidth && active)
          && (
            <Button
              size={ButtonSize.Small}
              onClick={handleSubmit}
              variant={ButtonVariant.Outlined}
            >
              Log Out
            </Button>
          ) }
        {(isMobileWidth)
            && (
              <Button
                size={ButtonSize.Small}
                variant={ButtonVariant.Outlined}
                onClick={handleSubmit}
                icon
              >
                Log In
              </Button>
            )}
        {isMobileWidth && (
          <Button
            size={ButtonSize.Medium}
            onClick={handleLetsTalk}
          >
            {'Let\'s Talk'}
          </Button>
        ) }
      </ul>
      <div className={classNames(styles.buttons, {
        [styles.hidden]: !hamburgerOpen && isMobileWidth,
      })}
      >
        {active
          ? (
            <Button
              size={ButtonSize.Large}
              onClick={handleSubmit}
              variant={ButtonVariant.Outlined}
            >
              Log Out
            </Button>
          )
          : (
            <Button
              size={ButtonSize.Large}
              variant={ButtonVariant.Outlined}
              onClick={handleSubmit}
              icon
            >
              Log In
            </Button>
          )}
        <Button
          size={ButtonSize.Large}
          onClick={handleLetsTalk}
          icon
        >
          {'Let\'s Talk'}
        </Button>
      </div>
      <div className={styles.hamburger} onClick={toggleHamburger}>
        <div className={classNames(
          styles.burger,
          { [styles.burgerOne]: hamburgerOpen }
        )}
        />
        <div className={classNames(
          styles.burger,
          { [styles.burgerTwo]: hamburgerOpen }
        )}
        />
        <div className={classNames(
          styles.burger,
          { [styles.burgerThree]: hamburgerOpen }
        )}
        />
      </div>
    </nav>
  );
};

export default Navbar;
