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

interface MenuItemProps {
  href: string;
  label: string;
}

const MenuItem: FunctionComponent<MenuItemProps> = ({ href, label }) => (
  <li>
    <a className={styles.navItem} href={href}>
      {label}
    </a>
  </li>
);

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
  }, [hamburgerOpen, isMobileWidth]);

  const handleSubmit = useCallback(async (): Promise<void> => {
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

  return (
    <nav>
      <img src={Logo} alt="Sunny Software Logo" />
      <ul className={classNames(styles.menu, {
        [styles.hidden]: !hamburgerOpen && isMobileWidth,
        [styles.mobileMenu]: hamburgerOpen,
      })}
      >
        <MenuItem href="/" label="Home" />
        <MenuItem href="/about-us" label="About Us" />
        <MenuItem href="/services" label="Services" />
        <MenuItem href="/portfolio" label="Portfolio" />
        <MenuItem href="/team" label="Team" />
        <MenuItem href="/methodology" label="Methodology" />
        <MenuItem href="/contact-us" label="Contact" />
        {isClient && <MenuItem href="/portal" label="Client Portal" />}
        {isAdmin && <MenuItem href="/admin-portal" label="Admin Portal" />}
        {isEmployee && <MenuItem href="/work-portal" label="Work Portal" />}
        {(isMobileWidth && loggedIn) && (
          <Button
            size={ButtonSize.Small}
            onClick={handleSubmit}
            variant={ButtonVariant.Outlined}
          >
            Log Out
          </Button>
        )}
        {(isMobileWidth && !loggedIn) && (
          <Button
            size={ButtonSize.Small}
            variant={ButtonVariant.Outlined}
            onClick={handleSubmit}
            iconType={ButtonIcon.Plus}
          >
            Log In
          </Button>
        )}
        {isMobileWidth && (
          <Button
            size={ButtonSize.Medium}
            onClick={handleLetsTalk}
          >
            {"Let's Talk"}
          </Button>
        )}
      </ul>
      <div className={classNames(styles.buttons, {
        [styles.hidden]: !hamburgerOpen && isMobileWidth,
      })}
      >
        {loggedIn ? (
          <Button
            size={ButtonSize.Large}
            onClick={handleSubmit}
            variant={ButtonVariant.Outlined}
          >
            Log Out
          </Button>
        ) : (
          <Button
            size={ButtonSize.Large}
            variant={ButtonVariant.Outlined}
            onClick={handleSubmit}
            iconType={ButtonIcon.Plus}
          >
            Log In
          </Button>
        )}
        <Button
          size={ButtonSize.Large}
          onClick={handleLetsTalk}
          iconType={ButtonIcon.Plus}
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
