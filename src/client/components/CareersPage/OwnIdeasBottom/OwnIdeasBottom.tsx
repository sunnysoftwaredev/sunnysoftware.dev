import type { FunctionComponent } from 'react';
import React from 'react';
import Button, { ButtonSize, ButtonVariant } from '../../Button/Button';
import styles from './OwnIdeasBottom.scss';

const OwnIdeasBottom: FunctionComponent = () => (
  <div className={styles.container}>
    <div className={styles.text}>
      <h2>Have your own ideas for our partnership?</h2>
      <p>
        Our mission is to become an extension of your
        team so we can help your business grow — all
        while costing you less than a single full-time designer.
      </p>
    </div>
    <Button
      size={ButtonSize.Large}
      variant={ButtonVariant.Outlined}
      to="./contact-us"
      aria-label="Get a personalized quote for partnership ideas"
    >
      Get a Quote
    </Button>
  </div>
);

export default OwnIdeasBottom;
