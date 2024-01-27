import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import MethodologyBanner from '../../components/MethodologyPage/MethodologyBanner/MethodologyBanner';
import MethodologyFullList from '../../components/MethodologyPage/MethodologyFullList/MethodologyFullList';
import MethodologyBenefits from '../../components/MethodologyPage/MethodologyBenefits/MethodologyBenefits';
import MethodologyNeedHelp from '../../components/MethodologyPage/MethodologyNeedHelp/MethodologyNeedHelp';

const MethodologyHelmet: FunctionComponent = () => (
  <Helmet>
    <meta charSet="utf-8" />
    <title>Methodology-Sunny Software</title>
    <link rel="canonical" href="https://sunnysoftware.dev/methodology" />
    <meta
      name="description"
      content="The methodology of Sunny Software LLC"
    />
  </Helmet>
);

const MethodologyPage: FunctionComponent = () => (
  <div>
    <MethodologyHelmet />
    <MethodologyBanner />
    <MethodologyFullList />
    <MethodologyBenefits />
    <MethodologyNeedHelp />
  </div>
);

export default MethodologyPage;
