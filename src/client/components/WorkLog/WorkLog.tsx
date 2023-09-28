import React, { useCallback, useState } from 'react';
import type { FunctionComponent } from 'react';
import TimeDropdown from '../TimeDropdown/TimeDropdown';
import type { timeObject } from '../../../server/database';
import styles from './WorkLog.scss';

type WorkLogProps = {
  log: timeObject;
};
const WorkLog: FunctionComponent<WorkLogProps> = (props) => {
  const [updating, setUpdating] = useState(false);

  const { log } = props;

  const unixToTimeString = (unix: number): string => new Date(unix
    * 1000).toLocaleString('default', {
    hour: 'numeric',
    minute: 'numeric',
  });

  const handleUpdateClick = useCallback((): void => {
    setUpdating(!updating);
  }, [updating]);

  return (
    <form key={log.unixStart} className={styles.workLogContainer}>
      <div className={styles.workLog}>
        <li>{unixToTimeString(log.unixStart)}</li>
        <h4>-</h4>
        <li>{unixToTimeString(log.unixEnd)}</li>
        <button type="submit" onClick={handleUpdateClick}>Edit</button>
      </div>
      {updating && (
        <TimeDropdown
          propsDate={new Date(log.unixStart)}
          dayLogs={undefined}
          defaultStart={log.unixStart}
          defaultEnd={log.unixEnd}
          updating
        />
      )}
    </form>
  );
};

export default WorkLog;
