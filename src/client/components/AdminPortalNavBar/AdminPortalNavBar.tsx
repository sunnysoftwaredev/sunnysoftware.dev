import React, { useCallback, useContext, useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import AuthContext from '../../context/AuthContext';
import Logo from '../../static/images/Logo.png';
import useIsMobileWidth from '../../hooks/useIsMobileWidth';
import ProfileIcon from '../../static/svgs/ProfileIcon';
import ProfileIconBackgroundElipse from '../../static/svgs/ProfileIconBackgroundElipse';
import Button, { ButtonSize, ButtonVariant } from '../Button/Button';
import styles from './AdminPortalNavBar.scss';

const AdminPortalNavBar: FunctionComponent = () => {
  const navigate = useNavigate();
  const { active } = useContext(AuthContext) ?? { active: false, role: '' };
  const isMobileWidth = useIsMobileWidth();
  const [topButtonSelection, setTopButtonSelection] = useState(true);

  const [menuOpen, setMenuOpen] = useState(false);

  // close mobile menu when resize to desktop
  useEffect(() => {
    if (!isMobileWidth) {
      setMenuOpen(false);
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

  return (
    <nav>
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
          <p className={classNames({
            [styles.menuArrowPointDown]: !menuOpen,
            [styles.menuArrowPointUp]: menuOpen,
          })}
          >
            {'>'}

          </p>
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
    </nav>
  );
};

export default AdminPortalNavBar;
