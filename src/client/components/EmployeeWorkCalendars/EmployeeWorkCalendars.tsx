import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { FunctionComponent } from 'react';
import logger from '../../../server/logger';
import { isAllWeeklyLogsArray, isObjectRecord } from '../../../common/utilities/types';
import type { AllWeeklyLogs, TimeObject } from '../../../server/database';

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

  /*
  Make a call to get all weekly calendars for the week
  That function would have to create a row if one didn't exist with
  the current week and hours, then update the hours based on a call to the db.
  Then could return the rows for each individual user and display info (can
    update the paid or invoiced columns later)
  */

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

  // if (groupedByEmployee !== undefined) {
  //   console.log('groupedByEmployee', groupedByEmployee);
  //   console.log('groupedByEmployee[23]', groupedByEmployee[23]);
  //   console.log('groupedByEmployee.[23][0].id', groupedByEmployee[23][0].id);
  //   console.log('Object.entries(groupByEmployees',
  // Object.entries(groupedByEmployee));
  //   console.log('[0][1]', Object.entries(groupedByEmployee)[0][1]);
  // }

  // const displayAllEmployeeWeeks = (groupedByEmployee:
  // GroupedEmployeeLogs) => {
  //   const arrayOfUserArrays = Object.entries(groupedByEmployee);
  //   for (let i = 0; i < arrayOfUserArrays.length; i++) {
  //     userObjects = arrayOfUserArrays[i][1];
  //   }
  // };

  // display users with

  // const displayDayLogs = (dayLogs: TimeObject[] | undefined):
  // React.JSX.Element[] => {
  //   if (typeof dayLogs === 'undefined') {
  //     return [<div key={0} />];
  //   }
  //   return dayLogs.map(log => (
  //     // <WorkLog key={log.unixStart} log={log} />
  //   ));
  // };

  // const compareObjects = (a: TimeObject, b: TimeObject): number => {
  //   const startA = a.unixStart;
  //   const startB = b.unixStart;

  //   let comparison = 0;
  //   if (startA > startB) {
  //     comparison = 1;
  //   } else if (startA < startB) {
  //     comparison = -1;
  //   }
  //   return comparison;
  // };

  // const displayEmployeeWeek
  // = (userObjects: AllWeeklyLogs[]): React.ReactElement[] => {
  //   const dayDivs: React.ReactElement[] = [];
  //   for (let i = 0; i < 7; i++) {
  //     const rawDate = daysInWeek[i];
  //     const rawDateStart = getUnixDayStart(rawDate);
  //     const rawDateEnd = getUnixDayEnd(rawDate);
  //     const day: string = rawDate.toString().slice(0, 10);
  //     const dayLogs = userObjects.filter(log => (log.unixStart
  //        >= rawDateStart && log.unixEnd <= rawDateEnd + 1));
  //     dayLogs.sort(compareObjects);
  //     dayDivs.push((
  //       <div
  //         key={`day--${i}`}
  //         // className={styles.box}
  //       >
  //         {day}
  //         {/* {displayDayLogs(dayLogs)} */}
  //       </div>
  //     ));
  //   }
  //   return dayDivs;
  // };

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

// Display hours for day, total hours

