import React, { useCallback } from 'react';
import type { FunctionComponent, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import logger from '../../../server/logger';
import Button from '../Button/Button';
import style from './CallToAction.scss';

const CallToAction: FunctionComponent = () => {
  const navigate = useNavigate();

  const handleSubmit = useCallback((e: SyntheticEvent): void => {
    try {
      e.preventDefault();
      // setTimeout(() => console.log('timeout'), 3000);
      navigate('/contact-us');
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [navigate]);
  return (
    <div className={style.cta}>
      <p className={style.ctaBlurb}>
        See how our experienced
        engineers can bring your business value and efficiency

      </p>
      <Button size="large" onClick={handleSubmit} icon >Get in Touch! </Button>
    </div>
  );
};

export default CallToAction;
