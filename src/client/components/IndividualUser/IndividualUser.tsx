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
  const [deactivateErrorMsg, setDeactivateErrorMsg] = useState<string | null>(null);

  const handleEdit = useCallback(() => {
    setEditing(!editing);
  }, [editing]);

  const handleDeactivate = useCallback(async() => {
    setDeactivateErrorMsg(null); // Clear any previous error messages
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
        throw new Error('Expected "success" property to be a boolean but received something else.');
      }
      if (result.success) {
        setDeactivated(true);
      } else {
        logger.info('Unsuccessful database update in IndividualUser.tsx');
        setDeactivateErrorMsg('Failed to deactivate user.');
      }
    } catch (err: unknown) {
      logger.error('An error occurred while deactivating the user.');
      setDeactivateErrorMsg('An error occurred. Please try again.');
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
      <button type="button" onClick={handleDeactivate} disabled={deactivated}>Deactivate</button>
      {editing && (
        <EditUser
          username={username}
          email={email}
          role={role}
          id={id}
        />
      )}
      {deactivated && <h3>User Deactivated!</h3>}
      {deactivateErrorMsg && <h3 className={styles.errorMsg}>{deactivateErrorMsg}</h3>}
    </div>
  );
};

export default IndividualUser;
