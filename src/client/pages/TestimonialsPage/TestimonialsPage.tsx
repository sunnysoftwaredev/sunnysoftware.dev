import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import TestimonialsBanner from '../../components/TestimonialsPage/TestimonialsBanner/TestimonialsBanner';
import StatisticsBar from '../../components/TestimonialsPage/StatisticsBar/StatisticsBar';

const TestimonialsPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Testimonials-Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/team" />
      <meta
        name="description"
        content="Testimonails describing the good work of Sunny Software"
      />
    </Helmet>
    <TestimonialsBanner />
    <StatisticsBar />
  </div>
);

export default TestimonialsPage;
