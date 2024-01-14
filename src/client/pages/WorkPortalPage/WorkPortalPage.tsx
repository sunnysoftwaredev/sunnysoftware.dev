import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import WorkCalendar from '../../components/WorkCalendar/WorkCalendar';
import ResetPassword from '../../components/ResetPassword/ResetPassword';

interface PageHelmetProps {
  title: string;
  description: string;
  canonical: string;
}

const PageHelmet: FunctionComponent<PageHelmetProps> = ({ title, description, canonical }) => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>{title}</title>
    <link rel="canonical" href={canonical} />
    <meta name="description" content={description} />
  </Helmet>
);

const ClientPortalPage: FunctionComponent = () => (
  <div>
    <PageHelmet
      title="Work Portal-Sunny Software"
      description="Work portal for employees of Sunny Software LLC"
      canonical="https://sunnysoftware.dev/work-portal"
    />
    <h1>Work Portal</h1>
    <ResetPassword />
    <WorkCalendar />
  </div>
);

export default ClientPortalPage;
