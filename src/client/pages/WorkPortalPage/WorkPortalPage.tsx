import React from "react";
import type { FunctionComponent } from "react";
import { Helmet } from "react-helmet";

const ClientPortalPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Work Portal-Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/work-portal" />
      <meta
        name="description"
        content="Work portal for employees of Sunny Software LLC"
      />
    </Helmet>
    <h1>Work Portal</h1>
    <p>A separate portal page for employees and contractors</p>
  </div>
);

export default ClientPortalPage;
