import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import Hero from '../../components/Hero/Hero';

const LandingPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/" />
      <meta name="description" content="Home/Landing page" />
    </Helmet>
    <h1 className="landingPage">LandingPage</h1>
    <p>Sunny Software</p>
    <Hero />
  </div>
);

export default LandingPage;
