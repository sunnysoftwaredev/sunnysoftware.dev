import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsAdmin } from '../../redux/selectors/account';

interface IProps {
  children: React.JSX.Element;
}

const AdminPrivateRouteBase = ({ children }: IProps): React.JSX.Element => {
  const isAdmin = useSelector(getIsAdmin);
  if (!isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

const AdminPrivateRoute = React.memo(AdminPrivateRouteBase);

export default AdminPrivateRoute;
