import type { FunctionComponent } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import logger from '../../../server/logger';
import { isObjectRecord, isUsersArray } from '../../../common/utilities/types';
import type { UserIdNameEmailRoleActive } from '../../../server/database';
import IndividualUser from '../IndividualUser/IndividualUser';
import CreateProject from '../CreateProject/CreateProject';
import Button, { ButtonSize, ButtonVariant } from '../Button/Button';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import styles from './ManageUsers.scss';

const ManageUsers: FunctionComponent = () => {
  const [userList, setUserList] = useState<UserIdNameEmailRoleActive[]>([]);
  // Below is for buttons sorting users
  const [activeOrTerminated, setActiveOrTerminated] = useState(true);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const getUserList = useCallback(async() => {
    try {
      const response = await fetch('api/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      });

      const result: unknown = await response.json();

      if (!isObjectRecord(result)) {
        throw new Error('Unexpected body type: ManageUsers.tsx');
      }
      const { usersArray } = result;
      if (isUsersArray(usersArray)) {
        setUserList(usersArray);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        logger.error(err.message);
      }
    }
  }, []);

  useEffect(() => {
    getUserList().catch((err) => {
      logger.error(err);
    });
  }, [getUserList]);

  const displayUsers = (users: UserIdNameEmailRoleActive[]):
  React.ReactElement[] => {
    if (typeof users === 'undefined') {
      return [<div key={0} />];
    }
    const userElements: React.ReactElement[] = [];

    for (const user of users) {
      const { username } = user;
      const { email } = user;
      const { id } = user;
      const { role } = user;
      const { active } = user;

      userElements.push((
        <div
          key={`user-${id}`}
        >
          <IndividualUser
            username={username} email={email}
            role={role}
            id={id}
            active={active}
          />
        </div>));
    }
    return userElements;
  };
  return (
    <div className={styles.manageUsersContainer}>
      {showRegistrationForm && <RegistrationForm />}
      <div className={styles.navigationBar}>
        <div className={styles.tabMenu}>
          {/* TODO: change buttons to sort user list  */}
          {activeOrTerminated
            ? (
              <Button
                to="./admin-portal-employees"
                size={ButtonSize.Medium}
                variant={ButtonVariant.Primary}
              >
                Active
              </Button>
            )
            : (
              <Button
                to="./admin-portal-employees"
                size={ButtonSize.Medium}
                variant={ButtonVariant.Outlined}
              >
                Active
              </Button>
            )}
          {activeOrTerminated
            ? (
              <Button
                to="./admin-portal-projects"
                size={ButtonSize.Medium}
                variant={ButtonVariant.Outlined}
              >
                Terminated
              </Button>
            )
            : (
              <Button
                to="./admin-portal-projects"
                size={ButtonSize.Medium}
                variant={ButtonVariant.Primary}
              >
                Terminated
              </Button>
            )}

        </div>
        <Button
          size={ButtonSize.Large}
          variant={ButtonVariant.Primary}
        >
          Add employee
        </Button>
      </div>
      <h2>
        Total Users:
        {' '}
        {userList.length}
      </h2>
      <div className={styles.columnNames}>
        <p>Name</p>
        <p>Email</p>
        <p>Phone number</p>
        <p>Project name(s)</p>
        <p className={styles.empty}>EMPTY</p>
        <p className={styles.empty}>EMPTY</p>
        {/* NB: p's empty to line up with IndividualUser grid */}
      </div>
      <div className={styles.usersList}>
        {displayUsers(userList)}
      </div>
      <CreateProject userList={userList} />
    </div>

  );
};

export default ManageUsers;
