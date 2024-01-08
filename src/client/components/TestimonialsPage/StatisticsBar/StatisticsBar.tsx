import type { FunctionComponent } from 'react';
import React from 'react';
import styles from './StatisticsBar.scss';

type StatisticProps = {
  value: string;
  label: string;
};

const Statistic: FunctionComponent<StatisticProps> = ({ value, label }) => (
  <div className={styles.statistic}>
    <h2>{value}</h2>
    <p>{label}</p>
  </div>
);

const StatisticsBar: FunctionComponent = () => (
  <div className={styles.barContainer}>
    <Statistic value="15+" label="Years of experience" />
    <Statistic value="1K+" label="Happy Customers" />
    <Statistic value="80+" label="Completed projects" />
    <Statistic value="95%" label="Positive reviews" />
  </div>
);

export default StatisticsBar;
