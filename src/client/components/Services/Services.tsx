import React from 'react';
import type { FunctionComponent } from 'react';
import styles from './Services.scss';

const Services: FunctionComponent = () => (
  <div className={styles.servicesContainer}>
    <div className={styles.servicesPanel}>
      <h3>Web Sites & Web Apps</h3>
      <div className={styles.divider} />
      <div className={styles.picPlaceholder}>Pic here</div>
      <p>
        Custom functionality and styling, with optimization for search to get
        you the page you want
      </p>
    </div>
    <div className={styles.servicesPanel}>
      <h3>Mobile Apps</h3>
      <div className={styles.divider} />
      <div className={styles.picPlaceholder}> Pic here</div>
      <p>
        With more and more market share going to smartphones, having a
        dedicated mobile app built by professionals pays off
      </p>
    </div>
    <div className={styles.servicesPanel}>
      <h3>Desktop Apps</h3>
      <div className={styles.divider} />
      <div className={styles.picPlaceholder}>Pic here</div>
      <p>
        Many people switch back and forth between mobile and desktop, and we
        have all of your bases covered
      </p>
    </div>
    <div className={styles.servicesPanel}>
      <h3>Blockchain Solutions</h3>
      <div className={styles.divider} />
      <div className={styles.picPlaceholder} >Pic here</div>
      <p>
        Take advantage of emerging technology to ensure the integrity and
        security of your products and data
      </p>
    </div>
  </div>
);

export default Services;
