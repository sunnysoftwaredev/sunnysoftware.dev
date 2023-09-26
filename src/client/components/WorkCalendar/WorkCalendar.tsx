import type { FunctionComponent } from 'react';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import logger from '../../../server/logger';
import TimeDropdown from '../TimeDropdown/TimeDropdown';
import { isObjectRecord } from '../../../common/utilities/types';
import type { timeObject } from '../../../server/database';
import styles from './WorkCalendar.scss';

const WorkCalendar: FunctionComponent = () => {
  const { username } = useContext(AuthContext) ?? { username: 'loading' };
  const [currentDate, setCurrentDate] = useState(new Date());
  const [clickedDate, setClickedDate] = useState('');
  const [weeklyLogs, setWeeklyLogs] = useState<timeObject[]>();

  const getDaysInWeek = useCallback((): Date[] => {
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const first = currentDate.getDate() - currentDate.getDay() + i;
      const day
      = new Date(currentDate.setDate(first));
      days.push(day);
    }
    return days;
  }, [currentDate]);

  const daysInWeek = useMemo(() => getDaysInWeek(), [getDaysInWeek]);

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
      const unixWeekStart = getUnixDayStart(daysInWeek[0]);
      const unixWeekEnd = getUnixDayEnd(daysInWeek[6]);

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

      return result.listResult;
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [daysInWeek]);

  useEffect(() => {
    fetchWeekLogs()
      .then((result: timeObject[]) => {
        if (typeof result !== 'undefined') {
          setWeeklyLogs(result);
        }
      })
      .catch((err) => {
        logger.error(err);
      });
  }, [fetchWeekLogs]);

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
     } else {
       logger.info('type error in handleDateClick');
     }
   }, []);

  const unixToTimeString = (unix: number): string => new Date(unix
      * 1000).toLocaleString('default', {
    hour: 'numeric',
    minute: 'numeric',
  });

  const displayDayLogs = (dayLogs: timeObject[] | undefined):
  React.ReactElement => {
    const resultDiv: React.ReactElement[] = [];
    if (typeof dayLogs === 'undefined') {
      return <div />;
    }
    for (const log of dayLogs) {
      resultDiv.push((<div key={log.unix_start} className={styles.dateLogs}>
        <li>{unixToTimeString(log.unix_start)}</li>
        <h4>-</h4>
        <li>{unixToTimeString(log.unix_end)}</li>
      </div>));
    }
    return resultDiv;
  };

  const displayWeek = (): React.ReactElement[] => {
    const dayDivs: React.ReactElement[] = [];
    for (let i = 0; i < 7; i++) {
      const rawDate = daysInWeek[i];
      const rawDateStart = getUnixDayStart(rawDate);
      const rawDateEnd = getUnixDayEnd(rawDate);
      const dayLogs = weeklyLogs?.filter(log => (log.unix_start
         >= rawDateStart && log.unix_end <= rawDateEnd));
      const day: string = rawDate.toString().slice(0, 10);
      dayDivs.push((
        <div
          key={`day-${i}`}
          className={styles.box}
          onClick={handleDateClick}
        >
          {day}
          <TimeDropdown propsDate={rawDate} />
          {displayDayLogs(dayLogs)}
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
      {/* {weeklyLogs?.map(log => (
        <div key={log.unix_start}>
          <li >
            {new Date(log.unix_start
           * 1000).toLocaleString()}

          </li>
          <li >
            {new Date(log.unix_end
           * 1000).toLocaleString()}

          </li>

        </div>

      ))} */}
    </div>
  );
};

export default WorkCalendar;
