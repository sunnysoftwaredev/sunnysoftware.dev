import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { FunctionComponent } from 'react';
import logger from '../../../server/logger';
import { isEmployeeTimesheetArray, isObjectRecord } from '../../../common/utilities/types';
import type { EmployeeTimesheet } from '../../../server/database';
import styles from './EmployeeWorkCalendars.scss';

const EmployeeWorkCalendars: FunctionComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [timesheetList, setTimesheetList] = useState<EmployeeTimesheet[]>([]);

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

  const fetchAllWeekLogs = useCallback(async() => {
    try {
      const unixWeekStart = getUnixDayStart(daysInWeek[0]);
      const unixWeekEnd = getUnixDayEnd(daysInWeek[6]);
      const response = await fetch('http://localhost:3000/api/timesheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ unixWeekStart, unixWeekEnd }),
        credentials: 'same-origin',
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Result not object in EmployeeWorkCalendars.tsx');
      }

      const { listResult } = result;

      if (isEmployeeTimesheetArray(listResult)) {
        setTimesheetList(listResult);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [daysInWeek]);

  useEffect(() => {
    fetchAllWeekLogs()
      .catch((err) => {
        logger.error(err);
      });
  }, [fetchAllWeekLogs]);

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

  // type GroupedEmployeeLogs = Record<string, AllWeeklyLogs[] | undefined>;
  // const initialGroupedLogs: GroupedEmployeeLogs = {};

  // const groupedByEmployee = fetchList?.reduce(
  //   (group, item) => {
  //     group[item.id] ??= [];
  //     group[item.id]?.push(item);
  //     return group;
  //   },
  //   initialGroupedLogs,
  // );

  const displayEmployeeCalendars = (timesheets: EmployeeTimesheet[]):
  React.ReactElement[] => {
    const timesheetElements: React.ReactElement[] = [];
    for (const userTimesheet of timesheets) {
      const { username } = userTimesheet;
      const { email } = userTimesheet;
      const { hours } = userTimesheet;
      const { invoiced } = userTimesheet;
      const { paid } = userTimesheet;
      const { submitted } = userTimesheet;
      timesheetElements.push((
        <div
          key={`timesheet-${username}`}
          className={styles.timesheet}
        >
          <h3>{username}</h3>
          <h4>{email}</h4>
          <h4>{hours.toString()}</h4>
          <p>{invoiced.toString()}</p>
          <p>{paid.toString()}</p>
          <p>{submitted.toString()}</p>
        </div>));
    }
    return timesheetElements;
  };

  return (
    <div>
      <h1>Employee Hours</h1>
      <div >
        <div>
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
        <div>
          {displayEmployeeCalendars(timesheetList)}
        </div>
      </div>
    </div>
  );
};

export default EmployeeWorkCalendars;
