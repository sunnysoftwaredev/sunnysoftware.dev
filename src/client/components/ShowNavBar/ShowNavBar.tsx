import React from 'react';
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
  const locationPath = useLocation();
  const showNavBar = !noNavBarRoutes.has(locationPath.pathname);

  return (
    <div>{showNavBar && children}</div>
  );
};

export default ShowNavBar;
