import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import ResetPassword from '../../components/ResetPassword/ResetPassword';

const ClientPortalPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Client Portal | Manage Your Account | Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/portal" />
      <meta name="description" content="Access the Sunny Software client portal to manage your projects, settings, and personal information securely." />
    </Helmet>
    <h1>Portal</h1>
    <p>Welcome to the client portal. Please log in to manage your account and projects.</p>
    <ResetPassword />
  </div>
);

export default ClientPortalPage;
