import type { FunctionComponent } from 'react';
import React, { useCallback, useState } from 'react';
import type { UserIdNameEmailRole } from '../../../server/database';
import EditUser from '../EditUser/EditUser';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import styles from './IndividualUsers.scss';

const IndividualUser: FunctionComponent<UserIdNameEmailRole> = (props) => {
  const { username, email, role, id } = props;

  const [editing, setEditing] = useState(false);
  const [deactivated, setDeactivated] = useState(false);
  const [deactivationConfirmationMessage, setDeactivationConfirmationMessage] = useState('');

  const handleEdit = useCallback(() => {
    setEditing(!editing);
  }, [editing]);

  const handleDeactivate = useCallback(async () => {
    try {
      const response = await fetch('api/users/deactivate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
        credentials: 'same-origin',
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: IndividualUser.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('IndividualUser.tsx error: result.success not boolean');
      }
      if (result.success) {
        setDeactivated(true);
        setDeactivationConfirmationMessage('User has been successfully deactivated.');
      } else {
        logger.info('Unsuccessful database update in IndividualUser.tsx');
        setDeactivationConfirmationMessage('User deactivation failed. Please try again.');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(`Deactivation error: ${err.message}`);
        setDeactivationConfirmationMessage('An error occurred during deactivation. Please try again.');
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
          {`Username: ${username}`}
        </h3>
        <h4>
          {`Email: ${email}`}
        </h4>
        <h4>
          {`Role: ${role}`}
        </h4>
        <h4>
          {`ID: ${id}`}
        </h4>
      </div>
      <button type="button" onClick={handleEdit}>Edit</button>
      <button type="button" onClick={handleDeactivate}>Deactivate</button>
      {editing && (
        <EditUser
          username={username}
          email={email}
          role={role}
          id={id}
        />
      )}
      {deactivationConfirmationMessage && <h3>{deactivationConfirmationMessage}</h3>}
    </div>
  );
};

export default IndividualUser;
