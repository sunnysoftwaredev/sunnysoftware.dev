import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';

const ServicesPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Services-Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/services" />
      <meta
        name="description"
        content="Information on services offered by Sunny Software LLC"
      />
    </Helmet>
    <h1>Services</h1>
    <p>Information on services offered</p>
  </div>
);

export default ServicesPage;
