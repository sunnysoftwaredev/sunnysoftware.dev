import type { FunctionComponent } from 'react';
import React from 'react';
import Button, { ButtonSize } from '../../Button/Button';
import styles from './ResourcesBanner.scss';

const ResourcesBanner: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textAndButton}>
        <h1>Resources</h1>
        <p>
          Step into the future with our cutting-edge
          technology solutions tailored for your
          business needs.
        </p>
        <Button size={ButtonSize.Large} to="/team">
          Join our team
        </Button>
      </div>
      <svg width="733" height="688" viewBox="0 0 733 688" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.58" filter="url(#filter0_f_10_289)">
          <path fillRule="evenodd" clipRule="evenodd" d="M357.312 84.1564C427.073 82.0527 496.16 101.069 548.637 147.065C604.725 196.225 641.23 264.001 647.297 338.322C653.903 419.255 643.1 509.34 582.635 563.564C523.826 616.304 436.075 604.574 357.312 598.376C286.838 592.831 216.064 579.426 164.871 530.693C112.502 480.84 81.7396 410.573 84.1298 338.322C86.4518 268.131 125.765 206.113 177.192 158.266C226.599 112.298 289.847 86.1909 357.312 84.1564Z" fill="url(#paint0_linear_10_289)" />
        </g>
        <defs>
          <filter id="filter0_f_10_289" x="0" y="0" width="733" height="688" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur stdDeviation="42" result="effect1_foregroundBlur_10_289" />
          </filter>
          <linearGradient id="paint0_linear_10_289" x1="84" y1="84" x2="603.384" y2="648.331" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F3AA1F" />
            <stop offset="1" stopColor="#FED323" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default ResourcesBanner;
