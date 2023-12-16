import React, { useCallback, useContext, useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import AuthContext from '../../context/AuthContext';
import Logo from '../../static/images/Logo.png';
import useIsMobileWidth from '../../hooks/useIsMobileWidth';
import ProfileIcon from '../../static/svgs/ProfileIcon';
import TabMenu from '../TabMenu/TabMenu';
import styles from './PortalNavBar.scss';

// NEED TO FIX LINK

const PortalNavBar: FunctionComponent = () => {
  const navigate = useNavigate();
  const { active } = useContext(AuthContext) ?? { active: false, role: '' };
  const isMobileWidth = useIsMobileWidth();

  const [menuOpen, setMenuOpen] = useState(false);

  // close mobile menu when resize to desktop
  useEffect(() => {
    if (!isMobileWidth) {
      setMenuOpen(false);
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
        {/* <div className={styles.tabNav}>
          <ul className={styles.tabList}>
            <p>TEST</p>
          </ul>
        </div> */}
        <TabMenu />
      </div>
      <div className={styles.rightMenu}>
        <button
          className={styles.profileMenuButton}
          type="button"
          onClick={toggleMenu}
        >
          <ProfileIcon />
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

export default PortalNavBar;
