import type { FunctionComponent } from 'react';
import React from 'react';
import styles from './StatisticsBar.scss';

interface Statistic {
  value: string;
  description: string;
}

interface StatisticItemProps {
  stat: Statistic;
}

const StatisticItem: FunctionComponent<StatisticItemProps> = ({ stat }) => (
  <div key={stat.description} className={styles.statistic}>
    <h2>{stat.value}</h2>
    <p>{stat.description}</p>
  </div>
);

const statistics: Statistic[] = [
  { value: '15+', description: 'Years of experience' },
  { value: '1K+', description: 'Happy Customers' },
  { value: '80+', description: 'Completed projects' },
  { value: '95%', description: 'Positive reviews' },
];

const StatisticsBar: FunctionComponent = () => (
  <div className={styles.barContainer}>
    {statistics.map((stat) => (
      <StatisticItem key={stat.description} stat={stat} />
    ))}
  </div>
);

export default StatisticsBar;
