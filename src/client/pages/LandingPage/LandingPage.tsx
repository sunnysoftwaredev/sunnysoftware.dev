import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import Hero from '../../components/Hero/Hero';
import Services from '../../components/Services/Services';
import CallToAction from '../../components/CallToAction/CallToAction';

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
    {/* <CallToAction /> */}
  </div>
);

export default LandingPage;
