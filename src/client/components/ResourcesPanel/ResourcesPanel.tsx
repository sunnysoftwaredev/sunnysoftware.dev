import type { FunctionComponent } from 'react';
import React from 'react';
import Button, { ButtonSize, ButtonVariant } from '../Button/Button';
import styles from './ResourcesPanel.scss';

const ResourcesPanel: FunctionComponent = () => (
  <div className={styles.resourcesPanelContainer}>
    <div className={styles.resourcePanelText}>
      <h2>Resources</h2>
      <p>
        Our mission is to become an extension of your
        team so we can help your business grow — all
        while costing you less than a single full-time designer.
        {' '}
      </p>
    </div>
    <Button
      size={ButtonSize.Large}
      variant={ButtonVariant.Outlined}
      to="/resources"
    >
      Explore more
    </Button>
  </div>
);

export default ResourcesPanel;
