import React from 'react';
import type { FunctionComponent } from 'react';
import Button, { ButtonSize } from '../Button/Button';
import style from './CallToAction.scss';

// Constants for text contents
const HEADER_TEXT = 'We make your business shine';
const BODY_TEXT = 'Book a call to see how Perspective Design can help elevate your company&#39;s designs to the next level.';
const BUTTON_TEXT = 'Explore more';
const BUTTON_LINK = '/contact-us';

const CallToAction: FunctionComponent = () => (
  <div className={style.ctaContainer}>
    <h2>{HEADER_TEXT}</h2>
    <p>{BODY_TEXT}</p>
    <Button
      size={ButtonSize.Large}
      to={BUTTON_LINK}
    >
      {BUTTON_TEXT}
    </Button>
  </div>
);

export default CallToAction;
