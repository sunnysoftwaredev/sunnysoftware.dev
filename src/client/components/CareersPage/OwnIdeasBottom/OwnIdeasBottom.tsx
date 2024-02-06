import type { FunctionComponent } from 'react';
import React from 'react';
import Button, { ButtonSize, ButtonVariant } from '../../Button/Button';
import styles from './OwnIdeasBottom.scss';

// Text content for OwnIdeasBottom
const HEADER_TEXT = 'Have your own ideas for our partnership?';
const BODY_TEXT = `Our mission is to become an extension of your
team so we can help your business grow — all
while costing you less than a single full-time designer.`;
const BUTTON_TEXT = 'Get a Quote';

const OwnIdeasBottom: FunctionComponent = () => (
  <div className={styles.container}>
    <div className={styles.text}>
      <h2>{HEADER_TEXT}</h2>
      <p>
        {BODY_TEXT}
      </p>
    </div>
    <Button size={ButtonSize.Large} variant={ButtonVariant.Outlined} to="./contact-us">
      {BUTTON_TEXT}
    </Button>
  </div>
);

export default OwnIdeasBottom;
