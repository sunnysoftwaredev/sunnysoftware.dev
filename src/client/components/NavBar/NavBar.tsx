import React, { useCallback, useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import Button, { ButtonIcon, ButtonSize, ButtonVariant } from '../Button/Button';
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

  // Close mobile menu when resize to desktop
  useEffect(() => {
    if (!isMobileWidth) {
      setHamburgerOpen(false);
    }
  }, [hamburgerOpen, isMobileWidth]);

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

  // Create a single button component for the log in/log out functionality
  const AuthButton = useCallback(({ isMobile }: { isMobile: boolean }) => (
    <Button
      size={isMobile ? ButtonSize.Small : ButtonSize.Large}
      variant={ButtonVariant.Outlined}
      onClick={handleSubmit}
      iconType={loggedIn ? undefined : ButtonIcon.Plus}
    >
      {loggedIn ? 'Log Out' : 'Log In'}
    </Button>
  ), [handleSubmit, loggedIn]);

  return (
    <nav>
      <img src={Logo} alt="Sunny Software Logo" />
      <ul className={classNames(styles.menu, {
        [styles.hidden]: !hamburgerOpen && isMobileWidth,
        [styles.mobileMenu]: hamburgerOpen,
      })}
      >
        {/* ... Same list items here */}
        {isMobileWidth && <AuthButton isMobile={true} />}
        {isMobileWidth && (
          <Button
            size={ButtonSize.Medium}
            onClick={handleLetsTalk}
          >
            {'Let\'s Talk'}
          </Button>
        )}
      </ul>
      <div className={classNames(styles.buttons, {
        [styles.hidden]: !hamburgerOpen && isMobileWidth,
      })}
      >
        {!isMobileWidth && <AuthButton isMobile={false} />}
        <Button
          size={ButtonSize.Large}
          onClick={handleLetsTalk}
          iconType={ButtonIcon.Plus}
        >
          {'Let\'s Talk'}
        </Button>
      </div>
      <div className={styles.hamburger} onClick={toggleHamburger}>
        {/* ... Same hamburger divs here */}
      </div>
    </nav>
  );
};

export default Navbar;
