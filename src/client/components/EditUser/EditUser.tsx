import type { ChangeEvent, FunctionComponent, SyntheticEvent } from 'react';
import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import type { UserIdNameEmailRoleActive } from '../../../server/database';
import { isObjectRecord } from '../../../common/utilities/types';
import logger from '../../../server/logger';
import styles from './EditUser.scss';

const EditUser: FunctionComponent<UserIdNameEmailRoleActive> = (props) => {
  const { username, email, role, id } = props;

  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(email);
  const [newRole, setNewRole] = useState(role);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setNewUsername(e.target.value);
      setSubmitted(false);
    },
    [setNewUsername],
  );

  const handleEmailChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
    setSubmitted(false);
  }, [setNewEmail],);

  const handleRoleChange
  = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNewRole(e.target.value);
    setSubmitted(false);
  }, [setNewRole]);

  // Update User information
  const handleSubmit = useCallback(async(e: SyntheticEvent) => {
    try {
      e.preventDefault();
      if (newUsername === '' || newEmail === '' || newRole === '') {
        setError(true);
        return;
      }
      setError(false);
      const response = await fetch('api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newUsername,
          newEmail,
          newRole,
          id,
        }),
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: EditUser.tsx');
      }
      if (typeof result.success !== 'boolean') {
        throw new Error('success variable not type boolean: EditUser.tsx');
      }
      if (result.success) {
        setSubmitted(true);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, [newUsername, newEmail, newRole, id]);

  const successMessage = (): React.JSX.Element => (
    <div
      className={classNames(styles.success, {
        [styles.hidden]: !submitted,
      })}
    >
      <h3>User info updated</h3>
    </div>
  );

  const errorMessage = (): React.JSX.Element => (
    <div
      className={classNames({ [styles.hidden]: !error })}
    >
      <h1>Please enter all the fields</h1>
    </div>
  );

  return (
    <div className={styles.editUserContainer} >
      <div>
        {errorMessage()}
        {successMessage()}
      </div>

      <form >
        <label className="label">Name</label>
        <input
          onChange={handleNameChange} className="input"
          value={newUsername} type="name"
        />

        <label className="label">Email</label>
        <input
          onChange={handleEmailChange} className="input"
          value={newEmail} type="email"
        />

        <label className="label">Role</label>
        <input
          onChange={handleRoleChange} className="input"
          value={newRole} type="subject"
        />
        <button
          onClick={handleSubmit}
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditUser;
