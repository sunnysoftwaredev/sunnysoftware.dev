import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsAdmin } from '../../redux/selectors/account';

interface AdminPrivateRouteProps {
  children: React.JSX.Element;
}

const AdminPrivateRoute = ({ children }: AdminPrivateRouteProps): React.JSX.Element => {
  const isAdmin = useSelector(getIsAdmin);
  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminPrivateRoute;
