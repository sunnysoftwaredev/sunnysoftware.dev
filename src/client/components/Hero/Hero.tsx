import React, { FunctionComponent } from 'react';
import Button, { ButtonSize } from '../Button/Button';
import styles from './Hero.scss';
import heroPicture from './HeroPicture.png';

const Hero: FunctionComponent = () => (
  <div className={styles.fullHeroContainer}>
    <div className={styles.hero}>
      <div className={styles.textContainer}>
        <h1>Journey into the tech of tomorrow</h1>
        <p>
          Step into the future with our cutting-edge
          technology solutions tailored for your business needs
        </p>
        <Button size={ButtonSize.Large} to="/contact-us" >
          Get a Quote
        </Button>
      </div>
      <div className={styles.imgContainer}>
        <img src={heroPicture} className={styles.heroImg} alt="Two people happy with Sunny Software" />
      </div>
    </div>
  </div>
);

export default Hero;
