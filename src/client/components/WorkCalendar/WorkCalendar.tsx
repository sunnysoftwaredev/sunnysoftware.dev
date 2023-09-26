import type { FunctionComponent, MutableRefObject } from 'react';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import logger from '../../../server/logger';
import TimeDropdown from '../TimeDropdown/TimeDropdown';
import { isObjectRecord } from '../../../common/utilities/types';
import styles from './WorkCalendar.scss';

const WorkCalendar: FunctionComponent = () => {
  const { username } = useContext(AuthContext) ?? { username: 'loading' };
  const [currentDate, setCurrentDate] = useState(new Date());
  const [clickedDate, setClickedDate] = useState('');

  const getDaysInWeek = (): Date[] => {
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const first = currentDate.getDate() - currentDate.getDay() + i;
      const day
      = new Date(currentDate.setDate(first));
      days.push(day);
    }
    return days;
  };
  const daysInWeek = getDaysInWeek();

  const getUnixDayStart = (date: Date): number => {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return Math.floor(date.getTime() / 1000);
  };

  const getUnixDayEnd = (date: Date): number => {
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    date.setMilliseconds(999);

    return Math.floor(date.getTime() / 1000);
  };

  const fetchWeekLogs = useCallback(async() => {
    try {
      console.log('first day: ', daysInWeek[0]);
      console.log('last day: ', daysInWeek[6]);
      console.log('unix time first day: ', Math.floor(daysInWeek[0].getTime() / 1000));
      console.log('unix time last day: ', Math.floor(daysInWeek[6].getTime() / 1000));
      const unixWeekStart = getUnixDayStart(daysInWeek[0]);
      const unixWeekEnd = getUnixDayEnd(daysInWeek[6]);
      console.log('function time first day: ', unixWeekStart);
      console.log('function time last day: ', unixWeekEnd);

      console.log(' ');
      console.log(' ');
      console.log('new date first: ', new Date(1695531600 * 1000));
      console.log('new date last: ', new Date(1696136399 * 1000));

      const response = await fetch('http://localhost:3000/api/weeklyLogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ unixWeekStart, unixWeekEnd }),
        credentials: 'same-origin',
      });

      const result: unknown = await response.json();
      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: AuthContext.tsx');
      }

      console.log('result in frontend: ', result);

      // if (typeof result.username !== 'string') {
      // throw new Error('username variable not type string: AuthContext.tsx');
      // }
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [daysInWeek]);

  // const unixTimesForWeek = fetchWeekLogs();
  // .catch((err) => {
  //   logger.error(err);
  // });

  const unixTimesForWeek: MutableRefObject<string | unknown> = useRef();

  useEffect(() => {
    fetchWeekLogs()
      .then((result) => {
        if (typeof result !== 'undefined') {
          unixTimesForWeek.current = result;
        }
      })
      .catch((err) => {
        logger.error(err);
      });
  }, [fetchWeekLogs]);

  console.log('unixTimesForWeek: ', unixTimesForWeek);

  const changeToPrevWeek = useCallback((): void => {
    setCurrentDate((currDate: Date): Date => {
      const Year = currDate.getFullYear();
      const Month = currDate.getMonth();
      const Day = currDate.getDate();
      return new Date(Year, Month, Day - 7);
    });
  }, []);

  const changeToNextWeek = useCallback((): void => {
    setCurrentDate((currDate: Date): Date => {
      const Year = currDate.getFullYear();
      const Month = currDate.getMonth();
      const Day = currDate.getDate();
      return new Date(Year, Month, Day + 7);
    });
  }, []);

  const handleDateClick
   = useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
     e.preventDefault();
     const { target } = e;
     if (target instanceof HTMLDivElement) {
       const dayString: string = target.innerText;
       setClickedDate(dayString);
     } else if (target instanceof Object) {
       logger.info('selected dropdown, WIP');
     } else {
       logger.info('type error in handleDateClick');
     }
   }, []);

  // const convertDateStringToUnix = (date: string): number => {
  //   const timeInMS = Date.parse(date);
  //   const roundedSeconds = Math.floor(timeInMS / 1000);
  //   return roundedSeconds;
  // };

  const displayWeek = (): React.ReactElement[] => {
    const dayDivs: React.ReactElement[] = [];
    for (let i = 0; i < 7; i++) {
      const rawDate = daysInWeek[i];
      const day: string = rawDate.toString().slice(0, 10);
      dayDivs.push((
        <div
          key={`day-${i}`}
          className={styles.box}
          onClick={handleDateClick}
        >
          {day}
          <TimeDropdown propsDate={rawDate} />
        </div>
      ));
    }
    return dayDivs;
  };

  return (
    <div>
      <h3>
        Work hours for
        {' '}
        {username}
        {' '}
      </h3>

      <div className={styles.week}>
        <div className={styles.weekHeader}>
          <button type="button" onClick={changeToPrevWeek}> BACK </button>
          <h2>
            Week of
            {' '}
            {' '}
            {daysInWeek[0].toLocaleString('default', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            {' '}
            {' '}
            to
            {' '}
            {' '}
            {daysInWeek[6].toLocaleString('default', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </h2>
          <button type="button" onClick={changeToNextWeek}> NEXT </button>
        </div>

        <div className={styles.body}>
          {displayWeek()}
          {' '}
        </div>

        <div className={styles.boxSelected}>
          Selected Date:
          {' '}
          <p>{clickedDate}</p>
        </div>

      </div>
    </div>
  );
};

export default WorkCalendar;
