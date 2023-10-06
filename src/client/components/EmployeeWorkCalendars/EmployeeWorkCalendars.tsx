import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { FunctionComponent } from 'react';
import logger from '../../../server/logger';
import { isAllWeeklyLogsArray, isObjectRecord } from '../../../common/utilities/types';
import type { AllWeeklyLogs } from '../../../server/database';

const EmployeeWorkCalendars: FunctionComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [fetchList, setFetchList] = useState<AllWeeklyLogs[]>();

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
      const response = await fetch('http://localhost:3000/api/allWeeklyLogs', {
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

      console.log('result: ', listResult);
      if (isAllWeeklyLogsArray(listResult)) {
        setFetchList(listResult);
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

  // const groupedByEmployee: AllWeeklyLogs[]
  // = Object.groupBy(fetchList, ({ username }) => username);

  // type SortedUsers = {
  //   username: Record<string, unknown>[];
  // };

  // if (fetchList !== undefined) {
  //   const groupedByEmployee: Record<string, AllWeeklyLogs[]>
  //    = fetchList.reduce((group, item) => {
  //      group[item.username] = group[item.username] ?? [];
  //      group[item.username].push(item);
  //      return group;
  //    }, []);
  // }

  // const groupedByEmployee: Record<string, AllWeeklyLogs[]>
  //    = fetchList?.reduce((group, item) => {
  //      group[item.username] = group[item.username] ?? [];
  //      group[item.username].push(item);
  //      return group;
  //    }, []);

  type GroupedEmployeeLogs = Record<string, AllWeeklyLogs[] | undefined>;

  const initialGroupedLogs: GroupedEmployeeLogs = {};

  const groupedByEmployee = fetchList?.reduce(
    (group, item) => {
      group[item.username] ??= [];
      group[item.username]?.push(item);
      return group;
    },
    initialGroupedLogs,
  );

  if (groupedByEmployee !== undefined) {
    console.log('groupedByEmployee', groupedByEmployee);
    console.log('groupedByEmployee[0]', groupedByEmployee[0]);
  }

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
      </div>
    </div>
  );
};

export default EmployeeWorkCalendars;

// filter rows by individual and display logs for that week.

// Loop through and display information for each of the worklogs

// Display hours for day, total hours

