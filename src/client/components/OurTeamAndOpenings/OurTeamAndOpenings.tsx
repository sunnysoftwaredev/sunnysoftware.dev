import type { FunctionComponent } from 'react';
import React from 'react';
import Button, { ButtonIcon, ButtonSize, ButtonVariant } from '../Button/Button';
import styles from './OurTeamAndOpenings.scss';
import imageAt11 from './imageAt11.jpg';
import imageAt2 from './imageAt2.jpg';
import imageAt5 from './imageAt5.jpg';
import imageAt830 from './ImageAt830.jpg';

const BackgroundSvg: FunctionComponent = () => (
  <svg width="500" height="500" viewBox="0 0 405 416" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g filter="url(#filter0_f_239_2929)">
      <path d="M98.3758 151.273C129.693 96.8178 199.207 78.05 253.638 109.354C308.069 140.658 326.806 210.179 295.489 264.634C264.171 319.089 194.658 337.857 140.227 306.553C219.177 237.192 67.0583 205.728 98.3758 151.273Z" fill="url(#paint0_linear_239_2929)" />
    </g>
    <defs>
      <filter id="filter0_f_239_2929" x="0.0612488" y="0.20401" width="404.595" height="415.499" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="47" result="effect1_foregroundBlur_239_2929" />
      </filter>
      <linearGradient id="paint0_linear_239_2929" x1="238.783" y1="363.234" x2="154.756" y2="52.0086" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F3AA1F" />
        <stop offset="1" stopColor="#FED323" />
      </linearGradient>
    </defs>
  </svg>
);

const OurTeamAndOpenings: FunctionComponent = () => {
  return (
    <div className={styles.containerOurTeamAndOpenings}>
      <div className={styles.teamCircleImages}>
        <img className={styles.imageOne} src={imageAt11} alt="sunny software employee" />
        <img className={styles.imageTwo} src={imageAt2} alt="sunny software employee" />
        <img className={styles.imageThree} src={imageAt5} alt="sunny software employee" />
        <img className={styles.imageFour} src={imageAt830} alt="sunny software employee" />
        <BackgroundSvg />
      </div>
      <div className={styles.textAndOpenenings}>
        <div className={styles.teamAndOpeningsText}>
          <h2>Our team of professionals</h2>
          <p>
            Our mission is to become an extension of your team so we can help
            your business grow -- all while costing you less than a single full-
            time designer.
            {' '}
          </p>
        </div>
        <div className={styles.openingsContainer}>
          <div className={styles.positionOpeningBox}>
            <h3>Digital Senior Designer</h3>
            <p>Remote</p>
            <Button
              size={ButtonSize.Small}
              iconType={ButtonIcon.RightArrow}
              variant={ButtonVariant.Outlined}
              to="/more-vacancies"
            />
          </div>
          <div className={styles.positionOpeningBox}>
            <h3>Digital Senior Designer</h3>
            <p>Remote</p>
            <Button
              size={ButtonSize.Small}
              iconType={ButtonIcon.RightArrow}
              variant={ButtonVariant.Outlined}
              to="/more-vacancies"
            />
          </div>
        </div>
        <div className={styles.ourTeamAndOpeningsButtons}>
          <Button
            size={ButtonSize.Large}
            to="/our-team"
          >
            Meet our team
          </Button>
          <Button
            size={ButtonSize.Large}
            variant={ButtonVariant.Outlined}
            to="/more-vacancies"
          >
            More vacancies
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OurTeamAndOpenings;
