import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import {
  Hero,
  Services,
  CallToAction,
  Methodology,
  PortfolioCarousel,
  OurTeamAndOpenings,
  EmployeeCardStack,
  FrequentlyAskedQuestions,
  ResourcesPanel,
} from '../../components';

const LandingPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/" />
      <meta name="description" content="Home/Landing page" />
    </Helmet>
    <Hero />
    <Services />
    <Methodology />
    <PortfolioCarousel />
    <OurTeamAndOpenings />
    <EmployeeCardStack />
    <FrequentlyAskedQuestions />
    <ResourcesPanel />
    <CallToAction />
  </div>
);

export default LandingPage;
