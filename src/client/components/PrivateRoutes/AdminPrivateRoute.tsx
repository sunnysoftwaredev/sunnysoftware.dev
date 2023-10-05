import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

interface IProps {
  children: React.JSX.Element;
}

const AdminPrivateRoute = ({ children }: IProps): React.JSX.Element => {
  const { role, load } = useContext(AuthContext) ?? { role: '', load: false };

  if (!load) {
    return <div>LOADING...</div>;
  }

  if (role === 'admin') {
    return children;
  }
  return <Navigate to="/login" />;
};

export default AdminPrivateRoute;
