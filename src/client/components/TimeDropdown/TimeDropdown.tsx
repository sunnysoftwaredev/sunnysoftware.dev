import React, { useCallback } from 'react';
import type { FunctionComponent } from 'react';
import logger from '../../../server/logger';
import styles from './TimeDropdown.scss';

const TimeDropdown: FunctionComponent = () => {
  const [hour, setHour] = React.useState(6);
  const [minute, setMinute] = React.useState(0);
  const [meridiem, setMeridiem] = React.useState('--');

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

  const handleHourChange
   = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
     e.preventDefault();
     const { target } = e;
     if (target instanceof HTMLSelectElement) {
       setHour(Number(e.target.value));
     } else {
       logger.info('type error in TimeDropdown: handleHourChange');
     }
   }, []);
  const handleMinuteChange
   = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
     e.preventDefault();
     const { target } = e;
     if (target instanceof HTMLSelectElement) {
       setMinute(Number(e.target.value));
     } else {
       logger.info('type error in TimeDropdown: handleMinuteChange');
     }
   }, []);
  const handleMeridiemChange
   = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
     e.preventDefault();
     const { target } = e;
     if (target instanceof HTMLSelectElement) {
       setMeridiem(e.target.value);
     } else {
       logger.info('type error in TimeDropdown: handleMeridiemChange');
     }
   }, []);

  return (

    <div className={styles.timeDropdownContainer}>

      <label>

        <select value={hour} onChange={handleHourChange}>

          {hourOptions.map(option => (

            <option
              key={option.value}
              value={option.value}
            >
              {option.label}

            </option>

          ))}
        </select>
      </label>

      <label>
        <select value={minute} onChange={handleMinuteChange}>

          {minuteOptions.map(option => (

            <option
              key={option.value}
              value={option.value}
            >
              {option.label}

            </option>

          ))}

        </select>
      </label>
      <label>
        <select value={meridiem} onChange={handleMeridiemChange}>

          {meridiemOptions.map(option => (

            <option
              key={option.value}
              value={option.value}
            >
              {option.label}

            </option>

          ))}

        </select>
      </label>

      {/* <p>
        Hour is
        {' '}
        {hour}
      </p>
      <p>
        Minute is
        {' '}
        {minute}
      </p>
      <p>
        Meridiem is
        {' '}
        {meridiem}
      </p> */}

    </div>

  );
};

export default TimeDropdown;
