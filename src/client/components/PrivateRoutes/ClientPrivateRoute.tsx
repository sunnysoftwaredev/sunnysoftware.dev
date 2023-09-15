import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

interface IProps {
  children: React.JSX.Element;
}

const ClientPrivateRoute = ({ children }: IProps): React.JSX.Element => {
  const { role } = useContext(AuthContext) ?? { role: '' };
  if (role === 'employee') {
    return children;
  }
  return <Navigate to="/login" />;
};

export default ClientPrivateRoute;
