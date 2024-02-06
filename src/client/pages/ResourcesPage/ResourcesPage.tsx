import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import ResourcesBanner from '../../components/ResourcesPage/ResourcesBanner/ResourcesBanner';
import ResourcesPanels from '../../components/ResourcesPage/ResourcesPanels/ResourcesPanels';

const PageHelmet: FunctionComponent<{
  title: string;
  charSet: string;
  link: string;
  description: string;
}> = ({ title, charSet, link, description }) => (
  <Helmet>
    <meta charSet={charSet} />
    <title>{title}</title>
    <link rel="canonical" href={link} />
    <meta name="description" content={description} />
  </Helmet>
);

const ResourcesPage: FunctionComponent = () => (
  <div>
    <PageHelmet
      title="Resources - Sunny Software"
      charSet="utf-8"
      link="https://sunnysoftware.dev/resources"
      description="Portfolio of projects done by Sunny Software LLC"
    />
    <ResourcesBanner />
    <ResourcesPanels />
  </div>
);

export default ResourcesPage;
