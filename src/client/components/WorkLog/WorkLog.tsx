import React, { useCallback, useState } from 'react';
import type { FunctionComponent } from 'react';
import TimeDropdown from '../TimeDropdown/TimeDropdown';
import type { TimeObject } from '../../../server/database';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import styles from './WorkLog.scss';

type WorkLogProps = {
  log: TimeObject;
};
const WorkLog: FunctionComponent<WorkLogProps> = (props) => {
  const [updating, setUpdating] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const { log } = props;
  const { unixStart } = log;
  const { unixEnd } = log;

  const unixToTimeString = (unix: number): string => new Date(unix
    * 1000).toLocaleString('default', {
    hour: 'numeric',
    minute: 'numeric',
  });

  const handleUpdateClick = useCallback((): void => {
    setUpdating(!updating);
  }, [updating]);

  const deleteTime = useCallback(async() => {
    try {
      const response = await fetch('http://localhost:3000/api/workLogs', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ unixStart, unixEnd }),
        credentials: 'same-origin',
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: WorkCalendar.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('WorkLog.tsx error: result.success not boolean');
      }
      if (result.success) {
        setDeleted(true);
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
  }, [unixStart, unixEnd]);

  return (
    <div key={log.unixStart} className={styles.workLogContainer}>
      <div className={styles.workLog}>
        <li>{unixToTimeString(log.unixStart)}</li>
        <h4>-</h4>
        <li>{unixToTimeString(log.unixEnd)}</li>
        <button type="button" onClick={handleUpdateClick}>Edit</button>
        <button type="button" onClick={deleteTime}>Delete</button>
      </div>
      {updating && (
        <TimeDropdown
          propsDate={new Date(log.unixStart * 1000)}
          dayLogs={undefined}
          defaultStart={log.unixStart}
          defaultEnd={log.unixEnd}
          updating
        />
      )}
      {deleted && <h3>Record Deleted!</h3>}
    </div>
  );
};

export default WorkLog;
