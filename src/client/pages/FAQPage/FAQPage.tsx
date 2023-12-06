import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import FAQBanner from '../../components/FAQPage/FAQBanner/FAQBanner';
import FullFAQ from '../../components/FAQPage/FullFAQ/FullFAQ';

const FAQPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Get Started-Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/faq" />
      <meta
        name="description"
        content="Quick start page for Sunny Software LLC"
      />
    </Helmet>
    <FAQBanner />
    <FullFAQ />
  </div>
);

export default FAQPage;
