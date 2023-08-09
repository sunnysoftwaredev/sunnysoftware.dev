import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';

const AboutUsPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>About Us-Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/about-us" />
      <meta name="description" content="Information about Sunny Software LLC" />
    </Helmet>
    <h1>About Us</h1>
    <p>Info on the company</p>
  </div>
);

export default AboutUsPage;
