import React, { useCallback, useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Button, { ButtonSize, ButtonVariant } from '../Button/Button';
import logger from '../../../server/logger';
import Logo from '../../static/images/Logo.png';
import useIsMobileWidth from '../../hooks/useIsMobileWidth';
import { getIsAdmin, getIsClient, getIsEmployee, getLoggedIn } from '../../redux/selectors/account';
import { AccountActions } from '../../redux/slices/account';
import styles from './NavBar.scss';

const Navbar: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector(getLoggedIn);
  const isClient = useSelector(getIsClient);
  const isEmployee = useSelector(getIsEmployee);
  const isAdmin = useSelector(getIsAdmin);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const isMobileWidth = useIsMobileWidth();

  useEffect(() => {
    if (!isMobileWidth) {
      setHamburgerOpen(false);
    }
  }, [isMobileWidth]);

  const handleSubmit = useCallback(async(): Promise<void> => {
    if (loggedIn) {
      await fetch('api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      });
      dispatch(AccountActions.logOut());
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [navigate, dispatch, loggedIn]);

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

  const shouldHideOnDesktop = !hamburgerOpen && isMobileWidth;

  return (
    <nav>
      <img src={Logo} alt="Sunny Software Logo" />
      <ul className={classNames(styles.menu, {
        [styles.hidden]: shouldHideOnDesktop,
        [styles.mobileMenu]: hamburgerOpen,
      })}
      >
        {/* ... navigation items go here as before ... */}
      </ul>
      <div className={classNames(styles.buttons, {
        [styles.hidden]: shouldHideOnDesktop,
      })}
      >
        {/* ... buttons go here as before ... */}
      </div>
      <div className={styles.hamburger} onClick={toggleHamburger}>
        {/* ... hamburger lines go here as before ... */}
      </div>
    </nav>
  );
};

export default Navbar;
