import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

interface IProps {
  children: React.JSX.Element;
}

const EmployeePrivateRoute = ({ children }: IProps): React.JSX.Element => {
  const { role, load } = useContext(AuthContext) ?? { role: '', load: false };

  if (!load) {
    return <div>LOADING...</div>;
  }
  if (role === 'employee') {
    return children;
  }
  return <Navigate to="/login" />;
};

export default EmployeePrivateRoute;

