import type { FunctionComponent } from 'react';
import React, { useCallback, useState } from 'react';
import type { UserIdNameEmailRoleActive } from '../../../server/database';
import EditUser from '../EditUser/EditUser';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import PopupMessage, { PopupType } from '../PopupMessage/PopupMessage';
import styles from './IndividualUser.scss';

const IndividualUser: FunctionComponent<UserIdNameEmailRoleActive>
= (props) => {
  const { username, email, role, id, active } = props;

  const [registering, setRegistering] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  const [editing, setEditing] = useState(false);
  const [deactivated, setDeactivated] = useState(false);

  const handleEdit = useCallback(() => {
    setEditing(!editing);
  }, [editing]);

  const closeUserCreatedPopup = useCallback(() => {
    setUserCreated(!userCreated);
  }, [userCreated]);

  const handleDeactivate = useCallback(async() => {
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
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        logger.info('unsuccessful database update in IndividualUser.tsx');
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
    >
      <div className={styles.user}>
        <p>
          {`${username}`}
        </p>
        <p>
          {`${email}`}
        </p>
        <p>
          PHONE NUMBER HERE
        </p>
        <p>
          {`${role}`}
        </p>
        <p className={styles.empty} >EMPTY</p>
        <div className={styles.buttons}>
          {/* TODO: Assignment button functionality */}
          <button type="button" onClick={}>Assignment</button>
          <button type="button" onClick={handleEdit}>Edit</button>
          <button type="button" onClick={handleDeactivate}>Deactivate</button>
        </div>
      </div>

      {userCreated && (
        <PopupMessage
          type={PopupType.Success}
          message="User registered!"
          onClick={closeUserCreatedPopup}
        />
      )}
      {registering && (
        <RegistrationForm />
      )}

      {editing && (
        <EditUser
          username={username}
          email={email}
          role={role}
          id={id}
          active={active}
        />
      )}
      {deactivated && <h3>User Deactivated!</h3>}
    </div>
  );
};

export default IndividualUser;
