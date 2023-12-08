import type { FunctionComponent } from 'react';
import React from 'react';
import Button, { ButtonSize } from '../../Button/Button';
import styles from './CareersBanner.scss';

const CareersBanner: FunctionComponent = () => {
  const backgroundSvg = (
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
  return (
    <div className={styles.container}>
      <div className={styles.textAndButton}>
        <h1>Careers</h1>
        <p>
          Step into the future with our cutting-edge
          technology solutions tailored for your
          business needs.
        </p>
        <Button size={ButtonSize.Large} to="/contact-us">
          Join our team
        </Button>
      </div>
      {backgroundSvg}
    </div>
  );
};

export default CareersBanner;
