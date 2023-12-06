import type { FunctionComponent } from 'react';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button, { ButtonSize, ButtonVariant } from '../../Button/Button';
import logger from '../../../../server/logger';
import styles from './TestimonialsNeedHelp.scss';

const TestimonialsNeedHelp: FunctionComponent = () => {
  const navigate = useNavigate();

  const getAQuoteClick = useCallback((): void => {
    try {
      navigate('./resources');
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [navigate]);
  return (
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
        size={ButtonSize.Large} onClick={getAQuoteClick}
        variant={ButtonVariant.Outlined}
      >
        Get a Quote
      </Button>
    </div>
  );
};

export default TestimonialsNeedHelp;
