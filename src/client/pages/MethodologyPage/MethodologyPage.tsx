import React from 'react';
import { Helmet } from 'react-helmet';
import MethodologyBanner from '../../components/MethodologyPage/MethodologyBanner/MethodologyBanner';
import MethodologyFullList from '../../components/MethodologyPage/MethodologyFullList/MethodologyFullList';
import MethodologyBenefits from '../../components/MethodologyPage/MethodologyBenefits/MethodologyBenefits';
import MethodologyNeedHelp from '../../components/MethodologyPage/MethodologyNeedHelp/MethodologyNeedHelp';

const pageMetadata = {
  charset: "utf-8",
  title: "Methodology-Sunny Software",
  canonicalLink: "https://sunnysoftware.dev/methodology",
  description: "The methodology of Sunny Software LLC"
};

const MethodologyPage: React.FC = () => (
  <div>
    <Helmet>
      <meta charSet={pageMetadata.charset} />
      <title>{pageMetadata.title}</title>
      <link rel="canonical" href={pageMetadata.canonicalLink} />
      <meta
        name="description"
        content={pageMetadata.description}
      />
    </Helmet>
    <MethodologyBanner />
    <MethodologyFullList />
    <MethodologyBenefits />
    <MethodologyNeedHelp />
  </div>
);

export default MethodologyPage;
