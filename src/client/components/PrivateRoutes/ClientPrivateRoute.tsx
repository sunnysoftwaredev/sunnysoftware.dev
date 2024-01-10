import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsClient } from '../../redux/selectors/account';

interface IProps {
  children: React.JSX.Element;
}

const ClientPrivateRoute = ({ children }: IProps): React.JSX.Element => {
  const isClient = useSelector(getIsClient);
  if (!isClient) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ClientPrivateRoute;
