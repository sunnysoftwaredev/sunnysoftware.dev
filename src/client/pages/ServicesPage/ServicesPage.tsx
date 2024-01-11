import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import ServicesPageBanner from '../../components/ServicesPage/ServicesPageBanner/ServicesPageBanner';
import FullServicesList from '../../components/ServicesPage/FullServicesList/FullServicesList';
import ServicesNeedHelp from '../../components/ServicesPage/ServicesNeedHelp/ServicesNeedHelp';

interface SEOHelmetProps {
  title: string;
  description: string;
  url: string;
}

const SEOHelmet: FunctionComponent<SEOHelmetProps> = ({ title, description, url }) => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>{title}</title>
    <link rel="canonical" href={url} />
    <meta name="description" content={description} />
  </Helmet>
);

const ServicesPage: FunctionComponent = () => (
  <div>
    <SEOHelmet
      title="Services - Sunny Software"
      description="Information on services offered by Sunny Software LLC"
      url="https://sunnysoftware.dev/services"
    />
    <ServicesPageBanner />
    <FullServicesList />
    <ServicesNeedHelp />
  </div>
);

export default ServicesPage;
