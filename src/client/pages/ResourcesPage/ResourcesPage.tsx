import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import ResourcesBanner from '../../components/ResourcesPage/ResourcesBanner/ResourcesBanner';

const ResourcesPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Portfolio-Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/resources" />
      <meta
        name="description"
        content="Portfolio of projects done by Sunny Software LLC"
      />
    </Helmet>
    <ResourcesBanner />
  </div>
);

export default ResourcesPage;
