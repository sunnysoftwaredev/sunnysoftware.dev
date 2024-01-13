import type { FunctionComponent } from 'react';
import React from 'react';
import styles from './StatisticsBar.scss';

interface StatisticItemProps {
  value: string;
  text: string;
}

const StatisticItem: FunctionComponent<StatisticItemProps> = ({ value, text }) => (
  <div className={styles.statistic}>
    <h2>{value}</h2>
    <p>{text}</p>
  </div>
);

const statistics = [
  { value: '15+', text: 'Years of experience' },
  { value: '1K+', text: 'Happy Customers' },
  { value: '80+', text: 'Completed projects' },
  { value: '95%', text: 'Positive reviews' },
]

const StatisticsBar: FunctionComponent = () => (
  <div className={styles.barContainer}>
    {statistics.map(stat => (
      <StatisticItem key={stat.value} value={stat.value} text={stat.text} />
    ))}
  </div>
);

export default StatisticsBar;
