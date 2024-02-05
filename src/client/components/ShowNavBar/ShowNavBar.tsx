import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface IProps {
  children: React.JSX.Element;
}

const noNavBarRoutes = new Set([
  '/login',
  '/login/forgot-password',
  '/login/reset-password',
]);

const ShowNavBar = ({ children }: IProps): React.JSX.Element => {
  const [showNavBar, setShowNavBar] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    setShowNavBar(!noNavBarRoutes.has(pathname));
  }, [pathname]);

  return (
    <div>{showNavBar && children}</div>
  );
};

export default ShowNavBar;
