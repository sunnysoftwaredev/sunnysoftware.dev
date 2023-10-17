import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import WorkCalendar from '../../components/WorkCalendar/WorkCalendar';
import EmployeeWorkCalendars from '../../components/EmployeeWorkCalendars/EmployeeWorkCalendars';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

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
    <WorkCalendar />
    <RegistrationForm />
    <EmployeeWorkCalendars />
  </div>
);

export default AdminPortalPage;
