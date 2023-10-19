import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import ResetPassword from '../../components/ResetPassword/ResetPassword';

const ClientPortalPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Portal-Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/portal" />
      <meta name="description" content="Client portal for Sunny Software LLC" />
    </Helmet>
    <h1>Portal</h1>
    <p>For logged in clients</p>
    <ResetPassword />
  </div>
);

export default ClientPortalPage;
