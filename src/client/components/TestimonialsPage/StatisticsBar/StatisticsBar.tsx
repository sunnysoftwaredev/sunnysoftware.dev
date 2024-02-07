import type { FunctionComponent } from 'react';
import React, { memo } from 'react';
import styles from './StatisticsBar.scss';

interface Statistic {
  value: string;
  description: string;
}

const statistics: Statistic[] = [
  { value: '15+', description: 'Years of experience' },
  { value: '1K+', description: 'Happy Customers' },
  { value: '80+', description: 'Completed projects' },
  { value: '95%', description: 'Positive reviews' },
];

const StatisticsBar: FunctionComponent = memo(() => (
  <div className={styles.barContainer}>
    {statistics.map(stat => (
      <div key={stat.description} className={styles.statistic}>
        <h2>{stat.value}</h2>
        <p>{stat.description}</p>
      </div>
    ))}
  </div>
));

export default StatisticsBar;
