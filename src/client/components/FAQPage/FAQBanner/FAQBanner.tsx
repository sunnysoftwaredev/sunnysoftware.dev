import React from 'react';
import styles from './FAQBanner.scss';

const FAQBanner: React.FunctionComponent = () => (
  <div className={styles.container}>
    <div className={styles.text}>
      <h1>FAQ</h1>
      <p>
        Step into the future with our cutting-edge
        technology solutions tailored for your business
        needs.
      </p>
    </div>
  </div>
);

export default FAQBanner;
