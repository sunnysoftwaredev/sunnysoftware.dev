import type { FunctionComponent } from 'react';
import React from 'react';
import styles from './StatisticsBar.scss';

type StatisticData = {
  value: string;
  description: string;
};

const STATISTICS_DATA: StatisticData[] = [
  { value: '15+', description: 'Years of experience' },
  { value: '1K+', description: 'Happy Customers' },
  { value: '80+', description: 'Completed projects' },
  { value: '95%', description: 'Positive reviews' }
];

const StatisticsBar: FunctionComponent = () => (
  <div className={styles.barContainer}>
    {STATISTICS_DATA.map((statistic) => (
      <div className={styles.statistic} key={statistic.description}>
        <h2>{statistic.value}</h2>
        <p>{statistic.description}</p>
      </div>
    ))}
  </div>
);

export default StatisticsBar;
