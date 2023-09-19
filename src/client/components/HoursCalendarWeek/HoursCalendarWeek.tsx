import type { FunctionComponent } from 'react';
import React from 'react';
import styles from './HoursCalendarWeek.scss';

const HoursCalendarWeek: FunctionComponent = ({ selectedDate }) => {
  const displayWeek = () => {
    const daysInWeek = [];
    for (let i = 0; i < 7; i++) {
      daysInWeek.push(<div key={`weekDay-${i}`} className={styles.weekDay}>
        {' '}
        {i}
        {' '}

      </div>);
    }
    return daysInWeek;
  };

  return (
    <div>
      <h3>Week of </h3>
      <div className={styles.header}>
        <button type="button" > BACK </button>
        <h2>
          {selectedDate.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <button type="button" > NEXT </button>
      </div>
      <div className={styles.headerDays}>
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>
      <div className={styles.weekBody}>
        {displayWeek()}
      </div>
    </div>
  );
};

export default HoursCalendarWeek;
