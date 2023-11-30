import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import AboutUsTop from '../../components/AboutUsPage/AboutUsTop/AboutUsTop';
import StatisticsBar from '../../components/AboutUsPage/StatisticsBar/StatisticsBar';
import MissionAndVision from '../../components/AboutUsPage/MissionAndVision/MissionAndVision';
import CompanyTimeline from '../../components/AboutUsPage/CompanyTimeline/CompanyTimeline';
import groupPhoto from '../../components/AboutUsPage/aboutUsGroupPhoto.png';
import styles from './AboutUsPage.scss';

const AboutUsPage: FunctionComponent = () => (
  <div>
    <Helmet>
      <meta charSet="utf-8" />
      <title>About Us-Sunny Software</title>
      <link rel="canonical" href="https://sunnysoftware.dev/about-us" />
      <meta name="description" content="Information about Sunny Software LLC" />
    </Helmet>
    <AboutUsTop />
    <StatisticsBar />
    <MissionAndVision />
    <CompanyTimeline />
    <img className={styles.aboutUsPhoto} src={groupPhoto} alt="Sunny Software staff photo" />
  </div>
);

export default AboutUsPage;
