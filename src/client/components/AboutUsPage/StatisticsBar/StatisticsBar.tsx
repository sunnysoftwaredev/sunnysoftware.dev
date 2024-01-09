import type { FunctionComponent } from 'react';
import React from 'react';
import styles from './StatisticsBar.scss';

type StatisticItem = {
  value: string;
  description: string;
};

const statisticItems: StatisticItem[] = [
  { value: '15+', description: 'Years of experience' },
  { value: '1K+', description: 'Happy Customers' },
  { value: '80+', description: 'Completed projects' },
  { value: '95%', description: 'Positive reviews' },
];

const StatisticsBar: FunctionComponent = () => (
  <div className={styles.barContainer}>
    {statisticItems.map((item, index) => (
      <div key={index} className={styles.statistic}>
        <h2>{item.value}</h2>
        <p>{item.description}</p>
      </div>
    ))}
  </div>
);

export default StatisticsBar;
