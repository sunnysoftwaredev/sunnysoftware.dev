import React, { useState, useCallback } from 'react';
import type { FunctionComponent, SyntheticEvent } from 'react';
import logger from '../../../server/logger';
import { isObjectRecord } from '../../../common/utilities/types';
import useChangeHandler from '../../hooks/useChangeHandler';
import styles from './TimeDropdown.scss';

type Props = {
  propsDate: Date;
};

const TimeDropdown: FunctionComponent<Props> = (props) => {
  const [startHour, setStartHour] = useState('6');
  const [startMinute, setStartMinute] = useState('0');
  const [startMeridiem, setStartMeridiem] = useState('--');
  const [endHour, setEndtHour] = useState('5');
  const [endMinute, setEndtMinute] = useState('0');
  const [endMeridiem, setEndtMeridiem] = useState('--');

  const [valid, setValid] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleStartHourChange = useChangeHandler(setStartHour);
  const handleStartMinuteChange = useChangeHandler(setStartMinute);
  const handleStartMeridiemChange = useChangeHandler(setStartMeridiem);
  const handleEndHourChange = useChangeHandler(setEndtHour);
  const handleEndMinuteChange = useChangeHandler(setEndtMinute);
  const handleEndMeridiemChange = useChangeHandler(setEndtMeridiem);

  const { propsDate } = props;

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

  const convertStringTimesToUnix = (
    date: Date, hour: string,
    minute: string, meridiem: string
  ): number => {
    if (meridiem === 'PM') {
      hour = (Number(hour) + 12).toString();
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const timeInMS = Date.parse(`${month}/${day}/${year} ${hour}:${minute}`);
    const roundedSeconds = Math.floor(timeInMS / 1000);

    return roundedSeconds;
  };

  const validUnixTimes = (start: number, end: number): boolean => {
    if (end < start) {
      return false;
    }
    return true;
  };

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
      const unixEnd = convertStringTimesToUnix(
        propsDate,
        endHour,
        endMinute,
        endMeridiem
      );

      // 'valid' used for message in component
      const check = validUnixTimes(unixStart, unixEnd);
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
        throw new Error('Unexpected body type: LoginForm.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('success variable not type boolean: LoginForm.tsx');
      }

      if (result.success) {
        setSubmitted(true);
      } else {
        logger.info('else in fetch');
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
    endMeridiem]);

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
