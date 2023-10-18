import type { FunctionComponent } from 'react';
import React, { useCallback, useState } from 'react';
import type { UserIdNameEmailRole } from '../../../server/database';
import EditUser from '../EditUser/EditUser';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import styles from './IndividualUsers.scss';

const IndividualUser: FunctionComponent<UserIdNameEmailRole> = (props) => {
  const { username } = props;
  const { email } = props;
  const { role } = props;
  const { id } = props;

  const [editing, setEditing] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleEdit = useCallback(() => {
    setEditing(!editing);
  }, [editing]);

  const handleDelete = useCallback(async() => {
    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
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
  }, [id]);

  return (

    <div
      key={`user-${id}`}
      className={styles.user}
    >
      <div>
        <h3>
          Name:
          {' '}
          {username}
        </h3>
        <h4>
          Email:
          {' '}
          {email}
        </h4>
        <h4>
          Role:
          {' '}
          {role}
        </h4>
        <h4>
          ID:
          {' '}
          {id}
        </h4>
      </div>
      <button type="button" onClick={handleEdit}>Edit</button>
      <button type="button" onClick={handleDelete}>Delete</button>
      {editing && (
        <EditUser
          username={username}
          email={email}
          role={role}
          id={id}
        />
      )}
      {deleted && <h3>Record Deleted!</h3>}
    </div>
  );
};

export default IndividualUser;
