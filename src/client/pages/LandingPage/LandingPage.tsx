import React from 'react';
import type { FunctionComponent } from 'react';
import Hero from '../../components/Hero/Hero';

const LandingPage: FunctionComponent = () => (
  <div>
    <h1 className="landingPage">LandingPage</h1>
    <p>Sunny Software</p>
    <Hero />
  </div>
);

export default LandingPage;
