import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import ManageUsers from '../../components/ManageUsers/ManageUsers';
import PortalNavBar from '../../components/AdminPortalNavBar/AdminPortalNavBar';

const AdminPortalEmployeesPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Admin Portal-Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/admin-portal-employee" />
      <meta
        name="description"
        content="Hours of all employees of Sunny Software LLC"
      />
    </Helmet>
    <PortalNavBar />
    <ManageUsers />
  </div>
);

export default AdminPortalEmployeesPage;
