import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface IProps {
  children: React.JSX.Element;
}

const ShowPortalNav
= ({ children }: IProps): React.JSX.Element => {
  const [showPortalNav, setShowPortalNav] = useState(false);
  const locationPath = useLocation();

  useEffect(() => {
    if (locationPath.pathname === '/portal'
      || locationPath.pathname === '/admin-portal'
      || locationPath.pathname === '/employee-portal') {
      setShowPortalNav(true);
    } else {
      setShowPortalNav(false);
    }
  }, [locationPath]);
  return (
    <div>{showPortalNav && children}</div>
  );
};

export default ShowPortalNav;
