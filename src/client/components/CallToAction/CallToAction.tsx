import React from 'react';
import type { FunctionComponent } from 'react';
import Button, { ButtonSize } from '../Button/Button';
import style from './CallToAction.scss';

function CallToAction() {
  return (
    <div className={style.ctaContainer}>
      <h2>We make your business shine</h2>
      <p>
        Book a call to see how Perspective Design
        can help elevate your company's designs
        to the next level.
      </p>
      <Button
        size={ButtonSize.Large}
        to="/contact-us"
      >
        Explore more
      </Button>
    </div>
  );
}

export default CallToAction;
