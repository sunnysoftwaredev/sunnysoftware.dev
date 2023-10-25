import React, { useState, useCallback, useEffect } from 'react';
import type { ChangeEvent, FunctionComponent, SyntheticEvent } from 'react';
import logger from '../../../server/logger';
import { isObjectRecord } from '../../../common/utilities/types';
import useChangeHandler from '../../hooks/useChangeHandler';
import type { ClientProject, TimeObject } from '../../../server/database';
import styles from './TimeDropdown.scss';

type TimeDropdownProps = {
  propsDate: Date;
  dayLogs: TimeObject[] | undefined;
  defaultStart: number;
  defaultEnd: number;
  updating: boolean;
  activeProjects: ClientProject[];
};

const TimeDropdown: FunctionComponent<TimeDropdownProps> = (props) => {
  const [startHour, setStartHour] = useState('8');
  const [startMinute, setStartMinute] = useState('0');
  const [startMeridiem, setStartMeridiem] = useState('AM');
  const [endHour, setEndHour] = useState('5');
  const [endMinute, setEndMinute] = useState('0');
  const [endMeridiem, setEndMeridiem] = useState('PM');

  const [projectId, setProjectId] = useState(0);

  const [valid, setValid] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleStartHourChange = useChangeHandler(setStartHour);
  const handleStartMinuteChange = useChangeHandler(setStartMinute);
  const handleStartMeridiemChange = useChangeHandler(setStartMeridiem);
  const handleEndHourChange = useChangeHandler(setEndHour);
  const handleEndMinuteChange = useChangeHandler(setEndMinute);
  const handleEndMeridiemChange = useChangeHandler(setEndMeridiem);

  const { propsDate, dayLogs, defaultStart,
    defaultEnd, updating, activeProjects } = props;

  useEffect(() => {
    if (typeof activeProjects[0] !== 'undefined') {
      setProjectId(activeProjects[0].id);
    }
  }, [activeProjects]);

  const handleProjectIdChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setProjectId(parseInt(e.target.value, 10));
      setSubmitted(false);
    },
    [setProjectId],
  );

  // Set default if editing
  useEffect(() => {
    if (updating) {
      const startDate = new Date(defaultStart * 1000);
      const endDate = new Date(defaultEnd * 1000);

      const defaultStartHour = startDate.getHours();
      const defaultStartMinute = startDate.getMinutes();

      setStartMinute(defaultStartMinute.toString());

      if (defaultStartHour === 0) {
        setStartHour('12');
        setStartMeridiem('AM');
      } else if (defaultStartHour < 12) {
        setStartHour(defaultStartHour.toString());
        setStartMeridiem('AM');
      } else if (defaultStartHour === 12) {
        setStartHour('12');
        setStartMeridiem('PM');
      } else {
        const pmHour = defaultStartHour - 12;
        setStartHour(pmHour.toString());
        setStartMeridiem('PM');
      }

      const defaultEndHour = endDate.getHours();
      const defaultEndMinute = endDate.getMinutes();
      setEndMinute(defaultEndMinute.toString());

      if (defaultEndHour === 0) {
        setEndHour('12');
        setEndMeridiem('AM');
      } else if (defaultEndHour < 12) {
        setEndHour(defaultEndHour.toString());
        setEndMeridiem('AM');
      } else if (defaultEndHour === 12) {
        setEndHour(defaultEndHour.toString());
        setEndMeridiem('PM');
      } else {
        const pmEnd = defaultEndHour - 12;
        setEndHour(pmEnd.toString());
        setEndMeridiem('PM');
      }
    }
  }, [defaultStart, defaultEnd, updating]);

  const hourOptions = [
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '10', value: '10' },
    { label: '11', value: '11' },
    { label: '12', value: '12' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },

  ];

  const minuteOptions = [
    { label: '00', value: '0' },
    { label: '15', value: '15' },
    { label: '30', value: '30' },
    { label: '45', value: '45' },
  ];

  const meridiemOptions = [
    { label: 'AM', value: 'AM' },
    { label: 'PM', value: 'PM' },
  ];

  const convertStringTimesToUnix = (
    date: Date, hour: string,
    minute: string, meridiem: string
  ): number => {
    if (meridiem === 'PM' && hour !== '12') {
      hour = (Number(hour) + 12).toString();
    }
    if (meridiem === 'AM' && hour === '12') {
      hour = '0';
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const timeInMS = Date.parse(`${month}/${day}/${year} ${hour}:${minute}`);
    const roundedSeconds = Math.floor(timeInMS / 1000);

    return roundedSeconds;
  };

  const midnightNextDay = (date: Date): number => {
    date.setHours(24);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return Math.floor(date.getTime() / 1000);
  };

  const validUnixTimes = useCallback((
    start: number, end: number,
    date: Date
  ): boolean => {
    if (end < start) {
      return false;
    }
    if (end > midnightNextDay(date)) {
      return false;
    }
    if (typeof dayLogs === 'undefined') {
      return true;
    }
    for (const log of dayLogs) {
      if (log.unixStart === start || log.unixEnd === end) {
        return false;
      }
      if (start > log.unixStart && start < log.unixEnd) {
        return false;
      }
      if (end > log.unixStart && end < log.unixEnd) {
        return false;
      }
    }
    return true;
  }, [dayLogs]);

  const saveTime = useCallback(async(e: SyntheticEvent) => {
    try {
      e.preventDefault();
      setSubmitted(false);

      const oldUnixStart = defaultStart;

      const unixStart = convertStringTimesToUnix(
        propsDate,
        startHour,
        startMinute,
        startMeridiem
      );

      // account for midnight next day
      const unixEndCheck = (): number => {
        if (endHour === '12' && endMeridiem === 'AM' && endMinute === '0') {
          return midnightNextDay(propsDate);
        }
        return convertStringTimesToUnix(
          propsDate,
          endHour,
          endMinute,
          endMeridiem
        );
      };
      const unixEnd = unixEndCheck();

      let check = validUnixTimes(unixStart, unixEnd, propsDate);
      if (startMeridiem === 'PM' && endMeridiem === 'AM' && endHour !== '12') {
        check = false;
      }
      if (endHour === '12' && endMeridiem === 'AM' && endMinute !== '0') {
        check = false;
      }
      // 'valid' used for message in component
      setValid(check);
      if (!check) {
        return;
      }

      // check POST or PUT
      const postOrPut = (checkUpdating: boolean): string => {
        if (checkUpdating) {
          return 'PUT';
        }
        return 'POST';
      };
      const fetchMethod = postOrPut(updating);

      // API query
      const response = await fetch('api/workLogs', {
        method: fetchMethod,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldUnixStart,
          unixStart,
          unixEnd,
          projectId,
        }),
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: TimeDropdown.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('success variable not type boolean: TimeDropdown.tsx');
      }

      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        logger.info('unsuccessful database update in TimeDropdown.tsx');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [propsDate,
    defaultStart,
    startHour,
    startMinute,
    startMeridiem,
    endHour,
    endMinute,
    endMeridiem,
    validUnixTimes,
    updating,
    projectId]);

  return (

    <div
      className={updating
        ? styles.updatingTimeDropdownContainer
        : styles.timeDropdownContainer} onSubmit={saveTime}
    >
      <div className="containerOne">
        <label>Start</label>

        <select value={startHour} onChange={handleStartHourChange}>
          {hourOptions.map(option => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <select value={startMinute} onChange={handleStartMinuteChange}>
          {minuteOptions.map(option => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <select value={startMeridiem} onChange={handleStartMeridiemChange}>
          {meridiemOptions.map(option => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>

        <label>End</label>
        <select value={endHour} onChange={handleEndHourChange}>
          {hourOptions.map(option => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <select value={endMinute} onChange={handleEndMinuteChange}>
          {minuteOptions.map(option => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <select value={endMeridiem} onChange={handleEndMeridiemChange}>
          {meridiemOptions.map(option => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

      </div>
      <div>
        <label>Project: </label>
        <select value={projectId} onChange={handleProjectIdChange}>
          <option value={0}>None</option>
          {activeProjects.map(option => (
            <option
              key={option.id}
              value={option.id}
            >
              {option.title}
            </option>
          ))}
        </select>
      </div>
      <button type="button" onClick={saveTime}>
        {updating ? <p>Update</p> : <p>Save</p>}
      </button>
      {!valid && <h2>Invalid Input!</h2>}
      {submitted && <h2>Log saved!</h2>}
    </div>

  );
};

export default TimeDropdown;
