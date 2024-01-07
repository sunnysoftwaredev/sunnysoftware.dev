import type { FunctionComponent } from 'react';
import React from 'react';
import styles from './StatisticsBar.scss';

interface Statistic {
  value: string;
  description: string;
}

const statisticsData: Statistic[] = [
  { value: '15+', description: 'Years of experience' },
  { value: '1K+', description: 'Happy Customers' },
  { value: '80+', description: 'Completed projects' },
  { value: '95%', description: 'Positive reviews' },
];

const StatisticsBar: FunctionComponent = () => (
  <div className={styles.barContainer}>
    {statisticsData.map((stat, index) => (
      <div key={index} className={styles.statistic}>
        <h2>{stat.value}</h2>
        <p>{stat.description}</p>
      </div>
    ))}
  </div>
);

export default StatisticsBar;
