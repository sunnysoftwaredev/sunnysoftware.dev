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
      <title>Testimonials-Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/team" />
      <meta
        name="description"
        content="Testimonails describing the good work of Sunny Software"
      />
    </Helmet>
    <CareersBanner />
    <OurCulture />
    <Openings />
    <OwnIdeasBottom />
  </div>
);

export default CareersPage;
