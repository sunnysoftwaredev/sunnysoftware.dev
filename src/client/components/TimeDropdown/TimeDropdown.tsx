import React, { useState, useCallback, useEffect } from 'react';
import type { FunctionComponent, SyntheticEvent } from 'react';
import logger from '../../../server/logger';
import { isObjectRecord } from '../../../common/utilities/types';
import useChangeHandler from '../../hooks/useChangeHandler';
import type { timeObject } from '../../../server/database';
import styles from './TimeDropdown.scss';

type TimeDropdownProps = {
  propsDate: Date;
  dayLogs: timeObject[] | undefined;
  defaultStart: number;
  defaultEnd: number;
  updating: boolean;
};

const TimeDropdown: FunctionComponent<TimeDropdownProps> = (props) => {
  const [startHour, setStartHour] = useState('8');
  const [startMinute, setStartMinute] = useState('0');
  const [startMeridiem, setStartMeridiem] = useState('AM');
  const [endHour, setEndHour] = useState('5');
  const [endMinute, setEndMinute] = useState('0');
  const [endMeridiem, setEndMeridiem] = useState('PM');

  const [valid, setValid] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  // const [updating, setUpdating] = useState(false);

  const handleStartHourChange = useChangeHandler(setStartHour);
  const handleStartMinuteChange = useChangeHandler(setStartMinute);
  const handleStartMeridiemChange = useChangeHandler(setStartMeridiem);
  const handleEndHourChange = useChangeHandler(setEndHour);
  const handleEndMinuteChange = useChangeHandler(setEndMinute);
  const handleEndMeridiemChange = useChangeHandler(setEndMeridiem);

  const { propsDate } = props;
  const { dayLogs } = props;
  const { defaultStart } = props;
  const { defaultEnd } = props;
  const { updating } = props;

  // Set default if editing
  useEffect(() => {
    if (updating) {
      const startDate = new Date(defaultStart);
      const endDate = new Date(defaultEnd);
      console.log('startDate: ', startDate);
      console.log('endstartDate: ', endDate);
      const defaultStartHour = startDate.getHours();
      setStartHour(defaultStartHour.toString());
      setStartMinute(startDate.getMinutes.toString());
      if (defaultStartHour < 12) {
        setStartMeridiem('AM');
      } else {
        setStartMeridiem('PM');
      }

      const defaultEndHour = endDate.getHours();
      setEndHour(defaultEndHour.toString());
      setEndMinute(endDate.getMinutes.toString());
      if (defaultEndHour < 12) {
        setStartMeridiem('AM');
      } else {
        setStartMeridiem('PM');
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
    { label: '--', value: '--' },
    { label: 'AM', value: 'AM' },
    { label: 'PM', value: 'PM' },
  ];

  // const handleUpdateClick = useCallback((): void => {
  //   setUpdating(!updating);
  // }, [updating]);

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

      const unixStart = convertStringTimesToUnix(
        propsDate,
        startHour,
        startMinute,
        startMeridiem
      );

      // account for midnight next day
      let unixEnd;
      if (endHour === '12' && endMeridiem === 'AM' && endMinute === '0') {
        unixEnd = midnightNextDay(propsDate);
      } else {
        unixEnd = convertStringTimesToUnix(
          propsDate,
          endHour,
          endMinute,
          endMeridiem
        );
      }

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
      const response = await fetch('http://localhost:3000/api/workLogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          unixStart,
          unixEnd,
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
      } else {
        logger.info('unsuccessful database submission in TimeDropdown.tsx');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [propsDate,
    startHour,
    startMinute,
    startMeridiem,
    endHour,
    endMinute,
    endMeridiem,
    validUnixTimes]);

  return (

    <div className={styles.timeDropdownContainer} onSubmit={saveTime}>
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
      <button type="button" onClick={saveTime}>
        Save
      </button>
      {!valid && <h2>Invalid Input!</h2>}
      {submitted && <h2>Log saved!</h2>}
    </div>

  );
};

export default TimeDropdown;
