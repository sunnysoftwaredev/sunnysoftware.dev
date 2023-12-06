import type { FunctionComponent } from 'react';
import React from 'react';
import styles from './StatisticsBar.scss';

const StatisticsBar: FunctionComponent = () => (
  <div className={styles.barContainer}>
    <div className={styles.statistic}>
      <h2>15+</h2>
      <p>Years of experience</p>
    </div>
    <div className={styles.statistic}>
      <h2>1K+</h2>
      <p>Happy Customers</p>
    </div>
    <div className={styles.statistic}>
      <h2>80+</h2>
      <p>Completed projects</p>
    </div>
    <div className={styles.statistic}>
      <h2>95%</h2>
      <p>Positive reviews</p>
    </div>
  </div>
);

export default StatisticsBar;
