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
    if (locationPath.pathname === '/login') {
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
