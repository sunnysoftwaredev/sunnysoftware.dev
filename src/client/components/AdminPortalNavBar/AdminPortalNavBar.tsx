import React, { useCallback, useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import Logo from '../../static/images/Logo.png';
import useIsMobileWidth from '../../hooks/useIsMobileWidth';
import ProfileIcon from '../../static/svgs/ProfileIcon';
import ProfileIconBackgroundElipse from '../../static/svgs/ProfileIconBackgroundElipse';
import Button, { ButtonSize, ButtonVariant } from '../Button/Button';
import { getLoggedIn } from '../../redux/selectors/account';
import ChevronUpIcon from '../../static/svgs/ChevronUpIcon';
import ChevronDownIcon from '../../static/svgs/ChevronDownIcon';
import styles from './AdminPortalNavBar.scss';

const AdminPortalNavBar: FunctionComponent = () => {
  const navigate = useNavigate();
  const loggedIn = useSelector(getLoggedIn);
  const isMobileWidth = useIsMobileWidth();
  const [topButtonSelection, setTopButtonSelection] = useState(true);

  const [menuOpen, setMenuOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  // close mobile menu when resize to desktop
  useEffect(() => {
    if (!isMobileWidth) {
      setMenuOpen(false);
      setHamburgerOpen(false);
    }
    const currentUrl = window.location.pathname;
    if (currentUrl === '/admin-portal-employee') {
      setTopButtonSelection(true);
    } else {
      setTopButtonSelection(false);
    }
  }, [isMobileWidth]);

  const toggleMenu = useCallback(() => {
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  const toggleHamburger = useCallback(() => {
    setHamburgerOpen(!hamburgerOpen);
  }, [hamburgerOpen]);

  const handleSubmit = useCallback(async(): Promise<void> => {
    if (loggedIn) {
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
  }, [navigate, loggedIn]);

  return (
    <nav className={styles.container}>
      <div className={styles.leftMenu}>
        <a href="/">
          <img className={styles.logo} src={Logo} alt="Sunny Software Logo" />
        </a>
        <div className={styles.tabMenu}>
          {topButtonSelection
            ? (
              <Button
                to="./admin-portal-employees"
                size={ButtonSize.Medium}
                variant={ButtonVariant.Primary}
              >
                Employees
              </Button>
            )
            : (
              <Button
                to="./admin-portal-employees"
                size={ButtonSize.Medium}
                variant={ButtonVariant.Outlined}
              >
                Employees
              </Button>
            )}
          {topButtonSelection
            ? (
              <Button
                to="./admin-portal-projects"
                size={ButtonSize.Medium}
                variant={ButtonVariant.Outlined}
              >
                Projects
              </Button>
            )
            : (
              <Button
                to="./admin-portal-projects"
                size={ButtonSize.Medium}
                variant={ButtonVariant.Primary}
              >
                Projects
              </Button>
            )}

        </div>
      </div>
      {isMobileWidth
        ? (
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
            <div className={classNames(styles.hamburgerMenuLinks, {
              [styles.hidden]: !hamburgerOpen,
            })}
            >
              <a href="/settings">
                <p>Settings</p>
              </a>
              <a href="" onClick={handleSubmit}>
                <p>Log out</p>
              </a>
            </div>
          </div>

        )
        : (
          <div className={styles.rightMenu}>
            <button
              className={styles.profileMenuButton}
              type="button"
              onClick={toggleMenu}
            >
              <div className={styles.profileIcon}>
                <ProfileIcon />
                <ProfileIconBackgroundElipse />
              </div>
              <div
                className={styles.chevron}
                onClick={toggleMenu}
              >
                {menuOpen ? (<ChevronUpIcon />) : (<ChevronDownIcon />)}
              </div>
            </button>
            <div className={classNames(styles.rightMenuLinks, {
              [styles.hidden]: !menuOpen,
            })}
            >
              <a href="/settings">
                <p>Settings</p>
              </a>
              <a href="" onClick={handleSubmit}>
                <p>Log out</p>
              </a>
            </div>
          </div>
        )}
    </nav>
  );
};

export default AdminPortalNavBar;
