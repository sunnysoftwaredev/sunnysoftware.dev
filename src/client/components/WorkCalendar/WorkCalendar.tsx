import type { FunctionComponent } from 'react';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import logger from '../../../server/logger';
import TimeDropdown from '../TimeDropdown/TimeDropdown';
import { isObjectRecord, isTimeArray } from '../../../common/utilities/types';
import type { TimeObject } from '../../../server/database';
import WorkLog from '../WorkLog/WorkLog';
import styles from './WorkCalendar.scss';

const WorkCalendar: FunctionComponent = () => {
  const { username } = useContext(AuthContext) ?? { username: 'loading' };
  const [currentDate, setCurrentDate] = useState(new Date());
  // const [clickedDate, setClickedDate] = useState('');
  const [weeklyWorkLogs, setWeeklyWorkLogs] = useState<TimeObject[]>();

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

      const response = await fetch('http://localhost:3000/api/weeklyWorkLogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ unixWeekStart, unixWeekEnd }),
        credentials: 'same-origin',
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: WorkCalendar.tsx');
      }
      const { listResult } = result;

      if (isTimeArray(listResult)) {
        setWeeklyWorkLogs(listResult);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [daysInWeek]);

  useEffect(() => {
    fetchWeekLogs()
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

  // In case of future use:
  // const handleDateClick
  //  = useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
  //    e.preventDefault();
  //    const { target } = e;
  //    if (target instanceof HTMLDivElement) {
  //      const dayString: string = target.innerText;
  //      setClickedDate(dayString);
  //    } else if (target instanceof Object) {
  //      // else if here stops the logger below from continually running
  //    } else {
  //      logger.info('type error in handleDateClick');
  //    }
  //  }, []);

  const displayDayLogs = (dayLogs: TimeObject[] | undefined):
  React.JSX.Element[] => {
    if (typeof dayLogs === 'undefined') {
      return [<div key={0} />];
    }
    return dayLogs.map(log => (
      <WorkLog key={log.unixStart} log={log} />
    ));
  };

  const compareObjects = (a: TimeObject, b: TimeObject): number => {
    const startA = a.unixStart;
    const startB = b.unixStart;

    let comparison = 0;
    if (startA > startB) {
      comparison = 1;
    } else if (startA < startB) {
      comparison = -1;
    }
    return comparison;
  };

  const displayWeek = (): React.ReactElement[] => {
    const dayDivs: React.ReactElement[] = [];
    for (let i = 0; i < 7; i++) {
      const rawDate = daysInWeek[i];
      const rawDateStart = getUnixDayStart(rawDate);
      const rawDateEnd = getUnixDayEnd(rawDate);
      const day: string = rawDate.toString().slice(0, 10);
      const dayLogs = weeklyWorkLogs?.filter(log => (log.unixStart
         >= rawDateStart && log.unixEnd <= rawDateEnd + 1));
      dayLogs?.sort(compareObjects);
      dayDivs.push((
        <div
          key={`day-${i}`}
          className={styles.box}
          // onClick={handleDateClick}
        >
          {day}
          <TimeDropdown
            propsDate={rawDate} dayLogs={dayLogs}
            defaultStart={0} defaultEnd={0}
            updating={false}
          />
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

        {/* <div className={styles.boxSelected}>
          Selected Date:
          {' '}
          <p>{clickedDate}</p>
        </div> */}
      </div>
    </div>
  );
};

export default WorkCalendar;
