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
    const startDayOfWeek = currentDate.getDay();
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(date.getDate() - startDayOfWeek + i);
      days.push(date);
    }
    return days;
  }, [currentDate]);

  const daysInWeek = useMemo(() => getDaysInWeek(), [getDaysInWeek]);

  const getUnixDayStart = (date: Date): number => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return Math.floor(newDate.getTime() / 1000);
  };

  const getUnixDayEnd = (date: Date): number => {
    const newDate = new Date(date);
    newDate.setHours(23, 59, 59, 999);
    return Math.floor(newDate.getTime() / 1000);
  };

  const fetchAllWeekLogs = useCallback(async() => {
    try {
      const unixWeekStart = getUnixDayStart(daysInWeek[0]);
      const unixWeekEnd = getUnixDayEnd(daysInWeek[6]);
      const response = await fetch('api/timesheets', {
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

      // clear list when switching back to empty week
      setTimesheetList([]);

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

  const changeToPreviousWeek = useCallback((): void => {
    setCurrentDate((currDate: Date): Date => {
      return new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() - 7);
    });
  }, []);

  const changeToNextWeek = useCallback((): void => {
    setCurrentDate((currDate: Date): Date => {
      return new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() + 7);
    });
  }, []);

  const displayEmployeeCalendars = (timesheets: EmployeeTimesheet[]):
  React.ReactElement[] => {
    const timesheetElements: React.ReactElement[] = [];
    for (const userTimesheet of timesheets) {
      const {
        username,
        email,
        hours,
        invoiced,
        paid,
        submitted,
      } = userTimesheet;
      timesheetElements.push((
        <div
          key={`timesheet-${username}`}
          className={styles.timesheet}
        >
          <div>
            <h3>
              Employee:
              {' '}
              {username}
            </h3>
            <h4>
              Email:
              {' '}
              {email}
            </h4>
            <h4>
              Total Hours:
              {' '}
              {hours.toString()}
            </h4>
          </div>
          <div>
            <p>
              Invoiced:
              {' '}
              {invoiced.toString()}
            </p>
            <p>
              Paid:
              {' '}
              {paid.toString()}
            </p>
            <p>
              Hours Submitted:
              {' '}
              {submitted.toString()}
            </p>

          </div>
        </div>));
    }
    return timesheetElements;
  };

  return (
    <div className={styles.timesheetsContainer}>
      <h1>List of Employees for Selected Week</h1>
      <h2>
        Active Employees for Week:
        {' '}
        {timesheetList.length}
      </h2>
      <h2>Active Clients: </h2>
      <div >
        <div className={styles.weekSelect}>
          <button type="button" onClick={changeToPreviousWeek}> BACK </button>
          <h2>
            Week of
            {' '}
            {daysInWeek[0].toLocaleString('default', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            {' '}
            to
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
