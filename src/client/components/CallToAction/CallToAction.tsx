import React, { useCallback } from 'react';
import type { FunctionComponent, SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './CallToAction.scss';
import background from './unsplashWhiteboard.png';

const CallToAction: FunctionComponent = () => {
  const navigate = useNavigate();

  const handleSubmit = useCallback((e: SyntheticEvent): void => {
    try {
      e.preventDefault();
      navigate('/contact-us');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err);
      }
    }
  }, [navigate]);
  return (
    <div className={style.cta}>
      <img src={background} className={style.ctaImage} />
      <p className={style.ctaBlurb}>
        See how our experienced
        engineers can bring your business value and efficiency

      </p>
      <button
        onClick={handleSubmit} className={style.ctaButton}
        type="submit"
      >
        Get in Touch
      </button>
    </div>
  );
};

export default CallToAction;
