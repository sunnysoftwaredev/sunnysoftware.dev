import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface IProps {
  children: React.JSX.Element;
}

const ShowNavBar
= ({ children }: IProps): React.JSX.Element => {
  const [showNavBar, setShowNavBar] = useState(true);
  const locationPath = useLocation();

  useEffect(() => {
    if (locationPath.pathname === '/login'
      || locationPath.pathname === '/login/forgot-password'
      || locationPath.pathname === '/login/reset-password'
      || locationPath.pathname === '/portal'
      || locationPath.pathname === '/employee-portal'
      || locationPath.pathname === '/admin-portal') {
      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  }, [locationPath]);
  return (
    <div>{showNavBar && children}</div>
  );
};

export default ShowNavBar;
