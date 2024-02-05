import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsEmployee } from '../../redux/selectors/account';

interface IProps {
  children: React.JSX.Element;
}

const EmployeePrivateRoute = ({ children }: IProps): React.JSX.Element => {
  const isEmployee = useSelector(getIsEmployee);
  if (!isEmployee) {
    // The 'replace' prop is set to true to replace the current entry in the history stack
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default EmployeePrivateRoute;
