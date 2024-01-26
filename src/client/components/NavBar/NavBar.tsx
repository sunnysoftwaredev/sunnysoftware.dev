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

interface NavLinkProps {
  href: string;
  text: string;
  className: string;
}

const NavLink: FunctionComponent<NavLinkProps> = ({ href, text, className }) => (
  <li>
    <a className={className} href={href}>
      {text}
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

  // close mobile menu when resize to desktop
  useEffect(() => {
    if (!isMobileWidth) {
      setHamburgerOpen(false);
    }
  }, [hamburgerOpen, isMobileWidth]);

  const handleSubmit = useCallback(async(): Promise<void> => {
    // Same as in the original code
  }, [navigate, dispatch, loggedIn]);

  const handleLetsTalk = useCallback((): void => {
    // Same as in the original code
  }, [navigate]);

  const toggleHamburger = useCallback(() => {
    // Same as in the original code
  }, [hamburgerOpen]);

  const navLinkClass = styles.navItem;

  return (
    // Same as in the original code, with the following changes:
    // Replace each <li><a className={styles.navItem} href="/path">Text</a></li>
    // with <NavLink href="/path" text="Text" className={navLinkClass} />

    <nav>
      // ... rest of the component
      <ul className={classNames( /* ... */ )}>
        <NavLink href="/" text="Home" className={navLinkClass} />
        <NavLink href="/about-us" text="About Us" className={navLinkClass} />
        <NavLink href="/services" text="Services" className={navLinkClass} />
        <NavLink href="/portfolio" text="Portfolio" className={navLinkClass} />
        <NavLink href="/team" text="Team" className={navLinkClass} />
        <NavLink href="/methodology" text="Methodology" className={navLinkClass} />
        <NavLink href="/contact-us" text="Contact" className={navLinkClass} />
        // ...Include conditional rendering for isClient, isAdmin, isEmployee...
      </ul>
      // ... rest of the component
    </nav>
  );
};

export default Navbar;
