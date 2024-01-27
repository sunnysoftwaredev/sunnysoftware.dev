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
      <link rel="canonical" href="https://sunnysoftware.dev/careers" />
      <meta
        name="description"
        content="Explore current job openings and our culture to start your career with Sunny Software. Join a team that values innovation and collaboration."
      />
    </Helmet>
    <CareersBanner />
    <OurCulture />
    <Openings />
    <OwnIdeasBottom />
  </div>
);

export default CareersPage;
