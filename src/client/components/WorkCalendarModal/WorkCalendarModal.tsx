import type { FunctionComponent } from 'react';
import React, { useCallback, useState } from 'react';
import TimePicker from 'react-time-picker';
import DateTimePicker from 'react-datetime-picker';
import styles from './WorkCalendarModal.scss';

type Props = {
  clickedDate: Date;
};

const WorkCalendarModal: FunctionComponent<Props> = (props) => {
  const [time, setTime] = useState(null);

  const { clickedDate } = props;

  const handleTimeChange = useCallback((newTime) => {
    setTime(newTime);
  }, []);

  return (
    <div className={styles.modal}>
      <h1>
        Hours for
        {' '}
        {clickedDate.toString()}
        {' '}
      </h1>
      <div className={styles.timePicker}>
        <TimePicker
          className={styles.timePicker}
          onChange={handleTimeChange}
          value={time}
        />

      </div>

      {/* <DateTimePicker onChange={handleTimeChange} value={time} /> */}
    </div>
  );
};

export default WorkCalendarModal;
