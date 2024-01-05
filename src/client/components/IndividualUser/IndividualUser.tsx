import type { FunctionComponent } from 'react';
import React, { useCallback, useState } from 'react';
import type { UserIdNameEmailRole } from '../../../server/database';
import EditUser from '../EditUser/EditUser';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import styles from './IndividualUsers.scss';

const IndividualUser: FunctionComponent<UserIdNameEmailRole> = ({ username, email, role, id }) => {
  const [editing, setEditing] = useState(false);
  const [deactivated, setDeactivated] = useState(false);

  const toggleEditing = useCallback(() => {
    setEditing(prevEditing => !prevEditing);
  }, []);

  const handleDeactivate = useCallback(() => {
    fetch('api/users/deactivate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
      credentials: 'same-origin',
    })
    .then(response => response.json())
    .then(result => {
      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: IndividualUser.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('IndividualUser.tsx error: result.success not boolean');
      }
      if (result.success) {
        setDeactivated(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        logger.info('Unsuccessful database update in IndividualUser.tsx');
      }
    })
    .catch(error => {
      if (error instanceof Error) {
        logger.error(`Deactivation error in IndividualUser.tsx: ${error.message}`);
      }
    });
  }, [id]);

  return (
    <div key={`user-${id}`} className={styles.user}>
      <div>
        <h3>{`Username: ${username}`}</h3>
        <h4>{`Email: ${email}`}</h4>
        <h4>{`Role: ${role}`}</h4>
        <h4>{`ID: ${id}`}</h4>
      </div>
      <button type="button" onClick={toggleEditing}>Edit</button>
      <button type="button" onClick={handleDeactivate}>Deactivate</button>
      {editing && <EditUser username={username} email={email} role={role} id={id} />}
      {deactivated && <h3>User Deactivated!</h3>}
    </div>
  );
};

export default IndividualUser;