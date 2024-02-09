import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';

// All page components are now imported from components/AboutUsPage/index.ts which exports them
import {
  AboutUsTop,
  StatisticsBar,
  MissionAndVision,
  CompanyTimeline,
  BuildAndGrow,
  LocationBanner,
  OurTeamAndOpenings,
} from '../../components/AboutUsPage';

import CallToAction from '../../components/CallToAction/CallToAction';
import groupPhoto from '../../components/AboutUsPage/aboutUsGroupPhoto.png';
import styles from './AboutUsPage.scss';

const AboutUsPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>About Us - Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/about-us" />
      <meta name="description" content="Information about Sunny Software LLC" />
    </Helmet>
    <AboutUsTop />
    <StatisticsBar />
    <MissionAndVision />
    <CompanyTimeline />
    <img className={styles.aboutUsPhoto} src={groupPhoto} alt="Sunny Software staff photo" />
    <BuildAndGrow />
    <LocationBanner />
    <OurTeamAndOpenings />
    <CallToAction />
  </div>
);

export default AboutUsPage;
