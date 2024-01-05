import React from 'react';
import type { FunctionComponent } from 'react';
import Button, { ButtonSize } from '../../Button/Button';
import style from './TeamCallToAction.scss';
import UnderlineSvg from './UnderlineSvg';

const TeamCallToAction: FunctionComponent = () => {
  return (
    <div className={style.ctaContainer}>
      <h2>Do you want to join our amazing team?</h2>
      <p>
        Book a call to see how Perspective Design
        can help elevate your company&#39;s designs
        to the next level.
      </p>
      <UnderlineSvg />
      <Button
        size={ButtonSize.Large}
        to="/careers"
      >
        See vacancies
      </Button>
    </div>
  );
};

export default TeamCallToAction;