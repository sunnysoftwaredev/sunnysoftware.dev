import React from "react";
import type { FunctionComponent } from "react";
import Hero from "../../components/Hero/Hero";
import { Helmet } from "react-helmet";

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
