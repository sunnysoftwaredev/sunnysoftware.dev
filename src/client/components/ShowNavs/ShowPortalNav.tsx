import React from 'react';
import { useLocation } from 'react-router-dom';

interface IProps {
  children: React.JSX.Element;
}

const ShowPortalNav
= ({ children }: IProps): React.JSX.Element => {
  const locationPath = useLocation();
  const showPortalNav = [
    '/portal',
    '/admin-portal',
    '/employee-portal'
  ].includes(locationPath.pathname);
  return (
    <div>{showPortalNav && children}</div>
  );
};

export default ShowPortalNav;
