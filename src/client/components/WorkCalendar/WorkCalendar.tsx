import type { FunctionComponent } from 'react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import logger from '../../../server/logger';
import TimeDropdown from '../TimeDropdown/TimeDropdown';
import { isClientProjectArray, isObjectRecord, isTimeObjectWithProjectArray } from '../../../common/utilities/types';
import type { ClientProject, TimeObject, TimeObjectWithProject } from '../../../server/database';
import WorkLog from '../WorkLog/WorkLog';
import { getUsername } from '../../redux/selectors/account';
import styles from './WorkCalendar.scss';

// WorkCalendar is using old ClientProject type, needs to be new type and
// get list from redux and pass down to WorkLog and TimeDropdown

const WorkCalendar: FunctionComponent = () => {
  const username = useSelector(getUsername);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weeklyWorkLogs, setWeeklyWorkLogs]
   = useState<TimeObjectWithProject[]>();
  const [activeProjects, setActiveProjects] = useState<ClientProject[]>([]);

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

      const response = await fetch('api/weeklyWorkLogs', {
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

      if (isTimeObjectWithProjectArray(listResult)) {
        setWeeklyWorkLogs(listResult);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [daysInWeek]);

  const compareProjects = (a: ClientProject, b: ClientProject): number => {
    const projectA = a.title;
    const projectB = b.title;

    let comparison = 0;
    if (projectA > projectB) {
      comparison = 1;
    } else if (projectA < projectB) {
      comparison = -1;
    }
    return comparison;
  };

  const getProjects = useCallback(async() => {
    try {
      const response = await fetch('api/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: ManageProjects.tsx');
      }

      const { projectList } = result;
      if (isClientProjectArray(projectList)) {
        const activeProjectList
         = projectList.filter(project => project.active);
        const sortedActive = activeProjectList.sort(compareProjects);

        setActiveProjects(sortedActive);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, []);

  useEffect(() => {
    fetchWeekLogs()
      .catch((err) => {
        logger.error(err);
      });
    getProjects().catch((err) => {
      logger.error(err);
    });
  }, [fetchWeekLogs, getProjects]);

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

  const displayDayLogs = (dayLogs: TimeObjectWithProject[] | undefined):
  React.JSX.Element[] => {
    if (typeof dayLogs === 'undefined') {
      return [<div key={0} />];
    }
    return dayLogs.map(log => (
      <WorkLog key={log.unixStart} log={log} activeProjects={activeProjects} />
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
        >
          {day}
          <TimeDropdown
            propsDate={rawDate} dayLogs={dayLogs}
            defaultStart={0} defaultEnd={0}
            updating={false} activeProjects={activeProjects}
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

        <div className={styles.body}>
          {displayWeek()}
          {' '}
        </div>
      </div>
    </div>
  );
};

export default WorkCalendar;
