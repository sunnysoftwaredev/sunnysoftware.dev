import type { FunctionComponent } from 'react';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button, { ButtonSize, ButtonVariant } from '../Button/Button';
import logger from '../../../server/logger';
import styles from './ResourcesPanel.scss';

const ResourcesPanel: FunctionComponent = () => {
  const navigate = useNavigate();

  const exploreMoreClick = useCallback((): void => {
    try {
      navigate('./resources');
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [navigate]);
  return (
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
        size={ButtonSize.Large} onClick={exploreMoreClick}
        variant={ButtonVariant.Outlined}
      >
        Explore more
      </Button>
    </div>
  );
};

export default ResourcesPanel;
