import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import WorkCalendar from '../../components/WorkCalendar/WorkCalendar';
import ResetPassword from '../../components/ResetPassword/ResetPassword';

const WorkPortalPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Work Portal-Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/work-portal" />
      <meta
        name="description"
        content="Work portal for employees of Sunny Software LLC"
      />
    </Helmet>
    <h1>Work Portal</h1>
    <ResetPassword />
    <WorkCalendar />
  </div>
);

export default WorkPortalPage;
