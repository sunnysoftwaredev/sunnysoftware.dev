import React from 'react';
import type { FunctionComponent } from 'react';
import './Hero.scss';

const Hero: FunctionComponent = () => (
  <div className="hero">
    <div className="heroLeftPlaceholder" />
    <div className="heroRightSide">
      <h1 className="heroHeading">Sunny Software</h1>
      <p className="heroSubHeading">
        Expert engineering from the sunny California Valley
      </p>
      <a href="/get-started" className="btn btn-primary">
        Get Started Today!
      </a>
    </div>
  </div>
);

export default Hero;
