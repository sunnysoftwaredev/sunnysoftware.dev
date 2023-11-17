import React, { useCallback } from 'react';
import type { FunctionComponent } from 'react';
import { useNavigate } from 'react-router-dom';
import Button, { ButtonSize } from '../Button/Button';
import logger from '../../../server/logger';
import styles from './Hero.scss';
import heroPicture from './HeroPicture.png';

const Hero: FunctionComponent = () => {
  const navigate = useNavigate();

  const handleClick = useCallback((): void => {
    try {
      navigate('/contact-us');
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [navigate]);
  return (
    <div className={styles.fullHeroContainer}>
      <div className={styles.hero}>
        <div className={styles.textContainer}>
          <h1>Journey into the tech of tomorrow</h1>
          <p>
            Step into the future with our cutting-edge
            technology solutions tailored for your business needs
          </p>
          <Button size={ButtonSize.Large} onClick={handleClick} >
            Get a Quote
          </Button>
        </div>
        <div className={styles.imgContainer}>
          <img src={heroPicture} className={styles.heroImg} alt="Two people happy with Sunny Software" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
