import React from "react";
import type { FunctionComponent } from "react";
import { Helmet } from "react-helmet";

const GetStartedPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Get Started-Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/get-started" />
      <meta
        name="description"
        content="Quick start page for Sunny Software LLC"
      />
    </Helmet>
    <h1>Get Started </h1>
    <p>Get Sunny Software working for you right away</p>
  </div>
);

export default GetStartedPage;
