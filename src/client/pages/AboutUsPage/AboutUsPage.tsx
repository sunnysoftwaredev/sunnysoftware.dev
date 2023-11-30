import React from 'react';
import type { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import AboutUsTop from '../../components/AboutUsPage/AboutUsTop/AboutUsTop';
import StatisticsBar from '../../components/AboutUsPage/StatisticsBar/StatisticsBar';
import MissionAndVision from '../../components/AboutUsPage/MissionAndVision/MissionAndVision';
import CompanyTimeline from '../../components/AboutUsPage/CompanyTimeline/CompanyTimeline';
import groupPhoto from '../../components/AboutUsPage/aboutUsGroupPhoto.png';
import BuildAndGrow from '../../components/AboutUsPage/BuildAndGrow/BuildAndGrow';
import LocationBanner from '../../components/AboutUsPage/LocationBanner/LocationBanner';
import OurTeamAndOpenings from '../../components/OurTeamAndOpenings/OurTeamAndOpenings';
import CallToAction from '../../components/CallToAction/CallToAction';
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
    <BuildAndGrow />
    <LocationBanner />
    <OurTeamAndOpenings />
    <CallToAction />
  </div>
);

export default AboutUsPage;
