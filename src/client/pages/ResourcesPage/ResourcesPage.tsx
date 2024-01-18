import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import ResourcesBanner from '../../components/ResourcesPage/ResourcesBanner/ResourcesBanner';
import ResourcesPanels from '../../components/ResourcesPage/ResourcesPanels/ResourcesPanels';

const MetaData: FunctionComponent = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Portfolio-Sunny Software</title>
    <link rel="canonical" href="https://sunnysoftware.dev/resources" />
    <meta
      name="description"
      content="Portfolio of projects done by Sunny Software LLC"
    />
  </Helmet>
);

const ResourcesPage: FunctionComponent = () => (
  <div>
    <MetaData />
    <ResourcesBanner />
    <ResourcesPanels />
  </div>
);

export default ResourcesPage;
