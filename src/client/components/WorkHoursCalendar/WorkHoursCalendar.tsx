import type { FunctionComponent } from 'react';
import React, { useCallback, useContext, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import HoursCalendarWeek from '../HoursCalendarWeek/HoursCalendarWeek';
import styles from './WorkHoursCalendar.scss';

const WorkHoursCalendar: FunctionComponent = () => {
  const { username } = useContext(AuthContext) ?? { username: 'loading' };
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = (year: number, month: number):
  number => new Date(year, month + 1, 0).getDate();

  const daysInPriorMonth = (year: number, month: number):
  number => new Date(year, month, 0).getDate();

  const findFirstDay = (year: number, month: number):
  number => new Date(year, month, 1).getDay();

  const firstDayInNextMonth = (year: number, month: number):
  number => new Date(year, month + 1, 0).getDay();

  const changeToPrevMonth = useCallback((): void => {
    setSelectedDate((previousDate) => {
      const previousMonth = previousDate.getMonth() - 1;
      const previousYear = previousDate.getFullYear();
      return new Date(previousYear, previousMonth);
    });
  }, []);

  const changeToNextMonth = useCallback((): void => {
    setSelectedDate((previousDate) => {
      const newMonth = previousDate.getMonth() + 1;
      const newYear = previousDate.getFullYear();
      return new Date(newYear, newMonth);
    });
  }, []);

  const handleDateClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    (date: Date): void => {
      setSelectedDate(date);
    };
  }, []);

  const showCalendar = (): React.ReactElement[] => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const totalDays = daysInMonth(year, month);
    const firstDay = findFirstDay(year, month);
    const priorDays = daysInPriorMonth(year, month);
    const nextFirstDay = firstDayInNextMonth(year, month);

    const showPriorDays = priorDays - firstDay + 1;
    const showNextFirstDay = 7 - nextFirstDay;
    const allDays: React.ReactElement[] = [];

    // Show days of previous month
    for (let p = showPriorDays; p < firstDay + showPriorDays; p++) {
      // What is happening ??
      const date = new Date(year, month - 1, p);
      allDays.push(<div
        key={`prior-${p}`} className={styles.boxOther}
        onClick={() => handleDateClick(date)}
                   >
        {' '}
        {p}
        {' '}

      </div>);
    }

    // Show actual days
    for (let d = 1; d <= totalDays; d++) {
      const date = new Date(year, month, d);

      allDays.push(<div
        key={`day-${d}`}
        className={styles.box}
        onClick={() => handleDateClick(date)}
      >
        {d}
      </div>);
    }
    // days for next month
    for (let n = 1; n < showNextFirstDay; n++) {
      const date = new Date(year, month + 1, n);
      allDays.push(<div
        key={`next-${n}`} className={styles.boxOther}
        onClick={() => handleDateClick(date)}
                   >
        {' '}
        {n}
      </div>);
    }
    return allDays;
  };
  return (
    <div>
      <h3>
        Work hours for
        {' '}
        {username}
      </h3>
      <div className={styles.month}>
        <div className={styles.header}>
          <button type="button" onClick={changeToPrevMonth}> BACK </button>
          <h2>
            {selectedDate.toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </h2>
          <button type="button" onClick={changeToNextMonth}> NEXT </button>
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
        <div className={styles.body}>
          {showCalendar()}
          {' '}
        </div>

        <div className={styles.boxSelected}>
          Selected Date:
          {' '}
          {selectedDate.toLocaleDateString()}
        </div>

      </div>
      <div className={styles.week}>
        <HoursCalendarWeek />
      </div>
    </div>
  );
};

export default WorkHoursCalendar;
