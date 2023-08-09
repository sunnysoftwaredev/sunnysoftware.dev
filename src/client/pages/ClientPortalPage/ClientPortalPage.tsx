import React from "react";
import type { FunctionComponent } from "react";
import { Helmet } from "react-helmet";

const ClientPortalPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Portal-Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/portal" />
      <meta name="description" content="Client portal for Sunny Software LLC" />
    </Helmet>
    <h1>Portal</h1>
    <p>For logged in clients</p>
  </div>
);

export default ClientPortalPage;
