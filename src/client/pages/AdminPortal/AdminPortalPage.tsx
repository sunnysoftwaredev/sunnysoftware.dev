import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import WorkCalendar from '../../components/WorkCalendar/WorkCalendar';
import EmployeeWorkCalendars from '../../components/EmployeeWorkCalendars/EmployeeWorkCalendars';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import ManageUsers from '../../components/ManageUsers/ManageUsers';
import ResetPassword from '../../components/ResetPassword/ResetPassword';
import ManageProjects from '../../components/MangageProjects/ManageProjects';
import PortalNavBar from '../../components/PortalNavBar/PortalNavBar';

const AdminPortalPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Admin Portal-Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/admin-portal" />
      <meta
        name="description"
        content="Hours of all employees of Sunny Software LLC"
      />
    </Helmet>
    <PortalNavBar />
    <ManageProjects />
    <ResetPassword />
    <WorkCalendar />
    <EmployeeWorkCalendars />
    <RegistrationForm />
    <ManageUsers />
  </div>
);

export default AdminPortalPage;
