import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import Hero from '../../components/Hero/Hero';
import Services from '../../components/Services/Services';
import CallToAction from '../../components/CallToAction/CallToAction';
import Methodology from '../../components/Methodology/Methodology';
import PortfolioCarousel from '../../components/PortfolioCarousel/PortfolioCarousel';
import OurTeamAndOpenings from '../../components/OurTeamAndOpenings/OurTeamAndOpenings';
import EmployeeCardStack from '../../components/EmployeeCardStack/EmployeeCardStack';
import FrequentlyAskedQuestions from '../../components/FrequentlyAskedQuestions/FrequentlyAskedQuestions';
import ResourcesPanel from '../../components/ResourcesPanel/ResourcesPanel';

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
