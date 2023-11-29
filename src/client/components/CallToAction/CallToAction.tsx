import React, { useCallback } from 'react';
import type { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import logger from '../../../server/logger';
import Button, { ButtonSize } from '../Button/Button';
import style from './CallToAction.scss';

const CallToAction: FunctionComponent = () => {
  const navigate = useNavigate();

  const exploreMoreClick = useCallback((): void => {
    try {
      navigate('/contact-us');
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [navigate]);
  return (
    <div className={style.ctaContainer}>
      <h2>We make your business shine</h2>
      <p>
        Book a call to see how Perspective Design
        can help elevate your company&#39;s designs
        to the next level.
      </p>
      <Button
        size={ButtonSize.Large}
        onClick={exploreMoreClick}
      >
        Explore more
      </Button>
    </div>
  );
};

export default CallToAction;
