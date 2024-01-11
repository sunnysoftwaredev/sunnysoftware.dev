import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import ResourcesBanner from '../../components/ResourcesPage/ResourcesBanner/ResourcesBanner';
import ResourcesPanels from '../../components/ResourcesPage/ResourcesPanels/ResourcesPanels';

const ResourcesPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Resources - Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/resources" />
      <meta
        name="description"
        content="Portfolio of projects done by Sunny Software LLC"
      />
    </Helmet>
    <ResourcesBanner />
    <ResourcesPanels />
  </div>
);

export default ResourcesPage;
