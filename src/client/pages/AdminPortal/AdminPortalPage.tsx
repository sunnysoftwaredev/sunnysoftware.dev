import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import {
  WorkCalendar,
  EmployeeWorkCalendars,
  RegistrationForm,
  ManageUsers,
  ResetPassword,
  ManageProjects,
} from '../../components';

const AdminPortalPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Admin Portal-Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/work-portal" />
      <meta
        name="description"
        content="Hours of all employees of Sunny Software LLC"
      />
    </Helmet>
    <h1>Admin Portal</h1>
    <ManageProjects />
    <ResetPassword />
    <WorkCalendar />
    <EmployeeWorkCalendars />
    <RegistrationForm />
    <ManageUsers />
  </div>
);

export default AdminPortalPage;
