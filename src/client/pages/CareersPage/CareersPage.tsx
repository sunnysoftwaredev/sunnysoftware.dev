import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import CareersBanner from '../../components/CareersPage/CareersBanner/CareersBanner';
import OurCulture from '../../components/CareersPage/OurCulture/OurCulture';
import Openings from '../../components/CareersPage/Openings/Openings';
import OwnIdeasBottom from '../../components/CareersPage/OwnIdeasBottom/OwnIdeasBottom';

const CareersPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Careers at Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/team" />
      <meta
        name="description"
        content="Explore career opportunities and open positions at Sunny Software. Join our team and bring your own ideas to life!"
      />
    </Helmet>
    <CareersBanner />
    <OurCulture />
    <Openings />
    <OwnIdeasBottom />
  </div>
);

export default CareersPage;
