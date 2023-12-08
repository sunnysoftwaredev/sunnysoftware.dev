import React from 'react';
import type { FunctionComponent } from 'react';
import Button, { ButtonSize, ButtonVariant } from '../Button/Button';
import styles from './Services.scss';
import webImg1 from './webDevelopmentCardImage1.jpg';
import webImg2 from './webDevelopmentCardImage2.jpg';
import mobileLeft from './mobileStickupImage.jpg';
import mobileMiddleLeftTop from './mobileWelcomeBackEmptyImage.jpg';
import mobileMiddleLeftBottom from './mobileEmptySignupImage.jpg';
import mobileMiddleRightTop from './mobileSignupFilledImage.jpg';
import mobileMiddleRightBottom from './mobileExpenseGraphImage.jpg';
import mobileRight from './mobileQrCodeImage.jpg';
import cryptoImg1 from './cyrptoImage1.jpg';
import cryptoImg2 from './cyrptoImage2.jpg';

const Services: FunctionComponent = () => (
  <div className={styles.servicesContainer}>
    <div className={styles.servicesTextCard}>
      <h2>Save time and get more done</h2>
      <p>
        Our mission is to become an extension of yoru team so we can
        help your business grow - all while costing you less than a full-time
        developer.
      </p>
      <Button
        size={ButtonSize.Large}
        to="/contact-us"
      >
        Explore more
      </Button>
    </div>
    <div className={styles.webDevelopmentCard}>
      <h2>Web Development</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Adipisci deserunt est
        ullam ipsa voluptates mollitia? Lorem,
        ipsum dolor sit amet consectetur adipisicing elit. Corrupti, aut?
      </p>
      <Button
        size={ButtonSize.Large}
        variant={ButtonVariant.Outlined}
        to="/contact-us"
      >
        Explore more
      </Button>
      <img src={webImg1} className={styles.webImg1} alt="card image" />
      <img src={webImg2} className={styles.webImg2} alt="card image" />
    </div>
    <div className={styles.mobileDevelopmentCard}>
      <h2>Mobile development</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Adipisci deserunt est
        ullam ipsa voluptates mollitia? Lorem,
        ipsum dolor sit amet consectetur adipisicing elit. Corrupti, aut?
      </p>
      <Button
        size={ButtonSize.Large}
        variant={ButtonVariant.Outlined}
        to="/contact-us"
      >
        Explore more
      </Button>
      <img src={mobileLeft} className={styles.mobileImg1} alt="mobile phone picture" />
      <img src={mobileMiddleLeftTop} className={styles.mobileImg2} alt="mobile phone picture" />
      <img src={mobileMiddleLeftBottom} className={styles.mobileImg3} alt="mobile phone picture" />
      <img src={mobileMiddleRightTop} className={styles.mobileImg4} alt="mobile phone picture" />
      <img src={mobileMiddleRightBottom} className={styles.mobileImg5} alt="mobile phone picture" />
      <img src={mobileRight} className={styles.mobileImg6} alt="mobile phone picture" />
    </div>
    <div className={styles.cryptoCard}>
      <h2>Crypto Contracts</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Adipisci deserunt est
        ullam ipsa voluptates mollitia? Lorem,
        ipsum dolor sit amet consectetur adipisicing elit. Corrupti, aut?
      </p>
      <Button
        size={ButtonSize.Large}
        variant={ButtonVariant.Outlined}
        to="/contact-us"
      >
        Explore more
      </Button>
      <img src={cryptoImg1} className={styles.cryptoImg1} alt="card image" />
      <img src={cryptoImg2} className={styles.cryptoImg2} alt="card image" />
    </div>

  </div>
);

export default Services;
