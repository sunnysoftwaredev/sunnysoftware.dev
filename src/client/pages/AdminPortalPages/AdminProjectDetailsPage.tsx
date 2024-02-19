import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import PortalNavBar from '../../components/AdminPortalNavBar/AdminPortalNavBar';
import ProjectDetails from '../../components/ProjectDetails/ProjectDetails';

const AdminProjectDetailsPage:
FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Sunny Software Project Details</title>
      <link rel="canonical" href="https://sunnysoftware.dev/project" />
      <meta
        name="description"
        content="Details page for individual projects"
      />
    </Helmet>
    <PortalNavBar />
    <ProjectDetails />
  </div>
);

export default AdminProjectDetailsPage;
