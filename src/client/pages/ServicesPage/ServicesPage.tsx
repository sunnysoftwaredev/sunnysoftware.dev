import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ServicesPageBanner from '../../components/ServicesPage/ServicesPageBanner/ServicesPageBanner';
import FullServicesList from '../../components/ServicesPage/FullServicesList/FullServicesList';
import ServicesNeedHelp from '../../components/ServicesPage/ServicesNeedHelp/ServicesNeedHelp';

const ServicesPage: React.FC = () => (
  <HelmetProvider>
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
      <ServicesPageBanner />
      <FullServicesList />
      <ServicesNeedHelp />
    </div>
  </HelmetProvider>
);

export default ServicesPage;
