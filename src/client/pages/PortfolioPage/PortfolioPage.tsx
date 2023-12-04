import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import PortfolioBanner from '../../components/PortfolioPage/PortfolioBanner/PortfolioBanner';
import FullPortfolioList from '../../components/PortfolioPage/FullPortfolioList/FullPortfolioList';
import PortfolioNeedHelp from '../../components/PortfolioPage/PortfolioNeedHelp/PortfolioNeedHelp';

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
    <PortfolioBanner />
    <FullPortfolioList />
    <PortfolioNeedHelp />
  </div>
);

export default ClientPortalPage;
