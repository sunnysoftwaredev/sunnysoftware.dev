import type { FunctionComponent } from 'react';
import React from 'react';
// import { TimePicker } from 'react-time-picker';
// import { DateTimePicker } from 'react-datetime-picker';
import TimeDropdown from '../TimeDropdown/TimeDropdown';
import styles from './WorkCalendarModal.scss';

type Props = {
  clickedDate: string;
};

const WorkCalendarModal: FunctionComponent<Props> = (props) => {
  // const [time, setTime] = useState<string | null>(null);

  const { clickedDate } = props;

  return (
    <div className={styles.modal}>
      <h1>
        Hours for
        {' '}
        {clickedDate}
        {' '}
      </h1>
      <TimeDropdown />

      {/* <DateTimePicker onChange={handleTimeChange} value={time} /> */}
    </div>
  );
};

export default WorkCalendarModal;
