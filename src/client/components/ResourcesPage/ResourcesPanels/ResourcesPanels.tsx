import type { FunctionComponent } from 'react';
import React from 'react';
import Button, { ButtonSize } from '../../Button/Button';
import styles from './ResourcesPanels.scss';

// Links need to be updated for buttons
const ResourcesPanels: FunctionComponent = () => (
  <div className={styles.container}>
    <div className={styles.panel}>
      <div className={styles.panelText}>
        <h2>PDFs</h2>
        <p>
          Our mission is to become an extension
          of your team so we can help your business
          grow — all while costing you less than a
          single full-time designer. Our mission is
          to become an extension of your team so we
          can help your business grow — all while
          costing you less than a single full-time designer.
          {' '}

        </p>
      </div>
      <div className={styles.buttonContainer}>
        <Button to="/" size={ButtonSize.Large}>See Docs</Button>
      </div>
    </div>
    <div className={styles.panel}>
      <div className={styles.panelText}>
        <h2>Blog articles</h2>
        <p>
          Our mission is to become an extension
          of your team so we can help your business
          grow — all while costing you less than a
          single full-time designer. Our mission is
          to become an extension of your team so we
          can help your business grow — all while
          costing you less than a single full-time designer.
          {' '}

        </p>
      </div>
      <div className={styles.buttonContainer}>
        <Button to="/" size={ButtonSize.Large}>See Docs</Button>
      </div>
    </div>
    <div className={styles.panel}>
      <div className={styles.panelText}>
        <h2>Educational docs</h2>
        <p>
          Our mission is to become an extension
          of your team so we can help your business
          grow — all while costing you less than a
          single full-time designer. Our mission is
          to become an extension of your team so we
          can help your business grow — all while
          costing you less than a single full-time designer.
          {' '}

        </p>
      </div>
      <div className={styles.buttonContainer}>
        <Button to="/" size={ButtonSize.Large}>See Docs</Button>
      </div>
    </div>
  </div>
);

export default ResourcesPanels;
