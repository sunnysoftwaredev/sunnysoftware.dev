import React, { useCallback, useEffect } from 'react';
import type { FunctionComponent } from 'react';

const EmployeeWorkCalendars: FunctionComponent = () => {
  const x = 3;
  // const fetchAllWeekLogs = useCallback(async() => {
  //   try {
  //     const unixWeekStart = getUnixDayStart(daysInWeek[0]);
  //     const unixWeekEnd = getUnixDayEnd(daysInWeek[6]);

  //     const response = await fetch('http://localhost:3000/api/weeklyLogs', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ unixWeekStart, unixWeekEnd }),
  //       credentials: 'same-origin',
  //     });

  //     const result: unknown = await response.json();

  //     if (!isObjectRecord(result)) {
  //       throw new Error('Unexpected body type: WorkCalendar.tsx');
  //     }
  //     const { listResult } = result;

  //     if (isTimeArray(listResult)) {
  //       setWeeklyLogs(listResult);
  //     }
  //   } catch (err: unknown) {
  //     if (err instanceof Error) {
  //       logger.error(err.message);
  //     }
  //   }
  // }, [daysInWeek]);

  // useEffect(() => {
  //   fetchWeekLogs()
  //     .catch((err) => {
  //       logger.error(err);
  //     });
  // }, [fetchWeekLogs]);

  return (
    <div>
      <h1>Employee Hours</h1>
    </div>
  );
};

export default EmployeeWorkCalendars;

// Separate component for all employees
// get start and end for current week
// get all workLogs for that week where role=employee
// require joining Users and WorkLogs
// Return from database name, email(?), work logs start/end,
// submitted, invoiced, paid
// filter rows by individual and display logs for that week.

// Loop through and display information for each of the worklogs

// Display hours for day, total hours

// GET all logs for week after joining User and WorkLogs table
// Loop through and filter data into component that will hold weekly
// logs and total hours, while displaying all info for the work logs
