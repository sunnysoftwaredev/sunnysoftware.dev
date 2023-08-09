import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';

const ClientPortalPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Portfolio-Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/portfolio" />
      <meta
        name="description"
        content="Portfolio of projects done by Sunny Software LLC"
      />
    </Helmet>
    <h1>Portfolio</h1>
    <p>The portfolio page</p>
  </div>
);

export default ClientPortalPage;
