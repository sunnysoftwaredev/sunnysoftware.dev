import type { FunctionComponent } from 'react';
import React from 'react';
import Button, { ButtonSize } from '../../Button/Button';
import styles from './TeamBanner.scss';
import BannerImg1 from './BannerImg1.jpg';
import BannerImg2 from './BannerImg2.jpg';
import BannerImg3 from './BannerImg3.jpg';
import BannerImg4 from './BannerImg4.jpg';

const BackgroundSvg: FunctionComponent = () => (
  <svg width="979" height="261" viewBox="0 0 979 261" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.6" filter="url(#filter0_f_57_5070)">
      <path d="M238.458 758.661C69.8249 604.081 45.3189 356.37 183.723 205.384C322.126 54.3983 571.029 57.3123 739.662 211.893C908.296 366.473 932.802 614.184 794.398 765.17C601.962 438.939 407.092 913.242 238.458 758.661Z" fill="url(#paint0_linear_57_5070)" />
    </g>
    <defs>
      <filter id="filter0_f_57_5070" x="0.0393066" y="0.0238037" width="978.042" height="884.58" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="47" result="effect1_foregroundBlur_57_5070" />
      </filter>
      <linearGradient id="paint0_linear_57_5070" x1="1045" y1="491.786" x2="-57.3113" y2="600.837" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F3AA1F" />
        <stop offset="1" stopColor="#FED323" />
      </linearGradient>
    </defs>
  </svg>
);

const PortfolioBanner: FunctionComponent = () => (
  <div className={styles.container}>
    <div className={styles.textAndButton}>
      <h1>Team</h1>
      <p>
        Step into the future with our cutting-edge
        technology solutions tailored for your
        business needs.
      </p>
      <Button size={ButtonSize.Large} to="./contact-us">
        Get a quote
      </Button>
    </div>
    <div className={styles.teamStatsContainer}>
      <div className={styles.statsImages}>
        <img className={styles.bannerImg1} src={BannerImg1} alt="Sunny Software Employee" />
        <img className={styles.bannerImg2} src={BannerImg2} alt="Sunny Software Employee" />
        <img className={styles.bannerImg3} src={BannerImg3} alt="Sunny Software Employee" />
        <img className={styles.bannerImg4} src={BannerImg4} alt="Sunny Software Employee" />
      </div>
      <div className={styles.statsDivs}>
        <div className={styles.statsFonts}>
          <p>Creative</p>
          <h4>32</h4>
        </div>
        <div className={styles.statsFonts}>
          <p>Professional</p>
          <h4>12</h4>
        </div>
      </div>
    </div>
    <BackgroundSvg />
  </div>
);

export default PortfolioBanner;
